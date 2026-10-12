# Círculo de Retirados y Pensionados · Entre Ríos

[![Calidad](https://github.com/pereyrajuanig/landing-circulo-er/actions/workflows/quality.yml/badge.svg)](https://github.com/pereyrajuanig/landing-circulo-er/actions/workflows/quality.yml)

Landing institucional para el Círculo de Retirados y Pensionados de la Policía de Entre Ríos. Combina identidad, historia, servicios y contacto con una experiencia centrada en la cercanía y el acompañamiento.

![Portada de la versión cálida](docs/media/landing-desktop.jpg)

## Diseño y alcance

La propuesta se desarrolló con participación del usuario: una primera base institucional y una revisión más cálida, con fondos marfil, el escudo íntegro y el mensaje **«Tu historia nos une. Seguimos a tu lado»**.

- Servicios desplegables con HTML nativo.
- Búsqueda de filiales que reconoce mayúsculas y tildes.
- Selección informativa de seis destinos de alojamiento.
- Contacto por correo y ubicación de la sede.
- Diseño adaptable, menú móvil, foco visible y movimiento reducido.

[Vista privada en Sites](https://circulo-policial-entre-rios.spunkydegu8.chatgpt.site/) · [Design system](docs/design-system.md) · [Documentación en PDF](docs/design-system.pdf)

La vista alojada requiere una cuenta con acceso en ChatGPT. No hay área de socios, turnos ni reservas en línea.

## Stack

HTML, CSS y JavaScript nativo. **Node.js 24 y npm** se usan para las herramientas locales y CI. La página publicada es estática y no necesita Node en producción. No hay dependencias de npm.

## Empezar

```powershell
git clone https://github.com/pereyrajuanig/landing-circulo-er.git
cd landing-circulo-er
npm ci
npm run dev
```

Abrí `http://127.0.0.1:4173/`. Editá `src/` y recargá el navegador. Si el puerto está ocupado: `npm run dev -- --port 4174`.

No hacen falta variables de entorno, claves ni una base de datos. Las tipografías se cargan desde Google Fonts y tienen fallback local.

## Comandos

| Acción | Comando |
| --- | --- |
| Preparar el proyecto | `npm ci` |
| Desarrollo | `npm run dev` |
| Sintaxis JS y validación estructural | `npm run lint` |
| Pruebas HTTP y recursos de la landing | `npm test` |
| Build estático | `npm run build` |
| Revisar el build | `npm run preview` |

`lint` es un control de referencias, anclas, IDs, idioma y sintaxis JavaScript; no equivale a una auditoría completa de CSS, accesibilidad o contenido institucional. El build se genera en `dist/`, que no se versiona.

## Estructura

```text
src/                 Página, estilos, JavaScript y escudo
scripts/             Desarrollo, validación y build sin dependencias
tests/               Pruebas de integración del servidor local
docs/                Diseño, arquitectura, flujo, mantenimiento y PDF
tools/docs/          Fuente reproducible del PDF y tipografías
.github/             CI y plantilla de Pull Request
.vscode/             Tareas de desarrollo y controles
.openai/hosting.json  Identidad del Site existente
```

## Flujo de trabajo

`Tarea → rama codex/* → implementación → controles → commit → push → PR → revisión → merge autorizado → despliegue autorizado → verificación`.

`main` debe recibir cambios mediante PR con el control `quality` aprobado. No se exige una segunda persona para aprobar un proyecto individual. La configuración efectiva y los resultados de CI se registran en [el estado de entrega](docs/project-status.md).

La carga inicial es el punto de partida del repositorio. Los cambios posteriores siguen el flujo de [docs/workflow.md](docs/workflow.md).

## Documentación

- [Arquitectura y responsabilidades](docs/architecture.md)
- [Sistema de diseño vigente](docs/design-system.md)
- [Manual visual en PDF](docs/design-system.pdf)
- [Registro de diseño](docs/design-changelog.md)
- [Flujo Git y GitHub](docs/workflow.md)
- [Despliegue, verificación y recuperación](docs/deployment.md)
- [Mantenimiento de contenido](docs/content-maintenance.md)
- [Checklist de publicación](docs/publication-checklist.md)
- [Estado y validaciones](docs/project-status.md)
- [Cómo regenerar el PDF](tools/docs/README.md)

## Entornos y pendientes

Desarrollo y preview sirven archivos locales. El Site existente es una vista privada. GitHub almacena el código y ejecuta controles; no publica automáticamente la web.

Quedan pendientes fotos reales, autoridades, horarios, contactos de filiales y condiciones de prestaciones. Las referencias del dossier tienen corte del 8 de octubre de 2026 y requieren validación institucional. Falta una revisión completa de accesibilidad con lector de pantalla y zoom.

El PDF de la primera propuesta se conserva en `docs/archive/` como referencia histórica; el documento vigente es `docs/design-system.pdf`.
