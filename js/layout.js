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
  // WhatsApp abre la app en el celular y WhatsApp Web en la computadora.
  var WHATSAPP = 'https://wa.me/59895351871';
  var WA_SVG = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm0 18.2a8.2 8.2 0 01-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1112 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 01-3.3-2.9c-.2-.4.3-.4.8-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 00-.7.3 3 3 0 00-.9 2.2 5.2 5.2 0 001.1 2.8 11.9 11.9 0 004.6 4c1.7.7 2.4.8 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.2-.2-.4-.3z"/></svg>';
  var ADDRESS = 'Zapicán 2710, Montevideo';

  // Menú: cada opción es una página propia.
  var NAV = [
    { id: 'inicio', label: 'Inicio', href: './' },
    { id: 'nosotros', label: 'Nosotros', href: 'nosotros.html' },
    { id: 'horarios', label: 'Horarios', href: 'horarios.html' },
    { id: 'galeria', label: 'Galería', href: 'galeria.html' },
    { id: 'noticias', label: 'Noticias', href: 'noticias.html' },
    { id: 'contacto', label: 'Contacto', href: 'contacto.html' }
  ];

  // Logo oficial del club (assets/logo.png), usado en el encabezado y el pie.
  var SEAL_SVG = '<img src="assets/logo.png" alt="" width="150" height="150">';
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
          '<a class="brand" href="./" aria-label="Judokan Uruguay, inicio">' +
            '<span class="seal">' + SEAL_SVG + '</span>' +
            '<span class="brand-text">JUDOKAN<small>URUGUAY</small></span>' +
          '</a>' +
          '<div class="nav-right">' +
            '<nav id="nav" class="nav-menu" aria-label="Principal">' +
              '<ul>' + '<li class="nav-pill" aria-hidden="true"></li>' + links + '</ul>' +
              '<a class="btn btn-red nav-cta-mobile" href="' + WHATSAPP + '" target="_blank" rel="noopener">' + WA_SVG + 'Escribinos</a>' +
            '</nav>' +
            '<a class="btn btn-red nav-cta" href="' + WHATSAPP + '" target="_blank" rel="noopener">' + WA_SVG + 'Escribinos</a>' +
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

  // Barra de acción fija en celular: llamar o escribir sin buscar el número.
  var dock = el('<nav class="mobile-dock" aria-label="Contacto rápido">' +
    '<a class="dock-call" href="tel:' + PHONE_LINK + '">' + PHONE_SVG + 'Llamar</a>' +
    '<a class="dock-wa" href="' + WHATSAPP + '" target="_blank" rel="noopener">' + WA_SVG + 'WhatsApp</a>' +
  '</nav>');
  document.body.appendChild(dock);
})();
