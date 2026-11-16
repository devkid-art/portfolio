import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ProjectMedia } from '@/components/projects/ProjectMedia';
import { Stamp } from '@/components/projects/Stamp';
import { Gallery } from '@/components/case/Gallery';
import { getProject, projects } from '@/content/projects';
import { profile } from '@/content/profile';
import { TECH } from '@/content/tech';
import { routeCode } from '@/content/ticket';
import { Link } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => projects.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: PageProps<'/[locale]/projets/[slug]'>): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const l = locale as Locale;
  return {
    title: `${project.name} — ${profile.name}`,
    description: project.tagline[l],
    openGraph: {
      type: 'article',
      siteName: profile.name,
      title: `${project.name} — ${profile.name}`,
      description: project.tagline[l],
      locale: l === 'fr' ? 'fr_FR' : 'en_US',
    },
    alternates: {
      canonical: `/${l}/projets/${slug}`,
      languages: Object.fromEntries(routing.locales.map((x) => [x, `/${x}/projets/${slug}`])),
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps<'/[locale]/projets/[slug]'>) {
  const { locale: raw, slug } = await params;
  const locale = raw as Locale;
  setRequestLocale(locale);
  const project = getProject(slug);
  if (!project) notFound();

  const t = await getTranslations({ locale, namespace: 'case' });
  const ts = await getTranslations({ locale, namespace: 'ticket' });
  const { default: Body } = await import(`@/content/case-studies/${slug}.${locale}.mdx`);

  return (
    <main className="mx-auto max-w-[1240px] px-5 pb-20 md:px-8">
      <Link href="/#projets" className="inline-block py-2 text-muted underline decoration-line underline-offset-4 hover:text-fg">
        {t('back')}
      </Link>

      <header className="mt-6 grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-end">
        <div>
          <p className="font-stencil text-xl font-extrabold text-muted">
            {project.code} <span className="text-indigo">{routeCode(project)}</span>
          </p>
          <h1 className="mt-2 font-display text-[clamp(3.2rem,9vw,7rem)] font-extrabold leading-[0.88]">{project.name}</h1>
          <p className="mt-5 max-w-[46ch] text-xl leading-snug">{project.tagline[locale]}</p>
          {project.statusNote && <p className="mt-3 max-w-[60ch] text-muted">{project.statusNote[locale]}</p>}
          <div className="mt-6 flex flex-wrap items-center gap-5">
            <Stamp>{ts(`status.${project.status}`, { progress: project.progress ?? 0 })}</Stamp>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener"
                className="inline-flex min-h-12 items-center rounded-[10px] bg-accent px-6 font-semibold text-accent-ink"
              >
                {ts('openSite')}
              </a>
            )}
          </div>
        </div>
        <ProjectMedia project={project} label={ts('mediaLabel', { name: project.name })} />
      </header>

      <div className="mt-14 grid gap-12 md:grid-cols-[1fr_280px]">
        <article data-case-body="">
          <h2 className="font-display text-[clamp(1.9rem,4vw,2.6rem)] font-extrabold leading-none">{t('problem')}</h2>
          <p className="mt-4 max-w-[68ch]">{project.problem[locale]}</p>
          <Body />
        </article>
        <aside className="md:sticky md:top-8 md:self-start">
          <h2 className="font-display text-2xl font-bold">{t('role')}</h2>
          <p className="mt-2 text-muted">{profile.role[locale]}</p>
          <h2 className="mt-8 font-display text-2xl font-bold">{t('stack')}</h2>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {project.stack.map((id) => (
              <li key={id} className="rounded-full border border-line px-2.5 py-0.5 text-sm">
                {TECH[id].label}
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <Gallery project={project} title={t('gallery')} />
    </main>
  );
}
