# Arquitectura

## Página estática

`src/index.html` contiene estructura semántica y contenido. Carga `styles.css`, después `warmth.css`, y ejecuta `app.js` con `defer`. El archivo `assets/escudo.png` se utiliza en cabecera, portada, pie y favicon.

La revisión cálida sobrescribe tokens y reglas de la base. Al cambiar un estilo, comprobar ambas hojas y sus media queries. La base no debe eliminarse hasta que una tarea de consolidación sea definida y revisada.

## Interacciones

- Menú: controla `#navigation`, actualiza `aria-expanded`; cierra por enlace o Escape.
- Servicios: `details/summary`; Salud inicia abierto y pueden permanecer varias categorías abiertas.
- Filiales: filtra el listado de 24 localidades, normalizando tildes y mayúsculas. La sede de Paraná permanece visible.
- Alojamiento: botones con `aria-pressed`; modifica título, descripción y asunto del enlace de correo. No hay reservas reales ni navegación ARIA por flechas.
- Contacto: `mailto` abre el cliente de correo del visitante; Google Maps abre una búsqueda de ubicación.

## Herramientas de desarrollo

Node 24 utiliza exclusivamente módulos propios: HTTP, filesystem, procesos y el runner de tests. `scripts/dev.mjs` inicia un servidor ligado a `127.0.0.1`. `scripts/build.mjs` valida la fuente y copia a `dist/`, verificando que la salida esté dentro del proyecto y no sea un enlace simbólico.

El build incluye únicamente `src/`; README, documentación, configuración Git y herramientas no se sirven como parte de la landing.

## Datos y dependencias

No hay API, servidor de aplicación, base de datos ni CMS. El filtro y los destinos están en el HTML/JS. Google Fonts es la única dependencia visual externa; Georgia y Arial son los fallbacks.

La autenticación de Sites protege la vista de revisión; no es un sistema de autenticación propio del Círculo.
