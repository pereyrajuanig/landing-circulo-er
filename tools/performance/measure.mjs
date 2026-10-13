import { chromium } from '@playwright/test';
import { spawn } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { once } from 'node:events';
import { gzipSync } from 'node:zlib';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';
const label = process.argv[2] || 'measurement';
const root = resolve(import.meta.dirname, '../..');
const output = resolve(root, 'tmp/performance');
mkdirSync(output, { recursive: true });
const bin = JSON.parse(readFileSync(resolve(root, 'node_modules/astro/package.json'))).bin.astro;
const server = spawn(
  process.execPath,
  [resolve(root, 'node_modules/astro', bin), 'preview', '--host', '127.0.0.1', '--port', '4176'],
  { cwd: root, stdio: ['ignore', 'pipe', 'pipe'] },
);
let browser;
try {
  await new Promise((ok, fail) => {
    let text = '';
    const timeout = setTimeout(() => fail(new Error('Preview: ' + text)), 20000);
    const read = (chunk) => {
      text += chunk;
      if (text.includes('http://127.0.0.1:4176')) {
        clearTimeout(timeout);
        ok();
      }
    };
    server.stdout.on('data', read);
    server.stderr.on('data', read);
    server.once('error', fail);
    server.once('exit', (code) => fail(new Error('Preview salió: ' + code)));
  });
  browser = await chromium.launch();
  const result = {
    label,
    commit: execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root }).toString().trim(),
    node: process.version,
    chromium: browser.version(),
    date: new Date().toISOString(),
    runs: [],
  };
  for (const scenario of ['desktop', 'mobile']) {
    for (let run = 1; run <= (label === 'visual' ? 1 : 3); run++) {
      const mobile = scenario === 'mobile';
      const context = await browser.newContext({
        viewport: mobile ? { width: 390, height: 844 } : { width: 1440, height: 900 },
        deviceScaleFactor: 1,
        isMobile: mobile,
        hasTouch: mobile,
      });
      const page = await context.newPage();
      const session = await context.newCDPSession(page);
      await session.send('Network.enable');
      await session.send('Network.setCacheDisabled', { cacheDisabled: true });
      if (mobile) {
        await session.send('Network.emulateNetworkConditions', {
          offline: false,
          latency: 150,
          downloadThroughput: 200000,
          uploadThroughput: 93750,
        });
        await session.send('Emulation.setCPUThrottlingRate', { rate: 4 });
      }
      const failures = [];
      page.on('requestfailed', (request) =>
        failures.push({ url: request.url(), error: request.failure()?.errorText }),
      );
      await page.addInitScript(() => {
        window.__perf = { lcp: [], shifts: [], events: [], longtasks: [] };
        for (const type of ['largest-contentful-paint', 'layout-shift', 'event', 'longtask']) {
          if (!PerformanceObserver.supportedEntryTypes.includes(type)) continue;
          new PerformanceObserver((list) => {
            for (const e of list.getEntries()) {
              if (type === 'largest-contentful-paint')
                window.__perf.lcp.push({
                  time: e.startTime,
                  element: e.element?.tagName,
                  id: e.element?.id,
                  src: e.url,
                });
              if (type === 'layout-shift' && !e.hadRecentInput)
                window.__perf.shifts.push({ time: e.startTime, value: e.value });
              if (type === 'event' && e.interactionId)
                window.__perf.events.push({
                  duration: e.duration,
                  name: e.name,
                  interactionId: e.interactionId,
                });
              if (type === 'longtask') window.__perf.longtasks.push(e.duration);
            }
          }).observe(
            type === 'event'
              ? { type, buffered: true, durationThreshold: 16 }
              : { type, buffered: true },
          );
        }
      });
      await page.goto('http://127.0.0.1:4176/', { waitUntil: 'networkidle', timeout: 60000 });
      await page.evaluate(() => document.fonts.ready);
      // Ventana fija de observación del laboratorio, idéntica antes y después.
      await page.waitForTimeout(1500);
      const loading = await page.evaluate(() => {
        let max = 0,
          current = 0,
          start = 0,
          previous = 0;
        for (const s of window.__perf.shifts) {
          if (s.time - previous > 1000 || s.time - start > 5000) {
            current = 0;
            start = s.time;
          }
          current += s.value;
          max = Math.max(max, current);
          previous = s.time;
        }
        return {
          lcp: window.__perf.lcp.at(-1),
          cls: max,
          fonts: [...document.fonts].map((f) => ({
            family: f.family,
            weight: f.weight,
            status: f.status,
          })),
          resources: performance.getEntriesByType('resource').map((e) => ({
            url: e.name,
            encodedBytes: e.encodedBodySize,
            transferredBytes: e.transferSize,
            duration: e.duration,
          })),
          images: [...document.images].map((i) => ({
            src: i.currentSrc,
            width: i.clientWidth,
            height: i.clientHeight,
            complete: i.complete,
            naturalWidth: i.naturalWidth,
          })),
        };
      });
      if (mobile) await page.getByRole('button', { name: 'Menú', exact: true }).click();
      await page.getByRole('link', { name: 'Filiales', exact: true }).first().click();
      const filter = page.locator('input[type="search"]');
      await filter.fill('MARIA');
      await filter.fill('');
      await page.locator('[data-stay]').nth(1).click();
      await page.waitForTimeout(300);
      const interaction = await page.evaluate(() => ({
        events: window.__perf.events,
        longtasks: window.__perf.longtasks,
      }));
      if (run === 1) {
        await page.goto('http://127.0.0.1:4176/');
        await page.evaluate(() => document.fonts.ready);
        await page.screenshot({
          path: resolve(output, `${label}-${scenario}.png`),
          fullPage: true,
        });
      }
      if (run === 1)
        await page.screenshot({ path: resolve(output, `${label}-${scenario}-viewport.png`) });
      result.runs.push({ scenario, run, loading, interaction, failures });
      await context.close();
      console.log(
        `${label} ${scenario} ${run}: LCP ${loading.lcp?.time.toFixed(0)} ms; CLS ${loading.cls.toFixed(4)}; fallos ${failures.length}`,
      );
    }
  }
  const inventory = (dir) =>
    readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
      e.isDirectory()
        ? inventory(resolve(dir, e.name))
        : [
            {
              path: resolve(dir, e.name)
                .slice(root.length + 1)
                .replaceAll('\\', '/'),
              bytes: statSync(resolve(dir, e.name)).size,
              gzip: gzipSync(readFileSync(resolve(dir, e.name))).length,
            },
          ],
    );
  result.inventory = inventory(resolve(root, 'dist'));
  writeFileSync(resolve(output, label + '.json'), JSON.stringify(result, null, 2) + '\n');
} finally {
  await browser?.close();
  if (server.exitCode === null) {
    const exited = once(server, 'exit');
    server.kill();
    await exited;
  }
}
