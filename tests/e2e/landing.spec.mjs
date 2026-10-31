import { test as base, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';

const load = (name) =>
  JSON.parse(readFileSync(new URL('../../src/content/' + name, import.meta.url), 'utf8'));
const stays = load('stays.json').sort((a, b) => a.order - b.order);
const institution = load('institution.json')[0];

const test = base.extend({
  page: async ({ page, baseURL }, use) => {
    const origin = new URL(baseURL).origin;
    const errors = [];
    await page.addInitScript(() => {
      window.__securityViolations = [];
      document.addEventListener('securitypolicyviolation', (event) =>
        window.__securityViolations.push({
          directive: event.effectiveDirective,
          disposition: event.disposition,
          blocked: event.blockedURI,
        }),
      );
    });
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('requestfailed', (request) => {
      if (new URL(request.url()).origin === origin)
        errors.push(request.url() + ': ' + request.failure()?.errorText);
    });
    // Solo se visita la preview local; las fuentes remotas no condicionan los flujos.
    await page.route('**/*', (route) =>
      new URL(route.request().url()).origin === origin ? route.continue() : route.abort(),
    );
    try {
      await use(page);
    } finally {
      expect(errors, 'Errores de JavaScript o recursos locales').toEqual([]);
      expect(
        await page.evaluate(() => window.__securityViolations),
        'Violaciones CSP durante flujos reales',
      ).toEqual([]);
    }
  },
});

test.beforeEach(async ({ page }, testInfo) => {
  if (testInfo.title.startsWith('carrusel')) await page.clock.install();
  const response = await page.goto('/');
  expect(response.status()).toBe(200);
  await page.evaluate(() => document.fonts.ready);
  await expect
    .poll(() =>
      page.evaluate(() =>
        [...document.fonts]
          .filter((font) => font.status === 'loaded')
          .map((font) => font.family)
          .sort(),
      ),
    )
    .toEqual(['DM Sans', 'Libre Caslon Display']);
});

test('salto de teclado y CTA llevan al contenido y a contacto', async ({ page }) => {
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Ir al contenido', exact: true })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('main')).toBeFocused();
  // Esperar el destino de la primera ancla antes de iniciar otra navegación.
  await expect
    .poll(() =>
      page
        .getByRole('main')
        .evaluate((element) =>
          Math.abs(
            element.getBoundingClientRect().top -
              parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop),
          ),
        ),
    )
    .toBeLessThan(2);
  await page.keyboard.press('Tab');
  const cta = page.getByRole('link', { name: 'Hablemos', exact: true });
  await expect(cta).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#contacto$/);
  await expect(page.locator('#contacto h2')).toBeInViewport();
});

