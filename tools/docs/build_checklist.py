from pathlib import Path
import json
import sys
from xml.sax.saxutils import escape

from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph, Table, TableStyle
from pypdf import PdfReader

sys.stdout.reconfigure(encoding='utf-8')
ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'docs/checklist-paso-a-paso.pdf'
PROGRESS_PATH = ROOT / 'docs/checklist-progress.json'
PROGRESS = json.loads(PROGRESS_PATH.read_text(encoding='utf-8')) if PROGRESS_PATH.exists() else {}
EXISTING_VALUES = {}
if OUT.exists():
    EXISTING_VALUES = {name: field.get('/V', '') for name, field in (PdfReader(str(OUT)).get_fields() or {}).items()}
FONT = ROOT / 'tools/docs/fonts'
pdfmetrics.registerFont(TTFont('DM', str(FONT / 'DMSans-Variable.ttf')))
pdfmetrics.registerFont(TTFont('Caslon', str(FONT / 'LibreCaslonDisplay-Regular.ttf')))
pdfmetrics.registerFontFamily('DM', normal='DM', bold='DM', italic='DM', boldItalic='DM')
W, H = A4
M = 44
CW = W - 2 * M
NAVY, DEEP, GOLD = '#092b48', '#062139', '#d2b16a'
PAPER, CREAM, INK, MUTED, LINE = '#fcfaf5', '#f3eee4', '#143049', '#56656c', '#dfd8cb'
GOLDINK, GREEN = '#826329', '#34664a'
DATE = '30 de octubre de 2026'
SHA = PROGRESS.get('baselineCommit', 'aec7c2759948f893330e4afe36d224bba26f11b3')
REPO = 'https://github.com/pereyrajuanig/landing-circulo-er'
PR = REPO + '/pull/2'
CI = PROGRESS.get('stages', {}).get('07', {}).get('ciRunUrl') or PROGRESS.get('stages', {}).get('06', {}).get('ciRunUrl') or PROGRESS.get('stages', {}).get('05', {}).get('ciRunUrl') or PROGRESS.get('stages', {}).get('04', {}).get('ciRunUrl') or PROGRESS.get('stages', {}).get('03', {}).get('ciRunUrl') or PROGRESS.get('stages', {}).get('02', {}).get('ciRunUrl') or PROGRESS.get('stages', {}).get('01', {}).get('ciRunUrl', REPO + '/actions/runs/38301508137')
ESCUDO = ROOT / 'public/assets/escudo.png'
OUT.parent.mkdir(parents=True, exist_ok=True)
c = canvas.Canvas(str(OUT), pagesize=A4, pageCompression=1)
c.setTitle('Checklist y paso a paso | Landing Círculo Entre Ríos')
c.setAuthor('Proyecto Landing-CirculoER')
c.setSubject('Plan de trabajo por etapas. Versión 1.13. Corte: 13 de octubre de 2026.')
PAGE = 0
BOUNDS = []
FIELDS = {}
TASKS = []


def color(value):
    return HexColor(value)


def rect(x, y, w, h, fill, stroke=None):
    c.setFillColor(color(fill))
    c.setStrokeColor(color(stroke or fill))
    c.setLineWidth(.6)
    c.rect(x, H-y-h, w, h, fill=1, stroke=int(stroke is not None))


def line(x, y, x2, y2, ink=LINE, width=.6):
    c.setStrokeColor(color(ink))
    c.setLineWidth(width)
    c.line(x, H-y, x2, H-y2)


def text(value, x, y, size=9.5, font='DM', ink=INK):
    c.setFont(font, size)
    c.setFillColor(color(ink))
    c.drawString(x, H-y-size*.85, value)


def right(value, x, y, size=9, font='DM', ink=MUTED):
    c.setFont(font, size)
    c.setFillColor(color(ink))
    c.drawRightString(x, H-y-size*.85, value)


def para(value, x, y, w=CW, size=10, leading=14.5, ink=MUTED, font='DM'):
    style = ParagraphStyle('body', fontName=font, fontSize=size, leading=leading, textColor=color(ink))
    p = Paragraph(value, style)
    _, height = p.wrap(w, 1000)
    p.drawOn(c, x, H-y-height)
    BOUNDS.append((PAGE, y, y+height, value[:50]))
    return y+height


def box(title, value, y, fill=CREAM):
    style = ParagraphStyle('note', fontName='DM', fontSize=9.4, leading=13.5, textColor=color(MUTED))
    p = Paragraph(value, style)
    _, height = p.wrap(CW-32, 1000)
    total = height+46
    rect(M, y, CW, total, fill)
    line(M, y, M, y+total, GOLD, 2)
    text(title.upper(), M+16, y+12, 8, ink=GOLDINK)
    p.drawOn(c, M+16, H-y-31-height)
    BOUNDS.append((PAGE, y, y+total, title))
    return y+total


def table(headers, rows, widths, y, size=8.5):
    sh = ParagraphStyle('th', fontName='DM', fontSize=8, leading=11, textColor=color(PAPER))
    sb = ParagraphStyle('td', fontName='DM', fontSize=size, leading=size*1.4, textColor=color(INK))
    values = [[Paragraph(escape(v), sh) for v in headers]]
    values.extend([[Paragraph(str(v), sb) for v in row] for row in rows])
    t = Table(values, colWidths=widths)
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), color(NAVY)),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [color(CREAM), color(PAPER)]),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 9), ('RIGHTPADDING', (0, 0), (-1, -1), 9),
        ('TOPPADDING', (0, 0), (-1, -1), 8), ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('LINEBELOW', (0, 1), (-1, -1), .4, color(LINE)),
    ]))
    _, height = t.wrap(CW, 1000)
    t.drawOn(c, M, H-y-height)
    BOUNDS.append((PAGE, y, y+height, 'table'))
    return y+height


def begin(key, title, subtitle, label='PLAN DE TRABAJO'):
    global PAGE
    if PAGE:
        c.showPage()
    PAGE += 1
    rect(0, 0, W, H, PAPER)
    c.bookmarkPage(key)
    c.addOutlineEntry(title.replace('<br/>', ' '), key, 0, False)
    text('CÍRCULO / CHECKLIST DE PRODUCCIÓN', M, 28, 7.2, ink=MUTED)
    right('V1.13 / 30 OCT 2026', W-M, 28, 7.2)
    line(M, 47, W-M, 47)
    text(label, M, 65, 8, ink=GOLDINK)
    y = para(title, M, 86, CW, 29, 33, INK, 'Caslon')
    y = para(subtitle, M, y+10, CW, 9.5, 14)
    line(M, 791, W-M, 791)
    text('Landing-CirculoER / Documento de trabajo / Estado a la fecha de corte', M, 805, 6.5, ink=MUTED)
    right(f'{PAGE:02d}', W-M, 803, 8, ink=INK)
    return y+24


