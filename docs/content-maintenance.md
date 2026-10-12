# Mantenimiento de contenido

## Dónde editar

| Contenido | Archivo / lugar |
| --- | --- |
| Historia, misión, servicios y contacto | `src/index.html` |
| Listado de filiales | `#branch-list` en HTML |
| Destinos de alojamiento | Botones `data-stay` en HTML y `stayCopy` en `src/app.js` |
| Paleta y diseño | `src/styles.css` y `src/warmth.css` |
| Escudo | `src/assets/escudo.png` |

Después de cambiar un destino, comprobar que el nombre coincida en HTML y JS, el panel cambie correctamente y el asunto de correo sea el esperado.

## Fuente y vigencia

La base institucional procede del dossier entregado por el usuario, con corte del 8/10/2026. No asumir como vigentes todos los datos históricos.

Confirmar autoridades, contactos de filiales, horarios, especialidades, convenios, reintegros, condiciones de farmacia y beneficios, alojamiento y reglamentos de espacios. Añadir un responsable y fecha de revisión al incorporar contenido variable.

No publicar tarifas, teléfonos o cobertura inventados. No presentar reservas como confirmadas desde esta landing: se coordinan con la institución.

## Fotos y lenguaje

Usar fotos propias o autorizadas de la sede y las actividades. Mantener voseo respetuoso, mensajes de orientación y descripciones concretas. La institución debe confirmar si prefiere «socios», «integrantes» o «afiliados».

Al agregar formularios o un CMS se abre una nueva tarea de arquitectura: datos, acceso, tratamiento, envío, errores y mantenimiento deben definirse antes de implementarlos.

El dossier original se conserva solo localmente en docs/reference/ y está excluido de Git. Las guías y el PDF de diseño se versionan como documentación del proyecto.
