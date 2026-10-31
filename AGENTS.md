# Instrucciones de Landing-CirculoER

## Contexto y decisiones

- Landing del Círculo de Retirados y Pensionados de la Policía de Entre Ríos; público: retirados, pensionados y familias.
- Astro 7.3.8, TypeScript estricto, CSS propio y salida estática. Node 24.16 o posterior dentro de la rama 24 y npm para desarrollo, controles y build; sin CMS ni base de datos. Migración solicitada por el usuario el 12/10/2026.
- Fuente: `src/pages/`, `src/layouts/`, `src/components/` y colecciones JSON de `src/content/`. `src/styles/styles.css` es la base institucional y `src/styles/warmth.css` la revisión de calidez, importada después. Mantener el escudo, Libre Caslon Display, DM Sans, azul, dorado y fondos cálidos.
- Datos institucionales variables requieren confirmación; no inventar teléfonos, prestaciones, tarifas, autoridades ni testimonios.
- Documentación: [README](README.md), [diseño](docs/design-system.md), [arquitectura](docs/architecture.md), [flujo](docs/workflow.md) y [despliegue](docs/deployment.md).

## Trabajo y Git

- Leer instrucciones, revisar `git status`, archivos relacionados y cambios ajenos antes de editar. No revertirlos ni incorporarlos al commit.
- Rama principal `main`; tareas en ramas cortas `codex/<tarea>`, creadas desde `main` actualizado. Reutilizar la rama de una tarea existente.
- Commits descriptivos, push y PR cuando el usuario los autorice. Revisar el diff y seleccionar los archivos.
- Exigir PR y check `quality` para main. No exigir una aprobación humana adicional en este proyecto individual.
- No hacer merge ni publicar en Sites sin autorización. La carga inicial a GitHub fue solicitada por el usuario; eso no autoriza todos los futuros merges o despliegues.
- No reescribir historial compartido ni cambiar visibilidad o credenciales sin una instrucción específica.

## Implementación y controles

- Preservar el stack y las funciones existentes. Evitar refactors generales y dependencias nuevas sin necesidad.
- Usar npm y su lockfile. Comandos: `npm ci`, `npm run dev`, `npm run check`, `npm run lint`, `npm run format:check`, `npm test`, `npm run build`, `npm run preview`. `npm run validate` agrupa tipos, lint, formato y tests (incluye build).
- `check` ejecuta astro check; `lint` ejecuta ESLint sin advertencias; `format:check` comprueba Prettier. Build valida colecciones y referencias de dist; npm test incluye build, catorce tests Node y treinta y seis casos Chromium por cada modo CSP. Preparar el navegador con npm run test:install; Linux/CI usa npx playwright install --with-deps chromium. Cerrar el preview de revisión antes de la suite: Astro admite uno por checkout; el runner abre y cierra su preview en 4175. Guía: docs/testing.md. No son una auditoría CSS o WCAG completa.
- Revisar cambios visuales en navegador de escritorio y móvil; menú, servicios, búsqueda y alojamientos.
- Usar Astro dev para desarrollo y Astro preview para revisar dist. No usar esos servidores como hosting de producción; solo public/ y la salida generada son públicos.
- Mantener documentos y PDF alineados. Registrar progreso y evidencia en docs/checklist-progress.json; el PDF se regenera desde tools/docs/build_checklist.py y conserva campos manuales no sobrescritos por el registro. No marcar tareas o merges pendientes como verificados.
- No guardar secretos, exports de cuentas ni archivos sensibles. No incorporar otros materiales del Escritorio.

## Despliegue y colaboración

- Sites conserva el proyecto existente de `.openai/hosting.json`, con acceso privado. No crear otro Site ni desplegar mediante GitHub Pages por defecto.
- Vercel es el hosting previsto, con vercel.json preparado. Vercel conectado a JuanIgnacioPereyra / landing-circulo-er; URL de revisión https://landing-circulo-er.vercel.app/ con noindex. main dispara publicación automática; ramas generan previews con Standard Protection. GitHub es fuente y portfolio; CI comprueba el proyecto, no publica por sí solo. Contenido, secciones y dominio quedan pendientes por decisión del usuario; ver docs/vercel-preview.md. Conservar el Site histórico.
- No hay base de datos ni migraciones. Las consultas usan mailto y no escriben datos desde la web.
- Delegar solo cuando el usuario o instrucciones aplicables lo pidan.
- Informar resultado, comprobaciones, limitaciones y pasos externos pendientes.

## Seguridad preparada

CSP de Vercel en Report-Only; exigida solo para pruebas locales. Build comprueba hashes del script: ante cambio revisado, npm run security:update y revisar diff antes de validar. No sustituir por unsafe-inline/eval. npm test incluye 14 Node y 36 Chromium por cada modo CSP. Headers de portada/assets/404 y HTTPS comprobados en vercel.app; futuro dominio y privacidad institucional aún por acordar.

## Evolución multipágina en revisión

El usuario pidió ampliar a sitio con fichas de beneficios/alojamientos, salones y noticias/logros. La implementación usa SitePage.astro y seis colecciones; news contiene cuatro reseñas del archivo institucional recibido el 30/10/2026. Conservar borradores fuera del build público. No presentar el panel ni Facebook como conectados: el usuario difirió la activación del CMS y no tiene todavía el enlace de Facebook. Fuente prevista: Facebook → sitio. Alcance y tareas en docs/site-evolution.md.

## Material institucional y fotografías

El usuario entregó VideoCirculo-material-recopilado el 30/10/2026. Fuente y limitaciones en docs/institutional-content.md e institutional-photo-sources.json. Se usan 23 recortes seleccionados; no publicar originales completos con datos personales ni cierre de campaña. No inventar fechas de hechos ni vigencia de convenios a partir de un video sin fecha. Las reseñas explican que su fecha corresponde a la publicación del texto.

SitePhoto y src/lib/photos.ts distinguen imágenes institucionales de referencias. Mantener avisos y créditos de Pexels en farmacia,404 y cuatro alojamientos sin fotos propias. No utilizar una imagen de otra localidad como si correspondiera al destino. Las imágenes del selector deben cambiar con su destino. No generar imágenes sin una nueva instrucción explícita del usuario. No marcar contenido, capacidad, equipamiento, fotos reales completas o aceptación institucional como verificados sin cumplir sus criterios.

## Portada con ciudades

El usuario autorizó aplicar la maqueta de ciudades con avance automático. Hero conserva mensaje y accesos; CityCarousel alterna Concordia/Federación/Federal cada 8 segundos con foto y grabado correspondientes. Mantener pausa/inicio, foco que detiene sin reinicio implícito, movimiento reducido, suspensión al ocultarse y respaldo sin JS. city-art-sources.json registra recortes sin contenido electoral; no copiar piezas completas de campaña al sitio. Ver docs/city-carousel.md.
