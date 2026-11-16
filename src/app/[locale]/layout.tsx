import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { fontVariables } from '@/app/fonts';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { LocaleSwitch } from '@/components/layout/LocaleSwitch';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { themeScript } from '@/components/theme/theme-script';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LayoutProps<'/[locale]'>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    // data-theme is set by themeScript before hydration, hence suppressHydrationWarning.
    <html lang={locale} className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <NextIntlClientProvider>
          <MotionProvider>
            <Header localeSwitch={<LocaleSwitch />} />
            {children}
            <Footer locale={locale} />
          </MotionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
