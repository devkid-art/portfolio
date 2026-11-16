import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['fr', 'en'],
  defaultLocale: 'fr',
  // The spec fixes French as the landing language; visitors switch with the language toggle.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
