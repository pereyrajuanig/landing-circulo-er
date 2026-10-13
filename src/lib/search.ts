export function normalize(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}
export function branchStatus(query: string, count: number): string {
  if (!normalize(query)) return '';
  if (!count) return 'No encontramos esa localidad. Consultá con la sede central.';
  return count + ' ' + (count === 1 ? 'localidad encontrada.' : 'localidades encontradas.');
}
