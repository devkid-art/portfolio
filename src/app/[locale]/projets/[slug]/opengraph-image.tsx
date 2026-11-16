import { getTranslations } from 'next-intl/server';
import { SHARE_SIZE, shareCard } from '@/components/seo/share-card';
import { getProject } from '@/content/projects';
import { routeCode } from '@/content/ticket';
import type { Locale } from '@/i18n/routing';

export const size = SHARE_SIZE;
export const contentType = 'image/png';
export const alt = 'Project case study';

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
