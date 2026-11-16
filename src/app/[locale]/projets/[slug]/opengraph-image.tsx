import { getTranslations } from 'next-intl/server';
import { SHARE_SIZE, shareCard } from '@/components/seo/share-card';
import { getProject, projects } from '@/content/projects';
import { routeCode } from '@/content/ticket';
import { routing, type Locale } from '@/i18n/routing';

export const size = SHARE_SIZE;
export const contentType = 'image/png';
export const alt = 'Project case study';

// Prerendered at build time, so the font files are read once during the build.
export function generateStaticParams() {
  return routing.locales.flatMap((locale) => projects.map((p) => ({ locale, slug: p.slug })));
}

export default async function Image({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: raw, slug } = await params;
  const locale = raw as Locale;
  const project = getProject(slug)!;
  const t = await getTranslations({ locale, namespace: 'ticket' });
  return shareCard({
    kicker: project.code,
    title: project.name,
    line: project.tagline[locale],
    route: routeCode(project),
    stamp: t(`status.${project.status}`, { progress: project.progress ?? 0 }),
  });
}
