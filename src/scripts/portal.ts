const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
for (const rail of document.querySelectorAll<HTMLElement>('[data-portal-rail]')) {
  const track = rail.querySelector<HTMLElement>('[data-portal-track]');
  const previous = rail.querySelector<HTMLButtonElement>('[data-portal-prev]');
  const next = rail.querySelector<HTMLButtonElement>('[data-portal-next]');
  const controls = rail.querySelector<HTMLElement>('[data-portal-controls]');
  const counter = rail.querySelector<HTMLElement>('[data-portal-count]');
  if (!track || !previous || !next || !controls) continue;
  const cards = [...track.querySelectorAll<HTMLElement>('[data-portal-card]')];
  const update = () => {
    const max = track.scrollWidth - track.clientWidth;
    controls.hidden = max < 2;
    // Keep controls focusable at the ends; an enabled button cannot lose keyboard focus.
    previous.setAttribute('aria-disabled', String(track.scrollLeft < 2));
    next.setAttribute('aria-disabled', String(track.scrollLeft >= max - 2));
    const edge = track.getBoundingClientRect().left;
    const current = Math.max(
      0,
      cards.findIndex((card) => card.getBoundingClientRect().right > edge + 30),
    );
    if (counter) counter.textContent = current + 1 + ' / ' + cards.length;
  };
  const advance = (direction: number) => {
    const width = cards[0]?.getBoundingClientRect().width ?? track.clientWidth;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 24;
    track.scrollBy({
      left: direction * (width + gap),
      behavior: reducedMotion.matches ? 'instant' : 'smooth',
    });
  };
  previous.addEventListener('click', () => advance(-1));
  next.addEventListener('click', () => advance(1));
  track.addEventListener('scroll', update, { passive: true });
  track.addEventListener('keydown', (event) => {
    if (event.target !== track) return;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      advance(event.key === 'ArrowRight' ? 1 : -1);
    }
    if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      track.scrollTo({ left: event.key === 'Home' ? 0 : track.scrollWidth, behavior: 'instant' });
    }
  });
  new ResizeObserver(update).observe(track);
  update();
}
const form = document.querySelector<HTMLFormElement>('[data-portal-contact]');
if (form?.dataset.email) {
  form.hidden = false;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const subject = 'Consulta web · ' + String(data.get('type'));
    const body =
      'Nombre: ' +
      String(data.get('name')) +
      '\nEmail de contacto: ' +
      String(data.get('email')) +
      '\n\n' +
      String(data.get('message'));
    const uri =
      'mailto:' +
      form.dataset.email +
      '?subject=' +
      encodeURIComponent(subject) +
      '&body=' +
      encodeURIComponent(body);
    window.location.href = uri;
    const status = form.querySelector<HTMLElement>('[data-portal-form-status]');
    if (status)
      status.textContent =
        'Revisá y enviá el borrador en tu aplicación de correo. Si no se abrió, usá el enlace de email de esta página.';
  });
}
