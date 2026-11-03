import test from 'node:test';
import assert from 'node:assert/strict';
import { editorialConfig } from '../config/editorial.mjs';
import { normalizeEditorialNews } from '../src/lib/editorial-content.mjs';
const config = { projectId: 'z8e3tt9r', dataset: 'production' };
const image = {
  url: 'https://cdn.sanity.io/images/z8e3tt9r/production/abc-640x480.jpg',
  width: 640,
  height: 480,
  alt: 'Personas reunidas en la sede',
  credit: 'Archivo del Círculo',
  kind: 'institutional',
};
const document = () => ({
  _id: 'publication-a',
  id: 'noticia-institucional',
  title: 'Noticia institucional',
  summary: 'Información de una publicación institucional.',
  category: 'noticia',
  publishedAt: '2026-11-03T12:00:00Z',
  body: 'Primer párrafo de la publicación.\n\nSegundo párrafo de la publicación.',
  coverImage: { ...image },
  galleryImages: [],
});
test('fuente local explícita y configuración editorial validada', () => {
  assert.equal(editorialConfig({}).source, 'local');
  assert.equal(editorialConfig({ NEWS_SOURCE: 'sanity' }).source, 'sanity');
  assert.throws(() => editorialConfig({ NEWS_SOURCE: 'otro' }));
  assert.throws(() => editorialConfig({ SANITY_PROJECT_ID: '../otro' }));
});
test('publicación válida conserva párrafos y datos de imagen', () => {
  const [item] = normalizeEditorialNews([document()], config);
  assert.equal(item.body.length, 2);
  assert.equal(item.coverImage.alt, image.alt);
  assert.equal(item.status, 'published');
});
test('un dataset vacío queda vacío sin recuperar noticias retiradas', () => {
  assert.deepEqual(normalizeEditorialNews([], config), []);
});
test('borradores y versiones privadas nunca se normalizan como públicas', () => {
  for (const id of [
    'drafts.publication-a',
    'versions.release.publication-a',
    'privado.publication-a',
  ])
    assert.throws(() => normalizeEditorialNews([{ ...document(), _id: id }], config));
});
test('direcciones duplicadas o con segmentos de ruta rechazan el lote', () => {
  assert.throws(() => normalizeEditorialNews([document(), document()], config));
  assert.throws(() => normalizeEditorialNews([{ ...document(), id: '../admin' }], config));
});
test('imágenes externas, credenciales y otros proyectos se rechazan', () => {
  for (const url of [
    'http://cdn.sanity.io/images/z8e3tt9r/production/a.jpg',
    'https://example.com/a.jpg',
    'https://cdn.sanity.io/images/otro/production/a.jpg',
    'https://user:password@cdn.sanity.io/images/z8e3tt9r/production/a.jpg',
  ])
    assert.throws(() =>
      normalizeEditorialNews([{ ...document(), coverImage: { ...image, url } }], config),
    );
});
test('enlaces de Facebook no ejecutables y sin credenciales', () => {
  for (const facebookUrl of [
    'javascript:alert(1)',
    'https://facebook.com.example.org/post',
    'https://user:password@facebook.com/post',
  ])
    assert.throws(() => normalizeEditorialNews([{ ...document(), facebookUrl }], config));
});
test('contenido incompleto no reemplaza silenciosamente una publicación', () => {
  for (const partial of [
    { publishedAt: 'ayer' },
    { coverImage: undefined },
    { body: '' },
    { category: 'otro' },
  ])
    assert.throws(() => normalizeEditorialNews([{ ...document(), ...partial }], config));
});
