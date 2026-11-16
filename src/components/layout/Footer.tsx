import { getTranslations } from 'next-intl/server';
import { profile } from '@/content/profile';
import type { Locale } from '@/i18n/routing';

export async function Footer({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'footer' });
  return (
    <footer className="mx-auto flex max-w-[1240px] flex-wrap items-baseline justify-between gap-3 px-5 py-8 text-sm text-muted md:px-8">
      <p>
        © {new Date().getFullYear()} {profile.name}
      </p>
      <p>{t('built')}</p>
    </footer>
  );
}
