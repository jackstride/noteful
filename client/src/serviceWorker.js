// Register service worker
export const register = () => {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("./service-worker.js")
        .then((reg) => {
          console.log("Service Worker Registered");
          reg.pushManager.getSubscription().then((sub) => {
            if (sub === null) {
              // If no subscription ask to subscribe
              Notification.requestPermission(function (status) {
                console.log("Notification permission status:", status);
              });
            } else {
              console.log("hit this");
            }
          });
        })
        .catch((err) => console.log("There was an error registering "));
    });
  }
};

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

window.addEventListener("push", function (e) {
  var body;

  if (e.data) {
    body = e.data.text();
  } else {
    body = "Push message no payload";
  }

  var options = {
    body: body,
    icon: "images/notification-flat.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
    actions: [
      {
        action: "explore",
        title: "Explore this new world",
        icon: "images/checkmark.png",
      },
      {
        action: "close",
        title: "I don't want any of this",
        icon: "images/xmark.png",
      },
    ],
  };
  e.waitUntil(
    window.registration.showNotification("Push Notification", options)
  );
});
