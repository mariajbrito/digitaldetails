/* =========================================================
   DIGITAL DETAILS — comportamento global
   ========================================================= */

(() => {
  'use strict';

  /* Navbar — scroll state */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* Menu mobile */
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const open = navMenu.classList.toggle('open');
      hamburger.classList.toggle('active', open);
      hamburger.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (link.closest('.nav-item-drop') && window.innerWidth <= 960) return;
        navMenu.classList.remove('open');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    /* Dropdown mobile — toggle ao tocar */
    navMenu.querySelectorAll('.nav-item-drop > .nav-link').forEach(parentLink => {
      parentLink.addEventListener('click', (e) => {
        if (window.innerWidth <= 960) {
          e.preventDefault();
          parentLink.parentElement.classList.toggle('open');
        }
      });
    });
  }

  /* Fade-in scroll observer */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  /* FAQ accordion */
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    if (!q || !a) return;

    q.addEventListener('click', () => {
      const isOpen = item.classList.toggle('open');
      a.style.maxHeight = isOpen ? `${a.scrollHeight}px` : '0';
      q.setAttribute('aria-expanded', String(isOpen));
    });
  });

  /* Formulário de contacto */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const nome = (data.get('nome') || '').toString().trim();
      const mensagem = (data.get('mensagem') || '').toString().trim();
      const tel = '351968573903';
      const texto = encodeURIComponent(`Olá! Sou ${nome}.\n\n${mensagem}`);
      window.open(`https://wa.me/${tel}?text=${texto}`, '_blank', 'noopener');
      const msg = form.querySelector('.form-msg');
      if (msg) { msg.textContent = 'A redirecionar para o WhatsApp…'; msg.classList.add('ok'); }
    });
  }

  /* Pesquisa simples do blog */
  const search = document.getElementById('blogSearch');
  if (search) {
    const cards = document.querySelectorAll('.post-card');
    search.addEventListener('input', () => {
      const q = search.value.toLowerCase().trim();
      cards.forEach(card => {
        const t = card.textContent.toLowerCase();
        card.style.display = !q || t.includes(q) ? '' : 'none';
      });
    });
  }

  /* Filtro de categorias do blog */
  const chips = document.querySelectorAll('.cat-chip');
  if (chips.length) {
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const cat = chip.dataset.cat;
        document.querySelectorAll('.post-card').forEach(card => {
          card.style.display = (cat === 'todos' || card.dataset.cat === cat) ? '' : 'none';
        });
      });
    });
  }

  /* Ano automático no footer */
  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
})();
