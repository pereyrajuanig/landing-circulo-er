import { readFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
export function scriptHashes(root = resolve(import.meta.dirname, '../dist')) {
  const hashes = new Set();
  const walk = (directory) =>
    readdirSync(directory, { withFileTypes: true }).flatMap((entry) =>
      entry.isDirectory() ? walk(resolve(directory, entry.name)) : [resolve(directory, entry.name)],
    );
  for (const path of walk(root).filter((path) => path.endsWith('.html'))) {
    const html = readFileSync(path, 'utf8');
    for (const [, attrs, body] of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
      if (
        /\bsrc\s*=/.test(attrs) ||
        /type="application\/(?:ld\+)?json"/.test(attrs) ||
        !body.trim()
      )
        continue;
      hashes.add("'sha256-" + createHash('sha256').update(body).digest('base64') + "'");
    }
  }
  return [...hashes].sort();
}
export function reportPolicy(hashes = scriptHashes()) {
  return [
    "default-src 'self'",
    ['script-src', "'self'", ...hashes].join(' '),
    "style-src 'self'",
    "img-src 'self'",
    "font-src 'self'",
    "connect-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "frame-ancestors 'none'",
    "form-action 'none'",
  ].join('; ');
}
