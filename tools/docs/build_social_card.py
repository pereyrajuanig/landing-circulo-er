from pathlib import Path
r = Path(__file__).resolve().parents[2]
from PIL import Image, ImageDraw, ImageFont
im=Image.new('RGB',(1200,630),'#fcfaf5');d=ImageDraw.Draw(im)
d.rectangle((0,0,1200,16),fill='#092b48');d.rectangle((0,614,1200,630),fill='#d2b16a')
crest=Image.open(r/'public/assets/escudo.png').convert('RGBA');crest.thumbnail((180,220));im.paste(crest,(74+(180-crest.width)//2,78),crest)
f=r/'tools/docs/fonts';dm=lambda n:ImageFont.truetype(str(f/'DMSans-Variable.ttf'),n);cas=ImageFont.truetype(str(f/'LibreCaslonDisplay-Regular.ttf'),66)
d.text((304,105),'CÍRCULO DE RETIRADOS Y PENSIONADOS',font=dm(25),fill='#092b48');d.text((304,146),'Policía de Entre Ríos',font=dm(29),fill='#56656c')
d.line((80,327,1120,327),fill='#d2b16a',width=2)
d.text((80,366),'Tu historia nos une.',font=cas,fill='#092b48');d.text((80,445),'Seguimos a tu lado.',font=cas,fill='#092b48')
im.save(r/'public/assets/social-card.png',optimize=True)
