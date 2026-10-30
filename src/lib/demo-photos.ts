import community from '../assets/demo/comunidad.png';
import room from '../assets/demo/habitacion.png';
import patio from '../assets/demo/patio.png';
import hall from '../assets/demo/salon.png';

// Muestras solicitadas por el usuario. Sustituir por fotografías institucionales antes del lanzamiento.
export const demoPhotos = {
  comunidad: {
    src: community,
    title: 'Encuentro de comunidad de muestra',
    alt: 'Imagen ficticia generada con IA: cuatro personas mayores conversando en un patio.',
    note: 'Imagen ilustrativa generada con IA. No muestra integrantes ni actividades reales del Círculo.',
  },
  habitacion: {
    src: room,
    title: 'Habitación de muestra',
    alt: 'Imagen ficticia generada con IA: una habitación sencilla y luminosa con dos camas.',
    note: 'Imagen ilustrativa generada con IA. No corresponde al alojamiento real.',
  },
  patio: {
    src: patio,
    title: 'Patio de muestra',
    alt: 'Imagen ficticia generada con IA: un patio con plantas, mesa y sillas.',
    note: 'Imagen ilustrativa generada con IA. No corresponde al alojamiento real.',
  },
  salon: {
    src: hall,
    title: 'Salón de muestra',
    alt: 'Imagen ficticia generada con IA: un salón preparado para un encuentro social.',
    note: 'Imagen ilustrativa generada con IA. No corresponde a un salón real del Círculo.',
  },
};
export type DemoPhotoKind = keyof typeof demoPhotos;
