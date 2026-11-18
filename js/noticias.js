/* ==========================================================================
   Judokan Uruguay · noticias
   Lee data/noticias.json y arma:
   - tarjetas en index.html        (elemento #news-latest, límite con data-limit)
   - listado con filtros           (elemento #news-list, en noticias.html)
   - página individual             (elemento #article, en noticia.html?s=slug)
   El contenido se escribe como texto (nunca como HTML), así que es seguro.
   ========================================================================== */
(function () {
  'use strict';

  var DATA_URL = 'data/noticias.json';

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === 'class') node.className = attrs[k];
        else node.setAttribute(k, attrs[k]);
      });
    }
    (children || []).forEach(function (c) {
      node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    });
    return node;
  }

  function formatDate(iso) {
    if (!iso) return '';
    var d = new Date(iso + 'T12:00:00');
    if (isNaN(d)) return iso;
    return d.toLocaleDateString('es-UY', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  function showMessage(container, text) {
    container.appendChild(el('div', { class: 'empty' }, [text]));
  }

  function loadNews() {
    return fetch(DATA_URL, { cache: 'no-cache' }).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    });
  }

  /* Tarjeta reutilizable -------------------------------------------------- */
  function newsCard(n, delay) {
    var meta = [];
    if (n.categoria) meta.push(el('span', { class: 'tag' }, [n.categoria]));
    var body = el('div', { class: 'body' }, [
      el('div', { class: 'news-meta' }, meta.concat(n.fecha ? [el('span', null, [formatDate(n.fecha)])] : [])),
      el('h3', null, [n.titulo]),
      el('p', null, [n.resumen || '']),
      el('span', { class: 'more' }, ['Leer más', el('span', { 'aria-hidden': 'true' }, ['→'])])
    ]);
    var thumb = el('div', { class: 'thumb' }, [
      el('img', { src: n.imagen || 'assets/jk_1.jpeg', alt: n.imagenAlt || n.titulo, loading: 'lazy' })
    ]);
    return el('a', {
      class: 'news-card reveal-s',
      href: 'noticia.html?s=' + encodeURIComponent(n.slug),
      style: '--d:' + (delay || 0) + 's'
    }, [thumb, body]);
  }

  /* Index: últimas noticias ---------------------------------------------- */
  function renderLatest(container, items) {
    var limit = Number(container.getAttribute('data-limit')) || 3;
    var list = items.slice(0, limit);
    if (!list.length) return showMessage(container, 'Pronto vamos a publicar novedades.');
    list.forEach(function (n, i) { container.appendChild(newsCard(n, i * 0.1)); });
    // Las tarjetas se crearon después del observer de main.js: las revelamos ya.
    requestAnimationFrame(function () {
      container.querySelectorAll('.reveal-s').forEach(function (c) { c.classList.add('in'); });
    });
  }

  /* Listado con filtros --------------------------------------------------- */
  function renderList(container, filtersEl, items) {
    var categories = [];
    items.forEach(function (n) {
      if (n.categoria && categories.indexOf(n.categoria) === -1) categories.push(n.categoria);
    });

    var current = 'Todas';
    function draw() {
      container.innerHTML = '';
      var list = current === 'Todas' ? items : items.filter(function (n) { return n.categoria === current; });
      if (!list.length) return showMessage(container, 'No hay noticias en esta categoría todavía.');
      list.forEach(function (n, i) {
        var card = newsCard(n, (i % 3) * 0.1);
        container.appendChild(card);
        requestAnimationFrame(function () { card.classList.add('in'); });
      });
    }

    if (filtersEl) {
      ['Todas'].concat(categories).forEach(function (cat) {
        var b = el('button', { class: 'filter', type: 'button', 'aria-pressed': String(cat === current) }, [cat]);
        b.addEventListener('click', function () {
          current = cat;
          filtersEl.querySelectorAll('.filter').forEach(function (x) {
            x.setAttribute('aria-pressed', String(x === b));
          });
          draw();
        });
        filtersEl.appendChild(b);
      });
    }
    draw();
  }

  /* Página individual ----------------------------------------------------- */
  function renderArticle(container, items) {
    var slug = new URLSearchParams(window.location.search).get('s');
    var n = items.filter(function (x) { return x.slug === slug; })[0];

    if (!n) {
      document.title = 'Noticia no encontrada | Judokan';
      container.appendChild(el('div', { class: 'not-found' }, [
        el('span', { class: 'eyebrow' }, ['Error']),
        el('h1', null, ['Noticia no encontrada']),
        el('p', { style: 'margin:20px auto 34px;max-width:460px' }, ['La noticia que buscás no existe o cambió de dirección.']),
        el('a', { class: 'btn btn-red', href: 'noticias.html' }, ['Ver todas las noticias'])
      ]));
      return;
    }

    document.title = n.titulo + ' | Judokan Uruguay';
    var meta = document.querySelector('meta[name="description"]');
    if (meta && n.resumen) meta.setAttribute('content', n.resumen);
    var crumb = document.getElementById('crumb-title');
    if (crumb) crumb.textContent = n.titulo;

    var head = el('div', { class: 'article-head' }, [
      el('div', { class: 'news-meta' }, [
        n.categoria ? el('span', { class: 'tag' }, [n.categoria]) : null,
        n.fecha ? el('span', null, [formatDate(n.fecha)]) : null
      ].filter(Boolean)),
      el('h1', { class: 'article-title' }, [n.titulo])
    ]);

    var cover = n.imagen ? el('img', { class: 'article-cover', src: n.imagen, alt: n.imagenAlt || n.titulo }) : null;
    var body = el('div', { class: 'article-body' }, (n.cuerpo || []).map(function (p) { return el('p', null, [p]); }));

    var foot = el('div', { class: 'article-foot' }, [
      el('a', { class: 'link-arrow', href: 'noticias.html' }, ['← Todas las noticias']),
      el('a', { class: 'btn btn-red', href: 'contacto.html' }, ['Consultar por el club'])
    ]);

    container.appendChild(el('article', { class: 'article' }, [head, cover, body, foot].filter(Boolean)));
  }

  /* Arranque -------------------------------------------------------------- */
  var latest = document.getElementById('news-latest');
  var list = document.getElementById('news-list');
  var article = document.getElementById('article');
  var filters = document.getElementById('news-filters');

  if (!latest && !list && !article) return;

  loadNews().then(function (items) {
    if (latest) renderLatest(latest, items);
    if (list) renderList(list, filters, items);
    if (article) renderArticle(article, items);
  }).catch(function () {
    var target = latest || list || article;
    showMessage(target, 'No pudimos cargar las noticias. Si estás viendo el sitio abriendo el archivo directamente, usá un servidor local o la versión publicada.');
  });
})();
