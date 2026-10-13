# Etapa 04 · Pruebas de los flujos

Fecha: 13 de octubre de 2026. Rama: codex/etapa-04-pruebas-flujos. Base: 480eaef8f44797fed5e62def3d56fc9de769e320. Código: 976292f4c27d27f64319ee6549abf1b9d66cc1db.

Siete tareas verificadas. Quality del código aprobado; PR e integración pendientes. La tarea 03.06 de lector real conserva su estado pendiente por decisión del usuario.

## Resultado

La validación ahora construye la landing y ejecuta siete pruebas Node y catorce casos en Chromium. Una regresión de los flujos hace fallar quality y genera evidencia de diagnóstico. No se modifica la composición, los textos ni las colecciones institucionales.

Playwright 1.64.0 y su Chromium 156.0.8078.4 son herramientas de desarrollo. Dos proyectos: 1440×900 y 390×844 móvil emulado, sin reintentos ni pausas fijas. Ambos usan el HTML de Astro build mediante Astro preview, con servidor propio en 4175 y recursos externos bloqueados. Los tests observan comportamiento y contenido; no llaman a la función que intentan verificar para calcular el resultado esperado.

| Flujo             | Resultado comprobado                                                            |
| ----------------- | ------------------------------------------------------------------------------- |
| Salto y contacto  | Tab/Enter enfocan main; siguiente Tab alcanza Hablemos; contacto queda visible  |
| Menú y navegación | Estado, apertura, Escape, cierre por enlace y Tab, destino y foco               |
| Filiales          | COLON con espacios, MARIA, ausencia de resultados, borrado y sede visible       |
| Alojamiento       | Seis destinos, Enter/Space, selección única, foco, título, descripción y asunto |
| Servicios         | Operación nativa por teclado, enlaces alcanzables y apertura múltiple           |
| Destinos          | Anclas existentes, CTA, correo, Maps y respuesta 404 sin enviar consultas       |
| Cambios de tamaño | Foco visible en ambos sentidos, menú 640×360 y reflujo 320×800                  |

## Regresión detectada y corregida

Primera ejecución local: trece casos aprobaron y uno falló al ampliar un viewport móvil. El botón Menú se ocultaba antes de que el listener de cambio de media query pudiera recuperar el elemento enfocado. Se agregó la transferencia al primer enlace visible cuando ese botón pierde foco al ocultarse. La prueba se conserva y pasó en Windows y Linux. La fuente de la interfaz cambia únicamente ese comportamiento.

En CI hubo además un fallo de sincronización del test de salto: el hash cambiaba a contacto, pero la navegación previa todavía podía estar desplazándose. Ahora se espera la posición observable del primer destino antes del siguiente salto; la comprobación de contacto visible permanece. Se investigó con la captura, el contexto y la traza de [CI fallido](https://github.com/pereyrajuanig/landing-circulo-er/actions/runs/38454238089). El artefacto 11840899174 se descargó e inspeccionó; retención de siete días. No se cambió la animación de la landing ni se aumentaron reintentos para pasar el caso.

## Validación

npm run validate aprobado localmente: 24 archivos sin errores, advertencias ni hints en Astro/TypeScript; ESLint sin advertencias; Prettier correcto; salida estática; siete tests Node y catorce Chromium aprobados, sin casos omitidos ni flaky. [Quality en Ubuntu](https://github.com/pereyrajuanig/landing-circulo-er/actions/runs/38455160742) aprobado para el código 976292f, con npm ci e instalación de Chromium. El commit documental final vuelve a pasar CI.

El servidor 4175 dejó de escuchar tras la suite. Astro permite un solo preview por checkout: para la revisión visual se abre una instancia después de los tests y se cierra al terminar. Los reportes generados quedan ignorados en Git y los diagnósticos; se comprobó que la preview no sirva pruebas, configuración ni reportes internos.

Revisión adicional en Codex In-app Browser: 1440×900 y 390×844, DPR 1; foco en Institución al ampliar, MARIA → María Grande, Nogoyá con una selección y asunto correcto, dos servicios abiertos y sin desborde horizontal. El navegador integrado indicó prefers-reduced-motion=true; esa revisión no se atribuye a movimiento normal. Las pruebas Chromium de CI utilizan su preferencia predeterminada. [Escritorio con foco](media/etapa04-desktop.jpg) · [Filtro móvil](media/etapa04-mobile.jpg).

## Documentación y límites

Comandos y mantenimiento en [guía de pruebas](testing.md). Evidencia permanente resumida en [JSON](stage-04-evidence.json), sin exports completos de cuentas ni logs ajenos. Manual v1.6 y checklist v1.4: 22 páginas cada uno y formularios preservados; versiones previas archivadas. PR #5 integrado con autorización: main 480eaef, [quality de main](https://github.com/pereyrajuanig/landing-circulo-er/actions/runs/38452363417). Etapa 03 sigue abierta por el lector real pendiente.

La emulación Chromium no es un teléfono físico ni una matriz de Safari/Firefox. No certifica accesibilidad, rendimiento ni contenido vigente. La suite comprueba la respuesta 404; una página de error institucional corresponde a SEO. No se desplegó en Sites ni Vercel.

Referencias primarias consultadas el 13/10/2026: [webServer de Playwright](https://playwright.dev/docs/test-webserver), [CI](https://playwright.dev/docs/ci) y [assertions](https://playwright.dev/docs/test-assertions). Los comandos, versiones y resultados registrados corresponden a la implementación de este repositorio.
