import comunidad from '../assets/reference/comunidad.jpg';
import habitacion from '../assets/reference/habitacion.jpg';
import habitacion2 from '../assets/reference/habitacion2.jpg';
import habitacion3 from '../assets/reference/habitacion3.jpg';
import entorno from '../assets/reference/entorno.jpg';
import salon from '../assets/reference/salon.jpg';
import salud from '../assets/reference/salud.jpg';
import tramites from '../assets/reference/tramites.jpg';
import farmacia from '../assets/reference/farmacia.jpg';
import recreacion from '../assets/reference/recreacion.jpg';
import gestion from '../assets/reference/gestion.jpg';
import institucion from '../assets/reference/institucion.jpg';

// Fotografías de banco para revisar diseño. Fuentes y licencias: docs/photo-sources.json.
export const referencePhotos = {
  comunidad: {
    src: comunidad,
    title: 'Encuentro de referencia',
    alt: 'Fotografía de referencia: personas mayores conversando y compartiendo una reunión.',
    note: 'Fotografía de referencia. No muestra integrantes ni actividades del Círculo.',
    author: 'Alena Darmel',
    source: 'https://www.pexels.com/photo/elderly-people-having-a-get-together-8153752/',
  },
  habitacion: {
    src: habitacion,
    title: 'Habitación de referencia',
    alt: 'Fotografía de referencia de una habitación de hotel con dos camas y muebles de madera.',
    note: 'Fotografía de referencia. No corresponde a instalaciones del Círculo.',
    author: 'Quang Nguyen Vinh',
    source: 'https://www.pexels.com/photo/interior-design-of-hotel-room-14021928/',
  },
  habitacion2: {
    src: habitacion2,
    title: 'Otra habitación de referencia',
    alt: 'Fotografía de referencia de un dormitorio con camas individuales y luz natural.',
    note: 'Fotografía de referencia. No corresponde a instalaciones del Círculo.',
    author: 'Amelia Hallsworth',
    source: 'https://www.pexels.com/photo/single-beds-inside-a-hotel-room-5461590/',
  },
  habitacion3: {
    src: habitacion3,
    title: 'Dormitorio de referencia',
    alt: 'Fotografía de referencia de un dormitorio con dos camas y revestimientos de madera.',
    note: 'Fotografía de referencia. No corresponde a instalaciones del Círculo.',
    author: 'Ahmet ÇÖTÜR',
    source: 'https://www.pexels.com/photo/bedroom-with-two-single-beds-26859040/',
  },
  entorno: {
    src: entorno,
    title: 'Paisaje de referencia',
    alt: 'Fotografía de referencia de un atardecer junto al río en un entorno natural.',
    note: 'Fotografía de referencia del entorno natural. No identifica la ubicación de un alojamiento.',
    author: 'Pato Mec',
    source: 'https://www.pexels.com/photo/relaxing-afternoon-by-river-in-entre-rios-35322404/',
  },
  salon: {
    src: salon,
    title: 'Salón de referencia',
    alt: 'Fotografía de referencia de un salón con mesas, sillas, plantas e iluminación para un encuentro.',
    note: 'Fotografía de referencia. No corresponde a instalaciones del Círculo.',
    author: 'Matheus Bertelli',
    source: 'https://www.pexels.com/photo/decorated-hall-in-restaurant-16985131/',
  },
  salud: {
    src: salud,
    title: 'Atención de referencia',
    alt: 'Fotografía de referencia de una profesional de salud conversando con una persona en un consultorio.',
    note: 'Fotografía de referencia. No muestra servicios ni personal del Círculo.',
    author: 'cottonbro studio',
    source: 'https://www.pexels.com/photo/a-doctor-talking-the-patient-7579831/',
  },
  tramites: {
    src: tramites,
    title: 'Asesoramiento de referencia',
    alt: 'Fotografía de referencia de una consulta con documentos sobre una mesa.',
    note: 'Fotografía de referencia. No muestra servicios ni personal del Círculo.',
    author: 'RDNE Stock project',
    source: 'https://www.pexels.com/photo/an-agent-showing-documents-to-his-client-7821671/',
  },
  farmacia: {
    src: farmacia,
    title: 'Farmacia de referencia',
    alt: 'Fotografía de referencia de la atención en el mostrador de una farmacia.',
    note: 'Fotografía de referencia. No muestra servicios ni personal del Círculo.',
    author: 'cottonbro studio',
    source: 'https://www.pexels.com/photo/a-man-giving-a-small-black-bottle-to-the-woman-8657359/',
  },
  recreacion: {
    src: recreacion,
    title: 'Actividad al aire libre de referencia',
    alt: 'Fotografía de referencia de personas mayores paseando y conversando en un jardín.',
    note: 'Fotografía de referencia. No muestra integrantes ni actividades del Círculo.',
    author: 'Wellness Gallery Catalyst Foundation',
    source: 'https://www.pexels.com/photo/elderly-women-walking-in-the-park-12085752/',
  },
  gestion: {
    src: gestion,
    title: 'Trabajo de gestión de referencia',
    alt: 'Fotografía de referencia de personas compartiendo documentos durante una reunión.',
    note: 'Fotografía de referencia. No muestra servicios ni personal del Círculo.',
    author: 'Mizuno K',
    source: 'https://www.pexels.com/photo/reading-documents-in-office-12899096/',
  },
  institucion: {
    src: institucion,
    title: 'Vínculos de referencia',
    alt: 'Fotografía de referencia de un abrazo entre dos personas mayores.',
    note: 'Fotografía de referencia. No muestra integrantes ni actividades del Círculo.',
    author: 'Kampus Production',
    source:
      'https://www.pexels.com/photo/photograph-of-an-elderly-man-hugging-another-person-8201170/',
  },
};
export type ReferencePhotoKind = keyof typeof referencePhotos;
export const servicePhotoKeys: Record<string, ReferencePhotoKind> = {
  salud: 'salud',
  tramites: 'tramites',
  farmacia: 'farmacia',
  turismo: 'entorno',
  recreacion: 'recreacion',
};
export const stayPhotoKeys: Record<string, ReferencePhotoKind> = {
  parana: 'habitacion',
  'maria-grande': 'habitacion2',
  victoria: 'habitacion3',
  nogoya: 'habitacion2',
  'la-paz': 'habitacion3',
  'santa-elena': 'habitacion',
};