test('menú y navegación llevan a las páginas del sitio y conservan retorno de foco', async ({
  page,
  isMobile,
}) => {
  const menu = page.getByRole('button', { name: 'Menú', exact: true });
  let navigation = page.getByRole('navigation', {
    name: 'Navegación principal',
    includeHidden: true,
  });
  if (isMobile) {
    await menu.focus();
    await menu.press('Enter');
    await expect(menu).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Tab');
    await expect(navigation.getByRole('link', { name: 'Beneficios', exact: true })).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(menu).toBeFocused();
    await expect(navigation).toBeHidden();
    await menu.click();
  } else {
    await expect(menu).toBeHidden();
  }
  await navigation.getByRole('link', { name: 'Novedades', exact: true }).click();
  await expect(page).toHaveURL(/\/novedades\/$/);
  await page.waitForLoadState('load');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Noticias y logros de gestión');
  navigation = page.getByRole('navigation', { name: 'Navegación principal', includeHidden: true });
  await expect(
    navigation.getByRole('link', { name: 'Novedades', exact: true, includeHidden: true }),
  ).toHaveAttribute('aria-current', 'page');
  if (isMobile) {
    await expect(menu).toHaveAttribute('aria-expanded', 'false');
    await menu.click();
  }
  await navigation.getByRole('link', { name: 'Beneficios', exact: true }).click();
  await expect(page).toHaveURL(/\/beneficios\/$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Beneficios para acompañarte');
});

test('filiales reconocen mayúsculas y tildes, informan vacío y conservan la sede', async ({
  page,
}) => {
  const search = page.getByLabel('Encontrá tu localidad', { exact: true });
  const visible = page.locator('#branch-list li:visible');
  const status = page.locator('#branch-status');
  await search.fill('  COLON  ');
  await expect(visible).toHaveText(['Colón']);
  await expect(status).toHaveText('1 localidad encontrada.');
  await search.fill('MARIA');
  await expect(visible).toHaveText(['María Grande']);
  await search.fill('zzzz');
  await expect(visible).toHaveCount(0);
  await expect(status).toHaveText('No encontramos esa localidad. Consultá con la sede central.');
  await expect(
    page.getByRole('link', { name: 'SEDE CENTRAL Paraná Urquiza 669', exact: true }),
  ).toBeVisible();
  await search.fill('');
  await expect(visible).toHaveCount(24);
  await expect(status).toBeEmpty();
});

test('los alojamientos cambian selección única, contenido y asunto del correo', async ({
  page,
}) => {
  const selector = page.getByRole('group', { name: 'Elegí un alojamiento' });
  for (const [index, stay] of stays.entries()) {
    const button = selector.getByRole('button', { name: stay.name, exact: true });
    await button.press(index % 2 ? 'Space' : 'Enter');
    await expect(button).toBeFocused();
    await expect(button).toHaveAttribute('aria-pressed', 'true');
    await expect(selector.locator('button[aria-pressed="true"]')).toHaveCount(1);
    await expect(page.locator('#stay-title')).toHaveText(stay.name);
    await expect(page.locator('#stay-detail-link')).toHaveAttribute(
      'href',
      '/alojamientos/' + stay.id + '/',
    );
    await expect(page.locator('#stay-copy')).toHaveText(stay.description);
    await expect(page.locator('[data-stay-photo]:visible')).toHaveCount(1);
    await expect(page.locator('[data-stay-photo]:visible')).toHaveAttribute(
      'data-stay-photo',
      stay.id,
    );
    const url = new URL(
      await page
        .getByRole('link', { name: 'Consultar alojamiento', exact: true })
        .getAttribute('href'),
    );
    expect(url.protocol).toBe('mailto:');
    expect(url.pathname).toBe(institution.email);
    expect(url.searchParams.get('subject')).toBe('Consulta de alojamiento en ' + stay.name);
    expect([...url.searchParams]).toHaveLength(1);
  }
});

test('servicios nativos abren con teclado y permiten varias categorías', async ({ page }) => {
  const health = page.locator('details').nth(0);
  const paperwork = page.locator('details').nth(1);
  await expect(health).toHaveAttribute('open', '');
  await health.locator('summary').press('Enter');
  await expect(health).not.toHaveAttribute('open', '');
  await health.locator('summary').press('Space');
  await expect(health).toHaveAttribute('open', '');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Consultar atención', exact: true })).toBeFocused();
  await paperwork.locator('summary').press('Enter');
  await expect(paperwork).toHaveAttribute('open', '');
  await expect(health).toHaveAttribute('open', '');
  await expect(page.getByRole('link', { name: 'Consultar un trámite', exact: true })).toBeVisible();
});

test('anclas, CTA, correo, Maps y respuesta 404 conservan destinos válidos', async ({
  page,
  request,
}) => {
  for (const link of await page.locator('a[href^="#"]').all()) {
    const href = await link.getAttribute('href');
    await expect(page.locator('[id="' + href.slice(1) + '"]')).toHaveCount(1);
  }
  await page.getByRole('link', { name: 'Cómo podemos acompañarte', exact: true }).click();
  await expect(page).toHaveURL(/#servicios$/);
  await page.getByRole('link', { name: 'Conocé nuestra historia', exact: true }).click();
  await expect(page).toHaveURL(/#institucion$/);
  await page.getByRole('link', { name: 'Volver al inicio', exact: true }).click();
  await expect(page).toHaveURL(/#inicio$/);
  await expect(page.getByRole('heading', { level: 1 })).toBeInViewport();
  await expect(
    page.getByRole('link', { name: 'Quiero hacer una consulta', exact: true }),
  ).toHaveAttribute('href', 'mailto:' + institution.email);
  await expect(page.getByRole('link', { name: institution.email, exact: true })).toHaveAttribute(
    'href',
    'mailto:' + institution.email,
  );
  const map = page.getByRole('link', { name: 'Ver ubicación', exact: true });
  await expect(map).toHaveAttribute('href', institution.mapUrl);
  await expect(map).toHaveAttribute('target', '_blank');
  await expect(map).toHaveAttribute('rel', /noopener/);
  expect((await request.get('/ruta-inexistente-etapa04')).status()).toBe(404);
});

test('cambios de tamaño y menú bajo mantienen foco utilizable sin desborde', async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 768 });
  const navigation = page.getByRole('navigation', {
    name: 'Navegación principal',
    includeHidden: true,
  });
  await navigation.getByRole('link', { name: 'Beneficios', exact: true }).focus();
  await page.setViewportSize({ width: 390, height: 844 });
  const menu = page.getByRole('button', { name: 'Menú', exact: true });
  await expect(menu).toBeFocused();
  await page.setViewportSize({ width: 1024, height: 768 });
  await expect(navigation.getByRole('link', { name: 'Beneficios', exact: true })).toBeFocused();
  await page.setViewportSize({ width: 640, height: 360 });
  await menu.press('Enter');
  for (let step = 0; step < 5; step++) await page.keyboard.press('Tab');
  const contact = navigation.getByRole('link', { name: 'Contacto', exact: true });
  await expect(contact).toBeFocused();
  await expect
    .poll(async () => {
      const rect = await contact.boundingBox();
      return rect.y >= 0 && rect.y + rect.height <= 360;
    })
    .toBe(true);
  await page.keyboard.press('Escape');
  await expect(menu).toBeFocused();
  await page.setViewportSize({ width: 320, height: 800 });
  const search = page.getByLabel('Encontrá tu localidad', { exact: true });
  await search.fill('MARIA');
  await expect(page.locator('#branch-list li:visible')).toHaveText(['María Grande']);
  await page
    .getByRole('group', { name: 'Elegí un alojamiento' })
    .getByRole('button', { name: 'Nogoyá', exact: true })
    .press('Enter');
  await expect(page.locator('#stay-title')).toHaveText('Nogoyá');
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= document.documentElement.clientWidth,
    ),
  ).toBe(true);
});

