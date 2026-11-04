# SEO y dominio oficial

El origen público es [www.circulopoliciaer.com.ar](https://www.circulopoliciaer.com.ar/). Para el diagnóstico, la evidencia inicial y el plan de seguimiento, consultá la [auditoría del 4 de noviembre de 2026](auditoria-seo-2026-11-04.md).

## Entornos

| Entorno                      | Configuración y salida                                                                                                                                                                                               |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Vercel Production            | `SITE_URL` usa por defecto el origen oficial. Si está definido, debe coincidir con ese origen. `SEO_INDEXABLE=true` habilita canonical, metadatos de indexación, datos estructurados de Inicio y sitemap.            |
| Vercel Preview y Development | Fuerzan `noindex, follow`, sin canonical ni sitemap. Usar además la protección de Vercel cuando corresponda.                                                                                                         |
| Build local                  | Sin variables genera una salida no indexable. Para simular producción usar `SITE_URL=https://www.circulopoliciaer.com.ar` y `SEO_INDEXABLE=true`. Un origen de prueba permite validar el build sin modificar el DNS. |

`robots.txt` permite el rastreo para que los buscadores puedan leer `noindex`. El alias público `landing-circulo-er.vercel.app` recibe `X-Robots-Tag: noindex, follow` mediante una regla exacta de Vercel. Confirmar la cabecera en el alojamiento real tras publicar.

## Metadatos y descubrimiento

- `BaseLayout.astro` centraliza idioma, canonical, Open Graph, Twitter Cards y los nodos JSON-LD de la portada. `SitePage.astro` admite un título y descripción para buscadores independientes de los textos visibles.
- En el build indexable, `/sitemap-index.xml` enumera el sitemap de páginas generado por Astro. `/sitemap.xml` sigue disponible como índice equivalente. Las páginas 404, los borradores y las publicaciones futuras quedan fuera.
- El favicon de todas las páginas se sirve en la ruta estable `/favicon.png`. Es una versión cuadrada de 96 × 96 del escudo oficial.
- La tarjeta social institucional se sirve desde `public/assets/social-card.png`. Su generador opcional es `node tools/docs/build_social_card.mjs`.
- En una nueva ficha, usar datos verificados y una descripción propia. Incorporar solo perfiles y contactos confirmados a los datos estructurados.

## Control de publicación

1. Ejecutar `npm run build` y `npm run test:unit` con las variables del entorno objetivo.
2. Tras el despliegue autorizado, comprobar el HTTP 404 real, los 308 hacia HTTPS con `www`, las cabeceras del alias y el HTML del host oficial.
3. En Search Console, enviar el nuevo índice e inspeccionar páginas clave. Conservar el envío anterior hasta confirmar que Google lee el nuevo. Registrar por separado rastreabilidad, indexación y rendimiento en búsquedas.
