/* ==========================================================================
   Judokan Uruguay · comportamiento de la página
   Sin dependencias. Ver README.md.
   ========================================================================== */
(function () {
  'use strict';

  /* Encabezado: fondo sólido al hacer scroll ----------------------------- */
  var header = document.querySelector('header');
  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Menú móvil ------------------------------------------------------------ */
  var burger = document.querySelector('.burger');
  var menu = document.getElementById('nav');

  function setMenu(open) {
    menu.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  }

  burger.addEventListener('click', function () {
    setMenu(!menu.classList.contains('open'));
  });
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { setMenu(false); });
  });

  /* Revelado al hacer scroll --------------------------------------------- */
  var revealEls = document.querySelectorAll('.reveal, .reveal-l, .reveal-s');
  if ('IntersectionObserver' in window) {
    var revealIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          revealIo.unobserve(e.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { revealIo.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* Contadores ------------------------------------------------------------ */
  // Los elementos con data-count animan desde 0 hasta ese valor.
  // Los años (data-static) se muestran tal cual.
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
  if ('IntersectionObserver' in window) {
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

  /* Galería: visor a pantalla completa ----------------------------------- */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');

  document.querySelectorAll('.gallery figure').forEach(function (fig) {
    fig.addEventListener('click', function () {
      var img = fig.querySelector('img');
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('open');
    });
  });
  lightbox.addEventListener('click', function () {
    lightbox.classList.remove('open');
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') lightbox.classList.remove('open');
  });
})();
