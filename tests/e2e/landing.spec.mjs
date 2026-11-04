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
    const cancelledImages = new Set();
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
      if (new URL(request.url()).origin !== origin) return;
      const failure = request.failure()?.errorText;
      // Chromium puede cancelar un candidato responsive o una imagen al navegar.
      if (failure === 'net::ERR_ABORTED' && request.resourceType() === 'image')
        cancelledImages.add(request.url());
      else errors.push(request.url() + ': ' + failure);
    });
    // Solo se visita la preview local; las fuentes remotas no condicionan los flujos.
    await page.route('**/*', (route) =>
      new URL(route.request().url()).origin === origin ? route.continue() : route.abort(),
    );
    try {
      await use(page);
    } finally {
      expect(errors, 'Errores de JavaScript o recursos locales').toEqual([]);
      // No ignorar el recurso cancelado: comprobar que existe y se sirve como imagen.
      for (const url of cancelledImages) {
        const response = await page.request.get(url);
        expect(response.status(), 'Imagen cancelada disponible: ' + url).toBe(200);
        expect(response.headers()['content-type']).toMatch(/^image\//);
      }
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

test('salto de teclado y CTA llevan al contenido y a los servicios', async ({ page }) => {
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Ir al contenido', exact: true })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('main')).toBeFocused();
  const cta = page.getByRole('link', { name: 'Conocé nuestros servicios', exact: true });
  await cta.focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#servicios$/);
  await expect(page.locator('#ps-services-title')).toBeInViewport();
});

test('menú y navegación llevan a las páginas del sitio y conservan retorno de foco', async ({
  page,
  isMobile,
}) => {
  const menu = page.locator('.menu-toggle');
  let navigation = page.getByRole('navigation', {
    name: 'Navegación principal',
    includeHidden: true,
  });
  if (isMobile) {
    await menu.focus();
    await menu.press('Enter');
    await expect(menu).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Tab');
    await expect(navigation.getByRole('link', { name: 'Inicio', exact: true })).toBeFocused();
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
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Beneficios y servicios del Círculo',
  );
});

test('filiales reconocen mayúsculas y tildes, informan vacío y conservan la sede', async ({
  page,
}) => {
  const search = page.getByLabel('Encontrá tu localidad', { exact: true });
  const visible = page.locator('#branch-list li:visible > a > span:first-child');
  const status = page.locator('#branch-status');
  await search.fill('  COLON  ');
  await expect(visible).toHaveText(['Colón']);
  await expect(status).toHaveText('1 localidad encontrada.');
  await search.fill('MARIA');
  await expect(visible).toHaveText(['María Grande']);
  await search.fill('zzzz');
  await expect(visible).toHaveCount(0);
  await expect(status).toHaveText('No encontramos esa localidad. Consultá con la sede central.');
  await expect(page.locator('.ps-central')).toBeVisible();
  await search.fill('');
  await expect(visible).toHaveCount(24);
  await expect(status).toBeEmpty();
  await page
    .locator('#branch-list')
    .getByRole('link', { name: /María Grande.*ver ficha/ })
    .click();
  await expect(page).toHaveURL(/\/filiales\/maria-grande\/$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('María Grande');
  await expect(page.locator('[data-photo-key="maria-grande-bano"]')).toBeVisible();
  await page.getByRole('link', { name: 'Ver fotos y detalles del alojamiento' }).click();
  await expect(page).toHaveURL(/\/alojamientos\/maria-grande\/$/);
});

test('alojamientos permiten recorrido manual y cada ficha conserva destino y consulta', async ({
  page,
}) => {
  const rail = page.locator('[data-portal-track]');
  await expect(rail.locator('[data-portal-card]')).toHaveCount(stays.length);
  const next = page.locator('[data-portal-next]');
  await next.click();
  await expect.poll(() => rail.evaluate((e) => e.scrollLeft)).toBeGreaterThan(0);
  await expect(next).toBeFocused();
  await rail.focus();
  await page.keyboard.press('End');
  await expect(next).toHaveAttribute('aria-disabled', 'true');
  await page.keyboard.press('Home');
  await expect(page.locator('[data-portal-prev]')).toHaveAttribute('aria-disabled', 'true');
  for (const stay of stays) {
    await page.goto('/alojamientos/' + stay.id + '/');
    await expect(page.locator('h1')).toHaveText('Alojamiento en ' + stay.name);
    const url = new URL(await page.locator('.ps-booking a').getAttribute('href'));
    expect(url.protocol).toBe('mailto:');
    expect(url.pathname).toBe(institution.email);
    expect(url.searchParams.get('subject')).toBe('Consulta de alojamiento en ' + stay.name);
    expect([...url.searchParams]).toHaveLength(1);
    await expect(page.locator('[data-photo-gallery] [data-gallery-open]').first()).toBeVisible();
  }
});

test('beneficios ofrecen categorías y sus fichas conservan detalles y consulta', async ({
  page,
}) => {
  const services = load('services.json');
  await expect(page.locator('.ps-service')).toHaveCount(services.length);
  for (const service of services) {
    const card = page
      .locator('.ps-service')
      .filter({ has: page.getByRole('heading', { level: 3, name: service.name, exact: true }) });
    await expect(card.locator('h3 a')).toHaveAttribute('href', '/beneficios/' + service.id + '/');
  }
  await page.locator('.ps-service h3 a').first().focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/beneficios\/salud\/$/);
  await expect(page.locator('h1')).toHaveText('Salud y bienestar');
  await expect(page.locator('.service-facts-grid article')).toHaveCount(3);
  await expect(
    page.getByRole('link', { name: 'Consultar atención', exact: false }),
  ).toHaveAttribute('href', /^mailto:/);
  await page.goto('/beneficios/farmacia/');
  const optics = page.locator('[data-photo-key="federacion-beneficio-lentes"]');
  await expect(optics).toBeVisible();
  await expect(optics.locator('img')).toHaveCSS('object-fit', 'contain');
  await page.getByRole('link', { name: 'Federación', exact: true }).click();
  await expect(page).toHaveURL(/\/filiales\/federacion\/$/);
  await expect(page.locator('[data-photo-key="federacion-beneficio-lentes"]')).toBeVisible();
});

test('anclas, correo, Maps y respuesta 404 conservan destinos válidos', async ({
  page,
  request,
}) => {
  for (const link of await page.locator('a[href^="#"]').all()) {
    const href = await link.getAttribute('href');
    await expect(page.locator('[id="' + href.slice(1) + '"]')).toHaveCount(1);
  }
  await page.getByRole('link', { name: 'Nuestra institución', exact: true }).click();
  await expect(page).toHaveURL(/#institucion$/);
  await expect(page.locator('#contacto .ps-email')).toHaveAttribute(
    'href',
    'mailto:' + institution.email,
  );
  const map = page.getByRole('link', { name: 'Cómo llegar', exact: false });
  await expect(map).toHaveAttribute('href', institution.mapUrl);
  await expect(map).toHaveAttribute('target', '_blank');
  await expect(map).toHaveAttribute('rel', /noopener/);
  expect((await request.get('/ruta-inexistente-etapa04')).status()).toBe(404);
});

test('cambios de tamaño y menú bajo mantienen foco utilizable sin desborde', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  const nav = page.locator('#navigation');
  const benefit = nav.getByRole('link', { name: 'Beneficios', exact: true });
  const menu = page.locator('.menu-toggle');
  await benefit.focus();
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(menu).toBeFocused();
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(nav.getByRole('link', { name: 'Inicio', exact: true })).toBeFocused();
  await page.setViewportSize({ width: 640, height: 360 });
  await menu.press('Enter');
  const contact = nav.getByRole('link', { name: 'Contacto', exact: true });
  await contact.focus();
  await expect
    .poll(async () => {
      const r = await contact.boundingBox();
      return r.y >= 0 && r.y + r.height <= 360;
    })
    .toBe(true);
  await page.keyboard.press('Escape');
  await expect(menu).toBeFocused();
  await page.setViewportSize({ width: 320, height: 800 });
  await page.locator('#branch-search').fill('MARIA');
  await expect(page.locator('#branch-list li:visible > a > span:first-child')).toHaveText([
    'María Grande',
  ]);
  for (const route of [
    '/',
    '/beneficios/',
    '/alojamientos/',
    '/salones/',
    '/institucion/',
    '/filiales/federacion/',
    '/beneficios/farmacia/',
    '/novedades/',
    '/contacto/',
  ]) {
    await page.goto(route);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= document.documentElement.clientWidth,
      ),
      route,
    ).toBe(true);
  }
});

