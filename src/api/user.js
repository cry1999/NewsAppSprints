import axios from "../axiosInstance"

const getProfileApi = async (token, id) => {
    let resolved = {
        data: null,
        error: null
    }

    try {


        let res = await axios({
            url: "/api/auth/getUserbyid",
            method: "POST",
            headers: {
                authorization: `Bearer ${token}`
            },
            data: {
                _id: id
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
const changeUserNameApi = async (token, userName, email, id) => {
    let resolved = {
        data: null,
        error: null
    }

    try {


        let res = await axios({
            url: "/api/auth/updateuserinfo",
            method: "POST",
            headers: {
                authorization: `Bearer ${token}`
            },
            data: {
                userName: userName,
                email: email,
                _id: id
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
const changePasswordApi = async (token, password, id) => {
    let resolved = {
        data: null,
        error: null
    }
    try {


        let res = await axios({
            url: "/api/auth/changepassword",
            method: "POST",
            headers: {
                authorization: `Bearer ${token}`
            },
            data: {
                newpassword: password,
                _id: id
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

const getAllUserApi = async (token) => {
    let resolved = {
        data: null,
        error: null
    }
    try {


        let res = await axios({
            url: "/api/auth/getallusers",
            method: "GET",
            headers: {
                authorization: `Bearer ${token}`
            },
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

const followUserApi = async (token, userId, followingId) => {
    let resolved = {
        data: null,
        error: null
    }
    try {


        let res = await axios({
            url: `/api/auth/follow/${followingId}`,
            method: "POST",
            headers: {
                authorization: `Bearer ${token}`
            },
            data: {
                _id: userId
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
const unFollowUserApi = async (token, userId, followingId) => {
    let resolved = {
        data: null,
        error: null
    }
    try {


        let res = await axios({
            url: `/api/auth/unfollowing/${followingId}`,
            method: "POST",
            headers: {
                authorization: `Bearer ${token}`
            },
            data: {
                _id: userId
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

const followUsersIdApi = async (token, email) => {
    let resolved = {
        data: null,
        error: null
    }
    try {


        let res = await axios({
            url: `/api/auth/getfollowingid`,
            method: "POST",
            headers: {
                authorization: `Bearer ${token}`
            },
            data: {
                email
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
const addFavouritCatApi = async (email, name) => {
    let resolved = {
        data: null,
        error: null
    }
    try {


        let res = await axios({
            url: `/api/auth/addfavouritcategory`,
            method: "POST",
            data: {
                email: email,
                name: name
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



export { changeUserNameApi, changePasswordApi, getProfileApi, getAllUserApi, followUserApi, unFollowUserApi, followUsersIdApi , addFavouritCatApi }