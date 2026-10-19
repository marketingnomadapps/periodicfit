// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import securityHeaders from './integrations/security-headers.mjs';

const env = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');
const GA4 = env.PUBLIC_GA4_ID || process.env.PUBLIC_GA4_ID || '';
const WP = (env.WP_URL || process.env.WP_URL || '').replace(/\/$/, '');
// Google Analytics domains are added to the CSP only when a GA4 ID is configured.
const ga = GA4 ? { scripts: ['https://www.googletagmanager.com'], connect: ['https://*.google-analytics.com', 'https://*.analytics.google.com', 'https://www.googletagmanager.com'], images: ['https://*.google-analytics.com', 'https://www.googletagmanager.com'] } : { scripts: [], connect: [], images: [] };

export default defineConfig({
  site: 'https://periodicfit.com',
  trailingSlash: 'never',
  build: { format: 'file' },
  vite: { plugins: [tailwindcss()] },
  integrations: [
    sitemap({ filter: (page) => !page.includes('/404') }),
    securityHeaders({
      // Only these third parties may be contacted from the browser:
      connect: ['https://api.web3forms.com', 'https://challenges.cloudflare.com', ...ga.connect],
      scripts: ['https://challenges.cloudflare.com', ...ga.scripts], // Cloudflare Turnstile (anti-bot) + GA4 if set
      frames: ['https://challenges.cloudflare.com', 'https://www.youtube-nocookie.com'], // Turnstile + YouTube embeds in blog posts
      images: [...(WP ? [WP] : []), ...ga.images], // WordPress media library for blog images
      // TODO: when GA4 / AdSense are switched on, add their domains here (and only then).
    }),
  ],
});
