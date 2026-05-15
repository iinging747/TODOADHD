const CACHE_NAME = "todoadhd-action-parser-v14";

const ASSETS = [
  "./",
  "./index.html",
  "./preview.html",
 "./calendar.html",
  "./manifest.webmanifest",
  "./public/stickers/sticker-sheet.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => Promise.all(ASSETS.map((asset) => cache.add(asset).catch(() => null))))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request)));
});
