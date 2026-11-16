import { setRequestLocale } from 'next-intl/server';
import { use } from 'react';
import { Hero } from '@/components/hero/Hero';
import { FeaturedProjects } from '@/components/projects/FeaturedProjects';
import { RouteLine } from '@/components/route/RouteLine';
import type { Locale } from '@/i18n/routing';

export default function HomePage({ params }: PageProps<'/[locale]'>) {
  const { locale: raw } = use(params);
  const locale = raw as Locale;
  setRequestLocale(locale);
  return (
    <main>
      <Hero locale={locale} />
      <div className="relative">
        <RouteLine />
        <FeaturedProjects locale={locale} />
      </div>
    </main>
  );
}
