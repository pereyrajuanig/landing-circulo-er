# Despliegue y recuperación

## Entornos

| Entorno         | Uso                               | Estado                                                  |
| --------------- | --------------------------------- | ------------------------------------------------------- |
| npm run dev     | Astro local con recarga           | Disponible                                              |
| npm run preview | Salida estática local             | Requiere build                                          |
| GitHub          | Fuente, documentación y controles | Repositorio de portfolio existente                      |
| Vercel          | Hosting previsto de producción    | Configuración preparada; cuenta y proyecto sin conectar |
| Sites histórico | Referencia privada de diseño      | Conserva su publicación anterior                        |

## Configuración de Vercel

vercel.json está versionado con framework astro, installCommand npm ci, buildCommand npm run build y outputDirectory dist. Usar Node 24, raíz del repositorio y conectar pereyrajuanig/landing-circulo-er. La salida es estática; no necesita @astrojs/vercel ni funciones Node.

La configuración se comprobó mediante build local. No se ha creado un proyecto de Vercel ni confirmado un despliegue real. Sin secretos. Para indexar producción: SITE_URL con el origen HTTPS aprobado y SEO_INDEXABLE=true, solo en entorno de producción. VERCEL_ENV=preview conserva noindex. Ver [SEO](seo.md).

## Primera publicación

1. Aprobar y fusionar la migración mediante PR con quality aprobado.
2. Autorizar la publicación y conectar el repositorio en la cuenta de Vercel correspondiente.
3. Elegir main como rama de producción y verificar los valores de vercel.json y Node 24.
4. Revisar la preview antes de publicar: escritorio, móvil, enlaces y contenido confirmado.
5. Configurar el dominio real. Configurar SITE_URL y SEO_INDEXABLE=true cuando se conozca ese dominio; verificar canonical, metadatos sociales y sitemap generados; no usar la URL privada histórica como dominio de producción.
6. Confirmar el estado del despliegue y comprobar la URL publicada. Registrar commit, dominio y fecha.

Vercel puede producir previews para ramas y PR mediante su integración Git. Una vez conectado, los cambios en la rama de producción pueden disparar despliegues automáticamente. Confirmar ese comportamiento antes de activar la integración; GitHub Actions por sí solo no publica la web.

## Recuperación

En GitHub, revertir la tarea mediante rama y PR sin reescribir historial. En Vercel, restaurar un despliegue anterior o publicar el revert según el flujo autorizado. Verificar la URL y el contenido tras la recuperación.

No hay bases de datos ni migraciones. Cuando se añada un CMS, recuperar un build no revertirá los registros editoriales.

## Referencia de Sites

.openai/hosting.json conserva appgprj_6ac91d0b16288191855648c8ff952d2b. No cambiar su audiencia privada ni crear otro Site. La fuente visual anterior conserva el commit de origen Sites 648e72f7daca19a45c00ae5fc82427d385cce449. La migración local no sincroniza ni despliega en Sites.

Referencias: [Astro estático en Vercel](https://docs.astro.build/en/guides/deploy/vercel/), [integración Git de Vercel](https://vercel.com/docs/git), [configuración de build](https://vercel.com/docs/builds/configure-a-build).

## Headers y privacidad pendientes de hosting

vercel.json prepara headers y CSP Report-Only. Antes de exigir CSP, revisar preview real y scripts del proveedor; portada, recursos y404 deben servir los headers esperados. Astro preview no aplica server.headers a fallback404; no usarlo como verificación de Vercel. HTTPS/certificado/redirecciones y HSTS dependen del dominio. Revisar cookies/logs del hosting y acuerdo institucional de privacidad. Detalles: [seguridad](security-privacy.md).
