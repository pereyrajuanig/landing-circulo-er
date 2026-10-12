# Instrucciones de Landing-CirculoER

## Contexto y decisiones

- Landing del Círculo de Retirados y Pensionados de la Policía de Entre Ríos; público: retirados, pensionados y familias.
- HTML, CSS y JavaScript nativo. Node 24 y npm solo para desarrollo, controles y build; sin framework, CMS ni base de datos.
- Fuente: `src/`. `styles.css` es la base institucional y `warmth.css` la revisión de calidez, cargada al final. Mantener el escudo, Libre Caslon Display, DM Sans, azul, dorado y fondos cálidos.
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
- Usar npm y su lockfile. Comandos: `npm ci`, `npm run dev`, `npm run lint`, `npm test`, `npm run build`, `npm run preview`.
- `lint` verifica estructura, enlaces locales y sintaxis JS; no es una auditoría CSS o WCAG completa.
- Revisar cambios visuales en navegador de escritorio y móvil; menú, servicios, búsqueda y alojamientos.
- El servidor de desarrollo sirve solo `src/` (o `dist/` en preview); no usarlo como servidor de producción.
- Mantener documentos y PDF alineados con los cambios. No presentar como verificado un control pendiente.
- No guardar secretos, exports de cuentas ni archivos sensibles. No incorporar otros materiales del Escritorio.

## Despliegue y colaboración

- Sites conserva el proyecto existente de `.openai/hosting.json`, con acceso privado. No crear otro Site ni desplegar mediante GitHub Pages por defecto.
- GitHub es fuente y portfolio; CI comprueba el proyecto, no publica automáticamente en Sites.
- No hay base de datos ni migraciones. Las consultas usan mailto y no escriben datos desde la web.
- Delegar solo cuando el usuario o instrucciones aplicables lo pidan.
- Informar resultado, comprobaciones, limitaciones y pasos externos pendientes.
