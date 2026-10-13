/** @param {Record<string, string | undefined>} env */
export function getDeployment(env = process.env) {
  const requested = env.SEO_INDEXABLE === 'true';
  const preview = env.VERCEL_ENV === 'preview';
  const raw = env.SITE_URL?.trim();
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
  if (requested && !preview && !site)
    throw new Error('Para indexar se necesita SITE_URL con el dominio aprobado.');
  return { site, indexable: requested && !preview && Boolean(site) };
}
