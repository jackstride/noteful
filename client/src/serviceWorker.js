const axios = require("axios");

// Register service worker
export const register = () => {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("./service-worker.js")
        .then((reg) => {
          console.log("Service Worker Registered");
          reg.pushManager.getSubscription().then((sub) => {
            let isSubscribed = !(sub === null);
            if (isSubscribed) {
              subscribe();
              return;
            } else {
              Notification.requestPermission(function (status) {
                console.log("Notification permission status:", status);
                if (status) {
                  subscribe();
                  return;
                }
              });
            }
          });
        })
        .catch((err) => console.log(err));
    });
  }
};

// Conver key to base64
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

async function subscribe() {
  let applicationServerKey = urlBase64ToUint8Array(
    process.env.REACT_APP_VAPID_PUBLIC
  );
  let sw = await navigator.serviceWorker.ready;
  let push = await sw.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey,
  });
  console.log(JSON.stringify(push.endpoint));
  axios({
    method: "POST",
    url: process.env.REACT_APP_ENDPOINT + "/subscribe",
    data: JSON.stringify(push),
    withCredentials: true,
    headers: {
      "Content-type": "application/json",
    },
  });
  return;
}

// fetch(process.env.REACT_APP_ENDPOINT + "/subscribe", {
//   method: "POST",
//   body: JSON.stringify(push),
//   headers: {
//     "Content-Type": "application/json"
//   },
//   credentials: "include"
// })

window.addEventListener("fetch", (e) => {
  console.log("this");
  e.respondWith(console.log(e.request));
});
