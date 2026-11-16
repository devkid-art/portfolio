import { getTranslations } from 'next-intl/server';
import { projects, projectsUsing } from '@/content/projects';
import { TECH, TECH_GROUPS, type TechId } from '@/content/tech';
import type { Locale } from '@/i18n/routing';
import { SkillsBoard, type BoardGroup } from './SkillsBoard';

export async function SkillsProof({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'skills' });
  const ids = Object.keys(TECH) as TechId[];
  const groups: BoardGroup[] = TECH_GROUPS.map((group) => ({
    id: group,
    label: t(`groups.${group}`),
    techs: ids
      .filter((id) => TECH[id].group === group)
      .map((id) => ({ id, label: TECH[id].label, count: projectsUsing(id).length }))
      .filter((tech) => tech.count > 0)
      .sort((a, b) => b.count - a.count),
  }));

  return (
    <section id="competences" aria-labelledby="competences-title" className="mx-auto max-w-[1240px] px-5 py-14 md:px-8 md:py-20">
      <h2 id="competences-title" className="font-display text-[clamp(2.2rem,5vw,3.6rem)] font-extrabold leading-none">
        {t('title')}
      </h2>
      <p className="mt-4 max-w-[60ch] text-muted">{t('intro')}</p>
      <SkillsBoard
        groups={groups}
        projects={projects.map(({ slug, name, code, stack }) => ({ slug, name, code, stack }))}
        hint={t('hint')}
        usedIn={t.raw('usedIn') as string}
      />
    </section>
  );
}
