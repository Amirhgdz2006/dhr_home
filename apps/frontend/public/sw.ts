/// <reference lib="webworker" />

// Cast self به ServiceWorkerGlobalScope تا TS اشتباه نگیرد
const swSelf = self as unknown as ServiceWorkerGlobalScope;

// Service Worker for Offline Support
const CACHE_NAME = 'dhr-launcher-v2';
const RUNTIME_CACHE = 'dhr-launcher-runtime-v2';

// Assets to cache on install
const STATIC_ASSETS: string[] = [
  '/',
  '/index.html',
  '/src/main.tsx',
];

// Install event - cache static assets
swSelf.addEventListener('install', (event: ExtendableEvent) => {
  console.log('[Service Worker] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching static assets');
      return cache.addAll(STATIC_ASSETS);
    })
  );
  swSelf.skipWaiting();
});

// Activate event - clean up old caches
swSelf.addEventListener('activate', (event: ExtendableEvent) => {
  console.log('[Service Worker] Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE)
          .map((cacheName) => {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          })
      ).then(() => swSelf.clients.claim());
    })
  );
});

// Fetch event - serve from cache, fallback to network
swSelf.addEventListener('fetch', (event: FetchEvent) => {
  const req = event.request;

  // Skip non-GET requests
  if (req.method !== 'GET') return;

  // Skip chrome-extension and other non-http(s) requests
  if (!req.url.startsWith('http')) return;

  // Skip Vite HMR requests in development
  if (req.url.includes('__vite') || req.url.includes('@vite')) return;

  event.respondWith(
    (async (): Promise<Response> => {
      try {
        const response = await fetch(req);

        // Don't cache non-successful responses
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // Clone the response
        const responseToCache = response.clone();

        // Cache HTML, CSS, JS, and other assets
        const url = new URL(req.url);
        const shouldCache =
          req.destination === 'document' ||
          req.destination === 'script' ||
          req.destination === 'style' ||
          url.pathname.endsWith('.css') ||
          url.pathname.endsWith('.js') ||
          url.pathname.endsWith('.woff2') ||
          url.pathname.endsWith('.png') ||
          url.pathname.endsWith('.jpg') ||
          url.pathname.endsWith('.svg');

        if (shouldCache) {
          const cache = await caches.open(RUNTIME_CACHE);
          await cache.put(req, responseToCache);
        }

        return response;
      } catch (err) {
        // Network failed, try cache
        const cachedResponse = await caches.match(req);
        if (cachedResponse) return cachedResponse;

        // If network fails and we're offline, try to return a fallback
        if (req.destination === 'document') {
          const fallback = await caches.match('/index.html');
          if (fallback) return fallback;
        }

        // For other requests, return a basic offline response
        return new Response('Offline', {
          status: 503,
          statusText: 'Service Unavailable',
        });
      }
    })()
  );
});
