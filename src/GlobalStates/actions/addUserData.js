const addUser = (data) => {
    return {
        type: "ADD_USER",
        data: data
    }
}
const addProfile = (data) => {
    return {
        type: "ADD_PROFILE",
        data: data
    }
}

export { addUser , addProfile }