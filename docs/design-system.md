# Sistema de diseño · 1.16

La base institucional fue aceptada el 9/10/2026. El 11/10/2026 se solicitó mayor calidez y acompañamiento. Esta versión documenta la implementación de esa revisión; su aceptación visual final continúa pendiente. El 12/10/2026 se migró la implementación a Astro conservando el diseño.

## Dirección

Tradición, pertenencia y utilidad, con una bienvenida centrada en la persona. Portada «Tu historia nos une. Seguimos a tu lado»; acción principal «Hablemos» hacia contacto. Franja «Te escuchamos / Te acompañamos / Nos encontramos».

## Colores vigentes

| Token              | Valor     | Uso                            |
| ------------------ | --------- | ------------------------------ |
| `--navy`           | `#092B48` | Identidad, botones y selección |
| `--navy-deep`      | `#062139` | Franja superior y pie          |
| `--gold`           | `#D2B16A` | Accentos y botón principal     |
| `--cream`          | `#F3EEE4` | Portada y superficies cálidas  |
| `--paper`          | `#FCFAF5` | Fondo base                     |
| `--ink`            | `#143049` | Texto principal                |
| `--muted`          | `#56656C` | Texto secundario               |
| `--line`           | `#DFD8CB` | Separadores                    |
| `--gold-ink`       | `#826329` | Énfasis legible sobre claros   |
| `--control-border` | `#826E48` | Borde de buscador y Menú       |
| `--warm-panel`     | `#EEE7DA` | Filiales                       |

Valores efectivos: `src/styles/warmth.css` redefine parte de `:root` de `src/styles/styles.css`. Servicios usa `#F0EDE6`, comunidad `#E7DBC5`, panel de alojamiento `#FFFDF9` y escudo `#FAF6EE`.

## Tipografías y espacio

Libre Caslon Display regular para títulos; DM Sans para lectura y controles. El navegador sintetiza la cursiva de Caslon. Cuerpo base 16px; descripciones principales 16-17px; botones y controles 16px. Rótulos de sección 12px, auxiliares 14px y detalle de marca 10px. Controles, enlaces de consulta y navegación del menú con altura mínima de 44px. Botón principal actual: 56px de alto.

Contenedor máximo 1240px. Secciones: 87px verticales en escritorio y 65px hasta 800px. Portada: columnas 1.4fr / 1fr, gap 65px. Márgenes: 48px base, 30px hasta 1050, 22px hasta 800 y 18px hasta 420.

## Formas y adaptación

Botones con radio 8px y altura mínima 54px. Escudo contenido en un arco `180px 180px 28px 28px`; la imagen del inicio usa mezcla normal, conserva colores y proporción. Filiales: superficie clara; sede con radio 12px. Alojamiento y contacto: radio 16px.

Hasta 800px: columnas principales apiladas, menú desplegable, franja de acompañamiento vertical y selector de alojamientos de tres columnas. Hasta 420px: selector de dos columnas, título 45px y botón de inicio a ancho completo.

## Componentes y estados

Consultar el [manual visual](design-system.pdf) para medidas y muestras. Se preservan los comportamientos descritos en [arquitectura](architecture.md). Hover, foco, selección y movimiento reducido están implementados. No hay estados de envío, carga, error de reserva ni confirmaciones automáticas.

## Accesibilidad y contenido

Texto alternativo, idioma `es-AR`, skip-link, foco visible, regiones ARIA y movimiento reducido. No se declara conformidad WCAG completa. Teclado, foco, reflujo y contrastes revisados en etapa 03. Lector de pantalla real pendiente por decisión del usuario; zoom 200 % confirmado manualmente en etapa 02.

Usar voseo respetuoso y lenguaje concreto. No presentar frases editoriales como citas del estatuto. Las imágenes futuras deben ser reales, autorizadas y no confundirse con registros institucionales si son ilustrativas.

La versión 1.3 alinea los controles técnicos con la etapa 01: tipos, lint, formato y CI independientes. Conserva los tokens, los componentes visuales y el contenido.

