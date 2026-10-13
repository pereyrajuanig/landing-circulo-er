import assert from 'node:assert/strict';
import { readFileSync, existsSync, statSync, readdirSync } from 'node:fs';
import { resolve, relative, isAbsolute } from 'node:path';
import { fileURLToPath } from 'node:url';

export const buildRoot = fileURLToPath(new URL('../dist/', import.meta.url));
export function validateSite() {
  const html = readFileSync(resolve(buildRoot, 'index.html'), 'utf8');
  assert.match(html, /<html\s+lang="es-AR"/i, 'Falta el idioma.');
  assert.equal([...html.matchAll(/<h1\b/gi)].length, 1, 'Debe haber un único h1.');
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(new Set(ids).size, ids.length, 'Hay IDs duplicados.');
  for (const [, anchor] of html.matchAll(/href="#([^"]+)"/g))
    assert(ids.includes(anchor), 'Ancla inexistente: ' + anchor);
  const refs = [...html.matchAll(/(?:src|href)="([^"]+)"/g)]
    .map((match) => match[1])
    .filter((value) => !value.startsWith('#') && !/^[a-z][a-z\d+.-]*:/i.test(value));
  for (const value of refs) {
    const path = resolve(
      buildRoot,
      '.' + (value.startsWith('/') ? value : '/' + value).split(/[?#]/)[0],
    );
    const rel = relative(buildRoot, path);
    assert(!rel.startsWith('..') && !isAbsolute(rel), 'Referencia fuera de dist: ' + value);
    assert(existsSync(path) && statSync(path).isFile(), 'Recurso inexistente: ' + value);
  }
  const walk = (directory) =>
    readdirSync(directory, { withFileTypes: true }).flatMap((entry) =>
      entry.isDirectory() ? walk(resolve(directory, entry.name)) : [resolve(directory, entry.name)],
    );
  const files = walk(buildRoot);
  for (const path of files.filter((path) => /\.(html|css|js)$/.test(path)))
    assert(!readFileSync(path, 'utf8').includes('\ufffd'), 'UTF-8 inválido: ' + path);
  for (const excluded of ['README.md', 'docs', 'tools', 'src', '.git', 'package.json'])
    assert(
      !existsSync(resolve(buildRoot, excluded)),
      'El build expone archivos de desarrollo: ' + excluded,
    );
  return { html, ids, refs };
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const { refs } = validateSite();
  console.log(
    'Build verificado: idioma, h1, anclas, IDs, ' +
      refs.length +
      ' recursos y exclusión de archivos internos.',
  );
}
