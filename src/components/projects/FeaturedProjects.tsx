import { getTranslations } from 'next-intl/server';
import { projects } from '@/content/projects';
import type { Locale } from '@/i18n/routing';
import { HorizontalPin } from './HorizontalPin';
import { ProjectTicket } from './ProjectTicket';

export async function FeaturedProjects({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'projects' });
  const featured = projects.filter((p) => p.category === 'featured');

  return (
    <section id="projets" aria-labelledby="projets-title" className="scroll-mt-0">
      <HorizontalPin
        header={
          <div className="mx-auto max-w-[1240px] px-5 md:px-8">
            <h2 id="projets-title" className="font-display text-[clamp(2.6rem,6vw,4.5rem)] font-extrabold leading-none">
              {t('title')}
            </h2>
            <p className="mt-4 max-w-[60ch] text-muted">{t('intro')}</p>
          </div>
        }
      >
        {featured.map((project, i) => (
          <ProjectTicket key={project.slug} project={project} locale={locale} index={i} />
        ))}
      </HorizontalPin>
    </section>
  );
}
