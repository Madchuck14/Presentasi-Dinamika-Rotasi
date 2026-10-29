'use strict';
const $=id=>document.getElementById(id);
const slides=[
{title:'Dinamika Rotasi dan Kesetimbangan Benda Tegar',category:'PEMBUKA',topic:'Pengantar',concept:'Dinamika rotasi',desc:'Gambaran umum gerak rotasi, torsi, momen inersia, momentum sudut, dan kesetimbangan.',formula:'τ = rF sin θ',lab:0},
{title:'Gerak Rotasi',category:'KINEMATIKA',topic:'Sudut dan kecepatan',concept:'Gerak melingkar',desc:'Besaran sudut θ, kecepatan sudut ω, percepatan sudut α, serta hubungan v = rω.',formula:'v = rω',lab:0},
{title:'Persamaan Gerak Translasi dan Rotasi',category:'KINEMATIKA',topic:'Gerak translasi & rotasi',concept:'Besaran yang bersesuaian',desc:'Bandingkan perpindahan, kecepatan, percepatan, dan persamaan kinematika translasi dengan rotasi.',formula:'θ = ω₀t + ½αt²',lab:0},
{title:'Hubungan Roda-Roda pada Gerak Melingkar',category:'SISTEM RODA',topic:'Roda dan sabuk',concept:'Hubungan roda',desc:'Untuk roda sepusat, kecepatan sudut sama. Pada roda bersinggungan atau dihubungkan sabuk tanpa selip, kelajuan tangensial sama.',formula:'ω₁r₁ = ω₂r₂',lab:1},
{title:'Rotasi Benda Pejal',category:'DINAMIKA',topic:'Torsi',concept:'Momen gaya (torsi)',desc:'Gaya F pada jarak r dari poros menimbulkan torsi sebesar τ = rF sin θ.',formula:'τ = rF sin θ',lab:2},
{title:'Momen Inersia dan Energi Kinetik Rotasi',category:'ENERGI',topic:'Energi rotasi',concept:'Energi kinetik rotasi',desc:'Energi total sebuah benda yang bergerak translasi sekaligus rotasi adalah jumlah kedua energi kinetiknya.',formula:'Eₖ = ½Iω² + ½mv²',lab:3},
{title:'Momen Inersia Berbagai Benda',category:'ENERGI',topic:'Momen inersia',concept:'Sebaran massa',desc:'Momen inersia ditentukan oleh massa, ukuran, dan bentuk distribusi massa terhadap sumbu putar.',formula:'I = Σmr²',lab:3},
{title:'Gaya dan Torsi pada Gerak Rotasi',category:'DINAMIKA',topic:'Hukum Newton untuk rotasi',concept:'Hukum II Newton untuk rotasi',desc:'Resultan torsi berhubungan dengan momen inersia dan percepatan sudut benda.',formula:'Στ = Iα',lab:2,editorial:true},
{title:'Kekekalan Momentum Sudut',category:'MOMENTUM',topic:'Momentum sudut',concept:'Momentum sudut',desc:'Jika resultan torsi luar nol, momentum sudut total suatu sistem tetap.',formula:'L = Iω',lab:3},
{title:'Kesetimbangan Benda Tegar dan Pusat Massa',category:'KESETIMBANGAN',topic:'Gaya & titik berat',concept:'Syarat kesetimbangan',desc:'Benda tegar setimbang jika resultan gaya dan resultan torsi sama dengan nol.',formula:'ΣF = 0   ·   Στ = 0',lab:4},
{title:'Terima Kasih',category:'PENUTUP',topic:'Penutup',concept:'Tinjau kembali materi',desc:'Ulangi materi yang belum dipahami atau coba simulasi untuk menguji pemahaman.',formula:'Belajar • Coba • Pahami',lab:4}
];
const labDefs=[
{id:'angular',icon:'◉',name:'Gerak melingkar',sub:'ω, r, v, aₛ',desc:'Ubah jari-jari dan kecepatan sudut, lalu perhatikan perubahan kelajuan linear dan percepatan sentripetal.',caption:'Gerak benda pada lintasan melingkar dengan kecepatan sudut tetap.',formula:'v = rω',sliders:[{id:'r',label:'Jari-jari lintasan',min:.2,max:3,step:.1,value:1.4,unit:'m'},{id:'w',label:'Kecepatan sudut',min:0,max:12,step:.5,value:4,unit:'rad/s'}]},
{id:'wheels',icon:'⚙',name:'Hubungan roda',sub:'ω₁, ω₂, r₁, r₂',desc:'Bandingkan roda sepusat, roda yang dihubungkan sabuk terbuka tanpa selip, dan roda bersinggungan tanpa selip.',caption:'Skema tidak menggambarkan perbandingan ukuran dan geometri sabuk secara presisi.',formula:'v₁ = v₂',sliders:[{id:'r1',label:'Jari-jari roda 1',min:.3,max:1.5,step:.1,value:1.2,unit:'m'},{id:'r2',label:'Jari-jari roda 2',min:.3,max:1.5,step:.1,value:.6,unit:'m'},{id:'w1',label:'Kecepatan sudut roda 1',min:0,max:15,step:.5,value:6,unit:'rad/s'}]},
{id:'torque',icon:'↷',name:'Momen gaya',sub:'τ = rF sin θ',desc:'Ubah besar gaya, jarak dari poros, serta sudut gaya terhadap lengan momen.',caption:'Sudut θ diukur dari arah lengan momen ke vektor gaya.',formula:'τ = rF sin θ',sliders:[{id:'r',label:'Panjang lengan momen',min:.2,max:2,step:.1,value:1.2,unit:'m'},{id:'F',label:'Gaya',min:0,max:100,step:5,value:50,unit:'N'},{id:'a',label:'Sudut gaya',min:0,max:180,step:5,value:90,unit:'°'}]},
{id:'energy',icon:'◌',name:'Inersia & energi',sub:'I dan Eₖ',desc:'Amati dampak bentuk benda, massa, jari-jari, dan kecepatan sudut terhadap momen inersia serta energi rotasi.',caption:'Model benda homogen yang berputar terhadap sumbu simetrinya.',formula:'Eₖ = ½Iω²',sliders:[{id:'m',label:'Massa benda',min:.5,max:20,step:.5,value:5,unit:'kg'},{id:'r',label:'Jari-jari benda',min:.2,max:2,step:.1,value:1,unit:'m'},{id:'w',label:'Kecepatan sudut',min:0,max:15,step:.5,value:5,unit:'rad/s'}]},
{id:'balance',icon:'⚖',name:'Kesetimbangan',sub:'Στ = 0',desc:'Temukan pasangan massa dan panjang lengan yang menghasilkan kesetimbangan torsi pada jungkat-jungkit.',caption:'Batang dianggap tak bermassa, dan percepatan gravitasi diambil 9,8 m/s².',formula:'m₁gr₁ = m₂gr₂',sliders:[{id:'m1',label:'Massa kiri',min:1,max:20,step:1,value:8,unit:'kg'},{id:'r1',label:'Jarak kiri',min:.5,max:3,step:.1,value:1.5,unit:'m'},{id:'m2',label:'Massa kanan',min:1,max:20,step:1,value:12,unit:'kg'},{id:'r2',label:'Jarak kanan',min:.5,max:3,step:.1,value:1,unit:'m'}]}
];
const labModes=['sepusat','sabuk','bersinggungan'];const bodies=['Cincin tipis','Cakram pejal','Bola pejal'];
let current=1,view='slides',activeLab=0,selectedTool='none',zoom=1,playing=false,playTimer=null,toastTimer=null,drawStart=false,lastPoint=null,angleTime=0,raf=0,labMode='sabuk',bodyMode=1;
let classroomMode=false,classroomTimer=null,classroomStartedAt=0,classroomClockTimer=null,classroomReturnFromLab=false;let drawings={};let notes={},bookmarks=[];let pidMode=false;let touchRegistry=new Map(),touchGesture=null,pinchStart=null;
const readStore=(key,fallback)=>{try {const value=JSON.parse(localStorage.getItem(key));return value===null?fallback:value}catch{return fallback}};
notes=readStore('studio-fisika-rotasi-notes',{});bookmarks=readStore('studio-fisika-rotasi-bookmarks',[]);
current=Math.max(1,Math.min(slides.length,parseInt(readStore('studio-fisika-rotasi-last',1),10)||1));
function store(key,value){try{localStorage.setItem(key,JSON.stringify(value))}catch{}}
function toast(msg){const el=$('toast');el.textContent=msg;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2300)}
function renderList(filter=''){
 const container=$('slideList');const q=filter.trim().toLocaleLowerCase('id-ID');
 container.replaceChildren();let matches=0;
 slides.forEach((s,i)=>{const index=i+1;if(q && ![s.title,s.category,s.topic,s.desc,s.formula,String(index)].join(' ').toLowerCase().includes(q))return;matches++;
 const item=document.createElement('button');item.className='slide-item'+(current===index?' active':'');item.setAttribute('aria-label',`Buka slide ${index}, ${s.title}`);item.innerHTML=`<span class="thumb-wrap"><img src="thumbs/thumb-${String(index).padStart(2,'0')}.webp" loading="lazy" alt="Pratinjau slide ${index}"/><span class="slide-number">${String(index).padStart(2,'0')}${bookmarks.includes(index)?' ★':''}</span></span><span class="slide-meta"><strong>${s.title}</strong><span>${s.topic}</span></span>`;item.addEventListener('click',()=>{goSlide(index);$('slideSidebar').classList.remove('open')});container.append(item);
 });if(!matches){const p=document.createElement('p');p.className='no-results';p.textContent='Tidak ada slide yang cocok.';container.append(p)}
}
function goSlide(num){const n=Math.min(slides.length,Math.max(1,Number(num)));current=n;store('studio-fisika-rotasi-last',current);
 const s=slides[n-1],file=`slides/slide-${String(n).padStart(2,'0')}.webp`,im=$('slideImage');$('loadingMessage').style.display='grid';im.onload=()=>{$('loadingMessage').style.display='none';};im.onerror=()=>{$('loadingMessage').textContent='Gagal memuat slide. Pastikan folder slides diunggah.';$('loadingMessage').style.display='grid'};im.src=file;if(im.complete&&im.naturalWidth)$('loadingMessage').style.display='none';im.alt=`Slide ${n}: ${s.title}`;
 $('currentTitle').textContent=s.title;$('slideCategory').textContent=s.category;$('conceptHeading').textContent=s.concept;$('conceptText').textContent=s.desc;$('formulaBox').textContent=s.formula;$('counterLabel').innerHTML=`${String(n).padStart(2,'0')} <span>/ ${slides.length}</span>`;$('overlayCounter').textContent=`${String(n).padStart(2,'0')} / ${String(slides.length).padStart(2,'0')}`;$('slideRange').value=n;$('progressPercent').textContent=`${Math.round(n/slides.length*100)}%`;
 $('pidDockCounter').textContent=`${String(n).padStart(2,'0')} / ${String(slides.length).padStart(2,'0')}`;$('classCount').textContent=$('classroomCounter').textContent=`${String(n).padStart(2,'0')} / ${String(slides.length).padStart(2,'0')}`;$('classroomTitle').textContent=s.title;for(const id of ['classPrev'])$(id).disabled=n===1;for(const id of ['classNext'])$(id).disabled=n===slides.length;for(const id of ['pidPrev','pidDockPrev'])$(id).disabled=n===1;for(const id of ['pidNext','pidDockNext'])$(id).disabled=n===slides.length;$('contextHint').textContent=s.desc;$('labSuggestion').textContent=`Topik ini berkaitan dengan simulasi: ${labDefs[s.lab].name}.`;$('notesText').value=notes[n]||'';$('notesStatus').textContent='Tersimpan otomatis';$('editorNote').classList.toggle('hidden',!s.editorial);$('bookmarkBtn').innerHTML=(bookmarks.includes(n)?'★ <span>Ditandai</span>':'☆ <span>Tandai</span>');renderList($('searchInput').value);redrawInk();
}
function toggleBookmark(){const idx=bookmarks.indexOf(current);if(idx>=0)bookmarks.splice(idx,1);else bookmarks.push(current);store('studio-fisika-rotasi-bookmarks',bookmarks);goSlide(current);toast(idx>=0?'Penanda dihapus':'Slide ditandai')}
function setView(next){view=next;$('presentationView').classList.toggle('hidden',next!=='slides');$('labsView').classList.toggle('hidden',next!=='labs');$('tabPresentation').classList.toggle('active',next==='slides');$('tabLabs').classList.toggle('active',next==='labs');$('tabPresentation').setAttribute('aria-pressed',String(next==='slides'));$('tabLabs').setAttribute('aria-pressed',String(next==='labs'));if(next==='labs'){stopPlaying();initLab(activeLab)}else cancelAnimationFrame(raf);window.scrollTo(0,0)}
function stopPlaying(){playing=false;clearInterval(playTimer);$('playBtn').textContent='▶';$('playBtn').setAttribute('aria-label','Putar otomatis')}
function togglePlay(){if(playing){stopPlaying();return}playing=true;$('playBtn').textContent='Ⅱ';$('playBtn').setAttribute('aria-label','Hentikan pemutaran otomatis');playTimer=setInterval(()=>{if(current===slides.length){stopPlaying();return}goSlide(current+1)},7000);toast('Pemutaran otomatis: 7 detik per slide')}
function setZoom(z){
 const old=zoom;zoom=Math.max(1,Math.min(2.5,z));$('zoomLabel').textContent=`${Math.round(zoom*100)}%`;$('classZoomValue').textContent=`${Math.round(zoom*100)}%`;
 const vp=$('viewerViewport'),slide=$('slideCanvas');
 const inFull=document.fullscreenElement===$('viewerShell');
 const fitW=(inFull||classroomMode)?Math.min(vp.clientWidth,vp.clientHeight*16/9):Math.min(vp.clientWidth,1600);
 const previousWidth=slide.getBoundingClientRect().width;
 slide.style.width=(fitW*zoom)+'px';slide.style.maxWidth='none';
 vp.style.justifyContent=zoom>1?'flex-start':'center';
 vp.style.alignItems=zoom>1?'flex-start':'center';
 if(zoom===1){vp.scrollLeft=0;vp.scrollTop=0}
 else if(Math.abs(old-zoom)>.01){const shift=(fitW*zoom-previousWidth)/2;vp.scrollLeft+=shift;vp.scrollTop+=shift*9/16}
}
function selectTool(tool){selectedTool=selectedTool===tool?'none':tool;for(const b of ['laser','pen'])$(b+'Btn').classList.toggle('active',selectedTool===b);$('slideCanvas').classList.toggle('drawing',selectedTool==='pen');$('slideCanvas').classList.toggle('lasering',selectedTool==='laser');$('laserDot').style.display='none';for(const [id,toolName] of [['pidDockPen','pen'],['pidDockLaser','laser']])$(id).classList.toggle('active',selectedTool===toolName);$('classPen').classList.toggle('active',selectedTool==='pen');$('classLaser').classList.toggle('active',selectedTool==='laser');toast(selectedTool==='pen'?'Mode menulis: tarik pada slide':selectedTool==='laser'?'Mode laser: arahkan penunjuk':'Alat dinonaktifkan')}
function pointFromEvent(ev){const rect=$('inkCanvas').getBoundingClientRect();return{x:Math.max(0,Math.min(1920,(ev.clientX-rect.left)/rect.width*1920)),y:Math.max(0,Math.min(1080,(ev.clientY-rect.top)/rect.height*1080))}}
function drawLine(ctx,p1,p2){ctx.strokeStyle='#ed4765';ctx.lineWidth=7;ctx.lineCap='round';ctx.lineJoin='round';ctx.beginPath();ctx.moveTo(p1.x,p1.y);ctx.lineTo(p2.x,p2.y);ctx.stroke()}
function redrawInk(){const c=$('inkCanvas'),ctx=c.getContext('2d');ctx.clearRect(0,0,c.width,c.height);for(const stroke of drawings[current]||[])for(let i=1;i<stroke.length;i++)drawLine(ctx,stroke[i-1],stroke[i])}
function setupInk(){const c=$('inkCanvas');c.width=1920;c.height=1080;c.addEventListener('pointerdown',e=>{if(selectedTool!=='pen')return;e.preventDefault();c.setPointerCapture(e.pointerId);drawStart=true;lastPoint=pointFromEvent(e);drawings[current]??=[];drawings[current].push([lastPoint])});c.addEventListener('pointermove',e=>{if(selectedTool!=='pen'||!drawStart)return;const p=pointFromEvent(e);const stroke=drawings[current].at(-1);stroke.push(p);drawLine(c.getContext('2d'),lastPoint,p);lastPoint=p});for(const type of ['pointerup','pointercancel'])c.addEventListener(type,()=>{drawStart=false;lastPoint=null});const shell=$('slideCanvas');shell.addEventListener('pointermove',e=>{if(selectedTool!=='laser')return;const r=shell.getBoundingClientRect();const dot=$('laserDot');dot.style.left=(e.clientX-r.left)+'px';dot.style.top=(e.clientY-r.top)+'px';dot.style.display='block'});shell.addEventListener('pointerleave',()=>$('laserDot').style.display='none')}
function fullscreen(){const elem=$('viewerShell');if(document.fullscreenElement)document.exitFullscreen();else if(elem.requestFullscreen)elem.requestFullscreen().catch(()=>toast('Layar penuh tidak didukung browser ini'))}


