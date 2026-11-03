const CACHE_NAME = 'markcraft-blog-mw074sngpq9p';
const ASSETS = [
    'assets/og/markcraft-用户手册.svg',
    'assets/og/markdown-入门教程.svg',
    'assets/og/知识链接体系指南.svg',
    'assets/og/编程语言.svg',
    'assets/og/python.svg',
    'assets/og/javascript.svg',
    'assets/og/新文件.svg',
    'index.html',
    'archive.html',
    'tags.html',
    'about.html',
    'posts/markcraft-用户手册/index.html',
    'posts/markdown-入门教程/index.html',
    'posts/知识链接体系指南/index.html',
    'posts/编程语言/index.html',
    'posts/python/index.html',
    'posts/javascript/index.html',
    'posts/新文件/index.html',
    '404.html',
    'rss.xml',
    'sitemap.xml',
    'robots.txt',
    'search-index.json',
    'search.html',
    'manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', event => {
  // 页面导航：网络优先，成功则回写缓存；离线时回退缓存
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).then(response => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        return response;
      }).catch(() => caches.match(event.request))
    );
    return;
  }
  // 静态资源：缓存优先
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
