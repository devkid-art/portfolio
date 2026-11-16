export const TECH_GROUPS = ['frontend', 'backend', 'data', 'mobile', 'quality', 'devops', 'integrations'] as const;
export type TechGroup = (typeof TECH_GROUPS)[number];

export const TECH = {
  // Interface
  nextjs: { label: 'Next.js', group: 'frontend' },
  react: { label: 'React', group: 'frontend' },
  typescript: { label: 'TypeScript', group: 'frontend' },
  tailwind: { label: 'Tailwind CSS', group: 'frontend' },
  'tanstack-query': { label: 'TanStack Query', group: 'frontend' },
  'next-intl': { label: 'next-intl', group: 'frontend' },
  'vanilla-js': { label: 'HTML, CSS, JavaScript', group: 'frontend' },
  // Server
  nodejs: { label: 'Node.js', group: 'backend' },
  express: { label: 'Express', group: 'backend' },
  nestjs: { label: 'NestJS', group: 'backend' },
  socketio: { label: 'Socket.IO', group: 'backend' },
  'better-auth': { label: 'Better Auth', group: 'backend' },
  // Data
  postgresql: { label: 'PostgreSQL', group: 'data' },
  prisma: { label: 'Prisma', group: 'data' },
  drizzle: { label: 'Drizzle ORM', group: 'data' },
  sqlite: { label: 'SQLite', group: 'data' },
  'pg-boss': { label: 'pg-boss', group: 'data' },
  // Mobile
  'android-twa': { label: 'Android TWA', group: 'mobile' },
  'web-push': { label: 'Web Push', group: 'mobile' },
  responsive: { label: 'Responsive design', group: 'mobile' },
  // Quality
  vitest: { label: 'Vitest', group: 'quality' },
  playwright: { label: 'Playwright', group: 'quality' },
  jest: { label: 'Jest', group: 'quality' },
  zod: { label: 'Zod', group: 'quality' },
  // Deployment
  vercel: { label: 'Vercel', group: 'devops' },
  render: { label: 'Render', group: 'devops' },
  docker: { label: 'Docker', group: 'devops' },
  'github-actions': { label: 'GitHub Actions', group: 'devops' },
  ovh: { label: 'OVHcloud VPS', group: 'devops' },
  // Payments & services
  stripe: { label: 'Stripe', group: 'integrations' },
  notchpay: { label: 'NotchPay', group: 'integrations' },
  whatsapp: { label: 'WhatsApp', group: 'integrations' },
  cloudinary: { label: 'Cloudinary', group: 'integrations' },
  resend: { label: 'Resend', group: 'integrations' },
  agora: { label: 'Agora', group: 'integrations' },
  s3: { label: 'S3 / R2', group: 'integrations' },
} as const satisfies Record<string, { label: string; group: TechGroup }>;

export type TechId = keyof typeof TECH;
