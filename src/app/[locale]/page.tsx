import { setRequestLocale } from 'next-intl/server';
import { use } from 'react';
import { Hero } from '@/components/hero/Hero';
import { FeaturedProjects } from '@/components/projects/FeaturedProjects';
import { RouteLine } from '@/components/route/RouteLine';
import { Contact } from '@/components/sections/Contact';
import { HowIWork } from '@/components/sections/HowIWork';
import { SkillsProof } from '@/components/sections/SkillsProof';
import { Stats } from '@/components/sections/Stats';
import { TicketSection } from '@/components/sections/TicketSection';
import type { Locale } from '@/i18n/routing';

export default function HomePage({ params }: PageProps<'/[locale]'>) {
  const { locale: raw } = use(params);
  const locale = raw as Locale;
  setRequestLocale(locale);
  return (
    <main>
      <Hero locale={locale} />
      <Stats locale={locale} />
      <div className="relative">
        <RouteLine />
        <FeaturedProjects locale={locale} />
        <TicketSection id="clients" category="client" namespace="clients" locale={locale} offset={5} />
        <TicketSection id="chantier" category="building" namespace="building" locale={locale} offset={7} />
        <SkillsProof locale={locale} />
        <HowIWork locale={locale} />
      </div>
      <Contact locale={locale} />
    </main>
  );
}
