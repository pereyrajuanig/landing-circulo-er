# Panel editorial · operación y estado

Actualizado: 3/11/2026. Rama de integración: `codex/panel-editorial`. [PR #17](https://github.com/pereyrajuanig/landing-circulo-er/pull/17), sin merge todavía.

## Qué está disponible

- Panel separado: https://circulo-policia-er.sanity.studio/ (inicia sesión con GitHub).
- Proyecto `z8e3tt9r`, organización `o27owcmqf`, dataset público `production`.
- Studio alojado con ID `krgr5jl9zba6nnqduxnn1ssa`; los despliegues siguientes reutilizan ese ID.
- Cuatro reseñas del archivo institucional migradas con nueve fotografías, mismos slugs, fechas y aclaraciones. Importación repetible: no sobrescribe ediciones existentes.
- Noticias y logros: título, categoría, resumen, texto por párrafos, foto principal, galería de hasta 12 imágenes, fecha, aclaración y enlace opcional a Facebook.
- Campos e interfaz del editor en español. Sanity administra autenticación, borradores y publicación; no existe un área de socios.
- Lectura de Astro en build implementada y verificada con las cuatro publicaciones reales. Las imágenes se descargan y optimizan a WebP: el visitante no consulta Sanity.

## Qué sigue pendiente

- Activar `NEWS_SOURCE=sanity` en Production de Vercel después del merge autorizado. Actualmente la web pública conserva el JSON local.
- Crear y conectar el deploy hook de Vercel con el webhook de Sanity. Publicar en el panel todavía NO actualiza automáticamente la web pública.
- Verificar un cambio aprobado de extremo a extremo, y comprobar retiro de una publicación y reintento si falla el build.
- Designar titular institucional, usuarios y recuperación de acceso. Por ahora solo está la cuenta del usuario, con permisos de propietario/administrador.
- Confirmar plan definitivo tras la prueba de 30 días creada por Sanity. No se ingresaron pagos ni se autorizó una suscripción. No prometer permisos de editor restringidos sin revisar el plan; los roles disponibles varían.
- Exportación y restauración ensayada y capacitación. Manual y checklist PDF actualizados con este estado parcial.
- Facebook → sitio: no conectado, falta página institucional y permisos. El campo de enlace NO sincroniza publicaciones.

## Uso para personal institucional

1. Abrir el panel e iniciar sesión con la cuenta que tenga acceso al proyecto.
2. Entrar en **Publicaciones → Noticias y logros**. Elegir una existente o crear **Noticia o logro**.
3. Completar **Contenido**: título, categoría, resumen y texto. Separar párrafos con una línea en blanco. No pegar HTML; no hay editor de formato enriquecido.
4. En **Fotografías**, cargar JPG, PNG o WebP autorizados. Completar procedencia, descripción accesible y crédito. Si es referencia, marcarla como tal. No subir documentos con datos personales.
5. En **Publicación**, generar una dirección breve y estable. No cambiarla después de compartirla: todavía no hay redirecciones automáticas para cambios de slug. Indicar fecha actual o pasada; no hay publicación programada. Conservar aclaraciones de archivo cuando corresponda.
6. El trabajo se guarda como borrador. Revisar texto, fotos, condiciones y fechas antes de pulsar **Publicar**.
7. Tras conectar el webhook, esperar el build de Vercel y comprobar Inicio, Novedades y la ficha. Un guardado de borrador no debe disparar una publicación.
8. Para retirar del sitio, usar **Despublicar** desde las acciones del documento y comprobar el despliegue siguiente. No basta borrar una foto o modificar el resumen.

**Dato importante:** el dataset es público. Un documento publicado puede leerse por API aunque el build del sitio falle. Nunca publicar información interna, identificaciones, historias clínicas, credenciales o contactos personales sin autorización. Los borradores nativos permanecen privados.

## Arquitectura y configuración

`studio/` es una aplicación independiente de Sanity + React. No agrega React ni hidratación al sitio público de Astro.

```text
Personal → Sanity Studio → Content Lake (publicados)
                                    ↓ lectura durante build
                                Astro → HTML + WebP → Vercel
Sanity webhook → deploy hook Vercel (pendiente)
```

`src/loaders/editorial-news.ts` usa API publicada y `perspective=published`, excluye borradores y versiones. `src/lib/editorial-content.mjs` valida campos, slugs únicos, URLs de imágenes del proyecto y enlaces de Facebook. El texto se renderiza escapado. Los IDs importados usan guiones: un punto convierte el ID en una ruta privada de Sanity.

La fuente se elige explícitamente:

| Variable          | Valor                               | Uso                                                          |
| ----------------- | ----------------------------------- | ------------------------------------------------------------ |
| NEWS_SOURCE       | local o sanity                      | local por defecto; producción debe pasar a sanity al activar |
| SANITY_PROJECT_ID | z8e3tt9r                            | Identificador público; valor predeterminado en config        |
| SANITY_DATASET    | production                          | Dataset público; valor predeterminado en config              |
| SITE_URL          | https://www.circulopoliciaer.com.ar | SEO de producción existente                                  |
| SEO_INDEXABLE     | true                                | Solo producción; previews mantienen noindex                  |

No se utiliza token de lectura ni escritura en Astro, en su JavaScript o en el navegador público. El CLI usa la sesión del propietario fuera de Git. `.env` está excluido. La URL secreta del deploy hook nunca va en el repositorio, Studio ni una variable PUBLIC_.

Si Sanity responde con error o contenido inválido, el build falla y Vercel conserva el despliegue anterior. Una lista publicada vacía genera la sección vacía; no reaparecen noticias retiradas desde una copia local. Volver a `NEWS_SOURCE=local` es una recuperación manual que exige revisar el JSON porque puede contener publicaciones antiguas.

## Preparar el entorno

Desde la raíz: `npm ci`, `npm run check`, `npm run lint`, `npm run format:check`, `npm test`.

Desde `studio/`: `npm ci`, `npm run check`, `npm run build`. Desarrollo: `npm run dev` en http://127.0.0.1:3333/. Si se habilita acceso local autenticado, registrar ese origen exacto con credenciales en Sanity CORS; no usar comodines. No hace falta habilitar CORS del sitio público, porque la lectura es de servidor durante el build.

Publicar una revisión del panel: `npm run login`, luego `npm run deploy -- --schema-required --yes`. `sanity.cli.ts` fija el appId y desactiva actualizaciones automáticas para respetar el lockfile. Nunca crear otro Studio para una revisión del mismo panel.

Importación histórica: `npm run import:archive` revisa; `npm run import:archive -- -- --apply` aplica. Ejecutar desde studio. La lista `archive-images.json` valida rutas y SHA256 de los recortes seleccionados. No importa originales del dossier ni piezas de campaña.

## Conexión pendiente con Vercel

1. Con el PR revisado, autorizar el merge y la activación en Production.
2. Crear un deploy hook para `main` en el proyecto `landing-circulo-er`, llamado `Sanity editorial`. Tratar su URL como secreto: cualquiera que la conozca puede disparar builds.
3. Guardar esa URL solo como destino del webhook de Sanity. Dataset `production`, eventos create/update/delete, filtro `_type == "publication" && !(_id in path("drafts.**")) && !(_id in path("versions.**"))`. No activar en borradores. No hay escritura de Astro a Sanity: no debe existir un bucle.
4. Configurar `NEWS_SOURCE=sanity` solo en Production y desplegar el código de la rama fusionada. Las previews de CI siguen usando el JSON estable salvo selección explícita de Sanity.
5. Revisar una noticia aprobada, publicar, comprobar entrega del webhook y build listo; confirmar texto en la URL pública. Probar despublicación y republicación solo con contenido aprobado, preservando su URL.
6. Si falla: revisar validaciones de campos, estado de API, permisos, registros de entrega y build. Reintentar desde el hook sin modificar el contenido válido. Mantener el despliegue anterior hasta resolver el error.
7. Si se filtra el hook, revocarlo en Vercel y reemplazar el destino en Sanity. No compartirlo por chat.

## Respaldo y mantenimiento

Un rollback de Vercel recupera HTML, no restaura cambios en Sanity. El JSON original conserva únicamente el corte de la migración.

Antes de una migración posterior: `sanity dataset export production <ruta-privada>/production.tar.gz` desde studio autenticado. Guardar fuera de Git y del hosting. Ensayar `sanity dataset import` en un dataset de prueba si el plan lo permite; no restaurar sobre producción sin revisión. Confirmar periodicidad, retención y responsable con la institución.

Dependencias fijadas en `studio/package-lock.json`. Se corrigieron tres avisos altos mediante overrides acotados de transitivas. La revisión inicial conserva 13 avisos moderados en herramientas/dependencias de Sanity; revisar antes de actualizar y no ejecutar `npm audit fix --force` (propone bajar de versión y no garantiza resolver). No afirmar ausencia total de vulnerabilidades. CI comprueba audit con umbral alto, tipos y build del Studio además de los controles del sitio.

## Evidencia del 3/11/2026

- CLI autorizado con GitHub y Studio desplegado; interfaz en español comprobada en navegador con las cuatro reseñas.
- Consulta anónima y build reales: cuatro publicaciones; 25 páginas contando 404 y fotografías optimizadas.
- Borrador técnico temporal: accesible con sesión, ausente en consulta anónima; eliminado al terminar.
- Ocho pruebas de normalización: campos incompletos, slugs inválidos/duplicados, imágenes externas, enlaces inseguros, borradores/rutas privadas y lista vacía.
- Verificación de Publish → web pública pendiente de conexión y despliegue; no se presenta como completada.

Referencias: [IDs y rutas de Sanity](https://www.sanity.io/docs/content-lake/ids), [Astro estático y actualizaciones](https://www.sanity.io/docs/astro/static-and-server-rendering), [planes y roles](https://www.sanity.io/pricing).

Validación local final: 22 Node, fixture editorial aislada y 40 Chromium por cada modo CSP aprobados. CMS real: Inicio, índice y cuatro fichas en 1280/390 px con fotos locales, sin desbordes ni errores JS. Un dataset inexistente devuelve HTTP404 y detiene el build sin recuperación implícita. Formato: los archivos de esta rama se verifican; el chequeo global local también encuentra pnpm-lock.yaml preexistente y ajeno al lote, que se conserva sin editar. Los PDF se renderizaron completos; 145 campos y estados lógicos conservados.
