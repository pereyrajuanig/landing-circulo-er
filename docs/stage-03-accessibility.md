# Etapa 03 · Accesibilidad

Fecha: 13 de octubre de 2026. Rama: codex/etapa-03-accesibilidad. Base: 20181ac3a8869de1ef0b9a5cd0a77f08fc8aa878. Código: c790ccae0fc2eadbfc1403e60d9978a48e92b08d.

Seis de siete tareas verificadas. **03.06 continúa pendiente**: Juan respondió «Prefiero dejar esa prueba pendiente» para la revisión real con lector de pantalla. El trabajo técnico se presenta en [PR #5](https://github.com/pereyrajuanig/landing-circulo-er/pull/5); la etapa completa no se considera cerrada.

## Cambios y motivo

- El salto al contenido ahora enfoca main mediante tabindex=-1; el siguiente Tab alcanza Hablemos. No agrega una parada de Tab al contenedor.
- El menú cierra al salir de la cabecera con Tab y al cruzar el breakpoint. Si el cambio de ancho oculta el enlace enfocado, devuelve foco al botón visible. Escape y elección de sección conservan su comportamiento.
- El buscador y Menú usan --control-border #826E48. El borde previo del buscador daba 2,14:1 sobre papel; el nuevo da 4,71:1 por dentro y 4,00:1 contra la superficie de filiales. Separadores decorativos conservados.
- El filtro declara role=status, aria-live=polite y aria-atomic=true; el input identifica la lista controlada. Los seis botones de alojamiento relacionan el panel mediante aria-controls. Su patrón sigue siendo grupo de botones con aria-pressed y Tab para cada opción.
- El correo expone un nombre accesible íntegro, conservando el salto visual antes de @. Botones explícitos type=button; enlace auxiliar superior con altura mínima nominal de 24 px.
- Una prueba del HTML construido controla salto enfocable, referencias ARIA existentes, selección inicial única y controles nativos. El contrato de texto se conserva íntegro; solo se incorpora el ID stay-detail a la referencia de IDs.

## Estructura y recorrido

Idioma es-AR; un H1, cinco H2 y dos H3 en orden. Header, navegación con nombre, main y footer; etiqueta visible del buscador y texto alternativo pertinente del escudo. Flechas y adornos ocultos al árbol accesible. No hay diálogos ni widgets que requieran un patrón de pestañas.

K.01 a K.07 recorridos con teclado en 1440×900 y 390×844 efectivos: salto, cabecera, CTA, servicios, búsqueda, seis destinos y contacto. Tab/Shift+Tab sin trampas observadas; servicios con Enter/Space y enlace del contenido abierto alcanzable. MARIA encuentra María Grande, ZZZZ informa ausencia de resultados y borrar restituye 24 localidades. El estado vacío al borrar es el comportamiento vigente: su percepción por voz queda pendiente.

Enter/Space seleccionan cada uno de los seis destinos, manteniendo foco en el botón y una sola opción presionada; título, descripción y asunto mailto coinciden. No se enviaron correos ni se abrió Maps. El centro de todos los controles registrados quedó visible; se inspeccionaron también los contornos de foco. El árbol del navegador identifica los botones presionables como checkboxes; el HTML continúa usando button y aria-pressed, no se atribuye una lectura de voz a esa representación.

Menú: abre con teclado, Escape cierra y devuelve foco; Tab fuera de cabecera cierra. Filiales enfoca H2 visible (top 193,18 px; header inferior 83,91 px). En 640×360, Contacto queda visible al desplazar el menú (borde inferior 357,68 px). Cambio de escritorio a móvil con Servicios enfocado devuelve foco a Menú; sentido inverso lleva a Institución.

## Contrastes y tamaños

Se calcularon relaciones a partir de sRGB efectivo de CSS, componiendo transparencias sobre fondos; no se usan píxeles suavizados del texto para decidir. Valores mostrados con dos decimales, evaluación con precisión completa. Las combinaciones y estados inspeccionados están en [evidencia JSON](stage-03-evidence.json).

| Uso                           | Colores           | Relación |
| ----------------------------- | ----------------- | -------- |
| Texto principal / papel       | #143049 / #FCFAF5 | 13,00:1  |
| Texto secundario / filiales   | #56656C / #EEE7DA | 4,92:1   |
| Rótulo dorado / filiales      | #826329 / #EEE7DA | 4,53:1   |
| Texto de opción seleccionada  | #FCFAF5 / #092B48 | 13,88:1  |
| Texto de opción en hover      | #56656C / #E8DFCD | 4,57:1   |
| Botón dorado en hover         | #062139 / #E2C585 | 9,78:1   |
| Botón azul en hover           | #FCFAF5 / #164465 | 9,83:1   |
| Borde funcional / papel       | #826E48 / #FCFAF5 | 4,71:1   |
| Borde funcional / filiales    | #826E48 / #EEE7DA | 4,00:1   |
| Foco dentro de selección azul | #A37923 / #092B48 | 3,66:1   |
| Foco exterior / papel         | #A37923 / #FCFAF5 | 3,79:1   |

El foco exterior del botón dorado se compara con la superficie cálida donde se dibuja el contorno, separado 5 px del botón. El foco del selector se dibuja dentro, a -5 px, y se compara con el fondo azul seleccionado. El signo de apertura de servicios da 4,29:1; es un indicador gráfico. El texto grande de comunidad da 4,07:1. Bordes y líneas decorativos no se confunden con información funcional.

Portada: el gradiente radial tiene alfa máximo 85/255 sobre #F3EEE4. La cota más oscura da 4,85:1 para el párrafo secundario y 4,47:1 para el énfasis del título grande. Esa última cota no se acepta para texto normal. El rótulo normal está lejos del centro del gradiente: por su rectángulo, en 1440 px el alfa máximo es menor de 0,009, y en 390/320 px cae fuera de la zona coloreada. La geometría y los RGB de la cota están registrados. No se evaluaron todas las dimensiones posibles ni fondos fotográficos futuros.

A 320×800, clientWidth/scrollWidth fueron 306/306 con barra vertical normal y DPR 1,1; sin scroll horizontal. Controles principales de 44 px nominales, CTA de 56 px y enlace superior de 24 px. La franja auxiliar no promete 44 px para todos sus enlaces. El navegador reporta pequeñas fracciones por rasterización (43,99 y 23,99 px); la separación de objetivos auxiliares también se inspeccionó. Zoom al 200 % conserva la confirmación manual del usuario de etapa 02; no se presenta como una nueva prueba automatizada.

## Validación y límites

npm run validate aprobado: 22 archivos de tipos sin diagnósticos, lint sin advertencias, formato, build estático y siete tests aprobados. [Quality del código](https://github.com/pereyrajuanig/landing-circulo-er/actions/runs/38449679551). Preview del build revisada a 320 px: menú, foco, MARIA, Nogoyá por Space y enlaces coherentes; sin desborde.

DOM y atributos de regiones live inspeccionados. **No se escuchó Narrador/NVDA**: orden de anuncios, repetición, lectura de resultados, cambio de alojamiento y estados de servicios requieren esa prueba manual. prefers-reduced-motion está implementado en CSS; en esta etapa no se emuló la preferencia del sistema. Tampoco se completó una matriz de todos los navegadores, carga sin fuentes externas o auditoría integral WCAG.

Manual v1.5 y checklist v1.3 mantienen 22 páginas y formularios editables; versiones anteriores archivadas. El registro diferencia seis tareas verificadas, lector pendiente e integración del PR pendiente. El cierre de etapa 02 se registra con PR #4 autorizado, main 20181ac y [quality de main](https://github.com/pereyrajuanig/landing-circulo-er/actions/runs/38445597091). No se publica en Sites ni Vercel.

[Portada](media/etapa03-desktop.jpg) · [Buscador y foco móvil](media/etapa03-search-mobile.jpg) · [Selección y foco](media/etapa03-focus-mobile.jpg) · [Menú bajo](media/etapa03-menu-landscape.jpg) · [Build a 320 px](media/etapa03-search-320.jpg).

## Criterios consultados

WCAG 2.2 AA se usa como referencia de revisión, sin declarar certificación. Umbrales y alcance se contrastaron el 13/10/2026 con fuentes W3C: [contraste de texto](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html), [contraste no textual](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html), [foco no oculto](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html), [mensajes de estado](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html), [tamaño mínimo de objetivos](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) y [reflujo](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html).