test('404 ofrece un regreso por teclado sin desborde', async ({ page }, testInfo) => {
  const response = await page.goto('/pagina-inexistente');
  expect(response.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('No encontramos esta página');
  await expect
    .poll(() =>
      page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      ),
    )
    .toBeLessThanOrEqual(0);
  // Esperar la foto lazy antes de navegar evita cancelar su descarga en CI.
  await expect
    .poll(() =>
      page
        .locator('.not-found [data-site-photo] img')
        .evaluate((image) => image.complete && image.naturalWidth > 0),
    )
    .toBe(true);
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
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Al servicio de nuestros');
});

test('recursos locales y consultas no crean almacenamiento de aplicación', async ({
  page,
  context,
}) => {
  await page.locator('#branch-search').fill('MARIA');
  await page.locator('[data-portal-next]').click();
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
  const paths = page.getByRole('navigation', { name: 'Accesos a servicios' });
  await expect(paths.locator('a')).toHaveCount(4);
  await expect(page.locator('.ps-audience')).toContainText('una pensión vinculada a ella');
  await paths.getByRole('link', { name: 'Salones para eventos', exact: true }).click();
  await expect(page).toHaveURL(/\/salones\/$/);
  const space = page.locator('#los-laureles');
  const url = new URL(
    await space
      .getByRole('link', { name: 'Consultar disponibilidad', exact: false })
      .getAttribute('href'),
  );
  expect(url.protocol).toBe('mailto:');
  expect(url.pathname).toBe(institution.email);
  expect(url.searchParams.get('subject')).toBe('Consulta sobre Los Laureles en Paraná');
  await page.goto('/contacto/');
  expect(await page.locator('#contacto').innerText()).not.toContain('cómo formar parte');
});