// Mode Kelas mempertahankan slide asli, tetapi memberikan panggung presentasi tanpa panel.
function showClassroomTools(show=true){
 if(!classroomMode)return;
 document.body.classList.toggle('classroom-tools-hidden',!show);
 clearTimeout(classroomTimer);
 if(show)classroomTimer=setTimeout(()=>{
  if(classroomMode&&!document.querySelector('.modal-backdrop:not(.hidden)'))document.body.classList.add('classroom-tools-hidden');
 },7500);
}
function stopClassroomMode({keepLabReturn=false}={}){
 if(!classroomMode)return;
 classroomMode=false;document.body.classList.remove('classroom-mode','classroom-tools-hidden');
 clearTimeout(classroomTimer);clearInterval(classroomClockTimer);classroomTimer=null;classroomClockTimer=null;
 if(!keepLabReturn)classroomReturnFromLab=false;
 if(document.fullscreenElement===$('viewerShell'))document.exitFullscreen().catch(()=>{});
 $('classroomFirstTip').classList.remove('tip-hidden');
 requestAnimationFrame(()=>setZoom(1));
}
function startClassroomMode(tryFullscreen=false){
 if(view!=='slides')setView('slides');
 if(classroomMode){showClassroomTools();return}
 stopPlaying();classroomMode=true;document.body.classList.remove('focus-mode');document.body.classList.add('classroom-mode');
 setPidMode(true,false);setZoom(1);
 classroomStartedAt=performance.now();
 clearInterval(classroomClockTimer);
 classroomClockTimer=setInterval(()=>{
  const t=Math.floor((performance.now()-classroomStartedAt)/1000);
  $('classroomClock').textContent=`${String(Math.floor(t/60)).padStart(2,'0')}:${String(t%60).padStart(2,'0')}`;
 },1000);
 $('classroomClock').textContent='00:00';
 $('classroomFirstTip').classList.remove('tip-hidden');
 setTimeout(()=>{if(classroomMode)$('classroomFirstTip').classList.add('tip-hidden')},6500);
 requestAnimationFrame(()=>setZoom(1));
 showClassroomTools();
 // Pemanggilan fullscreen hanya dipicu interaksi pengguna, tidak saat URL dibuka otomatis.
 if(tryFullscreen&&$('viewerShell').requestFullscreen){
  $('viewerShell').requestFullscreen().then(()=>requestAnimationFrame(()=>setZoom(1))).catch(()=>{});
 }
}
function openLabFromClassroom(){
 classroomReturnFromLab=true;
 stopClassroomMode({keepLabReturn:true});
 activeLab=slides[current-1].lab;
 setView('labs');
}
function backFromLabToPresentation(){
 setView('slides');
 if(classroomReturnFromLab){classroomReturnFromLab=false;startClassroomMode(false)}
}
function setPidMode(enabled,announce=true){
 pidMode=Boolean(enabled);document.body.classList.toggle('pid-mode',pidMode);
 $('pidModeBtn').classList.toggle('active',pidMode);$('pidModeBtn').setAttribute('aria-pressed',String(pidMode));
 $('pidModeBtn').title=pidMode?'Nonaktifkan mode sentuh PID':'Aktifkan mode sentuh PID';
 touchRegistry.clear();touchGesture=null;pinchStart=null;
 store('studio-fisika-rotasi-pid',pidMode);
 requestAnimationFrame(()=>setZoom(1));
 if(announce)toast(pidMode?'Mode PID aktif: geser slide dengan satu jari':'Mode PID dinonaktifkan');
}
function setupTouchNavigation(){
 const vp=$('viewerViewport');
 const distance=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
 const eligible=e=>pidMode&&view==='slides'&&selectedTool==='none'&&!document.querySelector('.modal-backdrop:not(.hidden)')&&(!e.pointerType||e.pointerType!=='mouse'||e.button===0);
 vp.addEventListener('pointerdown',e=>{
  if(!eligible(e))return;
  touchRegistry.set(e.pointerId,{x:e.clientX,y:e.clientY});
  try{vp.setPointerCapture(e.pointerId)}catch{}
  if(touchRegistry.size===1){touchGesture={id:e.pointerId,startX:e.clientX,startY:e.clientY,lastX:e.clientX,lastY:e.clientY,time:performance.now(),panned:false,multiple:false}}
  else if(touchRegistry.size===2){touchGesture=null;const pts=[...touchRegistry.values()];pinchStart={distance:distance(pts[0],pts[1]),zoom};}
  else {touchGesture=null;pinchStart=null}
 });
 vp.addEventListener('pointermove',e=>{
  if(!touchRegistry.has(e.pointerId))return;
  touchRegistry.set(e.pointerId,{x:e.clientX,y:e.clientY});
  if(touchRegistry.size===2&&pinchStart){
   const pts=[...touchRegistry.values()],dist=distance(pts[0],pts[1]);
   if(pinchStart.distance>15&&Math.abs(dist-pinchStart.distance)>3)setZoom(pinchStart.zoom*dist/pinchStart.distance);
   return;
  }
  if(touchRegistry.size!==1||!touchGesture||touchGesture.id!==e.pointerId)return;
  if(zoom>1){vp.scrollLeft-=e.clientX-touchGesture.lastX;vp.scrollTop-=e.clientY-touchGesture.lastY;touchGesture.panned=true}
  touchGesture.lastX=e.clientX;touchGesture.lastY=e.clientY;
 });
 const finish=(e,cancelled=false)=>{
  if(!touchRegistry.has(e.pointerId))return;
  if(!cancelled && touchGesture&&touchRegistry.size===1&&touchGesture.id===e.pointerId&&!touchGesture.panned&&zoom===1&&eligible(e)){
   const dx=e.clientX-touchGesture.startX,dy=e.clientY-touchGesture.startY;
   const duration=performance.now()-touchGesture.time;
   if(Math.abs(dx)>=Math.max(60,vp.clientWidth*.065)&&Math.abs(dx)>Math.abs(dy)*1.3&&duration<1500){
    const next=dx<0?current+1:current-1;
    if(next>=1&&next<=slides.length){stopPlaying();goSlide(next)}
    else toast(dx<0?'Sudah di slide terakhir':'Sudah di slide pertama');
   }
  }
  touchRegistry.delete(e.pointerId);touchGesture=null;
  if(touchRegistry.size<2)pinchStart=null;
 };
 vp.addEventListener('pointerup',e=>finish(e));
 vp.addEventListener('pointercancel',e=>finish(e,true));
 vp.addEventListener('lostpointercapture',e=>{if(touchRegistry.has(e.pointerId))finish(e,true)});
}

