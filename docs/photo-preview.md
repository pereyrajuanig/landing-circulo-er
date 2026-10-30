# Fotografías de referencia de internet

29/10/2026 · Rama codex/fotos-ilustrativas · PR #12 · Base main eb1f66d.

## Pedido vigente

El usuario pidió buscar fotografías en internet y distribuirlas por todas las páginas. Esta revisión sustituye la propuesta generada anterior. Se usan 12 fotografías descargadas de Pexels, conservadas en src/assets/reference y optimizadas localmente por Astro. No se generan imágenes.

## Cobertura

- Inicio: comunidad, beneficios, selector de alojamiento, institución, salón y contacto.
- Beneficios: índice y cinco fichas, con salud, trámites, farmacia, turismo y recreación.
- Alojamientos: índice y seis fichas; tres habitaciones de referencia alternadas y paisaje natural.
- Salones, institución, contacto y novedades: fotografías relacionadas con cada contexto.
- 404: paisaje de referencia después de los enlaces de regreso.
- Artículos futuros: plantilla preparada; la colección sigue vacía y no se inventan noticias.

Son 18 páginas públicas más 404. Ninguna foto demuestra instalaciones, servicios, integrantes, actividades, equipamiento o disponibilidad del Círculo.

## Fuente, licencia y créditos

Registro individual: [photo-sources.json](photo-sources.json), con autor, enlace original, descarga, licencia, fecha, dimensiones y SHA256. Política: [photo-sources.md](photo-sources.md). Cada imagen muestra el aviso FOTO DE REFERENCIA y un epígrafe con autor y enlace a Pexels.

ReferencePhoto y PhotoGallery centralizan la presentación. src/lib/reference-photos.ts relaciona las fotografías con servicios y destinos. Se retiran los cuatro PNG generados; los prompts históricos permanecen en docs/archive/demo-photo-prompts-ai-replaced.json.

## Carga y galería

Astro genera WebP locales y tamaños adaptables. Portada eager; imágenes inferiores lazy. No se hacen solicitudes a Pexels al visitar el sitio; los enlaces de crédito se abren solo por decisión del visitante. Sin paquetes nuevos.

Las fichas tienen galería nativa con dos imágenes, ampliación, navegación por botones/flechas, Escape y retorno de foco. El crédito cambia con la imagen. Sin JavaScript se conserva el enlace a la versión grande. CSP mantiene el hash del script, sin ampliar dominios.

## Verificación y límites

Matriz: 19 rutas × 6 anchos (320/390/768/1024/1440/1920), 114 comprobaciones, sin desbordes ni errores JavaScript; registro reference-photo-evidence.json. Capturas en docs/media/fotos-_.png y referencia-_.png. La suite configurada conserva 13 Node y 26 Chromium por modo CSP; el resultado final se informa en el PR.

Aceptación visual y merge pendientes. No certifica WCAG ni sustituye la prueba real con lector. CMS, Facebook, contenido definitivo, privacidad y dominio siguen pendientes. Las tareas 12.03 y 12.04 de fotografías reales no se cierran.

## Reemplazo por material institucional

1. Recibir cada archivo con identificación de sede, servicio o actividad y autorización de uso.
2. Confirmar personas, contexto y derechos antes de publicarlo.
3. Reemplazar la referencia, ajustar alt/epígrafe y retirar su aviso únicamente cuando esté verificada.
4. Revisar tamaño, recorte, carga, galería y teclado; actualizar fuentes, manual y checklist.

## Actualización30/10/2026 · material institucional

El antecedente Pexels fue integrado mediante PR #12 en main 5aeee25. El usuario entregó luego el material de VideoCirculo-material-recopilado. La rama codex/contenido-institucional sustituye referencias por 23 recortes propios donde existe contexto verificable. Ver institutional-content.md para cobertura, limitaciones y referencias aún vigentes. El componente actual se llama SitePhoto y el registro src/lib/photos.ts.
