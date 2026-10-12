const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() { navigation.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); }
menuButton.addEventListener('click', () => { const open = navigation.classList.toggle('open'); menuButton.setAttribute('aria-expanded', String(open)); });
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && navigation.classList.contains('open')) { closeMenu(); menuButton.focus(); } });
const normalize = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
const branchInput = document.querySelector('#branch-search');
const branchItems = [...document.querySelectorAll('#branch-list li')];
branchInput.addEventListener('input', () => {
  const query = normalize(branchInput.value);
  let count = 0;
  branchItems.forEach(item => { item.hidden = !normalize(item.textContent).includes(query); if (!item.hidden) count++; });
  document.querySelector('#branch-status').textContent = query ? (count ? `${count} ${count === 1 ? 'localidad encontrada' : 'localidades encontradas'}.` : 'No encontramos esa localidad. Consultá con la sede central.') : '';
});
const stayCopy = {
  'Paraná': 'La sede central cuenta con habitaciones y espacios comunes para el hospedaje de integrantes y familiares. Una base de encuentro en la capital entrerriana.',
  'María Grande': 'El Círculo publica una opción de alojamiento en María Grande. Consultá con la institución el contacto responsable y las condiciones actuales para organizar tu visita.',
  'Victoria': 'Una de las localidades de la red de alojamiento institucional. Consultá con el Círculo las opciones disponibles para tu estadía en Victoria.',
  'Nogoyá': 'La red institucional incluye alojamiento en Nogoyá. Comunicate para conocer la disponibilidad, el equipamiento y las condiciones de reserva.',
  'La Paz': 'El Círculo cuenta con una opción de alojamiento publicada en La Paz. Consultá las condiciones y coordiná tu estadía con la institución.',
  'Santa Elena': 'Santa Elena forma parte de las localidades con alojamiento institucional publicado. Consultá disponibilidad y contacto de reserva para planificar tu visita.'
};
document.querySelectorAll('.stay-tab').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.stay-tab').forEach(tab => { const active = tab === button; tab.classList.toggle('active', active); tab.setAttribute('aria-pressed', String(active)); });
  const place = button.dataset.stay;
  document.querySelector('#stay-title').textContent = place;
  document.querySelector('#stay-copy').textContent = stayCopy[place];
  document.querySelector('#stay-link').href = `mailto:retiradospoliciaentrerios@gmail.com?subject=${encodeURIComponent(`Consulta de alojamiento en ${place}`)}`;
}));
document.querySelector('#year').textContent = new Date().getFullYear();
