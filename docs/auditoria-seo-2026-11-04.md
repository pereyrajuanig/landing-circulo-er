# Auditoría y mejora SEO técnica · Círculo Policía de Entre Ríos

**Fecha:** 4 de noviembre de 2026, Argentina.

**Dominio oficial:** https://www.circulopoliciaer.com.ar/

**Base auditada:** `main` en `7340513`. **Implementación local:** rama `codex/seo-tecnico`.

## 1. Estado inicial comprobado

El sitio institucional usa Astro, TypeScript y compilación estática en Vercel. Las secciones se generan a partir de colecciones. Novedades admite una fuente Sanity en producción y un conjunto local para desarrollo. El HTML contiene el contenido principal y los enlaces antes de que se ejecute JavaScript.

| Área                        | Evidencia del dominio público                                                                                                                                                                                                                                      |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Descubrimiento              | `robots.txt` responde 200, permite el rastreo y anuncia `/sitemap.xml`. El XML existente contiene 36 URLs, todas con HTTP 200. Distribución: Inicio 1, Institución 1, Beneficios 6, Alojamientos 9, Salones 1, Filiales 12, Novedades 5 y Contacto 1.              |
| Indexabilidad técnica       | Las 36 URLs tienen `index, follow` y canonical absoluto autorreferente con `www`. No se observó un encabezado `X-Robots-Tag` restrictivo en ellas. Esto describe las respuestas HTTP y HTML, no el estado en el índice de Google.                                  |
| Títulos y estructura        | 36 títulos y descripciones únicos. Cada página tiene un H1 y la secuencia H1–H6 del HTML auditado no presenta saltos ascendentes. Algunas cabeceras usaban lemas como título de búsqueda, con poco contexto sobre la página.                                       |
| Idioma y redes              | `lang="es-AR"`, Open Graph con `es_AR`, tarjeta de redes compartida y URL canónica. El nombre abreviado del sitio en Open Graph no coincidía literalmente con el nombre institucional completo.                                                                    |
| Identidad de la institución | No se encontró JSON-LD en ninguna de las 36 páginas. La portada ya muestra la identidad institucional y el sitio publica el nombre, el escudo, el correo y la sede central.                                                                                        |
| HTTPS y `www`               | En `/salones/`, HTTP con `www` redirige 308 a HTTPS con `www`. HTTPS sin `www` redirige 308 al host oficial preservando la ruta. HTTP sin `www` llega al oficial en dos saltos 308.                                                                                |
| Variantes de ruta           | `/salones`, `/salones/index.html` y `/index.html` respondieron 200, con canonical hacia la versión oficial correspondiente. Los enlaces internos y el sitemap usan las rutas canónicas.                                                                            |
| 404 y enlaces               | Una ruta inventada devolvió HTTP 404 real, `noindex, follow` y ningún canonical. El verificador del build comprueba archivos, rutas, anclas y referencias ARIA internas. Los enlaces externos que cambian con el tiempo no se trataron como verificados en bloque. |
| Previews y alias            | `landing-circulo-er.vercel.app` devolvió 200 e `index, follow`, aunque el canonical apuntaba al dominio oficial. Una URL histórica de preview muestreada redirigió a autenticación de Vercel.                                                                      |
| Imágenes                    | Se detectaron 277 instancias de `img` en el HTML del sitemap, todas con atributo `alt`. El código usa imágenes responsive, WebP y carga diferida donde corresponde. Los grabados decorativos de portada usan texto alternativo vacío.                              |

