import { SHARE_SIZE, shareCard } from '@/components/seo/share-card';
import { profile } from '@/content/profile';
import type { Locale } from '@/i18n/routing';

export const size = SHARE_SIZE;
export const contentType = 'image/png';
export const alt = 'Ruben — portfolio';

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
