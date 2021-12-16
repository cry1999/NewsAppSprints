import { createStore } from "redux"

import allReducers from "./GlobalStates/reducers/index"

const globalData = createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default globalData