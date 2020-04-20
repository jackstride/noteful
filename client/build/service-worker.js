let cacheName = 'v1';
let cacheFiles = [
  "/index.html",
  "/static/css/main.c33b6eeb.chunk.css",
 "/static/js/2.ee82bd95.chunk.js",
"/static/js/2.ee82bd95.chunk.js.LICENSE.txt",
"/static/js/main.b5abbe28.chunk.js",
"/static/js/runtime-main.cea588d5.js",
"/static/media/First.1372b6df.gif",
"/static/media/browserheader.9e7a7585.webp",
 "/static/media/dashboard_nav.afeb8580.jpg",
"/static/media/github.07883e93.svg",
"/static/media/google.7e5484e9.svg",
 "/static/media/header.9363a385.jpg",
"/static/media/iphone_preview.cb924d85.webp",
"/static/media/noteful_blue.4ff48a21.svg",
 "/static/media/noteful_bw.09017aa7.svg",
"/static/media/noteful_logo.643d8225.svg",
"/static/media/pencil.8ee82000.png",
"/static/media/reading_book.a276f542.jpg",
"/static/media/register_image.33c6d7a5.png",
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
            if(isSubscribed) {
              subscribe();
              return;
            } else {
              Notification.requestPermission(function (status) {
                console.log("Notification permission status:", status);
                if(status){
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

//Intsall and cache
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(cacheFiles)
    }).catch(err=>console.log(err))
  )
})

//Fetch cache pages
self.addEventListener('fetch',e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      if(res) {
        return res;
      }
      return fetch(e.request)
    })
  )
})



  async function subscribe() {
    let applicationServerKey = urlBase64ToUint8Array("BEUgCF2iujgE9kDd0eyfnlNTxTThpYOXY-DB2OuJZqp6FQeFZScmk71GBo6dS1QSuNwg3YneoUbEKtsS5txN5BU");
    let sw = await navigator.serviceWorker.ready;
    let push = await sw.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey,
    })
    console.log(JSON.stringify(push.endpoint));
    // fetch("http://localhost:5000/subscribe", {
    //   method: "POST",
    //   body: JSON.stringify(push),
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   credentials: "include"
    // })
    return;
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




  self.addEventListener('push', function(e) {
    var body;
  
    if (e.data) {
      body = e.data.text();
    } else {
      body = 'Push message no payload';
    }
  
    var options = {
      body: body,
      icon: 'images/notification-flat.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      },
      actions: [
        {action: 'explore', title: 'Explore this new world',
          icon: 'images/checkmark.png'},
        {action: 'close', title: 'I don\'t want any of this',
          icon: 'images/xmark.png'},
      ]
    };
    e.waitUntil(
      self.registration.showNotification('Push Notification', options)
    );
  });