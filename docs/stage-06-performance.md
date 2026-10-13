# Etapa 06: rendimiento

Corte: 13/10/2026. Base main 5bf1798 (PR #7 integrado y quality de main 38465530841 aprobado). Código optimizado 3927479. Dominio y despliegue siguen pendientes.

## Método y límites

Build estático servido en loopback por Astro preview, Windows, Node 24.20.0 y Chromium 156. Caché HTTP desactivada y contexto nuevo por ejecución. Tres muestras por escenario y lote; mismo proceso Chromium por lote, sin reiniciar DNS/TLS. Escritorio 1440x900 DPR1 sin throttling. Móvil 390x844 DPR1 emulado, CPU 4x, latencia 150ms, descarga 200000 B/s y subida 93750 B/s.

PerformanceObserver de LCP, CLS por ventanas de sesión y Event Timing con umbral 16ms. Se observa networkidle, fuentes listas y 1500ms antes de interactuar. Después se ejecutan menú móvil, enlace Filiales, llenado/borrado del filtro y cambio de alojamiento; 300ms de observación adicional. No Lighthouse, puntuación ni certificación Core Web Vitals. INP real y p75 de visitantes pendientes de publicación y datos de campo. Loopback no mide CDN, TTFB de hosting ni dispositivos físicos. Variaciones del sistema y conexiones remotas afectan los resultados; tres muestras no son un estudio estadístico.

## Resultados completos de carga

| Escenario     | LCP antes, ms      | LCP después, ms    | Mediana antes → después | CLS antes → después |
| ------------- | ------------------ | ------------------ | ----------------------- | ------------------- |
| Escritorio    | 3100 / 316 / 324   | 160 / 148 / 140    | 324 → 148 ms            | 0,00147 → 0         |
| Móvil emulado | 1424 / 1356 / 1376 | 1300 / 1292 / 1340 | 1376 → 1300 ms          | 0 → 0               |

El primer acceso de escritorio antes fue un valor alto, conservado en la evidencia. El LCP observado fue H1#hero-title en ambos tamaños, no el escudo. El máximo de duración de eventos muestreados fue 32ms antes y después en escritorio, y 24 → 32ms en móvil. Las muestras incluyen tareas largas durante carga/decodificación; no se afirma que toda métrica haya mejorado. Estas duraciones de eventos no son INP real ni abarcan todas las interacciones. Cero solicitudes fallidas en los lotes.

## Cambios justificados

- Astro genera WebP con quality=100 y tamaños adecuados para cada uso del escudo, manteniendo el PNG fuente de 348751 B. En DPR1 el navegador seleccionó 3404 B para cabecera y 20878 B para portada: 24282 B combinados frente al PNG único de 348751 B. Existen variantes mayores para mayor densidad. Favicon PNG reducido a 64px; pie diferido, imágenes iniciales eager, dimensiones conservadas. El título LCP no se difiere.
- DM Sans variable y Libre Caslon Display pasan a WOFF2 locales: 70244 y 29640 B. Preload, font-display:swap, mismas familias, pesos usados y fallback. Licencias OFL incluidas; acentos y signos españoles verificados. Cobertura Latin/Latin extendido y puntuación; futuras escrituras fuera de ese rango requieren ampliar subconjunto.
- Se elimina @import de Google Fonts y su dependencia de conexión externa. La composición, textos, colores y escudo fuente permanecen. Capturas revisadas en escritorio y móvil con fuentes cargadas.
- CSS: 26166 → 26346 B sin comprimir, 6070 → 6065 B gzip. No se justifica un refactor de la cascada por esta diferencia. JavaScript de interacción sin cambios: módulo inline final 2545 B / 1107 B gzip. No nuevas dependencias npm ni código de medición en la web.

## Repetir y mantener

npm run perf construye y mide tres muestras por escenario; salida ignorada en tmp/performance. Para etiquetar: npm run perf -- etiqueta. Se abre preview propio en 4176 y se cierra al terminar; cerrar otro preview del mismo checkout previamente. No usar esta emulación como hosting. tools/performance/measure.mjs usa la dependencia de desarrollo Playwright existente.

Las fuentes se regeneran con tools/performance/build_fonts.py y las dependencias opcionales de requirements-fonts.txt en un entorno Python separado. Los TTF originales y licencias están en tools/docs/fonts/. No son dependencias del build de la web.

Fotos reales futuras: conservar archivo fuente, generar tamaños/formato con Astro, width/height, carga diferida fuera del inicio y medición del LCP real antes de decidir prioridad. No hay fotos incorporadas en esta etapa.

## Validación y siguientes comprobaciones

Astro check: 26 archivos sin diagnósticos; lint y formato; build y 26 pruebas aprobadas (10 Node + 16 Chromium). MIME WebP/WOFF2 verificados; los flujos ahora esperan y verifican las dos fuentes locales cargadas. Texto/anclas, teclado, filtro, alojamiento, 404 y reflujo conservados. Las siete tareas tienen evidencia de laboratorio; rendimiento de campo y nuevos recursos se revisarán después de publicar. Lector real 03.06 y cierre público de SEO siguen pendientes.

Datos completos: stage-06-evidence.json. Capturas: media/etapa06-desktop.png y media/etapa06-mobile.png.

Referencias: [LCP](https://web.dev/articles/lcp), [INP y laboratorio/campo](https://web.dev/articles/inp), [imágenes Astro](https://docs.astro.build/en/guides/images/). Consultadas el 13/10/2026.

Código3927479: [quality aprobado](https://github.com/pereyrajuanig/landing-circulo-er/actions/runs/38477982674). La comprobación de CI incluye SEO de producción/preview de prueba y las 26 pruebas; no ejecuta umbrales de rendimiento local ni declara datos de campo.
