const CACHE_NAME = 'markcraft-blog-mw1mwo6gffo1';
const ASSETS = [
    'assets/og/欢迎使用-markcraft.svg',
    'index.html',
    'archive.html',
    'tags.html',
    'rss.xml',
    'sitemap.xml',
    'robots.txt',
    'search-index.json',
    'search.html',
    '404.html',
    'about.html',
    'posts/欢迎使用-markcraft/index.html',
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
