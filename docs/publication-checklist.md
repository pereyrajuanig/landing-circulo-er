# Checklist de entrega y publicación

Esta lista no autoriza merge ni despliegue.

## Antes del PR

- [ ] Alcance claro; rama desde main actualizado; diff sin cambios ajenos o secretos.
- [ ] npm ci, npm run validate (tipos, lint, formato, build y tests) y git diff --check aprobados.
- [ ] Escritorio y móvil revisados; menú, servicios, filiales y alojamiento probados.
- [ ] Documentación y PDF alineados; PR con validaciones y límites.
- [ ] Dossier original excluido de Git y dist.

## Antes de publicar en Vercel

- [ ] Merge y despliegue autorizados; quality aprobado.
- [ ] Contenido nuevo confirmado por la institución.
- [ ] Cuenta, titularidad, dominio y rama de producción definidos.
- [ ] vercel.json y Node 24 comprobados en la configuración real.
- [ ] Preview revisada antes de producción; dominio y metadatos finales configurados.
- [ ] Despliegue anterior disponible para recuperación.

## Después

- [ ] Vercel confirma éxito; URL, recursos e interacciones comprobados.
- [ ] Commit, dominio y fecha registrados.
- [ ] Limitaciones y datos por validar informados.

El Site histórico se conserva privado. No hay base de datos ni CMS en esta versión.
