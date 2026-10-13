from pathlib import Path
import shutil
r = Path(__file__).resolve().parents[2]
from fontTools.ttLib import TTFont
from fontTools import subset
out=r/'public/assets/fonts';out.mkdir(parents=True,exist_ok=True)
for source,target,license in [('DMSans-Variable.ttf','dm-sans-latin.woff2','DMSans-OFL.txt'),('LibreCaslonDisplay-Regular.ttf','libre-caslon-display-latin.woff2','LibreCaslonDisplay-OFL.txt')]:
 font=TTFont(r/'tools/docs/fonts'/source)
 opts=subset.Options();opts.flavor='woff2';opts.name_IDs=['*'];opts.name_legacy=True;opts.name_languages=['*']
 sub=subset.Subsetter(options=opts);sub.populate(unicodes=list(range(0x250))+list(range(0x1e00,0x1f00))+list(range(0x2000,0x2070))+[0x20ac,0x2197,0x2192,0x2193,0x2600,0x2630]);sub.subset(font);font.flavor='woff2';font.save(out/target)
 shutil.copy2(r/'tools/docs/fonts'/license,out/license)
 print(target,(out/target).stat().st_size)
