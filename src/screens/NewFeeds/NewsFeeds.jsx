import React, { useEffect, useState } from 'react'

import { NavLink, useHistory } from "react-router-dom"

import Progress from "@mui/material/CircularProgress/CircularProgress"

import Glob from "../../Components/Svgs/Glob"
import ForYou from "../../Components/Svgs/ForYou"
import Following from "../../Components/Svgs/Following"
import Business from "../../Components/Svgs/Business"
import Technology from "../../Components/Svgs/Technology"
import Entertainment from "../../Components/Svgs/Entertainment"
import Science from "../../Components/Svgs/Science"
import Health from "../../Components/Svgs/Health"
import Sports from "../../Components/Svgs/Sports"

import FIMG from "../../assets/f.jpg"

import { useDispatch, useSelector } from "react-redux"
import { addUser } from "../../GlobalStates/actions/addUserData"
import { setFeeds } from "../../GlobalStates/actions/addFeedsData"
import { addWord } from "../../GlobalStates/actions/searchKeyword"

import { getBusinessFeeds, getGenralFeeds, getTechnologyFeeds, getEntertainmentFeeds, getScienceFeeds, getHealthFeeds, getSportsFeeds, selectedNewsApi, makeFavouritApi } from "../../api/feeds"
import { getProfileApi } from "../../api/user"

import { ToastContainer, toast } from 'react-toastify';

import "./NewsFeeds.scss"

const NewsFeeds = () => {
    let dispatch = useDispatch()
    let userData = useSelector((state => state.userData))
    let feedState = useSelector(state => state.allFeedsState)
    let history = useHistory()
    let searchState = useSelector(state => state.searchState)

    const [feedsData, setFeedsData] = useState([])
    const [commingData, setCommingData] = useState([])



    useEffect(async () => {
        setCommingData([])
        setFeedsData([])
        dispatch(addWord(""))
        if (feedState == "top") {
            getGenral()
        }
        else if (feedState == "business") {
            getBusiness()
        }
        else if (feedState == "technology") {
            getTechnology()
        }
        else if (feedState == "entertainment") {
            getEntertainment()
        }
        else if (feedState == "science") {
            getScience()
        }
        else if (feedState == "health") {
            getHealth()
        }
        else if (feedState == "sports") {
            getSports()
        }
        else if (feedState == "foryou") {
            getForYou()
        }
        else if (feedState == "following") {
            getFavouritNews()
        }
    }, [feedState])
    useEffect(() => {
        if (commingData.length >= 1) {
            sourtArticals()
        }
    }, [commingData])

    const getBusiness = async () => {
        let res = await getBusinessFeeds()
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
            setCommingData(res.data.data.data)
        }
    }
    const getTechnology = async () => {
        let res = await getTechnologyFeeds()
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
            setCommingData(res.data.data.data)
        }
    }
    const getEntertainment = async () => {
        let res = await getEntertainmentFeeds()
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
            setCommingData(res.data.data.data)
        }
    }
    const getScience = async () => {
        let res = await getScienceFeeds()
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
            setCommingData(res.data.data.data)
        }
    }
    const getHealth = async () => {
        let res = await getHealthFeeds()
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
            setCommingData(res.data.data.data)
        }
    }
    const getSports = async () => {
        let res = await getSportsFeeds()
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
            setCommingData(res.data.data.data)
        }
    }
    const getGenral = async () => {
        let res = await getGenralFeeds()
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
            setCommingData(res.data.data.data)
        }
    }
    const getForYou = async () => {
        let res = await selectedNewsApi(userData.userData.email)
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
            setCommingData(res.data.data[0])
            // console.log("SELECTED NEWS ============= " , res.data);
        }
    }
    const getFavouritNews = async () => {
        let res = await getProfileApi(userData.token, userData.userData._id)
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
            setCommingData(res.data.data.favouritNews)
            // console.log("FAVOURIT NEWS  ============= " , res.data.data.favouritNews);
        }
    }

    const sourtArticals = async () => {
        let sortData = await commingData.sort((a, b) => {
            let currentDate = new Date().getTime()
            let aDate = new Date(a.publishedAt).getTime()
            let bDate = new Date(b.publishedAt).getTime()
            return bDate - aDate
        })

        setFeedsData(sortData)
    }

    const activeFeeds = (name) => {
        dispatch(setFeeds(name))
    }

    const makeFavourit = async (data) => {
        let res = await makeFavouritApi(userData.userData.email, data, feedState == 'top' ? "general" : feedState)
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
            toast.success("Add to your Favourit Success", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    const get_time_diff = (datetime) => {
        var datetime = typeof datetime !== 'undefined' ? datetime : "2014-01-01 01:02:03.123456";

        var datetime = new Date(datetime).getTime();
        var now = new Date().getTime();

        if (isNaN(datetime)) {
            return "";
        }

        // console.log(datetime + " " + now);

        if (datetime < now) {
            var milisec_diff = now - datetime;
        } else {
            var milisec_diff = datetime - now;
        }

        var days = Math.floor(milisec_diff / 1000 / 60 / (60 * 24));

        var date_diff = new Date(milisec_diff);

        return days + " Days " + date_diff.getHours() + " Hours " + date_diff.getMinutes() + " Minutes " + date_diff.getSeconds() + " Seconds";
    }

    console.log("ALL FEEDS =========== ", feedsData);
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
            <div className="newsfeed_conatiner">
                <div className="data">
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
                    <div className="feeds_box">
                        <div className="heading"> Headlines </div>
                        <div className="feeds">
                            {
                                feedsData.length >= 1 ?
                                    feedsData.filter(s => {
                                        if (searchState == "") {
                                            return s
                                        } else if (s.title.toLowerCase().includes(searchState.toLowerCase())) {
                                            return s
                                        }
                                    }).map((data) => {
                                        let currentDate = new Date().getTime()
                                        let cDate = new Date(data.publishedAt).getTime()
                                        return (
                                            <>
                                                <div className="feed">
                                                    <div className='feedData'>
                                                        <div className="title">
                                                            {data.title}
                                                        </div>
                                                        <div className="auther"> {data.source.name} <span className='dot'>  </span> <span> {get_time_diff(data.publishedAt)} </span> </div>
                                                        <div className="dec"> {data.description} </div>
                                                    </div>
                                                    <div className="img_box"> <img src={data.urlToImage} alt="ERROR" /> </div>
                                                    <div className="fvrt" onClick={() => makeFavourit(data)}>
                                                        <Following />
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })
                                    :
                                    <div className="progress" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
                                        <Progress />
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewsFeeds
