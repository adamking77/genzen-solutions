// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import compress from 'astro-compress';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  adapter: vercel(),
  site: 'https://genzen-solutions.com',
  integrations: [
    react(), 
    tailwind({ applyBaseStyles: true }),
    mdx(),
    sitemap(),
    compress({
      CSS: true,
      HTML: {
        'html-minifier-terser': {
          removeAttributeQuotes: false,
        }
      },
      Image: false,
      JavaScript: true,
      SVG: true,
    })
  ],
  image: {
    domains: ['genzen-solutions.com'],
    remotePatterns: [{ protocol: 'https' }]
  }
});