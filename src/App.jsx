import React, { useEffect } from 'react'
import { Route, Switch } from "react-router-dom"

import NewsFeeds from './screens/NewFeeds/NewsFeeds';
import Login from './screens/Register/Login';
import Register from './screens/Register/Register';
import Nav from './screens/NavBar/Nav';
import Profile from "./screens/Profile/Profile"
import Reset from './screens/Register/Reset';

import { useDispatch, useSelector } from 'react-redux'
import { getProfileApi } from "./api/user"
import { addProfile } from "./GlobalStates/actions/addUserData"

import { ToastContainer, toast } from 'react-toastify';

import './App.scss';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  let dispatch = useDispatch()
  let userDataState = useSelector((state) => state.userData)

  useEffect(async () => {
    if (userDataState.token != null || userDataState.userData != null) {
      let res = await getProfileApi(userDataState.token, userDataState.userData._id)
      if (res.error != null) {
        toast.error(res.error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        localStorage.setItem("userData", JSON.stringify(res.data.data))
        dispatch(addProfile(res.data.data))
      }
    }
  }, [])

  return (
    <>
      <div className="app_container">
        <Nav />
        <Switch>
          <Route exact path="/" component={NewsFeeds} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/reset" component={Reset} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </div>
    </>
  )
}

export default App;
