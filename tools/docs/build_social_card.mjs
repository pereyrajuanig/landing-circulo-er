import { chromium } from '@playwright/test';
import { readFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../../', import.meta.url));
const image = async (file) =>
  'data:image/png;base64,' + (await readFile(path.join(root, file))).toString('base64');
const font = async (file) =>
  'data:font/woff2;base64,' + (await readFile(path.join(root, file))).toString('base64');
const [crest, art, dm, caslon] = await Promise.all([
  image('public/assets/escudo.png'),
  image('src/assets/cities/diamante-background.png'),
  font('public/assets/fonts/dm-sans-latin.woff2'),
  font('public/assets/fonts/libre-caslon-display-latin.woff2'),
]);
const browser = await chromium.launch();
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });
  await page.setContent(`<!doctype html><html lang="es-AR"><head><meta charset="utf-8"><style>
    @font-face{font-family:DM;src:url('${dm}');font-weight:100 1000}
    @font-face{font-family:Caslon;src:url('${caslon}');font-weight:400}
    *{box-sizing:border-box}body{margin:0;background:#fcfaf5;color:#092b48;font-family:DM,Arial,sans-serif}
    .card{width:1200px;height:630px;display:grid;grid-template-columns:204px 1fr;overflow:hidden}
    .brand{background:#062139;color:#fcfaf5;padding:42px 24px 32px;display:flex;flex-direction:column;align-items:center;text-align:center}
    .crest{width:105px;height:132px;object-fit:contain;margin-bottom:24px}
    .brand strong{font-size:19px;line-height:1.35;font-weight:650}.brand p{font-size:14px;line-height:1.5;margin:14px 0 0}
    .brand .since{margin-top:auto;border-top:1px solid #688091;padding-top:20px;width:100%;font-size:13px;letter-spacing:.04em}
    .hero{position:relative;isolation:isolate;overflow:hidden}.art{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:right bottom;z-index:-2}
    .hero:before{content:'';position:absolute;inset:0;z-index:-1;background:linear-gradient(90deg,#fcfaf5f2 0%,#fcfaf5e6 38%,#fcfaf54d 62%,#fcfaf500 80%),linear-gradient(0deg,#fcfaf5,#fcfaf500 16%)}
    .copy{padding:87px 38px 0}.eyebrow{font-size:12px;font-weight:650;letter-spacing:.17em;text-transform:uppercase;display:flex;align-items:center;gap:18px;margin:0 0 30px}.eyebrow:after{content:'';height:1px;width:100px;background:#092b48}
    h1{font-family:Caslon,Georgia,serif;font-size:66px;font-style:italic;font-weight:600;letter-spacing:-.025em;line-height:1.04;max-width:720px;margin:0}
    .underline{width:200px;height:16px;margin:9px 0 23px 320px;color:#31789c}
    .description{font-size:20px;line-height:1.55;max-width:470px;margin:0}
    .location{position:absolute;right:28px;bottom:72px;background:#fcfaf5e6;padding:7px 12px;font-size:12px}
    .address{position:absolute;bottom:24px;left:38px;font-size:16px;font-weight:600;letter-spacing:.02em}
  </style></head><body><main class="card">
  <aside class="brand"><img class="crest" src="${crest}" alt="Escudo del Círculo"><strong>Círculo de Retirados y Pensionados</strong><p>Policía de Entre Ríos</p><div class="since">Desde 1975<br>Entre Ríos, Argentina</div></aside>
  <section class="hero"><img class="art" src="${art}" alt="Grabado patrimonial de Diamante"><div class="copy"><p class="eyebrow">Comunidad policial entrerriana</p><h1>Al servicio de nuestros<br>retirados y pensionados.</h1><svg class="underline" viewBox="0 0 250 18" fill="none"><path d="M4 13C66 3 174 2 246 10" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg><p class="description">Acompañamiento, contención y beneficios para quienes sirvieron a Entre Ríos.</p></div><span class="location">Diamante, Entre Ríos</span><span class="address">circulopoliciaer.com.ar</span></section></main></body></html>`);
  await page.evaluate(async () => {
    await globalThis.document.fonts.ready;
    await Promise.all([...globalThis.document.images].map((img) => img.decode()));
  });
  await mkdir(path.join(root, 'public/assets'), { recursive: true });
  await page.screenshot({ path: path.join(root, 'public/assets/social-card.png'), type: 'png' });
  console.log('Tarjeta social del portal generada: 1200 x 630 px.');
} finally {
  await browser.close();
}
