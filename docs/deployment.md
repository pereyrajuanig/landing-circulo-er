# Despliegue y recuperación

## Entornos

| Entorno | Uso | Publicación |
| --- | --- | --- |
| `npm run dev` | Fuente local, recarga manual | No |
| `npm run preview` | Salida de build local | No |
| GitHub | Código, documentación y controles | Repositorio de portfolio |
| Sites existente | Vista privada de la landing | Requiere autorización para nuevos despliegues |

No hay bases de datos, escrituras de formularios ni migraciones. El dato ficticio enviado por un test se envía solo al servidor local y se rechaza con 405.

## Publicar una actualización autorizada

1. Resolver la tarea en una rama, pasar controles y obtener autorización de merge.
2. Generar `dist/` con `npm run build`; revisar con `npm run preview`.
3. Conservar el ID de `.openai/hosting.json`; no registrar un nuevo Site.
4. Usar el flujo del plugin Sites para sincronizar fuente, empaquetar la salida y guardar una versión. Credenciales de corta duración solo por stdin, nunca en archivos o argumentos.
5. Mantener el acceso privado y publicar la versión guardada; esperar el estado `succeeded`.
6. Verificar la web, sus enlaces e interacciones. Registrar commit, versión, despliegue y fecha.

El hosting no está conectado a GitHub Actions. No hay despliegues automáticos ni GitHub Pages habilitado.

## Recuperación

- En GitHub: revertir el commit de la tarea mediante una nueva rama y PR, conservando el historial.
- En Sites: volver a desplegar una versión guardada anterior, con autorización y respetando el acceso actual.
- Un revert o push a GitHub no cambia por sí solo el Site publicado.

## Referencia actual

La revisión cálida publicada tiene el commit de origen Sites `648e72f7daca19a45c00ae5fc82427d385cce449`. El proyecto se importó al nuevo repositorio de portfolio con esa misma fuente visual. Los IDs de versión son propios de Sites y no deben inventarse.
