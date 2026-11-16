'use client';

import { useLocale } from 'next-intl';
import { usePathname } from '@/i18n/navigation';

/**
 * Offers the other language and keeps the visitor on the same page. A plain link on purpose:
 * the <html> element (lang, theme script) lives in the locale layout, so switching language is a
 * full page load — a client-side switch would re-render <html> and drop the saved theme.
 */
export function LocaleSwitch() {
  const locale = useLocale();
  const pathname = usePathname();
  const other = locale === 'fr' ? 'en' : 'fr';
  const href = `/${other}${pathname === '/' ? '' : pathname}`;
  return (
    <a
      href={href}
      hrefLang={other}
      lang={other}
      className="grid h-11 place-items-center rounded-full border border-line px-4 text-sm font-semibold transition-colors hover:border-indigo"
    >
      {other === 'en' ? 'English' : 'Français'}
    </a>
  );
}
