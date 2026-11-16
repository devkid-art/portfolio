import { geoOrthographic, geoPath } from 'd3-geo';
import landDots from '@/content/land-dots.json';
import { PLACES } from '@/content/places';
import type { Locale } from '@/i18n/routing';
import { GLOBE_CENTER, LABELLED, lngLat, ROUTES } from './routes';

const SIZE = 560;

/**
 * Server-rendered globe: the first paint, the reduced-motion view and the no-WebGL view.
 * All land dots are one path of zero-length round-capped segments, to keep the HTML small.
 */
export function GlobeFallback({ locale }: { locale: Locale }) {
  const projection = geoOrthographic()
    .scale(SIZE / 2 - 8)
    .translate([SIZE / 2, SIZE / 2])
    .rotate([-GLOBE_CENTER.lng, -GLOBE_CENTER.lat])
    .clipAngle(90);
  const path = geoPath(projection);

  // A point is on the visible hemisphere when its angular distance to the centre is < 90°.
  const center = [GLOBE_CENTER.lng, GLOBE_CENTER.lat].map((d) => (d * Math.PI) / 180);
  const visible = (lng: number, lat: number) => {
    const [l0, p0] = center;
    const l = (lng * Math.PI) / 180;
    const p = (lat * Math.PI) / 180;
    return Math.sin(p0) * Math.sin(p) + Math.cos(p0) * Math.cos(p) * Math.cos(l - l0) > 0.02;
  };

  let dots = '';
  for (const [lng, lat] of landDots as [number, number][]) {
    if (!visible(lng, lat)) continue;
    const xy = projection([lng, lat]);
    if (xy) dots += `M${xy[0].toFixed(1)} ${xy[1].toFixed(1)}h0`;
  }

  return (
    <svg
      data-globe-fallback=""
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className="h-auto w-full"
    >
      <circle cx={SIZE / 2} cy={SIZE / 2} r={SIZE / 2 - 8} className="fill-surface stroke-line" strokeWidth="1" />
      <path d={dots} className="stroke-indigo" strokeOpacity="0.55" strokeWidth="3.2" strokeLinecap="round" />
      {ROUTES.map(({ from, to, primary }) => (
        <path
          key={`${from}-${to}`}
          d={path({ type: 'LineString', coordinates: [lngLat(from), lngLat(to)] }) ?? ''}
          fill="none"
          className={primary ? 'stroke-accent' : 'stroke-indigo'}
          strokeWidth={primary ? 2.6 : 1.4}
          strokeDasharray={primary ? undefined : '4 5'}
          strokeLinecap="round"
        />
      ))}
      {LABELLED.map((id) => {
        const xy = projection(lngLat(id));
        if (!xy) return null;
        return (
          <g key={id}>
            <circle cx={xy[0]} cy={xy[1]} r="5.5" className="fill-accent" />
            <text
              x={xy[0] + (id === 'douala' ? -10 : 10)}
              y={xy[1] - 10}
              textAnchor={id === 'douala' ? 'end' : 'start'}
              className="fill-fg font-display text-[22px] font-bold"
            >
              {PLACES[id].name[locale]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
