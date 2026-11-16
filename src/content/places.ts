import type { Locale } from '@/i18n/routing';

/** `code` is the city's airport code, printed on project tickets like a cargo label. */
export const PLACES = {
  douala: { name: { fr: 'Douala', en: 'Douala' }, code: 'DLA', country: 'cm', lat: 4.0511, lng: 9.7679 },
  yaounde: { name: { fr: 'Yaoundé', en: 'Yaoundé' }, code: 'NSI', country: 'cm', lat: 3.848, lng: 11.5021 },
  nanjing: { name: { fr: 'Nankin', en: 'Nanjing' }, code: 'NKG', country: 'cn', lat: 32.0603, lng: 118.7969 },
  guangzhou: { name: { fr: 'Canton', en: 'Guangzhou' }, code: 'CAN', country: 'cn', lat: 23.1291, lng: 113.2644 },
  shanghai: { name: { fr: 'Shanghai', en: 'Shanghai' }, code: 'PVG', country: 'cn', lat: 31.2304, lng: 121.4737 },
  beijing: { name: { fr: 'Pékin', en: 'Beijing' }, code: 'PEK', country: 'cn', lat: 39.9042, lng: 116.4074 },
} as const satisfies Record<
  string,
  { name: Record<Locale, string>; code: string; country: 'cm' | 'cn'; lat: number; lng: number }
>;

export type PlaceId = keyof typeof PLACES;
