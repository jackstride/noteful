import React from "react";
import { render } from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import "./App.scss";

import * as serviceWorker from "./serviceWorker";
const axios = require("axios");

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

// Notification.requestPermission((status) => {
//   console.log(status);
// });

// await axios.post("/subscribe", {
//   withCredentials: true,
//   body: JSON.stringify(sub),
//   headers: {
//     "content-type": "application/json",
//   },
// });

//   await fetch("/subscribe", {
//     method: "POST",
//     body: JSON.stringify(sub),
//     headers: {
//       "content-type": "application/json",
//     },
//     credentials: "same-origin",
//   });
// }

serviceWorker.register();
