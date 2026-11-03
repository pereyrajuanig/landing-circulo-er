# Arquitectura actual de la propuesta multipágina

Corte: 29/10/2026. Esta sección actualiza la descripción histórica que sigue más abajo. Propuesta en PR #11; main sigue sin recibir este lote.

Astro7.3.8 y TypeScript estricto generan 18 páginas públicas y la404 desde cinco colecciones JSON. Los artículos publicados añaden rutas. No hay SSR, API, CMS operativo, autenticación, React, base de datos ni escrituras del visitante.

SitePage.astro reutiliza BaseLayout, Header y Footer para las páginas interiores. Define h1, título, descripción y ubicación. Los índices de beneficios/alojamientos enlazan a rutas dinámicas pregeneradas con getStaticPaths; se reutilizan servicios/destinos existentes. La portada conserva sus anclas. site.css se carga después de los estilos cálidos.

NewsList/NewsTeaser reciben publicaciones filtradas por estado y fecha en build. news.ts comparte normalización y criterios; el script de noticias filtra texto/categoría sin servidor. Los párrafos se escapan; no se renderiza HTML arbitrario. Sin contenido aprobado, el listado comunica su estado vacío.

El selector de alojamientos conserva su consulta y agrega enlace a la ficha elegida. Las FAQ usan details/summary. Header navega entre páginas y expone aria-current; Footer permite llegar a institución/filiales. Cada documento carga solo los módulos que utiliza; Astro externaliza el script compartido, por lo que la CSP actual permite scripts del propio origen y ya no necesita el hash inline anterior.

check-build recorre todos los documentos: idioma, h1, metadatos, IDs, referencias ARIA y enlaces/recursos entre páginas. check-security revisa enlaces de todo el HTML. El sitemap de producción reúne los index.html generados; previews siguen con noindex.

CMS y Facebook son próximos pasos explícitamente diferidos, no implementaciones verificadas. Sanity separado es la propuesta; Facebook será origen, con enlace/acceso pendientes. No hay llamadas externas nuevas ni credenciales en el frontend. Ver site-evolution.md y cms-roadmap.md.

---

## Referencia histórica de la landing, anterior a la ampliación

# Arquitectura · Astro

## Decisión

El 12/10/2026 el usuario solicitó migrar a Astro ante una posible necesidad futura de edición institucional. Se conserva la landing cálida; la decisión organiza el desarrollo y el contenido. No incorpora un panel de administración.

Astro 7.3.8 genera HTML estático. TypeScript usa la configuración strict. Node 24.16 o posterior dentro de la rama 24 y npm ejecutan desarrollo, validación y build. No hay React, renderizado bajo demanda, API ni base de datos. Los paquetes de Astro son herramientas de construcción; no se sirven completos al visitante.

## Renderizado y componentes

src/pages/index.astro carga las cuatro colecciones y ordena servicios, filiales y alojamientos por order. BaseLayout.astro define idioma, metadatos, favicon y estilos globales. Header, Hero, Institution, Services, Branches, Accommodation, Community, Contact y Footer conservan la estructura anterior.

src/styles/styles.css se importa antes de src/styles/warmth.css. La revisión cálida sobrescribe la base; comprobar ambas hojas y media queries al modificar estilos. Vite reúne los estilos en un recurso generado. El PNG original está en public/assets/escudo.png. Astro genera WebP por tamaño para cabecera, inicio y pie, y un favicon PNG reducido. Las fuentes WOFF2 se sirven desde public/assets/fonts/.

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

## SEO y ruta de error

BaseLayout admite metadatos por página y noindex explícito. config/seo.mjs valida SITE_URL y habilitación de indexación; astro.config.mjs genera robots y sitemap condicionado. La ruta 404.astro mantiene estado 404 y acceso al inicio. Ver [SEO y pendientes](seo.md).

## Contenido institucional recibido · 30/10/2026

Seis colecciones: institution, services, branches, stays, news y spaces. Esta última mantiene datos de cinco espacios fuera de la UI. Servicios incorpora detalles; stays ubicación, detalles y nota de fuente; branches resumen/foto opcionales; news cover, gallery y sourceContext opcionales.

src/lib/photos.ts centraliza metadatos de banco y23 recortes propios. SitePhoto muestra créditos según origen y genera WebP hasta el tamaño nativo. PhotoGallery admite una o varias imágenes y actualiza dimensiones/crédito. Accommodation cambia la figura por destino en landing.ts. SpaceCatalog y BranchHighlights consultan las colecciones y reutilizan SitePhoto. No hay base de datos, endpoints, CMS o Facebook nuevos.

## Carrusel de portada · 30/10/2026

Hero mantiene composición estable; CityCarousel presenta las ciudades de src/lib/hero-cities.ts. city-carousel.ts administra el índice, un único timeout de 8 segundos, intención de reproducción y condiciones de visibilidad/hover/foco. Ilustraciones se renderizan en Hero y se sincronizan mediante hidden. Estado local al documento, sin almacenamiento ni API. hero-cities.css limita estilos a la portada: grabado a tamaño de sección, fotografías sin controles visibles y pausa revelada al foco de teclado. Recursos locales y scripts con la CSP existente. Ver city-carousel.md.
