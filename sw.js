// sw.js - Service Worker
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

// Listen for a message from the main app to show a notification
self.addEventListener('message', (event) => {
  if (event.data.type === 'SCHEDULE_NOTIFICATION') {
    const { title, body, delay } = event.data;

    // We use a timeout here for simple scheduling while the browser is open.
    // For true background scheduling without the tab open, 
    // modern browsers use the "Notification Triggers API" (Experimental).
    setTimeout(() => {
      self.registration.showNotification(title, {
        body: body,
        icon: 'icon.png', // Ensure this matches your manifest icon
        vibrate: [200, 100, 200],
        badge: 'icon.png',
        tag: 'task-notification'
      });
    }, delay);
  }
});