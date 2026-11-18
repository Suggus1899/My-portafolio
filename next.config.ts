import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

// Vercel injects its feedback toolbar only on preview deployments.
const live = process.env.VERCEL_ENV === 'preview' ? ' https://vercel.live' : '';

// shortcut: 'unsafe-inline' scripts because Next/next-themes inject inline bootstraps; move to nonces if the site ever renders user content.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === 'development' ? " 'unsafe-eval'" : ''} https://va.vercel-scripts.com${live}`,
  `style-src 'self' 'unsafe-inline'${live}`,
  `img-src 'self' data: blob: https://github.com https://avatars.githubusercontent.com${live}${live && ' https://vercel.com'}`,
  `font-src 'self' data:${live}${live && ' https://assets.vercel.com'}`,
  `connect-src 'self' https://api.emailjs.com https://vitals.vercel-insights.com${live}${live && ' wss://ws-us3.pusher.com'}`,
  `frame-src 'self'${live}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()' },
];

const nextConfig: NextConfig = {
  reactCompiler: true,
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
  images: {
    qualities: [75, 85],
    remotePatterns: [
      { protocol: 'https', hostname: 'github.com' },
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
    ],
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

export default withNextIntl(nextConfig);