test('404 ofrece un regreso por teclado sin desborde', async ({ page }, testInfo) => {
  const response = await page.goto('/pagina-inexistente');
  expect(response.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Te ayudamos a encontrar el camino.',
  );
  await expect
    .poll(() =>
      page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      ),
    )
    .toBeLessThanOrEqual(0);
  await page.screenshot({ path: testInfo.outputPath('404.png'), fullPage: true });
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');
  await expect(page.getByRole('main')).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Círculo: volver al inicio' })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Volver al inicio', exact: true })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Tu historia nos une.');
});

test('recursos locales y consultas no crean almacenamiento de aplicación', async ({
  page,
  context,
}) => {
  await page.locator('#branch-search').fill('MARIA');
  await page.locator('[data-stay]').nth(1).click();
  expect(await context.cookies()).toEqual([]);
  const inventory = await page.evaluate(async () => ({
    local: Object.keys(localStorage),
    session: Object.keys(sessionStorage),
    databases: await indexedDB.databases(),
    workers: await navigator.serviceWorker.getRegistrations(),
    remote: performance
      .getEntriesByType('resource')
      .filter((entry) => new URL(entry.name).origin !== location.origin)
      .map((entry) => entry.name),
  }));
  expect(inventory).toEqual({ local: [], session: [], databases: [], workers: [], remote: [] });
});

