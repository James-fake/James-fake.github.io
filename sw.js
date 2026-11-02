const CACHE_NAME = 'markcraft-blog-v1';
const ASSETS = [
    '/assets/og/markcraft-用户手册.svg',
    '/assets/og/markdown-入门教程.svg',
    '/assets/og/知识链接体系指南.svg',
    '/assets/og/编程语言.svg',
    '/assets/og/python.svg',
    '/assets/og/javascript.svg',
    '/assets/og/新文件.svg',
    '/index.html',
    '/archive.html',
    '/tags.html',
    '/rss.xml',
    '/sitemap.xml',
    '/robots.txt',
    '/search-index.json',
    '/search.html',
    '/404.html',
    '/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
    )
  );
});
