import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { createStaticServer } from '../scripts/static-server.mjs';
import { sourceRoot, buildRoot } from '../scripts/paths.mjs';
import { validateSite } from '../scripts/check.mjs';
import { existsSync } from 'node:fs';

let server, origin;
before(async () => {
  server = createStaticServer(sourceRoot);
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  origin = `http://127.0.0.1:${server.address().port}`;
});
after(async () => { server.close(); await once(server, 'close'); });

test('la landing y todos sus recursos esenciales se sirven con el tipo correcto', async () => {
  const response = await fetch(origin);
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type'), /text\/html/);
  assert.match(await response.text(), /Tu historia nos une/);
  for (const [path, type] of [['styles.css', 'text/css'], ['warmth.css', 'text/css'], ['app.js', 'text/javascript'], ['assets/escudo.png', 'image/png']]) {
    const asset = await fetch(`${origin}/${path}`);
    assert.equal(asset.status, 200, path);
    assert(asset.headers.get('content-type').startsWith(type), path);
    assert((await asset.arrayBuffer()).byteLength > 0, path);
  }
});
test('no expone documentación del repositorio ni permite escapar de src', async () => {
  assert.equal((await fetch(`${origin}/README.md`)).status, 404);
  assert.equal((await fetch(`${origin}/%2e%2e%2fREADME.md`)).status, 403);
});
test('responde a HEAD y rechaza métodos que escribirían datos', async () => {
  const head = await fetch(origin, { method: 'HEAD' });
  assert.equal(head.status, 200);
  assert.equal(await head.text(), '');
  const post = await fetch(origin, { method: 'POST', body: 'dato ficticio' });
  assert.equal(post.status, 405);
});
test('las referencias de la fuente son válidas y la salida se valida cuando existe', () => {
  assert(validateSite().localReferences > 0);
  if (existsSync(buildRoot)) validateSite(buildRoot);
});
