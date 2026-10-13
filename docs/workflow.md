# Flujo Git y GitHub

Adaptado del Kit_Desarrollo_Profesional del usuario. Proyecto individual, estático y sin datos persistentes.

## Una tarea por rama

```powershell
git switch main
git pull --ff-only
git switch -c codex/nombre-de-la-tarea
```

Revisar cambios locales antes de cambiar de rama. No descartar modificaciones ajenas. Si la tarea ya tiene rama, reutilizarla.

## Comprobar, guardar y presentar

```powershell
npm ci
npm run test:install # Chromium; en Linux añadir --with-deps
npm run validate # tipos, lint, formato, build y tests
git diff --check
git diff
```

Para cambios visuales, revisar escritorio y móvil; probar menú, servicios, búsqueda y alojamientos. Seleccionar explícitamente los archivos al hacer `git add`, usar un commit descriptivo y luego:

```powershell
git push -u origin codex/nombre-de-la-tarea
gh pr create --base main --fill
```

El PR debe explicar problema, resultado, validación y limitaciones. Registrar tareas verificadas y su evidencia en docs/checklist-progress.json; regenerar la checklist y revisar su render y sus campos. Una tarea implementada en una rama no equivale a un merge aprobado. Utilizar la plantilla del repositorio. Para cuerpos extensos usar un archivo y `--body-file`.

## Revisión y merge

- `main` requiere PR y el check `quality` aprobado.
- La rama debe estar actualizada y las conversaciones resueltas.
- No se exige una aprobación de otra persona que no participa del proyecto.
- El usuario autoriza el merge y, por separado, una publicación si corresponde.
- No usar force push sobre main ni borrar historial compartido.
- Se prioriza squash merge para dejar una tarea por commit; conservar la rama si sigue activa.

La configuración efectiva se registra en [project-status.md](project-status.md). La carga inicial del repositorio es el punto de partida autorizado; no constituye autorización para todos los cambios futuros.

## GitHub, Vercel y Sites

`origin` es GitHub. `.openai/hosting.json` identifica el Site existente. Un push ejecuta CI, pero no publica en Sites. Vercel es el hosting previsto; la integración Git aún no está conectada. Una vez conectada, main y las ramas pueden disparar producción y previews respectivamente. El flujo de publicación está en [deployment.md](deployment.md).
