# Panel editorial institucional

Estado vigente: 3/11/2026. El usuario solicitó activar el panel y creó su cuenta mediante GitHub.

El Studio está alojado en https://circulo-policia-er.sanity.studio/, con cuatro reseñas y nueve fotografías migradas. La integración de lectura de Astro está implementada en `codex/panel-editorial`; la web pública conserva el contenido local hasta el merge y la activación de Vercel.

Operación, arquitectura, instalación, variables, verificaciones y recuperación: [guía del panel](editorial-panel.md).

## Checklist

- [x] Crear proyecto/dataset público y autorizar CLI.
- [x] Desplegar Studio independiente en español con autenticación de Sanity.
- [x] Modelar noticias/logros, fotos, fechas, enlaces y borradores nativos.
- [x] Migrar contenido público actual conservando slugs y aclaraciones.
- [x] Implementar lectura de publicados en build y optimización local de imágenes.
- [x] Comprobar exclusión de borradores con una prueba autenticada/anónima real.
- [ ] Aprobar e integrar PR y activar fuente Sanity en Vercel.
- [ ] Conectar webhook y verificar publicación, actualización y retiro en la web pública.
- [ ] Confirmar titularidad institucional, plan y permisos de quienes editarán.
- [ ] Ensayar exportación/restauración y acordar retención.
- [ ] Capacitar con contenido aprobado.
- [ ] Evaluar beneficios, alojamientos y espacios editables en una etapa posterior; siguen en JSON.
- [ ] Activar Facebook cuando exista la página y se verifiquen permisos de Meta.

No se contrataron planes pagos ni se invitó a otras personas. El campo de Facebook solo guarda un enlace y no sincroniza contenido.