Fuentes verificables del estado inicial: [portada](https://www.circulopoliciaer.com.ar/), [robots.txt](https://www.circulopoliciaer.com.ar/robots.txt), [sitemap existente](https://www.circulopoliciaer.com.ar/sitemap.xml), [alias de Vercel](https://landing-circulo-er.vercel.app/).

## 2. Prioridades y causas por comprobar

| Prioridad | Hallazgo o hipótesis                                                                                                                                                                                                                                                   | Siguiente comprobación                                                                                                                                      |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Alta      | Confirmado: el alias público de producción puede ser rastreado como otra copia.                                                                                                                                                                                        | Una vez publicado el cambio, comprobar `X-Robots-Tag: noindex, follow` solo en el alias y comprobar la ausencia de `noindex` en el dominio oficial.         |
| Alta      | Confirmado: faltaba una señal estructurada coherente sobre quién publica el sitio y cómo se llama.                                                                                                                                                                     | Verificar la portada pública con el validador de Schema.org y con la inspección de URL tras el despliegue.                                                  |
| Alta      | Hipótesis: el sitio antiguo concentra referencias y señales históricas para la búsqueda institucional. Una búsqueda de referencia devolvió contenido de `retiradosper.com.ar` con el mismo nombre. Esto no prueba competencia, propiedad ni posición exacta en Google. | Confirmar titularidad, acceso y estado editorial del dominio anterior. Comparar en Search Console consultas, páginas de destino y canonicals seleccionados. |
| Alta      | Confirmado en laboratorio: el LCP de portada fue lento bajo el perfil móvil simulado.                                                                                                                                                                                  | Medir el efecto tras desplegar y revisar datos de usuarios reales en Core Web Vitals.                                                                       |
| Media     | Confirmado: faltaba precisión institucional o geográfica en títulos de algunas páginas.                                                                                                                                                                                | Revisar impresiones y CTR por consulta y página después del rastreo, con un período comparable.                                                             |
| Media     | Las 36 URLs son descubribles e indexables técnicamente. Se desconoce cuántas indexó Google, cuál es el canonical elegido y cómo se distribuye la visibilidad por consulta.                                                                                             | Inspección de URL, informe de indexación, sitemaps, acciones manuales y seguridad de Search Console.                                                        |
| Baja      | Hay variantes de ruta 200 con canonical correcto.                                                                                                                                                                                                                      | Considerar una política de normalización solo si Search Console o los registros muestran rastreo significativo de esas variantes.                           |

Resultado histórico de referencia: [página institucional del dominio anterior](https://www.retiradosper.com.ar/institucional.html). Su presencia en la consulta observada no equivale a un diagnóstico del ranking de Google.

## 3. Implementación en la rama SEO

- Se reemplazó el generador manual por `@astrojs/sitemap` 3.7.4. En producción genera `sitemap-index.xml` y `sitemap-0.xml`. La URL `sitemap.xml` conserva un índice equivalente para que el envío anterior de Search Console siga respondiendo. `robots.txt` anuncia el nuevo índice.
- El origen predeterminado de Vercel Production es el dominio oficial. Si Vercel Production recibe un `SITE_URL` diferente, falla de forma explícita. `SEO_INDEXABLE=true` sigue siendo un requisito. Las previews y Vercel Development quedan con `noindex`, sin canonical ni sitemap. Las URLs públicas canónicas siguen terminando en barra y coinciden con el sitemap.
- Se agregó una cabecera `X-Robots-Tag` condicionada al host exacto `landing-circulo-er.vercel.app`. Se mantuvieron los 308 existentes entre los hosts oficiales. La regla requiere validación en el hosting porque Astro preview no reproduce el enrutamiento de Vercel.
- Se incorporó JSON-LD `Organization` y `WebSite` en la portada indexable. Usa datos del repositorio que ya publica la institución: nombre, escudo, correo y sede central en Paraná. Se alineó `og:site_name` con ese nombre. Las notas de Novedades declaran `og:type=article`.
- El favicon cuadrado de 96 × 96 reutiliza el escudo oficial y se sirve en la ruta estable `/favicon.png`.
- Se precisaron el título y la descripción de Inicio y los títulos de Institución, Contacto, Beneficios, Salones y fichas de filiales. Se mantuvieron los H1 visibles, las rutas, el diseño y las referencias a alojamientos reales. Cada salón conserva su sección y ancla en `/salones/`.
- La portada sirve una variante WebP de 1152 px a móviles de densidad 1× donde antes elegía 1440 px. Las pantallas de más densidad conservan la opción de 1440 px. La primera ilustración tiene prioridad de descarga alta.

| Archivos                                                                                                                                  | Cambios                                                        |
| ----------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| `astro.config.mjs`, `config/seo.mjs`, `package.json`, `package-lock.json`                                                                 | Entornos, origen oficial, sitemap y robots.                    |
| `src/layouts/BaseLayout.astro`, `src/layouts/SitePage.astro`, `src/content/institution.json`, `public/favicon.png`                        | Identidad, metadatos, canonical y JSON-LD.                     |
| `src/pages/beneficios/index.astro`, `contacto.astro`, `filiales/[id].astro`, `institucion.astro`, `novedades/[id].astro`, `salones.astro` | Metadatos específicos y tipo Open Graph de novedades.          |
| `src/components/Hero.astro`                                                                                                               | Resolución responsive y prioridad de la primera ilustración.   |
| `vercel.json`, `scripts/check-security.mjs`, `tests/landing.test.mjs`                                                                     | Control del alias, validación de headers y pruebas de rastreo. |
| `docs/seo.md`, `docs/auditoria-seo-2026-11-04.md`                                                                                         | Configuración operativa e informe.                             |

## 4. Rendimiento y validación

### Línea de base pública

Chromium, 390 × 844, DPR 1, caché deshabilitada, latencia emulada de 150 ms, descarga de 200 kB/s y CPU con limitación 4×. Tres corridas por URL.

| URL                   | LCP mediano |                    CLS | Recursos de la corrida |
| --------------------- | ----------: | ---------------------: | ---------------------: |
| Inicio                |   10.008 ms | 0 en las tres corridas |              1.931 KiB |
| Alojamiento en Paraná |    1.424 ms | 0 en las tres corridas |                169 KiB |

El candidato final de LCP del Inicio fue una ilustración del carrusel. Los resultados dependen del perfil emulado y del ciclo del carrusel. No se midió INP de usuarios. La consulta a PageSpeed Insights devolvió 429 por cuota, por lo que no se obtuvo CrUX. No se certifica el cumplimiento de Core Web Vitals con estas pruebas de laboratorio.

### Resultado de la rama

**Comparación local de la portada.** Se usó el mismo build y se alternaron dos perfiles de entrega. El perfil base reprodujo la selección anterior de imágenes y el ajustado usó la nueva selección y prioridad. Mismas condiciones de emulación que en la línea de base, dos corridas por perfil. Los bytes corresponden a ilustraciones de portada, mientras que la tabla anterior mide todos los recursos.

| Perfil   | LCP de las dos corridas | Ilustraciones transferidas |
| -------- | ----------------------- | -------------------------: |
| Base     | 10.520 y 10.508 ms      |      1.790 KiB por corrida |
| Ajustado | 3.988 y 4.476 ms        |      1.184 KiB por corrida |

En este perfil se descargaron **606 KiB menos (34 %)**. La mediana del LCP bajó de 10,51 s a 4,23 s y todavía queda por encima del umbral de 2,5 s de referencia. Hace falta repetir la medición contra Vercel tras publicar, incluyendo pantallas con DPR 2–3. Los tiempos locales no son una predicción de posicionamiento ni sustituyen los datos de campo.

| Prueba                                                                    | Resultado                                                                                                                                                                                                                           |
| ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run validate`                                                        | Aprobado. Control de seguridad del repositorio, chequeo Astro (79 archivos sin diagnósticos), ESLint, Prettier, 22 pruebas Node, fixture editorial aislada, 40 casos Chromium y 40 con CSP aplicada.                                |
| Build con dominio oficial, `SEO_INDEXABLE=true` y `VERCEL_ENV=production` | Aprobado, 37 archivos HTML incluidos la 404 y 36 URLs en `sitemap-0.xml`. `sitemap-index.xml` y `sitemap.xml` son equivalentes. El build comprobó 120 referencias desde Inicio y cuatro hashes CSP.                                 |
| `npm run test:unit` con build de producción                               | 22 aprobadas. Las 36 rutas generadas respondieron 200 localmente con títulos y descripciones únicos, canonical autorreferente, `og:url` y directiva de indexación. Se comprobó el JSON-LD de la portada y la 404 fuera del sitemap. |
| Build con el mismo dominio y `VERCEL_ENV=preview`                         | Aprobado y 22 pruebas Node aprobadas. Portada con `noindex, follow`, sin canonical ni JSON-LD y con 404 en las tres rutas XML.                                                                                                      |

Los dos builds SEO locales usaron la colección editorial local. El build que haga Vercel con su configuración y el contenido Sanity del momento sigue pendiente. La auditoría de semántica y el verificador de enlaces internos no identificaron reparaciones que requirieran cambiar HTML visible.

## 5. Tareas manuales después de aprobar y desplegar

1. **Vercel.** Confirmar en Production `SITE_URL=https://www.circulopoliciaer.com.ar`, `SEO_INDEXABLE=true` y la fuente editorial operativa. Mantener Standard Protection en previews. Probar la portada oficial, el alias y una preview. Confirmar la regla de host con una respuesta HTTP real. Comprobar los 308 sin y con `www`, el 404 real y los tres XML. No hace falta cambiar DNS para aplicar estos cambios si se conservan las respuestas observadas.
2. **Search Console.** Usar la propiedad de dominio existente. Enviar `https://www.circulopoliciaer.com.ar/sitemap-index.xml` una vez que responda 200 y dejar el envío anterior hasta confirmar que Google lee el nuevo. Inspeccionar la portada y una muestra de Beneficios, Alojamientos, Salones y Filiales. Comparar la URL declarada con la seleccionada por Google. Solicitar indexación de un grupo pequeño de páginas clave.
3. **DNS y titularidad.** Mantener el TXT de verificación. Confirmar quién puede administrar el dominio anterior y su Search Console. Si corresponde una migración y hay autorización, preparar un mapa de URLs antiguas a equivalentes nuevas, probar 301/308 y evaluar Cambio de dirección. Revisar menciones institucionales y enlaces a ambos dominios.
4. **Seguimiento.** Guardar una exportación inicial de Rendimiento e Indexación. Crear un filtro para el nombre completo, abreviaturas y búsquedas que agregan «página web». Separar las consultas de marca de las consultas sobre servicios y comparar los períodos por dispositivo.

## 6. Plan de 30, 60 y 90 días

- **Días 1–30.** Revisar semanalmente sitemap, cobertura y canonical elegida de Inicio y de las rutas prioritarias. Registrar impresiones, clics y CTR iniciales de marca, sin usar una búsqueda manual aislada como indicador de tendencia. Actualizar los enlaces al dominio oficial en perfiles y canales que controle el Círculo.
- **Días 31–60.** Revisar consultas reales por cada sección. Completar fichas con datos operativos verificados y mejorar enlaces desde las publicaciones hacia las fichas correspondientes. Si se confirma la titularidad del dominio anterior, preparar la migración como cambio separado y medible.
- **Días 61–90.** Comparar ventanas de 28 días por marca, localidad y servicio. Analizar cobertura, CTR, páginas de entrada y Core Web Vitals de campo cuando haya muestra. Priorizar las páginas que ya reciben impresiones y cuya información puede precisarse. Registrar qué cambios coinciden con mejoras sin atribuir causalidad a una sola intervención.

Referencias: [Astro Sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/), [canonicals de Google](https://developers.google.com/search/docs/crawling-indexing/canonicalization), [nombre del sitio](https://developers.google.com/search/docs/appearance/site-names), [Organization](https://developers.google.com/search/docs/appearance/structured-data/organization), [solicitar rastreo](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl), [migraciones](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes), [condiciones por host en Vercel](https://vercel.com/docs/project-configuration/vercel-json#header-has-or-missing-object-definition), [Web Vitals](https://web.dev/articles/vitals).