La versión 1.4 conserva la composición por decisión del usuario y mejora lectura, áreas de interacción, contenido extenso y foco de navegación. Variables: --font-label (12px), --font-secondary (14px), --font-control (16px), --font-brand-detail (10px), --target-size (44px), --radius-control (8px), --radius-item (12px), --radius-panel (16px), --section-space (87px; 65px hasta 800px) y --focus (#A37923).

El foco del selector usa separación interior de -5px; los títulos enfocados al navegar usan 6px exterior. Menú con scroll en pantallas bajas. Correo con oportunidad de salto antes de @. Se verificaron siete tamaños, 320px de reflujo y textos extensos; zoom de navegador al 200 % confirmado manualmente por el usuario. La aceptación visual final sigue pendiente. Ver [etapa 02](stage-02-design-ux.md).

La versión 1.5 incorpora --control-border (#826E48), salto con foco en main, cierre del menú al salir por Tab y gestión de foco al cambiar el ancho. Estado del filtro explícito y relaciones del selector con su panel; nombre íntegro del correo. Composición, escudo y contenido conservados. Ver [etapa 03 y límites](stage-03-accessibility.md).

La versión 1.6 documenta los flujos automatizados en Chromium y la recuperación de foco cuando el botón Menú se oculta al ampliar la pantalla. Mantiene composición y tokens. Guía: [pruebas](testing.md); evidencia: [etapa 04](stage-04-testing.md).

La versión 1.7 registra la tarjeta social de 1200 × 630 con escudo, marfil, azul y dorado, y la 404 cálida con regreso al inicio. SEO preparado; dominio y publicación pendientes. Ver [SEO](seo.md).

La versión 1.8 conserva identidad y composición: escudo WebP por tamaño, favicon reducido, dos fuentes WOFF2 locales con preload y swap. Comparación y límites: [rendimiento](stage-06-performance.md).

La versión1.9 documenta seguridad preparada,51 comprobaciones y límites de hosting. No cambia composición ni tokens; CSP Report-Only en Vercel, exigida solo en pruebas locales. Ver [seguridad](security-privacy.md).

Versión1.10: publicación para revisión autorizada en https://landing-circulo-er.vercel.app/, con noindex. Contenido y secciones diferidos por el usuario; dominio pendiente. Registro: vercel-preview.md.

Revisión29/10/2026: beneficios, alojamientos y salones ganan prioridad; destinatarios aclarados por el usuario. Propuesta pendiente de aceptación visual. Ver design-benefits-spaces.md y addendum del manual PDF página23.

## Versión1.12 · sitio institucional

Addendum en página24 del manual: layout interior, ubicación, navegación entre páginas, fichas de beneficios y alojamientos, FAQ y sección de noticias/logros. Actualiza el recorrido de las referencias anteriores. Mantiene escudo, tipografías, paleta y tono. Base editorial preparada; CMS y Facebook pendientes. Ver [evolución y mapa](site-evolution.md).

## Versión1.13 · antecedente sustituido

Página25 del manual: propuesta con cuatro imágenes ficticias solicitadas por el usuario. Portada fotográfica, imágenes en alojamientos y salones y galería ampliable, manteniendo escudo y paleta. Avisos visibles y alt que explicitan su carácter ilustrativo. Esta revisión actualiza las referencias anteriores que indicaban ausencia de imágenes de muestra. Ver photo-preview.md.

## Versión1.14 · fotografías de internet

Página26 del manual sustituye la propuesta de página 25:12 fotos de Pexels distribuidas por 18 páginas públicas y 404, avisos y créditos. ReferencePhoto y PhotoGallery comparten epígrafes y fuentes; la galería cambia también el crédito. Fuentes locales WebP; paleta, tipografías y escudo conservados. Ver [propuesta vigente](photo-preview.md) y [registro de fuentes](photo-sources.json).

## Versión1.15 · material institucional

Página27 del manual actualiza imágenes y profundidad del contenido. SitePhoto distingue archivo institucional y referencias; PhotoGallery admite una o varias imágenes. La navegación conserva sus secciones; beneficios, alojamientos y salones ganan detalle. Nuevos componentes SpaceCatalog y BranchHighlights; reseñas con origen y fecha de publicación diferenciada de los hechos. Ver institutional-content.md.

## Versión1.16 · recorrido de ciudades

Página 28 del manual incorpora el carrusel de portada, con mensaje estable y foto/grabado/localidad sincronizados. Automatismo de 8 segundos y controles de pausa; movimiento reducido y teclado. No se incorporan textos de campaña. Ver city-carousel.md.

## Versión1.17 · fotografías y fondo completo

Página28 revisada: solo fotografías, sin flechas, selector, contador o título de ciudad. Epígrafes accesibles y pausa revelada al foco. Grabado a tamaño de sección, suave y con velo marfil; desaparece la franja inferior reservada. Manual28 páginas; checklist1.15 conserva23 páginas y145 campos.
