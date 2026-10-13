# Sistema de diseño · 1.4

La base institucional fue aceptada el 9/10/2026. El 11/10/2026 se solicitó mayor calidez y acompañamiento. Esta versión documenta la implementación de esa revisión; su aceptación visual final continúa pendiente. El 12/10/2026 se migró la implementación a Astro conservando el diseño.

## Dirección

Tradición, pertenencia y utilidad, con una bienvenida centrada en la persona. Portada «Tu historia nos une. Seguimos a tu lado»; acción principal «Hablemos» hacia contacto. Franja «Te escuchamos / Te acompañamos / Nos encontramos».

## Colores vigentes

| Token          | Valor     | Uso                            |
| -------------- | --------- | ------------------------------ |
| `--navy`       | `#092B48` | Identidad, botones y selección |
| `--navy-deep`  | `#062139` | Franja superior y pie          |
| `--gold`       | `#D2B16A` | Accentos y botón principal     |
| `--cream`      | `#F3EEE4` | Portada y superficies cálidas  |
| `--paper`      | `#FCFAF5` | Fondo base                     |
| `--ink`        | `#143049` | Texto principal                |
| `--muted`      | `#56656C` | Texto secundario               |
| `--line`       | `#DFD8CB` | Separadores                    |
| `--gold-ink`   | `#826329` | Énfasis legible sobre claros   |
| `--warm-panel` | `#EEE7DA` | Filiales                       |

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

Texto alternativo, idioma `es-AR`, skip-link, foco visible, regiones ARIA y movimiento reducido. No se declara conformidad WCAG completa. Revisar teclado, lector de pantalla, zoom, reflujo, tamaños táctiles y combinaciones de colores.

Usar voseo respetuoso y lenguaje concreto. No presentar frases editoriales como citas del estatuto. Las imágenes futuras deben ser reales, autorizadas y no confundirse con registros institucionales si son ilustrativas.

La versión 1.3 alinea los controles técnicos con la etapa 01: tipos, lint, formato y CI independientes. Conserva los tokens, los componentes visuales y el contenido.

La versión 1.4 conserva la composición por decisión del usuario y mejora lectura, áreas de interacción, contenido extenso y foco de navegación. Variables: --font-label (12px), --font-secondary (14px), --font-control (16px), --font-brand-detail (10px), --target-size (44px), --radius-control (8px), --radius-item (12px), --radius-panel (16px), --section-space (87px; 65px hasta 800px) y --focus (#A37923).

El foco del selector usa separación interior de -5px; los títulos enfocados al navegar usan 6px exterior. Menú con scroll en pantallas bajas. Correo con oportunidad de salto antes de @. Se verificaron siete tamaños, 320px de reflujo y textos extensos; zoom de navegador al 200 % confirmado manualmente por el usuario. La aceptación visual final sigue pendiente. Ver [etapa 02](stage-02-design-ux.md).
