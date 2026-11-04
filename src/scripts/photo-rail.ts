document.querySelectorAll<HTMLElement>('[data-photo-rail]').forEach((rail) => {
  const track = rail.querySelector<HTMLElement>('[data-photo-track]');
  const controls = rail.querySelector<HTMLElement>('[data-photo-controls]');
  const previous = rail.querySelector<HTMLButtonElement>('[data-photo-prev]');
  const next = rail.querySelector<HTMLButtonElement>('[data-photo-next]');
  const counter = rail.querySelector<HTMLElement>('[data-photo-counter]');
  if (!track || !controls || !previous || !next || !counter || track.children.length < 2) return;

  const count = track.children.length;
  const current = () => Math.round(track.scrollLeft / Math.max(1, track.clientWidth));
  const sync = () => {
    const index = Math.min(count - 1, Math.max(0, current()));
    previous.setAttribute('aria-disabled', String(index === 0));
    next.setAttribute('aria-disabled', String(index === count - 1));
    const label = index + 1 + ' / ' + count;
    if (counter.textContent !== label) counter.textContent = label;
  };
  const move = (index: number) => {
    if (index >= 0 && index < count) track.scrollTo({ left: index * track.clientWidth });
  };

  previous.addEventListener('click', () => move(current() - 1));
  next.addEventListener('click', () => move(current() + 1));
  track.addEventListener('scroll', sync, { passive: true });
  track.addEventListener('keydown', (event) => {
    if (event.target !== track) return;
    const destinations: Record<string, number> = {
      ArrowLeft: current() - 1,
      ArrowRight: current() + 1,
      Home: 0,
      End: count - 1,
    };
    const target = destinations[event.key];
    if (target === undefined) return;
    event.preventDefault();
    move(target);
  });
  controls.hidden = false;
  sync();
});
