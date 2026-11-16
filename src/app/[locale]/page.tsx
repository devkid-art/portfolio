import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { use } from 'react';
import { Reveal } from '@/components/motion/Reveal';

export default function HomePage({ params }: PageProps<'/[locale]'>) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations('home');
  return (
    <main>
      <Reveal>
        <h1>{t('title')}</h1>
      </Reveal>
    </main>
  );
}
