import { getTranslations } from 'next-intl/server';
import { ProjectTicket } from '@/components/projects/ProjectTicket';
import { projects } from '@/content/projects';
import type { ProjectCategory } from '@/content/types';
import type { Locale } from '@/i18n/routing';

/** A stacked list of tickets for one category (client work, under construction). */
export async function TicketSection({
  id,
  category,
  namespace,
  locale,
  offset,
}: {
  id: string;
  category: ProjectCategory;
  namespace: 'clients' | 'building';
  locale: Locale;
  offset: number;
}) {
  const t = await getTranslations({ locale, namespace });
  const list = projects.filter((p) => p.category === category);

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="mx-auto max-w-[1240px] px-5 py-14 md:px-8 md:py-20">
      <h2 id={`${id}-title`} className="font-display text-[clamp(2.2rem,5vw,3.6rem)] font-extrabold leading-none">
        {t('title')}
      </h2>
      <p className="mt-4 max-w-[60ch] text-muted">{t('intro')}</p>
      <div className="mt-10 flex flex-col gap-8">
        {list.map((project, i) => (
          <ProjectTicket key={project.slug} project={project} locale={locale} index={offset + i} />
        ))}
      </div>
    </section>
  );
}
