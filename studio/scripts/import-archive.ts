import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { getCliClient } from 'sanity/cli';
const root = resolve(process.cwd(), '..');
const client = getCliClient({ apiVersion: '2026-11-03' });
if (client.config().projectId !== 'z8e3tt9r' || client.config().dataset !== 'production')
  throw new Error('Proyecto de importación incorrecto.');
interface ArchivePhoto {
  key: string;
  file: string;
  alt: string;
  caption: string;
  credit: string;
  kind: string;
  sha256: string;
}
interface ArchiveNews {
  id: string;
  title: string;
  summary: string;
  category: string;
  publishedAt: string;
  body: string[];
  cover: string;
  gallery: string[];
  sourceContext: string;
}
const photos = JSON.parse(
  readFileSync(resolve(root, 'studio/archive-images.json'), 'utf8'),
) as ArchivePhoto[];
const news = JSON.parse(
  readFileSync(resolve(root, 'src/content/news.json'), 'utf8'),
) as ArchiveNews[];
const ids = news.map((item) => 'archive-' + item.id);
const existing = await client.getDocuments(ids);
const pending = news.filter((_, index) => !existing[index]);
console.log(
  pending.length +
    ' publicaciones pendientes; ' +
    photos.length +
    ' fotografías del archivo verificables.',
);
if (!process.argv.includes('--apply')) {
  console.log('Solo revisión. Para importar: npm run import:archive -- -- --apply');
} else {
  const uploaded = new Map<string, string>();
  const image = async (key: string, index: number) => {
    const photo = photos.find((photo) => photo.key === key);
    if (!photo || !/^src\/assets\/institutional\/[a-z0-9-]+\.jpg$/.test(photo.file))
      throw new Error('Fotografía de archivo inválida.');
    let assetId = uploaded.get(key);
    if (!assetId) {
      const bytes = readFileSync(resolve(root, photo.file));
      if (createHash('sha256').update(bytes).digest('hex') !== photo.sha256)
        throw new Error('La fotografía cambió; revisar el manifiesto.');
      const asset = await client.assets.upload('image', bytes, { filename: key + '.jpg' });
      assetId = asset._id;
      uploaded.set(key, assetId);
    }
    return {
      _type: 'image',
      _key: 'archivo-' + index,
      asset: { _type: 'reference', _ref: assetId },
      alt: photo.alt,
      caption: photo.caption,
      credit: photo.credit,
      kind: photo.kind,
    };
  };
  for (const item of pending) {
    const cover = await image(item.cover, 0);
    const gallery = await Promise.all(item.gallery.map((key, index) => image(key, index + 1)));
    await client.createIfNotExists({
      _id: 'archive-' + item.id,
      _type: 'publication',
      title: item.title,
      slug: { _type: 'slug', current: item.id },
      summary: item.summary,
      category: item.category,
      publishedAt: item.publishedAt,
      body: item.body.join('\n\n'),
      cover,
      gallery,
      sourceContext: item.sourceContext,
    });
    console.log('Importada: ' + item.id);
  }
}
