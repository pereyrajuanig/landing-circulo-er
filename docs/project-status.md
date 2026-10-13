# Estado del proyecto

Fecha: 13 de octubre de 2026. Proyecto canónico: Desktop/Landing-CirculoER. Repositorio de portfolio: pereyrajuanig/landing-circulo-er.

## Integraciones y lote vigente

- PR #2 Astro integrado con autorización: 5d87930.
- PR #3 etapa 01 integrado con autorización: 4410368.
- PR #4 etapa 02 integrado con autorización: 20181ac; siete tareas verificadas y zoom 200 % confirmado manualmente por el usuario.
- PR #5 integrado con autorización: 480eaef8f44797fed5e62def3d56fc9de769e320; [quality de main](https://github.com/pereyrajuanig/landing-circulo-er/actions/runs/38452363417) aprobado. Etapa 03 con seis tareas verificadas; lector real 03.06 pendiente por decisión del usuario.
- PR #6 etapa 04 integrado con autorización: 9938f6d; quality de main 38461526636 aprobado.
- PR #7 SEO integrado con autorización: main5bf1798, quality38465530841 aprobado; dominio y cierre público pendientes.
- PR #8 integrado con autorización: main b263601, quality38479593548 aprobado. Laboratorio verificado; métricas de campo pendientes.
- Etapa07 en codex/etapa-07-seguridad-privacidad, código 1e9938c: cuatro tareas verificadas localmente; [PR #9](https://github.com/pereyrajuanig/landing-circulo-er/pull/9) revisable. Hosting/HTTPS y acuerdo institucional pendientes. Ver [seguridad](security-privacy.md).

## Validación vigente

Astro 7.3.8, TypeScript estricto, Node 24, npm y salida estática. Nueve componentes, un layout y cuatro colecciones; CSS, escudo y contenido conservados. Playwright 1.64.0 es dependencia de desarrollo.

Tipos:31 archivos sin diagnósticos. Lint sin advertencias; formato correcto; build estático; 11 Node y20 Chromium por modo CSP aprobados en Windows y Ubuntu. [Guía de pruebas](testing.md), [etapa 04](stage-04-testing.md) y [registro](checklist-progress.json). Se corrigió la pérdida de foco al ocultar Menú; fallos reales produjeron captura y traza, y se verificó la carga del artefacto de CI.

Manual v1.9 y checklist v1.7: 22 páginas cada uno; campos editables conservados y versiones previas archivadas. No se declara auditoría WCAG completa: lector real pendiente, Chromium emulado y fuentes locales cargadas en e2e. 404 revisada visualmente con capturas Chromium en escritorio/móvil.

## Pendientes de producto

Aceptación visual final; lector de pantalla diferido; fotos reales, autoridades, horarios, contactos de filiales y condiciones de prestaciones confirmados por la institución. Matriz integral de navegadores, rendimiento de campo y cierre público del SEO siguen pendientes. Sin CMS ni base de datos.

Vercel preparado con vercel.json, sin cuenta/proyecto conectado, dominio ni despliegue real. Sites conserva su publicación histórica privada y su ID. GitHub Actions comprueba; merge y publicación requieren autorización.

## Configuración e historial

Main exige PR y quality, base actualizada, historial lineal, conversaciones resueltas y controles para administradores; sin force push ni borrado. Proyecto individual, sin otra aprobación humana exigida; squash habilitado.

Origen visual Sites: 648e72f7daca19a45c00ae5fc82427d385cce449. Dossier original local, fuera de Git y del build. Pruebas, reportes, documentos y archivos de desarrollo no se sirven como contenido público de la landing.

Código1e9938c: [quality aprobado](https://github.com/pereyrajuanig/landing-circulo-er/actions/runs/38483690426). Revisión del repositorio en validate/CI; control de build sin Git probado con PATH vacío en proceso hijo. Hosting sigue pendiente.
