import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';
import { reportPolicy, scriptHashes } from './security-policy.mjs';
const root = resolve(import.meta.dirname, '..');
export function validateSecurity() {
  const config = JSON.parse(readFileSync(resolve(root, 'vercel.json'), 'utf8'));
  const rules = config.headers;
  assert.equal(rules.length, 1);
  assert.equal(rules[0].source, '/(.*)');
  const headers = Object.fromEntries(rules[0].headers.map((h) => [h.key, h.value]));
  assert.equal(Object.keys(headers).length, rules[0].headers.length);
  assert.equal(headers['Content-Security-Policy-Report-Only'], reportPolicy());
  assert(
    !headers['Content-Security-Policy'],
    'La CSP de hosting sigue en Report-Only hasta revisión real.',
  );
  assert(!headers['Strict-Transport-Security'], 'HSTS requiere decisión sobre dominio real.');
  assert.equal(headers['X-Content-Type-Options'], 'nosniff');
  assert.equal(headers['Referrer-Policy'], 'no-referrer');
  assert.equal(headers['X-Frame-Options'], 'DENY');
  assert.equal(
    headers['Permissions-Policy'],
    'camera=(), microphone=(), geolocation=(), payment=()',
  );
  const walk = (directory) =>
    readdirSync(directory, { withFileTypes: true }).flatMap((entry) =>
      entry.isDirectory() ? walk(resolve(directory, entry.name)) : [resolve(directory, entry.name)],
    );
  const html = walk(resolve(root, 'dist'))
    .filter((file) => file.endsWith('.html'))
    .map((file) => readFileSync(file, 'utf8'))
    .join('\n');
  for (const [, attrs] of html.matchAll(/<a\b([^>]*)>/gi)) {
    if (/target="_blank"/.test(attrs)) {
      assert(/rel="[^"]*noopener/.test(attrs));
      assert(/rel="[^"]*noreferrer/.test(attrs));
    }
  }
  for (const [, src] of html.matchAll(/(?:src|href)="([^"]+)"/g))
    assert(!src.startsWith('http://'), 'Recurso o enlace HTTP inseguro.');
  for (const blocked of ['.env', '.git', 'docs', 'tools', 'config', 'package.json'])
    assert(!existsSync(resolve(root, 'dist', blocked)), blocked);
  return { headers, inlineScriptHashes: scriptHashes().length };
}
export function validateRepository() {
  // Detección acotada: textos versionados y patrones reconocibles. No es una auditoría del historial ni de binarios.
  const files = execFileSync('git', ['ls-files', '-z'], { cwd: root })
    .toString()
    .split('\0')
    .filter(Boolean);
  const ruleset = [
    ['clave privada', /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/],
    ['token GitHub', /\bgh[pousr]_[A-Za-z0-9]{36}\b/],
    ['token GitHub fine-grained', /\bgithub_pat_[A-Za-z0-9_]{70,}\b/],
    ['clave AWS', /\bAKIA[A-Z0-9]{16}\b/],
    ['clave API', /\bsk-(?:proj-)?[A-Za-z0-9_-]{30,}\b/],
  ];
  for (const file of files) {
    assert(!file.startsWith('docs/reference/'), 'Dossier no debe estar versionado.');
    assert(
      !/(?:^|\/)\.env(?:\.|$)/.test(file) || file.split('/').at(-1) === '.env.example',
      'Archivo de entorno versionado.',
    );
    if (!/\.(?:astro|ts|js|mjs|json|md|ya?ml|css|txt)$/.test(file)) continue;
    const text = readFileSync(resolve(root, file), 'utf8');
    for (const [name, pattern] of ruleset)
      assert(!pattern.test(text), `Posible ${name} en ${file}; no se muestra el valor.`);
  }
  return { trackedFiles: files.length };
}
if (
  process.argv[1] &&
  resolve(process.argv[1]) === resolve(import.meta.dirname, 'check-security.mjs')
) {
  if (process.argv.includes('--repository')) {
    const result = validateRepository();
    console.log(
      'Repositorio: exclusiones y patrones verificados en ' +
        result.trackedFiles +
        ' archivos rastreados; valores no mostrados.',
    );
  } else {
    const result = validateSecurity();
    console.log(
      'Seguridad de build verificada: headers preparados, ' +
        result.inlineScriptHashes +
        ' hash(es) inline y exclusiones. Hosting real pendiente.',
    );
  }
}
