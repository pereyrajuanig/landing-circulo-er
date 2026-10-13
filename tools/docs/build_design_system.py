from pathlib import Path
import re, sys, hashlib
from xml.sax.saxutils import escape
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor, Color
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph, Table, TableStyle
from reportlab.lib.utils import ImageReader
from reportlab.lib.pagesizes import A4
from pypdf import PdfReader

sys.stdout.reconfigure(encoding='utf-8')
ROOT = Path(__file__).resolve().parents[2]
WORK = Path(__file__).parent
OUT = ROOT / 'docs/design-system.pdf'
OUT.parent.mkdir(parents=True, exist_ok=True)
FONT = WORK / 'fonts'
pdfmetrics.registerFont(TTFont('DM', str(FONT / 'DMSans-Variable.ttf')))
pdfmetrics.registerFont(TTFont('Caslon', str(FONT / 'LibreCaslonDisplay-Regular.ttf')))
pdfmetrics.registerFontFamily('DM', normal='DM', bold='DM', italic='DM', boldItalic='DM')
W, H = A4
M = 44
CW = W - 2*M
NAVY = '#092b48'; DEEP = '#062139'; GOLD = '#d2b16a'; CREAM = '#f3eee4'
PAPER = '#fcfaf5'; INK = '#143049'; MUTED = '#56656c'; LINE = '#dfd8cb'
ESCUDO = ROOT / 'public/assets/escudo.png'
SITE = 'https://circulo-policial-entre-rios.spunkydegu8.chatgpt.site'
SHA = '648e72f7daca19a45c00ae5fc82427d385cce449'
c = canvas.Canvas(str(OUT), pagesize=A4, pageCompression=1)
c.setTitle('Design system y documentación de la landing | Círculo de Retirados y Pensionados de la Policía de Entre Ríos')
c.setAuthor('Círculo de Retirados y Pensionados de la Policía de Entre Ríos')
c.setSubject('Versión 1.6. Identidad, componentes, contenido, implementación y mantenimiento. 13 de octubre de 2026.')
PAGE = 0
BOUNDS = []

def col(hex): return HexColor(hex)
def rect(x,y,w,h,fill,stroke=None,lw=1):
    c.setFillColor(col(fill)); c.setStrokeColor(col(stroke or fill)); c.setLineWidth(lw)
    c.rect(x,H-y-h,w,h,stroke=int(stroke is not None),fill=1)
def line(x,y,x2,y2,color=LINE,lw=1):
    c.setStrokeColor(col(color)); c.setLineWidth(lw); c.line(x,H-y,x2,H-y2)
def text(s,x,y,size=10,font='DM',color=INK):
    c.setFont(font,size); c.setFillColor(col(color)); c.drawString(x,H-y-size*.85,s)
def right(s,x,y,size=10,font='DM',color=INK):
    c.setFont(font,size); c.setFillColor(col(color)); c.drawRightString(x,H-y-size*.85,s)
def para(s,x,y,w=CW,size=10.2,leading=15.2,color=MUTED,font='DM',check=True):
    st=ParagraphStyle('p',fontName=font,fontSize=size,leading=leading,textColor=col(color),spaceAfter=0)
    p=Paragraph(s,st); _,hh=p.wrap(w,1000); p.drawOn(c,x,H-y-hh)
    if check: BOUNDS.append((PAGE,y,y+hh,s[:60]))
    return y+hh
def label(s,x,y,color='#8d6d35'): text(s,x,y,8,'DM',color)
def heading(s,y,x=M): return para(s,x,y,CW,19,23,INK,'Caslon')
def block(title,body,y,x=M,w=CW):
    yy=para(title,x,y,w,16,20,INK,'Caslon')
    return para(body,x,yy+8,w)+18
def note(title,body,y,fill=CREAM):
    st=ParagraphStyle('n',fontName='DM',fontSize=9.4,leading=14,textColor=col(MUTED))
    p=Paragraph(body,st); _,hh=p.wrap(CW-34,1000)
    rect(M,y,CW,hh+55,fill); line(M,y,M,y+hh+55,GOLD,2)
    label(title,M+17,y+13); p.drawOn(c,M+17,H-y-35-hh)
    BOUNDS.append((PAGE,y,y+hh+55,title)); return y+hh+55
def table(headers,rows,widths,y,size=8.8):
    st=ParagraphStyle('t',fontName='DM',fontSize=size,leading=size*1.4,textColor=col(INK))
    sh=ParagraphStyle('th',fontName='DM',fontSize=8,leading=11,textColor=col(PAPER))
    dat=[[Paragraph(escape(str(v)),sh) for v in headers]]+[[Paragraph(str(v),st) for v in row] for row in rows]
    t=Table(dat,colWidths=widths,hAlign='LEFT')
    t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),col(NAVY)),('VALIGN',(0,0),(-1,-1),'TOP'),('LEFTPADDING',(0,0),(-1,-1),10),('RIGHTPADDING',(0,0),(-1,-1),10),('TOPPADDING',(0,0),(-1,-1),9),('BOTTOMPADDING',(0,0),(-1,-1),9),('ROWBACKGROUNDS',(0,1),(-1,-1),[col(CREAM),col(PAPER)]),('LINEBELOW',(0,1),(-1,-1),.4,col(LINE))]))
    _,hh=t.wrap(CW,1000); t.drawOn(c,M,H-y-hh); BOUNDS.append((PAGE,y,y+hh,'table'))
    return y+hh
def arrow(x,y,size=9,color=INK):
    line(x,y+size,x+size,y,color,1); line(x+size,y,x+size,y+size*.65,color,1); line(x+size,y,x+size*.35,y,color,1)
def button(s,x,y,w=218,h=42,fill=GOLD,fg=DEEP,focus=False):
    c.setFillColor(col(fill)); c.roundRect(x,H-y-h,w,h,6,stroke=0,fill=1)
    text(s,x+15,y+15,9,'DM',fg); arrow(x+w-28,y+16,8,fg)
    if focus:
        c.setStrokeColor(col('#a37923')); c.setLineWidth(2)
        c.rect(x-5,H-y-h-5,w+10,h+10,stroke=1,fill=0)
def badge(s,x,y,w=105):
    rect(x,y,w,21,CREAM,LINE,.5); text(s,x+8,y+7,7,'DM',MUTED)
