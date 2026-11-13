import type { ImageMetadata } from 'astro';
import paranaGobierno from '../assets/stay-destinations/parana-gobierno.webp';
import paranaPuerto from '../assets/stay-destinations/parana-puerto.webp';
import paranaCatedral from '../assets/stay-destinations/parana-catedral.webp';
import paranaCostanera from '../assets/stay-destinations/parana-costanera.webp';
import paranaParqueUrquiza from '../assets/stay-destinations/parana.webp';
import paranaAnfiteatro from '../assets/stay-destinations/parana-2.webp';
import mariaGrandePiscinasAlAnochecer from '../assets/stay-destinations/maria-grande-piscinas-al-anochecer.webp';
import mariaGrandeRelojNocturno from '../assets/stay-destinations/maria-grande-reloj-nocturno.webp';
import mariaGrandePaseoArbolado from '../assets/stay-destinations/maria-grande-paseo-arbolado.webp';
import mariaGrandePredioTermal from '../assets/stay-destinations/maria-grande-predio-termal.webp';
import mariaGrandePiscinasCubiertas from '../assets/stay-destinations/maria-grande-piscinas-cubiertas.webp';
import victoriaBalneario from '../assets/stay-destinations/victoria.webp';
import victoriaAbadia from '../assets/stay-destinations/victoria-abadia.webp';
import victoriaPalacio from '../assets/stay-destinations/victoria-palacio.webp';
import victoriaPlaza from '../assets/stay-destinations/victoria-plaza.webp';
import victoriaRiacho from '../assets/stay-destinations/victoria-2.webp';
import nogoyaBasilica from '../assets/stay-destinations/nogoya-basilica.webp';
import nogoyaFachadaAlta from '../assets/stay-destinations/nogoya-fachada-alta.webp';
import nogoyaAsociacion from '../assets/stay-destinations/nogoya-asociacion.webp';
import nogoyaTanque from '../assets/stay-destinations/nogoya-tanque.webp';
import nogoyaMonasterio from '../assets/stay-destinations/nogoya-2.webp';
import laPazFaro from '../assets/stay-destinations/la-paz.webp';
import laPazPalacioMunicipal from '../assets/stay-destinations/la-paz-palacio-municipal.webp';
import laPazGuinchePuerto from '../assets/stay-destinations/la-paz-guinche-puerto.webp';
import laPazRuinasCalera from '../assets/stay-destinations/la-paz-ruinas-calera.webp';
import laPazAtardecerTermal from '../assets/stay-destinations/la-paz-atardecer-termal.webp';
import santaElenaBalneario from '../assets/stay-destinations/santa-elena.webp';
import santaElenaSegemarBarrancas from '../assets/stay-destinations/santa-elena-segemar-barrancas.webp';
import santaElenaOcaso from '../assets/stay-destinations/santa-elena-ocaso.webp';
import santaElenaFachada from '../assets/stay-destinations/santa-elena-fachada.webp';
import santaElenaExposicion from '../assets/stay-destinations/santa-elena-exposicion.webp';
import concepcionPlazaRamirez from '../assets/stay-destinations/concepcion-plaza-ramirez.webp';
import concepcionIslaDelPuerto from '../assets/stay-destinations/concepcion-isla-del-puerto.webp';
import concepcionRectorado from '../assets/stay-destinations/concepcion-rectorado.webp';
import concepcionCasaPanchoRamirez from '../assets/stay-destinations/concepcion-casa-pancho-ramirez.webp';
import concepcionPuerto from '../assets/stay-destinations/concepcion-puerto.webp';
import concepcionBasilica from '../assets/stay-destinations/concepcion-del-uruguay.webp';
import federacionCosta from '../assets/stay-destinations/federacion-2.webp';
import federacionCostanera from '../assets/stay-destinations/federacion-costanera.webp';
import federacionLagoSaltoGrande from '../assets/stay-destinations/federacion-lago-salto-grande.webp';
import federacionMuseoAsentamientos from '../assets/stay-destinations/federacion-museo-asentamientos.webp';
import federacionParqueAcuatico from '../assets/stay-destinations/federacion-parque-acuatico.webp';
import federacionTermas from '../assets/stay-destinations/federacion.webp';

