# Mantenimiento de contenido

## Dónde editar hoy

| Contenido                                             | Archivo                            |
| ----------------------------------------------------- | ---------------------------------- |
| Nombre, metadatos, historia, correo, dirección y Maps | src/content/institution.json       |
| Servicios, descripción, CTA y asunto                  | src/content/services.json          |
| Filiales                                              | src/content/branches.json          |
| Destinos y descripción de alojamientos                | src/content/stays.json             |
| Bienvenida, mensajes y títulos editoriales            | src/components/*.astro             |
| Paleta y composición                                  | src/styles/styles.css y warmth.css |
| Escudo                                                | public/assets/escudo.png           |

Los JSON son arrays de objetos con id único, estable y sin tildes. Las colecciones de listas usan order (entero desde 0); mantenerlo único por lista para ordenar de forma predecible. No hace falta modificar el script al cambiar filiales o destinos.

En servicios, target es email con subject obligatorio, o alojamiento para enlazar a esa sección. initiallyOpen controla el estado inicial. Correo y dirección central se reutilizan desde institution.json.

## Secuencia

1. Confirmar datos con el responsable institucional.
2. Editar el archivo de contenido en una rama codex/*.
3. Revisar npm run dev. Ejecutar npm run validate; incluye tipos, lint, formato, build y tests.
4. Comprobar búsqueda, destino inicial, selector y enlaces de correo. Los tests comparan el texto y las anclas con una referencia; para un cambio editorial intencional, revisar la preview y ejecutar npm run test:update. Revisar el diff de tests/fixtures/landing-contract.json y volver a ejecutar npm test. No actualizar la referencia para ocultar una regresión.
5. Presentar el PR; merge y publicación requieren autorización según el flujo del proyecto.

Los esquemas de src/content.config.ts rechazan campos obligatorios vacíos, correo inválido y acciones incompletas. La validación técnica no confirma la vigencia institucional.

## Fuente y vigencia

La base procede del dossier entregado, con corte del 8/10/2026. Confirmar autoridades, contactos, horarios, especialidades, convenios, reintegros, farmacia, alojamiento y reglamentos. Registrar responsable y fecha de revisión al incorporar contenido variable.

No publicar tarifas, teléfonos o cobertura inventados. Las reservas se coordinan con la institución; la landing no confirma disponibilidad.

## Fotos y lenguaje

Usar fotos propias o autorizadas de sede y actividades. Mantener voseo respetuoso y descripciones concretas. Confirmar la preferencia entre socios, integrantes o afiliados.

El dossier original se conserva únicamente en docs/reference/, excluido de Git y del build. Las guías y el manual generado forman parte de la documentación del proyecto.

El [futuro CMS](cms-roadmap.md) requiere definir editor, permisos y publicación. No hay panel editorial ni cuentas de usuarios implementadas en esta migración.

## Publicaciones y fichas en la propuesta multipágina

Las fichas de servicios y destinos reutilizan sus colecciones. src/content/news.json queda vacío hasta recibir publicaciones aprobadas. Cada noticia requiere id con minúsculas/números/guiones, title, summary, category (noticia/logro), status (draft/published), publishedAt ISO con zona horaria y body como lista de párrafos. facebookUrl es opcional y solo admite HTTPS de Facebook sin credenciales.

Solo published con fecha no futura genera artículos y aparece en los listados. El corte ocurre en build: una fecha futura no publica automáticamente sin nueva construcción. No pegar HTML ni tokens. El texto se escapa al renderizar. El modelo actual admite párrafos; galerías y texto enriquecido requieren una extensión revisada.

Editar JSON sigue siendo el mecanismo actual. El panel y la importación de Facebook aún no están conectados; ver cms-roadmap.md y site-evolution.md.

## Fotografías de referencia

src/assets/reference contiene12 fotos descargadas de Pexels. No documentan instalaciones ni integrantes del Círculo. Mantener avisos y créditos de ReferencePhoto/PhotoGallery; fuentes y licencia en photo-sources.json y photo-sources.md. Antes de incorporar material real, confirmar derechos, destino y contexto; actualizar alt/epígrafes y retirar avisos solo de las imágenes verificadas. Las tareas 12.03 y 12.04 continúan abiertas. No generar imágenes: el usuario pidió buscarlas en internet.

## Lote institucional · fuente vigente

Ver institutional-content.md e institutional-photo-sources.json. Fotografías propias en src/assets/institutional; SitePhoto y src/lib/photos.ts reemplazan ReferencePhoto/reference-photos. No quitar avisos de referencias que todavía esperan fotos reales. spaces.json mantiene los cinco espacios y sus notas de capacidad. services.details y stays.details amplían fichas sin duplicar textos en los componentes.

Las reseñas publicadas usan fecha de publicación del texto y sourceContext; no asignar esa fecha a los hechos del video. Noticias no está vacía desde este lote. El panel y Facebook continúan pendientes. Confirmar derechos, vigencia, capacidades y condiciones institucionales antes del cierre final.
