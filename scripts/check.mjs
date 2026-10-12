import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { resolve, relative, isAbsolute } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { sourceRoot } from './paths.mjs';

export function validateSite(root = sourceRoot) {
  root = resolve(root);
  const html = readFileSync(resolve(root, 'index.html'), 'utf8');
  assert.match(html, /<html\s+lang="es-AR"/i, 'Falta el idioma de la página.');
  assert.equal([...html.matchAll(/<h1\b/gi)].length, 1, 'Debe haber un único título principal.');
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length, 'Hay IDs duplicados.');
  for (const [, anchor] of html.matchAll(/href="#([^"]+)"/g)) assert(ids.includes(anchor), `Ancla inexistente: ${anchor}`);
  const local = [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map(match => match[1]).filter(value => !value.startsWith('#') && !/^[a-z][a-z\d+.-]*:/i.test(value));
  for (const value of local) {
    const path = resolve(root, decodeURIComponent(value.split(/[?#]/)[0]));
    const rel = relative(root, path);
    assert(!rel.startsWith('..') && !isAbsolute(rel), `Referencia fuera de src: ${value}`);
    assert(existsSync(path) && statSync(path).isFile(), `Falta un archivo: ${value}`);
  }
  const walk = directory => readdirSync(directory, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(resolve(directory, entry.name)) : [resolve(directory, entry.name)]);
  for (const path of walk(root).filter(path => /\.(html|css|js)$/.test(path))) assert(!readFileSync(path, 'utf8').includes('\ufffd'), `UTF-8 inválido: ${path}`);
  const js = spawnSync(process.execPath, ['--check', resolve(root, 'app.js')], { encoding: 'utf8' });
  assert.equal(js.status, 0, js.stderr || 'Error de sintaxis en app.js.');
  return { anchors: ids.length, localReferences: local.length };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const result = validateSite();
  console.log(`Sintaxis JS, idioma, título, IDs, anclas y ${result.localReferences} referencias locales: OK`);
}
