# Estado del proyecto

Fecha: 12 de octubre de 2026.

## Migración vigente

- Astro 7.3.8, TypeScript 6.0.3, Node 24 y npm; salida estática.
- Rama de tarea: codex/migracion-astro; main conserva la entrega anterior hasta el merge autorizado.
- Proyecto: Desktop/Landing-CirculoER. Repo público existente: pereyrajuanig/landing-circulo-er.
- Nueve componentes, un layout y cuatro colecciones JSON validadas. CSS y escudo preservados.
- Vercel preparado con vercel.json. Cuenta, proyecto, dominio y despliegue real pendientes.
- CMS sin instalar. El plan de edición institucional está en cms-roadmap.md.

## Verificación local de esta migración

| Control | Resultado |
| --- | --- |
| Instalación reproducible con npm ci | Aprobada; npm reportó 0 vulnerabilidades |
| Diagnóstico Astro y TypeScript | 0 errores, 0 advertencias, 0 hints |
| Build | Salida estática construida y validada |
| Tests | 6 pruebas aprobadas: texto y anclas, datos, filtro, mailto, MIME y archivos internos |
| Preview real | HTTP 200 en Astro preview |
| Navegador | Escritorio y móvil: diseño cálido; menú / Escape / navegación, filtro con y sin resultados, selección y apertura múltiple de servicios |
| Reflujo | Sin desborde horizontal en las vistas inspeccionadas |
| Manual | Versión 1.2, 22 páginas; render completo revisado |
| Vercel | Configuración preparada, sin despliegue real |
| Sites | Publicación histórica privada conservada |

La verificación local no certifica WCAG ni sustituye la confirmación de la institución. Cada cambio requiere controles nuevos. GitHub Actions de la rama debe confirmar los controles antes de fusionar.

## Producto pendiente

Aceptación visual final por el usuario; fotos reales; autoridades, horarios, contactos y prestaciones confirmados. Auditoría completa con lector de pantalla y zoom. Definir panel editorial cuando la institución lo requiera.

## Historial y configuración externa

Fuente visual cálida de Sites: 648e72f7daca19a45c00ae5fc82427d385cce449. Importación de portfolio: 9a37660. Última entrega anterior en main: bbd930c.

Durante la preparación inicial se verificaron VS Code abierto en esta carpeta, GitHub y protección de main: PR, quality, base actualizada, historial lineal, conversaciones resueltas, administradores incluidos; force push y borrado bloqueados; 0 aprobaciones humanas adicionales. Solo squash merge habilitado.

CI histórico de la entrega anterior: https://github.com/pereyrajuanig/landing-circulo-er/actions/runs/38296496078.

El dossier original permanece local, fuera de Git y del build. Las versiones anteriores del PDF se conservan como archivo histórico. Esta migración no cambió el hosting publicado.
