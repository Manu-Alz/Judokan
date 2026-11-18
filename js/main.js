/* ==========================================================================
   Judokan Uruguay · comportamiento común a todas las páginas
   Requiere que js/layout.js se cargue antes (crea el encabezado).
   Sin dependencias. Las noticias están en js/noticias.js.
   ========================================================================== */
(function () {
  'use strict';

  var body = document.body;
  var header = document.querySelector('.site-header');
  var burger = document.querySelector('.burger');
  var menu = document.getElementById('nav');

  /* 1. Encabezado: estado "scrolled" al bajar ----------------------------- */
  function onScroll() {
    if (header) header.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* 2. Menú móvil --------------------------------------------------------- */
  function setMenu(open) {
    menu.classList.toggle('open', open);
    // backdrop-filter crea un contexto para los hijos fijos: se quita con el menú abierto.
    header.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    body.style.overflow = open ? 'hidden' : '';
  }
  if (burger && menu) {
    burger.addEventListener('click', function () {
      setMenu(!menu.classList.contains('open'));
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setMenu(false);
    });
  }

  /* 3. Revelado al hacer scroll ------------------------------------------- */
  var revealEls = document.querySelectorAll('.reveal, .reveal-l, .reveal-s');
  if ('IntersectionObserver' in window) {
    var revealIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          revealIo.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { revealIo.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* 4. Contadores (data-count) ------------------------------------------- */
  function animateCount(el) {
    var end = Number(el.getAttribute('data-count'));
    var dur = 1800;
    var t0 = performance.now();
    function step(now) {
      var p = Math.min((now - t0) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(end * eased).toLocaleString('es-UY');
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    var countIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        animateCount(e.target);
        countIo.unobserve(e.target);
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) {
      el.textContent = '0';
      countIo.observe(el);
    });
  }

  /* 5. Galería: visor a pantalla completa (se crea aquí, no en el HTML) --- */
  var galleryFigs = document.querySelectorAll('.gallery figure');
  if (galleryFigs.length) {
    var lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-label', 'Foto ampliada');
    var big = document.createElement('img');
    big.alt = '';
    lightbox.appendChild(big);
    document.body.appendChild(lightbox);

    galleryFigs.forEach(function (fig) {
      fig.addEventListener('click', function () {
        var img = fig.querySelector('img');
        big.src = img.src;
        big.alt = img.alt;
        lightbox.classList.add('open');
      });
    });
    lightbox.addEventListener('click', function () {
      lightbox.classList.remove('open');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') lightbox.classList.remove('open');
    });
  }
})();
