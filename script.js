/* script.js - interactivity, typing, scroll reveal, modals, form */

// small helper
const $ = selector => document.querySelector(selector);

// Typing effect for hero
const typedEl = $('#typed');
const words = ["ideas", "prototypes", "algorithms", "solutions"];
let wIndex = 0, cIndex = 0, deleting = false;
function typeLoop(){
  const word = words[wIndex % words.length];
  if(!deleting){
    cIndex++;
    typedEl.textContent = word.substring(0, cIndex);
    if(cIndex === word.length){ deleting = true; setTimeout(typeLoop, 900); return; }
  } else {
    cIndex--;
    typedEl.textContent = word.substring(0, cIndex);
    if(cIndex === 0){ deleting = false; wIndex++; }
  }
  setTimeout(typeLoop, deleting ? 60 : 110);
}
typeLoop();

// Mobile nav toggle
const hamburger = $('#hamburger');
hamburger && hamburger.addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('open');
});

// IntersectionObserver scroll reveal
const revealTargets = document.querySelectorAll('.section, .project-card, .entry, .skill-card, .profile-card, .project-card.small, .projects-grid, .skill-bars');
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('show');
      entry.target.classList.remove('hidden');
      // Skill bars filling on reveal
      if(entry.target.querySelectorAll){
        const bars = entry.target.querySelectorAll('.bar span');
        bars.forEach(b => {
          const w = b.getAttribute('data-width');
          if(w) b.style.width = w;
        });
      }
      obs.unobserve(entry.target);
    }
  });
}, {threshold: 0.12});

// mark initial hidden and observe
document.querySelectorAll('.section, .project-card, .entry, .skill-card').forEach(el => {
  el.classList.add('hidden');
  observer.observe(el);
});
// ensure bars animate if already visible
document.querySelectorAll('.bar span').forEach(b => {
  if(b.getAttribute('data-width') && isElementInViewport(b)) {
    b.style.width = b.getAttribute('data-width');
  }
});
function isElementInViewport(el){
  const rect = el.getBoundingClientRect();
  return rect.top < (window.innerHeight || document.documentElement.clientHeight);
}

// Project modal system
const modal = $('#modal');
const modalContent = $('#modalContent');
const modalClose = $('#modalClose') || document.getElementById('modalClose');

function openModal(key){
  let html = '';
  if(key === 'animal'){
    html = `<h2>Stray Animal Reporting System</h2>
      <p><strong>Stack:</strong> HTML, CSS, Bootstrap, MySQL</p>
      <p>Designed and developed a scalable, database-driven platform enabling citizens to report stray animals with photos and location; includes admin workflow for authorities and integration testing to ensure reliability.</p>
      <p><a href="https://github.com/Sravani-2004d" target="_blank">View code on GitHub</a></p>`;
  } else if(key === 'farmease'){
    html = `<h2>FarmEase: Disease Detection & Fertilizer Planner</h2>
      <p><strong>Stack:</strong> Python (ML), Chatbot, Web frontend</p>
      <p>AI-powered multilingual crop-health assistant with automated fertilizer suggestions and a conversational interface. Built testing scripts to validate model outputs and ensure performance in different languages.</p>
      <p><a href="https://github.com/Sravani-2004d" target="_blank">View code on GitHub</a></p>`;
  } else if(key === 'deepfake'){
    html = `<h2>Deepfake Detection System</h2>
      <p><strong>Stack:</strong> Frontend UI, Research on CNNs/Transformers</p>
      <p>Developed a clean, responsive frontend for a deepfake detection pipeline and supported research comparing CNN and Transformer approaches for media validation, focusing on precision and inference speed.</p>
      <p><a href="https://github.com/Sravani-2004d" target="_blank">View code on GitHub</a></p>`;
  } else {
    html = `<h2>Project</h2><p>Details coming soon.</p>`;
  }
  modalContent.innerHTML = html;
  modal.style.display = 'flex';
  modal.setAttribute('aria-hidden', 'false');
}
function closeModal(){
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
}
document.addEventListener('click', (e) => {
  // open modal from project buttons
  if(e.target.matches('[data-open]')) {
    const key = e.target.getAttribute('data-open');
    openModal(key);
  }
  if(e.target.matches('.project-card') && e.target.dataset.project) {
    openModal(e.target.dataset.project);
  }
  // close modal when clicking overlay or close button
  if(e.target === modal || e.target.matches('.modal-close')) closeModal();
});
document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape') closeModal();
});

// Contact form (demo)
function sendMessage(e){
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  if(!name || !email){ alert('Please enter name and email'); return; }
  // popup confirmation
  alert('✅ Thanks, ' + name + '! Your message has been noted. I will get back to you at ' + email + '.');
  document.getElementById('contactForm').reset();
}

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// small utility: attach click events for buttons with data-open attribute
document.querySelectorAll('[data-open]').forEach(btn => {
  btn.addEventListener('click', (ev) => {
    const key = ev.currentTarget.getAttribute('data-open');
    openModal(key);
  });
});

// ensure modal close button exists: create if not present
if(!document.getElementById('modalClose')){
  const closeBtn = document.createElement('button');
  closeBtn.className = 'modal-close';
  closeBtn.id = 'modalClose';
  closeBtn.innerHTML = '&times;';
  closeBtn.addEventListener('click', closeModal);
  document.querySelector('.modal-box')?.appendChild(closeBtn);
}
