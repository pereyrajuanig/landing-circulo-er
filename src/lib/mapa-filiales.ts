import { geoArea, geoContains, geoMercator, geoPath, geoGraticule } from 'd3-geo';
import type { Feature, Polygon } from 'geojson';
import geography from '../data/geografia/entre-rios.geo.json' with { type: 'json' };
import dataset from '../data/geografia/localidades-filiales.json' with { type: 'json' };

export interface MapLocation {
  id: string;
  name: string;
  officialName: string;
  type: 'central' | 'filial';
  georefId: string;
  provinceId: string;
  department: string;
  longitude: number;
  latitude: number;
  address: string | null;
  contact: string | null;
}

// D3 usa orientación esférica; IGN entrega anillos GeoJSON en orientación RFC 7946.
export const boundary = structuredClone(geography) as unknown as Feature<Polygon>;
if (geoArea(boundary) > 2 * Math.PI)
  boundary.geometry.coordinates.forEach((ring) => ring.reverse());

export const locations: MapLocation[] = dataset.locations.map((site) => {
  if (site.type !== 'central' && site.type !== 'filial')
    throw new Error('Tipo de sede inválido: ' + site.id);
  return { ...site, type: site.type };
});
export const mapSize = { width: 900, height: 930 };
export const projection = geoMercator().fitExtent(
  [
    [245, 110],
    [645, 815],
  ],
  boundary,
);
const path = geoPath(projection).digits(2);
export const boundaryPath = path(boundary)!;
export const graticulePath = path(
  geoGraticule()
    .extent([
      [-62, -35],
      [-57, -29],
    ])
    .step([0.5, 0.5])(),
)!;

export function validateGeography() {
  if (locations.length !== 25 || new Set(locations.map((s) => s.id)).size !== 25)
    throw new Error('El mapa debe contener exactamente 25 localidades únicas.');
  if (
    locations
      .filter((s) => s.type === 'central')
      .map((s) => s.id)
      .join() !== 'parana'
  )
    throw new Error('Paraná debe ser la única sede central.');
  for (const site of locations) {
    if (
      site.provinceId !== '30' ||
      !site.georefId.startsWith('30') ||
      !Number.isFinite(site.longitude) ||
      !Number.isFinite(site.latitude) ||
      !geoContains(boundary, [site.longitude, site.latitude])
    )
      throw new Error('Revisar ubicación oficial: ' + site.name);
  }
}
validateGeography();

export const mapLocations = locations.map((site) => {
  const [x, y] = projection([site.longitude, site.latitude])!;
  const side = x < 435 ? 'left' : 'right';
  const lines =
    site.id === 'concepcion-del-uruguay'
      ? ['Concepción', 'del Uruguay']
      : site.id === 'general-ramirez'
        ? ['General Ramírez']
        : [site.name];
  return { ...site, x, y, side, lines, labelY: y };
});

// Solo se desplazan rótulos; la base de cada asta permanece en projection(lon, lat).
for (const side of ['left', 'right']) {
  const column = mapLocations.filter((site) => site.side === side).sort((a, b) => a.y - b.y);
  let previous = 112;
  for (const site of column) {
    site.labelY = Math.max(site.y, previous + 45);
    previous = site.labelY + (site.lines.length - 1) * 22 + (site.type === 'central' ? 21 : 0);
  }
  let next = 830;
  for (const site of column.toReversed()) {
    site.labelY = Math.min(
      site.labelY,
      next - (site.lines.length - 1) * 22 - (site.type === 'central' ? 21 : 0),
    );
    next = site.labelY - 45;
  }
}

// Centrar los rótulos alrededor de sus puntos, sin desplazar toda la columna hacia el sur.
for (const side of ['left', 'right']) {
  const column = mapLocations
    .filter((site) => site.side === side)
    .sort((a, b) => a.labelY - b.labelY);
  const meanOffset =
    column.reduce((total, site) => total + site.labelY - site.y, 0) / column.length;
  const shift = Math.min(meanOffset, column[0].labelY - 130);
  column.forEach((site) => {
    site.labelY -= shift;
  });
}
