/* ==========================================================================
   Judokan Uruguay · encabezado y pie compartidos
   Un solo lugar para editar el menú y los datos de contacto.
   Cada página tiene <div id="site-header"> y <div id="site-footer">.
   En <body> se indica:
     data-page="nosotros"    → resalta el enlace del menú
     data-header="solid"     → encabezado con fondo sólido desde el inicio
   ========================================================================== */
(function () {
  'use strict';

  var PHONE = '095 351 871';
  var PHONE_LINK = '+59895351871';
  var ADDRESS = 'Zapicán 2710, Montevideo';

  // Menú: cada opción es una página propia.
  var NAV = [
    { id: 'nosotros', label: 'Nosotros', href: 'nosotros.html' },
    { id: 'horarios', label: 'Horarios', href: 'horarios.html' },
    { id: 'galeria', label: 'Galería', href: 'galeria.html' },
    { id: 'noticias', label: 'Noticias', href: 'noticias.html' },
    { id: 'contacto', label: 'Contacto', href: 'contacto.html' }
  ];

  var SEAL_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 3a7 7 0 110 14 7 7 0 010-14zm-1 3.5v3H8v2h3v3h2v-3h3v-2h-3v-3h-2z"/></svg>';
  var PHONE_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2"/></svg>';

  function el(html) {
    var t = document.createElement('template');
    t.innerHTML = html.trim();
    return t.content.firstChild;
  }

  function buildHeader() {
    var body = document.body;
    var page = body.getAttribute('data-page') || '';
    var solid = body.getAttribute('data-header') === 'solid';

    var links = NAV.map(function (n) {
      var current = n.id === page ? ' aria-current="page"' : '';
      return '<li><a class="link" href="' + n.href + '"' + current + '>' + n.label + '</a></li>';
    }).join('');

    var html =
      '<header class="site-header' + (solid ? ' solid' : '') + '">' +
        '<div class="wrap nav">' +
          '<a class="brand" href="index.html" aria-label="Judokan Uruguay, inicio">' +
            '<span class="seal">' + SEAL_SVG + '</span>' +
            '<span class="brand-text">JUDOKAN<small>URUGUAY</small></span>' +
          '</a>' +
          '<div class="nav-right">' +
            '<nav id="nav" class="nav-menu" aria-label="Principal">' +
              '<ul>' + links + '</ul>' +
              '<a class="btn btn-red nav-cta-mobile" href="contacto.html">Probá una clase</a>' +
            '</nav>' +
            '<a class="btn btn-red nav-cta" href="contacto.html">' + PHONE_SVG + 'Probá una clase</a>' +
            '<button class="burger" type="button" aria-label="Abrir menú" aria-expanded="false" aria-controls="nav"><span></span></button>' +
          '</div>' +
        '</div>' +
      '</header>';
    return el(html);
  }

  function buildFooter() {
    var navLinks = NAV.map(function (n) {
      return '<li><a href="' + n.href + '">' + n.label + '</a></li>';
    }).join('');

    var html =
      '<footer class="site-footer">' +
        '<div class="wrap">' +
          '<div class="foot-grid">' +
            '<div>' +
              '<div class="brand foot-brand"><span class="seal">' + SEAL_SVG + '</span>' +
              '<span class="brand-text">JUDOKAN<small>URUGUAY</small></span></div>' +
              '<p>Asociación de Artes Marciales Judokan. Judo, Jiu-jitsu, Sumo y Kurash en Montevideo desde 1983.</p>' +
            '</div>' +
            '<div><h4>Navegación</h4><ul>' + navLinks + '</ul></div>' +
            '<div><h4>Contacto</h4><ul>' +
              '<li><a href="tel:' + PHONE_LINK + '">' + PHONE + '</a></li>' +
              '<li>' + ADDRESS + '</li>' +
              '<li><a href="https://www.instagram.com/judokan.uy/" target="_blank" rel="noopener">Instagram</a></li>' +
              '<li><a href="https://www.facebook.com/judokan.uy" target="_blank" rel="noopener">Facebook</a></li>' +
            '</ul></div>' +
          '</div>' +
          '<div class="foot-bottom">' +
            '<span>© 2026 Asociación de Artes Marciales Judokan · Montevideo</span>' +
            '<a href="https://judokan.uy/">judokan.uy</a>' +
          '</div>' +
        '</div>' +
      '</footer>';
    return el(html);
  }

  var h = document.getElementById('site-header');
  if (h) h.replaceWith(buildHeader());
  var f = document.getElementById('site-footer');
  if (f) f.replaceWith(buildFooter());
})();
