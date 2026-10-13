# Instrucciones de Landing-CirculoER

## Contexto y decisiones

- Landing del Círculo de Retirados y Pensionados de la Policía de Entre Ríos; público: retirados, pensionados y familias.
- Astro 7.3.8, TypeScript estricto, CSS propio y salida estática. Node 24.16 o posterior dentro de la rama 24 y npm para desarrollo, controles y build; sin CMS ni base de datos. Migración solicitada por el usuario el 12/10/2026.
- Fuente: `src/pages/`, `src/layouts/`, `src/components/` y colecciones JSON de `src/content/`. `src/styles/styles.css` es la base institucional y `src/styles/warmth.css` la revisión de calidez, importada después. Mantener el escudo, Libre Caslon Display, DM Sans, azul, dorado y fondos cálidos.
- Datos institucionales variables requieren confirmación; no inventar teléfonos, prestaciones, tarifas, autoridades ni testimonios.
- Documentación: [README](README.md), [diseño](docs/design-system.md), [arquitectura](docs/architecture.md), [flujo](docs/workflow.md) y [despliegue](docs/deployment.md).

## Trabajo y Git

- Leer instrucciones, revisar `git status`, archivos relacionados y cambios ajenos antes de editar. No revertirlos ni incorporarlos al commit.
- Rama principal `main`; tareas en ramas cortas `codex/<tarea>`, creadas desde `main` actualizado. Reutilizar la rama de una tarea existente.
- Commits descriptivos, push y PR cuando el usuario los autorice. Revisar el diff y seleccionar los archivos.
- Exigir PR y check `quality` para main. No exigir una aprobación humana adicional en este proyecto individual.
- No hacer merge ni publicar en Sites sin autorización. La carga inicial a GitHub fue solicitada por el usuario; eso no autoriza todos los futuros merges o despliegues.
- No reescribir historial compartido ni cambiar visibilidad o credenciales sin una instrucción específica.

## Implementación y controles

- Preservar el stack y las funciones existentes. Evitar refactors generales y dependencias nuevas sin necesidad.
- Usar npm y su lockfile. Comandos: `npm ci`, `npm run dev`, `npm run check`, `npm run lint`, `npm run format:check`, `npm test`, `npm run build`, `npm run preview`. `npm run validate` agrupa tipos, lint, formato y tests (incluye build).
- `check` ejecuta astro check; `lint` ejecuta ESLint sin advertencias; `format:check` comprueba Prettier. Build valida colecciones y referencias de dist; npm test incluye build, siete tests Node y catorce casos Chromium. Preparar el navegador con npm run test:install; Linux/CI usa npx playwright install --with-deps chromium. Cerrar el preview de revisión antes de la suite: Astro admite uno por checkout; el runner abre y cierra su preview en 4175. Guía: docs/testing.md. No son una auditoría CSS o WCAG completa.
- Revisar cambios visuales en navegador de escritorio y móvil; menú, servicios, búsqueda y alojamientos.
- Usar Astro dev para desarrollo y Astro preview para revisar dist. No usar esos servidores como hosting de producción; solo public/ y la salida generada son públicos.
- Mantener documentos y PDF alineados. Registrar progreso y evidencia en docs/checklist-progress.json; el PDF se regenera desde tools/docs/build_checklist.py y conserva campos manuales no sobrescritos por el registro. No marcar tareas o merges pendientes como verificados.
- No guardar secretos, exports de cuentas ni archivos sensibles. No incorporar otros materiales del Escritorio.

## Despliegue y colaboración

- Sites conserva el proyecto existente de `.openai/hosting.json`, con acceso privado. No crear otro Site ni desplegar mediante GitHub Pages por defecto.
- Vercel es el hosting previsto, con vercel.json preparado. La integración de cuenta/GitHub aún no está conectada. GitHub es fuente y portfolio; CI comprueba el proyecto, no publica por sí solo. Conservar el Site histórico.
- No hay base de datos ni migraciones. Las consultas usan mailto y no escriben datos desde la web.
- Delegar solo cuando el usuario o instrucciones aplicables lo pidan.
- Informar resultado, comprobaciones, limitaciones y pasos externos pendientes.
