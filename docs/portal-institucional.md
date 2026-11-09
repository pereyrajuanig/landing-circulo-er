# Portal institucional · diseño aprobado

Actualización 03/11/2026. El portal base se publicó mediante el PR #14. El usuario aprobó publicar la iteración local de carrusel, dorado, accesos, prioridad de beneficios y alojamientos. Quality y el despliegue se verifican sobre el commit final antes de dar esta publicación por completada.

## Identidad y composición

El Inicio aprobado es la referencia: escudo íntegro, Libre Caslon Display y DM Sans locales, azul marino y marfil, con dorado en el botón principal del inicio, su subrayado, etiquetas, líneas, bordes de botones y detalles de navegación activa. El dorado oscuro se reserva para texto sobre fondos claros y el dorado claro para detalles sobre azul marino. Los accesos de `portal-feature-bar` resaltan individualmente al pasar el cursor o recibir foco de teclado, con fondo dorado suave, icono dorado y una línea inferior; el movimiento de 2 px se omite con movimiento reducido. Navegación lateral en escritorio; cabecera y menú desplegable hasta 1100 px. No se agregan librerías ni fuentes.

- Inicio: ilustraciones patrimoniales de Diamante, Concordia, Concepción del Uruguay y Colón. Mensaje estable y cambio automático cada 3 segundos, sin flechas ni selectores. Pausa/reanudación accesible al foco de teclado, sin anuncios automáticos. Foco y visibilidad controlan el automatismo; el cursor sobre la portada no lo detiene. Las ilustraciones entran con desplazamiento lateral de 32 px y fundido de 850 ms, con el texto estable. Por pedido del usuario, la transición también se mantiene con movimiento reducido; el scroll conserva esa preferencia.
- Beneficios: primera sección después del Inicio y sus accesos rápidos. Título principal ampliado, salud en un bloque destacado a todo el ancho y cuatro categorías en dos columnas. Cada área conserva su descripción completa y muestra tres detalles desplegables tomados de la colección, además de su enlace de información y consulta. Localidades se ubica después de esta sección y conserva el recorrido horizontal. Las fichas mantienen condiciones, detalles y consulta.
- Alojamientos: ocho destinos. En Inicio se recorren manualmente con swipe, flechas y teclado; las tarjetas tienen fotografías más amplias, resumen del alojamiento, ubicación y consulta directa por destino. El catálogo agrega características y condiciones desplegables. Las fichas presentan ubicación separada, galerías ampliables de mayor tamaño y consulta destacada en dorado. Fotografías propias primero e imágenes de referencia identificadas; no se inventan equipamiento, direcciones ni disponibilidad. Consulta visible en móvil.
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

El dominio público es https://www.circulopoliciaer.com.ar/, con redirección desde el dominio raíz, HTTPS e indexación habilitada. El sitemap contiene 24 páginas y Google Search Console lo procesó correctamente; esto no acredita que las 24 estén indexadas. La propiedad de Search Console está verificada provisionalmente con la cuenta del desarrollador y debe incorporarse la institución. Continúan pendientes la revisión de salones, las condiciones institucionales variables, las fotografías faltantes, privacidad, lector real, CMS y Facebook. La aceptación del diseño no certifica esos datos o integraciones.

## Cabecera ilustrada de Alojamientos — 6/11/2026

Cabecera aprobada visualmente por el usuario, aplicada solo en /alojamientos/. Publicación autorizada el 6/11/2026. Se utiliza la ilustración elegida y entregada por el usuario, Entre Ríos Engraved Heritage Panorama.png, de 2172 × 724 píxeles. El original de Downloads permanece intacto; la copia de trabajo está en src/assets/headers/entre-rios-heritage-panorama.png. Astro genera WebP responsive; el PNG no se sirve directamente.

El texto se conserva en blanco/marfil sobre azul. En escritorio, el grabado se usa como fondo y se protege la columna de lectura con una capa azul uniforme y una línea dorada fina, sin degradados. En tablet y móvil, el texto se presenta sobre azul liso y el arte queda debajo, con encuadre hacia la derecha para conservar la silueta ilustrada. Se mantienen las fuentes, el CTA Ver destinos, los acentos rojos y el catálogo.

La silueta de Entre Ríos en esta imagen es un recurso artístico decorativo, no cartografía ni ubicación de sedes: no se colocan marcadores sobre ella. MapaFiliales.astro y sus coordenadas oficiales permanecen intactos. El arte tiene alt vacío y contenedor aria-hidden. No se presenta como fotografía de instalaciones ni atribuye prestaciones o alojamiento a los edificios ilustrados.