test('beneficios estadías y salones tienen acceso directo y consulta específica', async ({
  page,
}) => {
  const paths = page.getByRole('navigation', { name: 'Conocé tus beneficios' });
  await expect(paths.locator('a')).toHaveCount(3);
  await expect(page.locator('.hero-welcome')).toContainText('una pensión vinculada a ella');
  await paths.getByRole('link', { name: /Salones para eventos/ }).click();
  await expect(page).toHaveURL(/\/salones\/$/);
  await expect(page.locator('#events-title')).toBeInViewport();
  const href = await page
    .getByRole('link', { name: 'Consultar por un salón', exact: true })
    .getAttribute('href');
  const url = new URL(href);
  expect(url.protocol).toBe('mailto:');
  expect(url.pathname).toBe(institution.email);
  expect(url.searchParams.get('subject')).toBe('Consulta sobre salones para eventos');
  await page.goto('/contacto/');
  expect(await page.locator('#contacto').innerText()).not.toContain('cómo formar parte');
});

test('las fichas y preguntas frecuentes permiten explorar el sitio sin reservar', async ({
  page,
}) => {
  await page
    .getByRole('navigation', { name: 'Conocé tus beneficios' })
    .getByRole('link', { name: /Alojamientos/ })
    .click();
  await expect(page).toHaveURL(/\/alojamientos\/$/);
  await page.getByRole('link', { name: 'Nogoyá', exact: true }).click();
  await expect(page).toHaveURL(/\/alojamientos\/nogoya\/$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Alojamiento en Nogoyá');
  await page.getByText('¿Puedo reservar desde esta página?', { exact: true }).press('Enter');
  await expect(
    page.getByText('La web ofrece información y prepara una consulta por correo.', {
      exact: false,
    }),
  ).toBeVisible();
  const url = new URL(
    await page
      .getByRole('link', { name: 'Consultar alojamiento', exact: true })
      .getAttribute('href'),
  );
  expect(url.searchParams.get('subject')).toBe('Consulta de alojamiento en Nogoyá');
  const navigation = page.getByRole('navigation', { name: 'Explorar el sitio' });
  await navigation.getByRole('link', { name: 'Beneficios', exact: true }).click();
  await page
    .getByRole('heading', { level: 2 })
    .filter({ hasText: 'Farmacia y beneficios' })
    .getByRole('link')
    .click();
  await expect(page).toHaveURL(/\/beneficios\/farmacia\/$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Farmacia y beneficios');
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= document.documentElement.clientWidth,
    ),
  ).toBe(true);
});

test('galería institucional permite ampliar cambiar imagen y devolver el foco', async ({
  page,
}) => {
  await page.goto('/alojamientos/maria-grande/');
  const gallery = page.locator('[data-photo-gallery]');
  await expect(gallery).toContainText('Imágenes del alojamiento identificado');
  const openers = gallery.locator('[data-gallery-open]');
  await expect(openers).toHaveCount(2);
  const opener = openers.first();
  await opener.focus();
  await page.keyboard.press('Enter');
  const dialog = page.getByRole('dialog', { name: 'Galería de alojamiento', exact: true });
  await expect(dialog).toBeVisible();
  await expect(
    dialog.getByRole('button', { name: 'Cerrar imagen ampliada', exact: true }),
  ).toBeFocused();
  await expect(dialog.locator('[data-gallery-image]')).toHaveAttribute(
    'alt',
    /alojamiento de María Grande/,
  );
  await dialog.getByRole('button', { name: 'Imagen siguiente', exact: true }).click();
  await expect(dialog.getByRole('status')).toHaveText('2 / 2 · María Grande · comedor');
  await expect(dialog.locator('[data-gallery-image]')).toHaveAttribute(
    'src',
    await openers.nth(1).evaluate((element) => element.href),
  );
  await expect(dialog.locator('[data-gallery-local]')).toContainText('Archivo del Círculo');
  await expect(dialog.locator('[data-gallery-source]')).toBeHidden();
  await page.keyboard.press('ArrowLeft');
  await expect(dialog.getByRole('status')).toHaveText('1 / 2 · María Grande · habitación');
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(opener).toBeFocused();
  await openers.nth(1).click();
  await dialog.getByRole('button', { name: 'Cerrar imagen ampliada', exact: true }).click();
  await expect(openers.nth(1)).toBeFocused();
});

