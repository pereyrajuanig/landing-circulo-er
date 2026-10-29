import { defineConfig } from 'astro/config';
import { writeFile, readdir } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import { getDeployment } from './config/seo.mjs';
const deployment = getDeployment();
const config = JSON.parse(readFileSync(new URL('./vercel.json', import.meta.url), 'utf8'));
const localHeaders = Object.fromEntries(
  config.headers[0].headers.map(({ key, value }) => [key, value]),
);
// Solo para pruebas locales: verificar compatibilidad en modo exigido, sin cambiar Vercel.
if (process.env.TEST_CSP_ENFORCE === 'true') {
  localHeaders['Content-Security-Policy'] = localHeaders['Content-Security-Policy-Report-Only'];
  delete localHeaders['Content-Security-Policy-Report-Only'];
}
export default defineConfig({
  site: deployment.site,
  output: 'static',
  server: { host: '127.0.0.1', port: 4173, headers: localHeaders },
  devToolbar: { enabled: false },
  vite: { build: { cssCodeSplit: false } },
  integrations: [
    {
      name: 'landing-seo',
      hooks: {
        'astro:build:done': async ({ dir }) => {
          // Permitir rastreo para que los robots puedan leer noindex en las previews.
          await writeFile(
            new URL('robots.txt', dir),
            'User-agent: *\nAllow: /\n' +
              (deployment.indexable ? `Sitemap: ${deployment.site}sitemap.xml\n` : ''),
          );
          if (deployment.indexable) {
            const walk = async (directory, prefix = '') => {
              const entries = await readdir(directory, { withFileTypes: true });
              const nested = await Promise.all(
                entries.map((entry) =>
                  entry.isDirectory()
                    ? walk(new URL(entry.name + '/', directory), prefix + entry.name + '/')
                    : [prefix + entry.name],
                ),
              );
              return nested.flat();
            };
            const paths = (await walk(dir)).filter((file) => file.endsWith('index.html')).sort();
            const urls = paths.map((file) =>
              new URL(file.replace(/index\.html$/, ''), deployment.site).href.replaceAll(
                '&',
                '&amp;',
              ),
            );
            await writeFile(
              new URL('sitemap.xml', dir),
              `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((url) => '<url><loc>' + url + '</loc></url>').join('')}</urlset>`,
            );
          }
        },
      },
    },
  ],
});
