import React, { useState } from 'react'
import { useHistory } from "react-router-dom"

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

import { ToastContainer, toast } from 'react-toastify';

import { ResetApi, ResetConfirmApi } from "../../api/auth"

import "./Reset.scss"

const Reset = () => {
    let history = useHistory()

    const [error, setError] = useState({
        email: "",
        password: ""
    })
    const [enteredData, setEnteredData] = useState({
        email: "",
        code: "",
        password: ''
    })
    const [show, setShow] = useState({
        pass: false,
    })
    const [currentDiv, setCurrentDiv] = useState("email")

    const showingPassword = (name) => {
        setShow((preValue) => {
            return {
                ...preValue,
                [name]: show[name] == true ? false : true
            }
        })
    }

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
                setEnteredData((preValue) => {
                    return {
                        ...preValue,
                        [name]: value
                    }
                })
                break;
        }
    }

    const reset = async () => {
        setCurrentDiv("password")
    }
    const resetOtp = async () => {
        let res = await ResetApi(enteredData)
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
            toast.success("Check your mail", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setCurrentDiv("code")
        }

    }
    const changePass = async () => {
        let res = await ResetConfirmApi(enteredData)
        if (res.error != null) {
            toast.error(res.error, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            toast.success("Password Change Success", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setTimeout(() => {
                history.push("/login")
            }, 1500);
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
            <div className="reset_container">
                <div className="box">
                    <div className="heading">
                        Reset Password
                    </div>
                    {
                        currentDiv == "code" ?
                            <>
                                <div className="form">
                                    <TextField
                                        label="Code"
                                        variant="outlined"
                                        value={enteredData.code}
                                        name="code"
                                        onChange={enteringData}

                                    />
                                    <Button onClick={reset} style={{ backgroundColor: '#1967d2', color: "white" }}> Reset </Button>
                                </div>
                            </>
                            :
                            currentDiv == "password" ?
                                <>
                                    <div className="form">
                                        <FormControl variant="outlined">
                                            <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
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
                                                label="New Password"
                                            />
                                        </FormControl>
                                        <p className="confirm_valid"> {error.password.length >= 1 ? error.password : null} </p>
                                        <Button onClick={changePass} style={{ backgroundColor: '#1967d2', color: "white" }}> Change </Button>
                                    </div>
                                </>
                                :
                                <>
                                    <div className="form">
                                        <TextField
                                            label="Email"
                                            variant="outlined"
                                            value={enteredData.email}
                                            name="email"
                                            onChange={enteringData}

                                        />
                                        <Button onClick={resetOtp} style={{ backgroundColor: '#1967d2', color: "white" }}> Verify </Button>
                                    </div>
                                </>
                    }
                </div>
            </div>
        </>
    )
}

export default Reset
