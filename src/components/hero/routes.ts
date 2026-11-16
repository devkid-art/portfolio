import { PLACES, type PlaceId } from '@/content/places';

/** The globe faces this point: Africa on the left, China on the right. */
export const GLOBE_CENTER = { lng: 62, lat: 14 } as const;

/** First route is the owner's own journey; the others are where his products travel. */
export const ROUTES: { from: PlaceId; to: PlaceId; primary?: boolean }[] = [
  { from: 'douala', to: 'nanjing', primary: true },
  { from: 'douala', to: 'guangzhou' },
  { from: 'yaounde', to: 'beijing' },
  { from: 'douala', to: 'shanghai' },
];

export const LABELLED: PlaceId[] = ['douala', 'nanjing'];

export function lngLat(id: PlaceId): [number, number] {
  return [PLACES[id].lng, PLACES[id].lat];
}
