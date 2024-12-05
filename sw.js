self.addEventListener("install", (event) => {
    self.skipWaiting();
    event.waitUntil(
        (async () => {
           const cache = await caches.open("Cache")
           cache.add(new Request("/offline.html"))
        })() 
    );
});

self.addEventListener("activate",(event)=>{
    client.claim()
    event.waitUntil(
        (async () =>{
            const keys = await caches.keys()
        })()
    )
 //Activé la nouvelle version
})

self.addEventListener("fetch",(event)=>{
    if (event.request.mode === 'navigate') {
        event.respondWith(
            (async ()=> {
                try {
                    const preloadResponse = await event.preloadResponse
                    if (preloadResponse) {
                        return preloadResponse
                    }
                    return await fetch(event.request)
                } catch (error) {
                    const cache = await caches.open("Cache")
                    return await cache.match("/offline.html")
                }
        })())
    }
})