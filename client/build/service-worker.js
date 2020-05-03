let cacheName = "v1";
let cacheFiles = [
  "/static/css/main.f4556baa.chunk.css",
  "/static/js/main.b9d0cc61.chunk.js",
  "/static/js/runtime-main.cea588d5.js",
  "/static/js/2.371f77a5.chunk.js",
  "/index.html",
  "/precache-manifest.6cf56f947977c0c642df727be929d055.js",
  "/service-worker.js",
  "/static/js/2.371f77a5.chunk.js.LICENSE.txt",
  "/static/media/First.1372b6df.gif",
  "/static/media/dashboard_nav.afeb8580.jpg",
  "/static/media/github.2012c204.svg",
  "/static/media/google.7e5484e9.svg",
  "/static/media/header.9363a385.jpg",
  "/static/media/iphone_preview.c78b8c31.png",
  "/static/media/logout_space.6492db73.png",
  "/static/media/noteful_blue.4ff48a21.svg",
  "/static/media/noteful_bw.09017aa7.svg",
  "/static/media/noteful_logo.643d8225.svg",
  "/static/media/pencil.8ee82000.png",
  "/static/media/reading_book.a276f542.jpg",
  "/static/media/searching.133d0334.jpg",
  "/static/media/second.fd82d47e.gif",
  "/static/media/stacking.5ea6c2a5.jpg",
  "/static/media/third.dc3f69de.gif",
];

// Register service worker
if ("serviceWorker" in navigator) {
  self.addEventListener("load", () => {
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
                return;
              }
            });
          }
        });
      })
      .catch((err) => console.log(err));
  });
}

//Intsall and cache
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        return cache.addAll(cacheFiles);
      })
      .catch((err) => console.log(err))
  );
});

//Fetch cache pages
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      if (res) {
        return res;
      }
      return fetch(e.request);
    })
  );
});

async function subscribe() {
  let applicationServerKey = urlBase64ToUint8Array(
    "BEUgCF2iujgE9kDd0eyfnlNTxTThpYOXY-DB2OuJZqp6FQeFZScmk71GBo6dS1QSuNwg3YneoUbEKtsS5txN5BU"
  );
  let sw = await navigator.serviceWorker.ready;
  let push = await sw.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey,
  });
  console.log(JSON.stringify(push.endpoint));
  fetch("https://api.noteful.app/subscribe", {
    method: "POST",
    body: JSON.stringify(push),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  return;
}

// Listen for push notifications
self.addEventListener("push", function (e) {
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
  e.waitUntil(self.registration.showNotification("Push Notification", options));
});

// Helper function to subscribe to notifications
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
