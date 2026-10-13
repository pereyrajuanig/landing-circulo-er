# Etapa 02 · Diseño y experiencia

Fecha: 13 de octubre de 2026. Rama: codex/etapa-02-diseno-ux. Base: 4410368. Estado: siete tareas verificadas; revisión final e integración del PR pendientes.

## Dirección acordada

Juan eligió conservar la composición actual y pulir lectura, espacios y uso móvil. Se mantienen marfil, azul y dorado, el escudo, Caslon/DM Sans, textos y datos institucionales. No se incorporaron fotos ficticias ni nuevas prestaciones.

## Cambios y motivo

- Rótulos de sección en 12 px, auxiliares de lectura en 14 px y controles en 16 px; detalle del nombre institucional en 10 px. Se reemplazan tamaños auxiliares de 7-10 px sin cambiar la jerarquía principal.
- Áreas de interacción principales de al menos 44 px, incluido el input de búsqueda; botones principales de 56 px con el contenido actual. Los enlaces se subrayan al pasar el puntero.
- Foco del selector de alojamientos dentro de cada botón, para que la caja con overflow hidden no recorte el contorno.
- Al elegir una sección en el menú móvil, el foco pasa a su título después de la navegación nativa; Escape conserva el regreso al botón. Menú desplazable en pantallas bajas.
- Columnas y controles admiten contenido extenso. El nombre de alojamiento sin espacios se recortaba dentro del panel; ahora ajusta su línea. El correo puede cortar antes de @ con wbr, conservando texto y mailto.
- Variables CSS para tipografía de apoyo, área de controles, radios y espaciado vertical. La escala propuesta de 4 px continúa siendo una recomendación, no una normalización de todos los valores.

## Matriz comprobada

Codex In-app Browser. Valores efectivos de innerWidth/innerHeight; clientWidth puede ser menor por la barra vertical. Se revisaron las capturas de la página completa y los flujos en cada fila.

| Viewport CSS | clientWidth / scrollWidth | Navegación                     | Filtro, destinos y servicios                  |
| ------------ | ------------------------- | ------------------------------ | --------------------------------------------- |
| 360 × 800    | 360 / 360                 | Menú, Escape y foco en destino | Colón / sin resultados; Nogoyá; dos servicios |
| 390 × 844    | 390 / 390                 | Menú, Escape y foco en destino | Colón / sin resultados; Nogoyá; dos servicios |
| 430 × 932    | 430 / 430                 | Menú, Escape y foco en destino | Colón / sin resultados; Nogoyá; dos servicios |
| 768 × 1024   | 768 / 768                 | Menú, Escape y foco en destino | Colón / sin resultados; Nogoyá; dos servicios |
| 1024 × 768   | 1024 / 1024               | Cabecera completa              | Colón / sin resultados; Nogoyá; dos servicios |
| 1440 × 900   | 1440 / 1440               | Cabecera completa              | Colón / sin resultados; Nogoyá; dos servicios |
| 1920 × 1080  | 1920 / 1920               | Cabecera completa              | Colón / sin resultados; Nogoyá; dos servicios |

El filtro encuentra Colón al ingresar COLON y comunica la consulta sin resultados. Nogoyá cambia título, selección única y asunto mailto. Salud y Trámites pueden quedar abiertos a la vez. Registro completo: [evidencia JSON](stage-02-evidence.json).

## Casos complementarios

Reflujo a 320 × 800 y transición de cabecera a 801 × 800: sin desborde. En 640 × 360, el menú tiene scroll interno y Contacto queda alcanzable por teclado (borde inferior observado: 357,98 px).

Ruta local temporal con datos de QA explícitos: nombre de alojamiento y localidad sin espacios, descripción repetida y correo largo de example.invalid. A 1024 px, el título pasó de scrollWidth 1300 / clientWidth 612 a 612 / 612; el selector pasó de 566 / 270 a 270 / 270. También se verificó 360 px. La ruta se eliminó antes del build y no se incluye en Git.

Hover del botón principal observado en #E2C585. Foco de alojamiento seleccionado: contorno de 3 px con separación interior -5 px; aria-pressed correcto. Las consultas por correo y Maps se verifican como enlaces; no se enviaron mensajes.

## Controles y límites

npm run validate aprobado: tipos sin diagnósticos, lint sin advertencias, formato correcto, build de una única página y seis pruebas aprobadas. El texto y las anclas originales permanecen iguales. CI se registra después de ejecutarse en el PR de esta etapa.

El navegador integrado no aplica el atajo de zoom ni ofrece esa capacidad; no hay Chrome/Edge conectado. Juan confirmó la prueba manual solicitada de zoom de navegador al 200 %: «Se lee y puedo usarla al 200 %», incluyendo lectura, menú, filtro y alojamientos. No precisó si usó Chrome o Edge. La tarea 02.07 queda verificada por su respuesta; se conserva la distinción entre revisión manual y pruebas automatizadas. No se declara conformidad WCAG ni aprobación visual final del usuario. Merge y publicación requieren sus autorizaciones.

[Escritorio](media/etapa02-desktop.jpg) · [Móvil](media/etapa02-mobile.jpg) · [Foco en alojamiento](media/etapa02-focus-mobile.jpg) · [Menú horizontal](media/etapa02-menu-landscape.jpg).

Comprobación final de Astro preview: una página estática, script inline, búsqueda COLON → Colón, selección única de Nogoyá, input de 44px y ausencia de enlaces a la ruta de QA. Medidas sin ocultar barras del navegador: registro JSON actualizado.
