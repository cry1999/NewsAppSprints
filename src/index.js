import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom"

import { Provider } from "react-redux"
import globalData from './GlobalStateStore';


import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={globalData}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

