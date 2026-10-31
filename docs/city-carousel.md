# Portada con recorrido automático de ciudades

30/10/2026 · Rama codex/portada-carrusel-ciudades · Base main bfe1aef, PR #13 fusionado con autorización.

## Decisión del usuario

El usuario pidió trasladar al sitio la identidad ilustrada de la campaña y mostrar cercanía alternando ciudades con fotografías reales. Después de revisar las maquetas solicitó aplicar el cambio y que el carrusel avanzara solo. Se implementa un único diseño de portada con Concordia, Federación y Federal; el mensaje, los accesos y la navegación permanecen estables.

## Contenido e identidad

Las fotos proceden del archivo institucional incorporado en PR #13: encuentro social de Concordia, taller creativo de Federación y actividad sociocultural de Federal. Cada registro conserva su localidad y epígrafe. Los grabados de las respectivas piezas de campaña acompañan la ciudad correspondiente como paisaje o patrimonio decorativo; no representan instalaciones del Círculo.

Se extrae solo la franja ilustrada de cada pieza. No se incorporan archivos completos de campaña, candidaturas, nombres, listas o fechas electorales. Fuentes, rectángulos y SHA256 en city-art-sources.json. No hay generación ni reconstrucción de imágenes. WebP adaptables de Astro; originales derivados en src/assets/cities.

Se mantienen escudo en cabecera y pie, Caslon, DM Sans, azul, dorado y fondos cálidos. Los controles tienen un área mínima de 44px. La fotografía y el grabado alternan juntos; el texto institucional permanece quieto.

## Funcionamiento

- Inicio automático y cambio cada 8000ms, definido en CITY_ROTATION_MS de src/lib/hero-cities.ts.
- Pausar/Iniciar recorrido, anterior/siguiente y tres botones de localidad.
- Selección manual o foco dentro del carrusel detienen el automático hasta reanudación explícita.
- Hover pausa temporalmente; salir permite seguir únicamente si no existe una pausa voluntaria.
- Fuera de pantalla o con pestaña oculta se suspende el temporizador. Al volver espera un intervalo completo.
- Movimiento reducido impide el inicio automático; la persona puede iniciar explícitamente el recorrido y navegar manualmente.
- Las actualizaciones automáticas no se anuncian continuamente al lector. Las selecciones manuales comunican ciudad y posición.
- Sin JavaScript se conserva Concordia, foto y grabado, con accesos funcionales; se ocultan controles que no operarían.
- Los pequeños recursos locales de las tres ciudades se anticipan para evitar una imagen vacía al avanzar. Sin servicios externos, almacenamiento o dependencias nuevas.

Referencia del comportamiento: [WAI APG, Carousel Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/). No se declara conformidad WCAG; la prueba real con lector sigue pendiente.

## Implementación y mantenimiento

Hero.astro conserva el contenido estable y renderiza CityCarousel.astro e ilustraciones decorativas. hero-cities.ts relaciona ciudad, foto y grabado. city-carousel.ts mantiene selección, temporizador, pausas, foco y preferencias; hero-cities.css limita los cambios visuales a la portada.

Para agregar una localidad: recibir foto y grabado correspondientes, registrar procedencia, añadir la entrada de hero-cities.ts y revisar textos, dimensiones, controles, pausa y carga. No reutilizar material de otra localidad como si fuera de la nueva.

La política CSP conserva sus restricciones; se actualizan únicamente hashes de scripts revisados. Alojamiento, salones, novedades y datos institucionales no cambian en este lote.

## Validación y estado

La suite añade tres casos de carrusel por dispositivo y por modo CSP. Configuración total: 14 Node +36 Chromium Report-Only +36 con CSP exigida (86 ejecuciones), más prueba editorial aislada. Incluye avance con reloj controlado, coherencia ciudad/foto/grabado, pausa, foco, reanudación, salida de pantalla, movimiento reducido y respaldo sin JavaScript.

Revisión visual de tres ciudades por seis anchos (320/390/768/1024/1440/1920): resultados en city-carousel-evidence.json; capturas en docs/media/carrusel-*.png. Resultado final de la suite y CI en el PR.

El control conserva su etiqueta durante un gesto de puntero para evitar desplazamientos antes de soltarlo. Un gesto cancelado se descarta y la activación por teclado no hereda acciones de puntero. La prueba verifica ambos casos y la secuencia pausa/inicio/pausa.

Manual 1.16 y checklist 1.14 actualizados; campos y tareas históricas preservados. La solicitud autoriza implementación, no un merge adicional: integración en main pendiente de autorización. CMS, Facebook, dominio, privacidad institucional, lector y validación de contenido variable siguen pendientes.
