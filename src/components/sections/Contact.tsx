import { getTranslations } from 'next-intl/server';
import { profile } from '@/content/profile';
import type { Locale } from '@/i18n/routing';

/**
 * Ndop-inspired tile: white geometric marks on indigo (lines, lozenges, rings), after the royal
 * resist-dyed cloth of Cameroon's Grassfields. Same colours in both themes.
 */
const NDOP_TILE = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='96' height='96' viewBox='0 0 96 96' fill='none' stroke='white' stroke-width='3'>
    <path d='M0 12h96M0 84h96'/>
    <path d='M24 30l12 18-12 18-12-18z'/>
    <circle cx='72' cy='48' r='11'/><circle cx='72' cy='48' r='3' fill='white'/>
    <path d='M48 24v48M42 30h12M42 66h12'/>
  </svg>`,
)}")`;

export async function Contact({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'contact' });
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative mt-10 overflow-hidden bg-[#1f2c78] text-white">
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.13]" style={{ backgroundImage: NDOP_TILE }} />
      <div className="relative mx-auto max-w-[1240px] px-5 py-20 md:px-8 md:py-28">
        <h2 id="contact-title" className="font-display text-[clamp(3rem,8vw,6.5rem)] font-extrabold leading-[0.9]">
          {t('title')}
        </h2>
        <p className="mt-6 max-w-[48ch] text-lg text-white/85">{t('text')}</p>
        <p className="mt-2 text-white/85">{profile.languages[locale].join(', ')}</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href={profile.links.linkedin}
            className="inline-flex min-h-12 items-center rounded-[10px] bg-white px-6 font-semibold text-[#1f2c78] transition-transform hover:-translate-y-0.5"
          >
            LinkedIn
          </a>
          <a
            href={profile.links.github}
            className="inline-flex min-h-12 items-center rounded-[10px] border-2 border-white px-6 font-semibold transition-colors hover:bg-white/10"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