def checkbox(name, x, y, checked=False, tooltip=''):
    assert name not in FIELDS, name
    task_id = name.removeprefix('task_').replace('_', '.') if name.startswith('task_') else None
    entry = PROGRESS.get('tasks', {}).get(task_id)
    if entry:
        assert entry.get('status') in ['pending', 'in_progress', 'verified', 'not_applicable'], task_id
        if entry['status'] == 'verified':
            assert entry.get('date') and entry.get('evidence'), task_id
        checked = entry['status'] == 'verified'
    elif name in PROGRESS.get('formValues', {}):
        checked = PROGRESS['formValues'][name]
        assert isinstance(checked, bool), name
    elif name in EXISTING_VALUES:
        checked = str(EXISTING_VALUES[name]) == '/Yes'
    c.acroForm.checkbox(name=name, tooltip=tooltip or name, x=x, y=H-y-12, size=12,
                       checked=checked, buttonStyle='check', shape='square',
                       borderWidth=.8, borderColor=color(NAVY), fillColor=color(PAPER),
                       textColor=color(NAVY), fieldFlags='', forceBorder=True)
    FIELDS[name] = ('/Btn', '/Yes' if checked else '/Off')


def field(name, label, x, y, w, h=24, multiline=False):
    assert name not in FIELDS, name
    value = str(PROGRESS.get('formValues', {}).get(name, EXISTING_VALUES.get(name, '')))
    text(label.upper(), x, y, 7.4, ink=MUTED)
    c.acroForm.textfield(name=name, tooltip=label, x=x, y=H-y-15-h, width=w, height=h,
                        value=value, fontName='Helvetica', fontSize=9, textColor=color(INK),
                        borderColor=color(LINE), fillColor=color(PAPER), borderWidth=.7,
                        borderStyle='solid', fieldFlags='multiline' if multiline else '',
                        maxlen=700 if multiline else 180, forceBorder=True)
    FIELDS[name] = ('/Tx', value)
    BOUNDS.append((PAGE, y, y+15+h, label))


def task(code, title, detail, y, checked=False, record=True):
    checkbox('task_'+code.replace('.', '_').lower(), M, y+3, checked, code+' '+title)
    text(code, M+22, y+3, 8, ink=GOLDINK)
    title_end = para(escape(title), M+68, y, CW-68, 10.2, 13.5, INK)
    end = para(detail, M+68, title_end+3, CW-68, 9.1, 12)
    checked = FIELDS['task_'+code.replace('.', '_').lower()][1] == '/Yes'
    if checked:
        text('OK', M+22, y+18, 7.5, ink=GREEN)
    line(M+68, end+6, W-M, end+6)
    BOUNDS.append((PAGE, y, end+6, code))
    if record:
        TASKS.append((code, title, checked))
    return end+17


def stage(number, title, purpose, role, dependency, tasks, close, priority='ANTES DE PRODUCCIÓN'):
    y = begin(f'etapa_{number:02d}', f'{number:02d}. {title}', purpose, 'ETAPA / '+priority)
    y = para(f'<b>Responsable sugerido:</b> {role}<br/><b>Dependencia:</b> {dependency}', M, y, CW, 9, 13)+17
    for index, item in enumerate(tasks, 1):
        name, detail, *flag = item
        y = task(f'{number:02d}.{index:02d}', name, detail, y, bool(flag and flag[0]))
    y = box('Criterio de cierre', close, y+1)+14
    field(f'owner_{number:02d}', 'Responsable asignado', M, y, 325)
    field(f'date_{number:02d}', 'Fecha de cierre', M+345, y, CW-345)
    if y+39 > 780:
        raise RuntimeError(f'Etapa {number} excede página: {y+39}')
    return y+39


# 01 / Cover
PAGE = 1
rect(0, 0, W, H, CREAM)
c.bookmarkPage('portada')
c.addOutlineEntry('Portada', 'portada', 0, False)
text('CÍRCULO DE RETIRADOS Y PENSIONADOS', M, 35, 8.5, ink=NAVY)
text('DE LA POLICÍA DE ENTRE RÍOS', M, 49, 8, ink=MUTED)
line(M, 73, W-M, 73)
c.drawImage(str(ESCUDO), W-M-99, H-202, width=85, height=102, preserveAspectRatio=True, mask='auto')
text('DEL DISEÑO AL LANZAMIENTO', M, 247, 9, ink=GOLDINK)
para('Checklist<br/>y paso a paso', M, 292, CW, 54, 57, INK, 'Caslon')
para('Tareas por etapa para construir, verificar,<br/>publicar y mantener el sitio institucional.', M, 440, CW, 14, 21, MUTED)
line(M, 520, M+95, 520, GOLDINK, 2)
box('Una guía para trabajar juntos', 'Doce etapas con tareas ordenadas, dependencias, controles y criterios de cierre. Casillas y campos editables para registrar el avance. La institución y el usuario participan en contenido y diseño.', 551, PAPER)
text('Astro + TypeScript / Revisión publicada en Vercel', M, 669, 10, ink=NAVY)
text('Versión 1.13 / '+DATE, M, 718, 9, ink=MUTED)
para('Documento de trabajo del proyecto. La preparación de este PDF no realiza merges ni despliegues. El alcance de cada tarea se acuerda antes de implementarla.', M, 749, CW, 8.5, 12, MUTED)

