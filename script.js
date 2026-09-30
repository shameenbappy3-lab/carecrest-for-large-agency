/* CALCULATOR (multi-location) */
var F=[
 {id:"locs",label:"Number of locations / territories",hint:"Offices or franchise territories you recruit for",min:2,max:50,step:1,val:5},
 {id:"apps",label:"Monthly caregiver applicants per location",hint:"",min:20,max:150,step:1,val:60},
 {id:"mins",label:"Time spent per applicant (minutes)",hint:"Reviewing resume, text back-and-forth, scheduling, phone screen, documenting feedback, go / no-go decision",min:30,max:90,step:1,val:60},
 {id:"rate",label:"Office team's average hourly cost ($ per hour)",hint:"Recruiters, schedulers, managers or office admins",min:17,max:30,step:1,val:25}
];
var box=document.getElementById("inputs");
F.forEach(function(f){
 var d=document.createElement("div");d.className="field";
 d.innerHTML='<label for="n_'+f.id+'">'+f.label+'</label>'+(f.hint?'<small>'+f.hint+'</small>':'')+
 '<div class="row"><input type="range" min="'+f.min+'" max="'+f.max+'" step="'+f.step+'" value="'+f.val+'" aria-label="'+f.label+' slider">'+
 '<input type="number" id="n_'+f.id+'" min="'+f.min+'" max="'+f.max+'" value="'+f.val+'"></div>';
 box.appendChild(d);
 var r=d.querySelector('input[type="range"]'),n=d.querySelector('input[type="number"]');
 r.addEventListener("input",function(){n.value=r.value;calc()});
 n.addEventListener("input",function(){var x=parseFloat(n.value);if(!Number.isNaN(x))r.value=x;calc()});
 n.addEventListener("change",function(){var x=parseFloat(n.value);if(Number.isNaN(x))x=f.val;x=Math.min(f.max,Math.max(f.min,x));n.value=x;r.value=x;calc()});
});
function v(id){return Math.max(0,parseFloat(document.getElementById("n_"+id).value)||0)}
function fmt(x){return Math.round(x).toLocaleString("en-US")}
function calc(){
 var hm=v("locs")*v("apps")*v("mins")/60, hy=hm*12;
 document.getElementById("hm").textContent=fmt(hm);
 document.getElementById("hy").textContent=fmt(hy);
 document.getElementById("wk").textContent=(hy/52).toFixed(1);
 document.getElementById("fte").textContent=(hy/2080).toFixed(1);
 document.getElementById("cost").textContent="$"+fmt(hy*v("rate"));
}
calc();

/* AUDIENCE TABS */
(function(){
 var tabs=document.querySelectorAll(".tab"),panels=document.querySelectorAll(".tab-panel");
 function show(t){
  tabs.forEach(function(x){x.setAttribute("aria-selected",x===t?"true":"false")});
  panels.forEach(function(p){p.hidden=p.id!==t.getAttribute("aria-controls")});
 }
 tabs.forEach(function(t,i){
  t.addEventListener("click",function(){show(t)});
  t.addEventListener("keydown",function(e){
   if(e.key==="ArrowRight"||e.key==="ArrowLeft"){var o=tabs[(i+1)%tabs.length];o.focus();show(o)}
  });
 });
})();

/* TESTIMONIALS (placeholders - replace with real quotes) */
var T=[
 {q:"We were staffing a recruiter and scheduler in every office. Now one central team handles all of it.",n:"Name L.",r:"Owner, 5-location agency — State"},
 {q:"Office A was paying overtime while Office C had caregivers sitting idle. Central screening finally fixed that.",n:"Name M.",r:"Regional Director — State"},
 {q:"Every branch screens the same way now, and I can see it all in one dashboard.",n:"Name R.",r:"HR Director, franchise network — State"},
 {q:"New territories open without us hiring another office admin.",n:"Name K.",r:"Multi-unit Owner — State"}
];
var mtrack=document.getElementById("mtrack");
T.concat(T).forEach(function(t){
 var d=document.createElement("div");d.className="t-card";
 d.innerHTML='<p>“'+t.q+'”</p><div class="t-who"><b>'+t.n+'</b><span>'+t.r+'</span></div>';
 mtrack.appendChild(d);
});

/* SCROLL REVEAL */
(function(){
 var nodes=document.querySelectorAll("[data-reveal]");
 if(window.matchMedia("(prefers-reduced-motion: reduce)").matches||!("IntersectionObserver" in window)){
  nodes.forEach(function(el){el.classList.add("is-in")});return;
 }
 var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("is-in");io.unobserve(e.target)}})},{threshold:.16,rootMargin:"0px 0px -8% 0px"});
 nodes.forEach(function(el){io.observe(el)});
})();
