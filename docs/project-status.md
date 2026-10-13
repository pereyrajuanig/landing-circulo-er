# Estado del proyecto

Fecha: 13 de octubre de 2026.

## Fuente e integración

Proyecto canónico: Desktop/Landing-CirculoER. Repositorio público de portfolio: pereyrajuanig/landing-circulo-er.

Astro 7.3.8, TypeScript 6.0.3 estricto, Node 24, npm y salida estática; nueve componentes, un layout y cuatro colecciones JSON. CSS propio, marfil, azul, dorado y escudo preservados. Sin CMS instalado ni base de datos.

- PR #2 migración integrado con autorización: 5d87930.
- PR #3 etapa 01 integrado con autorización: 4410368.
- PR #4 etapa 02 integrado con autorización: 20181ac3a8869de1ef0b9a5cd0a77f08fc8aa878. [Quality de main](https://github.com/pereyrajuanig/landing-circulo-er/actions/runs/38445597091) aprobado. Siete tareas verificadas; zoom 200 % confirmado manualmente por Juan.
- Etapa 03 en codex/etapa-03-accesibilidad: seis tareas verificadas, 03.06 pendiente por decisión del usuario; PR/merge técnico pendiente. La etapa completa sigue abierta.

## Verificación vigente

Código c790ccae0fc2eadbfc1403e60d9978a48e92b08d: tipos (22 archivos) sin diagnósticos, ESLint sin advertencias, Prettier correcto, build estático y siete tests aprobados. [Quality](https://github.com/pereyrajuanig/landing-circulo-er/actions/runs/38449679551). La nueva prueba revisa el contrato accesible del HTML construido; las seis anteriores preservan texto, datos, filtro, correo, recursos y privacidad del build.

Teclado en escritorio y móvil, foco visible y retorno del menú; reflujo 320 px y menú bajo; contraste de estados CSS y cota del gradiente. [Reporte de etapa 03](stage-03-accessibility.md) y [registro](checklist-progress.json). Atributos ARIA inspeccionados; lector real y anuncios de voz no probados. No certifica WCAG.

Manual v1.5 y checklist v1.3: 22 páginas cada uno, formularios editables y versiones anteriores archivadas. Mantener separado el resultado técnico de la autorización de integración o publicación.

## Pendientes de producto y publicación

Lector de pantalla diferido; aceptación visual final; fotos reales, autoridades, horarios, contactos de filiales y condiciones de servicios con validación institucional. Carga sin fuentes externas y matriz integral de navegadores aún pendientes. No se considera esta revisión una auditoría WCAG completa.

Vercel tiene vercel.json preparado, sin conexión de cuenta/proyecto, dominio ni despliegue real. Sites conserva la publicación histórica privada y su ID. GitHub Actions solo comprueba. Toda publicación y merge requiere autorización.

## Configuración e historial

Main exige PR y quality, base actualizada, historial lineal, conversaciones resueltas y controles también para administradores; sin force push ni borrado. No se exige otra aprobación humana en este proyecto individual. Solo squash habilitado.

Origen visual Sites: 648e72f7daca19a45c00ae5fc82427d385cce449. Preparación de portfolio: 9a37660. El dossier original permanece local, fuera de Git y del build. Documentos y código internos no se sirven como contenido público de la landing.
