import { writeFileSync } from 'node:fs';
import { validateSite } from './check-build.mjs';

// Ejecutar solo después de revisar y aprobar un cambio editorial intencional.
const { html, ids } = validateSite();
const decode = (value) =>
  value
    .replace(/&amp;/g, '&')
    .replace(/&#(?:x([\da-f]+)|(\d+));/gi, (_, hex, dec) =>
      String.fromCodePoint(parseInt(hex || dec, hex ? 16 : 10)),
    )
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
const body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/)[1];
const bodyText = decode(
  body
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ''),
).replace(/\s+/g, '');
const path = new URL('../tests/fixtures/landing-contract.json', import.meta.url);
writeFileSync(
  path,
  JSON.stringify({ bodyText, ids, year: new Date().getFullYear() }, null, 2) + '\n',
);
console.log('Referencia de contenido actualizada. Revisar el diff de la fixture antes del commit.');
