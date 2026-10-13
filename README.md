# Círculo de Retirados y Pensionados · Entre Ríos

[![Calidad](https://github.com/pereyrajuanig/landing-circulo-er/actions/workflows/quality.yml/badge.svg)](https://github.com/pereyrajuanig/landing-circulo-er/actions/workflows/quality.yml)

Landing institucional para el Círculo de Retirados y Pensionados de la Policía de Entre Ríos. Combina historia, servicios y contacto con una experiencia centrada en la cercanía y el acompañamiento.

![Portada de la versión cálida](docs/media/landing-desktop.jpg)

## Diseño y alcance

La propuesta se desarrolló con participación del usuario: base institucional y revisión cálida con fondos marfil, escudo íntegro y el mensaje **«Tu historia nos une. Seguimos a tu lado»**. La migración a Astro conserva esa composición.

- Servicios desplegables con HTML nativo.
- Búsqueda de 24 filiales que reconoce mayúsculas y tildes.
- Selección informativa de seis destinos de alojamiento.
- Contacto por correo y ubicación de la sede.
- Diseño adaptable, menú móvil, foco visible y movimiento reducido.

[Vista privada histórica en Sites](https://circulo-policial-entre-rios.spunkydegu8.chatgpt.site/) · [Design system](docs/design-system.md) · [Manual en PDF](docs/design-system.pdf)

La vista histórica requiere una cuenta con acceso en ChatGPT. La migración no se ha desplegado allí ni en Vercel. No hay área de socios, turnos, reservas en línea ni panel editorial.

## Stack

**Astro 7.3.8**, TypeScript estricto, CSS propio y JavaScript para las interacciones. Node.js 24 (mínimo 24.16) y npm se usan en desarrollo, CI y build. La salida es HTML estático: no necesita un servidor Node en producción.

Cuatro colecciones de contenido JSON, validadas por esquemas, separan datos de la interfaz. Esta base permite integrar un CMS en una tarea posterior; no incluye uno instalado.

## Empezar

```powershell
git clone https://github.com/pereyrajuanig/landing-circulo-er.git
cd landing-circulo-er
npm ci
npm run dev
```

Abrí http://127.0.0.1:4173/. Astro recarga los cambios durante el desarrollo. Si el puerto está ocupado: npm run dev -- --port 4174. La extensión recomendada de VS Code es Astro.

No hacen falta variables de entorno, claves ni base de datos. Las fuentes se cargan desde Google Fonts con fallback local.

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
| Build y pruebas de regresión / HTTP                     | npm test             |
| Actualizar referencia tras un cambio editorial revisado | npm run test:update  |
| Build y control de referencias de salida                | npm run build        |
| Preview del build                                       | npm run preview      |

npm test construye antes de probar. npm run build valida el contenido y genera dist/, que no se versiona; comprueba idioma, título, anclas, recursos y exclusión de archivos internos. ESLint y Prettier se configuran en eslint.config.mjs y .prettierrc.json. Son dependencias de desarrollo; no agregan código al navegador. Estos controles no equivalen a una auditoría completa de accesibilidad.

## Estructura

```text
src/pages/          Ruta principal
src/layouts/        Documento HTML y estilos globales
src/components/     Cabecera, secciones y pie
src/content/        Institución, servicios, filiales y alojamientos
src/content.config.ts  Esquemas y loaders de Astro
src/styles/         Base institucional y revisión cálida
src/scripts/        Interacciones del navegador
src/lib/            Búsqueda y enlaces de contacto
public/assets/      Escudo y favicon
scripts/            Control del build
tests/              Regresión de contenido y preview HTTP
docs/               Diseño, arquitectura, flujo y manual
tools/docs/         Generador reproducible del PDF
vercel.json         Configuración del despliegue estático
.openai/hosting.json  Referencia del Site histórico
```

## Flujo y publicación

Tarea → rama codex/* → implementación → controles → commit → push → PR → revisión → merge autorizado → despliegue autorizado → verificación.

main recibe cambios mediante PR con quality aprobado. No se exige otra persona para aprobar este proyecto individual. GitHub Actions comprueba el código. La integración con Vercel aún debe conectarse a la cuenta y al repositorio; ver [despliegue](docs/deployment.md).

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
- [Estado y validaciones](docs/project-status.md)
- [Regenerar el manual](tools/docs/README.md)

Quedan pendientes fotos reales, autoridades, horarios, contactos de filiales y condiciones de prestaciones, con validación institucional. Las referencias del dossier tienen corte del 8/10/2026. Falta una auditoría completa con lector de pantalla y zoom.

Las versiones anteriores del manual se conservan en docs/archive/. El vigente es docs/design-system.pdf.
