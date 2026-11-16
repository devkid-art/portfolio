import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';

const STEPS = ['need', 'spec', 'architecture', 'build', 'test', 'ship'] as const;

/** A real sequence, so numbered stops on the route are earned here. */
export async function HowIWork({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'process' });
  return (
    <section id="methode" aria-labelledby="methode-title" className="mx-auto max-w-[1240px] px-5 py-14 md:px-8 md:py-20">
      <h2 id="methode-title" className="font-display text-[clamp(2.2rem,5vw,3.6rem)] font-extrabold leading-none">
        {t('title')}
      </h2>
      <p className="mt-4 max-w-[62ch]">{t('intro')}</p>
      <ol className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {STEPS.map((step, i) => (
          <li key={step} className="relative border-t-2 border-fg pt-4">
            <span aria-hidden="true" className="absolute -top-[9px] left-0 size-4 rounded-full border-2 border-fg bg-bg" />
            <p className="font-stencil text-lg font-extrabold text-muted">{String(i + 1).padStart(2, '0')}</p>
            <h3 className="mt-1 font-display text-2xl font-bold">{t(`steps.${step}.title`)}</h3>
            <p className="mt-2 text-[1rem] text-muted">{t(`steps.${step}.text`)}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