# 02 / How to use
y = begin('uso', 'Cómo usar esta checklist', 'Una tarea se cierra con una comprobación concreta y su evidencia, no solo con una casilla marcada.')
y = table(['Prioridad', 'Aplicación'], [
    ['ANTES DE PRODUCCIÓN', 'Resolver lo que afecta al alcance acordado antes del lanzamiento público.'],
    ['MEJORA RECOMENDADA', 'Aporta calidad o mantenimiento; acordar su inclusión y orden.'],
    ['CONDICIONAL', 'Se activa cuando una funcionalidad o un requisito institucional lo exige.'],
], [139, CW-139], y)+20
y = para('Las casillas premarcadas corresponden a evidencia de la versión auditada. Las demás están pendientes. Una etapa puede tener tareas verificadas y seguir abierta. Si un punto no aplica, registrar el motivo en la ficha de evidencia; no marcarlo como aprobado.', M, y)+20
y = box('Registro mínimo por tarea', 'ID de tarea, responsable, resultado, fecha, commit o versión, prueba ejecutada y evidencia. Anotar además cualquier dependencia o limitación.', y)+20
y = para('<b>1.</b> Elegir un lote pequeño y aclarar el resultado esperado.<br/><b>2.</b> Revisar la fuente y conservar cambios ajenos.<br/><b>3.</b> Implementar en una rama de tarea.<br/><b>4.</b> Ejecutar los controles pertinentes y revisar el diff.<br/><b>5.</b> Presentar un PR con resultado y evidencia.<br/><b>6.</b> Obtener autorización para merge y para publicación cuando corresponda.<br/><b>7.</b> Verificar la versión resultante y actualizar el registro.', M, y, CW, 10, 18)+22
y = box('Edición y evidencia', 'Las casillas y campos son editables en un lector PDF compatible con formularios y también se pueden completar al imprimir. Guardar una copia de seguimiento. Los estados técnicos provienen de checklist-progress.json al regenerar. Las ediciones manuales no modifican ese registro ni se sincronizan con GitHub.', y)

# 03 / Snapshot
y = begin('estado_inicial', 'El punto de partida', 'Base y seguimiento al 13/10/2026. Separar lo verificado de las tareas que esperan autorización o integración.')
y = table(['Área', 'Evidencia y estado'], [
    ['Fuente auditada', 'Base main '+SHA[:7]+'. Código verificado: '+(PROGRESS.get('stages', {}).get('07', {}).get('codeCommit') or PROGRESS.get('stages', {}).get('06', {}).get('codeCommit') or PROGRESS.get('stages', {}).get('05', {}).get('codeCommit') or PROGRESS.get('stages', {}).get('04', {}).get('codeCommit') or PROGRESS.get('stages', {}).get('03', {}).get('codeCommit') or PROGRESS.get('stages', {}).get('02', {}).get('codeCommit') or PROGRESS.get('stages', {}).get('01', {}).get('codeCommit', SHA))[:7]+'. Registro en checklist-progress.json.'],
    ['Migración', f'PR #2 fusionado con autorización el 13/10/2026. Base main: 5d87930; quality aprobado. <link href="{PR}" color="{NAVY}">Ver Pull Request</link>.'],
    ['Arquitectura', 'Astro 7.3.8, TypeScript estricto, Node 24; nueve componentes, un layout y cuatro colecciones JSON.'],
    ['Controles', f'Tipos, lint, formato, build, 11 Node y 20 Chromium en cada modo CSP aprobados en CI. <link href="{CI}" color="{NAVY}">Ver ejecución</link>.'],
    ['Diseño', 'Composición conservada por decisión del usuario. Siete tamaños y reflujo 320px verificados; zoom 200% confirmado manualmente por el usuario. Teclado, foco y contraste revisados; lector real pendiente.'],
    ['Etapa 07', escape(PROGRESS.get('stages', {}).get('07', {}).get('summary', 'Pendiente de registro.'))],
    ['Etapa 06', escape(PROGRESS.get('stages', {}).get('06', {}).get('summary', 'Pendiente de registro.'))],
    ['Vercel', 'Revisión publicada: landing-circulo-er.vercel.app. Production de main con noindex; contenido y dominio pendientes.'],
    ['CMS', 'No instalado. Su incorporación depende de requisitos de edición acordados con la institución.'],
    ['Documentación', 'Manual visual v1.11; registro de tareas en checklist-progress.json. Consultar security-privacy.md para avance y límites.'],
    ['Etapa 01', escape(PROGRESS.get('stages', {}).get('01', {}).get('summary', 'Pendiente de registro.'))],
    ['Etapa 02', escape(PROGRESS.get('stages', {}).get('02', {}).get('summary', 'Pendiente de registro.'))],
], [119, CW-119], y, 8.6)+21
box('Qué representa la URL actual', 'El Site histórico sigue privado. Astro está publicado en Vercel para revisión: landing-circulo-er.vercel.app, con noindex. No es aceptación institucional definitiva. Etapa08 diferida por el usuario; dominio pendiente.', y)

# 04 / Master route
y = begin('mapa', 'Mapa de etapas', 'La numeración organiza el trabajo. El contenido institucional debe validarse desde el comienzo, en paralelo.')
y = table(['Etapa', 'Resultado de cierre', 'Página'], [
    ['01 / Base', 'Código, controles y flujo listos para cambios pequeños.', '5'],
    ['02 / Diseño y UX', 'Composición aprobada y matriz responsive revisada.', '6-7'],
    ['03 / Accesibilidad', 'Recorridos utilizables y evidencia de revisión.', '8-9'],
    ['04 / Pruebas', 'Flujos críticos protegidos por pruebas automáticas.', '10'],
    ['05 / SEO', 'Metadatos, rastreo y URLs de producción preparados.', '11'],
    ['06 / Rendimiento', 'Medición de referencia y mejoras verificadas.', '12'],
    ['07 / Seguridad y privacidad', 'Dependencias, recursos y hosting revisados.', '13'],
    ['08 / Contenido', 'Información visible confirmada por la institución.', '14-15'],
    ['09 / Vercel y lanzamiento', 'Preview aprobada y producción comprobada.', '16-17'],
    ['10 / Mantenimiento', 'Responsables, monitoreo y rutina acordados.', '18'],
    ['11 / CMS', 'Edición autónoma validada, si se requiere.', '19'],
], [142, CW-186, 44], y, 8.5)+21
y = box('Orden recomendado', 'Comenzar con calidad y pruebas de flujos; revisar responsive y accesibilidad; completar SEO y rendimiento; verificar seguridad del hosting; cerrar contenido y lanzamiento. La etapa 08 avanza en paralelo. La etapa 11 requiere una decisión aparte.', y)+18
para('La ficha de evidencia está en la página 21. La rutina de revisión y la entrega están en la página 20. Las referencias y la regeneración del documento están en la página 22.', M, y, CW, 9.5, 14)

