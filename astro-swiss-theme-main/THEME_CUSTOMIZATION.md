# Swiss Theme Customization Guide

This guide explains how to customize and adapt the Swiss Astro Theme for different use cases and projects.

## Table of Contents

1. [Theme Configuration](#theme-configuration)
2. [Content Collections](#content-collections)
3. [Layout Presets](#layout-presets)
4. [Headless CMS Integration](#headless-cms-integration)
5. [Customization Examples](#customization-examples)

## Theme Configuration

### Basic Configuration

The theme uses a centralized configuration system in `src/config/theme.config.ts`. You can customize:

```typescript
import { getThemeConfig } from './src/config/theme.config';

// Get current theme configuration
const config = getThemeConfig();
```

### Environment-Based Configuration

Override settings using environment variables:

```bash
# .env
SITE_TITLE="My Custom Site"
SITE_DESCRIPTION="Custom description"
BRAND_NAME="My Brand"
GOOGLE_ANALYTICS_ID="GA_TRACKING_ID"
PLAUSIBLE_DOMAIN="mydomain.com"
```

### Configuration Sections

#### Site Settings
```typescript
site: {
  title: 'Your Site Title',
  description: 'Your site description',
  url: 'https://yoursite.com',
  language: 'en',
  author: 'Your Name',
  social: {
    twitter: '@yourhandle',
    linkedin: 'company/yourcompany',
    email: 'hello@yoursite.com'
  }
}
```

#### Brand Configuration
```typescript
brand: {
  name: 'Your Brand',
  tagline: 'Your tagline',
  colors: {
    primary: 'hsl(var(--primary))',
    secondary: 'hsl(var(--secondary))',
    accent: 'hsl(var(--accent))'
  },
  fonts: {
    heading: 'Inter, system-ui, sans-serif',
    body: 'Inter, system-ui, sans-serif'
  }
}
```

#### Navigation Setup
```typescript
navigation: {
  header: {
    links: [
      { label: 'About', id: 'about' }, // Scroll to section
      { label: 'Services', href: '/services' }, // Link to page
      { label: 'Contact', href: '/contact', external: true } // External link
    ]
  },
  footer: {
    columns: [
      {
        title: 'Services',
        links: [
          { label: 'Web Development', href: '/services/web' },
          { label: 'Design', href: '/services/design' }
        ]
      }
    ]
  }
}
```

#### Feature Toggles
```typescript
features: {
  hero: { enabled: true, variant: 'default', showCta: true },
  about: { enabled: true, variant: 'default' },
  services: { enabled: true, variant: 'cards' },
  portfolio: { enabled: true, variant: 'grid' },
  contact: { enabled: true, showForm: true, showMap: false }
}
```

## Content Collections

The theme supports three main content collections:

### Reports Collection (Original)
For business reports, case studies, and thought leadership content.

### Projects Collection (New)
Perfect for portfolio items, client work, and project case studies.

```markdown
---
title: "Project Title"
description: "Project description"
client: "Client Name"
category: "Web Development"
technologies: ["React", "Node.js", "PostgreSQL"]
featured: true
startDate: "2024-01-15"
endDate: "2024-06-30"
status: "completed"
demoUrl: "https://demo.example.com"
repositoryUrl: "https://github.com/user/repo"
---

Your project content here...
```

### Pages Collection (New)
For dynamic page creation from CMS content.

```markdown
---
title: "About Us"
description: "Learn about our company"
template: "about"
showInMenu: true
sections:
  - type: "hero"
    title: "Our Story"
    content: "We help businesses succeed..."
  - type: "content"
    title: "Our Mission"
    content: "To provide exceptional service..."
---

Additional page content...
```

## Layout Presets

### Available Presets

1. **Business Preset** (Default)
   - Focus on professional services
   - Reports and case studies
   - Contact forms and CTAs

2. **Portfolio Preset**
   - Showcases creative work
   - Project galleries
   - Minimal navigation

3. **Blog Preset**
   - Content-first design
   - Article layouts
   - Category organization

### Applying Presets

```typescript
import { presetConfigs } from './src/config/theme.config';

// Use a specific preset
const portfolioConfig = presetConfigs.portfolio;
```

### Custom Preset Example

```typescript
export const customPreset: ThemeConfig = {
  ...defaultThemeConfig,
  brand: {
    ...defaultThemeConfig.brand,
    name: 'Custom Brand',
    colors: {
      primary: '#ff6b35',
      secondary: '#004e89',
      accent: '#009ffd'
    }
  },
  features: {
    ...defaultThemeConfig.features,
    hero: { enabled: true, variant: 'centered', showCta: false },
    portfolio: { enabled: true, variant: 'masonry' },
    blog: { enabled: true, variant: 'featured' }
  }
};
```

## Headless CMS Integration

### Supported CMS Platforms

- **Contentful**
- **Strapi**
- **Sanity**
- **Ghost** (planned)
- **Hygraph** (planned)

### Setup Example (Contentful)

```typescript
import { createCMSAdapter } from './src/lib/cms';

const cmsAdapter = createCMSAdapter({
  type: 'contentful',
  apiKey: process.env.CONTENTFUL_ACCESS_TOKEN,
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  environment: 'master'
});

// Fetch content
const projects = await cmsAdapter.fetchContent('projects');
```

### Environment Variables for CMS

```bash
# Contentful
CMS_TYPE=contentful
CONTENTFUL_ACCESS_TOKEN=your_token
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ENVIRONMENT=master

# Strapi
CMS_TYPE=strapi
STRAPI_API_URL=http://localhost:1337
STRAPI_API_TOKEN=your_token

# Sanity
CMS_TYPE=sanity
SANITY_PROJECT_ID=your_project_id
SANITY_DATASET=production
```

## Customization Examples

### Example 1: Creative Agency Setup

```typescript
// theme.config.ts
export const agencyConfig: ThemeConfig = {
  site: {
    title: 'Creative Studio',
    description: 'Award-winning creative agency'
  },
  brand: {
    name: 'Studio',
    tagline: 'Where creativity meets strategy'
  },
  features: {
    hero: { enabled: true, variant: 'centered', showCta: false },
    portfolio: { enabled: true, variant: 'masonry' },
    services: { enabled: true, variant: 'grid' },
    contact: { enabled: true, showForm: true, showMap: true }
  },
  content: {
    collections: {
      projects: true,
      pages: true,
      reports: false
    }
  }
};
```

### Example 2: SaaS Landing Page

```typescript
// theme.config.ts
export const saasConfig: ThemeConfig = {
  site: {
    title: 'SaaS Product',
    description: 'The future of productivity'
  },
  features: {
    hero: { enabled: true, variant: 'split', showCta: true },
    services: { enabled: true, variant: 'cards' },
    portfolio: { enabled: false, variant: 'grid' },
    contact: { enabled: true, showForm: true, showMap: false }
  },
  navigation: {
    header: {
      links: [
        { label: 'Features', href: '/features' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Login', href: '/login', external: true }
      ]
    }
  }
};
```

### Example 3: Blog-Focused Site

```typescript
// theme.config.ts
export const blogConfig: ThemeConfig = {
  features: {
    hero: { enabled: true, variant: 'minimal', showCta: false },
    blog: { enabled: true, variant: 'featured' },
    services: { enabled: false, variant: 'cards' },
    portfolio: { enabled: false, variant: 'grid' }
  },
  content: {
    collections: {
      blog: true,
      pages: true,
      projects: false,
      reports: false
    },
    pagination: {
      pageSize: 8
    }
  }
};
```

## Utility Functions

### Theme Utilities

```typescript
import { 
  isFeatureEnabled, 
  getContainerClass, 
  getSpacingClass,
  getSiteMetadata 
} from './src/lib/theme-utils';

// Check if a feature is enabled
if (isFeatureEnabled('portfolio')) {
  // Render portfolio section
}

// Get responsive container class
const containerClass = getContainerClass(); // Returns appropriate container classes

// Get consistent spacing
const sectionSpacing = getSpacingClass('section'); // Returns py-16 lg:py-24 etc.

// Get site metadata for SEO
const metadata = getSiteMetadata();
```

### CSS Custom Properties

The theme automatically generates CSS custom properties from your config:

```css
:root {
  --brand-primary: hsl(var(--primary));
  --brand-secondary: hsl(var(--secondary));
  --brand-accent: hsl(var(--accent));
  --font-heading: Inter, system-ui, sans-serif;
  --font-body: Inter, system-ui, sans-serif;
}
```

## Development Tips

### 1. Validation
```typescript
import { validateThemeConfig } from './src/lib/theme-utils';

const errors = validateThemeConfig(yourConfig);
if (errors.length > 0) {
  console.error('Theme configuration errors:', errors);
}
```

### 2. Debug Information
```typescript
import { getThemeDebugInfo } from './src/lib/theme-utils';

const debugInfo = getThemeDebugInfo();
console.log('Enabled features:', debugInfo.enabledFeatures);
console.log('Enabled collections:', debugInfo.enabledCollections);
```

### 3. Hot Reloading
The theme configuration supports hot reloading during development. Changes to `theme.config.ts` will automatically refresh the page.

## Best Practices

1. **Start with Presets**: Use existing presets as starting points
2. **Environment Variables**: Use env vars for deployment-specific settings
3. **Feature Flags**: Use feature toggles to enable/disable sections
4. **Content Strategy**: Plan your content collections before implementation
5. **Performance**: Only enable features and collections you need
6. **Testing**: Test your configuration with the validation functions

## Migration Guide

### From Basic Setup to Custom Configuration

1. Copy the default configuration
2. Modify settings for your use case
3. Update navigation links
4. Configure content collections
5. Test with validation functions
6. Deploy with environment variables

This flexible system allows the Swiss theme to adapt to virtually any project type while maintaining design consistency and performance excellence.