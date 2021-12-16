import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';

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

import { useSelector, useDispatch } from "react-redux"
import { addProfile } from "../../GlobalStates/actions/addUserData"
import { changeUserNameApi, changePasswordApi, getProfileApi, getAllUserApi, followUserApi, followUsersIdApi, unFollowUserApi, addFavouritCatApi } from "../../api/user"

import "./Profile.scss"

const Profile = () => {
    let history = useHistory()
    let dispatch = useDispatch()
    let userDataState = useSelector((state) => state.userData)

    const [reload, setReload] = useState(false)
    const [cat, setCat] = useState({
        bussiness: false,
        entertainment: false,
        generel: false,
        health: false,
        science: false,
        sports: false,
        technology: false,
    })
    const [enteredData, setEnteredData] = useState({
        userName: "",
        email: "",
        password: ""
    })
    const [showpass, setShowPass] = useState(false)
    const [currentFlow, setCurrentFlow] = useState('all')
    const [follow, setFollow] = useState(null)
    const [searchKey, setSearchKey] = useState("")
    const enteringData = (event) => {
        let { name, value } = event.target
        setEnteredData((preValue) => {
            return {
                ...preValue,
                [name]: value
            }
        })
    }

    const activeCat = async (name) => {
        let res = await addFavouritCatApi(enteredData.email, name)
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
            setReload(reload ? false : true)
        }
        setCat((preValue) => {
            return {
                ...preValue,
                [name]: cat[name] ? false : true
            }
        })
    }

    const enteringSearchKey = (event) => {
        setSearchKey(event.target.value)
    }

    useEffect(() => {
        setEnteredData((preValue) => {
            return {
                ...preValue,
                userName: userDataState.userData.userName,
                email: userDataState.userData.email
            }
        })
    }, [userDataState])
    useEffect(() => {
        setSearchKey("")
        if (currentFlow == "followers") {
            setFollow(userDataState.userData.followers)
        } else if (currentFlow == "following") {
            setFollow(userDataState.userData.following)
        } else {
            getAllUsers()
        }
    }, [currentFlow, reload])
    useEffect(() => {
        getProfile()
    }, [reload])

    const getAllUsers = async () => {
        let ids = []
        let res = await followUsersIdApi(userDataState.token, userDataState.userData.email)
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
            ids.push(...res.data.data.following)
            let data = await getAllUserApi(userDataState.token)
            if (data.error != null) {
                toast.error(data.error, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                ids.push(userDataState.userData._id)
                console.log("TOTAL IDES ============ ", ids);
                let filterUsers = data.data.data.filter((data) => !ids.includes(data._id))
                setFollow(filterUsers)
            }
        }
    }

    let updateUserName = async () => {
        if (enteredData.userName == userDataState.userData.userName) {
            toast.error("Please Change UserName to Update", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            let res = await changeUserNameApi(userDataState.token, enteredData.userName, enteredData.email, userDataState.userData._id)
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
                toast.success("UserName Update Success", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                setReload(reload ? false : true)
            }
        }
    }
    const getProfile = async () => {
        let res = await getProfileApi(userDataState.token, userDataState.userData._id)
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
            localStorage.setItem("userData", JSON.stringify(res.data.data))
            dispatch(addProfile(res.data.data))
        }
    }

    let updatePassword = async () => {
        if (enteredData.password.length < 8) {
            toast.error("Password Must Grater then 8 character", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            let res = await changePasswordApi(userDataState.token, enteredData.password, userDataState.userData._id)
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
                toast.success("Password Update Success", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                setEnteredData((preValue) => {
                    return {
                        ...preValue,
                        password: ""
                    }
                })
                setReload(reload ? false : true)
            }
        }
    }

    const followUser = async (fId) => {
        let res = await followUserApi(userDataState.token, userDataState.userData._id, fId)
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
            toast.success("Following Successful", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setReload(reload ? false : true)
        }
    }
    const unFollowUser = async (fId) => {
        let res = await unFollowUserApi(userDataState.token, userDataState.userData._id, fId)
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
            toast.success("UN-Following Successful", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setReload(reload ? false : true)
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
            <div className="profile_container">
                <div className="box">
                    <div className="heading">
                        Profile Setting
                    </div>
                    <div className="form">
                        <div className="input">
                            <TextField
                                label="UserName"
                                variant="outlined"
                                value={enteredData.userName}
                                name="userName"
                                onChange={enteringData}
                            />
                            <Button className='btn' onClick={updateUserName}> Update </Button>
                        </div>
                        <div className="input">
                            <TextField
                                label="Email"
                                variant="outlined"
                                value={enteredData.email}
                                name="otp"
                            />
                            <Button className='btndis' > Update </Button>
                        </div>
                        <div className="input">

                            <FormControl variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showpass ? 'text' : 'password'}
                                    value={enteredData.password}
                                    name='password'
                                    onChange={enteringData}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => setShowPass(showpass ? false : true)}
                                                edge="end"
                                            >
                                                {showpass ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                />
                            </FormControl>
                            <Button className='btn' onClick={updatePassword}> Update </Button>
                        </div>
                    </div>
                </div>

                <div className="cat__heading">
                    Favourite Categories
                </div>

                <div className="catogories">
                    <div onClick={() => activeCat("business")} className={userDataState.userData.categories.business == true ? "active_current" : "cat"}>Business</div>
                    <div onClick={() => activeCat("entertainment")} className={userDataState.userData.categories.entertainment == true ? "active_current" : "cat"}>Entertainment</div>
                    <div onClick={() => activeCat("general")} className={userDataState.userData.categories.general == true ? "active_current" : "cat"}>General</div>
                    <div onClick={() => activeCat("health")} className={userDataState.userData.categories.health == true ? "active_current" : "cat"}>Health</div>
                    <div onClick={() => activeCat("science")} className={userDataState.userData.categories.science == true ? "active_current" : "cat"}>Science</div>
                    <div onClick={() => activeCat("sports")} className={userDataState.userData.categories.sports == true ? "active_current" : "cat"}>Sports</div>
                    <div onClick={() => activeCat("technology")} className={userDataState.userData.categories.technology == true ? "active_current" : "cat"}>Technology</div>
                </div>
                <hr style={{ margin: "3rem 5rem" }} />

                <div className="follower_box">
                    <div className="flo_btns">
                        <div className={`current ${currentFlow == 'all' ? "active_current" : null}`} onClick={() => setCurrentFlow('all')}>
                            All Users
                        </div>
                        <div className={`current ${currentFlow == 'followers' ? "active_current" : null}`} onClick={() => setCurrentFlow('followers')}>
                            Followers
                        </div>
                        <div className={`current ${currentFlow == 'following' ? "active_current" : null}`} onClick={() => setCurrentFlow('following')}>
                            Following
                        </div>
                    </div>
                    <div className="data">
                        {
                            currentFlow == "all" && <input value={searchKey} type="text" placeholder='Find user' onChange={enteringSearchKey} />
                        }
                        {
                            follow == null || follow.length < 1 ?
                                <div className="nodata">
                                    NO DATA
                                </div>
                                :
                                currentFlow == "all" ?
                                    follow.filter(f => {
                                        if (searchKey == "") {
                                            return f
                                        } else if (f.userName.toLowerCase().includes(searchKey.toLowerCase())) {
                                            return f
                                        }
                                    }).map((data, index) => {
                                        return (
                                            <>
                                                <div className="follow">
                                                    <p className="name"> <p className='number'> {index + 1} </p> {data.userName}</p> <p className="unfollow"> {currentFlow == "following" ? <Button onClick={() => unFollowUser(data._id)}> UN-follow </Button> : currentFlow == "all" ? <Button onClick={() => followUser(data._id)}> Follow </Button> : null} </p>
                                                </div>
                                            </>
                                        )
                                    })
                                    :
                                    follow.map((data, index) => {
                                        return (
                                            <>
                                                <div className="follow">
                                                    <p className="name"> <p className='number'> {index + 1} </p> {data.userName}</p> <p className="unfollow"> {currentFlow == "following" ? <Button onClick={() => unFollowUser(data._id)}> UN-follow </Button> : currentFlow == "all" ? <Button onClick={() => followUser(data._id)}> Follow </Button> : null} </p>
                                                </div>
                                            </>
                                        )
                                    })

                        }

                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile
