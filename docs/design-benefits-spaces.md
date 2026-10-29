# Beneficios y espacios como prioridades

Revisión solicitada el 29/10/2026. Rama codex/diseno-beneficios-espacios; base main b3003dc. Propuesta para revisión visual del usuario, sin merge automático.

El usuario aclaró que los beneficios están dirigidos a personas retiradas de la Policía o con una pensión vinculada a ella. Hero y contacto explicitan ese alcance; se evita presentar la incorporación como abierta a cualquiera. No se añadieron requisitos administrativos ni beneficios exclusivos no confirmados.

## Jerarquía

Portada cálida con mensaje de acompañamiento y tres accesos editoriales: beneficios, alojamientos y salones. Siguen los servicios existentes, seis destinos y una sección propia de salones para eventos en Paraná. Historia y filiales aparecen después. Menú: Beneficios, Alojamientos, Salones, Filiales, Contacto.

Escudo y fuentes originales preservados. Azul profundo para estadías y panel marfil para encuentros. No se usan fotos de stock que simulen instalaciones reales. Se pregunta por capacidad, equipamiento, fechas y condiciones; no se afirman datos todavía no confirmados. Consultar un salón prepara mailto con asunto específico; no envía ni confirma reservas.

## Verificación

Contrato editorial actualizado para este cambio intencional. Se conserva cobertura de teclado, menú, búsqueda y seis alojamientos; se añade prueba de los tres accesos y asunto del correo de salones. Capturas de escritorio/móvil en docs/media/beneficios-*.png. Resultados finales se registran en el PR. La aprobación del usuario y los datos institucionales definitivos siguen pendientes.

Manual1.11:23 páginas con addendum que actualiza las muestras base. Checklist1.9 conserva los campos y tareas históricas; el lote nuevo no marca aceptaciones ni etapas editoriales como completadas. CSP y stack sin cambios.

Cobertura de este lote: 11 Node +22 Chromium Report-Only +22 Chromium con CSP exigida local. El script de aplicación no cambió; se conserva su hash CSP.

Validación local final: check32 archivos sin diagnósticos, lint/formato correctos,55 ejecuciones aprobadas. Seis anchos320/390/768/1024/1440/1920 sin desborde; capturas revisadas. PDF:23/22 páginas,136 campos preservados; solo se actualizó la ficha del lote.

CI detectó avisos publicados después de la auditoría anterior. Ajuste acotado del lockfile: fast-uri3.1.8→3.1.9 y undici8.11.2→8.12.3, dentro de sus rangos existentes; package.json y dependencias directas sin cambios. Se repite npm ci/validate y audit antes de dar el lote por validado.
