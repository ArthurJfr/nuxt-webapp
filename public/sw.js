// Service Worker pour WikiNotes PWA
const CACHE_NAME = 'wikinotes-v1';
const urlsToCache = [
  '/',
  '/manifest.json',
  // Ajouter d'autres ressources importantes ici
];

// Installation du Service Worker
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

// Activation du Service Worker
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Intercept des requêtes réseau
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Retourne le cache s'il existe
        if (response) {
          return response;
        }
        // Sinon, fait la requête réseau
        return fetch(event.request);
      }
    )
  );
}); 