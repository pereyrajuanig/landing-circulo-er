document.querySelectorAll<HTMLElement>('[data-city-hero]').forEach((hero) => {
  const carousel = hero.querySelector<HTMLElement>('[data-city-carousel]');
  const slides = [...hero.querySelectorAll<HTMLElement>('[data-city-slide]')];
  const art = [...hero.querySelectorAll<HTMLElement>('[data-city-illustration]')];
  const rotation = hero.querySelector<HTMLButtonElement>('[data-city-rotation]');
  if (!carousel || !rotation || slides.length < 2 || slides.length !== art.length) return;
  const interval = Math.max(3000, Number(carousel.dataset.cityInterval) || 3000);
  let selected = 0;
  // Alternar imágenes estáticas no requiere efectos de movimiento.
  let requested = true;
  let visible = true;
  let timer: number | undefined;
  let pointerAction: 'start' | 'stop' | undefined;

  const render = (index: number) => {
    selected = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.hidden = i !== selected;
    });
    art.forEach((image, i) => {
      image.hidden = i !== selected;
    });
    carousel.dataset.activeCity = slides[selected].dataset.citySlide;
  };
  const refresh = () => {
    window.clearTimeout(timer);
    const running = requested && visible && !document.hidden;
    carousel.dataset.rotationState = running ? 'playing' : 'paused';
    // Conservar la etiqueta durante el gesto evita mover el botón antes de soltarlo.
    const labelPlaying = pointerAction ? pointerAction === 'stop' : requested;
    rotation.textContent = labelPlaying ? 'Pausar recorrido' : 'Iniciar recorrido';
    if (running)
      timer = window.setTimeout(() => {
        render(selected + 1);
        refresh();
      }, interval);
  };
  rotation.hidden = false;
  // Solo estos recursos locales pequeños se anticipan para evitar un cuadro vacío al rotar.
  hero
    .querySelectorAll<HTMLImageElement>('[data-city-slide] img, [data-city-illustration] img')
    .forEach((image) => {
      image.loading = 'eager';
    });
  rotation.addEventListener('pointerdown', () => {
    pointerAction = requested ? 'stop' : 'start';
  });
  const cancelPointer = () => {
    pointerAction = undefined;
    refresh();
  };
  rotation.addEventListener('pointercancel', cancelPointer);
  document.addEventListener('pointerup', (event) => {
    if (pointerAction && event.target instanceof Node && !rotation.contains(event.target))
      cancelPointer();
  });
  rotation.addEventListener('click', (event) => {
    // Teclado y tecnologías de apoyo no heredan una intención de puntero anterior.
    requested = event.detail > 0 && pointerAction ? pointerAction === 'start' : !requested;
    pointerAction = undefined;
    refresh();
  });
  carousel.addEventListener('focusin', () => {
    requested = false;
    refresh();
  });
  document.addEventListener('visibilitychange', refresh);
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
