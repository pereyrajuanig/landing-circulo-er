# Evolución a sitio institucional

Corte: 29/10/2026. Rama codex/diseno-beneficios-espacios, PR #11. Amplía la propuesta de diseño inicial; todavía no se fusiona en main.

## Requisitos confirmados por el usuario

- Beneficios dirigidos a retirados de la Policía y personas con una pensión vinculada a ella.
- Más profundidad en beneficios, alojamientos y salones; conservar cercanía e identidad.
- Noticias y logros de gestión.
- Personal de la institución editará contenido mediante un panel sencillo.
- Facebook será origen: publicar allí y mostrar también en el sitio. El enlace todavía no está disponible.
- Preparar la base del panel y activarlo después; no hay cuenta/proyecto de CMS para conectar hoy.

## Mapa implementado en la propuesta

| Ruta                | Contenido                                                                 |
| ------------------- | ------------------------------------------------------------------------- |
| /                   | Portada, accesos y panorama de servicios; entrada a novedades             |
| /beneficios/        | Índice de cinco servicios y alcance del público                           |
| /beneficios/[id]/   | Cinco fichas con descripción existente, consulta y preguntas orientativas |
| /alojamientos/      | Selector de seis destinos y acceso a fichas                               |
| /alojamientos/[id]/ | Seis fichas, consulta específica y preguntas frecuentes                   |
| /salones/           | Espacios, consulta y guía para organizar un encuentro                     |
| /novedades/         | Noticias y logros; estado vacío cuando no hay publicaciones               |
| /novedades/[id]/    | Artículos publicados, con fecha y enlace original de Facebook opcional    |
| /institucion/       | Historia y búsqueda de las 24 filiales                                    |
| /contacto/          | Correo y dirección institucionales                                        |
| /404.html           | Regreso al inicio y noindex                                               |

Son 18 páginas públicas y la 404; con publicaciones aprobadas se generan artículos adicionales. Las anclas históricas del inicio se conservan. Noticias no tiene contenido real cargado; no se inventaron actividades ni logros.

Las fichas amplían el recorrido con información existente y guías de consulta. Fotos reales, equipamiento, capacidades, condiciones y tarifas requieren información institucional antes de ampliar su contenido.

## Estado por etapa

- [x] Mapa multipágina y layout compartido con ubicación y navegación.
- [x] Fichas de beneficios y destinos sobre las colecciones actuales.
- [x] Sección de salones y preguntas desplegables.
- [x] Modelo local de noticias/logros, listados y ruta de artículo.
- [x] Exclusión de borradores y fechas futuras; contenido de artículo tratado como texto.
- [ ] Aceptación visual de la propuesta por el usuario.
- [ ] Contenido completo, fotos y condiciones aprobadas.
- [ ] Cuenta/proyecto de CMS, permisos editoriales y panel conectado.
- [ ] Publicación editorial que reconstruya Vercel mediante webhook.
- [ ] Página de Facebook identificada y acceso administrativo verificado.
- [ ] Viabilidad técnica, permisos y operación del flujo Facebook → sitio comprobados.
- [ ] Prueba real de publicación y eliminación/actualización en Facebook.
- [ ] Dominio, privacidad y prueba real con lector de pantalla pendientes históricos.

Los checks de implementación no certifican aceptación institucional, CMS operativo, sincronización o lanzamiento. La evidencia técnica de este lote se registra en el PR y en docs/media/sitio-*.png.

## Panel propuesto

Sanity Studio alojado por separado, con contenido leído por Astro en build. Así el panel no agrega React al sitio público. Es una propuesta de integración, sin dependencias instaladas ni cuentas creadas en esta etapa. La institución debe conservar la titularidad; acordar editores, permisos, presupuesto y recuperación antes de activarlo.

Modelo editorial a completar: beneficios, destinos, espacios, contacto, noticias y logros. Reutilizar los contratos actuales, extender solo con datos confirmados, imágenes con texto alternativo y fuente/fecha de revisión. Una publicación debe disparar build y generar una vista previa revisable. Un error del CMS no debe reemplazar silenciosamente contenido de producción con datos locales antiguos.

Referencias verificadas: [Sanity con Astro](https://www.sanity.io/docs/astro) y [Studio en Astro](https://www.sanity.io/docs/astro/embedding-studio-in-astro). El proveedor recomienda alojar Studio separado. Las condiciones del plan y permisos se verificarán al activar la cuenta.

## Facebook → sitio

El usuario pidió Facebook como origen y todavía no tiene su enlace. Hoy no se carga SDK, iframe, token ni petición a Meta. No hay sincronización activa.

La siguiente etapa debe elegir y probar, con la página real, entre mostrar publicaciones embebidas o importar sus publicaciones como entradas propias del sitio. Un bloque embebido no equivale a crear artículos indexables. La importación automática necesita comprobar la API, permisos, identidad de la página, credenciales en servidor, frecuencia y política de eliminación.

Para una importación, usar un identificador externo único, guardar el enlace original, actualizar sin duplicados, no importar comentarios de terceros y conservar la última versión válida ante fallos. La clasificación noticia/logro y el destacado pueden ser editoriales. No abrir CORS/CSP ni exponer credenciales para anticipar una integración todavía no verificada.

La documentación pública de Meta consultada pidió sesión o respondió con límite de acceso. Permisos exactos y proceso de revisión: REQUIERE VERIFICACIÓN con la cuenta real. [Pages API](https://developers.facebook.com/docs/pages-api/posts/), [Page Plugin](https://developers.facebook.com/docs/plugins/page-plugin/).

## Próximo orden de trabajo

1. Revisar diseño y navegación de la propuesta.
2. Recopilar las fichas reales, fotos y condiciones de servicios y espacios.
3. Configurar cuenta institucional de CMS y permisos.
4. Conectar lectura, validación de contenido y publicación en preview.
5. Recibir enlace/acceso de Facebook y comprobar integración de lectura.
6. Ensayar publicación, cambios, duplicados, borrado y fallo de sincronización.
7. Repetir accesibilidad, SEO y rendimiento con contenido real antes del lanzamiento.

## Evidencia local

Matriz de18 rutas ×6 anchos (320/390/768/1024/1440/1920):108 verificaciones sin desborde ni errores de JavaScript. Capturas revisadas en docs/media/sitio-*.png; matriz en site-evolution-evidence.json. La prueba editorial aislada comprueba con datos sintéticos los artículos y filtros que no tienen entradas reales en la preview. Los136 campos históricos de la checklist se conservaron; se añadieron9 tareas. Resultado de la suite y CI del commit final: PR #11.