test('galería de una imagen conserva cierre y referencias pendientes siguen avisadas', async ({
  page,
}) => {
  await page.goto('/alojamientos/parana/');
  await page.locator('[data-gallery-open]').click();
  const dialog = page.getByRole('dialog', { name: 'Galería de alojamiento', exact: true });
  await expect(dialog.getByRole('button', { name: 'Imagen siguiente', exact: true })).toHaveCount(
    0,
  );
  await expect(dialog.getByRole('status')).toHaveText('1 / 1 · Paraná · habitación');
  await page.keyboard.press('Escape');
  await expect(page.locator('[data-gallery-open]')).toBeFocused();
  await page.goto('/alojamientos/nogoya/');
  await expect(page.locator('[data-photo-gallery]')).toContainText(
    'No corresponden al alojamiento real',
  );
});

test('novedades permite consultar memorias del archivo y salones distinguen capacidades', async ({
  page,
}) => {
  await page.goto('/novedades/');
  const items = page.locator('[data-news-item]:visible');
  await expect(items).toHaveCount(4);
  await page.getByLabel('Buscá una publicación', { exact: true }).fill('FEDERACION');
  await expect(items).toHaveCount(1);
  await items.getByRole('link', { name: 'Leer publicación', exact: false }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Federación: mejoras, alojamiento y talleres',
  );
  await expect(page.locator('.source-context')).toContainText(
    'sin fecha de grabación identificada',
  );
  await expect(page.locator('.article-gallery [data-photo-kind="institutional"]')).toHaveCount(1);
  await page.goto('/novedades/');
  await page.getByRole('button', { name: 'Noticias', exact: true }).click();
  await expect(items).toHaveCount(0);
  await expect(page.locator('#news-empty')).toBeVisible();
  await page.goto('/salones/');
  await expect(page.locator('#los-laureles')).toContainText('30 y 50 personas');
  await expect(page.locator('#las-rosas')).toContainText('170 personas');
  await expect(page.locator('#diamante [data-site-photo]')).toHaveCount(0);
});

test('carrusel avanza automáticamente y sincroniza foto ciudad y grabado', async ({
  page,
  isMobile,
}) => {
  const carousel = page.locator('[data-city-carousel]');
  await carousel.scrollIntoViewIfNeeded();
  await page.mouse.move(0, 0);
  await expect(carousel).toHaveAttribute('data-rotation-state', 'playing');
  await expect(carousel).toHaveAttribute('data-active-city', 'concordia');
  for (const city of ['federacion', 'federal', 'concordia']) {
    await page.clock.fastForward(8100);
    await expect(carousel).toHaveAttribute('data-active-city', city);
    await expect(page.locator('[data-city-slide]:visible')).toHaveAttribute(
      'data-city-slide',
      city,
    );
    await expect(page.locator('[data-city-illustration]:visible')).toHaveAttribute(
      'data-city-illustration',
      city,
    );
  }
  await expect(page.locator('[data-city-status]')).toBeEmpty();
  if (!isMobile) {
    await carousel.hover();
    await expect(carousel).toHaveAttribute('data-rotation-state', 'paused');
    await page.clock.fastForward(16000);
    await expect(carousel).toHaveAttribute('data-active-city', 'concordia');
    await page.mouse.move(0, 0);
    await expect(carousel).toHaveAttribute('data-rotation-state', 'playing');
  }
  await page.locator('#contacto').scrollIntoViewIfNeeded();
  await expect(carousel).toHaveAttribute('data-rotation-state', 'paused');
  await page.clock.fastForward(16000);
  await expect(carousel).toHaveAttribute('data-active-city', 'concordia');
});

