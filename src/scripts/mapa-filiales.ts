function initializeMaps() {
  document.querySelectorAll<HTMLElement>('[data-filiales-map]').forEach((map) => {
    if (map.dataset.ready) return;
    map.dataset.ready = 'true';
    const selector = map.querySelector<HTMLSelectElement>('[data-map-select]');
    const title = map.querySelector<HTMLElement>('[data-map-name]');
    const type = map.querySelector<HTMLElement>('[data-map-type]');
    const link = map.querySelector<HTMLAnchorElement>('[data-map-link]');
    const status = map.querySelector<HTMLElement>('[data-map-status]');
    const markers = [...map.querySelectorAll<SVGAElement>('[data-map-location]')];
    if (!selector || !title || !type || !link || !status) return;

    function select(id: string, announce = true) {
      const marker = markers.find((item) => item.dataset.mapLocation === id);
      if (!marker) return;
      markers.forEach((item) => {
        const active = item === marker;
        item.classList.toggle('is-selected', active);
        item.setAttribute('aria-pressed', String(active));
      });
      selector!.value = id;
      title!.textContent = marker.dataset.name!;
      type!.textContent = marker.dataset.type!;
      link!.href = marker.getAttribute('href')!;
      link!.textContent = marker.dataset.linkLabel!;
      if (announce) status!.textContent = marker.dataset.name + ' · ' + marker.dataset.type;
    }

    markers.forEach((marker) => {
      marker.setAttribute('role', 'button');
      marker.setAttribute('aria-pressed', 'false');
      marker.addEventListener('click', (event) => {
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        select(marker.dataset.mapLocation!);
      });
      marker.addEventListener('keydown', (event) => {
        if (event.key === ' ' || event.key === 'Enter') {
          event.preventDefault();
          select(marker.dataset.mapLocation!);
        }
      });
    });
    selector.addEventListener('change', () => select(selector.value));
    map.querySelector<HTMLElement>('[data-map-tools]')!.hidden = false;
    select('parana', false);
  });
}
initializeMaps();
document.addEventListener('astro:page-load', initializeMaps);