stage(1, 'Base del proyecto', 'Consolidar la migración y dejar controles claros para las siguientes tareas.', 'Desarrollo / usuario', 'PR de Astro revisado; autorización para fusionarlo.', [
    ('Mantener Astro estático y TypeScript estricto', 'Comprobar astro.config.mjs, tsconfig.json y que no se haya agregado renderizado de servidor sin necesidad.', True),
    ('Conservar la separación de componentes y contenido', 'Verificar las cuatro colecciones y su validación; mantener el diseño y las funciones existentes.', True),
    ('Confirmar la rama principal y el flujo Git', 'El PR #2 tiene quality aprobado. Fusionar con autorización y sincronizar main; registrar el commit resultante.'),
    ('Separar check y lint', 'Mantener astro check para tipos; configurar un linter compatible con Astro y TypeScript sin ocultar errores.'),
    ('Configurar formato reproducible', 'Acordar un formateador y sus comandos. Revisar el diff para evitar mezclar cambios visuales o editoriales.'),
    ('Ajustar CI a los controles acordados', 'Ejecutar instalación reproducible, check, lint, pruebas y build; conservar la protección de main.'),
    ('Actualizar instrucciones y documentación', 'README, AGENTS.md y guías deben reflejar scripts reales. Registrar cualquier cambio de alcance.'),
], 'Rama principal con la base acordada; check y lint diferenciados; CI aprobado y documentación coherente.')

stage(2, 'Diseño y experiencia', 'Conservar el estilo institucional cálido y comprobar que acompañe a sus usuarios.', 'Diseño con el usuario / desarrollo', 'Base ejecutable y criterios visuales acordados.', [
    ('Acordar el resultado visual de esta revisión', 'Revisar con Juan la portada, mensajes, jerarquía y tono. Registrar ajustes aprobados antes de implementarlos.'),
    ('Revisar tokens y reglas de estilos', 'Identificar valores repetidos de color, espaciado, tipografía y radios; conservar la cascada base / warmth.'),
    ('Ejecutar la matriz responsive', 'Usar los siete anchos de la página 7. Registrar ancho real, dispositivo y problemas, no solo capturas.'),
    ('Probar textos largos y contenido variable', 'Verificar correo, localidades extensas y nuevas descripciones; detectar recortes o desbordes.'),
    ('Comprobar menú y navegación', 'Abrir, cerrar, elegir enlace y usar Escape; comprobar destino, foco y estado aria-expanded.'),
    ('Revisar botones y estados', 'Confirmar CTA principal, hover, foco y selección. Comprobar legibilidad y área de interacción.'),
    ('Comprobar lectura con zoom', 'Revisar zoom 200% y reflujo; verificar que se pueda leer y operar sin perder contenido.'),
], 'Identidad validada con el usuario y matriz sin problemas que bloqueen lectura o tareas. Evidencias anexadas al PR.')

# 07 / Responsive matrix
y = begin('responsive', 'Matriz de dispositivos', 'Completar cada fila con revisión visual y funcional. Una captura sola no demuestra que el flujo funcione.')
y = table(['Viewport objetivo', 'Control principal', 'Registro'], [
    ['360 x 800', 'Lectura, título, menú, CTA, correo y selector de dos columnas.', 'R.01'],
    ['390 x 844', 'Portada, escudo, controles y navegación con una mano.', 'R.02'],
    ['430 x 932', 'Transición de columnas, espacios y textos largos.', 'R.03'],
    ['768 x 1024', 'Tablet vertical, servicios, contacto y alojamiento.', 'R.04'],
    ['1024 x 768', 'Tablet horizontal, cabecera y transiciones de grilla.', 'R.05'],
    ['1440 x 900', 'Jerarquía, lectura, composición y navegación de escritorio.', 'R.06'],
    ['1920 x 1080', 'Ancho máximo, longitud de líneas y proporción del escudo.', 'R.07'],
], [108, CW-155, 47], y)+18
for index in range(1, 8):
    checkbox(f'responsive_{index:02d}', M, y+2)
    y = para(f'<b>R.{index:02d}</b> Revisado y evidencia registrada en la ficha de seguimiento.', M+23, y, CW-23, 9, 12)+7
y = box('Cómo ejecutar cada fila', 'Abrir una preview de la versión correcta; configurar el viewport; anotar innerWidth y scrollWidth reales; recorrer toda la página; probar menú, filtro y alojamiento; registrar consola, capturas y resultado. Si el navegador aplica escala, registrar el ancho efectivo alcanzado.', y+3)+16
field('responsive_notes', 'Dispositivos / navegador / incidencias', M, y, CW, 37, True)

stage(3, 'Accesibilidad', 'Hacer que la información y las acciones sean utilizables con distintos dispositivos y formas de navegación.', 'Desarrollo / revisión de accesibilidad', 'Diseño actual y flujos principales definidos.', [
    ('Revisar estructura y nombres accesibles', 'Comprobar landmarks, idioma, un H1, jerarquía de títulos, etiquetas y texto alternativo pertinente.'),
    ('Recorrer la página solo con teclado', 'Usar la secuencia de la página 9; registrar el orden de foco y cualquier bloqueo o elemento inaccesible.'),
    ('Verificar foco y menú móvil', 'Comprobar visibilidad del foco, cierre por Escape y regreso al control. El header no debe tapar el destino.'),
    ('Medir contrastes de los estados reales', 'Evaluar texto, enlaces, botones, foco y selección sobre sus fondos efectivos; corregir lo que corresponda.'),
    ('Comprobar tamaño de controles y reflujo', 'Revisar objetivos táctiles y separación; apuntar a controles cómodos para este público y probar textos ampliados.'),
    ('Probar anuncios y lector de pantalla', 'Verificar resultados del filtro, cambios de alojamiento, estado del menú y apertura de servicios.'),
    ('Registrar límites de la revisión', 'Contrastar con WCAG 2.2 AA, documentar evidencia y problemas restantes; no declarar conformidad por un escaneo automático.'),
], 'Los flujos no tienen barreras conocidas que los bloqueen; revisión manual documentada y pendientes claramente identificados.')

