import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { copyFile, writeFile } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import { getDeployment, SITEMAP_INDEX } from './config/seo.mjs';
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
  image: {
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io', pathname: '/images/**' }],
  },
  server: { host: '127.0.0.1', port: 4173, headers: localHeaders },
  devToolbar: { enabled: false },
  vite: { build: { cssCodeSplit: false } },
  integrations: [
    ...(deployment.indexable
      ? [sitemap({ filter: (page) => !/^\/404(?:\.html|\/)?$/.test(new URL(page).pathname) })]
      : []),
    {
      name: 'landing-robots',
      hooks: {
        'astro:build:done': async ({ dir }) => {
          const sitemapUrl = deployment.site ? new URL(SITEMAP_INDEX, deployment.site) : undefined;
          // Los bots pueden leer el noindex HTML de las previews que tengan acceso.
          await writeFile(
            new URL('robots.txt', dir),
            'User-agent: *\nAllow: /\n' +
              (deployment.indexable && sitemapUrl ? 'Sitemap: ' + sitemapUrl.href + '\n' : ''),
          );
          // Mantener vigente la URL ya enviada a Search Console.
          if (deployment.indexable)
            await copyFile(new URL(SITEMAP_INDEX, dir), new URL('sitemap.xml', dir));
        },
      },
    },
  ],
});
