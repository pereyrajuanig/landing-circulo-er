# Panel editorial institucional

## Alcance confirmado el 29/10/2026

El personal institucional administrará el contenido con un panel sencillo. El usuario indicó preparar la base y activarlo después porque todavía no existe una cuenta/proyecto disponible. Facebook será origen de las publicaciones que también se muestran en el sitio; enlace todavía pendiente.

El sitio sigue sin CMS, autenticación ni panel operativo. No hay formularios que guarden datos. La colección local news y las rutas editoriales preparan el frontend, sin simular una integración.

## Propuesta

Sanity Studio separado del sitio público, Astro estático y Vercel. [Sanity documenta la integración](https://www.sanity.io/docs/astro) y recomienda [Studio separado](https://www.sanity.io/docs/astro/embedding-studio-in-astro). No se contrataron planes ni se instalaron dependencias del proveedor. Confirmar costos, límites, titularidad y cantidad de editores al activarlo.

## Checklist de activación

- [ ] Definir cuenta institucional, responsable y recuperación de acceso.
- [ ] Crear proyecto/dataset, elegir plan y acordar permisos reales.
- [ ] Modelar beneficios, alojamientos, espacios, institución y publicaciones con campos confirmados.
- [ ] Validar imágenes, texto alternativo, enlaces, fechas y estados editoriales.
- [ ] Conectar un adaptador de lectura en build; las credenciales privadas permanecen en entorno de servidor.
- [ ] Comprobar borrador → revisión → publicación y quién puede realizar cada paso.
- [ ] Configurar build de Vercel por publicación editorial; proteger el webhook y evitar bucles.
- [ ] Ensayar errores de esquema y caída del CMS sin publicar contenido incompleto.
- [ ] Exportar y restaurar contenido de prueba; un rollback de Vercel no restaura el CMS.
- [ ] Capacitar al personal con una publicación real aprobada.

## Facebook

La conexión no está implementada. Se comprobará al recibir la página y el acceso; permisos y revisión de Meta pendientes de verificación. Mantener Facebook como fuente, identificadores estables y enlaces originales; evitar duplicar noticias importadas. Las condiciones de importación y moderación se documentan en [evolución del sitio](site-evolution.md).
