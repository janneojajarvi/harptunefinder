const CACHE_NAME = 'harptune-v10';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',
  './favicon.ico',
  './kuva.png',
  './harptunefinderkuva.png',
  
  // Nuottikirjastot
  './FinnishTunes2b.js',
  './extrasetti5.js',
  
  // Folkwiki-kokoelmat
  './folkwikiSet1.js',
  './folkwikiSet2.js',
  './folkwikiSet3.js',
  
  // SessionSet-sarja (01-18)
  './sessionSet01.js',
  './sessionSet02.js',
  './sessionSet03.js',
  './sessionSet04.js',
  './sessionSet05.js',
  './sessionSet06.js',
  './sessionSet07.js',
  './sessionSet08.js',
  './sessionSet09.js',
  './sessionSet10.js',
  './sessionSet11.js',
  './sessionSet12.js',
  './sessionSet13.js',
  './sessionSet14.js',
  './sessionSet15.js',
  './sessionSet16.js',
  './sessionSet17.js',
  './sessionSet18.js'
];

// Asennusvaihe: Tallennetaan perustiedostot välimuistiin
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Aktivoituminen
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
