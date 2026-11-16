import createMDX from '@next/mdx';
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  // Share images read these font files from disk; keep them in the deployment if one is rendered on demand.
  outputFileTracingIncludes: {
    '/[locale]/opengraph-image': ['./node_modules/@fontsource/big-shoulders/files/*.woff', './node_modules/@fontsource/archivo/files/*.woff'],
    '/[locale]/projets/[slug]/opengraph-image': [
      './node_modules/@fontsource/big-shoulders/files/*.woff',
      './node_modules/@fontsource/archivo/files/*.woff',
    ],
  },
  turbopack: {
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
  },
};

const withMDX = createMDX({});
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

export default withNextIntl(withMDX(nextConfig));