export interface StayIntroPhoto {
  src: ImageMetadata;
  landmark: string;
  alt: string;
  author: string;
  source?: string;
  license?: string;
  licenseUrl?: string;
  focus?: 'upper' | 'lower';
}

export const stayIntroPhotos: Partial<Record<string, readonly StayIntroPhoto[]>> = {
  parana: [
    {
      src: paranaGobierno,
      landmark: 'Casa de Gobierno, Paraná',
      alt: 'Fachada de la Casa de Gobierno de Entre Ríos con flores en primer plano.',
      author: 'Secretaría de Comunicación del Gobierno de Entre Ríos',
      source: 'https://commons.wikimedia.org/wiki/File:Casa_de_Gobierno_de_Entre_Rios_2018.jpg',
      license: 'CC BY 2.5 ar',
      licenseUrl: 'https://creativecommons.org/licenses/by/2.5/ar/',
      focus: 'upper',
    },
    {
      src: paranaPuerto,
      landmark: 'Puerto Nuevo, Paraná',
      alt: 'Vista panorámica de las grúas y los edificios del puerto desde el río Paraná.',
      author: 'Bruno Gallo',
      source:
        'https://commons.wikimedia.org/wiki/File:El_puerto_desde_el_Victor_III_-_panoramio.jpg',
      license: 'CC BY-SA 3.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    },
    {
      src: paranaCatedral,
      landmark: 'Catedral de Paraná',
      alt: 'Fachada blanca de la Catedral de Nuestra Señora del Rosario, vista desde la plaza.',
      author: 'Alcirita',
      source:
        'https://commons.wikimedia.org/wiki/File:Catedral_de_Paran%C3%A1,_Entre_R%C3%ADos,_Argentina..JPG',
      license: 'CC BY-SA 3.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
      focus: 'upper',
    },
    {
      src: paranaCostanera,
      landmark: 'Costanera de Paraná',
      alt: 'Playa de arena con sombrillas, el río y la costa arbolada al fondo.',
      author: 'AnitaAD',
      source: 'https://commons.wikimedia.org/wiki/File:Costanera_Paran%C3%A1.jpg',
      license: 'CC BY-SA 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    },
    {
      src: paranaParqueUrquiza,
      landmark: 'Parque Urquiza, Paraná',
      alt: 'Vista del río Paraná y sus islas entre los árboles del Parque Urquiza.',
      author: 'ANDY ABIR ALAN',
      source:
        'https://commons.wikimedia.org/wiki/File:Panorama_islas_desde_Parque_Urquiza_-_panoramio.jpg',
      license: 'CC BY-SA 3.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    },
    {
      src: paranaAnfiteatro,
      landmark: 'Anfiteatro del Parque Urquiza, Paraná',
      alt: 'Gradas de piedra del anfiteatro del Parque Urquiza entre árboles.',
      author: 'ANDY ABIR ALAN',
      source:
        'https://commons.wikimedia.org/wiki/File:Anfiteatro,_Parque_Urquiza,_Parana_-_panoramio.jpg',
      license: 'CC BY-SA 3.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
      focus: 'lower',
    },
  ],
  'maria-grande': [
    {
      src: mariaGrandePiscinasAlAnochecer,
      landmark: 'Termas de María Grande',
      alt: 'Piscinas exteriores de las termas con luces encendidas al anochecer.',
      author: 'ANDY ABIR ALAN',
      source:
        'https://commons.wikimedia.org/wiki/File:Paran%C3%A1,_Entre_R%C3%ADos,_Argentina_-_panoramio_(50).jpg',
      license: 'CC BY-SA 3.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    },
    {
      src: mariaGrandeRelojNocturno,
      landmark: 'Torre del Reloj de María Grande',
      alt: 'Torre del Reloj de María Grande iluminada en azul y amarillo por la noche.',
      author: 'DanielMartin10',
      source:
        'https://commons.wikimedia.org/wiki/File:Torre_del_Reloj_de_la_Ciudad_de_Maria_Grande,_Entre_Rios,_Argentina._Vista_nocturna..jpg',
      license: 'CC BY-SA 3.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
      focus: 'upper',
    },
    {
      src: mariaGrandePaseoArbolado,
      landmark: 'Camino arbolado en María Grande',
      alt: 'Camino de tierra entre árboles en María Grande, con una torre al fondo.',
      author: 'ANDY ABIR ALAN',
      source:
        'https://commons.wikimedia.org/wiki/File:Mar%C3%ADa_Grande,_Entre_Rios,_Argentina_-_panoramio.jpg',
      license: 'CC BY-SA 3.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    },
    {
      src: mariaGrandePredioTermal,
      landmark: 'Atardecer en las termas de María Grande',
      alt: 'Siluetas de palmeras y sombrillas en el predio termal al atardecer.',
      author: 'ANDY ABIR ALAN',
      source:
        'https://commons.wikimedia.org/wiki/File:Paran%C3%A1,_Entre_R%C3%ADos,_Argentina_-_panoramio_(51).jpg',
      license: 'CC BY-SA 3.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
      focus: 'upper',
    },
    {
      src: mariaGrandePiscinasCubiertas,
      landmark: 'Piscinas cubiertas de María Grande',
      alt: 'Piletas azules bajo una cubierta metálica en el complejo termal de María Grande.',
      author: 'ANDY ABIR ALAN',
      source:
        'https://commons.wikimedia.org/wiki/File:Paran%C3%A1,_Entre_R%C3%ADos,_Argentina_-_panoramio_(49).jpg',
      license: 'CC BY-SA 3.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    },
  ],
  victoria: [
    {
      src: victoriaBalneario,
      landmark: 'Paseo del balneario de Victoria',
      alt: 'Paseo peatonal arbolado junto al balneario de Victoria.',
      author: 'Mushii',
      source: 'https://commons.wikimedia.org/wiki/File:Balneario_Victoria.jpg',
      license: 'CC BY-SA 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    },
    {
      src: victoriaAbadia,
      landmark: 'Abadía del Niño Dios, Victoria',
      alt: 'Fachada de la abadía benedictina del Niño Dios con su campanario bajo un cielo azul.',
      author: 'Mushii',
      source: 'https://commons.wikimedia.org/wiki/File:Victoria_Abadia.jpg',
      license: 'CC BY-SA 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
      focus: 'upper',
    },
    {
      src: victoriaPalacio,
      landmark: 'Basílica de Aránzazu y Palacio Municipal, Victoria',
      alt: 'Torres de la basílica y edificio municipal detrás de los jardines de la plaza de Victoria.',
      author: 'Estany3',
      source: 'https://commons.wikimedia.org/wiki/File:Iglesia_y_palacio_municipal_de_Victoria.JPG',
      license: 'CC BY-SA 3.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
      focus: 'upper',
    },
    {
      src: victoriaPlaza,
      landmark: 'Plaza San Martín, Victoria',
      alt: 'Monumento ecuestre y árboles de la plaza principal de Victoria.',
      author: 'Leandro Kibisz',
      source:
        'https://commons.wikimedia.org/wiki/File:Entre_R%C3%ADos_-_Victoria_-_Plaza_principal_de_la_ciudad.jpg',
      license: 'CC BY-SA 3.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
      focus: 'upper',
    },
    {
      src: victoriaRiacho,
      landmark: 'Riacho Victoria',
      alt: 'Atardecer sobre el Riacho Victoria, con la costa arbolada en el horizonte.',
      author: 'Ana.logica33',
      source: 'https://commons.wikimedia.org/wiki/File:Atardecer_en_Riacho_Victoria.jpg',
      license: 'CC BY 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
      focus: 'upper',
    },
  ],
  nogoya: [
    {
      src: nogoyaBasilica,
      landmark: 'Basílica Nuestra Señora del Carmen, Nogoyá',
      alt: 'Fachada de la basílica de Nogoyá, con sus dos torres y la escalinata de acceso.',
      author: 'Fernando de Gorocica',
      source:
        'https://commons.wikimedia.org/wiki/File:Nuestra_Se%C3%B1ora_del_Carmen_-_Nogoy%C3%A1.jpg',
      license: 'CC BY-SA 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
      focus: 'upper',
    },
    {
      src: nogoyaFachadaAlta,
      landmark: 'Palacio Municipal de Nogoyá',
      alt: 'Fachada iluminada del Palacio Municipal de Nogoyá con su torre del reloj.',
      author: 'Guglelmo',
      source: 'https://commons.wikimedia.org/wiki/File:Frente_Municipalidad_de_Nogoy%C3%A1.JPG',
      license: 'Dominio público',
      focus: 'upper',
    },
    {
      src: nogoyaAsociacion,
      landmark: 'Asociación Cultural Nogoyá',
      alt: 'Fachada de la Asociación Cultural Nogoyá iluminada de violeta durante la noche.',
      author: 'Marcosretamozochajari',
      source: 'https://commons.wikimedia.org/wiki/File:Asociaci%C3%B3n_Cultural_Nogoy%C3%A1.jpg',
      license: 'CC0',
      licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
      focus: 'upper',
    },
    {
      src: nogoyaTanque,
      landmark: 'Tanque de agua de la estación ferroviaria de Nogoyá',
      alt: 'Antiguo tanque de agua de la estación de Nogoyá, visto desde abajo contra un cielo nublado.',
      author: 'rodoluca88',
      source: 'https://www.flickr.com/photos/67902338@N06/7688396670/',
      license: 'CC BY 2.0',
      licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
      focus: 'upper',
    },
    {
      src: nogoyaMonasterio,
      landmark: 'Monasterio de las Carmelitas Descalzas, Nogoyá',
      alt: 'Fachada de ladrillo del monasterio y su campanario, en una fotografía de 1998.',
      author: 'Blanca de la Force (hija)',
      source: 'https://commons.wikimedia.org/wiki/File:Monasterio_en_1998.jpg',
      license: 'CC BY-SA 3.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    },
  ],
  'la-paz': [
    {
      src: laPazFaro,
      landmark: 'Faro Mirador de La Paz',
      alt: 'Faro de piedra con mirador circular entre árboles y una ladera verde.',
      author: 'Aldo Arnez',
      source: 'https://commons.wikimedia.org/wiki/File:Faro_Mirador_(192742287).jpeg',
      license: 'CC0',
      licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    },
    {
      src: laPazPalacioMunicipal,
      landmark: 'Palacio Municipal de La Paz',
      alt: 'Fachada del Palacio Municipal de La Paz y torre con reloj, detrás de los árboles.',
      author: 'ANDY ABIR ALAN',
      source: 'https://commons.wikimedia.org/wiki/File:CENTRO_DE_LA_PAZ_-_panoramio.jpg',
      license: 'CC BY-SA 3.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    },
    {
      src: laPazGuinchePuerto,
      landmark: 'Guinche del puerto de La Paz',
      alt: 'Estructura metálica roja del guinche histórico junto al muelle del puerto de La Paz.',
      author: 'ANDY ABIR ALAN',
      source:
        'https://commons.wikimedia.org/wiki/File:La_Paz,_Entre_Rios,_Argentina_-_panoramio_(1).jpg',
      license: 'CC BY-SA 3.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    },
    {
      src: laPazRuinasCalera,
      landmark: 'Ruinas de la calera de La Paz',
      alt: 'Chimenea de ladrillo vista desde el interior de las ruinas de la antigua calera.',
      author: 'ANDY ABIR ALAN',
      source: 'https://commons.wikimedia.org/wiki/File:CALERA_RUINAS_-_panoramio.jpg',
      license: 'CC BY-SA 3.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    },
    {
      src: laPazAtardecerTermal,
      landmark: 'Río Paraná desde las termas de La Paz',
      alt: 'Atardecer sobre el Paraná enmarcado por las ramas de los árboles.',
      author: 'ANDY ABIR ALAN',
      source: 'https://commons.wikimedia.org/wiki/File:TERMAS_PANORAMA_-_panoramio.jpg',
      license: 'CC BY-SA 3.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    },
  ],
  'santa-elena': [
    {
      src: santaElenaBalneario,
      landmark: 'Balneario de Santa Elena',
      alt: 'Vista del río Paraná desde la sombra de los árboles del balneario de Santa Elena.',
      author: 'Fernando Marcos Peli…',
      source:
        'https://commons.wikimedia.org/wiki/File:Balneario_Santa_Elena,_Entre_R%C3%ADos_-_panoramio.jpg',
      license: 'CC BY-SA 3.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    },
    {
      src: santaElenaSegemarBarrancas,
      landmark: 'Barrancas del Paraná, Santa Elena',
      alt: 'Barrancas de Santa Elena con estratos de distintos colores, vistas desde el río Paraná.',
      author: 'Servicio Geológico Minero Argentino (SEGEMAR)',
      source: 'https://www.argentina.gob.ar/node/281513',
      license: 'CC BY 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    },
    {
      src: santaElenaOcaso,
      landmark: 'Atardecer cerca de Santa Elena',
      alt: 'Puesta de sol sobre el agua, con una persona a contraluz en la orilla.',
      author: 'Zaralulu97',
      source: 'https://commons.wikimedia.org/wiki/File:Atardecer_con_personas.jpg',
      license: 'CC0',
      licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    },
    {
      src: santaElenaFachada,
      landmark: 'Fachada de la comisaría, Santa Elena',
      alt: 'Fachada de color ocre de la comisaría de Santa Elena, vista desde la calle.',
      author: 'Archivo del Círculo',
      focus: 'upper',
    },
    {
      src: santaElenaExposicion,
      landmark: 'Exposición en Santa Elena',
      alt: 'Caballetes con imágenes en una sala del edificio de Santa Elena.',
      author: 'Archivo del Círculo',
    },
  ],
  'concepcion-del-uruguay': [
    {
      src: concepcionPlazaRamirez,
      landmark: 'Plaza General Francisco Ramírez, Concepción del Uruguay',
      alt: 'Monumento y senderos de la plaza Ramírez entre árboles.',
      author: 'Consejo General de Educación de Entre Ríos',
      source:
        'https://commons.wikimedia.org/wiki/File:Aprender_(Entre_R%C3%ADos)_-_Concepci%C3%B3n_del_Uruguay_-_Panoramica_Plaza_Gral_Ramirez_001_(1).jpg',
      license: 'CC BY-SA 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    },
    {
      src: concepcionIslaDelPuerto,
      landmark: 'Isla del Puerto, Concepción del Uruguay',
      alt: 'Playa de arena con sombrillas de paja junto al río Uruguay.',
      author: 'Fernando de Gorocica',
      source:
        'https://commons.wikimedia.org/wiki/File:Isla_del_Puerto_-_R%C3%ADo,_arena_y_sombrillas.jpg',
      license: 'CC BY-SA 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
      focus: 'lower',
    },
    {
      src: concepcionRectorado,
      landmark: 'Rectorado de la Universidad Nacional de Entre Ríos',
      alt: 'Fachada del rectorado de la Universidad Nacional de Entre Ríos, en Concepción del Uruguay.',
      author: 'Soyyosoycocomiel',
      source:
        'https://commons.wikimedia.org/wiki/File:Concepci%C3%B3n_del_Uruguay,_Entre_R%C3%ADos.jpg',
      license: 'CC BY-SA 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
      focus: 'upper',
    },
    {
      src: concepcionCasaPanchoRamirez,
      landmark: 'Casa de Francisco Ramírez, Concepción del Uruguay',
      alt: 'Patio interior de la Casa de Francisco Ramírez, con un busto sobre un pedestal.',
      author: 'Belgrano',
      source: 'https://commons.wikimedia.org/wiki/File:Casa_de_Pancho_Ram%C3%ADrez.JPG',
      license: 'Dominio público',
    },
    {
      src: concepcionPuerto,
      landmark: 'Puerto de Concepción del Uruguay',
      alt: 'Vista de las embarcaciones en el puerto de Concepción del Uruguay desde la orilla.',
      author: 'Belgrano',
      source: 'https://commons.wikimedia.org/wiki/File:Puerto_de_Concepci%C3%B3n.JPG',
      license: 'Dominio público',
    },
    {
      src: concepcionBasilica,
      landmark: 'Basílica de la Inmaculada Concepción, Concepción del Uruguay',
      alt: 'Nave central de la basílica con arcos, pinturas en la bóveda y el altar al fondo.',
      author: 'Saramalai',
      source:
        'https://commons.wikimedia.org/wiki/File:Bas%C3%ADlica_de_la_Inmaculada_Concepci%C3%B3n_(Concepci%C3%B3n_del_Uruguay,_Entre_R%C3%ADos).jpg',
      license: 'CC BY-SA 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    },
  ],
  federacion: [
    {
      src: federacionCosta,
      landmark: 'Costa de Federación',
      alt: 'Vista aérea de la costa de Federación.',
      author: 'Juandedeboca',
      source: 'https://commons.wikimedia.org/wiki/File:Federaci%C3%B3n_desde_el_aire_I.JPG',
      license: 'CC BY-SA 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    },
    {
      src: federacionCostanera,
      landmark: 'Costanera de Federación',
      alt: 'Flores y una construcción con techo de paja junto al agua en la costanera de Federación.',
      author: 'ANDY ABIR ALAN',
      source: 'https://commons.wikimedia.org/wiki/File:COSTANERA_-_panoramio_(1).jpg',
      license: 'CC BY-SA 3.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    },
    {
      src: federacionLagoSaltoGrande,
      landmark: 'Lago Salto Grande, Federación',
      alt: 'Atardecer sobre el lago Salto Grande desde Federación.',
      author: 'Galoware',
      source:
        'https://commons.wikimedia.org/wiki/File:Crep%C3%BAsculo_en_el_Lago_Salto_Grande_-_panoramio.jpg',
      license: 'CC BY-SA 3.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    },
    {
      src: federacionMuseoAsentamientos,
      landmark: 'Museo de los Asentamientos, Federación',
      alt: 'Fachada blanca con campanario del Museo de los Asentamientos, en Federación.',
      author: 'Dario Alpern',
      source:
        'https://commons.wikimedia.org/wiki/File:Museo_de_los_asentamientos,_Federaci%C3%B3n.jpg',
      license: 'CC BY-SA 3.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
      focus: 'upper',
    },
    {
      src: federacionParqueAcuatico,
      landmark: 'Parque Acuático Termal de Federación',
      alt: 'Chorros de agua y pileta exterior del Parque Acuático Termal de Federación.',
      author: 'Lpaiva83',
      source:
        'https://commons.wikimedia.org/wiki/File:Parque_Acu%C3%A1tico_Termal,_Federaci%C3%B3n_Entre_R%C3%ADos.jpg',
      license: 'CC BY-SA 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
      focus: 'lower',
    },
    {
      src: federacionTermas,
      landmark: 'Termas de Federación',
      alt: 'Piscina termal cubierta e iluminada en el complejo de Federación.',
      author: 'ANDY ABIR ALAN',
      source: 'https://commons.wikimedia.org/wiki/File:TERMAS_BUENISIMAS_-_panoramio.jpg',
      license: 'CC BY-SA 3.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    },
  ],
};

export function getStayIntroPhotos(id: string) {
  return stayIntroPhotos[id];
}
