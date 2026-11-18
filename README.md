# Judokan Uruguay: landing page

Sitio de una sola página para la Asociación de Artes Marciales Judokan (Montevideo).
Es un archivo HTML estático: no tiene build, ni dependencias, ni backend. Se abre en el navegador o se publica con GitHub Pages.

## Estructura del repo

```
index.html          Estructura y contenido (HTML). Enlaza al CSS y al JS.
css/
  styles.css        Todos los estilos, ordenados por secciones numeradas
js/
  main.js           Comportamiento: menú móvil, revelado al scroll, contadores, visor de galería
assets/             Fotos del club
  jk_*.jpeg         Fotos del sitio original de judokan.uy (hero, nosotros, equipo)
  galeria/ig_*.webp Fotos de Instagram para la galería
README.md           Este archivo
```

Regla general: el HTML solo tiene contenido, el CSS solo tiene estilos y el JS solo tiene comportamiento.
No hay estilos ni scripts dentro de `index.html`, salvo el enlace a las fuentes de Google.

## Estilo visual

La idea es una página **oscura, editorial y con mucho contraste**, pensada para causar impacto
sin perder seriedad. Referencias: sitios deportivos premium y revistas de deporte.

- **Fondo:** negro casi puro (`#0b0b0d`) con superficies un poco más claras (`#131317`, `#1b1b21`).
- **Acento:** rojo judo (`#e0212f`), usado con moderación: títulos clave, botones, marquesina, barras y bordes activos.
- **Texto:** blanco cálido (`#f4f4f2`) y gris (`#9a9ca6`) para lo secundario.
- **Tipografía:**
  - *Oswald* (Google Fonts) en mayúsculas para títulos, cifras y el marquee.
  - *Inter* (Google Fonts) para el texto corrido.
- **Forma:** esquinas redondeadas de 18 px en tarjetas y fotos; botones totalmente redondeados (píldora).
- **Espaciado:** secciones de 120 px de padding vertical (90 px en tablet, 72 px en móvil).

### Bloques principales

| Bloque | Qué hace |
| --- | --- |
| **Hero** | Foto grupal a pantalla completa con zoom lento (*Ken Burns*). Título en tres líneas que suben al cargar. |
| **Marquesina** | Franja roja inclinada con las disciplinas. Se desplaza en bucle. |
| **Estadísticas** | Cuatro cifras clave. Las cantidades (atletas, campeonatos) cuentan hasta su valor al entrar en pantalla. |
| **Nosotros** | Foto con marco rojo desplazado, un sello de "40 años" y etiquetas de disciplinas. |
| **Equipo** | Retratos en blanco y negro que pasan a color al pasar el mouse, con barra roja superior. |
| **Horarios** | Tres bloques con franjas horarias. Al pasar el mouse se elevan y muestran una barra roja lateral. |
| **Galería** | Mosaico con un bloque grande. Al hacer clic en una foto se abre en pantalla completa. |
| **Contacto** | Sección roja con el teléfono en grande, datos en una tarjeta y enlaces a redes. |

### Animaciones

Todo está hecho con CSS y un poco de JavaScript, sin librerías externas.

- **Entrada al hacer scroll:** clases `.reveal`, `.reveal-l` y `.reveal-s` aparecen con `IntersectionObserver`.
  El retraso entre elementos se controla con la variable `--d` (por ejemplo `style="--d:.2s"`).
- **Contadores:** los valores con `data-count` se animan con `requestAnimationFrame`.
- **Header:** pasa de transparente a translúcido con blur al hacer scroll.
- **Galería:** zoom suave de la foto y un botón "+" que aparece al pasar el mouse.
- **Accesibilidad:** con `prefers-reduced-motion` se desactivan las animaciones.

## Cómo editar

El contenido está en `index.html` y los estilos en `css/styles.css`. Buscá la sección por su `id`:

| Qué cambiar | Dónde buscar |
| --- | --- |
| Título del hero y texto | `index.html`, `<div class="hero">` |
| Cifras de "Estadísticas" | `index.html`, `<div class="stats">`; para animar el conteo, `data-count="3000"` |
| Texto de "Nosotros" | `index.html`, `<section id="nosotros">` |
| Integrantes del equipo | `index.html`, `<section id="equipo">`; cada `<article class="member">` es una persona |
| Horarios | `index.html`, `<section id="horarios">`; cada `<div class="sched">` es una tarjeta de días |
| Fotos de la galería | `index.html`, `<section id="galeria">`; cada `<figure>` es una foto |
| Teléfono, dirección, horarios de contacto | `index.html`, `<section id="contacto">` |
| Botones de redes | `index.html`, `<div class="socials">`; estilos en `.social-btn` de `css/styles.css` |
| Colores | `css/styles.css`, variables en `:root` (sección 1) |
| Fuentes | Línea `<link href="https://fonts.googleapis.com/...">` en el `<head>` de `index.html`, y las `font-family` en `css/styles.css` |
| Comportamiento (menú, contadores, visor) | `js/main.js` |

### Horarios: cómo se arma una tarjeta

- Varios horarios en un mismo día: usá dos `<div class="slot">` dentro de `<div class="slots">`.
- Un solo horario: agregá la clase `single` a `<div class="slots">`. El horario se muestra en grande y ocupa la tarjeta completa, para que las tres tarjetas queden parejas.
- Las tres tarjetas usan la misma altura (grid), así que no hace falta tocar el CSS al agregar o quitar horarios.

### Agregar o cambiar una foto de la galería

1. Copiá la imagen en `assets/galeria/` (formato `.webp` o `.jpg`, idealmente de 1000 a 1600 px de ancho).
2. En `index.html`, dentro de `<div class="gallery">`, agregá o cambiá un `<figure>`:

```html
<figure class="reveal-s"><img src="assets/galeria/nombre.webp" alt="Descripción de la foto" loading="lazy"></figure>
```

3. El primer `<figure>` es el bloque grande (ocupa 2×2). Si querés otro bloque grande, mové la regla `nth-child(1)` en el CSS.

### Agregar un integrante

Copiá un `<article class="member">` completo y cambiá la foto, el `alt`, el cargo (`.role`) y el nombre (`h3`).
Para fotos de retrato, lo mejor es una imagen vertical con el rostro en la parte superior.

### Cambiar el color del acento

En `css/styles.css`, dentro de `:root`, cambiá `--red` (y `--red-glow`, que es su versión translúcida). Todo el sitio se actualiza.

## Responsive

Breakpoints principales (en `index.html`):

- **1040 px:** equipo a 2 columnas y galería a 2 columnas.
- **900 px:** menú hamburguesa, columnas únicas en "Nosotros" y "Contacto".
- **600 px:** ajustes finos de tipografía, galería de una columna y botones a todo el ancho.

## Publicar en GitHub Pages

1. En el repo: **Settings → Pages**.
2. En *Source* elegí **Deploy from a branch**, rama `main`, carpeta `/ (root)`.
3. La página queda disponible en `https://manu-alz.github.io/Judokan/` (puede tardar un par de minutos).

## Créditos de imágenes

- Fotos de `assets/jk_*`: judokan.uy (club).
- Fotos de `assets/galeria/`: Instagram de @judokan.uy.
