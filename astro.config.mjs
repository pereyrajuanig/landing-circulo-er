import { defineConfig } from 'astro/config';
import { writeFile } from 'node:fs/promises';
import { getDeployment } from './config/seo.mjs';
const deployment = getDeployment();
export default defineConfig({
  site: deployment.site,
  output: 'static',
  server: { host: '127.0.0.1', port: 4173 },
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
            const site = deployment.site.replaceAll('&', '&amp;');
            await writeFile(
              new URL('sitemap.xml', dir),
              `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${site}</loc></url></urlset>`,
            );
          }
        },
      },
    },
  ],
});
