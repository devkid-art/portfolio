import { profile } from '@/content/profile';
import { projects } from '@/content/projects';
import { TECH } from '@/content/tech';
import type { Locale } from '@/i18n/routing';
import { SITE_URL } from '@/lib/site';

/** schema.org Person for search engines. Placeholder links are left out until filled in. */
export function PersonJsonLd({ locale }: { locale: Locale }) {
  const sameAs = Object.values(profile.links).filter((url) => !url.includes('PLACEHOLDER_'));
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.title[locale],
    description: profile.pitch[locale],
    url: `${SITE_URL}/${locale}`,
    nationality: { '@type': 'Country', name: 'Cameroon' },
    homeLocation: { '@type': 'Place', name: 'Nanjing, China' },
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Nanjing Tech University', alternateName: '南京工业大学' },
    knowsLanguage: ['fr', 'en', 'zh'],
    knowsAbout: [...new Set(projects.flatMap((p) => p.stack))].map((id) => TECH[id].label),
    sameAs,
  };
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output escaped for safe inline embedding.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
