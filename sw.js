// Service Worker für PWA mit Offline-Unterstützung
const CACHE_NAME = 'weekly-challenge-v1';
const pathPrefix = '/something_new/';
const urlsToCache = [
  pathPrefix,
  pathPrefix + 'index.html',
  pathPrefix + 'style.css',
  pathPrefix + 'script.js',
  pathPrefix + 'manifest.json'
];

// Installation des Service Workers
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching files');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Aktivierung des Service Workers
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch-Event mit Cache-First-Strategie
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache-Hit - gebe die gecachte Ressource zurück
        if (response) {
          return response;
        }

        // Klone die Anfrage, da sie nur einmal verwendet werden kann
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then((response) => {
          // Prüfe, ob die Antwort gültig ist
          if (!response || response.status !== 200 || (response.type !== 'basic' && response.type !== 'cors')) {
            return response;
          }

          // Klone die Antwort, da sie nur einmal verwendet werden kann
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });

          return response;
        }).catch(() => {
          // Falls Offline und keine gecachte Version vorhanden
          return caches.match(pathPrefix + 'index.html');
        });
      })
  );
});

// Benachrichtigungs-Event-Handler
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event.notification.tag);
  event.notification.close();

  // Öffne die App, wenn auf die Benachrichtigung geklickt wird
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // Wenn bereits ein Fenster offen ist, fokussiere es
        for (let i = 0; i < clientList.length; i++) {
          const client = clientList[i];
          if (client.url === pathPrefix && 'focus' in client) {
            return client.focus();
          }
        }
        // Ansonsten öffne ein neues Fenster
        if (clients.openWindow) {
          return clients.openWindow(pathPrefix);
        }
      })
  );
});

// Push-Event für zukünftige Push-Benachrichtigungen
self.addEventListener('push', (event) => {
  let data = { title: 'Jede Woche etwas Neues', body: 'Neue wöchentliche Herausforderung!' };
  
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data.body = event.data.text();
    }
  }

  const options = {
    body: data.body,
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23667eea'/><text y='.9em' font-size='90' x='50%' text-anchor='middle'>🫎</text></svg>",
    badge: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23667eea'/><text y='.9em' font-size='90' x='50%' text-anchor='middle'>🫎</text></svg>",
    vibrate: [200, 100, 200],
    tag: 'weekly-challenge',
    requireInteraction: false
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});
