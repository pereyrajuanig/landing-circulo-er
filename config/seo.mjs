export const PRODUCTION_SITE = 'https://www.circulopoliciaer.com.ar/';
export const SITEMAP_INDEX = 'sitemap-index.xml';

/** @param {Record<string, string | undefined>} env */
export function getDeployment(env = process.env) {
  const requested = env.SEO_INDEXABLE === 'true';
  const production = env.VERCEL_ENV === 'production';
  const nonProduction = Boolean(env.VERCEL_ENV && !production);
  const raw = env.SITE_URL?.trim() || (production ? PRODUCTION_SITE : undefined);
  let site;
  if (raw) {
    const url = new URL(raw);
    if (
      url.protocol !== 'https:' ||
      url.username ||
      url.password ||
      url.pathname !== '/' ||
      url.search ||
      url.hash ||
      url.hostname === 'localhost' ||
      /^127\./.test(url.hostname)
    )
      throw new Error(
        'SITE_URL debe ser el origen HTTPS del dominio aprobado, sin ruta ni credenciales.',
      );
    site = url.origin + '/';
  }
  if (production && site !== PRODUCTION_SITE)
    throw new Error('SITE_URL en Vercel Production debe ser ' + PRODUCTION_SITE);
  if (requested && !nonProduction && !site)
    throw new Error('Para indexar se necesita SITE_URL con el dominio aprobado.');
  return { site, indexable: requested && !nonProduction && Boolean(site) };
}
