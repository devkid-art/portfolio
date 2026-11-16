import { getTranslations } from 'next-intl/server';
import { routeCode } from '@/content/ticket';
import { TECH } from '@/content/tech';
import type { Project } from '@/content/types';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { ProjectMedia } from './ProjectMedia';
import { Stamp } from './Stamp';
import { TicketQR } from './TicketQR';

const MAX_CHIPS = 6;
const TILTS = [-6, 4, -3, 5, -5, 3, -4, 6];

export async function ProjectTicket({ project, locale, index }: { project: Project; locale: Locale; index: number }) {
  const t = await getTranslations({ locale, namespace: 'ticket' });
  const chips = project.stack.slice(0, MAX_CHIPS);
  const more = project.stack.length - chips.length;

  return (
    <article
      data-ticket=""
      data-slug={project.slug}
      className="ticket relative grid w-full overflow-hidden rounded-[14px] border border-line bg-surface md:grid-cols-[1fr_220px]"
    >
      <div className="grid gap-6 p-5 md:grid-cols-[1.15fr_1fr] md:p-7">
        <ProjectMedia project={project} label={t('mediaLabel', { name: project.name })} />
        <div className="flex flex-col">
          <h3 className="font-display text-[clamp(2rem,3.4vw,2.8rem)] font-extrabold leading-[0.95]">{project.name}</h3>
          <p className="mt-3 text-[1.05rem] leading-snug">{project.tagline[locale]}</p>
          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={t('stack')}>
            {chips.map((id) => (
              <li key={id} className="rounded-full border border-line px-2.5 py-0.5 text-sm text-muted">
                {TECH[id].label}
              </li>
            ))}
            {more > 0 && <li className="px-1 py-0.5 text-sm text-muted">+{more}</li>}
          </ul>
          <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-6">
            <Link
              href={`/projets/${project.slug}`}
              className="font-semibold text-indigo underline decoration-2 underline-offset-4 hover:decoration-accent"
            >
              {t('caseStudy')}
            </Link>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener"
                className="font-semibold underline decoration-line decoration-2 underline-offset-4 hover:decoration-accent"
              >
                {t('openSite')}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Stub: separated by a perforation, like the tear-off part of an air waybill. */}
      <div className="ticket-stub relative flex items-center justify-between gap-4 border-t-2 border-dashed border-line p-5 md:flex-col md:items-start md:justify-start md:border-l-2 md:border-t-0 md:p-6">
        <div>
          <p data-code="" className="font-stencil text-[1.7rem] font-extrabold leading-none tracking-wide">
            {project.code}
          </p>
          <p className="mt-2 font-display text-xl font-semibold text-indigo">{routeCode(project)}</p>
          <p className="text-sm text-muted">{project.year}</p>
        </div>
        {project.liveUrl && (
          <div className="hidden md:mt-6 md:block">
            <TicketQR url={project.liveUrl} label={t('qrLabel', { name: project.name })} />
          </div>
        )}
        <div className="md:mt-auto">
          <Stamp tilt={TILTS[index % TILTS.length]}>
            {t(`status.${project.status}`, { progress: project.progress ?? 0 })}
          </Stamp>
        </div>
      </div>
    </article>
  );
}
