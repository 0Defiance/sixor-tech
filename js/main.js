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
