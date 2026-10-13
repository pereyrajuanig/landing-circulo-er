import { readFileSync, writeFileSync } from 'node:fs';
import { reportPolicy } from './security-policy.mjs';
const url = new URL('../vercel.json', import.meta.url);
const config = JSON.parse(readFileSync(url, 'utf8'));
const globalRule = config.headers?.find((rule) => rule.source === '/(.*)');
const header = globalRule?.headers.find(
  (item) => item.key === 'Content-Security-Policy-Report-Only',
);
if (!header)
  throw new Error('Falta la política administrada en vercel.json; revisar configuración.');
header.value = reportPolicy();
writeFileSync(url, JSON.stringify(config, null, 2) + '\n');
console.log(
  'CSP actualizada con hashes del build; otros headers conservados. Revisar diff antes de commit.',
);