# 09 / Keyboard plan
y = begin('teclado', 'Recorrido de teclado', 'Ejecutar sobre la preview del commit que se revisa. Repetir en móvil y escritorio cuando cambie el flujo.')
keyboard = [
    ('K.01', 'Activar el enlace de salto', 'Al entrar con Tab, el enlace debe verse; Enter lleva al contenido.'),
    ('K.02', 'Recorrer cabecera y CTA', 'El foco es visible y el orden coincide con la lectura y la intención de las acciones.'),
    ('K.03', 'Operar el menú móvil', 'Abrir con teclado, navegar enlaces y cerrar con Escape; comprobar foco y aria-expanded.'),
    ('K.04', 'Abrir los servicios', 'Enter o Espacio opera summary. El contenido abierto puede leerse y sus enlaces alcanzarse.'),
    ('K.05', 'Buscar una filial', 'Ingresar MARIA, comprobar resultado con tilde; probar búsqueda vacía y sin resultados.'),
    ('K.06', 'Elegir alojamientos', 'Tab alcanza cada botón; Enter o Espacio cambia título, descripción, selección y asunto del correo.'),
    ('K.07', 'Verificar contacto y regreso', 'Los enlaces tienen nombres claros; Shift+Tab funciona y no hay trampas de teclado.'),
]
for code, name, detail in keyboard:
    y = task(code, name, detail, y, record=False)
y = box('Revisión complementaria', 'Probar lector de pantalla, movimiento reducido, zoom y reflujo a 320 px. Registrar la herramienta y las combinaciones de contraste realmente evaluadas. La prueba de teclado no sustituye el resto de la auditoría.', y)+14
field('keyboard_notes', 'Herramienta / resultado / evidencia', M, y, CW, 32, True)

stage(4, 'Pruebas de los flujos', 'Proteger el comportamiento que puede romper navegación, consultas o publicación.', 'Desarrollo', 'Controles de base y flujos acordados.', [
    ('Conservar las pruebas existentes', 'Siete pruebas de contenido, datos, búsqueda, mailto, recursos, archivos internos y contrato accesible del HTML aprobadas.', True),
    ('Definir la herramienta de pruebas de navegador', 'Elegir una configuración proporcional. Probar el build real y mantener los tests fuera del producto publicado.'),
    ('Automatizar menú y navegación', 'Verificar apertura, cierre por enlace, Escape, destino y estado accesible en viewport móvil.'),
    ('Automatizar búsqueda de filiales', 'Cubrir tildes, mayúsculas, consulta vacía y sin resultados; comprobar que la sede central permanezca visible.'),
    ('Automatizar el selector de alojamiento', 'Comprobar selección única, título, descripción y asunto mailto en destinos distintos.'),
    ('Verificar enlaces y rutas de error', 'Probar CTA, correo, Maps, anclas y respuesta 404; no enviar consultas reales durante los tests.'),
    ('Integrar pruebas relevantes en CI', 'Cerrar servidores al terminar; conservar evidencia útil de fallos y evitar tests que solo repitan el código.'),
], 'Las regresiones de flujos críticos hacen fallar CI; pruebas estables, con alcance y comandos documentados.')

stage(5, 'SEO y contenido rastreable', 'Preparar la landing para su dominio público y para compartir enlaces con información coherente.', 'Desarrollo / contenido institucional', 'Dominio de producción confirmado para URLs absolutas.', [
    ('Confirmar dominio y URL principal', 'Acordar dominio y responsable de la cuenta; configurar site con la URL real y la política de redirecciones.'),
    ('Completar el layout SEO', 'Conservar title y description; agregar canonical correcto y permitir metadatos específicos por futura página.'),
    ('Preparar la vista para redes', 'Definir Open Graph, imagen social y tarjeta de enlaces con identidad y textos aprobados.'),
    ('Generar sitemap y robots', 'Usar URLs públicas reales; comprobar archivos del build y evitar indexar previews como versión oficial.'),
    ('Crear una 404 útil', 'Mostrar un mensaje claro y un camino de regreso. Comprobar que una URL inexistente responda con estado 404.'),
    ('Evaluar datos estructurados reales', 'Incluir solo información institucional confirmada y coherente con lo visible; validar el resultado.'),
    ('Verificar rastreo después de publicar', 'Comprobar canonical, redirecciones e indexabilidad; configurar Search Console en la cuenta responsable.'),
], 'Metadatos y recursos SEO válidos en el dominio real; previews controladas y verificación posterior registrada.')

stage(6, 'Rendimiento', 'Medir primero y mejorar los recursos que influyen en la experiencia de quienes visitan la web.', 'Desarrollo', 'Build estable; entorno y dispositivo de medición registrados.', [
    ('Establecer una medición de referencia', 'Registrar commit, herramienta, dispositivo, red y resultados. Separar mediciones locales de experiencia real.'),
    ('Revisar el recurso principal del inicio', 'Identificar el LCP medido; evitar retrasarlo con carga diferida y comprobar dimensiones y prioridad.'),
    ('Evaluar el escudo y las futuras fotos', 'El PNG actual ronda 341 KiB. Comparar formatos y tamaños adecuados conservando nitidez, proporción e identidad.'),
    ('Revisar carga de tipografías', 'Evaluar familias, pesos, solicitudes y estrategia de carga; probar fallback y su efecto en la composición.'),
    ('Revisar CSS y JavaScript', 'El módulo compilado ronda 1,7 KB en la base. Conservar interactividad mínima y revisar duplicación con evidencia.'),
    ('Comprobar estabilidad e interacción', 'Objetivos de referencia: LCP ≤ 2,5 s; INP ≤ 200 ms; CLS ≤ 0,1. Registrar resultados, no solo objetivos.'),
    ('Comparar antes y después', 'Repetir el escenario al cambiar recursos. Lighthouse ayuda en laboratorio; INP requiere interacciones y datos de campo.'),
], 'Referencia medida, cambios justificados y sin regresiones de UX. Los resultados de campo se revisan cuando haya datos suficientes.')

