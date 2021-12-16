
let user = localStorage.getItem('userData')
let token = localStorage.getItem("token")

var initialState = {
    userData: user ? JSON.parse(user) : null,
    token: token ? token : null
}

const userDataState = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_USER":
            let data = action.data
            return (
                state = {
                    token: data.token,
                    userData: data.user
                }
            )
        case "ADD_PROFILE":
            let pdata = action.data
            return (
                state = {
                    ...state,
                    userData: pdata
                }
            )
        default: return state
    }

}

export default userDataState