test('carrusel permite pausar elegir ciudad y reanudar de forma explícita', async ({ page }) => {
  const carousel = page.locator('[data-city-carousel]');
  const rotation = page.locator('[data-city-rotation]');
  await carousel.scrollIntoViewIfNeeded();
  await page.mouse.move(0, 0);
  await rotation.hover();
  await page.mouse.down();
  await expect(rotation).toHaveText('Pausar recorrido');
  await page.mouse.up();
  await expect(rotation).toHaveText('Iniciar recorrido');
  await rotation.click();
  await page.mouse.move(0, 0);
  await expect(carousel).toHaveAttribute('data-rotation-state', 'playing');
  await rotation.click();
  await expect(rotation).toHaveText('Iniciar recorrido');
  await page.clock.fastForward(24000);
  await expect(carousel).toHaveAttribute('data-active-city', 'concordia');
  await carousel.getByRole('button', { name: 'Federación', exact: true }).click();
  await expect(carousel).toHaveAttribute('data-active-city', 'federacion');
  await expect(page.locator('[data-city-illustration]:visible')).toHaveAttribute(
    'data-city-illustration',
    'federacion',
  );
  await expect(page.locator('[data-city-status]')).toHaveText('Federación, 2 de 3');
  // Un gesto cancelado no puede contaminar el siguiente clic de teclado.
  await rotation.hover();
  await page.mouse.down();
  await page.mouse.move(0, 0);
  await page.mouse.up();
  await expect(rotation).toHaveText('Iniciar recorrido');
  await rotation.focus();
  await rotation.press('Enter');
  await page.mouse.move(0, 0);
  await expect(carousel).toHaveAttribute('data-rotation-state', 'playing');
  await page.clock.fastForward(8100);
  await expect(carousel).toHaveAttribute('data-active-city', 'federal');
  const next = page.locator('[data-city-next]');
  await next.focus();
  await expect(carousel).toHaveAttribute('data-rotation-state', 'paused');
  await page.mouse.move(0, 0);
  await page.clock.fastForward(16000);
  await expect(carousel).toHaveAttribute('data-active-city', 'federal');
  await next.press('Enter');
  await expect(carousel).toHaveAttribute('data-active-city', 'concordia');
  await expect(next).toBeFocused();
});

test('carrusel respeta movimiento reducido y ofrece portada útil sin JavaScript', async ({
  page,
  browser,
  baseURL,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const carousel = page.locator('[data-city-carousel]');
  await carousel.scrollIntoViewIfNeeded();
  await expect(carousel).toHaveAttribute('data-rotation-state', 'paused');
  await page.clock.fastForward(24000);
  await expect(carousel).toHaveAttribute('data-active-city', 'concordia');
  await page.locator('[data-city-next]').click();
  await expect(carousel).toHaveAttribute('data-active-city', 'federacion');
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
  try {
    const fallback = await context.newPage();
    await fallback.goto('/');
    await expect(fallback.locator('[data-city-slide]:visible')).toHaveCount(1);
    await expect(fallback.locator('[data-city-slide]:visible')).toHaveAttribute(
      'data-city-slide',
      'concordia',
    );
    await expect(fallback.locator('[data-city-rotation]')).toBeHidden();
    await expect(fallback.locator('[data-city-picker]')).toBeHidden();
    await expect(fallback.getByRole('link', { name: 'Hablemos', exact: true })).toHaveAttribute(
      'href',
      '#contacto',
    );
  } finally {
    await context.close();
  }
});
