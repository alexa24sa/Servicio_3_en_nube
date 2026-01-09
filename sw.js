self.addEventListener('install', event => {
    console.log('SW instalado');
    event.waitUntil(
      caches.open('mi-cache-v2').then(cache => {
        return cache.addAll([
          '/',
          '/index.html',
          '/app.js',
          '/download.js',
          '/styles.css',
          '/manifest.json',
          '/icons/icon-192.png',
          '/icons/icon-512.png'
        ]);
      })
    );
  });
  
  self.addEventListener('activate', event => {
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== 'mi-cache-v2') {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });
  
  self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request).then(resp => {
        return resp || fetch(event.request);
      })
    );
  });
  