stage(7, 'Seguridad y privacidad', 'Revisar los riesgos que aplican a esta landing estática y sus terceros reales.', 'Desarrollo / responsable de hosting', 'Inventario de recursos; dominio y hosting definidos para controles finales.', [
    ('Conservar exclusión de secretos y material local', 'Revisar Git y dist; .env, credenciales y dossier original deben permanecer fuera de la publicación.'),
    ('Revisar dependencias y cambios de versiones', 'npm audit reportó 0 vulnerabilidades el 13/10/2026. Repetir ante cambios; evaluar impacto sin actualizar a ciegas.', True),
    ('Inventariar terceros y almacenamiento', 'Fuentes locales desde etapa06; registrar correo y Maps como enlaces externos; identificar cookies, almacenamiento o tracking si se incorporan.'),
    ('Configurar headers según recursos reales', 'Revisar nosniff, Referrer-Policy, Permissions-Policy y protección frente a marcos; comprobar respuestas efectivas.'),
    ('Definir y probar CSP', 'Inventariar scripts inline y fuentes. Usar hashes o recursos externos según el diseño; probar Report-Only antes de exigirla.'),
    ('Verificar HTTPS y configuración de dominio', 'Comprobar redirección, certificado y decisiones de HSTS cuando el dominio esté listo; conservar recuperación conocida.'),
    ('Documentar privacidad y funciones futuras', 'Acordar textos y tratamiento con la institución. Si aparecen formularios o CMS, abrir su revisión específica de datos y acceso.'),
], 'Configuración comprobada en el hosting, sin incompatibilidades conocidas; inventario y decisiones de privacidad documentados.')

stage(8, 'Contenido institucional', 'Confirmar la información visible y definir quién puede mantenerla vigente.', 'Institución / usuario / desarrollo', 'Responsable institucional designado. Avanzar en paralelo desde el inicio.', [
    ('Acordar responsable y circuito de aprobación', 'Definir quién confirma datos y quién autoriza cambios de redacción, prestaciones e imágenes.'),
    ('Validar identidad y relato institucional', 'Confirmar nombre, historia y naturaleza de la asociación; preservar el escudo y evitar promesas no aprobadas.'),
    ('Confirmar contacto de sede central', 'Validar correo, dirección y ubicación. Incorporar otros canales u horarios únicamente cuando estén confirmados.'),
    ('Revisar servicios y beneficios visibles', 'Confirmar descripciones y condiciones generales; evitar presentar turnos, cobertura o descuentos como garantías.'),
    ('Revisar filiales y alojamiento', 'Confirmar localidades, responsables cuando se muestren y cómo se consulta disponibilidad o reserva.'),
    ('Seleccionar fotografías autorizadas', 'Obtener archivos y derechos de uso; preparar texto alternativo y comprobar que representan a la institución.'),
    ('Registrar fuente, vigencia y aceptación', 'Completar la matriz de la página 15 y revisar la preview con la institución antes de publicar.'),
], 'Contenido que se publicará confirmado por un responsable y con fecha; pendientes ajenos al alcance claramente registrados.')

# 15 / Content inventory
y = begin('contenido', 'Matriz de validación editorial', 'Usar solo datos confirmados. La información del dossier es una referencia histórica con corte del 8/10/2026.')
y = table(['Elemento', 'Fuente actual', 'Qué confirmar'], [
    ['Nombre e historia', 'institution.json / componentes', 'Nombre institucional, fechas y descripción de la asociación.'],
    ['Correo y sede', 'institution.json', 'Correo operativo, dirección y ubicación correcta.'],
    ['Salud y bienestar', 'services.json', 'Descripción, prestaciones vigentes y forma de consultar.'],
    ['Trámites y beneficios', 'services.json', 'Alcance de orientación, convenios y condiciones que se publiquen.'],
    ['Filiales', 'branches.json', 'Localidades; contactos y responsables si se incorporan.'],
    ['Alojamiento', 'stays.json', 'Opciones actuales, consulta y circuito de reserva.'],
    ['Autoridades / horarios', 'No visibles hoy', 'Confirmar e incorporar solo si forman parte del alcance acordado.'],
    ['Fotos', 'Escudo como único activo actual', 'Autorización, contexto real, calidad y texto alternativo.'],
    ['Tono y mensajes', 'components/ y design system', 'Voseo respetuoso, calidez y denominación de integrantes.'],
], [111, 152, CW-263], y, 8.4)+18
y = box('Después de editar contenido', 'Revisar npm run dev y ejecutar los controles. Los tests comparan texto y anclas con una referencia: para cambios editoriales intencionales, revisar el resultado y usar npm run test:update; revisar la fixture y volver a ejecutar npm test. No actualizarla para ocultar errores.', y)+17
field('content_approval', 'Responsable institucional / contenido aprobado / fecha', M, y, CW, 40, True)

stage(9, 'Vercel y lanzamiento', 'Pasar de una configuración local correcta a una publicación comprobada en el dominio acordado.', 'Usuario / desarrollo / titular de hosting', 'Merge autorizado, preview aprobada y contenido confirmado.', [
    ('Conservar configuración estática de Vercel', 'vercel.json declara Astro, npm ci, npm run build y salida dist. No se requiere adapter para esta salida estática.', True),
    ('Definir cuenta, dominio y rama de producción', 'Acordar titularidad, accesos y condiciones del servicio; usar main como producción cuando se autorice.'),
    ('Conectar repositorio y crear preview', 'Verificar raíz, Node 24 y comandos en la configuración real. Registrar URL, commit y resultado del build.'),
    ('Controlar publicaciones automáticas', 'Confirmar qué eventos crean previews y producción antes de activar la integración Git; conservar revisión mediante PR.'),
    ('Revisar la preview de forma completa', 'Ejecutar páginas 7, 9 y 17; verificar recursos, enlaces, datos, SEO y headers sin confundirla con el Site histórico.'),
    ('Preparar recuperación y autorizar lanzamiento', 'Identificar versión anterior, responsable y procedimiento. Obtener autorización para publicar el alcance revisado.'),
    ('Verificar producción y registrar entrega', 'Comprobar dominio, HTTPS, código desplegado y flujos. Registrar despliegue, fecha, evidencia y pendientes aceptados.'),
], 'Producción confirmada en el dominio real, pruebas críticas correctas, autorización y recuperación registradas.')

