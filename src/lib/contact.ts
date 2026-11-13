export function mailTo(email: string, subject?: string): string {
  return 'mailto:' + email + (subject ? '?subject=' + encodeURIComponent(subject) : '');
}

const sanidadNumber = '+54 9 3435 36-2998';
const sanidadMessage = 'Hola, quisiera hacer una consulta al área de Sanidad del Círculo.';

export const sanidadWhatsApp = {
  number: sanidadNumber,
  href: `https://wa.me/${sanidadNumber.replace(/\D/g, '')}?text=${encodeURIComponent(sanidadMessage)}`,
};
