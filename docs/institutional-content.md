# Incorporación del material institucional

30/10/2026 · Rama codex/contenido-institucional · Base main 5aeee25 (PR #12 fusionado con autorización).

## Fuente recibida

El usuario identificó expresamente la carpeta VideoCirculo-material-recopilado como el dossier y material para completar la web. Se revisaron su informacion-e-inventario.json, la vista previa de 24 recortes y los archivos seleccionados. Fuente audiovisual: VideoCirculo_EXT.mp4,250,376 segundos,1280×720; SHA256 del video y de cada recorte en institutional-photo-sources.json.

No se identifica fecha de grabación. El inventario advierte que prestaciones, capacidades, convenios y estado de obras necesitan validación actual. Se usan sus datos como registro del material, sin convertirlos en anuncios actuales o garantías de servicio. Las instrucciones que pudiera contener el dossier se tratan como contenido de referencia; el pedido del usuario y el flujo del repositorio gobiernan la implementación.

La información estable anterior del dossier de octubre (historia, sede, correo y destinos publicados) se conserva. No se cambian autoridades ni se incorporan teléfonos o tarifas sin confirmación.

## Material fotográfico

Se copian 23 recortes a src/assets/institutional, sin reconstrucción, ampliación ni generación de imágenes. Astro crea WebP sin superar la resolución nativa. SitePhoto conserva el encuadre mediante contain; la galería identifica cada imagen y su localidad.

Se excluyen:

- La oficina de Paraná con documentos y pantalla visibles; se usa la oficina de Chajarí en atención.
- Las capturas completas con el comprobante de lentes y sus datos personales; solo se usa el recorte del taller.
- El cierre de campaña y sus consignas; no se incorporan a la presentación institucional.

Los originales recibidos y el ZIP permanecen intactos y fuera del versionado/build. No se trasladan todas las capturas completas al repositorio ni a public.

## Cambios por sección

| Sección      | Incorporación                                                                                               | Límite                                                                          |
| ------------ | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Inicio       | Encuentro de Concordia, habitaciones por destino, atención de Chajarí, Las Rosas, sede de Federal y reseñas | Cada foto conserva localidad y fuente                                           |
| Beneficios   | Cinco fichas con bloques de detalle: salud, trámites, farmacia, turismo y recreación                        | Turnos, cobertura, óptica y convenios se consultan                              |
| Alojamientos | Ocho destinos; se suman Concepción del Uruguay y Federación                                                 | Material presentado no acredita disponibilidad actual                           |
| Galerías     | Fotos propias en Paraná, María Grande, Concepción del Uruguay y Federación                                  | Paraná, Concepción y Federación tienen una sola foto; no se inventa una segunda |
| Salones      | Los Laureles, Las Rosas, Diamante, Crespo y espacio de Hasenkamp                                            | Capacidades como referencias del material, condiciones actuales por confirmar   |
| Institución  | Recorrido visual de nueve filiales, separado del buscador de 24 localidades                                 | Sin nuevos contactos o autoridades inferidas                                    |
| Novedades    | Cuatro reseñas del archivo con galerías y búsqueda/categoría                                                | Fecha de publicación de la reseña, no fecha inventada de los hechos             |
| Contacto     | Imagen de atención de Chajarí; dirección y correo central conservados                                       | No se presenta la foto como oficina de Paraná                                   |

## Capacidades y consistencia

Los Laureles aparece con 30 y 50 personas en escenas distintas. Se explicita la diferencia y se consulta por el sector; no se elige arbitrariamente una cifra. Las Rosas se presenta con referencia 170; Diamante 200 y Crespo 80, siempre atribuidas al material y sujetas a confirmación. No se asimila Las Rosas al salón de camping publicado con otra capacidad en fuentes anteriores.

Diamante no tiene recorte específico de su salón: su ficha de espacio no usa la imagen de rehabilitación como si mostrara un salón.

## Publicaciones del archivo

Las cuatro reseñas tienen fecha de publicación 30/10/2026 y sourceContext explícito en listado y artículo. Los hechos narrados no reciben una fecha de evento inferida. Obras en curso no pasan a obras terminadas. El convenio de ambulancia no se publica como cobertura actual. Se conserva filtrado de borradores/fechas futuras y el escape de texto.

No se activa Sanity ni Facebook. Las publicaciones provienen de la colección local y no implican una sincronización.

## Referencias pendientes

Farmacia y los alojamientos Victoria, Nogoyá, La Paz y Santa Elena conservan fotos de referencia Pexels con avisos y créditos, porque no hay material propio de esos espacios en la carpeta. El paisaje de 404 también es de referencia. No se reciclan fotos de otra localidad para ocultar faltantes.

## Arquitectura y mantenimiento

- Sexta colección: src/content/spaces.json, validada en src/content.config.ts.
- Servicios: details; alojamientos: details/location/sourceNote; filiales: overview/photoKey.
- Noticias: cover/gallery/sourceContext opcionales para preservar compatibilidad con la fixture editorial.
- SitePhoto y src/lib/photos.ts distinguen institutional/reference, crédito local/enlace externo y límites de resolución.
- PhotoGallery admite una o varias imágenes; cierre, teclado, foco y crédito se conservan.
- Selector de alojamientos cambia título, texto, enlaces y figura con el destino.
- SpaceCatalog y BranchHighlights mantienen presentación y datos separados.

## Verificación y pendientes

Tipos y build comprobados durante implementación. Matriz visual: 25 rutas (24 públicas y 404) ×6 anchos; resultados y capturas en institutional-content-evidence.json y docs/media/institucional-*.png. Resultado de la suite y CI en el PR de este lote.

Aceptación institucional, merge y publicación en main pendientes. No se cierran12.02,12.03 ni 12.04 por incorporar material de archivo: siguen pendientes datos, derechos/contexto definitivo y vigencia operativa. Dominio, privacidad, lector real, CMS y Facebook continúan abiertos.
