# Pruebas del proyecto

## Preparar y ejecutar

Usar Node 24.16 o posterior dentro de la rama 24. npm ci instala las herramientas; el navegador de pruebas se prepara por separado una vez por instalación de Playwright.

```powershell
npm ci
npm run test:install
npm run validate
```

En Linux, instalar también bibliotecas del sistema con npx playwright install --with-deps chromium. CI ya ejecuta esa preparación. Playwright 1.64.0 se fija en devDependencies y lockfile; no forma parte del código servido al visitante.

| Comando           | Alcance                                                                |
| ----------------- | ---------------------------------------------------------------------- |
| npm test          | Build nuevo, once tests Node y veinte casos Chromium por cada modo CSP |
| npm run test:unit | Once tests sobre un build ya generado y vigente                        |
| npm run test:e2e  | Build nuevo y veinte casos Chromium                                    |
| npm run validate  | Tipos, lint, formato y toda la suite anterior                          |

Astro admite un solo preview por checkout. Cerrar el preview de revisión antes de ejecutar la suite. Playwright inicia el suyo en 127.0.0.1:4175, exige que esté libre y lo cierra al terminar. El runner no reutiliza una instancia que pueda estar sirviendo otro build. El preview de los tests Node usa un puerto asignado por el sistema y también se cierra.

## Cobertura

Los siete tests Node originales conservan texto/anclas, datos, búsqueda, codificación del correo, respuestas HTTP/MIME, exclusión de archivos internos y contrato accesible del HTML.

Tres tests adicionales comprueban configuración SEO, rastreo y 404. Un test adicional comprueba headers en portada y recursos. Playwright ejecuta diez casos por proyecto y modo CSP en dos proyectos Chromium: escritorio 1440×900 y móvil emulado 390×844. Comprueba salto, navegación, menú, Escape, foco, filtro, seis alojamientos, servicios, enlaces y 404. La prueba de cambios de ancho agrega 1024×768, 640×360 y 320×800.

Cada caso parte de un contexto aislado. Usa locators por rol/etiqueta o estructura HTML nativa; expect espera estados observables. No hay pausas fijas, retries ni selección automática de nuevos snapshots para ocultar una regresión. Antes de encadenar saltos por teclado se espera la posición del primer destino, no solamente su foco.

Se bloquean recursos externos en e2e: las dos fuentes locales se cargan y verifican antes de cada flujo. Correo y Maps se verifican como destinos; las pruebas no activan esos enlaces externos. Errores de JavaScript o fallos de recursos locales hacen fallar el caso. Los datos son los institucionales existentes, sin credenciales ni cuentas autenticadas.

## Diagnosticar un fallo

El código de salida distinto de cero hace fallar quality. El reporte HTML queda en playwright-report/ y el JSON en test-results/results.json. Para un caso fallido, se conservan captura, traza y contexto. Ambas carpetas están fuera de Git, tipos, lint, formato y build.

```powershell
npx playwright show-report
npx playwright show-trace "test-results/<caso>/trace.zip"
```

Esos comandos abren herramientas de revisión para el desarrollador. En GitHub, la acción fijada de upload-artifact guarda los reportes si falla el job, con retención de siete días. Un CI exitoso no carga esas carpetas. No depender de artefactos temporales para la evidencia permanente: registrar caso, commit, resultado y enlace en docs/.

Se comprobó ese circuito con un fallo real: [ejecución 38454238089](https://github.com/pereyrajuanig/landing-circulo-er/actions/runs/38454238089), artefacto 11840899174 descargado e inspeccionado. La versión corregida volvió a aprobar; ver [etapa 04](stage-04-testing.md).

## Límites

Estas pruebas cubren Chromium en Windows y Ubuntu, con emulación móvil; no equivalen a dispositivos físicos, Safari/Firefox, snapshots visuales, mediciones de rendimiento ni auditoría WCAG. El lector real de la tarea 03.06 sigue pendiente por decisión del usuario. Un texto editorial nuevo exige revisión del contrato; npm run test:update se utiliza solo después de aceptar ese cambio, no para hacer pasar una prueba fallida sin investigar.

Medición de laboratorio: npm run perf; detalles y límites en [etapa06](stage-06-performance.md). No se impone un umbral temporal inestable en CI.

Seguridad: la suite completa ejecuta 11 Node y20 casos Chromium Report-Only más20 exigidos localmente. Probe controlado comprueba detección/bloqueo; flujos normales sin violaciones. Cookies/almacenamiento vacíos en contextos nuevos. TEST_CSP_ENFORCE se usa solo en el servidor de pruebas. Guía: [seguridad y límites](security-privacy.md).

## Ampliación a sitio institucional

La suite vigente añade cobertura de publicación (borradores y fechas), navegación entre páginas, fichas, FAQ y enlace al alojamiento elegido. Son 13 Node +24 Chromium Report-Only +24 Chromium con CSP exigida local (61 ejecuciones). El validador recorre todo el HTML generado: h1, idioma, metadatos, referencias ARIA y recursos/anclas entre páginas.

La colección news vacía produce advertencias informativas de Astro; no se añaden noticias ficticias para eliminarlas. El CMS y la sincronización real con Facebook no se validan hasta conectarlos. Revisar fichas y listados con contenido real antes del lanzamiento.

La suite también ejecuta npm run test:editorial: construye una copia aislada en una carpeta temporal, con caché propia y contenido sintético; prueba artículos, categorías, búsqueda, escape de HTML, borradores y fechas futuras bajo CSP exigida. Cierra su navegador/preview y elimina solo la carpeta temporal verificada. No modifica news.json del proyecto ni publica ese contenido. La evidencia responsive de la propuesta recorre18 rutas ×6 anchos (108 verificaciones); ver site-evolution-evidence.json.

## Galería de muestras

La propuesta fotográfica suma un caso de ampliación, anterior/siguiente, flechas, Escape y retorno de foco, ejecutado en escritorio/móvil y ambos modos CSP. Total configurado:13 Node +26 Chromium por modo,65 ejecuciones más el flujo editorial aislado. El contrato editorial se actualiza por los rótulos de muestra y la composición de portada. La CSP incorpora el hash del script generado de galería, sin ampliar dominios.
