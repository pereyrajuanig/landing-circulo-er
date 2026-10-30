# Estado del proyecto

Fecha: 13 de octubre de 2026. Proyecto canónico: Desktop/Landing-CirculoER. Repositorio de portfolio: pereyrajuanig/landing-circulo-er.

## Integraciones y lote vigente

- PR #2 Astro integrado con autorización: 5d87930.
- PR #3 etapa 01 integrado con autorización: 4410368.
- PR #4 etapa 02 integrado con autorización: 20181ac; siete tareas verificadas y zoom 200 % confirmado manualmente por el usuario.
- PR #5 integrado con autorización: 480eaef8f44797fed5e62def3d56fc9de769e320; [quality de main](https://github.com/pereyrajuanig/landing-circulo-er/actions/runs/38452363417) aprobado. Etapa 03 con seis tareas verificadas; lector real 03.06 pendiente por decisión del usuario.
- PR #6 etapa 04 integrado con autorización: 9938f6d; quality de main 38461526636 aprobado.
- PR #7 SEO integrado con autorización: main 5bf1798, quality38465530841 aprobado; dominio y cierre público pendientes.
- PR #8 integrado con autorización: main b263601, quality38479593548 aprobado. Laboratorio verificado; métricas de campo pendientes.
- PR #9 fusionado con autorización: main e1e830b; [quality](https://github.com/pereyrajuanig/landing-circulo-er/actions/runs/38485087460) aprobado. Headers de hosting/404 comprobados en Vercel; privacidad y futuro dominio pendientes.
- [Publicación para revisión](vercel-preview.md) autorizada el 13/10/2026. Etapa08 diferida por el usuario hasta reunir contenido y definir secciones; etapa09 parcial.

## Validación vigente

Astro 7.3.8, TypeScript estricto, Node 24, npm y salida estática. Nueve componentes, un layout y cuatro colecciones; CSS, escudo y contenido conservados. Playwright 1.64.0 es dependencia de desarrollo.

Tipos:31 archivos sin diagnósticos. Lint sin advertencias; formato correcto; build estático; 11 Node y20 Chromium por modo CSP aprobados en Windows y Ubuntu. [Guía de pruebas](testing.md), [etapa 04](stage-04-testing.md) y [registro](checklist-progress.json). Se corrigió la pérdida de foco al ocultar Menú; fallos reales produjeron captura y traza, y se verificó la carga del artefacto de CI.

Manual v1.10 y checklist v1.8: 22 páginas cada uno; campos editables conservados y versiones previas archivadas. No se declara auditoría WCAG completa: lector real pendiente, Chromium emulado y fuentes locales cargadas en e2e. 404 revisada visualmente con capturas Chromium en escritorio/móvil.

## Pendientes de producto

Aceptación visual final; lector de pantalla diferido; fotos reales, autoridades, horarios, contactos de filiales y condiciones de prestaciones confirmados por la institución. Matriz integral de navegadores, rendimiento de campo y cierre público del SEO siguen pendientes. Sin CMS ni base de datos.

Vercel conectado y publicado para revisión en https://landing-circulo-er.vercel.app/, Production de main con noindex; dominio definitivo y aceptación institucional pendientes. Sites conserva su publicación histórica privada y su ID. GitHub Actions comprueba; merge y publicación requieren autorización.

## Configuración e historial

Main exige PR y quality, base actualizada, historial lineal, conversaciones resueltas y controles para administradores; sin force push ni borrado. Proyecto individual, sin otra aprobación humana exigida; squash habilitado.

Origen visual Sites: 648e72f7daca19a45c00ae5fc82427d385cce449. Dossier original local, fuera de Git y del build. Pruebas, reportes, documentos y archivos de desarrollo no se sirven como contenido público de la landing.

Código1e9938c: [quality aprobado](https://github.com/pereyrajuanig/landing-circulo-er/actions/runs/38483690426). Revisión del repositorio en validate/CI; control de build sin Git probado con PATH vacío en proceso hijo. Headers y HTTPS comprobados en vercel.app; dominio institucional y privacidad pendientes.

Revisión del29/10/2026: propuesta de diseño con beneficios, alojamientos y salones como prioridades. Aceptación visual y merge pendientes. Detalles en docs/design-benefits-spaces.md; manual1.11 y checklist1.9 actualizados.

## 29/10/2026 · sitio institucional en revisión

El alcance evolucionó a varias páginas. Implementación propuesta en PR #11, no fusionada: 18 páginas y 404; noticias/logros como colección vacía con publicación filtrada. Fichas reutilizan información existente. Contenido completo/fotos y aceptación pendientes.

El personal institucional editará con un panel. El usuario solicitó preparar la base y activarlo después. Facebook → sitio confirmado; enlace y acceso no disponibles. No hay CMS instalado ni sincronización activa. Detalle en site-evolution.md. La verificación del diseño anterior (dfdbe7c) no certifica por sí sola esta nueva ampliación; revisar el commit y los controles finales del PR.

## 29/10/2026 · propuesta fotográfica

PR #11 fusionado con autorización en eb1f66d y desplegado en Vercel. Nuevo lote codex/fotos-ilustrativas: el usuario pidió imágenes ficticias para revisar composición. Cuatro muestras con avisos y galería; no certifican instalaciones ni completan la recopilación real. Ver photo-preview.md. No hay autorización de merge de este nuevo lote.

## Revisión fotográfica vigente · 29/10/2026

Pedido corregido por el usuario: fotos de internet, sin generación, en todas las páginas. PR #12 en codex/fotos-ilustrativas sustituye las muestras anteriores por12 referencias Pexels con créditos y fuentes. Matriz 19 rutas por 6 anchos sin desbordes ni errores de JavaScript; docs/reference-photo-evidence.json. La aceptación visual y el merge siguen pendientes. main permanece en eb1f66d (PR #11); CMS/Facebook, dominio, contenido final, lector y fotografías reales pendientes. Resultado de la suite y CI en el PR.

## Contenido institucional en revisión · 30/10/2026

PR #12 fusionado con autorización: main 5aeee25, quality y Vercel aprobados. Nuevo lote en codex/contenido-institucional con material identificado por el usuario:23 recortes, ocho destinos, cinco espacios, nueve filiales con contenido y cuatro reseñas del archivo.25 páginas generadas contando404.

Aceptación del contenido y nuevo merge pendientes; capacidades y vigencia se atribuyen al archivo, sin inventar fechas. No se activan CMS/Facebook. Documentación: institutional-content.md. Resultado de las comprobaciones finales en el PR.
