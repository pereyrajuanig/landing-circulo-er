# Estado del proyecto

Fecha: 13 de octubre de 2026.

## Migración vigente

- Astro 7.3.8, TypeScript 6.0.3, Node 24 y npm; salida estática.
- PR #2 fusionado con autorización del usuario el 13/10/2026. Base en main: 5d87930fed3728f26ef3b36f27e24e938e8471be.
- Etapa 01 integrada por PR #3: main 4410368, quality aprobado.
- Etapa 02 en codex/etapa-02-diseno-ux: siete tareas verificadas; zoom 200 % confirmado por el usuario; revisión final e integración pendientes.
- Proyecto: Desktop/Landing-CirculoER. Repo público existente: pereyrajuanig/landing-circulo-er.
- Nueve componentes, un layout y cuatro colecciones JSON validadas. CSS y escudo preservados.
- Vercel preparado con vercel.json. Cuenta, proyecto, dominio y despliegue real pendientes.
- CMS sin instalar. El plan de edición institucional está en cms-roadmap.md.

## Verificación de la base y la etapa 01

| Control                             | Resultado                                                                                                                              |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Instalación reproducible con npm ci | Aprobada; npm reportó 0 vulnerabilidades                                                                                               |
| Diagnóstico Astro y TypeScript      | 0 errores, 0 advertencias, 0 hints                                                                                                     |
| Build                               | Salida estática construida y validada                                                                                                  |
| Tests                               | 6 pruebas aprobadas: texto y anclas, datos, filtro, mailto, MIME y archivos internos                                                   |
| Preview real                        | HTTP 200 en Astro preview                                                                                                              |
| Navegador                           | Escritorio y móvil: diseño cálido; menú / Escape / navegación, filtro con y sin resultados, selección y apertura múltiple de servicios |
| Reflujo                             | Sin desborde horizontal en las vistas inspeccionadas                                                                                   |
| Manual                              | Versión 1.4, 22 páginas; render completo revisado                                                                                      |
| Vercel                              | Configuración preparada, sin despliegue real                                                                                           |
| Sites                               | Publicación histórica privada conservada                                                                                               |

La verificación local no certifica WCAG ni sustituye la confirmación de la institución. Cada cambio requiere controles nuevos. El PR #2 quedó fusionado con quality aprobado. El avance de la etapa 01 se registra en stage-01-quality.md y checklist-progress.json; la integración en main sigue el flujo de aprobación.

## Producto pendiente

Aceptación visual final por el usuario; fotos reales; autoridades, horarios, contactos y prestaciones confirmados. Auditoría completa con lector de pantalla y zoom. Definir panel editorial cuando la institución lo requiera.

## Historial y configuración externa

Fuente visual cálida de Sites: 648e72f7daca19a45c00ae5fc82427d385cce449. Importación de portfolio: 9a37660. Última entrega anterior en main: bbd930c.

Durante la preparación inicial se verificaron VS Code abierto en esta carpeta, GitHub y protección de main: PR, quality, base actualizada, historial lineal, conversaciones resueltas, administradores incluidos; force push y borrado bloqueados; 0 aprobaciones humanas adicionales. Solo squash merge habilitado.

CI histórico de la entrega anterior: https://github.com/pereyrajuanig/landing-circulo-er/actions/runs/38296496078.

El dossier original permanece local, fuera de Git y del build. Las versiones anteriores del PDF se conservan como archivo histórico. Esta migración no cambió el hosting publicado.

CI de etapa 01, código b8fba32: https://github.com/pereyrajuanig/landing-circulo-er/actions/runs/38436064100. ESLint inspeccionó 21 archivos sin errores ni advertencias; Prettier aprobado. Checklist v1.1: 22 páginas, 136 campos interactivos validados; siete tareas de base verificadas. PR #3 fusionado con autorización; main 4410368 y quality de main aprobado.

Etapa 02: ver stage-02-design-ux.md y stage-02-evidence.json. Manual v1.4 y checklist v1.2 actualizados; etapa 01 cerrada en el registro. No se desplegó esta revisión.
