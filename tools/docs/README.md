# Regenerar el manual visual

El PDF vigente se guarda en `docs/design-system.pdf`. Las versiones anteriores 1.0, 1.1, 1.2, 1.3, 1.4 y 1.5 se conservan en docs/archive/. La versión 1.7 registra SEO preparado, dominio pendiente, tarjeta social y 404. El lector real sigue pendiente por decisión del usuario.

## Requisitos opcionales

Python 3.11 o posterior, ReportLab y pypdf. No son necesarios para desarrollar o construir la landing.

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r tools/docs/requirements.txt
.\.venv\Scripts\python.exe tools/docs/build_design_system.py
```

En Linux/macOS usar `.venv/bin/python`. El generador resuelve rutas a partir de su propia ubicación y utiliza las tipografías de `fonts/`, con sus licencias OFL. No requiere fuentes instaladas en Windows ni un servicio de red para generar el PDF.

## Revisión

El script comprueba número de páginas, límites del cuerpo y extracción de texto. Esas verificaciones no reemplazan la revisión visual. Renderizar con Poppler, revisar todas las páginas y corregir tablas, cortes o superposiciones antes de entregar una nueva versión:

```powershell
pdftoppm -png -scale-to 1100 docs/design-system.pdf tmp/manual
```

Actualizar fecha, versión, tokens y medidas cuando cambie la interfaz. Las recomendaciones deben identificarse como tales, diferenciadas de lo implementado.

## Checklist y avance por etapas

La checklist detallada se guarda en docs/checklist-paso-a-paso.pdf. Su estado técnico y evidencia se registran en docs/checklist-progress.json. Para actualizarla:

```powershell
python tools/docs/build_checklist.py
```

El generador usa los mismos requisitos y fuentes del manual. Verifica las 22 páginas, 136 campos y la coherencia entre valores lógicos y widgets. El registro decide los estados de tareas que contiene; los otros campos y casillas manuales existentes se conservan al regenerar. Una edición manual del PDF no modifica el JSON. Incorporar las decisiones de esa revisión al registro antes de regenerar si afectan una tarea registrada.

Al cerrar un lote, registrar comando, resultado, fecha, responsable y evidencia. Mantener separado el cierre técnico de la autorización de merge o despliegue. Renderizar y revisar las páginas afectadas.

La tarjeta social se regenera con build_social_card.py y Pillow usando los recursos locales.

La versión 1.8 registra escudo optimizado, fuentes locales y rendimiento; checklist v1.6 con evidencia de etapa06. Fuentes WOFF2: tools/performance/build_fonts.py con dependencias opcionales separadas.

Manual vigente1.9 y checklist1.7 registran seguridad preparada y pendientes de hosting/privacidad institucional. No cambian la composición de la landing.
