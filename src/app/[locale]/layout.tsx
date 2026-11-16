import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { fontVariables } from '@/app/fonts';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { LocaleSwitch } from '@/components/layout/LocaleSwitch';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { themeScript } from '@/components/theme/theme-script';
import { profile } from '@/content/profile';
import { routing, type Locale } from '@/i18n/routing';
import { SITE_URL } from '@/lib/site';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<'/[locale]'>): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const title = `${profile.name} — ${profile.title[locale]}`;
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description: profile.pitch[locale],
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(routing.locales.map((l) => [l, `/${l}`])),
    },
    openGraph: {
      type: 'website',
      siteName: profile.name,
      title,
      description: profile.pitch[locale],
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
    },
    twitter: { card: 'summary_large_image' },
  };
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
