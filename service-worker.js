self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open('v1').then((cache) => {
            return cache.addAll([
                "./",
                "index.html",
                "bug-repro.webmanifest",
                "favicon.ico",
                "apple-touch-icon.png",
                "404.html",
            ]);
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then(r => {
            if (r) {
                return r;
            }
            return fetch(event.request.clone())
                .then(response => {
                    if (response.status < 400) {
                        caches.open(version).then(cache => cache.put(event.request, response));
                        return response.clone();
                    } else {
                        const req404 = new Request("/404.html");
                        return caches.match(req404);
                    }
                })
        })
    )
});
