const CACHE='studio-fisika-rotasi-kelas-v3';
const ASSETS=['./','./index.html','./styles.css','./app.js','./icon.svg','./manifest.webmanifest',...Array.from({length:11},(_,i)=>`./slides/slide-${String(i+1).padStart(2,'0')}.webp`),...Array.from({length:11},(_,i)=>`./thumbs/thumb-${String(i+1).padStart(2,'0')}.webp`)];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(resp=>{if(resp.ok&&new URL(event.request.url).origin===self.location.origin){const copy=resp.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy))}return resp}))) });
