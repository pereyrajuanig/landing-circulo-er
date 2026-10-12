import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { validateSite } from '../scripts/check-build.mjs';
import { normalize, branchStatus } from '../src/lib/search.ts';
import { mailTo } from '../src/lib/contact.ts';

const load = path => JSON.parse(readFileSync(new URL(path, import.meta.url), 'utf8'));
const decode = value => value.replace(/&amp;/g, '&').replace(/&#(?:x([\da-f]+)|(\d+));/gi, (_, hex, dec) => String.fromCodePoint(parseInt(hex || dec, hex ? 16 : 10))).replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const textContent = source => decode(source.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, '')).replace(/\s+/g, '');
let preview, origin;
before(async () => {
  preview = spawn(process.execPath, ['node_modules/astro/' + load('../node_modules/astro/package.json').bin.astro, 'preview', '--host', '127.0.0.1', '--port', '0'], { cwd: new URL('../', import.meta.url), env: { ...process.env, NO_COLOR: '1' }, stdio: ['ignore', 'pipe', 'pipe'] });
  await new Promise((resolve, reject) => {
    let output = '';
    const timeout = setTimeout(() => reject(new Error('Preview no inició: ' + output)), 15000);
    const read = chunk => { output += chunk.toString(); const match = output.match(/http:\/\/127\.0\.0\.1:(\d+)/); if (match) { origin = match[0]; clearTimeout(timeout); resolve(); } };
    preview.stdout.on('data', read); preview.stderr.on('data', read);
    preview.once('error', error => { clearTimeout(timeout); reject(error); });
    preview.once('exit', code => { clearTimeout(timeout); reject(new Error('Preview terminó: ' + code + '\n' + output)); });
  });
});
after(async () => { if (preview && preview.exitCode === null) { const exited = once(preview, 'exit'); preview.kill(); await exited; } });

test('Astro conserva todo el texto visible y las anclas de la landing aceptada', () => {
  const { html, ids } = validateSite();
  const baseline = load('./fixtures/landing-contract.json');
  assert.equal(textContent(html.match(/<body[^>]*>([\s\S]*?)<\/body>/)[1]), baseline.bodyText.replace('©' + (baseline.year ?? 2026), '©' + new Date().getFullYear()));
  assert.deepEqual(ids, baseline.ids);
});
test('el build incluye las filiales y serializa alojamientos desde la misma fuente', () => {
  const { html } = validateSite();
  const branches = load('../src/content/branches.json');
  const stays = load('../src/content/stays.json').sort((a, b) => a.order - b.order);
  const rendered = decode(html.match(/data-stays="([^"]+)"/)[1]);
  assert.deepEqual(JSON.parse(rendered), stays);
  for (const branch of branches) assert(html.includes('<li>' + branch.name + '</li>'), branch.name);
  assert.equal([...html.matchAll(/data-stay="/g)].length, stays.length);
  assert.match(html, /<details open/);
});
test('filtra tildes, mayúsculas y espacios y comunica el resultado vacío', () => {
  const branches = load('../src/content/branches.json');
  assert.deepEqual(branches.filter(branch => normalize(branch.name).includes(normalize('  MARIA  '))).map(branch => branch.name), ['María Grande']);
  assert.equal(branchStatus('', 24), '');
  assert.equal(branchStatus('Paraná', 1), '1 localidad encontrada.');
  assert.equal(branchStatus('general', 2), '2 localidades encontradas.');
  assert.equal(branchStatus('xxxx', 0), 'No encontramos esa localidad. Consultá con la sede central.');
});
test('el asunto de alojamiento se codifica sin convertir contenido en parámetros', () => {
  const email = load('../src/content/institution.json')[0].email;
  const subject = 'Consulta de alojamiento en María Grande & familia';
  const url = new URL(mailTo(email, subject));
  assert.equal(url.pathname, email);
  assert.equal(url.searchParams.get('subject'), subject);
  assert.equal([...url.searchParams].length, 1);
});
test('Astro preview sirve HTML, CSS, JavaScript y escudo con sus MIME correctos', async () => {
  const response = await fetch(origin);
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type'), /text\/html/);
  const { refs } = validateSite();
  for (const path of new Set(refs)) {
    const asset = await fetch(new URL(path, origin));
    assert.equal(asset.status, 200, path);
    const type = path.endsWith('.css') ? /text\/css/ : path.endsWith('.js') ? /(?:text|application)\/javascript/ : /image\/png/;
    assert.match(asset.headers.get('content-type'), type, path);
    assert((await asset.arrayBuffer()).byteLength > 0, path);
  }
});
test('la preview del build no expone el repositorio o el dossier local', async () => {
  for (const path of ['/README.md', '/package.json', '/docs/design-system.pdf', '/docs/reference/Dossier_Circulo_Retirados_Policia_Entre_Rios_con_logo.pdf', '/src/content/institution.json']) {
    assert.equal((await fetch(new URL(path, origin))).status, 404, path);
  }
});
