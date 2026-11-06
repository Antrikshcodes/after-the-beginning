const chapters=[...document.querySelectorAll('.chapter')];
const ticks=[...document.querySelectorAll('.tick')];
const timeline=document.querySelector('.timeline');
const era=document.querySelector('.timeline-era');
const date=document.querySelector('.timeline-date');
const labels=[['TRIASSIC','230 MYA'],['JURASSIC','201 MYA'],['CRETACEOUS','66 MYA'],['PALEOGENE','66 MYA'],['HOMININ','7 MYA'],['HOLOCENE','300 KYA']];
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(!entry.isIntersecting)return;
  const i=chapters.indexOf(entry.target);
  entry.target.classList.add('is-active');
  if(i>=0){
    timeline.classList.add('visible');
    ticks.forEach((tick,n)=>tick.classList.toggle('active',n===i));
    era.textContent=labels[i][0];date.textContent=labels[i][1];
    document.querySelector('.timeline-fill').style.height=`${i*20}%`;
  }
}),{threshold:.55});
chapters.forEach(ch=>observer.observe(ch));
const heroObserver=new IntersectionObserver(([entry])=>{if(entry.isIntersecting)timeline.classList.remove('visible')},{threshold:.5});
heroObserver.observe(document.querySelector('.hero'));
const parallaxItems=document.querySelectorAll('.art .layer,.art .sun,.art .chapter-sun,.art .dino,.art .mammal,.art .hominin,.art .human');
let ticking=false;
window.addEventListener('scroll',()=>{
  if(ticking)return;ticking=true;
  requestAnimationFrame(()=>{
    const vh=innerHeight;
    parallaxItems.forEach(el=>{
      const scene=el.closest('.scene');if(!scene)return;
      const rect=scene.getBoundingClientRect();if(rect.bottom<0||rect.top>vh)return;
      const amount=(vh/2-(rect.top+rect.height/2))/vh;
      const depth=el.classList.contains('layer')?16:8;
      el.style.translate=`0 ${amount*depth}px`;
    });
    ticking=false;
  });
},{passive:true});
