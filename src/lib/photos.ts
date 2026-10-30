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

import type { ImageMetadata } from 'astro';
import inst02 from '../assets/institutional/parana-consultorio-02.jpg';
import inst03 from '../assets/institutional/parana-podologia-03.jpg';
import inst04 from '../assets/institutional/parana-habitacion-doble-04.jpg';
import inst05 from '../assets/institutional/parana-los-laureles-30-personas-05.jpg';
import inst06 from '../assets/institutional/parana-los-laureles-50-personas-06.jpg';
import inst07 from '../assets/institutional/parana-las-rosas-exterior-07.jpg';
import inst08 from '../assets/institutional/parana-las-rosas-parrillas-08.jpg';
import inst09 from '../assets/institutional/concepcion-del-uruguay-alojamiento-09.jpg';
import inst10 from '../assets/institutional/concordia-inauguracion-10.jpg';
import inst11 from '../assets/institutional/concordia-encuentro-social-11.jpg';
import inst12 from '../assets/institutional/rosario-del-tala-actividades-12.jpg';
import inst13 from '../assets/institutional/federacion-complejo-habitacional-13.jpg';
import inst14 from '../assets/institutional/federacion-salud-lentes-talleres-14.jpg';
import inst15 from '../assets/institutional/federal-nueva-sede-15.jpg';
import inst16 from '../assets/institutional/federal-actividades-16.jpg';
import inst17 from '../assets/institutional/feliciano-sede-salud-terreno-17.jpg';
import inst18 from '../assets/institutional/diamante-rehabilitacion-obras-18.jpg';
import inst19 from '../assets/institutional/crespo-salon-80-personas-19.jpg';
import inst20 from '../assets/institutional/maria-grande-alojamiento-20.jpg';
import inst21 from '../assets/institutional/maria-grande-comedor-21.jpg';
import inst22 from '../assets/institutional/hasenkamp-sede-salon-22.jpg';
import inst23 from '../assets/institutional/hasenkamp-sede-salon-23.jpg';
import inst24 from '../assets/institutional/chajari-asesoramiento-24.jpg';
const stockPhotos = {
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

export interface SitePhoto {
  src: ImageMetadata;
  title: string;
  alt: string;
  note: string;
  kind: 'institutional' | 'reference';
  credit: string;
  source?: string;
}
export const photos: Record<string, SitePhoto> = Object.fromEntries(
  Object.entries(stockPhotos).map(([key, photo]) => [
    key,
    {
      ...photo,
      kind: 'reference' as const,
      credit: 'Foto: ' + photo.author + ' / Pexels ↗',
    },
  ]),
);

photos['parana-consultorio-02'] = {
  src: inst02,
  title: 'Paraná · consultorio',
  alt: 'Consultorio de Paraná con camilla y equipamiento de atención.',
  note: 'Paraná · consultorio. Archivo institucional.',
  kind: 'institutional',
  credit: 'Archivo del Círculo',
};

photos['parana-podologia-03'] = {
  src: inst03,
  title: 'Paraná · podología',
  alt: 'Sillón y equipamiento de podología de la sede de Paraná.',
  note: 'Paraná · podología. Archivo institucional.',
  kind: 'institutional',
  credit: 'Archivo del Círculo',
};

photos['parana-habitacion-doble-04'] = {
  src: inst04,
  title: 'Paraná · habitación',
  alt: 'Habitación de Paraná con dos camas individuales, televisor y armario.',
  note: 'Paraná · habitación. Archivo institucional.',
  kind: 'institutional',
  credit: 'Archivo del Círculo',
};

photos['parana-los-laureles-30-personas-05'] = {
  src: inst05,
  title: 'Los Laureles · cocina',
  alt: 'Cocina de Los Laureles con heladera, mesada y cocina.',
  note: 'Los Laureles · cocina. Archivo institucional.',
  kind: 'institutional',
  credit: 'Archivo del Círculo',
};

photos['parana-los-laureles-50-personas-06'] = {
  src: inst06,
  title: 'Los Laureles · salón',
  alt: 'Salón Los Laureles con mesas y sillas junto a sus ventanales.',
  note: 'Los Laureles · salón. Archivo institucional.',
  kind: 'institutional',
  credit: 'Archivo del Círculo',
};

photos['parana-las-rosas-exterior-07'] = {
  src: inst07,
  title: 'Las Rosas · asador',
  alt: 'Asador circular techado y espacio verde de Las Rosas, Paraná.',
  note: 'Las Rosas · asador. Archivo institucional.',
  kind: 'institutional',
  credit: 'Archivo del Círculo',
};

photos['parana-las-rosas-parrillas-08'] = {
  src: inst08,
  title: 'Las Rosas · parrilla',
  alt: 'Parrillas techadas del espacio Las Rosas en Paraná.',
  note: 'Las Rosas · parrilla. Archivo institucional.',
  kind: 'institutional',
  credit: 'Archivo del Círculo',
};

photos['concepcion-del-uruguay-alojamiento-09'] = {
  src: inst09,
  title: 'C. del Uruguay · habitación',
  alt: 'Habitación con dos camas individuales en Concepción del Uruguay.',
  note: 'C. del Uruguay · habitación. Archivo institucional.',
  kind: 'institutional',
  credit: 'Archivo del Círculo',
};

photos['concordia-inauguracion-10'] = {
  src: inst10,
  title: 'Concordia · inauguración',
  alt: 'Acto de inauguración de un espacio institucional en Concordia.',
  note: 'Concordia · inauguración. Archivo institucional.',
  kind: 'institutional',
  credit: 'Archivo del Círculo',
};

photos['concordia-encuentro-social-11'] = {
  src: inst11,
  title: 'Concordia · encuentro',
  alt: 'Encuentro social de integrantes del Círculo en Concordia.',
  note: 'Concordia · encuentro. Archivo institucional.',
  kind: 'institutional',
  credit: 'Archivo del Círculo',
};

photos['rosario-del-tala-actividades-12'] = {
  src: inst12,
  title: 'Rosario del Tala · salón',
  alt: 'Salón preparado para una actividad en Rosario del Tala.',
  note: 'Rosario del Tala · salón. Archivo institucional.',
  kind: 'institutional',
  credit: 'Archivo del Círculo',
};

photos['federacion-complejo-habitacional-13'] = {
  src: inst13,
  title: 'Federación · alojamiento',
  alt: 'Exterior del complejo habitacional presentado para Federación.',
  note: 'Federación · alojamiento. Archivo institucional.',
  kind: 'institutional',
  credit: 'Archivo del Círculo',
};

photos['federacion-salud-lentes-talleres-14'] = {
  src: inst14,
  title: 'Federación · taller',
  alt: 'Personas participando de un taller creativo en Federación.',
  note: 'Federación · taller. Archivo institucional.',
  kind: 'institutional',
  credit: 'Archivo del Círculo',
};

photos['federal-nueva-sede-15'] = {
  src: inst15,
  title: 'Federal · sede',
  alt: 'Frente de la sede del Círculo en Federal.',
  note: 'Federal · sede. Archivo institucional.',
  kind: 'institutional',
  credit: 'Archivo del Círculo',
};

photos['federal-actividades-16'] = {
  src: inst16,
  title: 'Federal · viaje',
  alt: 'Grupo participante de una actividad sociocultural de Federal.',
  note: 'Federal · viaje. Archivo institucional.',
  kind: 'institutional',
  credit: 'Archivo del Círculo',
};

photos['feliciano-sede-salud-terreno-17'] = {
  src: inst17,
  title: 'Feliciano · atención',
  alt: 'Atención y conversación con integrantes en Feliciano.',
  note: 'Feliciano · atención. Archivo institucional.',
  kind: 'institutional',
  credit: 'Archivo del Círculo',
};

photos['diamante-rehabilitacion-obras-18'] = {
  src: inst18,
  title: 'Diamante · rehabilitación',
  alt: 'Bicicletas y elementos del gimnasio de rehabilitación de Diamante.',
  note: 'Diamante · rehabilitación. Archivo institucional.',
  kind: 'institutional',
  credit: 'Archivo del Círculo',
};

photos['crespo-salon-80-personas-19'] = {
  src: inst19,
  title: 'Crespo · salón',
  alt: 'Sector iluminado del salón presentado para Crespo.',
  note: 'Crespo · salón. Archivo institucional.',
  kind: 'institutional',
  credit: 'Archivo del Círculo',
};

photos['maria-grande-alojamiento-20'] = {
  src: inst20,
  title: 'María Grande · habitación',
  alt: 'Habitación del alojamiento de María Grande.',
  note: 'María Grande · habitación. Archivo institucional.',
  kind: 'institutional',
  credit: 'Archivo del Círculo',
};

photos['maria-grande-comedor-21'] = {
  src: inst21,
  title: 'María Grande · comedor',
  alt: 'Comedor y cocina del alojamiento de María Grande.',
  note: 'María Grande · comedor. Archivo institucional.',
  kind: 'institutional',
  credit: 'Archivo del Círculo',
};

photos['hasenkamp-sede-salon-22'] = {
  src: inst22,
  title: 'Hasenkamp · salón',
  alt: 'Interior del salón presentado para Hasenkamp.',
  note: 'Hasenkamp · salón. Archivo institucional.',
  kind: 'institutional',
  credit: 'Archivo del Círculo',
};

photos['hasenkamp-sede-salon-23'] = {
  src: inst23,
  title: 'Hasenkamp · cocina',
  alt: 'Cocina del espacio institucional de Hasenkamp.',
  note: 'Hasenkamp · cocina. Archivo institucional.',
  kind: 'institutional',
  credit: 'Archivo del Círculo',
};

photos['chajari-asesoramiento-24'] = {
  src: inst24,
  title: 'Chajarí · oficina',
  alt: 'Oficina de asesoramiento presentada para Chajarí.',
  note: 'Chajarí · oficina. Archivo institucional.',
  kind: 'institutional',
  credit: 'Archivo del Círculo',
};

export const servicePhotoKeys: Record<string, string> = {
  salud: 'parana-consultorio-02',
  tramites: 'chajari-asesoramiento-24',
  farmacia: 'farmacia',
  turismo: 'federacion-complejo-habitacional-13',
  recreacion: 'concordia-encuentro-social-11',
};
export const stayGalleryKeys: Record<string, string[]> = {
  parana: ['parana-habitacion-doble-04'],
  'maria-grande': ['maria-grande-alojamiento-20', 'maria-grande-comedor-21'],
  'concepcion-del-uruguay': ['concepcion-del-uruguay-alojamiento-09'],
  federacion: ['federacion-complejo-habitacional-13'],
  victoria: ['habitacion3', 'entorno'],
  nogoya: ['habitacion2', 'entorno'],
  'la-paz': ['habitacion3', 'entorno'],
  'santa-elena': ['habitacion', 'entorno'],
};
export const stayPhotoKeys: Record<string, string> = Object.fromEntries(
  Object.entries(stayGalleryKeys).map(([key, value]) => [key, value[0]]),
);
