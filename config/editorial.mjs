export const EDITORIAL_PROJECT_ID = 'z8e3tt9r';
export const EDITORIAL_DATASET = 'production';
export const EDITORIAL_API_VERSION = '2026-11-03';
/** @param {Record<string, string | undefined>} env */
export function editorialConfig(env = process.env) {
  const source = env.NEWS_SOURCE?.trim() || 'local';
  if (source !== 'local' && source !== 'sanity')
    throw new Error('NEWS_SOURCE debe ser local o sanity.');
  const projectId = env.SANITY_PROJECT_ID?.trim() || EDITORIAL_PROJECT_ID;
  const dataset = env.SANITY_DATASET?.trim() || EDITORIAL_DATASET;
  if (!/^[a-z0-9]{5,32}$/.test(projectId) || !/^[a-z0-9_-]{1,64}$/.test(dataset))
    throw new Error('Configuración editorial inválida.');
  return { source, projectId, dataset };
}

/** @param {Record<string, string | undefined>} viteEnv */
export function editorialRuntimeConfig(viteEnv) {
  return editorialConfig({ ...viteEnv, ...process.env });
}
