const CACHE_NAME = "todoadhd-pomodoro-focus-v10";

const ENGLISH_STICKERS = [
  "budget.png",
  "planning.png",
  "study.png",
  "date.png",
  "binge-drama.png",
  "marketing-analysis.png",
  "debt-payment.png",
  "walk.png",
  "late-night-work.png",
  "self-praise.png",
  "shopping.png",
  "ai-study.png",
  "travel-planning.png",
  "video-editing.png",
  "watch-movie.png",
  "completion-stamp.png",
  "conspiracy-research.png",
  "journaling.png",
  "savings.png",
  "stock-crypto-chart.png",
  "investing-study.png",
  "reading.png",
  "sleep.png",
  "meet-friends.png",
  "work-at-cafe.png",
  "crypto-meeting.png",
  "content-meeting.png",
  "client-communication.png",
  "write-todo-list.png",
  "twitter-search.png",
  "skincare.png",
  "day-wrap-up.png"
];

const LEGACY_STICKERS = [
  "가계부.png",
  "계획세우기.png",
  "공부하기.png",
  "데이트.png",
  "드라마 정주행.png",
  "마케팅성과분석.png",
  "빚갚음.png",
  "산책하기'.png",
  "새벽작업.png",
  "셀프칭찬.png",
  "쇼핑.png",
  "에이아이공부.png",
  "여행계획세우기.png",
  "영상편집.png",
  "영화보기.png",
  "완료도장.png",
  "음모론 정보.png",
  "일기쓰기.png",
  "저축.png",
  "주식코인차트보기.png",
  "주식코인투자공부.png",
  "책읽기.png",
  "취짐.png",
  "친구만나기.png",
  "카페에서 작업.png",
  "코인미팅.png",
  "콘텐츠회의.png",
  "클라이언트커뮤니케이션.png",
  "투두리스트 작성.png",
  "트위터서칭.png",
  "피부관리.png",
  "하루마무리.png"
];

const stickerAssets = [...ENGLISH_STICKERS, ...LEGACY_STICKERS].map((file) => `./public/stickers/${file}`);

const ASSETS = [
  "./",
  "./index.html",
  "./preview.html",
  "./calendar.html",
  "./manifest.webmanifest",
  ...stickerAssets
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
