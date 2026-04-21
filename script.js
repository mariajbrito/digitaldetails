/* ============================================
   DIGITAL DETAILS — script.js
   ============================================ */

/* ── Navbar scroll ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ── Mobile menu ── */
const hamburger  = document.getElementById('hamburger');
const navMenu    = document.getElementById('navMenu');
const navOverlay = document.createElement('div');
navOverlay.className = 'nav-overlay';
document.body.appendChild(navOverlay);

function openMenu() {
  hamburger.classList.add('open');
  navMenu.classList.add('open');
  navOverlay.classList.add('visible');
  document.body.style.overflow = 'hidden';
  hamburger.setAttribute('aria-label', 'Fechar menu');
}

function closeMenu() {
  hamburger.classList.remove('open');
  navMenu.classList.remove('open');
  navOverlay.classList.remove('visible');
  document.body.style.overflow = '';
  hamburger.setAttribute('aria-label', 'Abrir menu');
}

hamburger.addEventListener('click', () => {
  navMenu.classList.contains('open') ? closeMenu() : openMenu();
});

navOverlay.addEventListener('click', closeMenu);

navMenu.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navMenu.classList.contains('open')) closeMenu();
});

/* ── Scroll-triggered fade-ups ── */
const fadeEls = document.querySelectorAll('.fade-up');

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const delay = parseInt(entry.target.dataset.delay || 0, 10);
    setTimeout(() => entry.target.classList.add('visible'), delay);
    io.unobserve(entry.target);
  });
}, { threshold: 0.1, rootMargin: '0px 0px -32px 0px' });

/* stagger siblings within grid/list parents */
const staggerParents = [
  '.services-grid',
  '.portfolio-grid',
  '.process-steps',
  '.about-values',
  '.faq-list',
  '.cdetails',
];
staggerParents.forEach(sel => {
  document.querySelectorAll(sel).forEach(parent => {
    parent.querySelectorAll('.fade-up').forEach((el, i) => {
      el.dataset.delay = i * 90;
    });
  });
});

fadeEls.forEach(el => io.observe(el));

/* ── Duplicate marquee for seamless infinite scroll ── */
const inner = document.getElementById('marqueeInner');
if (inner) {
  const clone = inner.cloneNode(true);
  clone.setAttribute('aria-hidden', 'true');
  inner.parentElement.appendChild(clone);
}

/* ── FAQ accordion ── */
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item   = btn.closest('.faq-item');
    const answer = item.querySelector('.faq-a');
    const isOpen = item.classList.contains('open');

    // close all
    document.querySelectorAll('.faq-item.open').forEach(openItem => {
      openItem.classList.remove('open');
      openItem.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      const a = openItem.querySelector('.faq-a');
      a.style.maxHeight = null;
      a.hidden = true;
    });

    // open clicked one if it was closed
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
      answer.hidden = false;
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

/* ── Contact form ── */
const form      = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const originalHTML = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '&#10003; Mensagem enviada!';
    submitBtn.style.background = '#22c55e';
    submitBtn.style.borderColor = '#22c55e';
    submitBtn.style.color = '#fff';

    setTimeout(() => {
      submitBtn.innerHTML = originalHTML;
      submitBtn.style.background = '';
      submitBtn.style.borderColor = '';
      submitBtn.style.color = '';
      submitBtn.disabled = false;
      form.reset();
    }, 3500);
  });
}

/* ── Smooth anchor scroll (fallback for older browsers) ── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const id = link.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── Active nav link on scroll ── */
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link[href^="#"]');

const sectionIO = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle(
          'nav-link--active',
          link.getAttribute('href') === '#' + id
        );
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionIO.observe(s));
