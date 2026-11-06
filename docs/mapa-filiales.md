# Mapa georreferenciado de filiales

Implementación en `codex/mapa-filiales`. Reemplaza únicamente la ilustración del encabezado de Presencia provincial, compartido por Inicio e Institución. No modifica el directorio, sus 24 filiales, las fichas, las tipografías ni otras secciones. Publicación del estado local autorizada el 6/11/2026; controles remotos y despliegue se registran en el PR de la rama.

## Datos y significado

Son **25 localidades: 24 filiales y Paraná como única sede central**. Las coordenadas son centroides oficiales de localidades, no ubicaciones de edificios. No usar el mapa para dar indicaciones de llegada a una sede.

- Contorno: servicio público del Instituto Geográfico Nacional, capa provincial 0, filtro `IN1='30'`, salida GeoJSON WGS84 (`outSR=4326`). URL completa, fecha de descarga y SHA-256 del original en `src/data/geografia/entre-rios.geo.json`.
- Localidades: API Georef, consulta `https://apis.datos.gob.ar/georef/api/localidades?provincia=30&max=1000`. Se verificaron nombre, provincia, identificador y coordenadas. Fuente y fecha en `src/data/geografia/localidades-filiales.json`.
- Se conservan registros de localidad censal con identificador de ocho dígitos. Cerrito, Concordia y Diamante también tienen entidades/componentes de diez dígitos con el mismo nombre: no se mezclan esos niveles ni se duplican marcadores.
- **Feliciano** mantiene el nombre del directorio; su nombre oficial es **San José de Feliciano**, identificador `30042010`. No se utiliza el centroide del departamento Feliciano.
- Direcciones y contactos individuales quedan en `null` hasta su verificación institucional. Los enlaces consultan las fichas existentes o preparan un correo a la sede central; no se crean fichas vacías.

## Geometría y presentación

El contorno original tiene 10.429 vértices. Se simplificó mediante Douglas–Peucker con tolerancia de 0,00025 grados y redondeo a seis decimales: 2.653 vértices. No se aplica deformación artística al contorno. La tolerancia está expresada en grados, no en metros; depende de la latitud.

`src/lib/mapa-filiales.ts` adapta la orientación de los anillos a D3, comprueba el polígono y genera `geoPath` con una proyección Mercator ajustada a la lámina. Contorno y puntos usan la misma proyección con orden **[longitud, latitud]**. La base del asta se dibuja en el punto proyectado. Las posiciones de rótulos se distribuyen por columnas; mover un rótulo no mueve un punto. No es un plano catastral ni reemplaza cartografía oficial de límites a otras escalas.

La lámina utiliza marfil cálido, tinta azul marino, trama diagonal, punteado tenue, retícula geográfica y norte. La retícula se calcula con la proyección. Trama y punteado son recursos decorativos y no representan relieve. No se inventan ríos ni accidentes geográficos. Paraná se distingue por bandera dorada y subtítulo Sede central. Se reutilizan DM Sans y Libre Caslon Display.

## Interacción y accesibilidad

- SVG responsive con título y descripción accesibles; conserva las 25 banderas.
- Cada localidad tiene nombre y tipo descriptivos. Con JavaScript se puede seleccionar mediante clic, Enter o Espacio. Se conserva el foco y se anuncia la selección mediante una región de estado.
- Un selector nativo de 48 px permite elegir cualquiera de las 25 localidades con teclado o interacción táctil, incluso cuando las banderas están próximas.
- En móvil solo se muestra el rótulo seleccionado; su nombre y tipo también aparecen en texto HTML de tamaño legible debajo del mapa. No se desplazan las coordenadas para agrandar la separación.
- Sin JavaScript las banderas funcionan como enlaces a fichas/contacto; el directorio sigue disponible y se oculta el selector inactivo.
- `id` es una propiedad del componente. Al utilizar varias instancias en una misma página se deben pasar identificadores distintos para títulos, patrones, recortes y controles.
- Para incorporar una dirección/contacto real se actualizan los datos verificados y la ficha correspondiente; no se deducen del centroide.

## Rendimiento y seguridad

D3-geo y sus tipos son dependencias de desarrollo. La proyección y el trazado se ejecutan durante el build de Astro. El navegador recibe SVG estático, CSS y un pequeño controlador de selección. No se consulta Georef, IGN ni otra API al navegar. No hay SDK cartográfico, imágenes generadas, dependencias de mapas comerciales, geolocalización del visitante ni almacenamiento de sus selecciones.

La CSP conserva sus restricciones; solo se agrega el hash exacto del script compilado mediante `npm run security:update`. No se habilita `unsafe-inline`, `eval` ni conexiones externas.

## Validación

Las pruebas geográficas comprueban 25 identificadores únicos, correspondencia exacta con el directorio más Paraná, provincia 30, pertenencia al polígono, única sede central y reversibilidad de la proyección. El build repite los invariantes esenciales.

