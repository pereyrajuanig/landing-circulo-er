# Etapa 07: seguridad y privacidad

Corte: 13/10/2026. Base main b263601, PR #8 integrado con autorización y CI de main38479593548 aprobado. Código de preparación 1e9938c. Cuatro tareas verificadas localmente; cierre del hosting y acuerdo institucional pendientes.

## Alcance

Landing Astro estática, sin API, base de datos, autenticación, reservas, formularios de envío ni CMS. Datos del buscador quedan en el campo de la página; selección de alojamiento modifica texto y enlace mailto. No hay uso de innerHTML para esas consultas. Texto y datos se sirven desde colecciones compiladas; correo y Maps son enlaces que el visitante decide abrir.

## Repositorio y build

Dossier original y .env no versionados; docs/reference ignorado. dist excluye .env, .git, docs, tools, config y package.json. npm run security:repo revisa textos rastreados con patrones reconocibles de credenciales sin mostrar valores, además de la política y las exclusiones. No es un análisis de historial, de binarios ni una garantía de ausencia de toda clase de secreto. La revisión no accede a otros materiales del Escritorio ni a cuentas de visitantes.

npm audit actualizado: cero vulnerabilidades conocidas en el reporte recibido. Sin actualización de versiones ni dependencias npm nuevas. CI añade npm audit --audit-level=high; revisar alertas y su impacto, no ejecutar actualizaciones forzadas automáticamente.

## Recursos y privacidad observada

Fuentes WOFF2, CSS, script e imágenes del mismo origen. No Google Fonts remoto, embeds de Maps, analítica ni widgets incorporados. En contextos nuevos, después de filtrar y elegir alojamiento, pruebas comprobaron cero cookies y claves de localStorage/sessionStorage, bases IndexedDB y service workers. No se abren correo ni Maps ni se envían mensajes durante la prueba. El enlace Maps conserva noopener noreferrer.

Esto describe el código y la prueba local. El proveedor futuro puede procesar solicitudes y registros técnicos; revisar la configuración real, cookies o funcionalidades añadidas antes de aprobar un aviso institucional. Inventario para decisión del responsable: privacy-review.md.

## Headers preparados

vercel.json configura la regla /(.*):

| Header                              | Configuración                                                       | Propósito                                                              |
| ----------------------------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| X-Content-Type-Options              | nosniff                                                             | Respetar el tipo MIME servido.                                         |
| Referrer-Policy                     | no-referrer                                                         | No enviar la URL de origen al navegar a otro sitio.                    |
| Permissions-Policy                  | camera, microphone, geolocation y payment deshabilitados            | La landing no usa esas capacidades. No altera Maps en su propio sitio. |
| X-Frame-Options                     | DENY                                                                | Evitar que otros documentos inserten la landing en un iframe.          |
| Content-Security-Policy-Report-Only | Recursos propios, hash del script inline; sin eval ni unsafe-inline | Observar incompatibilidades antes de exigir CSP en hosting.            |

El preview aplica los mismos valores en la portada y recursos; comprobados por HTTP, MIME y navegador. Limitación observada: Astro preview 7.3.8 no aplica server.headers a su fallback 404. No se modifica Astro ni se toma este servidor como Vercel. Revisar headers en portada, assets y rutas 404 después de publicar.

## CSP y mantenimiento

Un script inline compilado, autorizado mediante SHA-256 exacto. style/img/font/default solo self; connect/object/form ninguno; base self y frame-ancestors none. No report-uri ni report-to apuntando a un servicio inventado; observación en consola y eventos del navegador, sin colector automático.

CSP Report-Only no bloquea por sí sola. La prueba controlada inserta un script inocuo: se ejecuta y genera disposición report en modo Report-Only; se bloquea y genera enforce en modo exigido local. Los flujos normales no produjeron violaciones en los casos revisados. TEST_CSP_ENFORCE=true pertenece al servidor de pruebas; vercel.json sigue Report-Only.

npm run build comprueba que los hashes del HTML coinciden con la política. Ante un cambio revisado del script: npm run security:update genera el build y actualiza únicamente la CSP, conservando otros headers; revisar diff, ejecutar npm run validate y seguir rama/PR/merge autorizado. Si se cambia un recurso, directiva o funcionalidad, revisar el inventario completo. No agregar unsafe-inline/unsafe-eval para silenciar un fallo.

## Comprobaciones y pendientes

51 ejecuciones aprobadas localmente: 11 Node, 20 Chromium Report-Only y los mismos 20 con CSP exigida. Se conservan los flujos de teclado, filtro, alojamiento, servicios, reflujo y 404, con fuentes locales cargadas. Tipos:31 archivos sin diagnósticos, lint y formato correctos. La 404 mantiene estado404; sus headers de hosting aún sin probar.

- 07.01: verificada, exclusiones y detección acotada.
- 07.02: verificada, auditoría actualizada.
- 07.03: verificada, inventario y almacenamiento local comprobados.
- 07.04: preparada y probada parcialmente en preview; hosting/404 pendiente.
- 07.05: definida y probada localmente en Report-Only antes del modo exigido. Verificación y eventual exigencia en hosting requieren decisión posterior.
- 07.06: pendiente, dominio, certificado, redirecciones y HSTS. No se configura includeSubDomains ni preload sin revisar el dominio y su recuperación.
- 07.07: inventario técnico preparado; responsable, tratamiento y textos institucionales sin acordar. No se publica política de privacidad en esta tarea.

Lector real03.06, dominio y datos de rendimiento de campo continúan pendientes. No hay despliegue ni declaración de conformidad legal o certificación de seguridad. Registro compacto: stage-07-evidence.json.

## Verificación cuando haya hosting

Con despliegue autorizado, comprobar HTTPS/certificado/redirecciones, portada, CSS, fuentes, imágenes, sitemap/robots y una URL inexistente. Verificar headers de todas esas respuestas y que 404 siga404. Revisar CSP Report-Only con herramientas del navegador, incluidos los scripts que agregue el proveedor, y registrar commit/URL/fecha. Resolver incompatibilidades con cambios revisados antes de proponer CSP exigida. Acordar HSTS con alcance y recuperación; confirmar cookies, logs, servicios y aviso institucional.

Referencias consultadas el13/10/2026: [Vercel headers](https://vercel.com/docs/project-configuration/vercel-json#headers), [CSP Report-Only](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy-Report-Only). El comportamiento de preview se inspeccionó en la dependencia instalada de Astro y se comprobó mediante HTTP; no acredita comportamiento del hosting.

El chequeo de textos rastreados requiere Git y se ejecuta en validate/CI por separado. npm run build valida el HTML, los hashes y las exclusiones de dist sin depender de metadata Git, de modo que también puede construir una copia de fuentes sin .git.

Código1e9938c: [quality aprobado](https://github.com/pereyrajuanig/landing-circulo-er/actions/runs/38483690426). Revisión del repositorio en validate/CI; control de build sin Git probado con PATH vacío en proceso hijo. Hosting sigue pendiente.
