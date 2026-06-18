const CACHE_NAME = "abbq-stock-v1";

const urlsToCache = [

    "./",

    "./index.html",

    "./input.html",

    "./history.html",

    "./style.css",

    "./app.js",

    "./input.js",

    "./history.js",

    "./export.js",

    "./abbq_logo.png"

];

self.addEventListener("install",event=>{

    event.waitUntil(

        caches.open(CACHE_NAME)

        .then(cache=>{

            return cache.addAll(urlsToCache);

        })

    );

});

self.addEventListener("fetch",event=>{

    event.respondWith(

        caches.match(event.request)

        .then(response=>{

            return response || fetch(event.request);

        })

    );

});