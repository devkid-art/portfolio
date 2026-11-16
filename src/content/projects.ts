import type { TechId } from './tech';
import type { Project } from './types';

const media = (slug: string) => ({
  poster: `/media/${slug}/poster.webp`,
  /** Base path: the player loads `${video}.webm` and `${video}.mp4`. */
  video: `/media/${slug}/loop`,
  shots: [`/media/${slug}/shot-1.webp`, `/media/${slug}/shot-2.webp`],
});

export const projects: Project[] = [
  {
    slug: 'student-network-china',
    code: 'PRJ-SNC-001',
    name: 'Student Network China',
    category: 'featured',
    status: 'live',
    year: 2026,
    liveUrl: 'https://app.studybridgechina.uk',
    tagline: {
      fr: 'Le réseau social des étudiants en Chine, en français, anglais et chinois.',
      en: 'The social network for students in China, in English, French and Chinese.',
    },
    problem: {
      fr: 'Étudiants internationaux et chinois n’avaient pas d’espace commun pour se trouver, rejoindre leur université ou leur ville, s’entraider et s’organiser.',
      en: 'International and Chinese students had no shared place to find each other, join their university or city, help one another and get organised.',
    },
    highlights: {
      fr: [
        'Messagerie en temps réel (Socket.IO) et appels vidéo (Agora)',
        'Communautés par université, ville et centre d’intérêt, événements, questions-réponses et guide étudiant',
        'Trois langues de bout en bout et application Android publiée via TWA',
        'Tâches de fond, temps réel et limites de débit sur PostgreSQL seul — sans Redis',
      ],
      en: [
        'Real-time messaging (Socket.IO) and video calls (Agora)',
        'University, city and interest communities, events, Q&A and a student guide',
        'Three languages end to end and an Android app shipped as a TWA',
        'Background jobs, realtime fan-out and rate limits on PostgreSQL alone — no Redis',
      ],
    },
    stack: [
      'nextjs', 'react', 'typescript', 'tailwind', 'tanstack-query', 'next-intl', 'nestjs', 'socketio',
      'postgresql', 'prisma', 'pg-boss', 'android-twa', 'web-push', 'jest', 'playwright', 'zod', 'agora', 's3',
      'github-actions', 'vercel', 'render',
    ] satisfies TechId[],
    places: ['nanjing', 'beijing', 'shanghai', 'guangzhou', 'douala'],
    media: media('student-network-china'),
  },
  {
    slug: 'studybridge',
    code: 'PRJ-STB-002',
    name: 'StudyBridge',
    category: 'featured',
    status: 'live',
    year: 2026,
    liveUrl: 'https://www.studybridgechina.uk',
    tagline: {
      fr: 'La plateforme B2B des agences qui inscrivent des étudiants dans les universités chinoises.',
      en: 'The B2B platform for agencies enrolling students in Chinese universities.',
    },
    problem: {
      fr: 'Les agences éducatives géraient bourses, dossiers et paiements à la main, sans catalogue fiable ni suivi de leurs étudiants.',
      en: 'Education agencies handled scholarships, applications and payments by hand, with no reliable catalogue or student tracking.',
    },
    highlights: {
      fr: [
        'Catalogue de bourses, universités et programmes avec filtres détaillés',
        'Espace agent : portefeuille, commandes, étudiants, favoris et messagerie',
        'Paliers d’agents de 0 à 7 étoiles avec remises calculées automatiquement',
        'Recharges par Stripe (cartes et Alipay), e-mails transactionnels et documents sur Cloudinary',
      ],
      en: [
        'Scholarship, university and programme catalogue with detailed filters',
        'Agent workspace: wallet, orders, students, favourites and messages',
        '0–7 star agent tiers with automatically computed discounts',
        'Stripe top-ups (cards and Alipay), transactional e-mails and documents on Cloudinary',
      ],
    },
    stack: [
      'nextjs', 'react', 'typescript', 'tailwind', 'nodejs', 'express', 'postgresql', 'prisma', 'zod',
      'stripe', 'cloudinary', 'resend', 'web-push', 'vercel',
    ],
    places: ['douala', 'beijing', 'shanghai'],
    media: media('studybridge'),
  },
  {
    slug: 'ridelab',
    code: 'PRJ-RDL-003',
    name: 'RIDELAB',
    category: 'featured',
    status: 'live',
    year: 2026,
    liveUrl: 'https://ridelab-pink.vercel.app',
    tagline: {
      fr: 'Marketplace de véhicules, engins lourds et pièces en provenance de Chine.',
      en: 'A marketplace for vehicles, heavy equipment and parts sourced from China.',
    },
    problem: {
      fr: 'Acheter un engin en Chine depuis l’Afrique passait par des photos éparpillées et des échanges flous, sans référence produit commune.',
      en: 'Buying equipment in China from Africa meant scattered photos and vague chats, with no shared product reference.',
    },
    highlights: {
      fr: [
        'Recherche plein texte tolérante aux fautes (PostgreSQL pg_trgm) et filtres par type, marque et caractéristiques',
        'Chaque demande WhatsApp porte l’identifiant exact du produit (RID-EQP-00021)',
        'Équipe d’administration à rôles, avec liens d’activation à usage unique',
        'Photos optimisées sur Cloudinary, plusieurs devises',
      ],
      en: [
        'Typo-tolerant full-text search (PostgreSQL pg_trgm) with type, brand and spec filters',
        'Every WhatsApp inquiry carries the exact product ID (RID-EQP-00021)',
        'Role-based admin team with single-use activation links',
        'Optimised photos on Cloudinary, multiple currencies',
      ],
    },
    stack: ['nextjs', 'react', 'typescript', 'tailwind', 'postgresql', 'prisma', 'zod', 'vitest', 'cloudinary', 'whatsapp', 'vercel'],
    places: ['guangzhou', 'douala'],
    media: media('ridelab'),
  },
  {
    slug: 'colisa',
    code: 'PRJ-CLS-004',
    name: 'Colisa',
    category: 'featured',
    status: 'ready',
    year: 2026,
    tagline: {
      fr: 'Le SaaS de suivi de colis pour les transitaires import-export.',
      en: 'Parcel-tracking SaaS for import-export freight forwarders.',
    },
    problem: {
      fr: 'Les transitaires suivaient colis, conteneurs et paiements dans des carnets et des groupes WhatsApp ; leurs clients appelaient sans cesse pour savoir où en était leur colis.',
      en: 'Forwarders tracked parcels, containers and payments in notebooks and WhatsApp groups, and customers kept calling to ask where their parcel was.',
    },
    highlights: {
      fr: [
        'Suivi par code ou scan de QR code, étiquettes imprimables',
        'Quatre espaces : super admin, entreprise, employé, client final',
        'Notification WhatsApp à chaque changement de statut, quotas selon le forfait',
        'Prix calculés (€/kg aérien, €/m³ maritime), paiements partiels, export CSV, FR/EN, clair/sombre',
      ],
      en: [
        'Tracking by code or QR scan, printable labels',
        'Four workspaces: super admin, company, employee, end customer',
        'WhatsApp notification on every status change, quotas per plan',
        'Computed prices (€/kg air, €/m³ sea), partial payments, CSV export, FR/EN, light/dark',
      ],
    },
    stack: ['nodejs', 'express', 'sqlite', 'vanilla-js', 'responsive', 'whatsapp'],
    places: ['guangzhou', 'douala'],
    media: media('colisa'),
  },
  {
    slug: 'reserve',
    code: 'PRJ-RSV-005',
    name: 'Réserve',
    category: 'featured',
    status: 'ready',
    year: 2026,
    tagline: {
      fr: 'La prise de rendez-vous en ligne, en marque blanche, pour les petits commerces.',
      en: 'White-label online booking for small businesses.',
    },
    problem: {
      fr: 'Salons, barbiers et garages d’Afrique francophone prenaient leurs rendez-vous par téléphone, avec oublis et doubles réservations.',
      en: 'Salons, barbers and garages in French-speaking Africa booked by phone, with no-shows and double bookings.',
    },
    highlights: {
      fr: [
        'Une page de réservation aux couleurs de chaque commerce, sans compte client ni paiement en ligne',
        'Isolation des données entre commerces par Row-Level Security PostgreSQL',
        'Fuseaux horaires IANA et protection contre les doubles réservations concurrentes',
        'Sessions argon2id sans fournisseur externe, tests unitaires, d’intégration et E2E',
      ],
      en: [
        'A booking page in each business’s colours, no customer account or online payment needed',
        'Tenant isolation with PostgreSQL Row-Level Security',
        'IANA time zones and protection against concurrent double bookings',
        'argon2id sessions with no auth vendor, unit, integration and E2E tests',
      ],
    },
    stack: ['nextjs', 'react', 'typescript', 'tailwind', 'postgresql', 'drizzle', 'zod', 'vitest', 'playwright', 'docker', 'resend'],
    places: ['douala', 'yaounde'],
    media: media('reserve'),
  },
  {
    slug: 'school-saas',
    code: 'PRJ-SCH-006',
    name: 'School SaaS',
    category: 'building',
    status: 'building',
    progress: 55,
    year: 2026,
    tagline: {
      fr: 'Gestion multi-écoles : élèves, présences, notes et finances.',
      en: 'Multi-school management: students, attendance, grades and finance.',
    },
    problem: {
      fr: 'Les écoles privées tiennent présences, notes et frais de scolarité sur papier ou tableur, sans vue d’ensemble ni contrôle d’accès.',
      en: 'Private schools keep attendance, grades and fees on paper or spreadsheets, with no overview and no access control.',
    },
    highlights: {
      fr: [
        'Spécification complète avant le code : besoins, permissions, modèle de données, menaces',
        'Présences, évaluations et saisie des notes avec validation',
        'Catalogue de frais, factures et soldes des élèves',
        'Tests d’intégration sur un vrai PostgreSQL et intégration continue',
      ],
      en: [
        'Full specification before code: requirements, permissions, data model, threat model',
        'Attendance, assessments and validated grade entry',
        'Fee catalogue, invoices and student balances',
        'Integration tests against a real PostgreSQL and continuous integration',
      ],
    },
    stack: ['nextjs', 'react', 'typescript', 'tailwind', 'next-intl', 'postgresql', 'drizzle', 'better-auth', 'zod', 'vitest', 'playwright', 'github-actions'],
    places: ['yaounde', 'douala'],
    media: media('school-saas'),
  },
  {
    slug: 'esa-cosmetics',
    code: 'PRJ-ESA-007',
    name: 'ESA Cosmetics',
    category: 'client',
    status: 'proposal',
    year: 2026,
    tagline: {
      fr: 'Proposition de refonte complète d’une boutique de cosmétiques à Douala.',
      en: 'A complete redesign proposal for a cosmetics store in Douala.',
    },
    statusNote: {
      fr: 'Proposition de refonte complète et fonctionnelle, non retenue par le client : le site en ligne reste l’ancien.',
      en: 'A complete, working redesign proposal the client did not adopt: the live site is still the old one.',
    },
    problem: {
      fr: 'La boutique en ligne existante était datée et ne permettait ni paiement mobile ni gestion simple du stock.',
      en: 'The existing online store was dated, with no mobile payments and no simple stock management.',
    },
    highlights: {
      fr: [
        'Boutique avec filtres, panier latéral, codes promo et livraison offerte progressive',
        'Paiement NotchPay : carte, Orange Money et MTN MoMo',
        'Administration complète : commandes, stock, produits, réglages du site en direct',
        'Commande sur WhatsApp en un clic et référencement SEO',
      ],
      en: [
        'Store with filters, slide-out cart, promo codes and free-shipping progress',
        'NotchPay payments: card, Orange Money and MTN MoMo',
        'Full admin: orders, stock, products, live site settings',
        'One-click WhatsApp ordering and SEO',
      ],
    },
    stack: ['nodejs', 'express', 'sqlite', 'vanilla-js', 'responsive', 'notchpay', 'whatsapp', 's3', 'ovh'],
    places: ['douala'],
    media: media('esa-cosmetics'),
  },
  {
    slug: 'welfare-shop',
    code: 'PRJ-TWS-008',
    name: 'The Welfare Shop',
    category: 'client',
    status: 'delivered',
    year: 2026,
    tagline: {
      fr: 'Boutique en ligne de beauté coréenne, livrée avec son administration.',
      en: 'A Korean-beauty online store, delivered with its admin.',
    },
    statusNote: {
      fr: 'Livrée et opérationnelle ; la boutique n’est plus en ligne aujourd’hui.',
      en: 'Delivered and in operation; the store is no longer online today.',
    },
    problem: {
      fr: 'La boutique vendait surtout par messages privés, sans catalogue en ligne, sans suivi du stock ni des ventes.',
      en: 'The shop sold mostly through private messages, with no online catalogue and no stock or sales tracking.',
    },
    highlights: {
      fr: [
        'Suivi d’activité interne sans cookies : visiteuses en ligne, recherches, rapports',
        'Stock complet : historique, caisse en boutique, import CSV, marges et alertes',
        'Paiement NotchPay et commande WhatsApp',
        'Sauvegardes automatiques et déploiement documenté',
      ],
      en: [
        'Cookie-free internal analytics: live visitors, searches, reports',
        'Full stock management: history, in-store till, CSV import, margins and alerts',
        'NotchPay payments and WhatsApp ordering',
        'Automatic backups and documented deployment',
      ],
    },
    stack: ['nodejs', 'express', 'sqlite', 'vanilla-js', 'responsive', 'notchpay', 'whatsapp', 's3', 'render'],
    places: ['douala'],
    media: media('welfare-shop'),
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function projectsUsing(tech: TechId): Project[] {
  return projects.filter((p) => p.stack.includes(tech));
}
