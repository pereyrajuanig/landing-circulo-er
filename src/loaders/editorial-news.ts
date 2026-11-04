import { file, type Loader } from 'astro/loaders';
import { editorialRuntimeConfig, EDITORIAL_API_VERSION } from '../../config/editorial.mjs';
import { normalizeEditorialNews } from '../lib/editorial-content.mjs';
const photo =
  '{alt,caption,credit,kind,"url":asset->url,"width":asset->metadata.dimensions.width,"height":asset->metadata.dimensions.height}';
const query =
  '*[_type == "publication" && !(_id in path("drafts.**")) && !(_id in path("versions.**"))]{_id,"id":slug.current,title,summary,category,publishedAt,body,sourceContext,facebookUrl,"coverImage":cover' +
  photo +
  ',"galleryImages":gallery[]' +
  photo +
  '}';
export function editorialNewsLoader(): Loader {
  const config = editorialRuntimeConfig({
    NEWS_SOURCE: import.meta.env.NEWS_SOURCE,
    SANITY_PROJECT_ID: import.meta.env.SANITY_PROJECT_ID,
    SANITY_DATASET: import.meta.env.SANITY_DATASET,
  });
  if (config.source === 'local') return file('src/content/news.json');
  return {
    name: 'circulo-sanity-publications',
    load: async ({ store, parseData, generateDigest, logger }) => {
      const url = new URL(
        'https://' +
          config.projectId +
          '.api.sanity.io/v' +
          EDITORIAL_API_VERSION +
          '/data/query/' +
          config.dataset,
      );
      url.searchParams.set('query', query);
      url.searchParams.set('perspective', 'published');
      const response = await fetch(url, {
        signal: AbortSignal.timeout(20000),
      });
      if (!response.ok)
        throw new Error(
          'No se pudo consultar el contenido editorial (HTTP ' +
            response.status +
            '). Se conserva el despliegue anterior.',
        );
      const payload = await response.json();
      const documents = normalizeEditorialNews(payload.result, config);
      const parsed = await Promise.all(
        documents.map(async (document) => ({
          id: document.id,
          data: await parseData({ id: document.id, data: document }),
        })),
      );
      store.clear();
      for (const { id, data } of parsed) store.set({ id, data, digest: generateDigest(data) });
      logger.info(
        parsed.length + ' publicaciones leídas de Sanity; los borradores permanecen privados.',
      );
    },
  };
}
