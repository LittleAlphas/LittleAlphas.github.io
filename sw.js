const SHELL='la-shell-v1', PDFS='la-pdfs-v1';
const ASSETS=["./", "index.html", "manifest.webmanifest", "catalog.js", "lib/pdf.min.mjs", "lib/pdf.worker.min.mjs", "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png", "thumbs/Prime/Agro%20M.pdf.jpg", "thumbs/Prime/Ambulance%20Truck.pdf.jpg", "thumbs/Prime/Bike.pdf.jpg", "thumbs/Prime/Bobcat.pdf.jpg", "thumbs/Prime/Bridge%20Master.pdf.jpg", "thumbs/Prime/Carrier.pdf.jpg", "thumbs/Prime/City%20Car.pdf.jpg", "thumbs/Prime/Coach.pdf.jpg", "thumbs/Prime/Crane.pdf.jpg", "thumbs/Prime/Delivery.pdf.jpg", "thumbs/Prime/Design%20for%20Someone%20-%20Part%201.pdf.jpg", "thumbs/Prime/Design%20for%20Someone%20-%20Part%202.pdf.jpg", "thumbs/Prime/Detector.pdf.jpg", "thumbs/Prime/Drag%20and%20Drop.pdf.jpg", "thumbs/Prime/Dump%20Truck.pdf.jpg", "thumbs/Prime/Elevator.pdf.jpg", "thumbs/Prime/Ferris%20Wheel.pdf.jpg", "thumbs/Prime/Fire%20Tamer.pdf.jpg", "thumbs/Prime/Forklift.pdf.jpg", "thumbs/Prime/Grabber.pdf.jpg", "thumbs/Prime/Hovercraft.pdf.jpg", "thumbs/Prime/Jamie.pdf.jpg", "thumbs/Prime/Mars%20Crab.pdf.jpg", "thumbs/Prime/Maze%20Runner.pdf.jpg", "thumbs/Prime/Mobile%20Arm.pdf.jpg", "thumbs/Prime/Phone%20Holder.pdf.jpg", "thumbs/Prime/Power%20Arm.pdf.jpg", "thumbs/Prime/Reaper.pdf.jpg", "thumbs/Prime/Satellite.pdf.jpg", "thumbs/Prime/Scanner.pdf.jpg", "thumbs/Prime/Seaquest.pdf.jpg", "thumbs/Prime/Spiky.pdf.jpg", "thumbs/Prime/The%20Player.pdf.jpg", "thumbs/Prime/Turtle.pdf.jpg", "thumbs/Prime/Volcano.pdf.jpg", "thumbs/Essential/Bike.pdf.jpg", "thumbs/Essential/Dragster.pdf.jpg", "thumbs/Essential/Gorilla.pdf.jpg", "thumbs/Essential/Harvester.pdf.jpg", "thumbs/Essential/Heli.pdf.jpg", "thumbs/Essential/House%20Robot.pdf.jpg", "thumbs/Essential/Plane.pdf.jpg"];
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(SHELL).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==SHELL&&k!==PDFS).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=='GET'||u.origin!==location.origin) return;
  if(u.pathname.includes('/pdfs/')){
    e.respondWith(caches.open(PDFS).then(async c=>{
      const hit=await c.match(e.request); if(hit) return hit;
      const r=await fetch(e.request); if(r.ok) c.put(e.request,r.clone()); return r;
    }));
    return;
  }
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(hit=>hit||fetch(e.request).then(r=>{
    if(r.ok){const cp=r.clone(); caches.open(SHELL).then(c=>c.put(e.request,cp));}
    return r;
  }).catch(()=>caches.match('./'))));
});