test('las fichas y preguntas frecuentes permiten explorar el sitio sin reservar', async ({
  page,
}) => {
  await page
    .getByRole('navigation', { name: 'Accesos a servicios' })
    .getByRole('link', { name: 'Alojamiento y turismo', exact: true })
    .click();
  await expect(page).toHaveURL(/\/alojamientos\/$/);
  await page
    .locator('.ps-destination-nav')
    .getByRole('link', { name: 'Nogoyá', exact: false })
    .click();
  await expect(page).toHaveURL(/\/alojamientos\/nogoya\/$/);
  await page.getByText('¿Puedo reservar desde esta página?', { exact: true }).press('Enter');
  await expect(
    page.getByText('Podés preparar una consulta por correo desde esta página.', { exact: false }),
  ).toBeVisible();
  const url = new URL(await page.locator('.ps-booking a').getAttribute('href'));
  expect(url.searchParams.get('subject')).toBe('Consulta de alojamiento en Nogoyá');
  await page
    .getByRole('navigation', { name: 'Explorar el sitio' })
    .getByRole('link', { name: 'Beneficios', exact: true })
    .click();
  await page
    .getByRole('heading', { level: 3, name: 'Farmacia y beneficios', exact: true })
    .getByRole('link')
    .click();
  await expect(page).toHaveURL(/\/beneficios\/farmacia\/$/);
  await expect(page.locator('h1')).toHaveText('Farmacia y beneficios');
});

