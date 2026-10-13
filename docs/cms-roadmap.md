# Próxima fase: edición institucional

## Base disponible

La landing usa cuatro colecciones de Astro con datos JSON y esquemas. Componentes y scripts consumen esas colecciones. Esta separación facilita cambiar la fuente por un CMS; hoy las ediciones se realizan en archivos y se publican mediante un build.

## Decisiones con la institución

- Quién redacta, quién aprueba y quién puede publicar.
- Campos editables: contacto, servicios, filiales, alojamiento y futuras noticias; definir cuáles necesitan fecha de vigencia y fuente.
- Volumen de imágenes, derechos de uso y responsables del texto alternativo.
- Frecuencia de edición y necesidad de vista previa de borradores.
- Presupuesto, titularidad de cuenta, respaldo y mantenimiento del servicio.

Astro no incluye un panel por sí solo. No se eligió ni contrató un proveedor de CMS. Comparar opciones cuando estén definidos esos requisitos; el modelo actual no promete compatibilidad automática con cualquier servicio.

## Integración propuesta

1. Definir el modelo editorial y permisos con contenido real aprobado.
2. Configurar el CMS y credenciales de lectura en el entorno de build, nunca en JavaScript del navegador.
3. Adaptar los loaders de las colecciones manteniendo el contrato de datos de los componentes.
4. Validar borradores, esquemas y acciones antes de publicar; probar en previews.
5. Activar el build de Vercel por publicación editorial mediante un webhook del proveedor.
6. Documentar recuperación de contenido y del despliegue: volver a un build anterior no revierte por sí solo una edición en el CMS.

Las novedades se incorporarán en una tarea posterior con listado y páginas individuales cuando haya una necesidad acordada. No se agregaron noticias ficticias ni un panel vacío.

Referencia: [CMS en Astro](https://docs.astro.build/en/guides/cms/).
