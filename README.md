# Círculo de Retirados y Pensionados · Entre Ríos

[![Calidad](https://github.com/pereyrajuanig/landing-circulo-er/actions/workflows/quality.yml/badge.svg)](https://github.com/pereyrajuanig/landing-circulo-er/actions/workflows/quality.yml)

Sitio institucional en evolución para el Círculo de Retirados y Pensionados de la Policía de Entre Ríos. Combina historia, servicios y contacto con una experiencia centrada en la cercanía y el acompañamiento.

![Portada de la versión cálida](docs/media/landing-desktop.jpg)

## Diseño y alcance

La propuesta se desarrolló con participación del usuario: base institucional y revisión cálida con fondos marfil, escudo íntegro y el mensaje **«Tu historia nos une. Seguimos a tu lado»**. La migración a Astro conserva esa composición.

- Servicios desplegables con HTML nativo.
- Búsqueda de 24 filiales que reconoce mayúsculas y tildes.
- Selección informativa de ocho destinos de alojamiento.
- Contacto por correo y ubicación de la sede.
- Diseño adaptable, menú móvil, foco visible y movimiento reducido.
- Portada en revisión con fotos automáticas sin controles visibles y grabado como fondo completo; pausa disponible al foco de teclado.

[Vista privada histórica en Sites](https://circulo-policial-entre-rios.spunkydegu8.chatgpt.site/) · [Design system](docs/design-system.md) · [Manual en PDF](docs/design-system.pdf)

La vista histórica requiere una cuenta con acceso en ChatGPT. [Versión para revisión en Vercel](https://landing-circulo-er.vercel.app/): publicada el 13/10/2026, accesible sin cuenta y con noindex; contenido, secciones y dominio pendientes. Ver [registro del despliegue](docs/vercel-preview.md). No hay área de socios, turnos, reservas en línea ni panel editorial.

## Stack

**Astro 7.3.8**, TypeScript estricto, CSS propio y JavaScript para las interacciones. Node.js 24 (mínimo 24.16) y npm se usan en desarrollo, CI y build. La salida es HTML estático: no necesita un servidor Node en producción.

Seis colecciones de contenido JSON, validadas por esquemas, separan datos de la interfaz. Esta base permite integrar un CMS en una tarea posterior; no incluye uno instalado.

## Empezar

```powershell
git clone https://github.com/pereyrajuanig/landing-circulo-er.git
cd landing-circulo-er
npm ci
npm run dev
```

Abrí http://127.0.0.1:4173/. Astro recarga los cambios durante el desarrollo. Si el puerto está ocupado: npm run dev -- --port 4174. La extensión recomendada de VS Code es Astro.

Para desarrollo local no hacen falta variables, claves ni base de datos. El SEO de producción requiere SITE_URL y SEO_INDEXABLE=true cuando se confirme el dominio; previews mantienen noindex. Ver [SEO](docs/seo.md). Las dos fuentes se cargan como WOFF2 locales con preload, swap y fallback.

## Comandos

| Acción                                                  | Comando              |
| ------------------------------------------------------- | -------------------- |
| Instalación reproducible                                | npm ci               |
| Desarrollo con recarga                                  | npm run dev          |
| Diagnóstico Astro y TypeScript                          | npm run check        |
| Reglas Astro, TypeScript y JavaScript                   | npm run lint         |
| Comprobar formato                                       | npm run format:check |
| Aplicar formato                                         | npm run format       |
| Validación completa (incluye build y tests)             | npm run validate     |
| Build, integración y flujos Chromium                    | npm test             |
| Actualizar referencia tras un cambio editorial revisado | npm run test:update  |
| Pruebas Node sobre un build vigente                     | npm run test:unit    |
| Build y pruebas Chromium                                | npm run test:e2e     |
| Preparar Chromium de pruebas                            | npm run test:install |
| Build y control de referencias de salida                | npm run build        |
| Preview del build                                       | npm run preview      |
| Medición de rendimiento local                           | npm run perf         |

npm test construye y ejecuta catorce pruebas Node y treinta y seis Chromium por cada modo CSP. Para preparar Chromium una vez, usar npm run test:install; en Linux, npx playwright install --with-deps chromium. Cerrar el preview de revisión antes de la suite: Astro admite uno por checkout. Ver [guía de pruebas](docs/testing.md). npm run build valida el contenido y genera dist/, que no se versiona; comprueba idioma, título, anclas, recursos y exclusión de archivos internos. ESLint y Prettier se configuran en eslint.config.mjs y .prettierrc.json. Son dependencias de desarrollo; no agregan código al navegador. Estos controles no equivalen a una auditoría completa de accesibilidad.

## Estructura

```text
src/pages/          Inicio, índices y fichas del sitio
src/layouts/        Documento HTML y estilos globales
src/components/     Cabecera, secciones y pie
src/content/        Institución, servicios, filiales y alojamientos
src/content.config.ts  Esquemas y loaders de Astro
src/styles/         Base institucional y revisión cálida
src/scripts/        Interacciones del navegador
src/lib/            Búsqueda y enlaces de contacto
public/assets/      Escudo y favicon
scripts/            Control del build
tests/              Integración de contenido/HTTP y flujos Chromium
playwright.config.mjs  Preview y proyectos de pruebas de navegador
docs/               Diseño, arquitectura, flujo y manual
tools/docs/         Generador reproducible del PDF
vercel.json         Configuración del despliegue estático
.openai/hosting.json  Referencia del Site histórico
```

## Flujo y publicación

Tarea → rama codex/* → implementación → controles → commit → push → PR → revisión → merge autorizado → despliegue autorizado → verificación.

main recibe cambios mediante PR con quality aprobado. No se exige otra persona para aprobar este proyecto individual. GitHub Actions comprueba el código. Vercel está conectado: main actualiza la URL estable y las ramas generan previews protegidas; ver [despliegue](docs/deployment.md).

## Documentación

- [Arquitectura](docs/architecture.md)
- [Sistema de diseño](docs/design-system.md) y [manual visual](docs/design-system.pdf)
- [Registro de cambios](docs/design-changelog.md)
- [Flujo Git y GitHub](docs/workflow.md)
- [Despliegue y recuperación](docs/deployment.md)
- [Mantenimiento de contenido](docs/content-maintenance.md)
- [Plan para un futuro CMS](docs/cms-roadmap.md)
- [Checklist de publicación](docs/publication-checklist.md)
- [Checklist detallada y paso a paso en PDF](docs/checklist-paso-a-paso.pdf)
- [Registro de avance](docs/checklist-progress.json)
- [Etapa 01: controles, alcance y evidencia](docs/stage-01-quality.md)
- [Etapa 02: diseño, UX y matriz de pantallas](docs/stage-02-design-ux.md)
- [Etapa 03: accesibilidad, evidencia y lector pendiente](docs/stage-03-accessibility.md)
- [Pruebas y diagnóstico de fallos](docs/testing.md)
- [Etapa 04: cobertura y evidencia](docs/stage-04-testing.md)
- [SEO y dominio pendiente](docs/seo.md)
- [Etapa 06: rendimiento medido](docs/stage-06-performance.md)
- [Seguridad y privacidad preparada](docs/security-privacy.md)
- [Inventario para decisión institucional](docs/privacy-review.md)
- [Estado y validaciones](docs/project-status.md)
- [Regenerar el manual](tools/docs/README.md)

Quedan pendientes fotos reales, autoridades, horarios, contactos de filiales y condiciones de prestaciones, con validación institucional. Las referencias del dossier tienen corte del 8/10/2026. Etapa 03: teclado, foco, contraste y reflujo revisados; prueba real con lector de pantalla pendiente por decisión del usuario. Zoom al 200 % confirmado manualmente en etapa 02. No se declara conformidad WCAG.

Las versiones anteriores del manual se conservan en docs/archive/. El vigente es docs/design-system.pdf.

Seguridad: headers y CSP Report-Only preparados para Vercel, probados localmente. npm run test:csp verifica el modo exigido local; npm run security:update actualiza el hash después de cambios revisados. No acredita headers/HTTPS del hosting real. Ver docs/security-privacy.md.

Revisión del29/10/2026: propuesta de diseño con beneficios, alojamientos y salones como prioridades. Aceptación visual y merge pendientes. Detalles en docs/design-benefits-spaces.md; manual1.11 y checklist1.9 actualizados.

## Sitio institucional · propuesta del 29/10/2026

La rama de revisión amplía el diseño a 18 páginas públicas y 404: cinco fichas de beneficios, seis alojamientos, salones, institución/filiales, contacto y novedades. Noticias y logros tienen modelo local y rutas preparadas, sin publicaciones reales cargadas.

El personal institucional usará un panel sencillo; Sanity es la propuesta y su activación quedó diferida por el usuario. Facebook será origen de las novedades, pero el enlace/acceso todavía no está disponible y no hay sincronización activa. Ver [alcance, etapas y bloqueos](docs/site-evolution.md) y [panel editorial](docs/cms-roadmap.md). No hay nuevas dependencias.

Manual1.12 y checklist1.10 incorporan esta evolución; las páginas anteriores conservan la referencia histórica. La navegación de la rama cambia a páginas propias; main conserva su versión hasta un merge autorizado.

## Fotografías de referencia de internet · antecedente integrado

La rama codex/fotos-ilustrativas incorpora 12 fotos de Pexels en las18 páginas públicas y 404, con aviso y crédito visible. Son referencias y no registros institucionales. Galería ampliable en las fichas; archivos locales optimizados por Astro, sin paquetes nuevos. [Alcance y reemplazo](docs/photo-preview.md), [fuentes verificadas](docs/photo-sources.json) y [política de uso](docs/photo-sources.md). Manual1.14 (26 páginas) y checklist1.12 actualizados; fotografías reales pendientes. PR #12 fusionado con autorización en main 5aeee25; el siguiente lote amplía el contenido con material institucional.

## Portada con carrusel de ciudades · propuesta del 30/10/2026

La rama codex/portada-carrusel-ciudades incorpora el recorrido elegido por el usuario: Concordia, Federación y Federal con fotos propias y grabados de cada localidad, cada 8 segundos. Mensaje y accesos estables; pausa/inicio, navegación manual, movimiento reducido y respaldo sin JS. Sin nuevos paquetes ni conexiones externas.

[Diseño, funcionamiento y límites](docs/city-carousel.md) · [Fuentes de grabados](docs/city-art-sources.json). Manual1.16 y checklist1.14 actualizados. Merge de este lote pendiente; contenido del PR #13 previamente integrado en main bfe1aef.
