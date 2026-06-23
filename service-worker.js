
// ===============================
// NAMA CACHE
// ===============================
const CACHE_NAME = "abbq-stock-opname-v1";

// ===============================
// FILE YANG DI-CACHE
// ===============================
const CACHE_FILES = [
    "./",
    "./index.html",
    "./input.html",
    "./history.html",
    "./detail_history.html",
    "./style.css",
    "./app.js",
    "./input.js",
    "./history.js",
    "./detail_history.js",
    "./export.js",
    "./manifest.json",
    "./abbq_logo.png"
];

// ===============================
// INSTALL SERVICE WORKER
// ===============================
self.addEventListener("install", event => {

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(CACHE_FILES);
            })
    );

    self.skipWaiting();
});

// ===============================
// ACTIVATE SERVICE WORKER
// ===============================
self.addEventListener("activate", event => {

    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.map(key => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );

    self.clients.claim();
});

// ===============================
// FETCH (OFFLINE STRATEGY)
// ===============================
self.addEventListener("fetch", event => {

    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // kalau ada di cache, pakai cache
                if (response) {
                    return response;
                }

                // kalau tidak ada, ambil dari network
                return fetch(event.request)
                    .then(networkResponse => {

                        // optional: cache baru
                        return caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, networkResponse.clone());
                                return networkResponse;
                            });

                    })
                    .catch(() => {
                        // fallback kalau offline total
                        return caches.match("./index.html");
                    });

            })
    );
});