def image(x,y,w,h): c.drawImage(str(ESCUDO),x,H-y-h,width=w,height=h,mask='auto',preserveAspectRatio=True,anchor='c')
def begin(k,title,subtitle):
    global PAGE
    if PAGE: c.showPage()
    PAGE+=1
    rect(0,0,W,H,PAPER)
    c.bookmarkPage(k); c.addOutlineEntry(title.replace('<br/>',' '),k,0,False)
    text('CÍRCULO / SISTEMA DE DISEÑO',M,29,7,'DM',MUTED)
    right('VERSIÓN 1.6 · 13 OCT 2026',W-M,29,7,'DM',MUTED)
    line(M,47,W-M,47,LINE,.6)
    label(k.upper().replace('_',' / '),M,65)
    end=para(title,M,87,CW,32,35,INK,'Caslon')
    end=para(subtitle,M,end+12,CW,9.5,14,MUTED)
    line(M,793,W-M,793,LINE,.6)
    text('Círculo de Retirados y Pensionados · Policía de Entre Ríos',M,806,6.7,'DM',MUTED)
    right(f'{PAGE:02d}',W-M,805,8,'DM',INK)
    return end+27

# 01. Cover
PAGE=1
rect(0,0,W,H,DEEP)
c.bookmarkPage('portada'); c.addOutlineEntry('Portada','portada',0,False)
line(M,57,W-M,57,'#365166',.7)
text('CÍRCULO DE RETIRADOS Y PENSIONADOS',M,32,9,'DM',GOLD)
text('DE LA POLICÍA DE ENTRE RÍOS',M,46,8,'DM','#c7d1d9')
rect(W-M-107,106,107,131,CREAM)
image(W-M-96,115,85,112)
label('IDENTIDAD · EXPERIENCIA · IMPLEMENTACIÓN',M,285,GOLD)
text('Design',M,330,76,'Caslon',PAPER)
text('system',M,406,76,'Caslon',GOLD)
para('Documentación de<br/>la landing page',M,510,CW,39,43,PAPER,'Caslon',False)
para('Una historia de servicio.<br/>Una comunidad que sigue acompañando.',M,628,380,13,20,'#c7d1d9',check=False)
line(M,728,W-M,728,'#365166',.7)
text('CALIDEZ / ASTRO / PORTFOLIO',M,751,8,'DM',GOLD)
text('Versión 1.6',M,770,10,'DM',PAPER)
right('13 de octubre de 2026',W-M,770,10,'DM',PAPER)

