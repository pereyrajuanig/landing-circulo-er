# Registro de diseño

## 1.1 - 11 de octubre de 2026

Ajuste solicitado: una experiencia más cercana, cálida y orientada al acompañamiento, conservando la identidad institucional aprobada en la versión inicial.

- Portada marfil con el mensaje «Tu historia nos une. Seguimos a tu lado».
- Acción principal «Hablemos», dirigida a la sección de contacto.
- Escudo sin mezcla de colores, contenido dentro de un marco con arco y tonos cálidos.
- Franja «Te escuchamos / Te acompañamos / Nos encontramos».
- Filiales en una superficie clara; textos y controles más grandes.
- Formas suavizadas en botones, selección de alojamientos y contacto.
- Textos de bienvenida, pertenencia, orientación y conversación.
- En móviles pequeños, selector de alojamientos con dos columnas y franja de acompañamiento apilada.

La capa visual está en `dist/warmth.css`, cargada después de `dist/styles.css`. Los datos institucionales, las localidades y los canales de contacto se mantienen. La revisión visual por el usuario sigue pendiente.

## 1.0 - 9 de octubre de 2026

Base visual aceptada: azul profundo, dorado, tipografía Libre Caslon Display y DM Sans, escudo protagonista y estructura institucional. Documentada en el PDF original de 22 páginas.

## 12/10/2026 · Versión 1.2 · Astro

Migración solicitada por el usuario: Astro 7.3.8, TypeScript, componentes y cuatro colecciones JSON. Se conserva CSS y escudo. Configuración estática de Vercel preparada, sin desplegar. Manual y documentación actualizados. El CMS queda como una fase posterior con requisitos por acordar.

## 13/10/2026 · Versión 1.3 · Controles de calidad

Tipos, ESLint y Prettier separados; CI actualizado y seguimiento de tareas con evidencia. El formato del código mejora su lectura y conserva comportamiento y diseño. El manual técnico y la checklist se alinean con los scripts reales.

## 13/10/2026 · Versión 1.4 · Lectura y uso

El usuario eligió mantener la composición. Rótulos y controles más legibles, enlaces con área mínima de 44px, foco de navegación móvil y contornos del selector sin recorte. Nombres extensos y correo se adaptan al ancho. Matriz de siete viewports y reflujo 320px revisados. Zoom de navegador al 200 % confirmado manualmente por el usuario; aceptación visual final pendiente. Etapa 01 integrada mediante PR #3 (4410368).

## 13/10/2026 · Versión 1.5 · Accesibilidad

Salto al contenido enfocable, menú sin foco oculto al cambiar el ancho y cierre al salir por Tab. Borde funcional #826E48, filtro con estado explícito y relación de alojamientos con su panel. Teclado, contraste y reflujo revisados; prueba de lector real diferida por decisión del usuario. Etapa 02 integrada por PR #4 (20181ac).

## 13/10/2026 · Versión 1.6 · Regresión de flujos

Siete flujos Chromium en dos viewports se incorporan a quality, con captura y traza ante fallos. La suite detectó pérdida de foco al ampliar un viewport móvil; se recupera en el primer enlace visible. No cambian los tokens, el contenido ni la composición. PR #5 integrado técnicamente; lector real pendiente.

## 1.7 · 13/10/2026

SEO preparado sin dominio ficticio; previews noindex. Tarjeta social y 404 con identidad existente. Dominio diferido por el usuario, rastreo real pendiente.

## 1.8 · 13/10/2026

Escudo optimizado con Astro y fuentes locales de las mismas familias; composición conservada. Rendimiento medido antes/después; INP de campo pendiente.

## 1.9 · 13/10/2026

Headers y CSP Report-Only preparados; controles de hashes, exclusiones y almacenamiento. Diseño e interacciones conservados. Hosting/HTTPS y privacidad institucional pendientes.

Publicación de revisión autorizada el13/10/2026: manual1.10 y checklist1.8, contenido/secciones y dominio pendientes. Registro: docs/vercel-preview.md.

Revisión del29/10/2026: propuesta de diseño con beneficios, alojamientos y salones como prioridades. Aceptación visual y merge pendientes. Detalles en docs/design-benefits-spaces.md; manual1.11 y checklist1.9 actualizados.

## 1.12 · 29/10/2026 · sitio institucional en revisión

La propuesta pasa a 18 páginas y 404, con fichas de beneficios y destinos, navegación compartida, preguntas frecuentes y colección de noticias/logros sin entradas reales. Mantiene anclas históricas del inicio. Panel institucional solicitado y diferido; Facebook será fuente, conexión pendiente. Sin nuevos paquetes; no hay merge autorizado de este lote.

## 1.13 · 29/10/2026 · fotografías ilustrativas

Cuatro muestras generadas por solicitud del usuario; visibles en portada, alojamientos y salones, con galería en las seis fichas. Avisos y alt evitan presentarlas como evidencia real. Recursos propios, WebP responsive y carga diferida inferior. Datos y prestaciones sin cambios. Propuesta en rama; fotos reales siguen pendientes.

## 1.14 · 29/10/2026 · fotografías de internet

Se sustituyen las cuatro imágenes generadas por12 fotos de Pexels con registro de autor, fuente y licencia. Cobertura de18 páginas públicas más404; beneficios con fotografía propia por categoría; habitaciones alternadas y paisaje en galería, con crédito dinámico. Se mantienen avisos de referencia y se conservan pendientes las fotografías institucionales reales. Manual26 páginas; checklist1.12 conserva23 páginas y 145 campos.

## 1.15 · 30/10/2026 · contenido y fotografía institucional

23 recortes recibidos reemplazan referencias donde existe correspondencia por localidad. Beneficios con información detallada; ocho destinos, catálogo de cinco espacios, filiales y cuatro memorias del archivo. Se conservan paleta, tipografías, escudo y tono. Galerías variables sin ampliar originales; selector con figura por destino. Referencias de Pexels aún identificadas. Manual1.15 (27 páginas) y checklist1.13 (23 páginas,145 campos) preservan estados históricos.

## 1.16 · 30/10/2026 · recorrido de ciudades en portada

Se aplica la dirección elegida: foto institucional y grabado local para Concordia, Federación y Federal. Avance automático de 8 segundos, controles, pausas y respaldo sin JS; mensaje y accesos estables. Se conservan paleta, tipografías y escudo. Manual 28 páginas; checklist 23 páginas y 145 campos, sin certificar pendientes institucionales.
