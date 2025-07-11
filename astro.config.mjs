// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import compress from 'astro-compress';

// https://astro.build/config
export default defineConfig({
  site: 'https://genzen-solutions.com',
  integrations: [
    react(), 
    tailwind({ applyBaseStyles: true }),
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