var initialState = ""

const SearchState = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_SEARCH":
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

export default SearchState