import { normalize, branchStatus } from '../lib/search';
import { mailTo } from '../lib/contact';
import type { CollectionEntry } from 'astro:content';

const menuButton = document.querySelector<HTMLButtonElement>('.menu-toggle');
const navigation = document.querySelector<HTMLElement>('#navigation');
if (menuButton && navigation) {
  const closeMenu = () => {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  };
  menuButton.addEventListener('click', () =>
    menuButton.setAttribute('aria-expanded', String(navigation.classList.toggle('open'))),
  );
  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      const wasOpen = navigation.classList.contains('open');
      closeMenu();
      if (wasOpen) {
        const section = document.getElementById(link.hash.slice(1));
        const destination = section?.querySelector<HTMLElement>('h2') ?? section;
        if (destination) {
          destination.tabIndex = -1;
          // Esperar la navegación nativa del ancla antes de transferir el foco.
          requestAnimationFrame(() => destination.focus({ preventScroll: true }));
        }
      }
    });
  });
  const header = menuButton.closest('header');
  header?.addEventListener('focusout', (event) => {
    if (event.relatedTarget instanceof Node && !header.contains(event.relatedTarget)) closeMenu();
  });
  const mobileMenu = window.matchMedia('(max-width: 800px)');
  navigation.addEventListener('focusout', (event) => {
    if (
      event.relatedTarget === null &&
      mobileMenu.matches &&
      getComputedStyle(navigation).display === 'none'
    )
      menuButton.focus();
  });
  menuButton.addEventListener('focusout', (event) => {
    if (
      event.relatedTarget === null &&
      !mobileMenu.matches &&
      getComputedStyle(menuButton).display === 'none'
    )
      navigation.querySelector<HTMLAnchorElement>('a')?.focus();
  });
  mobileMenu.addEventListener('change', () => {
    const focused = document.activeElement;
    closeMenu();
    if (mobileMenu.matches && navigation.contains(focused)) menuButton.focus();
    else if (!mobileMenu.matches && focused === menuButton)
      navigation.querySelector<HTMLAnchorElement>('a')?.focus();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navigation.classList.contains('open')) {
      closeMenu();
      menuButton.focus();
    }
  });
}

const branchInput = document.querySelector<HTMLInputElement>('#branch-search');
const branchItems = [...document.querySelectorAll<HTMLLIElement>('#branch-list li')];
const status = document.querySelector<HTMLElement>('#branch-status');
branchInput?.addEventListener('input', () => {
  const query = normalize(branchInput.value);
  let count = 0;
  branchItems.forEach((item) => {
    item.hidden = !normalize(item.textContent ?? '').includes(query);
    if (!item.hidden) count++;
  });
  if (status) status.textContent = branchStatus(query, count);
});

const stayLayout = document.querySelector<HTMLElement>('.stay-layout');
const stayTitle = document.querySelector<HTMLElement>('#stay-title');
const stayCopy = document.querySelector<HTMLElement>('#stay-copy');
const stayLink = document.querySelector<HTMLAnchorElement>('#stay-link');
if (stayLayout?.dataset.stays && stayLayout.dataset.email && stayTitle && stayCopy && stayLink) {
  type Stay = CollectionEntry<'stays'>['data'] & { id: string };
  const stays: Stay[] = JSON.parse(stayLayout.dataset.stays);
  const email = stayLayout.dataset.email;
  const buttons = [...document.querySelectorAll<HTMLButtonElement>('.stay-tab')];
  buttons.forEach((button) =>
    button.addEventListener('click', () => {
      const stay = stays.find((entry) => entry.id === button.dataset.stay);
      if (!stay) return;
      buttons.forEach((tab) => {
        const active = tab === button;
        tab.classList.toggle('active', active);
        tab.setAttribute('aria-pressed', String(active));
      });
      const detailLink = document.querySelector<HTMLAnchorElement>('#stay-detail-link');
      if (detailLink) detailLink.href = '/alojamientos/' + stay.id + '/';
      document.querySelectorAll<HTMLElement>('[data-stay-photo]').forEach((photo) => {
        photo.hidden = photo.dataset.stayPhoto !== stay.id;
      });
      stayTitle.textContent = stay.name;
      stayCopy.textContent = stay.description;
      stayLink.href = mailTo(email, 'Consulta de alojamiento en ' + stay.name);
    }),
  );
}
const year = document.querySelector<HTMLElement>('#year');
if (year) year.textContent = String(new Date().getFullYear());
