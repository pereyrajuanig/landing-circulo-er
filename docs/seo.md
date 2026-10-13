# SEO y dominio pendiente

Corte: 13/10/2026. El usuario pidió continuar y dejar el dominio para decisión de las autoridades. Preferencia de extensión: .com.ar. Ningún nombre está confirmado ni registrado por esta tarea.

## Configuración

SITE_URL es el origen HTTPS aprobado, sin ruta, query ni credenciales. SEO_INDEXABLE=true habilita indexación solo con SITE_URL. VERCEL_ENV=preview siempre fuerza noindex. Sin variables, el build es una preview no indexable: no canonical ni og:url ni sitemap. robots.txt permite rastreo para que el buscador pueda leer noindex; no es control de acceso.

Estas variables se leen del entorno del proceso de build. No se requiere archivo .env. Configurarlas en la cuenta de hosting una vez confirmado el dominio; reservar SEO_INDEXABLE=true para producción. Un build sin dominio que intenta indexarse falla explícitamente. No configurar la URL privada histórica de Sites.

El layout conserva title y description de la colección institucional, con propiedades por página. Incluye Open Graph, es_AR, tarjeta Twitter y textos alternativos. La imagen PNG de 1200 × 630 está preparada en public/assets/social-card.png, usando escudo, fuentes y mensaje existentes. Las URLs absolutas de imagen se emiten cuando SITE_URL existe. Generador opcional: tools/docs/build_social_card.py, Pillow y fuentes locales; no dependencia de la web.

El sitemap de producción enumera únicamente la portada, ruta pública actual. La 404 tiene noindex, enlaces al inicio y contacto; debe mantener estado HTTP 404. No cambiar esto por una redirección global a la portada.

## Datos estructurados

Se evaluó Organization. No se agrega JSON-LD todavía: nombre, domicilio y correo proceden del dossier, pero su vigencia institucional y dominio todavía requieren confirmación. No declarar GovernmentOrganization, autoridades, teléfonos, horarios, perfiles sociales ni reservas que no estén confirmados. Incorporar solo datos validados, coherentes con el contenido visible.

## Pendientes de cierre

- 05.01: dominio, titular institucional y política de redirecciones.
- 05.02 / 05.03 / 05.04: código preparado; verificación con URL real pendiente.
- 05.05: 404 verificable en build y preview local.
- 05.06: evaluación completada; datos institucionales por confirmar antes de publicar JSON-LD.
- 05.07: despliegue autorizado, rastreo real, redirecciones, indexabilidad y Search Console en cuenta institucional. No confundir validación local con indexación efectiva.

## Referencias

[Astro site](https://docs.astro.build/en/reference/configuration-reference/#site), [Google noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing), [Google Organization](https://developers.google.com/search/docs/appearance/structured-data/organization). Consultadas el 13/10/2026.

## Evidencia técnica

Código a154e70, [PR #7](https://github.com/pereyrajuanig/landing-circulo-er/pull/7), [quality aprobado](https://github.com/pereyrajuanig/landing-circulo-er/actions/runs/38464271027). Astro check: 26 archivos sin diagnósticos; lint y formato correctos. Diez pruebas Node y dieciséis Chromium aprobadas localmente y en Ubuntu CI. CI también valida builds de producción y preview con example.invalid. Capturas 404: docs/media/etapa05-404-desktop.png y etapa05-404-mobile.png; fuentes de respaldo en e2e. No prueba indexación real ni lectores de pantalla.
