import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/motion/Reveal';
import { profile } from '@/content/profile';
import type { Locale } from '@/i18n/routing';
import { GlobeFallback } from './GlobeFallback';
import { GlobeLoader } from './GlobeLoader';

export function Hero({ locale }: { locale: Locale }) {
  const t = useTranslations('hero');
  return (
    <section className="mx-auto grid max-w-[1240px] items-center gap-8 px-5 pb-16 pt-4 md:grid-cols-12 md:gap-6 md:px-8 md:pb-24 md:pt-10">
      <Reveal className="md:col-span-7">
        <h1 className="font-display text-[clamp(5.5rem,19vw,11.5rem)] font-extrabold leading-[0.82] tracking-[-0.015em]">
          {profile.name}
        </h1>
        <p className="mt-3 font-display text-[clamp(1.65rem,3.4vw,2.6rem)] font-semibold leading-tight text-indigo">
          {profile.title[locale]}
        </p>
        <p className="mt-6 max-w-[36ch] text-[1.2rem] leading-snug md:text-[1.35rem]">{profile.pitch[locale]}</p>
        <p className="mt-5 max-w-[62ch] text-muted">
          {profile.school[locale]}. {profile.origin[locale]}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#projets"
            className="inline-flex min-h-12 items-center rounded-[10px] bg-accent px-6 font-semibold text-accent-ink transition-transform hover:-translate-y-0.5"
          >
            {t('cta')}
          </a>
          <a
            href={profile.links.github}
            className="inline-flex min-h-12 items-center rounded-[10px] border-2 border-fg px-6 font-semibold transition-colors hover:border-indigo hover:text-indigo"
          >
            GitHub
          </a>
        </div>
      </Reveal>
      <div className="md:col-span-5">
        <GlobeLoader label={t('globeLabel')}>
          <GlobeFallback locale={locale} />
        </GlobeLoader>
        <p className="mt-3 text-center text-sm text-muted">{t('journey')}</p>
      </div>
    </section>
  );
}
