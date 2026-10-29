import assert from 'node:assert/strict';
import {
  cpSync,
  mkdtempSync,
  writeFileSync,
  readFileSync,
  symlinkSync,
  rmSync,
  realpathSync,
} from 'node:fs';
import { resolve, join, dirname, basename } from 'node:path';
import { tmpdir } from 'node:os';
import { spawn, spawnSync } from 'node:child_process';
import { once } from 'node:events';
import { chromium } from '@playwright/test';

const root = resolve(import.meta.dirname, '../..');
const tempParent = realpathSync(tmpdir());
const workspace = mkdtempSync(join(tempParent, 'circulo-editorial-'));
let preview;
let browser;
try {
  for (const item of [
    'src',
    'public',
    'config',
    'astro.config.mjs',
    'vercel.json',
    'tsconfig.json',
    'package.json',
  ])
    cpSync(join(root, item), join(workspace, item), { recursive: true });
  const configPath = join(workspace, 'astro.config.mjs');
  writeFileSync(
    configPath,
    readFileSync(configPath, 'utf8').replace('vite: {', "vite: { cacheDir: '.vite',"),
  );
  symlinkSync(join(root, 'node_modules'), join(workspace, 'node_modules'), 'junction');
  const sample = (id, category, status = 'published', publishedAt = '2020-10-01T12:00:00Z') => ({
    id,
    title:
      category === 'logro'
        ? 'Prueba de gestión en María Grande'
        : 'Prueba de noticia institucional',
    summary: 'Contenido sintético exclusivo del entorno de pruebas.',
    category,
    status,
    publishedAt,
    body: [
      '<script>window.evil = true</script>',
      'Párrafo de prueba sin datos institucionales reales.',
    ],
    facebookUrl: 'https://www.facebook.com/example/posts/123',
  });
  writeFileSync(
    join(workspace, 'src/content/news.json'),
    JSON.stringify([
      sample('prueba-noticia', 'noticia'),
      sample('prueba-logro', 'logro'),
      sample('prueba-borrador', 'noticia', 'draft'),
      sample('prueba-futura', 'noticia', 'published', '2999-01-01T00:00:00Z'),
    ]),
  );
  const build = spawnSync(
    process.execPath,
    [join(root, 'node_modules/astro/bin/astro.mjs'), 'build', '--root', workspace],
    {
      cwd: workspace,
      encoding: 'utf8',
      env: { ...process.env, SITE_URL: '', SEO_INDEXABLE: 'false', VERCEL_ENV: 'preview' },
    },
  );
  assert.equal(build.status, 0, build.stderr + build.stdout);
  const article = readFileSync(join(workspace, 'dist/novedades/prueba-logro/index.html'), 'utf8');
  assert(article.includes('&lt;script&gt;window.evil'));
  assert(!article.includes('<script>window.evil'));
  const index = readFileSync(join(workspace, 'dist/novedades/index.html'), 'utf8');
  assert(!index.includes('prueba-borrador'));
  assert(!index.includes('prueba-futura'));
  preview = spawn(
    process.execPath,
    [
      join(root, 'node_modules/astro/bin/astro.mjs'),
      'preview',
      '--root',
      workspace,
      '--host',
      '127.0.0.1',
      '--port',
      '0',
    ],
    {
      cwd: workspace,
      stdio: ['ignore', 'pipe', 'pipe'],
      env: { ...process.env, SITE_URL: '', SEO_INDEXABLE: 'false', TEST_CSP_ENFORCE: 'true' },
    },
  );
  const origin = await new Promise((ok, fail) => {
    let output = '';
    const timer = setTimeout(() => fail(Error('Preview editorial sin iniciar: ' + output)), 20000);
    const read = (chunk) => {
      output += chunk;
      const match = output.match(/http:\/\/127\.0\.0\.1:\d+/);
      if (match) {
        clearTimeout(timer);
        ok(match[0]);
      }
    };
    preview.stdout.on('data', read);
    preview.stderr.on('data', read);
    preview.once('error', (error) => {
      clearTimeout(timer);
      fail(error);
    });
    preview.once('exit', () => {
      clearTimeout(timer);
      fail(Error(output));
    });
  });
  browser = await chromium.launch();
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.addInitScript(() => {
    window.violations = [];
    document.addEventListener('securitypolicyviolation', (event) =>
      window.violations.push(event.effectiveDirective),
    );
  });
  await page.goto(origin + '/novedades/');
  await page.locator('#news-search').fill('  MARIA  ');
  await page.waitForFunction(
    () => document.querySelector('#news-status').textContent === '1 publicación encontrada.',
  );
  assert.equal(await page.locator('[data-news-item]:visible').count(), 1);
  await page.getByRole('button', { name: 'Noticias', exact: true }).click();
  assert.equal(await page.locator('[data-news-item]:visible').count(), 0);
  assert(await page.locator('#news-empty').isVisible());
  await page.locator('#news-search').fill('');
  assert.equal(await page.locator('[data-news-item]:visible').count(), 1);
  await page.getByRole('button', { name: 'Todas', exact: true }).click();
  assert.equal(await page.locator('[data-news-item]:visible').count(), 2);
  await page
    .getByRole('heading', { name: 'Prueba de gestión en María Grande', exact: true })
    .getByRole('link')
    .click();
  assert.equal(await page.locator('h1').innerText(), 'Prueba de gestión en María Grande');
  assert.equal(await page.evaluate(() => window.evil), undefined);
  assert.deepEqual(await page.evaluate(() => window.violations), []);
  assert.deepEqual(errors, []);
  for (const path of ['/novedades/prueba-borrador/', '/novedades/prueba-futura/'])
    assert.equal((await page.request.get(origin + path)).status(), 404);
  console.log(
    'Editorial: fixture aislada, artículos, escape de HTML, búsqueda, categorías y exclusión de borradores/futuras verificadas con CSP exigida.',
  );
} finally {
  await browser?.close();
  if (preview && preview.exitCode === null) {
    const exited = once(preview, 'exit');
    preview.kill();
    await exited;
  }
  assert.equal(dirname(workspace), tempParent);
  assert(basename(workspace).startsWith('circulo-editorial-'));
  rmSync(workspace, { recursive: true, force: true });
}
