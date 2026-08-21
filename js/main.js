// Theme toggle (dark/light mode with localStorage persistence)
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Load saved theme preference on page load
function initTheme(){
  const savedTheme = localStorage.getItem('theme') || 'light';
  applyTheme(savedTheme);
}

function applyTheme(theme){
  if(theme === 'dark'){
    document.body.classList.add('dark-mode');
    if(themeToggle) themeToggle.textContent = '☀️';
  } else {
    document.body.classList.remove('dark-mode');
    if(themeToggle) themeToggle.textContent = '🌙';
  }
  localStorage.setItem('theme', theme);
}

if(themeToggle){
  themeToggle.addEventListener('click', ()=>{
    const isDark = document.body.classList.contains('dark-mode');
    applyTheme(isDark ? 'light' : 'dark');
  });
}

// Initialize theme on page load
initTheme();

// Menu burger toggle
const burger = document.querySelector('.burger');
const mobileMenu = document.querySelector('.mobile-menu');
if(burger){
  burger.addEventListener('click', ()=>{
    const expanded = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', String(!expanded));
    mobileMenu.classList.toggle('is-open');
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor =>{
  anchor.addEventListener('click', function(e){
    const target = document.querySelector(this.getAttribute('href'));
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth', block:'start'});
      // close mobile menu if open
      if(mobileMenu.classList.contains('is-open')){
        mobileMenu.classList.remove('is-open');
        burger.setAttribute('aria-expanded','false');
      }
    }
  });
});

// Contact form submission via Fetch (Formspree / Web3Forms / EmailJS)
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
if(contactForm){
  contactForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    formStatus.textContent = 'Envoi en cours...';
    const action = contactForm.getAttribute('action');
    const formData = new FormData(contactForm);
    try{
      const res = await fetch(action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      if(res.ok){
        formStatus.textContent = 'Merci ! Votre message a été envoyé.';
        contactForm.reset();
      } else {
        const data = await res.json();
        formStatus.textContent = data?.message || 'Une erreur est survenue.';
      }
    }catch(err){
      formStatus.textContent = 'Impossible d\'envoyer le message. Vérifiez la connexion.';
      console.error(err);
    }
  });
}

// Reveal on scroll (IntersectionObserver)
const revealElems = document.querySelectorAll('.reveal');
if('IntersectionObserver' in window && revealElems.length){
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  },{ threshold: 0.12 });
  revealElems.forEach(el => obs.observe(el));
} else {
  // fallback: reveal all
  revealElems.forEach(el=>el.classList.add('in-view'));
}

// Projects modal / carousel
const projectCards = document.querySelectorAll('.project-card');
const modal = document.createElement('div');
modal.className = 'modal-viewer';
modal.innerHTML = `
  <div class="modal-content" role="dialog" aria-modal="true" aria-label="Aperçu du projet">
    <button class="modal-close" aria-label="Fermer">✕</button>
    <img src="" alt="">
    <div class="modal-meta">
      <div class="modal-title">Titre</div>
      <div class="modal-controls">
        <button class="modal-prev" aria-label="Précédent">◀</button>
        <button class="modal-next" aria-label="Suivant">▶</button>
      </div>
    </div>
    <p class="modal-desc" style="color:var(--muted);margin-top:0.6rem"></p>
  </div>
`;
document.body.appendChild(modal);

const modalImg = modal.querySelector('img');
const modalTitle = modal.querySelector('.modal-title');
const modalDesc = modal.querySelector('.modal-desc');
const btnClose = modal.querySelector('.modal-close');
const btnPrev = modal.querySelector('.modal-prev');
const btnNext = modal.querySelector('.modal-next');

let currentIndex = 0;
const projects = Array.from(projectCards).map(card=>({
  img: card.querySelector('img').getAttribute('src'),
  title: card.querySelector('h4').innerText,
  desc: card.querySelector('p').innerText
}));

function openModal(i){
  currentIndex = i;
  const p = projects[currentIndex];
  modalImg.src = p.img;
  modalTitle.textContent = p.title;
  modalDesc.textContent = p.desc;
  modal.classList.add('is-open');
}

function closeModal(){ modal.classList.remove('is-open'); }

projectCards.forEach((card, i)=>{
  card.addEventListener('click', ()=> openModal(i));
});

btnClose.addEventListener('click', closeModal);
btnPrev.addEventListener('click', ()=> openModal((currentIndex-1+projects.length)%projects.length));
btnNext.addEventListener('click', ()=> openModal((currentIndex+1)%projects.length));

modal.addEventListener('click', (e)=>{ if(e.target===modal) closeModal(); });
document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closeModal(); if(e.key==='ArrowRight') btnNext.click(); if(e.key==='ArrowLeft') btnPrev.click(); });

// Simple parallax for hero-bg-logo
const heroLogo = document.querySelector('.hero-bg-logo');
if(heroLogo){
  window.addEventListener('scroll', ()=>{
    const sc = window.scrollY;
    heroLogo.style.transform = `translateY(${ -sc * 0.08 }px)`;
  });
}