function initListeners(){
 $('classroomHeaderBtn').onclick=()=>startClassroomMode(true);
 $('classroomMainBtn').onclick=()=>startClassroomMode(true);
 $('classPrev').onclick=()=>{stopPlaying();goSlide(current-1);showClassroomTools()};
 $('classNext').onclick=()=>{stopPlaying();goSlide(current+1);showClassroomTools()};
 $('classPen').onclick=()=>{selectTool('pen');showClassroomTools()};
 $('classLaser').onclick=()=>{selectTool('laser');showClassroomTools()};
 $('classUndo').onclick=()=>{$('undoBtn').click();showClassroomTools()};
 $('classClear').onclick=()=>{$('clearBtn').click();showClassroomTools()};
 $('classZoomIn').onclick=()=>{setZoom(zoom+.25);showClassroomTools()};
 $('classZoomOut').onclick=()=>{setZoom(zoom-.25);showClassroomTools()};
 $('classFit').onclick=()=>{setZoom(1);showClassroomTools()};
 $('classLab').onclick=()=>openLabFromClassroom();
 $('classExit').onclick=()=>stopClassroomMode();
 $('classHide').onclick=()=>showClassroomTools(false);
 $('classReveal').onclick=()=>showClassroomTools(true);
 $('viewerShell').addEventListener('pointerup',e=>{
  if(!classroomMode||!document.body.classList.contains('classroom-tools-hidden')||selectedTool!=='none')return;
  if(e.target.closest('button'))return;
  if(!e.movementX&&!e.movementY&&e.pointerType==='mouse')showClassroomTools(true);
 });
 $('pidModeBtn').onclick=()=>setPidMode(!pidMode);for(const id of ['pidPrev','pidDockPrev'])$(id).onclick=()=>{stopPlaying();goSlide(current-1)};for(const id of ['pidNext','pidDockNext'])$(id).onclick=()=>{stopPlaying();goSlide(current+1)};$('pidDockPen').onclick=()=>selectTool('pen');$('pidDockLaser').onclick=()=>selectTool('laser');$('pidDockUndo').onclick=()=>{$('undoBtn').click()};$('pidDockClear').onclick=()=>{$('clearBtn').click()};$('pidDockFullscreen').onclick=fullscreen;
 $('prevBtn').onclick=()=>goSlide(current-1);$('nextBtn').onclick=()=>goSlide(current+1);$('playBtn').onclick=togglePlay;$('slideRange').oninput=e=>goSlide(e.target.value);$('searchInput').oninput=e=>renderList(e.target.value);$('bookmarkBtn').onclick=toggleBookmark;$('tabPresentation').onclick=()=>setView('slides');$('tabLabs').onclick=()=>setView('labs');$('toLabBtn').onclick=()=>{activeLab=slides[current-1].lab;setView('labs')};$('sideLabBtn').onclick=$('toLabBtn').onclick;$('backToSlides').onclick=backFromLabToPresentation;$('fullscreenBtn').onclick=fullscreen;$('focusBtn').onclick=()=>{document.body.classList.toggle('focus-mode');setTimeout(()=>setZoom(1),20)};
 $('laserBtn').onclick=()=>selectTool('laser');$('penBtn').onclick=()=>selectTool('pen');$('undoBtn').onclick=()=>{(drawings[current]||[]).pop();redrawInk();toast('Coretan terakhir diurungkan')};$('clearBtn').onclick=()=>{drawings[current]=[];redrawInk();toast('Coretan slide dibersihkan')};$('zoomOutBtn').onclick=()=>setZoom(zoom-.25);$('zoomInBtn').onclick=()=>setZoom(zoom+.25);$('resetZoomBtn').onclick=()=>setZoom(1);
 $('notesText').addEventListener('input',()=>{notes[current]=$('notesText').value;store('studio-fisika-rotasi-notes',notes);$('notesStatus').textContent='Disimpan di perangkat ini'});$('copyNotesBtn').onclick=async()=>{try{await navigator.clipboard.writeText($('notesText').value);toast('Catatan disalin')}catch{const t=$('notesText');t.select();document.execCommand('copy');toast('Catatan dipilih untuk disalin')}};
 const openHelp=()=>$('helpModal').classList.remove('hidden'),closeHelp=()=>$('helpModal').classList.add('hidden');$('shortcutsBtn').onclick=openHelp;$('closeHelpBtn').onclick=closeHelp;$('closeHelpBottom').onclick=closeHelp;$('helpModal').onclick=e=>{if(e.target===$('helpModal'))closeHelp()};$('mobileSlidesBtn').onclick=()=>$('slideSidebar').classList.add('open');$('closeSlidesBtn').onclick=()=>$('slideSidebar').classList.remove('open');$('resetLabBtn').onclick=()=>{labMode='sabuk';bodyMode=1;initLab(activeLab)};
 window.addEventListener('resize',()=>{if(view==='slides')setZoom(zoom)});document.addEventListener('fullscreenchange',()=>{if(view==='slides')requestAnimationFrame(()=>setZoom(zoom));$('pidDockFullscreen').title=document.fullscreenElement?'Keluar dari layar penuh':'Layar penuh'});
 document.addEventListener('keydown',e=>{if(!$('helpModal').classList.contains('hidden')){if(e.key==='Escape')closeHelp();return}if(e.target.matches('input, textarea, select')){if(e.key==='Escape')e.target.blur();return}if(e.key==='/'&&view==='slides'){e.preventDefault();$('searchInput').focus();return}if(e.key.toLowerCase()==='c'){e.preventDefault();if(classroomMode)stopClassroomMode();else startClassroomMode(true);return}if(e.key==='Escape'&&classroomMode){e.preventDefault();stopClassroomMode();return}if(e.key.toLowerCase()==='f'&&view==='slides'){fullscreen();return}if(view!=='slides')return;if(['ArrowRight','PageDown'].includes(e.key)){e.preventDefault();goSlide(current+1)}else if(['ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();goSlide(current-1)}else if(e.key==='Home')goSlide(1);else if(e.key==='End')goSlide(slides.length);else if(e.code==='Space'){e.preventDefault();togglePlay()}else if(e.key.toLowerCase()==='l')selectTool('laser');else if(e.key.toLowerCase()==='p')selectTool('pen');else if(e.key==='Escape'){if(document.fullscreenElement)document.exitFullscreen();else selectTool('none')}})
}
function fmt(n,d=2){return Number(n).toLocaleString('id-ID',{minimumFractionDigits:d,maximumFractionDigits:d})}
function metric(label,value){return `<div class="metric"><strong>${value}</strong><span>${label}</span></div>`}
function slControls(def){return def.sliders.map(s=>`<div class="slider-control"><label for="lab-${s.id}">${s.label}<output id="val-${s.id}"></output></label><input id="lab-${s.id}" data-control="${s.id}" type="range" min="${s.min}" max="${s.max}" step="${s.step}" value="${s.value}"/><div class="slider-ends"><span>${fmt(s.min,s.step<1?1:0)} ${s.unit}</span><span>${fmt(s.max,s.step<1?1:0)} ${s.unit}</span></div></div>`).join('')}
function initLab(index){activeLab=index;const lab=labDefs[index];$('labNav').replaceChildren();labDefs.forEach((l,i)=>{const btn=document.createElement('button');btn.className='lab-tab'+(i===index?' active':'');btn.innerHTML=`<span class="lab-icon">${l.icon}</span><span><strong>${l.name}</strong><small>${l.sub}</small></span>`;btn.onclick=()=>initLab(i);$('labNav').append(btn)});$('labIndex').textContent=`SIMULASI ${String(index+1).padStart(2,'0')} / 05`;$('labHeading').textContent=lab.name;$('labDescription').textContent=lab.desc;$('labVisualCaption').textContent=lab.caption;
 let extra='';if(index===1)extra=`<div class="slider-control"><label for="lab-mode">Jenis hubungan roda</label><select id="lab-mode" style="width:100%;padding:11px;border:1px solid #dce4ee;border-radius:8px;color:#36506b;background:white"><option value="sepusat">Roda sepusat</option><option value="sabuk">Sabuk terbuka (tanpa selip)</option><option value="bersinggungan">Roda bersinggungan (tanpa selip)</option></select></div>`;
 if(index===3)extra=`<div class="slider-control"><label for="lab-body">Bentuk benda homogen</label><select id="lab-body" style="width:100%;padding:11px;border:1px solid #dce4ee;border-radius:8px;color:#36506b;background:white"><option value="0">Cincin tipis</option><option value="1">Cakram pejal</option><option value="2">Bola pejal</option></select></div>`;
 $('labSliders').innerHTML=extra+slControls(lab);if(index===1){$('lab-mode').value=labMode;$('lab-mode').onchange=e=>{labMode=e.target.value;updateLab()}}if(index===3){$('lab-body').value=bodyMode;$('lab-body').onchange=e=>{bodyMode=+e.target.value;updateLab()}}for(const s of lab.sliders)$('lab-'+s.id).oninput=updateLab;angleTime=0;updateLab();cancelAnimationFrame(raf);let last=0;const tick=t=>{if(view!=='labs')return;angleTime+=Math.min((t-last)/1000||0,.06);last=t;animateLab();raf=requestAnimationFrame(tick)};raf=requestAnimationFrame(tick)}
function getVals(){const obj={};for(const s of labDefs[activeLab].sliders){const v=parseFloat($('lab-'+s.id).value);obj[s.id]=v;$('val-'+s.id).textContent=fmt(v,s.step>=1?0:1)+' '+s.unit}return obj}
const defs=`<defs><marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#ffce72"/></marker><pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M30 0H0V30" fill="none" stroke="#34516d" stroke-width=".7" opacity=".5"/></pattern></defs><rect width="600" height="360" fill="url(#grid)"/>`;
function drawLabels(metrics,formula,insight,svg){$('labSvg').innerHTML=defs+svg;$('labMetrics').innerHTML=metrics.map(m=>metric(m[0],m[1])).join('');$('labFormula').innerHTML=`<span>PERSAMAAN</span><strong>${formula}</strong>`;$('labInsight').textContent=insight}
let animNodes={};let currentVals={};
function updateLab(){const v=getVals();currentVals=v;animNodes={};const c=activeLab;
 if(c===0){const speed=v.r*v.w,cent=v.r*v.w*v.w,f=v.w/(2*Math.PI);const graphic=`<circle cx="300" cy="163" r="113" fill="#182f4a" stroke="#5fbce3" stroke-width="3"/><circle cx="300" cy="163" r="85" fill="none" stroke="#53708d" stroke-dasharray="7 8"/><path d="M170 163H430 M300 35V291" stroke="#6b8aa7" stroke-dasharray="4 8"/><g id="spinA"><line x1="300" y1="163" x2="413" y2="163" stroke="#f6cb72" stroke-width="5" stroke-linecap="round"/><circle cx="413" cy="163" r="12" fill="#ffcf76" stroke="#fff" stroke-width="3"/></g><circle cx="300" cy="163" r="7" fill="#c9eaff"/><path d="M302 45A117 117 0 0 1 410 132" fill="none" stroke="#ffcf76" stroke-width="3" marker-end="url(#arr)"/><text x="300" y="324" text-anchor="middle" font-size="19" fill="#d6e7f8">r = ${fmt(v.r,1)} m · ω = ${fmt(v.w,1)} rad/s</text>`;
 drawLabels([['Kelajuan linear',fmt(speed)+' m/s'],['Percepatan sentripetal',fmt(cent)+' m/s²'],['Frekuensi',fmt(f)+' Hz']],'v = rω   •   aₛ = rω²',`Pada ω tetap, kelajuan linear sebanding dengan jari-jari r. Percepatan sentripetal meningkat sebanding dengan ω².`,graphic);animNodes.a=$('spinA')}
 else if(c===1){const same=labMode==='sepusat',oppo=labMode==='bersinggungan',w2=same?v.w1:v.w1*v.r1/v.r2;const radius1=48+29*v.r1,radius2=48+29*v.r2;
 const x1=same?300:187,x2=same?300:425;
 const first=`<circle cx="${x1}" cy="158" r="${radius1}" fill="${same?'none':'#28587c'}" stroke="#72c6eb" stroke-width="7"/><g id="wheel1"><path d="M${x1} 158V${158-radius1+9}M${x1} 158H${x1+radius1-8}" stroke="#b8eafa" stroke-width="5" stroke-linecap="round"/></g>`;
 const second=`<circle cx="${x2}" cy="158" r="${radius2}" fill="${same?'none':'#78542a'}" stroke="#ffd38b" stroke-width="7"/><g id="wheel2"><path d="M${x2} 158V${158-radius2+9}M${x2} 158H${x2+radius2-8}" stroke="#ffe8bf" stroke-width="5" stroke-linecap="round"/></g>`;
 let svg=(same&&radius1<radius2?second+first:first+second)+`<circle cx="${x1}" cy="158" r="9" fill="#e1f5ff"/>${same?'':`<circle cx="${x2}" cy="158" r="9" fill="#fff1cf"/>`}<text x="197" y="310" text-anchor="middle" fill="#8bdaf6" font-size="17">Roda 1 · r₁ = ${fmt(v.r1,1)} m</text><text x="417" y="310" text-anchor="middle" fill="#ffdc9b" font-size="17">Roda 2 · r₂ = ${fmt(v.r2,1)} m</text>`;
 if(same)svg+=`<text x="300" y="40" font-size="17" font-weight="700" text-anchor="middle" fill="#d7e7fa">Satu sumbu, dua jari-jari</text>`;
 else if(labMode==='sabuk')svg+=`<path d="M${x1} ${158-radius1}L${x2} ${158-radius2}M${x1} ${158+radius1}L${x2} ${158+radius2}" stroke="#f3dfab" stroke-width="3" opacity=".7" stroke-dasharray="5 5"/>`;
 else svg+=`<path d="M${x1+radius1} 158L${x2-radius2} 158" stroke="#f3dfab" stroke-width="3" stroke-dasharray="5 5"/>`;
 drawLabels([['ω₂ (besar)',fmt(w2)+' rad/s'],['v₁',fmt(v.r1*v.w1)+' m/s'],['v₂',fmt(v.r2*w2)+' m/s']],same?'ω₁ = ω₂':'ω₁r₁ = ω₂r₂',same?'Roda sepusat berputar dengan kecepatan sudut yang sama. Kelajuan linear pada tepi tiap roda dapat berbeda.':oppo?'Pada roda bersinggungan tanpa selip, kelajuan tangensial di titik kontak sama dan arah rotasinya berlawanan.':'Pada sabuk terbuka yang tidak selip, kelajuan sabuk pada tepi kedua roda sama dan kedua roda berputar searah.',svg);animNodes.w1=$('wheel1');animNodes.w2=$('wheel2');animNodes.oppo=oppo;animNodes.w2speed=w2;animNodes.center1=x1;animNodes.center2=x2}
 else if(c===2){const tau=v.r*v.F*Math.sin(v.a*Math.PI/180),len=90+v.r*83,x2=140+len,dx=Math.cos(v.a*Math.PI/180)*100,dy=-Math.sin(v.a*Math.PI/180)*100;const graphic=`<line x1="140" y1="178" x2="${x2}" y2="178" stroke="#d7eafa" stroke-width="15" stroke-linecap="round"/><circle cx="140" cy="178" r="15" fill="#ffcf7a" stroke="#fff1c9" stroke-width="4"/><path d="M120 204L160 204L140 180Z" fill="#385d78"/><line x1="${x2}" y1="178" x2="${x2+dx}" y2="${178+dy}" stroke="#ffcb70" stroke-width="6" stroke-linecap="round" marker-end="url(#arr)"/><path d="M${x2-43} 178A43 43 0 0 0 ${x2-43*Math.cos(v.a*Math.PI/180)} ${178-43*Math.sin(v.a*Math.PI/180)}" stroke="#84bfe8" stroke-width="3" fill="none"/><text x="${x2}" y="157" font-size="16" fill="#e1edf7" text-anchor="middle">F = ${fmt(v.F,0)} N</text><text x="${(140+x2)/2}" y="211" font-size="16" text-anchor="middle" fill="#7acbe9">r = ${fmt(v.r,1)} m</text><text x="300" y="296" font-size="21" text-anchor="middle" fill="#ffda91">θ = ${fmt(v.a,0)}°</text>`;
 drawLabels([['Torsi',fmt(tau)+' N·m'],['Lengan momen',fmt(v.r)+' m'],['Komponen tegak lurus',fmt(v.F*Math.sin(v.a*Math.PI/180))+' N']],'τ = rF sin θ',tau<.01?'Ketika gaya sejajar dengan lengan momen, torsi sama dengan nol.':`Torsi maksimal untuk panjang lengan dan besar gaya yang sama terjadi ketika sudut gaya terhadap lengan momen sebesar 90°.`,graphic)}
 else if(c===3){const coeff=[1,.5,.4][bodyMode],I=coeff*v.m*v.r*v.r,E=.5*I*v.w*v.w;let circles=bodyMode===0?`<circle cx="300" cy="164" r="91" fill="none" stroke="#6fc6e6" stroke-width="23"/>`:`<circle cx="300" cy="164" r="96" fill="${bodyMode===1?'#27749b':'#43849c'}" stroke="#8bd5ed" stroke-width="6"/>`;
 const graphic=`${circles}<g id="bodySpin"><path d="M300 164V75" stroke="#ffd379" stroke-width="8" stroke-linecap="round"/><circle cx="300" cy="164" r="9" fill="#fff0cb"/><circle cx="300" cy="75" r="7" fill="#ffd379"/></g><text x="300" y="292" text-anchor="middle" font-size="20" fill="#e8f7ff">${bodies[bodyMode]}</text><text x="300" y="319" text-anchor="middle" font-size="14" fill="#9dbbd1">m = ${fmt(v.m,1)} kg · r = ${fmt(v.r,1)} m</text>`;
 drawLabels([['Momen inersia',fmt(I)+' kg·m²'],['Energi rotasi',fmt(E)+' J'],['ω',fmt(v.w,1)+' rad/s']],[`I = mr²`,`I = ½mr²`,`I = ⅖mr²`][bodyMode],`Untuk massa dan jari-jari yang sama, ${bodies[bodyMode].toLowerCase()} memiliki momen inersia ${bodyMode===0?'lebih besar daripada cakram pejal dan bola pejal':'sesuai distribusi massanya'}. Energi rotasi sebanding dengan ω².`,graphic);animNodes.body=$('bodySpin')}
 else if(c===4){const tL=v.m1*9.8*v.r1,tR=v.m2*9.8*v.r2,diff=tL-tR,tilt=Math.max(-13,Math.min(13,-diff/22));let status=Math.abs(diff)<1e-8?'SETIMBANG':diff>0?'KIRI TURUN':'KANAN TURUN';const left=95+v.r1*48,right=95+v.r2*48;
 const svg=`<g id="lever" transform="rotate(${tilt} 300 160)"><line x1="${300-left}" y1="160" x2="${300+right}" y2="160" stroke="#84c5e5" stroke-width="12" stroke-linecap="round"/><line x1="${300-left}" y1="160" x2="${300-left}" y2="205" stroke="#ffd38b" stroke-width="3"/><rect x="${300-left-23}" y="205" width="46" height="43" rx="8" fill="#f5c36b"/><text x="${300-left}" y="231" text-anchor="middle" font-size="14" fill="#243953">${v.m1} kg</text><line x1="${300+right}" y1="160" x2="${300+right}" y2="205" stroke="#ffd38b" stroke-width="3"/><rect x="${300+right-23}" y="205" width="46" height="43" rx="8" fill="#f5c36b"/><text x="${300+right}" y="231" text-anchor="middle" font-size="14" fill="#243953">${v.m2} kg</text></g><path d="M280 250L300 171L320 250Z" fill="#527c9b"/><circle cx="300" cy="160" r="11" fill="#e8f7fc"/><text x="300" y="83" font-weight="700" font-size="22" text-anchor="middle" fill="${status==='SETIMBANG'?'#9beaaf':'#f4c978'}">${status}</text><text x="300" y="321" text-anchor="middle" font-size="14" fill="#a7bdd6">Batang tanpa massa · g = 9,8 m/s²</text>`;
 drawLabels([['Torsi kiri',fmt(tL)+' N·m'],['Torsi kanan',fmt(tR)+' N·m'],['Selisih torsi',fmt(Math.abs(diff))+' N·m']],'Στ = τₖ − τₙ',status==='SETIMBANG'?'Resultan torsi nol, sehingga batang berada dalam kesetimbangan rotasi.':`Torsi ${diff>0?'sebelah kiri':'sebelah kanan'} lebih besar. Atur massa atau lengan momen hingga kedua torsi sama.`,svg)}
}
function animateLab(){if(!currentVals)return;const v=currentVals;const deg=180/Math.PI;if(activeLab===0&&animNodes.a)animNodes.a.setAttribute('transform',`rotate(${angleTime*v.w*deg} 300 163)`);if(activeLab===1&&animNodes.w1){animNodes.w1.setAttribute('transform',`rotate(${angleTime*v.w1*deg} ${animNodes.center1} 158)`);animNodes.w2.setAttribute('transform',`rotate(${angleTime*animNodes.w2speed*deg*(animNodes.oppo?-1:1)} ${animNodes.center2} 158)`)}if(activeLab===3&&animNodes.body)animNodes.body.setAttribute('transform',`rotate(${angleTime*v.w*deg} 300 164)`)}
initListeners();setupInk();setupTouchNavigation();goSlide(current);const forced=new URLSearchParams(location.search).get('pid');const saved=readStore('studio-fisika-rotasi-pid',null);setPidMode(forced==='1'?true:forced==='0'?false:saved===null?navigator.maxTouchPoints>0:!!saved,false);setZoom(1);if(new URLSearchParams(location.search).get('kelas')==='1')startClassroomMode(false);
if('serviceWorker' in navigator && location.protocol!=='file:')window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
