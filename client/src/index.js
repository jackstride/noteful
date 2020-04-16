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

async function subscribe() {
  console.log("rasn");
  let sw = await navigator.serviceWorker.ready;
  let push = await sw.seriveWorker.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(
      process.env.REACT_APP_VAPID_PUBLIC
    ),
  });
  console.log(JSON.stringify(push));
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

serviceWorker.register();
