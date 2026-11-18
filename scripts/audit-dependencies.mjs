import { spawnSync } from 'node:child_process';

const temporaryAdvisory = 'https://github.com/advisories/GHSA-fc5q-39xc-vjpf';
const exceptionExpires = Date.parse('2026-12-01T00:00:00Z');
const windows = process.platform === 'win32';
const args = ['audit', '--audit-level=high', '--json'];
const audit = spawnSync(windows ? ['npm', ...args].join(' ') : 'npm', windows ? [] : args, {
  encoding: 'utf8',
  maxBuffer: 4 * 1024 * 1024,
  shell: windows,
});

if (audit.error) throw audit.error;
if (audit.status !== 0 && audit.status !== 1) {
  throw new Error(audit.stderr || 'npm audit no devolvió un resultado válido.');
}

const report = JSON.parse(audit.stdout);
if (report.auditReportVersion !== 2 || report.error || !report.vulnerabilities) {
  throw new Error('npm audit no completó la consulta al registro.');
}

const advisories = Object.values(report.vulnerabilities).flatMap(({ via }) =>
  via.filter((entry) => typeof entry !== 'string'),
);
const blocking = advisories.filter(
  ({ severity }) => severity === 'high' || severity === 'critical',
);
const hasException = blocking.some(
  ({ name, severity, url }) =>
    name === 'picomatch' && severity === 'high' && url === temporaryAdvisory,
);
const activeException = hasException && Date.now() < exceptionExpires;
const fatal = blocking.filter(
  ({ name, severity, url }) =>
    !(activeException && name === 'picomatch' && severity === 'high' && url === temporaryAdvisory),
);

for (const { severity, name, title, url } of advisories) {
  console.log(`${severity}: ${name} · ${title} · ${url}`);
}
if (activeException) console.warn(`Excepción temporal hasta 2026-12-01 UTC: ${temporaryAdvisory}`);
if (fatal.length || (audit.status !== 0 && !activeException)) process.exitCode = 1;
