# Publicación para revisión en Vercel

Fecha: 13/10/2026 (Argentina). [Abrir la landing](https://landing-circulo-er.vercel.app/).

El usuario autorizó desplegar para recibir comentarios. Contenido y secciones quedan pendientes hasta que reúna la información y la institución los defina. No constituye aceptación ni lanzamiento institucional definitivo.

## Despliegue comprobado

- Proyecto: JuanIgnacioPereyra / landing-circulo-er; integración GitHub existente reutilizada.
- Commit: e1e830ba7800a0076ce1e7949c21669cf605e51b; [quality de main aprobado](https://github.com/pereyrajuanig/landing-circulo-er/actions/runs/38485087460).
- Deployment: dpl_2zr9ExH7aj79CDNWKQw658fNBAVL; estado Ready.
- Entorno técnico: Production, rama main. La URL estable permite revisión sin iniciar sesión. Previews de ramas conservan Standard Protection; no se deshabilitó.
- Astro, raíz ./, Node 24.x, npm ci, npm run build y dist comprobados en Vercel.
- Git conectado: cambios en main actualizan esta URL automáticamente; ramas generan previews. Se mantiene PR y merge autorizado. El despliegue inicial ya fue autorizado por el usuario.

## Verificación pública

Portada200, robots200, CSS/imágenes/fuentes200; ruta inexistente404 con la página institucional. Dossier local404. HTTPS validado con confianza del sistema y redirección HTTP a HTTPS. Headers configurados presentes en portada, recursos y404; CSP sigue Report-Only. HSTS enviado por Vercel en vercel.app, sin cambiar política del futuro dominio.

HTML con noindex, follow; sin canonical ni sitemap (404), coherente con dominio pendiente. Noindex no es un control de privacidad: cualquiera con la URL puede ver esta versión. Navegador: filtro MARIA, alojamiento María Grande y menú móvil390x844 comprobados; consola sin avisos/errores observados. No se enviaron consultas ni se activaron Analytics o Speed Insights. Evidencia: vercel-preview-evidence.json.

## Próximos cambios y recuperación

Reunir contenido y definir secciones con las autoridades; volver a etapa08 y ajustar en rama/PR. Revisar la preview del PR; merge autorizado a main actualiza la URL estable. No habilitar indexación ni configurar SITE_URL hasta acordar dominio y lanzamiento.

Este es el primer despliegue: todavía no hay una versión anterior para rollback. Guardar este deployment como referencia; tras cambios, Vercel ofrece Rollback en el proyecto. Para revertir código: rama, git revert, PR y merge autorizado, sin reescribir historial.

Dominio institucional, privacidad, prueba real con lector, aceptación editorial y métricas de campo pendientes. La etapa09 permanece parcial. Sites histórico conserva ID y acceso privado.