# 02. Scope and contents
y=begin('guia_01','Cómo usar este documento','Una referencia común para la institución, diseño, desarrollo y futuras actualizaciones.')
y=para('Este manual documenta la revisión cálida solicitada el 11/10/2026 y su migración a Astro para el proyecto de portfolio. Conserva la base institucional aceptada. La revisión visual final y la vigencia de los datos del dossier siguen pendientes de confirmación.',M,y)+18
y=table(['Estado','Qué significa'],[
 ['IMPLEMENTADO','Valor, componente o comportamiento presente en el código actual.'],
 ['RECOMENDADO','Criterio para futuras incorporaciones; no implica que ya esté aplicado.'],
 ['PENDIENTE','Dato o validación que debe resolverse antes de una publicación institucional definitiva.']
],[110,CW-110],y)+22
label('CONTENIDOS',M,y); y+=20
entries=[('03','Identidad y contexto institucional'),('04','Arquitectura y recorrido'),('05','Escudo e identidad visual'),('06','Paleta y tokens'),('07','Estados y contraste'),('08','Sistema tipográfico'),('09','Retícula y espaciado'),('10','Adaptación a pantallas'),('11','Cabecera y pie'),('12','Botones y enlaces'),('13','Servicios desplegables'),('14','Filiales y búsqueda'),('15','Alojamientos'),('16','Contacto y recorridos'),('17','Voz, contenido e imágenes'),('18','Inventario institucional'),('19','Implementación técnica'),('20','Mantenimiento'),('21','Validación y pendientes'),('22','Fuentes y trazabilidad')]
for i,(num,title) in enumerate(entries):
    x=M+(i//10)*(CW/2+7); yy=y+(i%10)*24
    text(num,x,yy,8,'DM','#8d6d35'); text(title,x+24,yy,8.5)
y+=255
note('CRITERIO DE LECTURA','Las medidas de interfaz están en píxeles CSS. Las muestras del PDF se dibujan a escala para explicar el sistema y no son capturas exactas del navegador.',y)

# 03. Institutional foundations
y=begin('identidad_02','Tradición institucional,<br/>con cercanía','La dirección visual debe expresar pertenencia, continuidad y acompañamiento.')
y=block('Quién es el Círculo','Asociación civil de alcance provincial, orientada a reunir, representar y acompañar a retirados y pensionados de la Policía de Entre Ríos y a sus familias. Mantiene una relación histórica y de cooperación con la comunidad policial. [D, pp. 3-4]',y)
y=table(['Dato base del dossier','Aplicación a la landing'],[
 ['Fundación: 21 de septiembre de 1975','Se muestra en la historia y junto al escudo de la portada.'],
 ['Personería: 21 de abril de 1978; Resolución N.º 077; N.º 2.491','Dato institucional de respaldo. No se exhibe en la portada actual.'],
 ['Sede central: Urquiza 669, Paraná','Referencia de contacto y punto central de la red provincial.'],
 ['Público: retirados, pensionados y familias','Lenguaje comprensible, navegación directa y consulta accesible.']
],[CW*.49,CW*.51],y)+23
y=block('Tres principios de diseño','<b>Institución:</b> jerarquía tipográfica, escudo íntegro y composición ordenada.<br/><b>Pertenencia:</b> mensajes sobre historia, comunidad y continuidad del vínculo.<br/><b>Utilidad:</b> acceso visible a servicios, filiales, alojamiento y contacto.',y)
note('LÍMITE DE LA IDENTIDAD','El sitio debe representar al Círculo con su nombre y escudo propios. La relación con la Policía de Entre Ríos se explica sin confundir la asociación civil con una dependencia de la fuerza.',y)

# 04. Architecture
y=begin('estructura_03','El recorrido de la landing','Cada sección aporta una función concreta y conduce a un siguiente paso.')
y=table(['Orden / ancla','Propósito y contenido','Acción principal'],[
 ['Cabecera','Nombre, escudo, navegación y contacto','Saltar a una sección'],
 ['Inicio / #inicio','Mensaje de pertenencia y presentación institucional','Hablemos'],
 ['Franja institucional','Te escuchamos, te acompañamos y nos encontramos','Lectura de contexto'],
 ['Institución / #institucion','Historia, naturaleza de la asociación y misión','Comprender el Círculo'],
 ['Servicios / #servicios','Cinco categorías desplegables','Abrir detalle / consultar'],
 ['Filiales / #filiales','Sede central y 24 localidades del dossier','Buscar localidad'],
 ['Alojamiento / #alojamiento','Seis destinos y consulta de estadía','Elegir destino / consultar'],
 ['Franja de comunidad','Mensaje sobre historia y pertenencia','Continuar el recorrido'],
 ['Contacto / #contacto','Dirección, correo y ubicación','Abrir correo / mapa'],
 ['Pie','Identidad, año y regreso al inicio','Volver al inicio']
],[111,255,CW-366],y,8.4)+20
note('ALCANCE ACTUAL','La versión implementada no incluye noticias administrables, mapa interactivo, formulario de afiliación, turnos ni reservas en línea. Esas funciones pueden incorporarse en una fase posterior si la institución las necesita.',y)

# 05. Shield
y=begin('marca_04','El escudo como protagonista','El activo existente conserva el sol, los laureles, las manos unidas y la identidad entrerriana.')
rect(M,y,172,205,CREAM,LINE,.7); image(M+37,y+13,98,124)
label('ACTIVO ACTUAL',M+18,y+154); text('PNG · 494 × 590 px',M+18,y+176,10)
x=M+195
yy=para('Preservar proporción',x,y,312,20,24,INK,'Caslon')
yy=para('Relación de aspecto 494 / 590 ≈ 0,837. Usar object-fit: contain; no estirar, recortar, recolorear ni reemplazar el símbolo.',x,yy+10,312)
yy=para('El archivo fue extraído del PDF institucional. Es una imagen rasterizada; no constituye un original vectorial de marca.',x,yy+15,312)
y+=230
y=table(['Ubicación','Tamaño implementado'],[
 ['Cabecera de escritorio','50 × 60 px; gap de 15 px con el nombre.'],
 ['Cabecera ≤ 800 px','37 × 45 px; gap de 10 px.'],
 ['Bloque principal de escritorio','173 × 207 px dentro del marco con arco.'],
 ['Bloque principal ≤ 800 px','139 × 166 px.'],
 ['Pie','40 × 49 px.']
],[195,CW-195],y)+19
note('MEJORA RECOMENDADA','Conseguir el original vectorial de marca. El inicio usa mezcla normal y conserva los colores del escudo; la cabecera conserva multiply y el pie screen. Al recibir el original, comprobar esas dos mezclas y retirar las que no sean necesarias.',y)

# 06. Color
y=begin('fundamentos_05','Paleta institucional','Tokens efectivos de styles.css y warmth.css. Valores digitales, no equivalencias de impresión.')
tokens=[('--navy',NAVY,'Azul institucional','Identidad, botones y selección'),('--navy-deep',DEEP,'Azul profundo','Franja superior y pie'),('--gold',GOLD,'Dorado','Acentos, botón principal y detalles'),('--cream',CREAM,'Marfil','Inicio y superficies cálidas'),('--paper',PAPER,'Blanco cálido','Fondo base y texto sobre azul'),('--ink',INK,'Tinta','Títulos y texto principal'),('--muted',MUTED,'Texto secundario','Párrafos y aclaraciones'),('--line',LINE,'Separador','Bordes y divisiones sutiles')]
for i,(token,hex,name,use) in enumerate(tokens):
    x=M+(i%2)*(CW/2+12); yy=y+(i//2)*106
    rect(x,yy,CW/2-12,38,hex,LINE if hex in [CREAM,PAPER,LINE] else None,.5)
    text(name,x,yy+46,11); right(hex.upper(),x+CW/2-12,yy+47,8,'DM',MUTED)
    text(token,x,yy+65,8,'DM','#8d6d35'); para(use,x,yy+80,CW/2-12,8.2,11.5)
y+=436
note('COLORES LOCALES IMPLEMENTADOS','Borde funcional: --control-border #826E48. Tokens adicionales: --gold-ink #826329 para énfasis; --warm-panel #EEE7DA para filiales. Valores locales: servicios #F0EDE6; comunidad #E7DBC5; panel de alojamiento #FFFDF9; arco del escudo #FAF6EE.',y)

# 07. Contrast
y=begin('fundamentos_06','Estados y combinaciones','Contrastes calculados sobre los colores CSS sólidos; no constituyen una auditoría completa de accesibilidad.')
def luminance(hex):
    rgb=[int(hex[i:i+2],16)/255 for i in (1,3,5)]
    rgb=[v/12.92 if v<=.04045 else ((v+.055)/1.055)**2.4 for v in rgb]
    return sum(v*w for v,w in zip(rgb,[.2126,.7152,.0722]))
def ratio(a,b):
    aa,bb=sorted([luminance(a),luminance(b)]); return (bb+.05)/(aa+.05)
pairs=[(INK,PAPER,'Texto principal','Texto normal'),(MUTED,'#eee7da','Texto secundario','Texto normal'),('#826329','#eee7da','Rótulo de filiales','Texto normal'),(PAPER,NAVY,'Selección','Texto normal'),(DEEP,GOLD,'Botón dorado','Texto normal'),('#826e48','#eee7da','Borde funcional','Información gráfica'),('#a37923',NAVY,'Foco interior','Información gráfica'),(GOLD,PAPER,'Dorado decorativo','Evitar texto informativo')]
y=table(['Primer plano / fondo','Contraste','Uso'],[[f'{a.upper()} / {b.upper()}',f'{ratio(a,b):.2f}:1',f'{use}. {status}.'] for a,b,use,status in pairs],[181,65,CW-246],y,8.2)+23
y=block('Estados presentes en la interfaz','Hover: botón dorado #E2C585; botón azul #164465; enlace de cabecera #8B641D. Foco visible: #A37923, 3px; separación 5px en controles, -5px interior en selector, 6px en títulos enfocados al navegar. Botón de alojamiento seleccionado: azul institucional con texto claro.',y)
y=block('Criterio de contraste','WCAG 2.2 AA establece 4,5:1 para texto normal y 3:1 para texto grande (24 px regular o aproximadamente 18,7 px en negrita). El dorado principal sobre blanco cálido da 1,97:1; reservar esa combinación para decoración. [W1]',y)
note('REVISIÓN Y LÍMITES','Etapa 03: borde funcional 4,71:1 sobre papel y 4,00:1 sobre filiales; foco interior azul 3,66:1. Hover y cota del gradiente registrados en stage-03-accessibility.md. Lector real pendiente por decisión del usuario; no certifica WCAG.',y)

# 08. Typography
y=begin('fundamentos_07','Tradición y legibilidad','Libre Caslon Display para el carácter institucional. DM Sans para leer y navegar.')
label('LIBRE CASLON DISPLAY · PESO 400',M,y)
text('Tu historia nos une.',M,y+23,43,'Caslon',INK)
label('DM SANS · TEXTO Y CONTROLES',M,y+83)
text('Una comunidad que sigue acompañando.',M,y+108,16,'DM',MUTED)
y+=153
y=table(['Elemento','Escritorio','Pantalla pequeña'],[
 ['Título de inicio / h1','clamp(52px, 5.1vw, 74px); hasta 1050: 56px','≤ 800: clamp(46px, 8vw, 64px); ≤ 420: 45px'],
 ['Títulos de sección / h2','clamp(42px, 4vw, 58px)','≤ 800: 46px; ≤ 420: 43px; filiales 55px en escritorio'],
 ['Descripción del inicio','17px; interlineado 1.8','16px'],
 ['Base / body','16px; interlineado 1.8','Se conservan reglas locales'],
 ['Nombre de servicio','31px Caslon','28px Caslon'],
 ['Botones y controles','16px; peso 650 en botones','16px; ancho completo en inicio ≤ 420'],
 ['Rótulo de sección','12px; tracking 0.12em','12px; detalle de marca 10px']
],[132,166,CW-298],y,8.1)+19
note('IMPLEMENTACIÓN Y CRITERIO DE MEJORA','DM Sans se solicita en pesos 400, 450, 500, 550, 600, 650 y 700. Caslon Display se carga regular: las cursivas del sitio son sintetizadas por CSS. Fallbacks: Georgia y Arial. Etapa 02: rótulos 12px, auxiliares 14px y controles 16px; detalle de marca 10px. Zoom al 200% confirmado manualmente por Juan; no fue automatizado. Las muestras de este PDF usan los archivos regulares.',y)

# 09. Layout
y=begin('fundamentos_08','Retícula, ritmo y espacio','La identidad se sostiene con alineaciones, aire y líneas finas, incorporando formas más suaves.')
y=table(['Regla implementada','Valor'],[
 ['Contenedor .wrap','min(1240px, calc(100% - 96px))'],
 ['Margen lateral de escritorio','48px por lado hasta alcanzar el máximo del contenedor'],
 ['Sección .section','87px arriba y abajo; 65px a partir de ≤ 800px'],
 ['Bloque principal','Columnas 1.4fr / 1fr; gap 65px; padding 66px / 57px'],
 ['Institución y contacto','Dos columnas iguales; gap 90px'],
 ['Filiales','Dos columnas iguales; gap 85px'],
 ['Alojamiento','Selector 270px + columna flexible'],
 ['Bordes y esquinas','Separadores de 1px; botones 8px; sede 12px; paneles 16px'],
 ['Sombras','Solo menú móvil: 0 12px 18px #092B4810']
],[201,CW-201],y,8.5)+22
label('ESCALA PROPUESTA PARA NUEVOS COMPONENTES',M,y); y+=22
for i,n in enumerate([4,8,12,16,24,32,48,64]):
    x=M+i*62
    rect(x,y,42,max(3,n*.65),GOLD)
    text(f'{n} px',x,y+52,8,'DM',MUTED)
y+=90
note('TOKENS Y ESCALA','Variables vigentes: tipografía de apoyo 12/14/16px; marca 10px; controles 44px; radios 8/12/16px; secciones 87/65px. La escala propuesta de 4px no está normalizada en toda la interfaz; conservar valores como 23, 29 y 65px cuando sostienen la composición.',y)

# 10. Responsive
y=begin('patrones_09','La misma identidad,<br/>en cada pantalla','Puntos de adaptación reales del CSS, con esquemas de composición a escala.')
sx=M; sy=y; sw=305; sh=195
rect(sx,sy,sw,sh,CREAM,LINE,.6); rect(sx,sy,sw,25,PAPER); rect(sx,sy+25,sw,147,CREAM)
text('Escudo + nombre',sx+12,sy+9,6.5); text('Institución · Servicios · Contacto',sx+141,sy+10,5.2)
text('Tu historia nos une.',sx+14,sy+53,21,'Caslon',INK); text('Seguimos a tu lado.',sx+14,sy+82,21,'Caslon','#826329'); text('Este también es tu lugar.',sx+14,sy+112,8,'DM',MUTED)
rect(sx+14,sy+137,110,20,GOLD); text('Hablemos',sx+20,sy+144,5.5)
rect(sx+206,sy+48,82,104,'#faf6ee','#d5c9b1',.6); image(sx+224,sy+56,46,67)
text('Te escuchamos',sx+12,sy+180,9,'Caslon'); text('Te acompañamos',sx+107,sy+180,9,'Caslon'); text('Nos encontramos',sx+214,sy+180,9,'Caslon')
mx=M+354; my=y; mw=139
rect(mx,my,mw,284,CREAM,LINE,.6); rect(mx,my,mw,25,PAPER); text('Escudo + nombre',mx+8,my+9,5.5); text('Menú',mx+109,my+9,5.2)
rect(mx,my+25,mw,191,CREAM); text('Tu historia nos une.',mx+10,my+45,14,'Caslon',INK); text('Seguimos a tu lado.',mx+10,my+70,14,'Caslon','#826329'); text('Este también es tu lugar.',mx+10,my+91,5.5,'DM',MUTED)
rect(mx+10,my+107,mw-20,18,GOLD); text('Hablemos',mx+17,my+114,5.3)
image(mx+49,my+140,42,56); text('Te escuchamos',mx+8,my+228,7,'Caslon'); text('Te acompañamos',mx+8,my+246,7,'Caslon'); text('Nos encontramos',mx+8,my+264,7,'Caslon')
y+=300
y=table(['Breakpoint','Cambios implementados'],[
 ['≥ 1500px','Más aire vertical en el bloque principal: 80px / 70px.'],
 ['≤ 1050px','Margen 30px; gaps reducidos; se conserva el bloque principal en dos columnas.'],
 ['≤ 800px','Margen 22px; menú colapsado; inicio, institución, filiales y contacto en una columna. Selector de alojamientos en grilla de 3 columnas.'],
 ['≤ 420px','Margen 18px; título 45px; acciones del inicio apiladas y botón a ancho completo.']
],[88,CW-88],y,8.7)+17
para('La franja de acompañamiento se apila en móvil. Filiales conserva dos columnas; alojamientos pasa de tres a dos columnas hasta 420 px. Los dibujos son esquemas a escala y las alturas reales dependen del contenido.',M,y,size=9,leading=13)

# 11. Header and footer
y=begin('componentes_10','Cabecera y pie institucional','La identidad y la orientación permanecen presentes durante el recorrido.')
rect(M,y,CW,73,CREAM,LINE,.6); image(M+14,y+12,30,43)
text('Círculo de Retirados',M+54,y+18,10); text('y Pensionados',M+54,y+31,10)
text('POLICÍA DE ENTRE RÍOS',M+54,y+48,6,'DM',MUTED)
text('Institución   Servicios   Filiales',M+251,y+32,7); rect(M+424,y+20,65,32,CREAM,'#c9b48b',.8); text('Contacto',M+436,y+32,7)
y+=95
y=block('Cabecera de escritorio','Franja superior con origen e identificación de la sede. Header sticky en top: 0, z-index: 20 y fondo claro casi opaco. Altura mínima: 100 px. Navegación por anclas y contacto enmarcado.',y)
y=block('Menú móvil','A partir de 800 px, el header mide al menos 83 px. El botón "Menú" controla #navigation mediante aria-expanded y aria-controls. Las opciones se despliegan bajo el header. Al elegir una sección se cierra y enfoca su título después de navegar. Escape cierra y vuelve al botón; Tab fuera de la cabecera cierra. Al cambiar el ancho, el foco pasa al control visible: Menú o el primer enlace de escritorio. En pantallas bajas tiene scroll interno.',y)
y=block('Pie de página','Fondo azul profundo, escudo, nombre institucional, frase de cierre y enlace de regreso al inicio. El año se actualiza con JavaScript. Detalle de marca 10px; pie auxiliar 12px. En pantallas pequeñas los elementos se redistribuyen y se oculta la frase lateral.',y)
note('VERIFICACIÓN RECOMENDADA','Probar la cabecera con nombres completos, zoom de 200%, navegación por teclado y rotación del dispositivo. El menú actual no implementa cierre por clic fuera ni bloqueo de scroll; no documentar esas funciones como disponibles.',y)

# 12. Buttons
y=begin('componentes_11','Acciones claras,<br/>estados reconocibles','Los botones son enlaces cuando navegan o abren un destino; se usan button para modificar la interfaz.')
label('PRIMARIO / CONTACTO',M,y); button('Hablemos',M,y+22,242)
label('SECUNDARIO / CONSULTA',M+270,y); button('Consultar alojamiento',M+270,y+22,230,42,NAVY,PAPER)
label('HOVER DORADO',M,y+89); button('Hablemos',M,y+111,242,42,'#e2c585',DEEP)
label('FOCO VISIBLE',M+270,y+89); button('Consultar alojamiento',M+270,y+111,230,42,NAVY,PAPER,True)
y+=180
y=table(['Anatomía','Valor implementado'],[
 ['Caja','min-height: 54px; padding: 16px 23px; radio: 8px'],
 ['Texto','DM Sans 16px; peso 650; interlineado 1.5'],
 ['Separación de icono','gap: 28px; flecha de apoyo visual'],
 ['Interacción','Transición de fondo y transform de 0.2s; elevación -2px al hover'],
 ['Movimiento reducido','prefers-reduced-motion elimina transición y elevación'],
 ['Enlace de texto','16px; altura mínima 44px; subrayado en hover'],
 ['Semántica','Enlaces con href; botones de selección con aria-pressed']
],[143,CW-143],y,8.7)+19
note('AL AMPLIAR EL SISTEMA','No hay estados de carga, error, éxito ni botones deshabilitados en la versión actual. Definirlos solo si se incorporan procesos reales, como formularios o reservas. Mantener verbos concretos: "Consultar", "Conocer" y "Ver ubicación".',y)

# 13. Accordion
y=begin('componentes_12','Servicios desplegables','Un patrón editorial compacto que permite explorar los beneficios sin saturar la portada.')
rect(M,y,CW,162,'#f0ede6')
line(M+15,y+18,W-M-15,y+18,'#ced3cf',.7)
text('01',M+15,y+38,8,'DM','#8d6d35'); text('Salud y bienestar',M+53,y+31,24,'Caslon'); text('×',W-M-28,y+35,13,'DM',MUTED)
para('Consultorios, enfermería y orientación para acompañar las necesidades de salud de nuestros integrantes.',M+53,y+71,CW-88,9,13)
text('Consultar atención',M+53,y+118,8); line(M+53,y+134,M+171,y+134,'#9c834e',.7)
line(M+15,y+149,W-M-15,y+149,'#ced3cf',.7)
y+=184
y=block('Anatomía y estado inicial','HTML nativo details / summary. Cinco filas con número, título, descriptor y signo de expansión. Salud se entrega abierto; las otras filas cerradas. La apertura de un servicio no cierra automáticamente los demás.',y)
y=table(['Categoría','Destino de la consulta'],[
 ['Salud y bienestar','Correo con asunto "Consulta sobre salud y bienestar"'],
 ['Trámites y asesoramiento','Correo con asunto "Consulta sobre trámites"'],
 ['Farmacia y beneficios','Correo con asunto "Consulta sobre farmacia y beneficios"'],
 ['Turismo y alojamiento','Ancla #alojamiento'],
 ['Recreación y comunidad','Correo con asunto "Consulta sobre recreación"']
],[205,CW-205],y,8.5)+18
para('En escritorio, la fila usa 50px / 1.4fr / 1fr / 35px. En móvil, 28px / 1fr / 25px; el descriptor se oculta. La revisión amplía textos y agrega un indicador circular. Summary mantiene la operación nativa por teclado. El signo decorativo lleva aria-hidden.',M,y,size=9.3,leading=14)

# 14. Branches
y=begin('componentes_13','Presencia provincial<br/>y búsqueda de filiales','La lista procede del dossier; los contactos locales no se presentan como confirmados.')
rect(M,y,CW,111,'#eee7da'); text('Encontrá tu localidad',M+18,y+16,9,'DM',INK)
text('colon',M+18,y+43,12,'DM',INK); line(M+18,y+63,M+232,y+63,'#64798b',.8)
text('1 localidad encontrada.',M+18,y+78,7.5,'DM',MUTED)
text('Colón',M+295,y+46,19,'Caslon',INK)
y+=131
y=block('Comportamiento implementado','La búsqueda filtra solo las 24 localidades del listado. Normaliza mayúsculas, espacios extremos y tildes: "colon" encuentra "Colón". La sede central de Paraná permanece visible y se enlaza a contacto. El conteo se escribe en role="status", aria-live="polite" y aria-atomic="true". Su lectura real sigue pendiente.',y)
y=block('Estado sin resultados','"No encontramos esa localidad. Consultá con la sede central." Al borrar la búsqueda se restaura la lista completa y desaparece el mensaje de conteo.',y)
label('LOCALIDADES PUBLICADAS EN EL DOSSIER [D, PP. 4-5]',M,y); y+=24
places=['Concordia','Colón','Diamante','Federación','Federal','Feliciano','Gualeguay','Gualeguaychú','Concepción del Uruguay','Hasenkamp','Cerrito','Chajarí','Crespo','La Paz','María Grande','Nogoyá','Rosario del Tala','General Ramírez','San Salvador','Santa Elena','Urdinarrain','Viale','Victoria','Villaguay']
for i,place in enumerate(places):
    x=M+(i//8)*(CW/3); yy=y+(i%8)*18
    text(place,x,yy,8.5); line(x,yy+14,x+CW/3-18,yy+14,LINE,.5)
y+=160
note('PENDIENTE','Confirmar dirección, teléfono, responsable y servicios de cada filial. El listado actual no abre fichas locales ni muestra un mapa interactivo; esas son posibles ampliaciones.',y)

# 15. Lodging
y=begin('componentes_14','Elegir un alojamiento','Un selector informativo que ayuda a preparar la consulta con la institución.')
rect(M,y,CW,147,CREAM,LINE,.6); rect(M,y,129,38,NAVY); text('Paraná',M+15,y+14,10,'DM',PAPER)
for i,place in enumerate(['María Grande','Victoria','Nogoyá']): text(place,M+15,y+52+i*31,9,'DM',MUTED)
label('ALOJAMIENTO INSTITUCIONAL',M+152,y+16); text('Paraná',M+152,y+42,30,'Caslon')
para('Habitaciones y espacios comunes para integrantes y familiares.',M+152,y+83,CW-175,9,13)
y+=170
y=block('Destinos y estado','Paraná, María Grande, Victoria, Nogoyá, La Paz y Santa Elena. Paraná se entrega seleccionado. El conjunto utiliza role="group"; cada botón expone aria-pressed. No es un tablist ARIA ni implementa navegación por flechas.',y)
y=block('Actualización de contenido','Al elegir un destino, JavaScript modifica el título, la descripción y el asunto del enlace mailto. El panel declara aria-live="polite" y recibe aria-controls de los botones. La lectura de voz real sigue pendiente. Nombres extensos ajustan su línea; el contorno de foco del selector se dibuja dentro del botón. Las descripciones y botones provienen de la colección stays, validada por Astro. El script recibe esos mismos datos desde el HTML.',y)
y=block('Adaptación y finalidad','Escritorio: selector vertical de 270 px y panel flexible. Hasta 800 px: tres columnas; hasta 420 px: dos columnas, sobre el detalle. "Consultar alojamiento" abre el correo del visitante con el destino en el asunto.',y)
note('CONDICIONES POR CONFIRMAR','Disponibilidad, tarifas, capacidad, equipamiento, requisitos y contacto de reserva de cada destino. El componente no consulta una base de reservas, no bloquea cupos y no confirma estadías. [D, pp. 6-7 y 9]',y)

# 16. Contact
y=begin('recorridos_15','Contacto y siguientes pasos','La versión actual usa canales directos y mantiene las consultas fuera de la landing.')
y=table(['Dato publicado en la landing','Contenido'],[
 ['Dirección de sede central','Urquiza 669, Paraná, Entre Ríos, CP 3100'],
 ['Correo','retiradospoliciaentrerios@gmail.com'],
 ['Ubicación','Búsqueda de la dirección en Google Maps'],
 ['Teléfonos, horarios y WhatsApp','Pendientes de confirmar; no implementados'],
 ['Formulario de contacto','No implementado; no hay envío ni almacenamiento de datos']
],[210,CW-210],y,8.8)+27
for n,title,body in [('01','Consultar un servicio','Abrir una categoría → seleccionar "Consultar" → se abre el cliente de correo con un asunto específico.'),('02','Consultar un alojamiento','Seleccionar la localidad → leer las condiciones generales → abrir correo con el destino elegido.'),('03','Localizar la sede','Ir a Contacto → "Ver ubicación" → abrir Google Maps en una nueva pestaña.')]:
    label(n,M,y); yy=para(title,M+32,y,CW-32,18,22,INK,'Caslon')
    y=para(body,M+32,yy+7,CW-32)+22
note('LÍMITES DEL CANAL','El enlace mailto requiere una aplicación de correo configurada y no garantiza que el mensaje se haya enviado. El correo tiene salto opcional antes de @ sin cambiar dirección ni enlace. No hay backend, confirmación automática ni seguimiento. Si se incorpora un formulario, definir primero destino, tratamiento de datos y mensajes de error.',y)

# 17. Editorial
y=begin('contenido_16','Una voz institucional<br/>que se siente cercana','La claridad y el respeto acompañan la identidad visual.')
y=block('Tono y nomenclatura','Usar lenguaje directo, cálido y respetuoso. En la comunicación general, "Círculo" e "institución"; para sus integrantes, "socios" o "integrantes", según confirme la conducción. El sitio actual utiliza voseo en acciones: "Conocé", "Encontrá", "Consultá".',y)
y=table(['Mantener','Evitar'],[
 ['"Tu historia nos une. Seguimos a tu lado."','Promesas de prestaciones, cobertura o descuentos sin condiciones vigentes.'],
 ['"Consultar atención" y "Consultar alojamiento"','"Reservar ahora" si no existe una reserva efectiva.'],
 ['Historia y datos con fuente y fecha','Autoridades, horarios y precios sin responsable de actualización.'],
 ['Frases breves y un propósito por bloque','Párrafos normativos extensos en la primera pantalla.']
],[CW/2,CW/2],y,8.8)+23
y=block('Fotografía y material visual','Priorizar fotos reales de la sede, encuentros y actividades, con autorización de uso y consentimiento cuando corresponda. Elegir encuadres naturales, luz clara y contexto reconocible. No presentar imágenes de banco o escenas generadas como registros de la institución.',y)
note('DIRECCIÓN VISUAL RECOMENDADA','Las fotos deben acompañar el relato sin competir con el escudo. Mantener proporciones consistentes, resolución suficiente y texto alternativo descriptivo. La versión actual utiliza únicamente el escudo; todavía no hay fotografías ni una galería.',y)

# 18. Institutional inventory
y=begin('contenido_17','Inventario institucional','Contenido de referencia del dossier. No todo está implementado ni confirmado como prestación vigente.')
y=table(['Área del dossier','Contenido para desarrollar / confirmar'],[
 ['Asistencia y previsión','Secretaría social, documentación, reclamos, trámites previsionales, subsidio por fallecimiento y asesoramiento legal. [D, p. 5]'],
 ['Salud y bienestar','Consultorio, enfermería, cardiología, psicología, podología, óptica, ortopedia, reintegros y envejecimiento activo. Confirmar profesionales, cobertura y condiciones. [D, p. 6]'],
 ['Farmacia y economía','Farmacia Social en 25 de Mayo 347, Paraná; beneficios y órdenes de compra. Validar condiciones y comercios adheridos. [D, p. 6]'],
 ['Alojamiento y turismo','Paraná y cinco localidades adicionales. El dossier registra 11 habitaciones en sede central. Confirmar capacidad y reservas. [D, pp. 6-7]'],
 ['Recreación','Camping de Tarnowski 215, Paraná; salón, quincho, canchas y actividades. Capacidades publicadas: aprox. 200 y 50 personas. Validar reglamentos y disponibilidad. [D, p. 7]'],
 ['Noticias y gestión','Convenios, obras, jornadas sanitarias y aniversarios. No hay sección de novedades en la implementación actual. [D, p. 8]']
],[126,CW-126],y,8.7)+22
y=block('Información estable','Historia, naturaleza institucional, misión y descripción general de las áreas. Conservar la fuente documental y revisar cuando se modifique el estatuto o la sede.',y)
note('INFORMACIÓN VARIABLE','Autoridades, contactos de filiales, horarios, OSER y procedimientos, convenio MEDICAL, Plan Óptico Solidario, convenios comerciales, precios y reservas requieren validación institucional. El dossier señala una asamblea para el 28/10/2026; se documenta como dato del dossier, no como evento verificado nuevamente. [D, pp. 8-9]',y)

# 19. Technical handoff
y=begin('implementacion_18','Base técnica y archivos','Astro 7.3.8 y TypeScript. Node 24 y npm construyen una salida HTML estática para Vercel.')
rect(M,y,CW,133,DEEP)
for i,s in enumerate(['proyecto/','  astro.config.mjs + vercel.json','  src/pages/ + layouts/','  src/components/ + content/','  src/styles/','  src/scripts/landing.ts','  public/assets/escudo.png']):
    text(s,M+18,y+14+i*15,9,'DM',PAPER if i!=0 else GOLD)
y+=154
y=table(['Archivo','Responsabilidad'],[
 ['pages/ + layouts/','Ruta, metadatos y documento HTML; componentes de secciones.'],
 ['styles.css / warmth.css','Base institucional y revisión cálida: tokens, composición, estados y breakpoints.'],
 ['content/ + landing.ts','Colecciones JSON validadas; menú, búsqueda y selector.'],
 ['public/assets/','Escudo compartido por cabecera, inicio, pie y favicon.'],
 ['scripts/ y tests/','Control de dist, siete tests Node y catorce casos Chromium de flujos.']
],[128,CW-128],y,8.6)+22
y=block('Dependencias y datos','Astro genera dist/. Las fuentes usan Google Fonts; correo y Maps son enlaces. No hay CMS ni base de datos. Las cuatro colecciones locales separan contenido de interfaz; el panel editorial requiere una fase posterior.',y)
note('DESPLIEGUE PREPARADO','Vercel está configurado en vercel.json, sin conectar cuenta ni desplegar. quality comprueba tipos, lint, formato, build y 21 pruebas; guarda captura y traza si falla. Playwright es solo de desarrollo. Sites conserva la vista histórica privada. El estado efectivo se registra en docs/project-status.md.',y)

# 20. Maintenance
y=begin('operacion_19','Mantenimiento y cambios','Un sistema útil debe indicar qué actualizar, dónde hacerlo y cómo comprobarlo.')
y=table(['Necesidad','Archivo / lugar','Verificación'],[
 ['Cambiar historia o contacto','src/content/institution.json','Revisar texto, enlace, móvil y fuentes.'],
 ['Agregar o quitar una filial','src/content/branches.json','Probar búsqueda, tildes, conteo y estado vacío.'],
 ['Modificar un alojamiento','src/content/stays.json','Comprobar orden, título, texto y asunto; fuente única.'],
 ['Modificar un color principal',':root en src/styles/; revisar warmth.css','Revisar todos los usos y contrastes.'],
 ['Cambiar el escudo','public/assets/escudo.png','Proporción, nitidez, blend modes y favicon.'],
 ['Agregar noticias o un panel','Nueva fase de desarrollo','Definir editor, datos, permisos y mantenimiento.']
],[130,177,CW-307],y,8.2)+24
y=block('Secuencia recomendada','1. Confirmar contenido con el responsable institucional.<br/>2. Editar src/ en una rama corta y revisar npm run dev.<br/>3. Preparar Chromium con npm run test:install; cerrar preview de revisión. Ejecutar npm run validate (21 pruebas); revisar pantallas.<br/>4. Hacer commit, push y PR en GitHub; obtener autorización de merge.<br/>5. Conectar y publicar en Vercel con autorización; verificar la URL.',y)
note('VERSIONADO DEL SISTEMA','Este PDF es la versión 1.6. Actualizar documento y registro de cambios cuando se alteren tokens, componentes, estructura o canales de contacto. Registrar fecha, responsable y alcance de cada modificación; mantener la participación del usuario en decisiones visuales.',y)

# 21. QA and pending
y=begin('operacion_20','Validaciones y próximos pasos','Base inicial aceptada; revisión cálida implementada. La aceptación final y la auditoría integral siguen pendientes.')
y=table(['Verificado en la propuesta inicial','Alcance de la comprobación'],[
 ['HTML y JavaScript','Referencia de la primera versión: anclas, imágenes, IDs y JS válidos. Astro se valida con check, build y tests; ver project-status.md.'],
 ['Interacciones','Etapa 04: 14 casos Chromium; menú, foco, filiales, seis alojamientos, servicios, enlaces y 404. Siete tests Node preservados.'],
 ['Adaptación','Siete viewports CSS efectivos, de 360 a 1920px, y reflujo a 320px. Sin desborde; zoom 200% confirmado manualmente por el usuario.'],
 ['Publicación','Sites confirmó despliegue privado exitoso de la primera versión.']
],[207,CW-207],y,8.6)+21
y=block('Antes del lanzamiento institucional','Confirmar contacto y horarios; contactos de filiales; autoridades; cobertura y condiciones de servicios; reserva de alojamientos; reglamentos de espacios. Incorporar fotos reales y revisar la nomenclatura institucional. [D, p. 9]',y)
y=block('Accesibilidad y calidad por completar','Etapa 03: teclado, foco, reflujo y contrastes revisados; lector real diferido por el usuario. Flujos con fuentes de respaldo probados en etapa 04; revisión visual integral y lector real pendientes. Zoom al 200% confirmado manualmente por el usuario. WCAG 2.2 AA contempla objetivos táctiles de 24 × 24 px o alternativas/excepciones de separación; para este público se recomienda apuntar a 44 × 44 px en acciones principales. [W2, W3]',y)
note('PRIORIDAD DE MEJORA','El sitio ya incorpora skip-link, idioma es-AR, alt en imágenes informativas, estados ARIA y movimiento reducido. Los textos auxiliares se ampliaron en la etapa 02. El usuario confirmó zoom al 200%. Colores funcionales revisados en etapa 03; falta la prueba de lector de pantalla. No se realizó una auditoría completa con lector de pantalla ni una certificación WCAG.',y)

# 22. Sources
y=begin('referencias_21','Fuentes y trazabilidad','Documento elaborado el 13 de octubre de 2026 a partir de la base visual aceptada y de la fuente local.')
y=block('[D] Dossier suministrado por el usuario','Dossier_Circulo_Retirados_Policia_Entre_Rios_con_logo.pdf. Corte: 8 de octubre de 2026. 10 páginas. Fuente de historia, identidad, servicios, localidades y pendientes de validación. Ubicación de origen: carpeta Downloads del usuario. Sus recomendaciones se trataron como material de referencia.',y)
y=block('[C] Implementación y proyecto de portfolio','Fuente actual: pages, layouts, components, content, styles y landing.ts. Escudo en public/assets/. La fuente visual importada conserva este commit de origen Sites:',y)
y=para(SHA,M,y,CW,8.5,13,INK)+16
label('ENLACE DE LA PROPUESTA',M,y); y+=17
y=para(f'<link href="{SITE}" color="{NAVY}">{SITE}</link>',M,y,CW,8.7,13,INK)+21
y=block('[W] Referencias técnicas de accesibilidad','W3C, Understanding WCAG 2.2: consultas del 9 y 13/10/2026. Criterios y evidencia ampliados en docs/stage-03-accessibility.md. Se usan para criterios y recomendaciones; no prueban conformidad de esta landing.',y)
sources=[('W1 · Contraste de texto','https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html'),('W2 · Tamaño mínimo de objetivos','https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html'),('W3 · Foco visible','https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html')]
for name,url in sources:
    text(name,M,y,9); y=para(f'<link href="{url}" color="{MUTED}">{url}</link>',M,y+16,CW,7.7,11,MUTED)+15
y=block('Tipografías y licencia','Muestras regulares de Libre Caslon Display y DM Sans obtenidas del repositorio oficial google/fonts. Las familias se distribuyen bajo SIL Open Font License. La landing las carga desde Google Fonts. El generador portátil está en tools/docs/ y el PDF se guarda en docs/design-system.pdf.',y)
para('<link href="https://github.com/google/fonts/tree/main/ofl/librecaslondisplay" color="#596877">google/fonts · Libre Caslon Display</link>  /  <link href="https://github.com/google/fonts/tree/main/ofl/dmsans" color="#596877">google/fonts · DM Sans</link>',M,y,CW,8,12,MUTED)

bad=[b for b in BOUNDS if b[2]>780]
if bad:
    print('OVERFLOW',bad)
    raise RuntimeError('Content below safe body region')
c.save()
(ROOT/'tmp').mkdir(exist_ok=True)
reader=PdfReader(str(OUT))
assert len(reader.pages)==22, len(reader.pages)
for i,p in enumerate(reader.pages):
    t=p.extract_text()
    assert len(t)>100, f'Empty page {i+1}'
    assert '\ufffd' not in t, f'Invalid text page {i+1}'
(ROOT/'tmp/extracted-text.txt').write_text('\n\n'.join(f'PAGE {i+1}\n{p.extract_text()}' for i,p in enumerate(reader.pages)),encoding='utf-8')
print('PDF',str(OUT)); print('PAGES',len(reader.pages)); print('BYTES',OUT.stat().st_size)
print('CONTENT_BOUNDS_OK',len(BOUNDS))
