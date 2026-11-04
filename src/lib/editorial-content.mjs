/** @param {unknown} value @param {string} label @param {number} max */
function required(value, label, max) {
  if (typeof value !== 'string' || !value.trim() || value.length > max)
    throw new Error('Campo editorial inválido: ' + label);
  return value.trim();
}
/** @param {unknown} value @returns {Record<string, unknown>} */
function record(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value))
    throw new Error('Contenido editorial inválido.');
  return /** @type {Record<string,unknown>} */ (value);
}
/** @param {unknown} value @param {{projectId:string,dataset:string}} config */
export function normalizeEditorialImage(value, config) {
  const image = record(value);
  const url = new URL(required(image.url, 'URL de imagen', 2000));
  if (
    url.origin !== 'https://cdn.sanity.io' ||
    !url.pathname.startsWith('/images/' + config.projectId + '/' + config.dataset + '/') ||
    url.search ||
    url.hash ||
    url.username ||
    url.password
  )
    throw new Error('Fotografía fuera del proyecto editorial.');
  const width = Number(image.width),
    height = Number(image.height);
  if (
    !Number.isInteger(width) ||
    !Number.isInteger(height) ||
    width < 1 ||
    height < 1 ||
    width > 16000 ||
    height > 16000
  )
    throw new Error('Dimensiones de fotografía inválidas.');
  const kind = image.kind || 'institutional';
  if (kind !== 'institutional' && kind !== 'reference')
    throw new Error('Procedencia de fotografía inválida.');
  const caption = typeof image.caption === 'string' ? image.caption.trim() : '';
  if (caption.length > 350) throw new Error('Pie de foto demasiado largo.');
  return {
    url: url.href,
    width,
    height,
    kind,
    alt: required(image.alt, 'descripción de imagen', 250),
    credit: required(image.credit, 'crédito de imagen', 150),
    caption,
  };
}
/** @param {unknown} value @param {{projectId:string,dataset:string}} config */
export function normalizeEditorialNews(value, config) {
  if (!Array.isArray(value)) throw new Error('Respuesta editorial inválida.');
  const used = new Set();
  return value.map((value) => {
    const doc = record(value);
    if (typeof doc._id !== 'string' || doc._id.includes('.'))
      throw new Error('El contenido privado no puede publicarse.');
    const id = required(doc.id, 'dirección', 100);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id) || used.has(id))
      throw new Error('Dirección editorial inválida o duplicada.');
    used.add(id);
    const category = doc.category;
    if (category !== 'noticia' && category !== 'logro')
      throw new Error('Categoría editorial inválida.');
    const publishedAt = required(doc.publishedAt, 'fecha', 100);
    if (!Number.isFinite(Date.parse(publishedAt)) || !/(?:Z|[+-]\d{2}:\d{2})$/.test(publishedAt))
      throw new Error('Fecha editorial inválida.');
    const body = required(doc.body, 'texto', 30000)
      .split(/\n\s*\n/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);
    let facebookUrl;
    if (doc.facebookUrl) {
      const url = new URL(required(doc.facebookUrl, 'Facebook', 2000));
      if (
        url.protocol !== 'https:' ||
        !['facebook.com', 'www.facebook.com', 'm.facebook.com'].includes(url.hostname) ||
        url.username ||
        url.password
      )
        throw new Error('Enlace de Facebook inválido.');
      facebookUrl = url.href;
    }
    const gallery = doc.galleryImages ?? [];
    if (!Array.isArray(gallery) || gallery.length > 12)
      throw new Error('Galería editorial inválida.');
    const sourceContext = doc.sourceContext
      ? required(doc.sourceContext, 'aclaración', 1500)
      : undefined;
    return {
      id,
      title: required(doc.title, 'título', 140),
      summary: required(doc.summary, 'resumen', 350),
      category,
      status: 'published',
      publishedAt,
      body,
      coverImage: normalizeEditorialImage(doc.coverImage, config),
      galleryImages: gallery.map((image) => normalizeEditorialImage(image, config)),
      gallery: [],
      sourceContext,
      facebookUrl,
    };
  });
}
