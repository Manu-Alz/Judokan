/* ==========================================================================
   Judokan Uruguay · equipo (Sobre nosotros)
   Al elegir un integrante de la fila, el destacado cambia a su perfil.
   El destacado vuelve al Sensei (José Soca) por defecto.
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

  // Perfil por defecto (José Soca), leído del HTML al cargar.
  var defaults = {
    img: img.getAttribute('src'),
    alt: img.getAttribute('alt'),
    role: role.textContent,
    name: name.textContent,
    bio: bio.textContent
  };

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

  function setActive(btn) {
    buttons.forEach(function (b) {
      b.setAttribute('aria-pressed', String(b === btn));
    });
  }

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      // Tocar el mismo integrante otra vez vuelve al Sensei.
      if (btn.getAttribute('aria-pressed') === 'true') {
        setActive(null);
        show(defaults);
        return;
      }
      setActive(btn);
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