test('galería institucional permite ampliar cambiar imagen y devolver el foco', async ({
  page,
}) => {
  await page.goto('/alojamientos/maria-grande/');
  const gallery = page.locator('[data-photo-gallery]');
  await expect(gallery).toContainText('Conocé los espacios del alojamiento.');
  const openers = gallery.locator('[data-gallery-open]');
  await expect(openers).toHaveCount(3);
  const rail = gallery.getByRole('group', { name: 'Fotos del carrusel' });
  const counter = gallery.locator('[data-photo-counter]');
  await expect(counter).toHaveText('1 / 3');
  await gallery.getByRole('button', { name: 'Ver foto siguiente' }).click();
  await expect(counter).toHaveText('2 / 3');
  await rail.focus();
  await rail.press('End');
  await expect(counter).toHaveText('3 / 3');
  await expect(gallery.getByRole('button', { name: 'Ver foto siguiente' })).toHaveAttribute(
    'aria-disabled',
    'true',
  );
  await rail.press('Home');
  await expect(counter).toHaveText('1 / 3');
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
  await expect(dialog.getByRole('status')).toHaveText('2 / 3 · María Grande · comedor');
  await expect(dialog.locator('[data-gallery-image]')).toHaveAttribute(
    'src',
    await openers.nth(1).evaluate((element) => element.href),
  );
  await expect(dialog.locator('[data-gallery-local]')).toContainText('Foto del Círculo');
  await expect(dialog.locator('[data-gallery-source]')).toBeHidden();
  await page.keyboard.press('ArrowLeft');
  await expect(dialog.getByRole('status')).toHaveText('1 / 3 · María Grande · habitación');
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
  await page.goto('/alojamientos/federacion/');
  await page.locator('[data-gallery-open]').click();
  const dialog = page.getByRole('dialog', { name: 'Galería de alojamiento', exact: true });
  await expect(dialog.getByRole('button', { name: 'Imagen siguiente', exact: true })).toHaveCount(
    0,
  );
  await expect(dialog.getByRole('status')).toHaveText('1 / 1 · Federación · alojamiento');
  await page.keyboard.press('Escape');
  await expect(page.locator('[data-gallery-open]')).toBeFocused();
  await page.goto('/alojamientos/nogoya/');
  await expect(page.locator('[data-photo-gallery]')).toContainText('Estas fotos son ilustrativas');
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
    'Federación hizo mejoras en el salón de la filial',
  );
  await expect(page.locator('.source-context')).toContainText('es la de publicación');
  await expect(page.locator('.article-gallery [data-photo-kind="institutional"]')).toHaveCount(1);
  await page.goto('/novedades/');
  await page.getByRole('button', { name: 'Noticias', exact: true }).click();
  await expect(items).toHaveCount(0);
  await expect(page.locator('#news-empty')).toBeVisible();
  await page.goto('/salones/');
  await expect(page.locator('#los-laureles')).toContainText('30 y 50 personas');
  await expect(page.locator('#las-rosas')).toContainText('170 personas');
  const roses = page.locator('#las-rosas');
  await expect(roses.locator('[data-photo-counter]')).toHaveText('1 / 8');
  await roses.getByRole('button', { name: 'Ver foto siguiente' }).click();
  await expect(roses.locator('[data-photo-counter]')).toHaveText('2 / 8');
  await expect(page.locator('#los-laureles [data-photo-counter]')).toHaveText('1 / 6');
  await expect(page.locator('#diamante [data-photo-key="diamante-salon-interior"]')).toHaveCount(1);
});

test('carrusel avanza automáticamente y mantiene el mensaje con cada ilustración', async ({
  page,
  isMobile,
}) => {
  const carousel = page.locator('[data-city-carousel]');
  await carousel.scrollIntoViewIfNeeded();
  await page.mouse.move(0, 0);
  await expect(carousel).toHaveAttribute('data-rotation-state', 'playing');
  await expect(carousel).toHaveAttribute('data-active-city', 'diamante');
  for (const city of ['concordia', 'concepcion-del-uruguay', 'colon', 'diamante']) {
    await page.clock.fastForward(3000);
    await expect(carousel).toHaveAttribute('data-active-city', city);
    await expect(page.locator('[data-city-slide]:visible')).toHaveAttribute(
      'data-city-illustration',
      city,
    );
    await expect(page.locator('#hero-title')).toContainText('retirados y pensionados.');
  }
  if (!isMobile) {
    await carousel.hover();
    await expect(carousel).toHaveAttribute('data-rotation-state', 'playing');
  }
  await expect(page.locator('[data-city-next], [data-city-prev], [data-city-select]')).toHaveCount(
    0,
  );
  await page.locator('#contacto').scrollIntoViewIfNeeded();
  await expect(carousel).toHaveAttribute('data-rotation-state', 'paused');
  await page.clock.fastForward(16000);
  await expect(carousel).toHaveAttribute('data-active-city', 'diamante');
});

