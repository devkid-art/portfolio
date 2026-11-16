import type { Locale } from '@/i18n/routing';

export const PLACES = {
  douala: { name: { fr: 'Douala', en: 'Douala' }, lat: 4.0511, lng: 9.7679 },
  yaounde: { name: { fr: 'Yaoundé', en: 'Yaoundé' }, lat: 3.848, lng: 11.5021 },
  nanjing: { name: { fr: 'Nankin', en: 'Nanjing' }, lat: 32.0603, lng: 118.7969 },
  guangzhou: { name: { fr: 'Canton', en: 'Guangzhou' }, lat: 23.1291, lng: 113.2644 },
  shanghai: { name: { fr: 'Shanghai', en: 'Shanghai' }, lat: 31.2304, lng: 121.4737 },
  beijing: { name: { fr: 'Pékin', en: 'Beijing' }, lat: 39.9042, lng: 116.4074 },
} as const satisfies Record<string, { name: Record<Locale, string>; lat: number; lng: number }>;

export type PlaceId = keyof typeof PLACES;
