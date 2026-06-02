var CACHE_NAME = 'cal-equipe-v4';
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
  if (url.hostname.includes('firestore') || url.hostname.includes('googleapis') || url.hostname.includes('open-meteo') || url.hostname.includes('gstatic') || url.hostname.includes('fcm.googleapis')) {
    return;
  }
  e.respondWith(
    caches.match(e.request).then(function(cached) {
      if (cached) {
        fetch(e.request).then(function(res) {
          if (res.ok) {
            caches.open(CACHE_NAME).then(function(cache) { cache.put(e.request, res); });
          }
        }).catch(function() {});
        return cached;
      }
      return fetch(e.request).then(function(res) {
        if (res.ok) {
          var clone = res.clone();
          caches.open(CACHE_NAME).then(function(cache) { cache.put(e.request, clone); });
        }
        return res;
      });
    })
  );
});

// ============ PUSH NOTIFICATIONS ============
self.addEventListener('push', function(e) {
  var data = {};
  try { data = e.data.json(); } catch(err) { data = { title: 'Calendário', body: e.data ? e.data.text() : 'Nova atividade' }; }

  var title = data.title || data.notification?.title || 'Calendário da Equipe';
  var body = data.body || data.notification?.body || 'Nova atividade';
  var icon = data.icon || data.notification?.icon || '/logo.png';
  var tag = data.tag || data.notification?.tag || ('cal-' + Date.now());
  var url = (data.data && data.data.url) || '/';

  e.waitUntil(
    self.registration.showNotification(title, {
      body: body,
      icon: icon,
      badge: '/icon-192.svg',
      tag: tag,
      data: { url: url },
      requireInteraction: false,
      vibrate: [200, 100, 200]
    })
  );
});

self.addEventListener('notificationclick', function(e) {
  e.notification.close();
  var targetUrl = (e.notification.data && e.notification.data.url) || '/';
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(list) {
      for (var i = 0; i < list.length; i++) {
        var c = list[i];
        if (c.url.includes(self.registration.scope) && 'focus' in c) {
          return c.focus();
        }
      }
      if (clients.openWindow) return clients.openWindow(targetUrl);
    })
  );
});