# 17 / Launch gate
y = begin('lanzamiento', 'Control previo a publicar', 'Ejecutar sobre la versión candidata. Un punto que no aplique necesita un motivo registrado.')
release_tasks = [
    ('L.01', 'Identificar commit y versión candidata', 'El PR y la preview corresponden al mismo código que se publicará.'),
    ('L.02', 'Confirmar controles automáticos', 'Check, lint, pruebas y build aprobados según los scripts vigentes.'),
    ('L.03', 'Confirmar contenido y aprobación visual', 'Responsables de la institución y el usuario aceptaron lo visible y sus condiciones.'),
    ('L.04', 'Revisar móvil, teclado y consola', 'Flujos principales utilizables; sin errores que los bloqueen ni desbordes observados.'),
    ('L.05', 'Comprobar contacto y alojamiento', 'Mailto y Maps apuntan al destino correcto. No enviar mensajes reales solo para probar enlaces.'),
    ('L.06', 'Comprobar dominio y SEO', 'HTTPS, redirecciones, canonical, metadatos, robots, sitemap y 404 coherentes.'),
    ('L.07', 'Comprobar headers y privacidad', 'Configuración activa compatible con recursos reales; terceros y decisiones registrados.'),
    ('L.08', 'Registrar medición y recuperación', 'Resultados de rendimiento disponibles y procedimiento de volver a una versión anterior conocido.'),
]
for code, name, detail in release_tasks:
    y = task(code, name, detail, y, record=False)
y = box('Decisión de lanzamiento', 'Publicar cuando los requisitos críticos del alcance están resueltos. Toda limitación aceptada debe quedar por escrito con impacto y responsable. Una casilla o CI en verde por sí solos no autorizan el despliegue.', y)+14
field('release_approval', 'Autorización / versión / fecha / pendientes aceptados', M, y, CW, 32, True)

stage(10, 'Operación y mantenimiento', 'Definir cómo se detectan problemas y quién mantiene la información después del lanzamiento.', 'Usuario / institución / responsable de hosting', 'Producción verificada y responsables acordados.', [
    ('Asignar responsables de operación y contenido', 'Registrar titular de dominio, hosting, GitHub y contacto institucional sin guardar credenciales en documentos.'),
    ('Acordar monitoreo de disponibilidad', 'Elegir un mecanismo proporcional y una persona que atienda incidencias. Alertar por problemas accionables.'),
    ('Definir eventos que aporten información', 'Acordar si se medirán consultas y acciones. Evitar duplicar analytics o registrar datos personales innecesarios.'),
    ('Revisar errores y rastreo', 'Definir revisión de consola, 404, Search Console y resultados de uso; aprovechar herramientas del hosting cuando alcancen.'),
    ('Acordar rutina de mantenimiento', 'Usar la frecuencia de la página 20 y adaptar el rigor al sitio y a sus cambios reales.'),
    ('Preparar entrega y recuperación', 'Documentar accesos por rol, pasos de publicación, respaldo de configuración y cómo recuperar una versión.'),
    ('Registrar revisiones y nuevas tareas', 'Conservar responsable, fecha y evidencia. Cambios de dependencias, contenido o terceros vuelven a los controles pertinentes.'),
], 'Responsables y rutinas conocidos; monitoreo y medición justificados; entrega y recuperación disponibles.')

stage(11, 'Panel editorial y CMS', 'Activar esta etapa cuando la institución confirme que necesita editar sin intervenir en el código.', 'Institución / desarrollo / usuario', 'Necesidad, presupuesto, titularidad y permisos acordados.', [
    ('Definir qué podrá editar la institución', 'Acordar servicios, contactos, filiales, alojamientos y noticias si se solicitan; distinguir datos estables y variables.'),
    ('Definir roles y flujo editorial', 'Acordar redactor, revisor y publicador; decidir cómo se manejan borradores, vigencia y aprobación.'),
    ('Evaluar y seleccionar un proveedor', 'Comparar coste, permisos, preview, exportación y mantenimiento según los requisitos reales.'),
    ('Adaptar modelos y colecciones', 'Conservar esquemas y contrato de componentes; validar datos recibidos y preparar una migración de contenido revisable.'),
    ('Configurar acceso y credenciales', 'Aplicar permisos mínimos y separar ambientes; mantener claves fuera de Git y del JavaScript del visitante.'),
    ('Conectar edición, preview y publicación', 'Probar borradores y webhook de build. Una edición estática necesita un nuevo despliegue para llegar al sitio público.'),
    ('Probar, capacitar y entregar', 'Usar contenido de prueba; verificar permisos y recuperación; entregar guía y acceso a los responsables.'),
], 'La institución puede editar, revisar y publicar lo acordado; permisos y recuperación comprobados. Un rollback de web no revierte contenido del CMS.', 'CONDICIONAL')

# 20 / Routine
y = begin('rutina', 'Rutina y entrega', 'Propuesta para acordar con los responsables. No activa tareas recurrentes ni notificaciones automáticamente.')
y = table(['Frecuencia sugerida', 'Revisión y evidencia'], [
    ['Cada despliegue', 'Pruebas de flujos, consola, rutas, contenido, metadatos y headers afectados. Registrar commit y URL.'],
    ['Semanal', 'Disponibilidad y errores relevantes; consultas o formularios si se incorporan. Registrar incidencias.'],
    ['Mensual', 'Dependencias y actualizaciones revisadas; Search Console y rendimiento cuando haya datos. Confirmar configuración y recuperación.'],
    ['Trimestral', 'Accesibilidad, contactos, condiciones de servicios, terceros y permisos. Confirmar vigencia institucional.'],
    ['Cambio importante', 'Repetir pruebas de navegador, SEO, rendimiento y seguridad de las áreas afectadas.'],
], [117, CW-117], y)+20
y = box('Entrega mínima', 'Repositorio y documentación accesibles; responsable de dominio y hosting; instrucciones de desarrollo y publicación; validaciones y límites; fuentes de contenido; manual visual; recuperación y rutina. Las credenciales se gestionan por canales seguros, no dentro del PDF.', y)+20
field('handoff_owner', 'Responsable de operación', M, y, 244)
field('handoff_content', 'Responsable institucional', M+264, y, CW-264)
y += 61
field('handoff_notes', 'Acuerdos de mantenimiento / acceso / entrega', M, y, CW, 65, True)

# 21 / Evidence form
y = begin('evidencia', 'Ficha de tarea y evidencia', 'Guardar copias de esta página para los lotes. Vincular la evidencia con un commit o despliegue concreto.')
field('trace_id', 'ID de tarea o lote', M, y, 151)
field('trace_status', 'Estado: pendiente / en curso / verificado / no aplica', M+171, y, CW-171)
y += 63
field('trace_owner', 'Responsable', M, y, 244)
field('trace_date', 'Fecha de revisión', M+264, y, CW-264)
y += 63
field('trace_commit', 'Commit / PR / versión', M, y, CW)
y += 63
field('trace_method', 'Comando, dispositivo o procedimiento utilizado', M, y, CW, 43, True)
y += 82
field('trace_result', 'Resultado y enlace o ubicación de la evidencia', M, y, CW, 56, True)
y += 96
field('trace_limits', 'Pendientes, dependencias o motivo de no aplicación', M, y, CW, 48, True)
y += 89
box('Cierre de una tarea', 'La persona responsable registra el resultado, revisa la evidencia y actualiza el estado. Separar la aprobación técnica de la aceptación del contenido, del merge y de la publicación.', y)

