# Arquitectura · Astro

## Decisión

El 12/10/2026 el usuario solicitó migrar a Astro ante una posible necesidad futura de edición institucional. Se conserva la landing cálida; la decisión organiza el desarrollo y el contenido. No incorpora un panel de administración.

Astro 7.3.8 genera HTML estático. TypeScript usa la configuración strict. Node 24.16 o posterior dentro de la rama 24 y npm ejecutan desarrollo, validación y build. No hay React, renderizado bajo demanda, API ni base de datos. Los paquetes de Astro son herramientas de construcción; no se sirven completos al visitante.

## Renderizado y componentes

src/pages/index.astro carga las cuatro colecciones y ordena servicios, filiales y alojamientos por order. BaseLayout.astro define idioma, metadatos, favicon y estilos globales. Header, Hero, Institution, Services, Branches, Accommodation, Community, Contact y Footer conservan la estructura anterior.

src/styles/styles.css se importa antes de src/styles/warmth.css. La revisión cálida sobrescribe la base; comprobar ambas hojas y media queries al modificar estilos. Vite reúne los estilos en un recurso generado. El escudo se sirve desde public/assets/escudo.png, compartido por cabecera, inicio, pie y favicon.

## Contenido

src/content.config.ts usa defineCollection y el loader file de Astro. Los esquemas validan campos obligatorios, correo, URL de Maps, orden y acciones de servicios al sincronizar y construir.

| Colección   | Fuente           | Uso                                          |
| ----------- | ---------------- | -------------------------------------------- |
| institution | institution.json | Nombre, SEO, historia y contacto central     |
| services    | services.json    | Cinco servicios, acción y asunto de consulta |
| branches    | branches.json    | 24 filiales con orden explícito              |
| stays       | stays.json       | Seis destinos y descripciones                |

Cada entrada tiene id único. Los componentes reciben datos tipados. Alojamiento serializa su colección en data-stays para el script del navegador: botones, descripción inicial y cambios posteriores provienen de la misma fuente. Los textos se interpolan con escape de Astro; no se interpretan como HTML arbitrario.

Los mensajes editoriales de bienvenida y los rótulos de sección continúan en componentes. Si se incorporan al futuro panel, deben pasar a campos del modelo editorial definido para ese CMS.

## Interacciones

src/scripts/landing.ts se procesa como un módulo por Astro. Mantiene menú con aria-expanded y cierre por enlace, Escape, salida de foco de la cabecera y cambio de breakpoint; filtro de filiales con normalización; selección de alojamiento con aria-pressed, aria-controls, aria-live y asunto de correo; año del pie.

Los servicios mantienen details/summary nativos, Salud abierto y múltiples categorías abiertas. La sede central permanece visible durante la búsqueda. Las reservas se coordinan con la institución. Contacto usa mailto; Maps abre en otra pestaña.

Sin JavaScript, el contenido, los servicios y la consulta del primer alojamiento permanecen disponibles; búsqueda, selector y menú colapsado requieren JavaScript como en la versión anterior.

## Desarrollo, build y verificación

Astro dev reemplaza el servidor propio y ofrece recarga. Astro build genera dist/. scripts/check-build.mjs valida HTML, anclas, IDs y recursos de esa salida y comprueba que no incluya archivos internos. Astro preview permite inspeccionar el build y no se usa como servidor de producción.

npm run check ejecuta astro check. npm run lint aplica reglas recomendadas de ESLint, TypeScript y Astro a código, componentes y herramientas; no suprime advertencias. npm run format:check verifica formato con Prettier y su plugin oficial para Astro. npm run validate agrupa estos controles y los tests. npm test construye y prueba texto y anclas preservados, datos renderizados, filtro, correo y respuestas HTTP de Astro preview. El runner usa Node 24. Playwright 1.64.0 agrega catorce casos Chromium de escritorio/móvil sobre el build; la única ampliación de landing.ts recupera el foco al ocultarse Menú. Los runners cierran sus previews al finalizar. Astro admite un preview por checkout: cerrar la revisión antes de correr la suite. Los reportes de pruebas no se sirven ni se versionan; ver testing.md.

Vercel recibe solo dist/ como salida pública. vercel.json declara Astro, npm ci y npm run build. No se necesita adaptador de Vercel para esta salida estática. Dominio y conexión GitHub/Vercel son pasos externos pendientes.

## Evolución editorial

Un CMS puede reemplazar las fuentes de las colecciones conservando el contrato de los componentes. El [plan editorial](cms-roadmap.md) define las decisiones necesarias. Con contenido estático, una edición debe disparar un nuevo build para publicarse.

Referencias: [colecciones de Astro](https://docs.astro.build/en/guides/content-collections/), [scripts](https://docs.astro.build/en/guides/client-side-scripts/), [Astro en Vercel](https://docs.astro.build/en/guides/deploy/vercel/).
