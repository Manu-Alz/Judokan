/* ==========================================================================
   Judokan Uruguay · equipo (Sobre nosotros)
   La fila tiene un botón por integrante, incluido el Sensei.
   Al elegir uno, la tarjeta grande muestra su perfil.
   Los datos salen de los atributos data-* de cada botón.
   ========================================================================== */
(function () {
  'use strict';

  var feature = document.getElementById('feature');
  if (!feature) return;

  var img = document.getElementById('feat-img');
  var role = document.getElementById('feat-role');
  var name = document.getElementById('feat-name');
  var bio = document.getElementById('feat-bio');
  var buttons = document.querySelectorAll('.roster-item');

  function show(data) {
    feature.classList.add('switching');
    // Espera al fin del fade para cambiar el contenido y volver a mostrarlo.
    setTimeout(function () {
      img.src = data.img;
      img.alt = data.alt;
      role.textContent = data.role;
      name.textContent = data.name;
      bio.textContent = data.bio;
      feature.classList.remove('switching');
    }, 260);
  }

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (btn.getAttribute('aria-pressed') === 'true') return; // ya está seleccionado
      buttons.forEach(function (b) {
        b.setAttribute('aria-pressed', String(b === btn));
      });
      show({
        img: btn.getAttribute('data-img'),
        alt: btn.getAttribute('data-alt'),
        role: btn.getAttribute('data-role'),
        name: btn.getAttribute('data-name'),
        bio: btn.getAttribute('data-bio')
      });
    });
  });
})();
