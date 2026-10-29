import { matchesNews } from '../lib/news';
const browser = document.querySelector<HTMLElement>('[data-news-browser]');
if (browser) {
  const search = browser.querySelector<HTMLInputElement>('#news-search');
  const status = browser.querySelector<HTMLElement>('#news-status');
  const empty = browser.querySelector<HTMLElement>('#news-empty');
  const items = [...browser.querySelectorAll<HTMLElement>('[data-news-item]')];
  const filters = [...browser.querySelectorAll<HTMLButtonElement>('button[data-category]')];
  let selected = 'all';
  const update = () => {
    let count = 0;
    for (const item of items) {
      item.hidden = !matchesNews(
        item.dataset.title ?? '',
        item.dataset.summary ?? '',
        item.dataset.category ?? '',
        search?.value ?? '',
        selected,
      );
      if (!item.hidden) count++;
    }
    if (empty) empty.hidden = count > 0;
    if (status)
      status.textContent =
        count === 1 ? '1 publicación encontrada.' : count + ' publicaciones encontradas.';
  };
  search?.addEventListener('input', update);
  filters.forEach((button) =>
    button.addEventListener('click', () => {
      selected = button.dataset.category ?? 'all';
      filters.forEach((filter) => filter.setAttribute('aria-pressed', String(filter === button)));
      update();
    }),
  );
}
