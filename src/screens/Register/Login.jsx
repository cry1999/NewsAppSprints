import React, { useState } from 'react'

import { NavLink, useHistory } from "react-router-dom"

import { ToastContainer, toast } from 'react-toastify';

import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CircularProgress from '@mui/material/CircularProgress';
import Button from "@mui/material/Button/Button"

import { LoginApi } from "../../api/auth"
import { useDispatch } from "react-redux"
import { addUser } from "../../GlobalStates/actions/addUserData"
import "./Login.scss"

const Login = () => {
    let history = useHistory()
    let dispatch = useDispatch()

    const [show, setShow] = useState({
        pass: false,
    })
    const [error, setError] = useState({
        email: "",
        password: ""
    })
    const [enteredData, setEnteredData] = useState({
        email: "",
        password: "",
    })

    const enteringData = (event) => {
        let { name, value } = event.target
        switch (name) {
            case "email":
                setEnteredData((preValue) => {
                    return {
                        ...preValue,
                        [name]: value
                    }
                })
                if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) {
                    setError((preValue) => {
                        return {
                            ...preValue,
                            email: ""
                        }
                    })
                } else {
                    setError((preValue) => {
                        return {
                            ...preValue,
                            email: "Invalid Email"
                        }
                    })
                }
                break;
            case "password":
                setEnteredData((preValue) => {
                    return {
                        ...preValue,
                        [name]: value
                    }
                })
                // if (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(enteredData.password)) {
                if (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(value)) {
                    setError((preValue) => {
                        return {
                            ...preValue,
                            password: ""
                        }
                    })
                } else {
                    setError((preValue) => {
                        return {
                            ...preValue,
                            password: "Invalid Password , must contain one Special Characher , Upper Case , LowerCase , number minumum length 8"
                        }
                    })
                }
                break;

            default:
                break;
        }

        setEnteredData((preValue) => {
            return {
                ...preValue,
                [event.target.name]: event.target.value
            }
        })
    }

    const showingPassword = (name) => {
        setShow((preValue) => {
            return {
                ...preValue,
                [name]: show[name] == true ? false : true
            }
        })
    }

    const login = async () => {
        if (!enteredData.email || !enteredData.password || error.email.length >= 1 || error.password >= 1) {
            toast.error('Fill all the fields carefully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            let res = await LoginApi(enteredData)
            if (res.error != null) {
                toast.error("SomThing Went Wrong", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                toast.success("Login Success", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                localStorage.setItem("token", res.data.token)
                localStorage.setItem("userData", JSON.stringify(res.data.user))
                dispatch(addUser(res.data))
                setTimeout(() => {
                    history.push("/")
                }, 2000);
            }
        }
    }

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className="login_container">
                <div className="box">
                    <div className="heading">
                        Login
                    </div>
                    <div className="form">
                        <TextField
                            label="Email"
                            variant="outlined"
                            value={enteredData.email}
                            name="email"
                            onChange={enteringData}

                        />
                        <p className="confirm_valid"> {error.email.length >= 1 ? error.email : null} </p>
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={show.pass ? 'text' : 'password'}
                                value={enteredData.password}
                                name='password'
                                onChange={enteringData}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => showingPassword("pass")}
                                            edge="end"
                                        >
                                            {show.pass ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                        <p className="confirm_valid"> {error.password.length >= 1 ? error.password : null} </p>
                        <Button onClick={login} style={{ backgroundColor: '#1967d2', color: "white" }}> Login </Button>
                        <p className='already'> Forget Password <NavLink to={"/reset"} > Reset </NavLink> </p>
                        <p className='already'> Don't have an account <NavLink to={"/register"} > Register </NavLink> </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
