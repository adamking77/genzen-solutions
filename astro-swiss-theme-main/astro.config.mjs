// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://swiss-astro-theme.vercel.app', // Production domain for theme demo
  
  integrations: [
    react(),
    tailwind({ 
      applyBaseStyles: true 
    }),
    mdx(),
    sitemap({
      // Generate sitemap for better SEO
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    })
  ],
  
  // Performance optimizations
  build: {
    // Inline small assets for better performance
    inlineStylesheets: 'auto',
    // Enable asset splitting for better caching
    assets: '_astro',
  },
  
  // Vite configuration for additional optimizations
  vite: {
    build: {
      // Enable CSS code splitting
      cssCodeSplit: true,
      // Optimize chunk size
      rollupOptions: {
        output: {
          manualChunks: {
            // Split vendor chunks for better caching
            'react-vendor': ['react', 'react-dom'],
            'radix-vendor': ['@radix-ui/react-slot']
          }
        }
      }
    }
  },
  
  // Image optimization
  image: {
    // Use Astro's built-in image optimization
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  },
  
  // Prefetch optimization for better user experience
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport'
  },
  
  // Compiler optimizations
  compilerOptions: {
    // Remove unused CSS
    experimentalStaticExtraction: true
  },

  // Output configuration for better SEO
  output: 'static', // Explicitly set for better clarity
  
  // Markdown configuration for content collections
  markdown: {
    // Enable syntax highlighting
    shikiConfig: {
      theme: 'github-dark-dimmed',
      wrap: true
    }
  }
});