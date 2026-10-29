import { normalize } from './search.ts';
export interface NewsItem {
  id: string;
  data: {
    title: string;
    summary: string;
    category: 'noticia' | 'logro';
    status: 'draft' | 'published';
    publishedAt: string;
  };
}
export function publishedNews<T extends NewsItem>(items: T[], now = new Date()): T[] {
  for (const item of items)
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.id))
      throw new Error('Identificador de publicación inválido.');
  return items
    .filter(
      ({ data }) =>
        data.status === 'published' && new Date(data.publishedAt).getTime() <= now.getTime(),
    )
    .sort(
      (a, b) =>
        Date.parse(b.data.publishedAt) - Date.parse(a.data.publishedAt) || a.id.localeCompare(b.id),
    );
}
export function matchesNews(
  title: string,
  summary: string,
  category: string,
  query: string,
  selected: string,
) {
  return (
    (selected === 'all' || category === selected) &&
    normalize(title + ' ' + summary).includes(normalize(query))
  );
}
