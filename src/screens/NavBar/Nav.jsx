import React from 'react'
import { NavLink, useHistory } from "react-router-dom"

import TextField from "@mui/material/TextField/TextField"
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';

import Glob from "../../Components/Svgs/Glob"
import ForYou from "../../Components/Svgs/ForYou"
import Following from "../../Components/Svgs/Following"
import Business from "../../Components/Svgs/Business"
import Technology from "../../Components/Svgs/Technology"
import Entertainment from "../../Components/Svgs/Entertainment"
import Science from "../../Components/Svgs/Science"
import Health from "../../Components/Svgs/Health"
import Sports from "../../Components/Svgs/Sports"
import Search from "../../Components/Svgs/Search"

import { useDispatch, useSelector } from "react-redux"
import { setFeeds } from "../../GlobalStates/actions/addFeedsData"
import { addWord } from "../../GlobalStates/actions/searchKeyword"

import "./Nav.scss"

const Nav = () => {
    let history = useHistory()
    let dispatch = useDispatch()
    let userDataState = useSelector((state) => state.userData)
    let feedState = useSelector(state => state.allFeedsState)
    let searchState = useSelector(state => state.searchState)


    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const logOut = () => {
        localStorage.clear()
        // history.go("/")
        window.location.href = "/"
    }
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const activeFeeds = (name) => {
        dispatch(setFeeds(name))
        closeSideBar()
    }
    const closeSideBar = () => {
        setState((preValue) => {
            return {
                ...preValue,
                left: false
            }
        })
    }

    const enteringSearchKeyWords = (event) => {
        dispatch(addWord(event.target.value))
    }

    return (
        <>
            <div className="nav_container">
                <div className="nav_box">
                    <div className="mobile_nav">
                        <Button onClick={toggleDrawer("left", true)}> <MenuIcon /> </Button>
                        <Drawer
                            // anchor={anchor}
                            open={state.left}
                            onClose={toggleDrawer("left", false)}
                        >
                            <div className="mobile_box">

                                <div className="heading"> NewsFeeds </div>
                                <div className="search"> <Search /> <input value={searchState} type="text" placeholder='Search for topics , sources' onChange={enteringSearchKeyWords} /> </div>
                                <div className="sidebar">
                                    <div onClick={() => activeFeeds("top")} className={`link ${feedState == "top" ? "activel" : null}`} > <Glob /> <p> General </p> </div>
                                    <div onClick={() => activeFeeds("foryou")} className={`link ${feedState == "foryou" ? "activel" : null}`}> <ForYou /> <p> For You </p> </div>
                                    <div onClick={() => activeFeeds("following")} className={`link ${feedState == "following" ? "activel" : null}`}> <Following /> <p> Following </p> </div>
                                    <div className={`line`}></div>
                                    <div onClick={() => activeFeeds("business")} className={`link ${feedState == "business" ? "activel" : null}`}> <Business /> <p> Business </p> </div>
                                    <div onClick={() => activeFeeds("technology")} className={`link ${feedState == "technology" ? "activel" : null}`}> <Technology /> <p> Technology </p> </div>
                                    <div onClick={() => activeFeeds("entertainment")} className={`link ${feedState == "entertainment" ? "activel" : null}`}> <Entertainment /> <p> Entertainment </p> </div>
                                    <div onClick={() => activeFeeds("science")} className={`link ${feedState == "science" ? "activel" : null}`}> <Science /> <p> Science </p> </div>
                                    <div onClick={() => activeFeeds("health")} className={`link ${feedState == "health" ? "activel" : null}`}> <Health /> <p> Health </p> </div>
                                    <div onClick={() => activeFeeds("sports")} className={`link ${feedState == "sports" ? "activel" : null}`}> <Sports /> <p> Sports </p> </div>
                                </div>

                                {
                                    userDataState.userData != null ?
                                        <>
                                            <Button
                                                id="basic-button"
                                                aria-controls="basic-menu"
                                                aria-haspopup="true"
                                                aria-expanded={open ? 'true' : undefined}
                                                onClick={handleClick}
                                                style={{ backgroundColor: "#1967d2", padding: ".4rem 1rem", color: "white" }}
                                            >
                                                {userDataState.userData.userName}
                                            </Button>
                                            <Menu
                                                id="basic-menu"
                                                anchorEl={anchorEl}
                                                open={open}
                                                onClose={handleClose}
                                                MenuListProps={{
                                                    'aria-labelledby': 'basic-button',
                                                }}
                                            >
                                                <MenuItem onClick={() => history.push("/profile")} >Profile</MenuItem>
                                                <MenuItem onClick={logOut}>Logout</MenuItem>
                                            </Menu>
                                        </>
                                        :
                                        <Button onClick={() => history.push("/login")} style={{ backgroundColor: "#1967d2", padding: ".4rem 1rem", color: "white" }}> Sign in </Button>
                                }
                            </div>
                        </Drawer>
                    </div>
                    <div className="heading" onClick={() => history.push("/")}> NewsFeeds </div>
                    <div className="search"> <Search /> <input value={searchState} type="text" placeholder='Search for topics , sources' onChange={enteringSearchKeyWords} /> </div>
                    <div className="profile_box">
                        <div className="sig">

                            {
                                userDataState.userData != null ?
                                    <>
                                        <Button
                                            id="basic-button"
                                            aria-controls="basic-menu"
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                            onClick={handleClick}
                                            style={{ backgroundColor: "#1967d2", padding: ".4rem 1rem", color: "white" }}
                                        >
                                            {userDataState.userData.userName}
                                        </Button>
                                        <Menu
                                            id="basic-menu"
                                            anchorEl={anchorEl}
                                            open={open}
                                            onClose={handleClose}
                                            MenuListProps={{
                                                'aria-labelledby': 'basic-button',
                                            }}
                                        >
                                            <MenuItem onClick={() => history.push("/profile")} >Profile</MenuItem>
                                            <MenuItem onClick={logOut}>Logout</MenuItem>
                                        </Menu>
                                    </>
                                    :
                                    <Button onClick={() => history.push("/login")} style={{ backgroundColor: "#1967d2", padding: ".4rem 1rem", color: "white" }}> Sign in </Button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Nav
