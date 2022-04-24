import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
// import { createStore } from 'redux';
import store from "./redux/store";

import App from "./App";

// const reduxStore = createStore(rootReducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// )
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
