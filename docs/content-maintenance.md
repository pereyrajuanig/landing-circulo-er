# Mantenimiento de contenido

## Dónde editar hoy

| Contenido | Archivo |
| --- | --- |
| Nombre, metadatos, historia, correo, dirección y Maps | src/content/institution.json |
| Servicios, descripción, CTA y asunto | src/content/services.json |
| Filiales | src/content/branches.json |
| Destinos y descripción de alojamientos | src/content/stays.json |
| Bienvenida, mensajes y títulos editoriales | src/components/*.astro |
| Paleta y composición | src/styles/styles.css y warmth.css |
| Escudo | public/assets/escudo.png |

Los JSON son arrays de objetos con id único, estable y sin tildes. Las colecciones de listas usan order (entero desde 0); mantenerlo único por lista para ordenar de forma predecible. No hace falta modificar el script al cambiar filiales o destinos.

En servicios, target es email con subject obligatorio, o alojamiento para enlazar a esa sección. initiallyOpen controla el estado inicial. Correo y dirección central se reutilizan desde institution.json.

## Secuencia

1. Confirmar datos con el responsable institucional.
2. Editar el archivo de contenido en una rama codex/*.
3. Revisar npm run dev. Ejecutar npm run lint y npm test; el segundo incluye el build.
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
