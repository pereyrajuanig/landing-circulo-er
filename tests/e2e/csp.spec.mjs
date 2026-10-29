import { test, expect } from '@playwright/test';
test('CSP permite la aplicación y detecta o bloquea un script inline no autorizado', async ({
  page,
}, testInfo) => {
  const enforced = testInfo.config.metadata.cspEnforced === true;
  await page.addInitScript(() => {
    window.__probeViolations = [];
    document.addEventListener('securitypolicyviolation', (e) =>
      window.__probeViolations.push({
        directive: e.effectiveDirective,
        disposition: e.disposition,
      }),
    );
  });
  const response = await page.goto('/');
  expect(response.status()).toBe(200);
  expect(
    response.headers()[
      enforced ? 'content-security-policy' : 'content-security-policy-report-only'
    ],
  ).toContain("script-src 'self'");
  await page.locator('#branch-search').fill('MARIA');
  await expect(page.locator('#branch-list li:visible')).toHaveText(['María Grande']);
  expect(await page.evaluate(() => window.__probeViolations)).toEqual([]);
  await page.evaluate(() => {
    const script = document.createElement('script');
    script.textContent = 'window.__cspProbe = true';
    document.body.append(script);
  });
  await expect.poll(() => page.evaluate(() => window.__probeViolations.length)).toBeGreaterThan(0);
  expect(await page.evaluate(() => window.__cspProbe === true)).toBe(!enforced);
  expect(await page.evaluate(() => window.__probeViolations)).toContainEqual({
    directive: 'script-src-elem',
    disposition: enforced ? 'enforce' : 'report',
  });
});
