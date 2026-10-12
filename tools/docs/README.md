# Regenerar el manual visual

El PDF vigente se guarda en `docs/design-system.pdf`. El archivo de la primera propuesta se conserva en `docs/archive/design-system-v1.0.pdf`.

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
