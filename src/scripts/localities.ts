document.querySelectorAll<HTMLElement>('[data-localities]').forEach((section) => {
  const track = section.querySelector<HTMLElement>('[data-localities-track]');
  const next = section.querySelector<HTMLButtonElement>('[data-localities-next]');
  if (!track || !next) return;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  next.addEventListener('click', () => {
    const end = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
    track.scrollTo({
      left: end ? 0 : track.scrollLeft + track.clientWidth * 0.75,
      behavior: reducedMotion.matches ? 'instant' : 'smooth',
    });
  });
  const update = () => {
    next.hidden = track.scrollWidth <= track.clientWidth + 2;
  };
  new ResizeObserver(update).observe(track);
  update();
});
