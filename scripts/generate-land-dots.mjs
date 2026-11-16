// Builds src/content/land-dots.json: an evenly spaced grid of [lng, lat] points on land,
// used by the globe (3D) and its static SVG fallback. Run: node scripts/generate-land-dots.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { geoContains } from 'd3-geo';
import { feature } from 'topojson-client';

const topo = JSON.parse(readFileSync('node_modules/world-atlas/land-110m.json', 'utf8'));
const land = feature(topo, topo.objects.land);

const STEP = 2.2; // degrees of latitude between rows
const dots = [];
for (let lat = -56; lat <= 78; lat += STEP) {
  // Widen longitude spacing toward the poles so dots stay evenly spread on the sphere.
  const lngStep = STEP / Math.max(Math.cos((lat * Math.PI) / 180), 0.25);
  for (let lng = -180; lng < 180; lng += lngStep) {
    if (geoContains(land, [lng, lat])) dots.push([Number(lng.toFixed(1)), Number(lat.toFixed(1))]);
  }
}

writeFileSync('src/content/land-dots.json', JSON.stringify(dots));
console.log(`${dots.length} land dots written`);
