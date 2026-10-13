# Inventario para acordar privacidad con la institución

Estado: preparación técnica, sin aprobación institucional ni publicación de un aviso. Fecha:13/10/2026.

## Comportamiento de la landing actual

El buscador filtra localidades dentro del navegador y no envía la consulta a una API. El selector muestra información y prepara un enlace al cliente de correo. Los mensajes los decide y envía el visitante desde ese cliente; la landing no recibe formularios ni guarda su contenido. Maps se abre por enlace, no como mapa embebido. Tipografías y recursos servidos desde el mismo origen. Sin analítica, cookies o almacenamiento de aplicación observados en las pruebas locales.

El hosting futuro y los servicios externos se deben inventariar por separado. No se han inspeccionado logs, plazos o configuraciones de la cuenta de hosting y de la casilla institucional.

## Decisiones pendientes del responsable institucional

- Designar quién administra la web, la cuenta de hosting y la casilla de consultas.
- Confirmar qué datos reciben por correo, quién accede, para qué los usa y cómo los conserva/elimina.
- Revisar qué registra el hosting elegido y las opciones habilitadas.
- Acordar contenido y contacto de un aviso de privacidad con información real, antes de publicarlo.
- Registrar cualquier analítica, widget, formulario o herramienta que se proponga incorporar.

## Si se agregan funciones

Formularios, reservas, área de socios, CMS o analítica abren una revisión propia: tipos de datos, accesos, validación, destino, registros, retención y recuperación. No reutilizar la conclusión de esta landing estática para esas funciones.

Esta lista documenta decisiones del producto; no afirma que un texto legal o un mecanismo de consentimiento estén aprobados. El código actual no incorpora un banner ni una política pública nueva.