# 22 / References
y = begin('referencias', 'Referencias y actualización', 'Plan específico de esta landing, elaborado a partir de la comparación del proyecto con el roadmap del usuario.')
y = para('<b>Guía de referencia:</b> Roadmap_Profesional_Astro_TypeScript_Codex.pdf, versión 1.0, octubre de 2026, 25 páginas. Carpeta Kit_Desarrollo_Profesional / LandingPage. Sus checklists y prompts se adaptaron al alcance actual; no constituyen autorización para ejecutar tareas.', M, y)+20
y = para('<b>Fuente del proyecto:</b> README, AGENTS.md, package.json, astro.config.mjs, vercel.json, colecciones, componentes, tests y guías de docs/.<br/><b>Base auditada:</b> '+SHA+'<br/><b>Fecha de corte:</b> '+DATE+'. El estado de GitHub y el contenido pueden cambiar después de esa fecha.', M, y, CW, 9.4, 14)+22
references = [
    ('Repositorio / PR / CI', REPO),
    ('Astro: diagnóstico y herramientas', 'https://docs.astro.build/en/reference/cli-reference/#astro-check'),
    ('Astro: contenido estructurado', 'https://docs.astro.build/en/guides/content-collections/'),
    ('Astro: Vercel', 'https://docs.astro.build/en/guides/deploy/vercel/'),
    ('Accesibilidad: WCAG 2.2', 'https://www.w3.org/TR/WCAG22/'),
    ('Rendimiento: Web Vitals', 'https://web.dev/articles/vitals'),
    ('Seguridad: CSP', 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP'),
]
for label, url in references:
    text(label, M, y, 8.4, ink=INK)
    y = para(f'<link href="{url}" color="{MUTED}">{escape(url)}</link>', M, y+15, CW, 7.8, 11.5)+14
y = box('Mantener este documento', 'Regenerar desde tools/docs/build_checklist.py con ReportLab y pypdf. Actualizar checklist-progress.json con fecha y evidencia; regenerar y revisar campos. Los otros campos manuales existentes se conservan. Conservar la guía base y una copia de seguimiento; actualizar documentación cuando se alteren funciones o decisiones.', y+3)+17
para('El manual visual docs/design-system.pdf describe la identidad y componentes. Esta checklist organiza la ejecución y no sustituye ese documento ni la aprobación institucional.', M, y, CW, 9, 13)


# 23 / Nuevo alcance: sitio institucional.
y = begin('sitio_institucional', '12. Sitio y publicación editorial', 'Ampliación del 29/10/2026. Separar la base implementada de la aceptación institucional y las integraciones todavía pendientes.')
new_tasks = [
 ('12.01', 'Aprobar mapa y navegación', 'Revisar inicio, índices y fichas en escritorio y móvil; registrar aceptación del usuario.'),
 ('12.02', 'Completar beneficios', 'Recibir alcance, requisitos y condiciones de cada servicio con aprobación institucional.'),
 ('12.03', 'Completar alojamientos', 'Incorporar fotos reales, ubicación, equipamiento y condiciones verificadas de los seis destinos.'),
 ('12.04', 'Completar salones', 'Confirmar espacios, capacidad, equipamiento y condiciones antes de publicarlos.'),
 ('12.05', 'Activar panel editorial', 'Crear cuenta institucional, esquema y permisos; activación diferida por el usuario.'),
 ('12.06', 'Probar publicación desde el panel', 'Comprobar borrador, revisión, publicación, build y recuperación en preview.'),
 ('12.07', 'Verificar acceso a Facebook', 'Recibir enlace y acceso administrativo; comprobar API, permisos y método viable.'),
 ('12.08', 'Probar Facebook hacia el sitio', 'Publicar, editar y retirar una entrada real; evitar duplicados y ensayar fallo de conexión.'),
 ('12.09', 'Revalidar antes del lanzamiento', 'Contenido aprobado, accesibilidad, rendimiento, SEO, privacidad y dominio real.'),
]
for code, title, detail in new_tasks:
    y = task(code, title, detail, y)
box('Estado del lote', 'Base de rutas y fichas preparada en la propuesta. Noticias sin entradas reales. CMS y Facebook no conectados. Las tareas requieren los criterios anteriores para cerrarse; ver docs/site-evolution.md.', y+4)

bad = [entry for entry in BOUNDS if entry[2] > 781]
if bad:
    print('OVERFLOW', bad)
    raise RuntimeError('Contenido fuera del área segura')
c.save()
reader = PdfReader(str(OUT))
assert len(reader.pages) == 23, len(reader.pages)
for i, page in enumerate(reader.pages, 1):
    body = page.extract_text()
    assert len(body) > 100, i
    assert '\ufffd' not in body, i
fields = reader.get_fields() or {}
assert len(fields) == len(FIELDS), (len(fields), len(FIELDS))
widgets = {}
for page in reader.pages:
    for ref in page.get('/Annots', []):
        widget = ref.get_object()
        if widget.get('/Subtype') != '/Widget':
            continue
        parent = widget.get('/Parent')
        logical = parent.get_object() if parent else widget
        name = widget.get('/T') or logical.get('/T')
        widgets[name] = widget.get('/V', logical.get('/V'))
        assert widget.get('/AP', {}).get('/N') is not None, name
for name, (kind, value) in FIELDS.items():
    assert fields[name].get('/FT') == kind, name
    assert str(fields[name].get('/V', '')) == value, (name, fields[name].get('/V'), value)
    assert str(widgets[name] if widgets[name] is not None else '') == value, name
print('PDF:', OUT)
print('PAGES:', len(reader.pages))
print('STAGE_TASKS:', len(TASKS), 'VERIFIED_BASE:', sum(row[2] for row in TASKS))
print('FIELDS:', len(FIELDS), 'CHECKBOXES:', sum(kind == '/Btn' for kind, value in FIELDS.values()))
print('BOUNDS_OK:', len(BOUNDS), 'BYTES:', OUT.stat().st_size)
