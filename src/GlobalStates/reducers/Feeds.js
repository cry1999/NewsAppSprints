var initialState = "top"

const AllFeedsState = (state = initialState, action) => {
    switch (action.type) {
        case "SET_FEEDS":
            let data = action.data
            return (
                state = data
            )
            break;

        default:
            return state
            break;
    }
}

export default AllFeedsState