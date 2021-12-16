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

import { registerApi, otpApi } from "../../api/auth"

import "./Register.scss"


const Register = () => {
    let history = useHistory()

    const [loading, setLoading] = useState(false)
    const [showOtp, setShowOtp] = useState(false)
    const [show, setShow] = useState({
        pass: false,
        cpass: false
    })
    const [otp, setOtp] = useState("")
    const [enteredData, setEnteredData] = useState({
        userName: "",
        email: "",
        password: "",
        cPassword: "",
    })
    const [error, setError] = useState({
        email: "",
        password: ""
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

    const showingPassword = (name) => {
        setShow((preValue) => {
            return {
                ...preValue,
                [name]: show[name] == true ? false : true
            }
        })
    }
    console.log("SHOW ============= ", show);
    const register = async () => {
        if (!enteredData.userName || !enteredData.email || !enteredData.password || enteredData.password != enteredData.cPassword || error.email.length >= 1 || error.password.length >= 1) {
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
            let res = await registerApi(enteredData)
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
                toast.success("Check your Email", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setShowOtp(true)
            }
        }
    }

    const confirmOtp = async () => {
        if (!otp) {
            toast.error('Please add otp to Confirm', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            let res = await otpApi(enteredData.email, otp)
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
                toast.success("User Register Successfully", {
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
                }, 5000);
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
            {
                showOtp ?
                    <>
                        < div className="register_container" >
                            <div className="box">
                                <div className="heading">
                                    Email Verification
                                </div>
                                <div className="form">
                                    <TextField
                                        label="OTP"
                                        variant="outlined"
                                        value={otp}
                                        name="otp"
                                        onChange={(e) => setOtp(e.target.value)}
                                    />
                                    <Button onClick={confirmOtp} style={{ backgroundColor: '#1967d2', color: "white" }}> Verify </Button>
                                </div>
                            </div>
                        </div >
                    </>
                    :
                    <>
                        <div className="register_container">
                            <div className="box">
                                <div className="heading">
                                    Register
                                </div>
                                <div className="form">
                                    <TextField
                                        label="UserName"
                                        variant="outlined"
                                        value={enteredData.userName}
                                        name="userName"
                                        onChange={enteringData}
                                    />
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
                                    <FormControl variant="outlined">
                                        <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-password"
                                            type={show.cpass ? 'text' : 'password'}
                                            value={enteredData.cPassword}
                                            name='cPassword'
                                            onChange={enteringData}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={() => showingPassword("cpass")}
                                                        edge="end"
                                                    >
                                                        {show.cpass ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="Password"
                                        />
                                    </FormControl>
                                    {enteredData.password != enteredData.cPassword ? <><div className="confirm_valid">password does not matach</div></> : null}
                                    <Button onClick={register} style={{ backgroundColor: '#1967d2', color: "white" }}> Register </Button>
                                    <p className='already'> Already have an account <NavLink to={"/login"} > Login </NavLink> </p>
                                </div>
                            </div>
                        </div>
                    </>
            }

        </>
    )
}

export default Register
