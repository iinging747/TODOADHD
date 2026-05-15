const CACHE_NAME = "todoadhd-diary-patch-v21";

const ASSETS = [
  "./",
  "./index.html",
  "./calendar.html",
  "./manifest.webmanifest",
  "./diary-patch.css",
  "./diary-patch.js"
];

function patchCalendarHtml(html) {
  if (html.includes("diary-patch-v21")) return html;
  return html
    .replace("</head>", "<link rel=\"stylesheet\" href=\"./diary-patch.css?v=21\" data-diary-patch-v21>\n</head>")
    .replace("</body>", "<script src=\"./diary-patch.js?v=21\" data-diary-patch-v21></script>\n</body>");
}

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  const wantsCalendar = url.pathname.endsWith("/calendar.html") || url.pathname.endsWith("/TODOADHD/") || url.pathname.endsWith("/TODOADHD");
  if (wantsCalendar) {
    event.respondWith(fetch(event.request, { cache: "no-store" }).then(async response => {
      const type = response.headers.get("content-type") || "";
      if (!type.includes("text/html")) return response;
      const headers = new Headers(response.headers);
      headers.set("content-type", "text/html; charset=utf-8");
      headers.delete("content-length");
      const patched = new Response(patchCalendarHtml(await response.text()), { status: response.status, statusText: response.statusText, headers });
      const copy = patched.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
      return patched;
    }).catch(() => caches.match(event.request).then(cached => cached || caches.match("./calendar.html"))));
    return;
  }
  event.respondWith(fetch(event.request).then(response => {
    const copy = response.clone();
    caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
    return response;
  }).catch(() => caches.match(event.request).then(cached => cached || caches.match("./calendar.html"))));
});
