document.querySelectorAll<HTMLElement>('[data-city-hero]').forEach((hero) => {
  const carousel = hero.querySelector<HTMLElement>('[data-city-carousel]');
  const slides = [...hero.querySelectorAll<HTMLElement>('[data-city-slide]')];
  const art = [...hero.querySelectorAll<HTMLElement>('[data-city-illustration]')];
  const rotation = hero.querySelector<HTMLButtonElement>('[data-city-rotation]');
  const pickers = [...hero.querySelectorAll<HTMLButtonElement>('[data-city-select]')];
  const count = hero.querySelector<HTMLElement>('[data-city-count]');
  const status = hero.querySelector<HTMLElement>('[data-city-status]');
  if (
    !carousel ||
    !rotation ||
    !count ||
    !status ||
    slides.length < 2 ||
    slides.length !== art.length ||
    pickers.length !== slides.length
  )
    return;
  const interval = Math.max(5000, Number(carousel.dataset.cityInterval) || 8000);
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let selected = 0;
  let requested = !reducedMotion.matches;
  let hovered = false;
  let visible = true;
  let timer: number | undefined;
  let pointerAction: 'start' | 'stop' | undefined;

  const render = (index: number, announce: boolean) => {
    selected = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.hidden = i !== selected;
    });
    art.forEach((image, i) => {
      image.hidden = i !== selected;
    });
    pickers.forEach((button, i) => button.setAttribute('aria-disabled', String(i === selected)));
    carousel.dataset.activeCity = slides[selected].dataset.citySlide;
    count.textContent =
      String(selected + 1).padStart(2, '0') + ' / ' + String(slides.length).padStart(2, '0');
    if (announce) status.textContent = slides[selected].getAttribute('aria-label') ?? '';
  };
  const refresh = () => {
    window.clearTimeout(timer);
    const running = requested && !hovered && visible && !document.hidden;
    carousel.dataset.rotationState = running ? 'playing' : 'paused';
    rotation.textContent = requested ? 'Pausar recorrido' : 'Iniciar recorrido';
    if (running)
      timer = window.setTimeout(() => {
        render(selected + 1, false);
        refresh();
      }, interval);
  };
  const manual = (index: number) => {
    requested = false;
    render(index, true);
    refresh();
  };
  rotation.hidden = false;
  hero.querySelectorAll<HTMLElement>('[data-city-controls], [data-city-picker]').forEach((el) => {
    el.hidden = false;
  });
  // Solo estos recursos locales pequeños se anticipan para evitar un cuadro vacío al rotar.
  hero
    .querySelectorAll<HTMLImageElement>('[data-city-slide] img, [data-city-illustration] img')
    .forEach((image) => {
      image.loading = 'eager';
    });
  rotation.addEventListener('pointerdown', () => {
    pointerAction = requested ? 'stop' : 'start';
  });
  rotation.addEventListener('pointercancel', () => {
    pointerAction = undefined;
  });
  rotation.addEventListener('click', () => {
    requested = pointerAction ? pointerAction === 'start' : !requested;
    pointerAction = undefined;
    if (requested) hovered = false;
    refresh();
  });
  hero.querySelector('[data-city-prev]')?.addEventListener('click', () => manual(selected - 1));
  hero.querySelector('[data-city-next]')?.addEventListener('click', () => manual(selected + 1));
  pickers.forEach((button, index) =>
    button.addEventListener('click', () => {
      if (index !== selected) manual(index);
    }),
  );
  carousel.addEventListener('focusin', () => {
    requested = false;
    refresh();
  });
  carousel.addEventListener('mouseenter', () => {
    hovered = true;
    refresh();
  });
  carousel.addEventListener('mouseleave', () => {
    hovered = false;
    refresh();
  });
  carousel.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      manual(selected + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  document.addEventListener('visibilitychange', refresh);
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) requested = false;
    refresh();
  });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? false;
        refresh();
      },
      { threshold: 0.15 },
    ).observe(carousel);
  }
  refresh();
});
