import { getTranslations } from 'next-intl/server';
import { profile } from '@/content/profile';
import { projects } from '@/content/projects';
import { computeStats } from '@/content/stats';
import type { Locale } from '@/i18n/routing';
import { CountUp } from './CountUp';

/** A cargo manifest: four checkable facts, no skill percentages. */
export async function Stats({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'stats' });
  const { products, live, technologies } = computeStats(projects);
  const items = [
    { value: products, label: t('products') },
    { value: live, label: t('live') },
    { value: technologies, label: t('technologies') },
    { value: profile.languages[locale].length, label: t('languages') },
  ];

  return (
    <section aria-label={t('label')} className="mx-auto max-w-[1240px] px-5 md:px-8">
      <dl className="grid grid-cols-2 border-y-2 border-fg md:grid-cols-4">
        {items.map((item, i) => (
          <div
            key={item.label}
            className={`flex flex-col-reverse gap-1 px-1 py-5 md:px-6 ${i % 2 ? 'border-l border-line' : ''} ${i > 1 ? 'border-t border-line md:border-t-0' : ''} ${i === 2 ? 'md:border-l' : ''}`}
          >
            <dt className="text-sm text-muted md:text-base">{item.label}</dt>
            <dd className="font-stencil text-[clamp(3rem,7vw,4.75rem)] font-extrabold leading-none text-indigo">
              <CountUp value={item.value} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