Solo Alojamientos usa esta variante mediante el slot intro de SitePage.astro. Las otras cabeceras, fichas, galerías, metadatos y funcionalidades se conservan. No se agregan librerías, animaciones, scripts ni llamadas externas. Fuentes e imágenes del Home permanecen intactas.

Validación: tipos y lint sin errores; formato del cambio, build, seguridad, 24 pruebas Node y 47 Chromium por cada modo CSP aprobados (un caso desktop/tablet del mapa no aplicable a móvil por modo). Revisión visual y CTA por teclado a 1440/820/390/320 px: sin desbordes ni errores JS. La imagen servida en las mediciones a DPR 1 pesó 129.958 bytes en escritorio y 62.816 en tablet/móvil, frente a 2.445.712 bytes del PNG original; el navegador puede elegir otro tamaño según pantalla y densidad. Comparación de cuerpos HTML: solo cambia alojamientos/index.html. El usuario aprobó el diseño y autorizó publicar el 6/11/2026. El resultado de CI y del despliegue se registra en el PR de esta rama.

## Cabecera ilustrada de Beneficios — 7/11/2026

Muestra local de /beneficios/ con Engraved Medical Office and Pharmacy.png, seleccionada por el usuario en reemplazo de la primera versión y copiada a src/assets/headers/beneficios-consultorio-grabado.png. El original se conserva intacto y Astro genera WebP responsive. El dibujo es decorativo: no se presenta como fotografía de consultorios reales ni agrega prestaciones al contenido institucional.

PageIntro.astro admite artSide: left para colocar la ilustración a la izquierda y proteger la columna de texto a la derecha, incluida la navegación superior. En móvil se conserva el texto sobre azul y el dibujo se muestra debajo con encuadre hacia la izquierda. No se espeja la imagen. El valor predeterminado right conserva Alojamientos. Tipografías, metadatos, servicios y fichas permanecen; Explorar beneficios lleva a #servicios. Sin scripts ni dependencias nuevas. Publicación autorizada el 9/11/2026. El PR registra CI y despliegue.

Validación de Beneficios: tipos y lint sin errores, formato del cambio y build aprobados; 24 pruebas Node y 47 Chromium por modo CSP aprobados (un caso desktop/tablet del mapa omitido en móvil por modo). Revisión a 1440/820/390/320 px sin desbordes ni errores JS, con CTA por teclado. Solo cambia el cuerpo HTML de beneficios/index.html; Alojamientos permanece intacto. Publicación autorizada el 9/11/2026. El PR registra CI y despliegue.

Actualización de la ilustración de Beneficios: se sustituyó únicamente el recurso de imagen por la segunda versión entregada por el usuario. Composición, textos y enlaces conservados. El build y la revisión visual se comprueban nuevamente para el recurso actualizado; las pruebas funcionales anteriores corresponden a la misma implementación de cabecera.

## Cabecera ilustrada de Salones — 7/11/2026

Muestra local de /salones/ con Engraved Garden Banquet Hall Panorama.png, entregada por el usuario y copiada a src/assets/headers/salones-jardin-grabado.png. Se conserva el archivo original. La imagen es decorativa: no sustituye las fotografías reales ni atribuye capacidades o equipamiento a un salón particular.

Se reutiliza PageIntro.astro con texto blanco a la izquierda y grabado visible a la derecha; en móvil el arte queda debajo del texto. Ver salones lleva a #eventos. Se conservan las fuentes, metadatos, galerías, capacidades, condiciones y preguntas frecuentes. El componente limita los tamaños WebP a la resolución original para evitar ampliar esta imagen de 1916 píxeles. Alojamientos y Beneficios mantienen sus variantes. Sin scripts ni dependencias nuevas; publicación autorizada el 9/11/2026.

Validación de Salones: tipos, lint, formato del cambio y build aprobados; 24 pruebas Node y 47 Chromium por modo CSP aprobados (un caso desktop/tablet del mapa no aplicable a móvil por modo). Revisión a 1440/820/390/320 px sin desbordes ni errores JavaScript; CTA por teclado correcto. Comparación de cuerpos HTML respecto de la etapa anterior: solo cambia salones/index.html. Publicación autorizada el 9/11/2026. El PR registra CI y despliegue.