test('carrusel ofrece pausa y reanudación de teclado sin selectores', async ({ page }) => {
  const carousel = page.locator('[data-city-carousel]');
  const rotation = page.locator('[data-city-rotation]');
  await carousel.scrollIntoViewIfNeeded();
  await page.mouse.move(0, 0);
  await rotation.focus();
  await expect(carousel).toHaveAttribute('data-rotation-state', 'paused');
  await expect(rotation).toHaveText('Iniciar recorrido');
  await page.clock.fastForward(24000);
  await expect(carousel).toHaveAttribute('data-active-city', 'diamante');
  await rotation.press('Enter');
  await page.mouse.move(0, 0);
  await expect(carousel).toHaveAttribute('data-rotation-state', 'playing');
  await page.clock.fastForward(3000);
  await expect(carousel).toHaveAttribute('data-active-city', 'concordia');
  await rotation.press('Enter');
  await expect(carousel).toHaveAttribute('data-rotation-state', 'paused');
  await page.clock.fastForward(16000);
  await expect(carousel).toHaveAttribute('data-active-city', 'concordia');
});

test('carrusel alterna imágenes estáticas con movimiento reducido y conserva respaldo sin JavaScript', async ({
  page,
  browser,
  baseURL,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const carousel = page.locator('[data-city-carousel]');
  await carousel.scrollIntoViewIfNeeded();
  await expect(carousel).toHaveAttribute('data-rotation-state', 'playing');
  await expect(carousel).toHaveAttribute('data-active-city', 'diamante');
  await page.clock.fastForward(3000);
  await expect(carousel).toHaveAttribute('data-active-city', 'concordia');
  const rotation = page.locator('[data-city-rotation]');
  await rotation.focus();
  await expect(carousel).toHaveAttribute('data-rotation-state', 'paused');
  await page.clock.fastForward(9000);
  await expect(carousel).toHaveAttribute('data-active-city', 'concordia');
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
  try {
    const fallback = await context.newPage();
    await fallback.goto('/');
    await expect(fallback.locator('[data-city-slide]:visible')).toHaveCount(1);
    await expect(fallback.locator('[data-city-slide]:visible')).toHaveAttribute(
      'data-city-slide',
      'diamante',
    );
    await expect(fallback.locator('[data-city-rotation]')).toBeHidden();
    await expect(
      fallback.getByRole('link', { name: 'Conocé nuestros servicios', exact: true }),
    ).toHaveAttribute('href', '#servicios');
    await expect(fallback.locator('[data-portal-card]')).toHaveCount(8);
    await fallback.goto('/contacto/');
    await expect(fallback.locator('form')).toBeHidden();
    await expect(fallback.locator('noscript a')).toHaveAttribute(
      'href',
      'mailto:' + institution.email,
    );
  } finally {
    await context.close();
  }
});

test('contacto valida campos y prepara un borrador sin enviar ni guardar consultas', async ({
  page,
  context,
}) => {
  await page.goto('/contacto/');
  const form = page.locator('[data-portal-contact]');
  await expect(form).toBeVisible();
  expect(await form.evaluate((e) => e.checkValidity())).toBe(false);
  await page.getByLabel('Nombre', { exact: true }).fill('Revisión local');
  await page.getByLabel('Correo electrónico', { exact: true }).fill('revision@example.com');
  await page.getByLabel('Tipo de consulta', { exact: true }).selectOption({ label: 'Alojamiento' });
  await page.getByLabel('Mensaje', { exact: true }).fill('Consulta de prueba & familia');
  expect(await form.evaluate((e) => e.checkValidity())).toBe(true);
  // Browser-local activation: no application handles mailto in this isolated context.
  const protocols = [];
  page.on('request', (r) => {
    if (r.url().startsWith('mailto:')) protocols.push(r.url());
  });
  await form.getByRole('button', { name: 'Abrir consulta en mi correo', exact: false }).click();
  await expect(page.locator('[data-portal-form-status]')).toContainText(
    'Revisá y enviá el borrador',
  );
  await expect(page).toHaveURL(/\/contacto\/$/);
  expect(await context.cookies()).toEqual([]);
  expect(await page.evaluate(() => Object.keys(localStorage))).toEqual([]);
  expect(await page.locator('#consult-message').inputValue()).toBe('Consulta de prueba & familia');
});

test('la publicación muestra solo el diseño vigente y no conserva la ruta anterior', async ({
  page,
  request,
}) => {
  await expect(page.getByRole('navigation', { name: 'Comparar diseños' })).toHaveCount(0);
  await expect(page.locator('a[href="/diseno-anterior/"]')).toHaveCount(0);
  expect((await request.get('/diseno-anterior/')).status()).toBe(404);
  await expect(page.locator('h1')).toContainText('Al servicio de nuestros');
});
