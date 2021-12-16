import axios from "../axiosInstance"

const getBusinessFeeds = async (token, email) => {
    let resolved = {
        data: null,
        error: null
    }
    try {


        let res = await axios({
            url: "/api/feeds/businessnews",
            method: "POST",
            headers: {
                authorization: `Bearer ${token}`
            },
            data: {
                email: email
            }
        })
        resolved.data = res.data

    } catch (err) {
        // if (err.response) {
        //     resolved.error = err
        // } else {
        resolved.error = "SomeThing Went Wrong"
        // }
    }

    return resolved

}
const getGenralFeeds = async (token, email) => {
    let resolved = {
        data: null,
        error: null
    }
    try {


        let res = await axios({
            url: "/api/feeds/generalnews",
            method: "POST",
            headers: {
                authorization: `Bearer ${token}`
            },
            data: {
                email: email
            }
        })
        resolved.data = res.data

    } catch (err) {
        // if (err.response) {
        //     resolved.error = err
        // } else {
        resolved.error = "SomeThing Went Wrong"
        // }
    }

    return resolved

}
const getTechnologyFeeds = async (token, email) => {
    let resolved = {
        data: null,
        error: null
    }
    try {


        let res = await axios({
            url: "/api/feeds/tecnologynews",
            method: "POST",
            headers: {
                authorization: `Bearer ${token}`
            },
            data: {
                email: email
            }
        })
        resolved.data = res.data

    } catch (err) {
        // if (err.response) {
        //     resolved.error = err
        // } else {
        resolved.error = "SomeThing Went Wrong"
        // }
    }

    return resolved

}
const getEntertainmentFeeds = async (token, email) => {
    let resolved = {
        data: null,
        error: null
    }
    try {


        let res = await axios({
            url: "/api/feeds/entertainmentnews",
            method: "POST",
            headers: {
                authorization: `Bearer ${token}`
            },
            data: {
                email: email
            }
        })
        resolved.data = res.data

    } catch (err) {
        // if (err.response) {
        //     resolved.error = err
        // } else {
        resolved.error = "SomeThing Went Wrong"
        // }
    }

    return resolved

}
const getScienceFeeds = async (token, email) => {
    let resolved = {
        data: null,
        error: null
    }
    try {


        let res = await axios({
            url: "/api/feeds/sciencenews",
            method: "POST",
            headers: {
                authorization: `Bearer ${token}`
            },
            data: {
                email: email
            }
        })
        resolved.data = res.data

    } catch (err) {
        // if (err.response) {
        //     resolved.error = err
        // } else {
        resolved.error = "SomeThing Went Wrong"
        // }
    }

    return resolved

}
const getHealthFeeds = async (token, email) => {
    let resolved = {
        data: null,
        error: null
    }
    try {


        let res = await axios({
            url: "/api/feeds/healthnews",
            method: "POST",
            headers: {
                authorization: `Bearer ${token}`
            },
            data: {
                email: email
            }
        })
        resolved.data = res.data

    } catch (err) {
        // if (err.response) {
        //     resolved.error = err
        // } else {
        resolved.error = "SomeThing Went Wrong"
        // }
    }

    return resolved

}
const getSportsFeeds = async (token, email) => {
    let resolved = {
        data: null,
        error: null
    }
    try {


        let res = await axios({
            url: "/api/feeds/sportsnews",
            method: "POST",
            headers: {
                authorization: `Bearer ${token}`
            },
            data: {
                email: email
            }
        })
        resolved.data = res.data

    } catch (err) {
        // if (err.response) {
        //     resolved.error = err
        // } else {
        resolved.error = "SomeThing Went Wrong"
        // }
    }

    return resolved

}
const selectedNewsApi = async (email) => {
    let resolved = {
        data: null,
        error: null
    }
    try {


        let res = await axios({
            url: "/api/feeds/selectnews",
            method: "POST",
            data: {
                email: email
            }
        })
        resolved.data = res.data

    } catch (err) {
        // if (err.response) {
        //     resolved.error = err
        // } else {
        resolved.error = "SomeThing Went Wrong"
        // }
    }

    return resolved

}
const makeFavouritApi = async (email, data, sector) => {
    let resolved = {
        data: null,
        error: null
    }
    try {
        let res = await axios({
            url: "/api/auth/followfaviourtnews",
            method: "POST",
            data: {
                data: data,
                sector: sector,
                email: email
            }
        })
        resolved.data = res.data

    } catch (err) {
        // if (err.response) {
        //     resolved.error = err
        // } else {
        resolved.error = "SomeThing Went Wrong"
        // }
    }

    return resolved

}

export { getBusinessFeeds, getGenralFeeds, getTechnologyFeeds, getEntertainmentFeeds, getScienceFeeds, getHealthFeeds, getSportsFeeds, selectedNewsApi, makeFavouritApi }