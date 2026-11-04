import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { esESLocale } from '@sanity/locale-es-es';
import { publication } from './schemaTypes/publication';
export default defineConfig({
  name: 'circulo-editorial',
  title: 'Círculo · Panel editorial',
  projectId: 'z8e3tt9r',
  dataset: 'production',
  plugins: [
    esESLocale(),
    structureTool({
      title: 'Publicaciones',
      structure: (S) =>
        S.list()
          .title('Contenido del sitio')
          .items([S.documentTypeListItem('publication').title('Noticias y logros')]),
    }),
  ],
  schema: { types: [publication] },
});
