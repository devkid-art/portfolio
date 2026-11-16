import { SHARE_SIZE, shareCard } from '@/components/seo/share-card';
import { profile } from '@/content/profile';
import { routing, type Locale } from '@/i18n/routing';

export const size = SHARE_SIZE;
export const contentType = 'image/png';
export const alt = 'Ruben — portfolio';

// Prerendered at build time, so the font files are read once during the build.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  return shareCard({
    kicker: profile.title[locale],
    title: profile.name,
    line: profile.pitch[locale],
    route: locale === 'fr' ? 'Douala ⟶ Nankin' : 'Douala ⟶ Nanjing',
    stamp: 'Portfolio',
  });
}
