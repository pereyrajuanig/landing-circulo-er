const home = document.querySelector<HTMLElement>('.home-revision-body');
if (home) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const animations = new Set<Animation>();
  const track = (animation: Animation) => {
    animations.add(animation);
    animation.addEventListener('finish', () => animations.delete(animation), { once: true });
    animation.addEventListener('cancel', () => animations.delete(animation), { once: true });
    return animation;
  };

  if ('IntersectionObserver' in window) {
    const reveal = new IntersectionObserver(
      (entries) => {
        for (const { target, isIntersecting } of entries) {
          if (!isIntersecting) continue;
          reveal.unobserve(target);
          if (reducedMotion.matches) continue;
          track(
            target.animate(
              [
                { opacity: 0.6, transform: 'perspective(1400px) translateY(32px) rotateX(2deg)' },
                { opacity: 1, transform: 'none' },
              ],
              { duration: 850, easing: 'cubic-bezier(0.16, 0.65, 0.24, 1)' },
            ),
          );
        }
      },
      { threshold: 0.05 },
    );
    home
      .querySelectorAll(':scope > section > .ps-wrap')
      .forEach((element) => reveal.observe(element));
  }

  const depthElements = home.querySelectorAll<HTMLElement>(
    '[data-home-depth], .optical-visual, .health-photos, .community-photo, .guidance-photo, .home-stays .ps-stay-photos, .home-spaces .ps-space-visual',
  );
  for (const element of depthElements) {
    element.dataset.homeDepth = '';
    let bounds: DOMRect | undefined;
    let frame: number | undefined;
    let tilt: Animation | undefined;
    let baseTransform = '';
    const move = (transform: string, duration: number) => {
      const current = getComputedStyle(element).transform;
      tilt?.cancel();
      tilt = track(
        element.animate([{ transform: current }, { transform }], {
          duration,
          easing: 'cubic-bezier(0.2, 0.7, 0.3, 1)',
          fill: 'forwards',
        }),
      );
    };
    element.addEventListener('pointerenter', () => {
      if (reducedMotion.matches || !finePointer.matches) return;
      tilt?.cancel();
      bounds = element.getBoundingClientRect();
      baseTransform = getComputedStyle(element).transform;
    });
    element.addEventListener('pointermove', (event) => {
      if (reducedMotion.matches || !finePointer.matches || !bounds) return;
      if (frame !== undefined) window.cancelAnimationFrame(frame);
      const x = Math.max(-0.5, Math.min(0.5, (event.clientX - bounds.left) / bounds.width - 0.5));
      const y = Math.max(-0.5, Math.min(0.5, (event.clientY - bounds.top) / bounds.height - 0.5));
      frame = window.requestAnimationFrame(() => {
        frame = undefined;
        move(`perspective(1000px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) translateZ(8px)`, 220);
        element.dataset.depthActive = 'true';
      });
    });
    const reset = () => {
      if (frame !== undefined) window.cancelAnimationFrame(frame);
      frame = undefined;
      bounds = undefined;
      delete element.dataset.depthActive;
      if (tilt && !reducedMotion.matches) move(baseTransform || 'none', 450);
      else tilt?.cancel();
    };
    element.addEventListener('pointerleave', reset);
    element.addEventListener('pointercancel', reset);
    reducedMotion.addEventListener('change', reset);
    finePointer.addEventListener('change', reset);
  }
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) {
      for (const animation of animations) animation.cancel();
    }
  });
}
