var CACHE_NAME = 'cal-equipe-v3';
var STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/logo.png',
  '/icon-192.svg',
  '/icon-512.svg',
  '/Suzana.png',
  '/João.jpg',
  '/Thayane.png',
  '/Lianda.png',
  '/Ravy.jpg'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(names) {
      return Promise.all(
        names.filter(function(n) { return n !== CACHE_NAME; })
             .map(function(n) { return caches.delete(n); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  var url = new URL(e.request.url);
  // Firebase/API calls: network only
  if (url.hostname.includes('firestore') || url.hostname.includes('googleapis') || url.hostname.includes('open-meteo') || url.hostname.includes('gstatic')) {
    return;
  }
  // Static assets: cache first, then network
  e.respondWith(
    caches.match(e.request).then(function(cached) {
      if (cached) {
        // Update cache in background
        fetch(e.request).then(function(res) {
          if (res.ok) {
            caches.open(CACHE_NAME).then(function(cache) {
              cache.put(e.request, res);
            });
          }
        }).catch(function() {});
        return cached;
      }
      return fetch(e.request).then(function(res) {
        if (res.ok) {
          var clone = res.clone();
          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(e.request, clone);
          });
        }
        return res;
      });
    })
  );
});
