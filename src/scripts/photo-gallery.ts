document.querySelectorAll<HTMLElement>('[data-photo-gallery]').forEach((gallery) => {
  const links = [...gallery.querySelectorAll<HTMLAnchorElement>('[data-gallery-open]')];
  const dialog = gallery.querySelector<HTMLDialogElement>('dialog');
  const image = gallery.querySelector<HTMLImageElement>('[data-gallery-image]');
  const status = gallery.querySelector<HTMLElement>('[data-gallery-status]');
  const close = gallery.querySelector<HTMLButtonElement>('[data-gallery-close]');
  if (
    !dialog ||
    typeof dialog.showModal !== 'function' ||
    !image ||
    !status ||
    !close ||
    links.length === 0
  )
    return;
  let selected = 0;
  let opener: HTMLAnchorElement | undefined;
  const show = (index: number) => {
    selected = (index + links.length) % links.length;
    const link = links[selected];
    image.src = link.href;
    image.alt = link.dataset.alt ?? '';
    image.width = Number(link.dataset.width) || image.width;
    image.height = Number(link.dataset.height) || image.height;
    const source = gallery.querySelector<HTMLAnchorElement>('[data-gallery-source]');
    const local = gallery.querySelector<HTMLElement>('[data-gallery-local]');
    if (source && local) {
      const href = link.dataset.source;
      source.hidden = !href;
      local.hidden = Boolean(href);
      if (href) source.href = href;
      else source.removeAttribute('href');
      source.textContent = link.dataset.credit ?? '';
      local.textContent = link.dataset.credit ?? '';
    }
    status.textContent = selected + 1 + ' / ' + links.length + ' · ' + (link.dataset.title ?? '');
  };
  links.forEach((link, index) =>
    link.addEventListener('click', (event) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      opener = link;
      show(index);
      dialog.showModal();
      close.focus();
    }),
  );
  close.addEventListener('click', () => dialog.close());
  gallery.querySelector('[data-gallery-prev]')?.addEventListener('click', () => show(selected - 1));
  gallery.querySelector('[data-gallery-next]')?.addEventListener('click', () => show(selected + 1));
  dialog.addEventListener('close', () => opener?.focus({ preventScroll: true }));
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      show(selected + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
});
