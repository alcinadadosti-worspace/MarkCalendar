importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCaX4xQeeJpl1b-DDaKk0-6iYTQnlNeQBY",
  authDomain: "calendario-equipe-34d15.firebaseapp.com",
  projectId: "calendario-equipe-34d15",
  storageBucket: "calendario-equipe-34d15.firebasestorage.app",
  messagingSenderId: "934121667129",
  appId: "1:934121667129:web:41baf3f0fe744be8166be8"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || 'Calendário';
  const options = {
    body: payload.notification?.body || '',
    icon: '/logo.png',
    badge: '/icon-192.svg',
    tag: payload.data?.tag || ('cal-' + Date.now()),
    data: { url: '/' },
    vibrate: [200, 100, 200]
  };
  return self.registration.showNotification(title, options);
});

self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      for (const c of list) {
        if (c.url && 'focus' in c) return c.focus();
      }
      if (clients.openWindow) return clients.openWindow('/');
    })
  );
});
