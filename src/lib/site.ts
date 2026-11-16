/**
 * Public origin of the site, for absolute URLs (sitemap, share images, JSON-LD).
 * NEXT_PUBLIC_SITE_URL wins; on Vercel the production domain is used; locally, the dev port.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3100');
