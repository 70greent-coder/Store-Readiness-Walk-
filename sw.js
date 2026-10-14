/* Store Readiness Walk – offline support.
   Only handles this app's own files. Requests for Grind Log or any other
   page in this site pass straight through untouched. */
var CACHE = 'readiness-walk-v1';
var FILES = [
  './',
  'index.html',
  'manifest.webmanifest',
  'assets/commissary-logo.png',
  'assets/readiness-walk-form.pdf',
  'vendor/pdf-lib.min.js',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/apple-touch-icon.png'
];
var BASE = self.registration.scope;
var OWN = FILES.map(function (f) { return new URL(f, BASE).href; });
// Always try the network first for these so updates reach phones right away
var FRESH = [new URL('./', BASE).href, new URL('index.html', BASE).href, new URL('assets/readiness-walk-form.pdf', BASE).href];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(FILES); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k.indexOf('readiness-walk-') === 0 && k !== CACHE; })
      .map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = req.url.split('#')[0].split('?')[0];
  if (OWN.indexOf(url) === -1) return; // not ours: let the browser handle it

  if (FRESH.indexOf(url) !== -1) {
    e.respondWith(fetch(req).then(function (res) {
      if (res && res.ok) { var copy = res.clone(); caches.open(CACHE).then(function (c) { c.put(url, copy); }); }
      return res;
    }).catch(function () {
      return caches.match(url).then(function (hit) { return hit || caches.match(new URL('index.html', BASE).href); });
    }));
    return;
  }
  e.respondWith(caches.match(url).then(function (hit) {
    return hit || fetch(req).then(function (res) {
      if (res && res.ok) { var copy = res.clone(); caches.open(CACHE).then(function (c) { c.put(url, copy); }); }
      return res;
    });
  }));
});
