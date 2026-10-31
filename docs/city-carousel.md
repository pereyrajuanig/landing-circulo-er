# Portada con fotografías y fondo patrimonial

30/10/2026 · Rama codex/portada-carrusel-ciudades · PR #14 en revisión, sin merge autorizado.

## Decisión del usuario

Después de aplicar el recorrido automático, el usuario pidió retirar los botones y mostrar solo fotos, con la ilustración como fondo de toda la sección. La portada mantiene su mensaje y accesos; Concordia, Federación y Federal alternan fotografía y grabado correspondientes cada 8 segundos.

## Composición

Se retiran flechas, selectores, contador y títulos de ciudad. El epígrafe y crédito institucional siguen disponibles para tecnologías de apoyo; el bloque visual muestra exclusivamente la foto. El control Pausar/Iniciar está fuera de la composición habitual y aparece únicamente al recibir foco de teclado, sobre la foto. Mantiene un mecanismo de detención sin añadir controles visibles a la vista normal.

El grabado usa una capa absoluta con inset:0 y altura/ancho de la sección, object-fit:cover y mezcla multiply. Ya no existe franja inferior ni espacio reservado para ella. La capa marfil permite leer el contenido; opacidad 0.22 en escritorio y 0.17 en móvil. El recorte varía según la relación de aspecto: la ilustración funciona como fondo, no como una lámina que deba verse completa. Texto, escudo, paleta y tipografías se preservan.

## Origen

Fotos del archivo ya incorporado: encuentro social en Concordia, taller en Federación y actividad sociocultural en Federal. Los grabados corresponden a cada ciudad y son paisaje o patrimonio decorativo, no instalaciones del Círculo. city-art-sources.json registra franjas recortadas, coordenadas y SHA256. No se generan imágenes ni se publican piezas completas, candidaturas, listas o fechas electorales. Imágenes WebP locales adaptables.

## Funcionamiento

- Inicio automático cada 8000ms, definido en CITY_ROTATION_MS de src/lib/hero-cities.ts.
- Un único control accesible de Pausar/Iniciar, visible solo al foco; sin flechas, contador ni elección manual de ciudad.
- El foco detiene el automático sin reanudación implícita. Enter permite iniciarlo o detenerlo explícitamente.
- Hover pausa temporalmente; salir continúa solo si no existe pausa voluntaria. Fuera de pantalla o con pestaña oculta se suspende; al volver espera un intervalo completo.
- Movimiento reducido impide el inicio automático; se puede iniciar mediante el control accesible. Sin transiciones animadas.
- Los cambios automáticos no generan anuncios continuos ni mueven el foco.
- Sin JavaScript se conserva Concordia, foto, fondo y accesos; el control inoperante permanece oculto.
- Recursos locales anticipados para evitar un cuadro vacío al avanzar. Sin almacenamiento, API, paquetes o conexiones nuevas.

Referencia de comportamiento: [WAI APG, Carousel Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/). No se declara conformidad WCAG; lector real pendiente.

## Implementación y mantenimiento

Hero.astro mantiene texto y capas decorativas; CityCarousel.astro renderiza fotos y control accesible. hero-cities.ts relaciona foto, ciudad y grabado. city-carousel.ts administra índice, timeout y condiciones de pausa; hero-cities.css resuelve fondo completo y lectura. No asociar fotografías o monumentos de otra localidad. Para añadir una ciudad, registrar procedencia y comprobar recortes, lectura, automatismo y fallback.

Se actualizan solo hashes revisados de la CSP, sin ampliar permisos. Alojamientos, salones, noticias y prestaciones no se alteran.

## Validación y estado

Tres casos por dispositivo y modo CSP: automático, sincronización, pausa por foco/hover/visibilidad, control accesible, movimiento reducido y respaldo sin JS. Configuración total: 14 Node +36 Chromium Report-Only +36 exigida (86 ejecuciones), más fixture editorial aislada. Se comprueba que no existan selectores, flechas ni contador.

Matriz de 3 ciudades ×6 anchos en city-carousel-evidence.json: sin desbordes, fondo a tamaño de sección y control fuera de la composición habitual. Capturas revisadas en docs/media/carrusel-*.png. Resultado final de suite y CI en el PR.

Manual 1.17 (28 páginas) y checklist 1.15 (23 páginas,145 campos), conservando estados y campos históricos. Aceptación y merge pendientes. CMS, Facebook, dominio, privacidad, lector y contenido variable continúan pendientes.
