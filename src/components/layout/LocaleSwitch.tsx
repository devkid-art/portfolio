'use client';

import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';

/** Offers the other language and keeps the visitor on the same page. */
export function LocaleSwitch() {
  const locale = useLocale();
  const pathname = usePathname();
  const other = locale === 'fr' ? 'en' : 'fr';
  return (
    <Link
      href={pathname}
      locale={other}
      lang={other}
      className="grid h-11 place-items-center rounded-full border border-line px-4 text-sm font-semibold transition-colors hover:border-indigo"
    >
      {other === 'en' ? 'English' : 'Français'}
    </Link>
  );
}