Las pruebas de navegador comprueban las 25 posiciones SVG, selección de todas las opciones, teclado, enlaces, respaldo sin JavaScript, ausencia de solicitudes externas/errores/CSP y rótulos sin solapamientos. Se revisan Inicio e Institución, con la suite habitual en escritorio y móvil y una revisión adicional de 820 px.

Comandos: `npm run validate`. Las pruebas Node del mapa se incluyen en `npm run test:unit`; los flujos están en `tests/e2e/mapa-filiales.spec.mjs`, tanto en modo CSP Report-Only como en bloqueo.

Las capturas y los registros locales de revisión se guardan en `tmp/mapa/` y no se versionan. La revisión automática no equivale a una prueba con lector de pantalla real. No implica aceptación institucional ni publicación.

## Coordenadas utilizadas

La siguiente tabla se obtiene del JSON local verificado. Los decimales expresan los valores de la fuente y no una precisión equivalente en la ubicación de las sedes.

| Localidad              | ID Georef | Latitud           | Longitud          |
| ---------------------- | --------- | ----------------- | ----------------- |
| Cerrito                | 30084050  | -31.5799390266432 | -60.0755467034037 |
| Chajarí                | 30028010  | -30.7547242034728 | -57.9817893682594 |
| Colón                  | 30008020  | -32.2250500793422 | -58.1422695022137 |
| Concepción del Uruguay | 30098040  | -32.4846612655344 | -58.2321207793941 |
| Concordia              | 30015060  | -31.3919648167661 | -58.0170077848337 |
| Crespo                 | 30084070  | -32.0307595065229 | -60.3060920490641 |
| Diamante               | 30021080  | -32.0707572517765 | -60.6382083360621 |
| Federación             | 30028070  | -30.9902627352677 | -57.9177623238373 |
| Federal                | 30035030  | -30.9562142806914 | -58.7795875052823 |
| Feliciano              | 30042010  | -30.3854437363788 | -58.7502572752322 |
| General Ramírez        | 30021120  | -32.1772681367295 | -60.2016467358906 |
| Gualeguay              | 30049040  | -33.1504300803974 | -59.3105755860058 |
| Gualeguaychú           | 30056070  | -33.0077976973495 | -58.5107700863228 |
| Hasenkamp              | 30084100  | -31.5121688745034 | -59.8352827889199 |
| La Paz                 | 30070040  | -30.7404766242794 | -59.6443012787354 |
| María Grande           | 30084140  | -31.6628074993378 | -59.9040145960044 |
| Nogoyá                 | 30077070  | -32.3989615251678 | -59.787695341605  |
| Paraná                 | 30084160  | -31.7401601621031 | -60.5274260494443 |
| Rosario del Tala       | 30091100  | -32.3006755060116 | -59.1390668036666 |
| San Salvador           | 30088020  | -31.6249608786519 | -58.5050320059527 |
| Santa Elena            | 30070080  | -30.9444600016756 | -59.7891212913891 |
| Urdinarrain            | 30056110  | -32.6910460992997 | -58.8884200764691 |
| Viale                  | 30084270  | -31.8721090330188 | -60.0129512483241 |
| Victoria               | 30105060  | -32.6216058234351 | -60.1579539516715 |
| Villaguay              | 30113080  | -31.8676375710354 | -59.0268852125777 |

## Evidencia de cierre — 5/11/2026

- `npm run check`: 84 archivos, cero errores, advertencias o hints.
- `npm run lint`: aprobado.
- `npm run build`: 37 páginas, referencias e integridad CSP aprobadas. Se actualizó únicamente el hash permitido del controlador del mapa, sin relajar directivas.
- `npm test`: 24 pruebas Node, fixture editorial y 47 pruebas Chromium aprobadas en cada uno de los dos modos CSP. En cada modo se omite en el proyecto móvil la prueba específica de rótulos desktop/tablet; sí se ejecutan selección táctil, teclado y respaldo sin JS en móvil.
- `npm run validate` no llega a ejecutar tests porque el formato global señala `pnpm-lock.yaml`, archivo ajeno previo sin seguimiento. No se modifica. Prettier sobre todos los archivos versionados y los nuevos del mapa pasó; tipos, lint, build y pruebas se ejecutaron de forma independiente.
- Revisión visual local: 1440, 820 y 390 píxeles. Sin desborde horizontal.
- Distancia máxima medida desde los 10.429 vértices originales al contorno simplificado: 0,0391 unidades SVG en esta proyección. Se comparó con la descarga cuyo SHA-256 figura en los datos; no expresa precisión de edificios ni un error geodésico absoluto.
- El contorno se define una sola vez y se reutiliza mediante SVG `use`: mapa de 73.492 bytes, 19.148 bytes comprimido con gzip en la medición local. No incluye el HTML de los controles externos al SVG.
- Publicación del estado local autorizada por el usuario el 6/11/2026. El resultado de los controles remotos y del despliegue se registra en el PR de esta rama. La prueba con lector de pantalla real no se ejecutó.
