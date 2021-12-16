import axios from "../axiosInstance"

const registerApi = async (data) => {
    let resolved = {
        data: null,
        error: null
    }

    try {


        let res = await axios({
            url: "/api/auth/register",
            method: "POST",
            data: {
                userName: data.userName,
                email: data.email,
                password: data.password
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
const otpApi = async (email, otp) => {
    let resolved = {
        data: null,
        error: null
    }

    try {


        let res = await axios({
            url: "/api/auth/checkotp",
            method: "POST",
            data: {
                otp: otp,
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
const LoginApi = async (data) => {
    let resolved = {
        data: null,
        error: null
    }

    try {


        let res = await axios({
            url: "/api/auth/userlogin",
            method: "POST",
            data: {
                email: data.email,
                password: data.password
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

const ResetApi = async (data) => {
    let resolved = {
        data: null,
        error: null
    }

    try {


        let res = await axios({
            url: "/api/auth/forgetPassword",
            method: "POST",
            data: {
                email: data.email,
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
const ResetConfirmApi = async (data) => {
    let resolved = {
        data: null,
        error: null
    }

    try {
        let res = await axios({
            url: "/api/auth/resetpassword",
            method: "POST",
            data: {
                email: data.email,
                otp: data.code,
                password:data.password
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



export { registerApi, otpApi, LoginApi, ResetApi, ResetConfirmApi }