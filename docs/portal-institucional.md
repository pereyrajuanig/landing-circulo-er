# Portal institucional · diseño aprobado

02/11/2026. El usuario aprobó el diseño actual y autorizó preparar el PR y publicar en Vercel. PR de la rama: https://github.com/pereyrajuanig/landing-circulo-er/pull/14. Quality y el despliegue se verifican sobre el commit final antes de dar la publicación por completada.

## Identidad y composición

El Inicio aprobado es la referencia: escudo íntegro, Libre Caslon Display y DM Sans locales, azul marino, marfil y acentos celestes. Navegación lateral en escritorio; cabecera y menú desplegable hasta 1100 px. No se agregan librerías ni fuentes.

- Inicio: ilustraciones patrimoniales de Diamante, Concordia, Concepción del Uruguay y Colón. Mensaje estable y cambio cada 8 segundos. Flechas, selectores y pausa; sin anuncios automáticos. Foco, hover, visibilidad y movimiento reducido controlan el automatismo.
- Beneficios: cinco áreas desde la colección; salud destacada y categorías editoriales. Las fichas mantienen condiciones, detalles y consulta.
- Alojamientos: ocho destinos. En Inicio se recorren manualmente con swipe, flechas y teclado; no hay autoplay. Fotografías propias primero, imágenes de referencia identificadas. Índice completo, galerías ampliables y consulta visible en móvil.
- Salones: dossiers alternados con fotos reales, características desplegables y consulta específica. Los Laureles mantiene la ambigüedad de 30/50 personas; Diamante no muestra una fotografía de otro espacio.
- Filiales: directorio de 24 localidades con búsqueda normalizada y contacto a través de la sede. Fotografías solo cuando hay material de esa filial; el patrimonio no se presenta como instalación.
- Institución: fecha fundacional del 21/09/1975, propósito y contadores obtenidos de las colecciones. No se inventan hitos intermedios.
- Novedades: una publicación principal y secundarias; fecha de publicación diferenciada de los hechos, búsqueda y categorías. Se excluyen borradores y publicaciones futuras.
- Contacto: sede, filiales y consultas generales. Formulario corto que prepara un mailto codificado, sin guardar ni enviar desde el sitio. Valida nombre, email, tema y mensaje; respaldo sin JavaScript. No hay backend de formularios.

El usuario pidió retirar tanto el selector de comparación como la página anterior: /diseno-anterior/ debe responder 404. No se publica una segunda versión del diseño.

## Archivos y mantenimiento

Componentes del sistema en src/components/portal/, estilos delimitados por .portal-system en src/styles/portal-system.css e interacciones en src/scripts/portal.ts. Hero.astro y hero-cities.css conservan la composición aprobada. SitePage.astro aplica la navegación y la presentación editorial a las rutas existentes. LineIcon conserva un solo lenguaje de trazo.

SitePhoto permite declarar sizes según la composición. Astro genera WebP con dimensiones y srcset; las fotografías inferiores y del carrusel de alojamientos conservan loading=lazy. Las galerías mantienen la fotografía completa y el retorno de foco. El fondo del Inicio se anticipa para la rotación; no implica precargar todos los alojamientos.

Las cuatro ilustraciones fueron aportadas por el usuario en images_background. Las copias utilizadas se versionan en src/assets/cities; el registro portal-art-sources.json contiene procedencia y SHA256. No se incluyen en Git los originales duplicados, output/ ni el lockfile ajeno de pnpm.

## Verificación y publicación

Revisión visual local en 1440, 1024, 768, 390 y 320 px, sin desbordes en las nueve rutas principales revisadas. Galería, filtros, directorio, teclado y formulario revisados; no equivale a una auditoría WCAG. npm run check y build aprobados durante la iteración. Pruebas de regresión actualizadas a los flujos aprobados: 14 Node y 40 Chromium por modo CSP (Report-Only y exigida), más fixture editorial aislada. El resultado definitivo se consulta en el check quality del PR.

Publicación mediante squash merge del PR con quality aprobado; main dispara Vercel. Se comprueba el despliegue y la URL pública después del merge. La recuperación se realiza mediante rollback de Vercel o un revert por PR, sin reescribir historial.

## Pendientes externos

El usuario confirmó circulopoliciaer.com.ar, registrado en NIC Argentina. Aún deben configurarse en Vercel/DNS y verificarse HTTPS, canonical y sitemap del dominio. No se activa indexación hasta completar esa configuración. Continúan pendientes las condiciones institucionales variables, privacidad, lector real, CMS y Facebook. La aceptación del diseño no certifica esos datos o integraciones.
