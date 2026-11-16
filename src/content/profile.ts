import type { Localized } from './types';

/**
 * Values still waiting for the owner start with PLACEHOLDER_ (full name, LinkedIn URL, photo).
 * A deployment check refuses to publish while any remains.
 */
export const profile = {
  name: 'Ruben',
  title: {
    fr: 'Développeur full-stack web & mobile',
    en: 'Full-stack web & mobile developer',
  } satisfies Localized,
  pitch: {
    fr: 'Je conçois et livre des produits complets — du besoin à la mise en ligne — qui relient l’Afrique et la Chine.',
    en: 'I design and ship complete products — from the first need to production — that connect Africa and China.',
  } satisfies Localized,
  school: {
    fr: 'Étudiant en génie logiciel à Nanjing Tech University (南京工业大学) — fin de licence, master à venir',
    en: 'Software engineering student at Nanjing Tech University (南京工业大学) — finishing my bachelor’s, master’s next',
  } satisfies Localized,
  origin: {
    fr: 'Camerounais, je vis et je construis en Chine.',
    en: 'Cameroonian, living and building in China.',
  } satisfies Localized,
  role: {
    fr: 'Chef de projet & développeur — parfois seul, parfois en équipe.',
    en: 'Project lead & developer — sometimes solo, sometimes with a team.',
  } satisfies Localized,
  languages: {
    fr: ['Français', 'Anglais', 'Chinois (notions)'],
    en: ['French', 'English', 'Chinese (basic)'],
  } satisfies Localized<string[]>,
  links: {
    github: 'https://github.com/devkid-art',
    linkedin: 'https://www.linkedin.com/in/PLACEHOLDER_LINKEDIN',
  },
  photo: 'PLACEHOLDER_PHOTO',
} as const;
