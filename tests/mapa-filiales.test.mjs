import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { geoContains, geoArea } from 'd3-geo';
import { boundary, locations, mapLocations, projection } from '../src/lib/mapa-filiales.ts';

test('el mapa contiene las 24 filiales del directorio y Paraná, sin duplicados', () => {
  const branches = JSON.parse(
    readFileSync(new URL('../src/content/branches.json', import.meta.url)),
  );
  assert.equal(locations.length, 25);
  assert.equal(new Set(locations.map((site) => site.id)).size, 25);
  assert.equal(new Set(locations.map((site) => site.georefId)).size, 25);
  assert.deepEqual(
    locations.map((site) => site.id).sort(),
    [...branches.map((site) => site.id), 'parana'].sort(),
  );
  for (const branch of branches)
    assert.equal(locations.find((site) => site.id === branch.id).name, branch.name);
  assert.deepEqual(
    locations.filter((site) => site.type === 'central').map((site) => site.id),
    ['parana'],
  );
  assert.equal(
    locations.find((site) => site.id === 'feliciano').officialName,
    'San José de Feliciano',
  );
});

test('las 25 coordenadas oficiales pertenecen a Entre Ríos y conservan su proyección', () => {
  assert.equal(boundary.properties.IN1, '30');
  assert(geoArea(boundary) < 0.01, 'El polígono no debe representar el complemento del planeta.');
  for (const site of mapLocations) {
    assert.equal(site.provinceId, '30');
    assert.match(site.georefId, /^30\d{6}$/);
    assert(geoContains(boundary, [site.longitude, site.latitude]), site.name);
    const [lon, lat] = projection.invert([site.x, site.y]);
    assert(Math.abs(lon - site.longitude) < 1e-9, site.name + ': longitud');
    assert(Math.abs(lat - site.latitude) < 1e-9, site.name + ': latitud');
    assert(site.labelY >= 100 && site.labelY < 840, site.name + ': rótulo fuera de lámina');
    assert.equal(site.address, null);
    assert.equal(site.contact, null);
  }
});
