import { test, expect } from '@playwright/test';

test('mapa: 25 puntos precisos, selección por teclado y selector táctil', async ({
  page,
  isMobile,
}) => {
  const violations = [];
  const errors = [];
  await page.addInitScript(() => {
    window.__mapViolations = [];
    document.addEventListener('securitypolicyviolation', (event) =>
      window.__mapViolations.push(event.effectiveDirective),
    );
  });
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('request', (request) => {
    if (!request.url().startsWith('http://127.0.0.1:4175/')) violations.push(request.url());
  });
  await page.goto('/');
  const map = page.locator('[data-filiales-map]');
  await expect(map).toHaveAttribute('data-ready', 'true');
  await expect(map.locator('[data-map-location]')).toHaveCount(25);
  await expect(map.locator('option')).toHaveCount(25);
  const anchorErrors = await map.locator('[data-map-location]').evaluateAll((markers) =>
    markers
      .filter((marker) => {
        const matrix = marker.querySelector('.map-marker').transform.baseVal.consolidate().matrix;
        return (
          Math.abs(matrix.e - Number(marker.dataset.x)) > 1e-4 ||
          Math.abs(matrix.f - Number(marker.dataset.y)) > 1e-4
        );
      })
      .map((marker) => marker.dataset.mapLocation),
  );
  expect(anchorErrors).toEqual([]);
  const selector = map.getByLabel('Elegí una localidad');
  const options = await selector
    .locator('option')
    .evaluateAll((items) =>
      items.map((item) => ({ id: item.value, name: item.textContent.split(' · ')[0] })),
    );
  for (const option of options) {
    await selector.selectOption(option.id);
    await expect(map.locator('[data-map-name]')).toHaveText(option.name);
    await expect(map.locator('[data-map-type]')).toHaveText(
      option.id === 'parana' ? 'Sede central' : 'Filial',
    );
    await expect(map.locator('[aria-pressed="true"]')).toHaveCount(1);
  }
  const flag = map.locator('[data-map-location="feliciano"] .map-flag');
  if (isMobile) await flag.tap();
  else await flag.click();
  await expect(map.locator('[data-map-name]')).toHaveText('Feliciano');
  const parana = map.getByRole('button', { name: 'Paraná · Sede central', exact: true });
  await parana.focus();
  await page.keyboard.press('Space');
  await expect(map.locator('[data-map-name]')).toHaveText('Paraná');
  await expect(parana).toBeFocused();
  await expect(map.locator('[data-map-link]')).toHaveAttribute('href', '/filiales/parana/');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(errors).toEqual([]);
  expect(violations).toEqual([]);
  expect(await page.evaluate(() => window.__mapViolations)).toEqual([]);
});

test('mapa: rótulos legibles sin solaparse en escritorio y tablet', async ({ page, isMobile }) => {
  test.skip(isMobile, 'En móvil se muestra solamente el rótulo seleccionado.');
  for (const width of [1440, 820]) {
    await page.setViewportSize({ width, height: 1100 });
    await page.goto('/institucion/');
    await page.evaluate(() => document.fonts.ready);
    const map = page.locator('[data-filiales-map]');
    const overlaps = await map.locator('.map-label-back').evaluateAll((labels) => {
      const pairs = [];
      for (let i = 0; i < labels.length; i++)
        for (let j = i + 1; j < labels.length; j++) {
          const a = labels[i].getBoundingClientRect(),
            b = labels[j].getBoundingClientRect();
          if (a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top)
            pairs.push([
              labels[i].parentElement.dataset.mapLocation,
              labels[j].parentElement.dataset.mapLocation,
            ]);
        }
      return pairs;
    });
    expect(overlaps, 'Solapamientos a ' + width + 'px').toEqual([]);
    await expect(map.locator('[data-map-location]')).toHaveCount(25);
  }
});

test('mapa: sin JavaScript conserva los 25 enlaces y el directorio', async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(baseURL);
  await expect(page.locator('[data-filiales-map] a[data-map-location]')).toHaveCount(25);
  await expect(page.locator('[data-map-tools]')).toBeHidden();
  await expect(page.locator('#branch-list li')).toHaveCount(24);
  await page.locator('[data-map-location="parana"]').click();
  await expect(page).toHaveURL(/\/filiales\/parana\/$/);
  await context.close();
});
