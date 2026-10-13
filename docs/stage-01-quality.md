# Etapa 01 · Base y controles de calidad

Fecha: 13 de octubre de 2026. Estado: en verificación técnica.

## Alcance

Separar diagnóstico de tipos, lint y formato; integrar esos controles en CI y documentar progreso con evidencia. Se conserva Astro estático, contenido, escudo y diseño cálido.

El usuario autorizó fusionar el PR #2 el 13/10/2026. La migración quedó integrada por squash en main, commit 5d87930fed3728f26ef3b36f27e24e938e8471be. La rama codex/etapa-01-calidad se prepara sobre esa base; la integración de esta etapa requiere su propio PR y autorización.

## Controles

| Control         | Comando              | Alcance                                            |
| --------------- | -------------------- | -------------------------------------------------- |
| Tipos           | npm run check        | Diagnóstico Astro y TypeScript                     |
| Lint            | npm run lint         | Reglas recomendadas JS/TS/Astro; cero advertencias |
| Formato         | npm run format:check | Código, estilos, configuración y documentación     |
| Build y pruebas | npm test             | Build estático y seis pruebas existentes           |
| Completo        | npm run validate     | Los cuatro controles anteriores                    |

Los archivos generados, binarios, dossier local, tipografías y archivos históricos se excluyen del formateador. El código activo se revisa completo; los controles no se desactivan para ocultar fallos.

## Dependencias

ESLint, @eslint/js, typescript-eslint, eslint-plugin-astro, globals, Prettier y su plugin oficial para Astro son herramientas de desarrollo. Las versiones se fijan en package.json y package-lock.json. Node mínimo 24.16, compatible con el plugin Astro instalado. Las extensiones de VS Code se recomiendan; no se instalan automáticamente.

## Evidencia y cierre

Verificación local del 13/10/2026 con Node 24.20.0 y npm 11.19.0:

- npm ci: instalación reproducible; 370 paquetes instalados, 0 vulnerabilidades conocidas reportadas.
- npm run validate: Astro check en 22 archivos sin errores, advertencias ni hints; ESLint sin errores ni advertencias; formato correcto; build estático y seis pruebas aprobadas.
- ESLint inspeccionó 21 archivos: 11 Astro, 5 TypeScript y 5 módulos JavaScript.
- Texto visible y anclas, datos institucionales y funciones protegidos por las seis pruebas existentes. El CSS compilado solo difiere en cuatro espacios de las listas de tipografías.
- Navegador: ancho efectivo 1280 (escritorio) y 390 (móvil); sin desborde horizontal. Menú abre y Escape lo cierra devolviendo el foco; COLON encuentra Colón; consulta sin resultados comunica el estado; Nogoyá actualiza el título y el asunto mailto; dos servicios pueden permanecer abiertos. Sin errores ni advertencias en consola durante esta revisión.
- PDFs regenerados y revisados visualmente: 22 páginas cada uno. Checklist con 136 campos interactivos; valores, widgets y apariencias coherentes. Versiones previas conservadas.

[Captura de escritorio](media/etapa01-desktop.jpg) · [Captura móvil](media/etapa01-mobile.jpg).

La matriz completa de dispositivos, zoom y lector de pantalla permanece en etapas posteriores. El check quality de esta rama y su integración en main todavía están pendientes. La aceptación visual y editorial final corresponde al usuario y a la institución.

Referencias: [ESLint para Astro](https://ota-meshi.github.io/eslint-plugin-astro/user-guide/), [TypeScript ESLint](https://typescript-eslint.io/getting-started/), [Prettier oficial para Astro](https://github.com/withastro/prettier-plugin-astro).
