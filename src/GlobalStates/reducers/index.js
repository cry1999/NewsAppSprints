import { combineReducers } from "redux"

import userData from "./AddUser"
import allFeedsState from "./Feeds"
import searchState from "./Search"

const allReducers = combineReducers({
    userData,
    allFeedsState,
    searchState
})

export default allReducers