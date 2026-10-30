# Propuesta con fotografías ilustrativas

Fecha:29/10/2026. Rama codex/fotos-ilustrativas. Base main eb1f66d, correspondiente al PR #11 fusionado con autorización del usuario.

## Alcance solicitado

El usuario pidió fotografías ficticias para visualizar cómo podría quedar el sitio mientras reúne material real. Se generaron cuatro imágenes con la herramienta integrada image_gen: comunidad, habitación, patio y salón. Sus prompts completos y rutas están en demo-photo-prompts.json. Los originales seleccionados se copiaron a src/assets/demo/; no se depende de rutas de la cuenta ni de servicios de imágenes remotos.

Todas son muestras genéricas. No muestran personas, actividades ni instalaciones reales del Círculo y no verifican capacidad, equipamiento, accesibilidad ni disponibilidad de ningún destino.

## Diseño

- Portada con escena de comunidad y firma institucional; escudo conservado en cabecera, portada y pie.
- Habitación de muestra dentro del selector informativo.
- Índice de destinos con imágenes alternadas de habitación/patio; son las mismas muestras genéricas, no fotos diferentes de cada localidad.
- Las seis fichas tienen galería con habitación y patio, aviso visible y ampliación.
- Salones incorpora una escena de muestra en el bloque institucional.
- No se agregan noticias, logros, beneficios ni condiciones inventadas.

DemoPhoto y DemoGallery imprimen rótulos y descripciones que identifican las imágenes como ficticias. Los alt también lo indican. Los avisos se conservan hasta que las fotografías reales hayan sido recibidas y verificadas.

## Galería y carga

Enlaces a versiones WebP optimizadas que funcionan sin JavaScript. Con JavaScript se abre un dialog nativo: cerrar, anterior/siguiente, flechas y Escape; al cerrar se recupera el foco. Si el navegador no dispone de showModal se conserva el enlace normal.

Astro genera versiones de480/960/1440px. Portada con carga eager y prioridad alta; imágenes inferiores con lazy loading. La ampliación usa1440px y calidad82. No se agregan dependencias. CSP conserva las restricciones existentes y autoriza mediante hash el script inline generado de la galería.

## Verificación y límites

Matriz de18 rutas ×6 anchos sin desbordes ni errores de JavaScript: demo-photo-evidence.json. Capturas en docs/media/fotos-*.png. La suite incorpora el flujo de galería y retorno de foco, con13 Node y26 Chromium por cada modo CSP; el resultado final se registra en el PR.

No es auditoría WCAG completa ni prueba real con lector. Dominio, contenido definitivo, privacidad institucional, CMS y Facebook siguen pendientes. La selección de muestras no cierra las tareas12.03 y12.04 de fotos reales. Publicación en main requiere el merge autorizado de este nuevo lote.

## Cuando lleguen las fotos reales

1. Asociar cada fotografía con su alojamiento, salón o actividad y confirmar su contexto.
2. Sustituir las muestras y escribir alt y epígrafes reales; evitar reutilizar una misma foto como si correspondiera a varias sedes.
3. Retirar el rótulo de muestra solo de las imágenes verificadas.
4. Repetir los controles de carga, tamaños, galería, teclado y contenido; actualizar el manual y la checklist.
