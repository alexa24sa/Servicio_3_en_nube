self.addEventListener('install', event => {
    console.log('SW instalado');
    event.waitUntil(
      caches.open('mi-cache').then(cache => {
        return cache.addAll([
          '/',
          '/index.html',
          '/app.js',
          '/icons/icon-192.png',
          '/icons/icon-512.png'
        ]);
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
  