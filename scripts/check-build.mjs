import assert from 'node:assert/strict';
import { readFileSync, existsSync, statSync, readdirSync } from 'node:fs';
import { resolve, relative, isAbsolute } from 'node:path';
import { fileURLToPath } from 'node:url';

export const buildRoot = fileURLToPath(new URL('../dist/', import.meta.url));
export function validateSite() {
  const html = readFileSync(resolve(buildRoot, 'index.html'), 'utf8');
  assert.match(html, /<html\s+lang="es-AR"/i, 'Falta el idioma.');
  assert.equal([...html.matchAll(/<h1\b/gi)].length, 1, 'Debe haber un único h1.');
  const walk = (directory) =>
    readdirSync(directory, { withFileTypes: true }).flatMap((entry) =>
      entry.isDirectory() ? walk(resolve(directory, entry.name)) : [resolve(directory, entry.name)],
    );
  const files = walk(buildRoot);
  const pages = files.filter((path) => path.endsWith('.html'));
  for (const page of pages) {
    const source = readFileSync(page, 'utf8');
    assert.match(source, /<html\s+lang="es-AR"/i, page + ': idioma');
    assert.equal([...source.matchAll(/<h1\b/gi)].length, 1, page + ': h1');
    assert.match(source, /<title>[^<]+<\/title>/, page + ': título');
    assert.match(source, /name="description" content="[^"]+"/, page + ': descripción');
    const pageIds = [...source.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
    assert.equal(new Set(pageIds).size, pageIds.length, page + ': IDs duplicados');
    for (const [, reference] of source.matchAll(/(?:src|href)="([^"]+)"/g)) {
      if (/^[a-z][a-z\d+.-]*:/i.test(reference)) continue;
      const [pathname, anchor] = reference.split('#');
      const target = pathname
        ? resolve(
            pathname.startsWith('/') ? buildRoot : resolve(page, '..'),
            '.' + (pathname.startsWith('/') ? pathname : '/' + pathname).split('?')[0],
          )
        : page;
      const rel = relative(buildRoot, target);
      assert(!rel.startsWith('..') && !isAbsolute(rel), 'Referencia fuera de dist: ' + reference);
      const file =
        existsSync(target) && statSync(target).isDirectory()
          ? resolve(target, 'index.html')
          : target;
      assert(
        existsSync(file) && statSync(file).isFile(),
        page + ': recurso inexistente ' + reference,
      );
      if (anchor && file.endsWith('.html')) {
        const ids = [...readFileSync(file, 'utf8').matchAll(/\bid="([^"]+)"/g)].map(
          (match) => match[1],
        );
        assert(ids.includes(anchor), page + ': ancla inexistente ' + reference);
      }
    }
    for (const [, references] of source.matchAll(
      /aria-(?:controls|labelledby|describedby)="([^"]+)"/g,
    ))
      for (const id of references.split(/\s+/))
        assert(pageIds.includes(id), page + ': referencia ARIA ' + id);
  }
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  const refs = [...html.matchAll(/(?:src|href)="([^"]+)"/g)]
    .map((match) => match[1])
    .filter((value) => !value.startsWith('#') && !/^[a-z][a-z\d+.-]*:/i.test(value));
  for (const path of files.filter((path) => /\.(html|css|js)$/.test(path)))
    assert(!readFileSync(path, 'utf8').includes('\ufffd'), 'UTF-8 inválido: ' + path);
  for (const excluded of ['README.md', 'docs', 'tools', 'src', '.git', 'package.json'])
    assert(
      !existsSync(resolve(buildRoot, excluded)),
      'El build expone archivos de desarrollo: ' + excluded,
    );
  return { html, ids, refs, pages };
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const { refs } = validateSite();
  console.log(
    'Build verificado: idioma, h1, anclas, IDs, ' +
      refs.length +
      ' recursos y exclusión de archivos internos.',
  );
}
