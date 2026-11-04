// App-shell cache so engines, steps and photos work in the garage with no signal.
const C = 'bb-v5';
const ASSETS = ['/', '/index.html', '/engines.js', '/manifest.webmanifest', '/favicon.svg', '/icon-192.png', '/icon-512.png', '/icon-maskable-512.png', '/apple-touch-icon.png'];
const put = (req, res) => res && res.ok ? caches.open(C).then(c => c.put(req, res)).catch(() => 0) : Promise.resolve();

self.addEventListener('install', e => {
  e.waitUntil(caches.open(C).then(c => Promise.all(ASSETS.map(a => c.add(a).catch(() => 0)))));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== C).map(k => caches.delete(k))))
    .then(() => clients.claim()));
});

self.addEventListener('message', e => {
  if (e.data?.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', e => {
  const req = e.request, u = new URL(req.url);
  if (req.method !== 'GET' || u.origin !== location.origin || u.pathname.startsWith('/api/')) return;

  if (req.mode === 'navigate') {
    e.respondWith((async () => {
      try {
        const res = await fetch(req);
        await put(req, res.clone());
        return res;
      } catch {
        return (await caches.match('/index.html')) || (await caches.match('/')) || new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain' } });
      }
    })());
    return;
  }

  e.respondWith((async () => {
    const hit = await caches.match(req);
    if (hit) {
      caches.open(C).then(c => fetch(req).then(res => res.ok ? c.put(req, res) : 0).catch(() => 0));
      return hit;
    }
    try {
      const res = await fetch(req);
      await put(req, res.clone());
      return res;
    } catch {
      return new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain' } });
    }
  })());
});
