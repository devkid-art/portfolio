import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function NotFound() {
  const t = useTranslations('notFound');
  return (
    <main className="mx-auto max-w-[1240px] px-5 py-24 md:px-8">
      <p className="font-stencil text-2xl font-extrabold text-accent">404</p>
      <h1 className="mt-2 font-display text-[clamp(2.8rem,8vw,5.5rem)] font-extrabold leading-none">{t('title')}</h1>
      <p className="mt-5 max-w-[50ch] text-lg">{t('text')}</p>
      <Link href="/" className="mt-8 inline-flex min-h-12 items-center rounded-[10px] bg-accent px-6 font-semibold text-accent-ink">
        {t('home')}
      </Link>
    </main>
  );
}
