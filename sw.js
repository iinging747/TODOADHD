const CACHE_NAME = "todoadhd-weather-autogps-v18";

const ASSETS = [
  "./",
  "./index.html",
  "./calendar.html",
  "./manifest.webmanifest",
  "./diary-patch.css",
  "./diary-patch.js",
  "./app-polish-v22.css",
  "./app-polish-v22.js",
  "./app-daily-v23.css",
  "./app-daily-v23.js",
  "./route-fix-v24.css",
  "./route-fix-v24.js",
  "./memo-v25.css",
  "./memo-v25.js"
];

function patchCalendarHtml(html) {
  let out = html;
  if (!out.includes("data-diary-patch-v21")) {
    out = out.replace("</head>", "<link rel=\"stylesheet\" href=\"./diary-patch.css?v=21\" data-diary-patch-v21>\n</head>").replace("</body>", "<script src=\"./diary-patch.js?v=21\" data-diary-patch-v21></script>\n</body>");
  }
  if (!out.includes("data-app-polish-v22")) {
    out = out.replace("</head>", "<link rel=\"stylesheet\" href=\"./app-polish-v22.css?v=22\" data-app-polish-v22>\n</head>").replace("</body>", "<script src=\"./app-polish-v22.js?v=22\" data-app-polish-v22></script>\n</body>");
  }
  if (!out.includes("data-app-daily-v23")) {
    out = out.replace("</head>", "<link rel=\"stylesheet\" href=\"./app-daily-v23.css?v=23\" data-app-daily-v23>\n</head>").replace("</body>", "<script src=\"./app-daily-v23.js?v=23\" data-app-daily-v23></script>\n</body>");
  }
  if (!out.includes("data-route-fix-v24")) {
    out = out.replace("</head>", "<link rel=\"stylesheet\" href=\"./route-fix-v24.css?v=24\" data-route-fix-v24>\n</head>").replace("</body>", "<script src=\"./route-fix-v24.js?v=24\" data-route-fix-v24></script>\n</body>");
  }
  if (!out.includes("data-memo-v25")) {
    out = out.replace("</head>", "<link rel=\"stylesheet\" href=\"./memo-v25.css?v=25\" data-memo-v25>\n</head>").replace("</body>", "<script src=\"./memo-v25.js?v=25\" data-memo-v25></script>\n</body>");
  }
  return out;
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
