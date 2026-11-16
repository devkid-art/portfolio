export const TECH_GROUPS = ['frontend', 'backend', 'data', 'mobile', 'quality', 'devops', 'integrations'] as const;
export type TechGroup = (typeof TECH_GROUPS)[number];

export const TECH = {
  // Interface
  nextjs: { label: 'Next.js', group: 'frontend' },
  react: { label: 'React', group: 'frontend' },
  typescript: { label: 'TypeScript', group: 'frontend' },
  tailwind: { label: 'Tailwind CSS', group: 'frontend' },
  'tanstack-query': { label: 'TanStack Query', group: 'frontend' },
  'next-intl': { label: 'next-intl (i18n)', group: 'frontend' },
  'vanilla-js': { label: 'HTML, CSS & JavaScript', group: 'frontend' },
  // Server
  nodejs: { label: 'Node.js', group: 'backend' },
  express: { label: 'Express', group: 'backend' },
  nestjs: { label: 'NestJS', group: 'backend' },
  socketio: { label: 'Socket.IO (temps réel)', group: 'backend' },
  'better-auth': { label: 'Better Auth', group: 'backend' },
  // Data
  postgresql: { label: 'PostgreSQL', group: 'data' },
  prisma: { label: 'Prisma', group: 'data' },
  drizzle: { label: 'Drizzle ORM', group: 'data' },
  sqlite: { label: 'SQLite', group: 'data' },
  'pg-boss': { label: 'pg-boss (tâches de fond)', group: 'data' },
  // Mobile
  'android-twa': { label: 'Android (TWA, Play Store)', group: 'mobile' },
  'web-push': { label: 'Notifications push', group: 'mobile' },
  responsive: { label: 'Mobile-first responsive', group: 'mobile' },
  // Quality
  vitest: { label: 'Vitest', group: 'quality' },
  playwright: { label: 'Playwright (E2E)', group: 'quality' },
  jest: { label: 'Jest', group: 'quality' },
  zod: { label: 'Zod (validation)', group: 'quality' },
  // Deployment
  vercel: { label: 'Vercel', group: 'devops' },
  render: { label: 'Render', group: 'devops' },
  docker: { label: 'Docker', group: 'devops' },
  'github-actions': { label: 'GitHub Actions (CI)', group: 'devops' },
  ovh: { label: 'VPS OVH', group: 'devops' },
  // Payments & services
  stripe: { label: 'Stripe', group: 'integrations' },
  notchpay: { label: 'NotchPay (Mobile Money)', group: 'integrations' },
  whatsapp: { label: 'WhatsApp', group: 'integrations' },
  cloudinary: { label: 'Cloudinary', group: 'integrations' },
  resend: { label: 'Resend (e-mails)', group: 'integrations' },
  agora: { label: 'Agora (appels vidéo)', group: 'integrations' },
  s3: { label: 'Stockage S3 / R2', group: 'integrations' },
} as const satisfies Record<string, { label: string; group: TechGroup }>;

export type TechId = keyof typeof TECH;
