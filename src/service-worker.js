/* eslint-disable no-restricted-globals */
const CACHE_NAME = 'pictos-cache-v1';

const FILES_TO_CACHE = [
  '/offline.html',
];

self.addEventListener('install', (event) => {
  console.log(event);
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(FILES_TO_CACHE);
      }),
  );
});

self.addEventListener('activate', (event) => {
  console.log(event);
  event.waitUntil(
    caches.keys().then(keyList => Promise.all(keyList.map((key) => {
      if (key !== CACHE_NAME) {
        console.log('[ServiceWorker] Removing old cache', key);
        return caches.delete(key);
      }
      return null;
    }))),
  );
});

self.addEventListener('fetch', (event) => {
  console.log(event);
  if (event.request.mode !== 'navigate') {
    return;
  }
  event.respondWith(
    fetch(evt.request)
      .catch(() => caches.open(CACHE_NAME)
        .then(cache => cache.match('offline.html'))),
  );
});
