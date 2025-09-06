# Astro Swiss Theme

A modern, flexible, and reusable Astro theme designed for corporate sites, portfolios, and blogs with a focus on Swiss design principles. This theme provides a collection of well-crafted components, layouts, and styling defaults to kickstart your Astro project.

## Installation

```bash
npm install astro-swiss-theme
```

You will also need to install peer dependencies if not already present in your project:

```bash
npm install astro react react-dom @astrojs/react @astrojs/tailwind tailwindcss
```

## Usage

Import layouts and components into your Astro pages:

```astro
---
import { BaseLayout } from 'astro-swiss-theme/layouts';
import { Button } from 'astro-swiss-theme/components/ui';
import { SimpleQualificationModal } from 'astro-swiss-theme/components/interactive';
---
<BaseLayout title="My Page" description="An example page using the theme.">
  <h1>Hello from the Theme!</h1>
  <Button>Click Me</Button>
  <SimpleQualificationModal client:load triggerText="Get Started" />
</BaseLayout>
```

### Using Barrel Exports

The theme provides barrel exports for easier imports:

```astro
---
// Import multiple components from a single path
import { 
  BaseLayout, 
  Button, 
  SimpleQualificationModal 
} from 'astro-swiss-theme';
---
```

### Content Collections

The theme includes a reports content collection schema that supports both JSON and Markdown formats:

#### JSON Format (Legacy)
1. Create `src/content/reports/` directory in your project
2. Add JSON files following the schema defined in the theme
3. Use the dynamic routes to display your content

Example JSON report structure:
```json
{
  "id": "unique-id",
  "slug": "report-slug",
  "title": "Report Title",
  "subtitle": "Report Subtitle",
  "description": "Report Description",
  "author": "Author Name",
  "publishDate": "December 2024",
  "category": "Strategic",
  "tags": ["Analytics", "Performance"],
  "readTime": "12 min read",
  "featured": true
}
```

#### Markdown Format (Recommended)
1. Create `src/content/reports/` directory in your project
2. Add Markdown files with frontmatter following the schema
3. Include narrative content in the Markdown body
4. Embed charts using the `<ChartWrapper />` component

Example Markdown report structure:
```md
---
id: "unique-id"
slug: "report-slug"
title: "Report Title"
subtitle: "Report Subtitle"
description: "Report Description"
author: "Author Name"
publishDate: "December 2024"
category: "Strategic"
tags: ["Analytics", "Performance"]
readTime: "12 min read"
featured: true
---

# Report Content

This is the main content of your report in Markdown format.

<ChartWrapper id="chart-id" title="Chart Title" description="Chart Description" />
```

## New Components

### QualificationForm
A sophisticated multi-step form with Swiss design principles:
- **Typeform-style UX**: Full viewport, step-by-step progression
- **Swiss Typography**: Clean, light typography with proper spacing
- **Progress Tracking**: Visual progress indicator
- **Responsive Design**: Works seamlessly on all devices
- **Modal Support**: Can be used standalone or within a modal

### SimpleQualificationModal
An elegant modal wrapper for the qualification form:
- **Theme-aware**: Adapts to light/dark modes
- **Backdrop Blur**: Modern backdrop blur effect
- **Smooth Animations**: Framer Motion powered transitions
- **Customizable Trigger**: Use custom trigger elements or default button

### FormLayout
A specialized layout for form pages with optimized spacing and navigation.

Refer to `docs/THEME_ARCHITECTURE.md` for more details on available components and customization.

## Customization

### Styling

#### Tailwind CSS
To extend or override the theme's Tailwind configuration, create a `tailwind.config.cjs` file in your project root:

```js
// tailwind.config.cjs
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  presets: [require('astro-swiss-theme/tailwind.config')],
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './node_modules/astro-swiss-theme/src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'
  ],
  theme: {
    extend: {
      // Your customizations here
    }
  }
}
```

#### CSS Variables
The theme uses CSS variables for consistent styling. You can override these in your global CSS:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  /* ... */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --primary: 210 40% 98%;
  /* ... */
}
```

### Content

#### Props
All components accept props for customization. Check each component's source for available props.

#### Slots
Use Astro slots to inject custom content into layouts:

```astro
<BaseLayout title="My Page">
  <div slot="header">Custom header content</div>
  <h1>Page content</h1>
  <div slot="footer">Custom footer content</div>
</BaseLayout>
```

#### Content Collections
To use the reports content collection in your project:

1. Create the content schema in `src/content/config.ts`:
```ts
import { defineCollection } from 'astro:content';
import { reportsCollection } from 'astro-swiss-theme/src/content/config';

export const collections = {
  reports: reportsCollection,
};
```

2. Add your reports to `src/content/reports/` as JSON files

### Data
Provide custom data to components through props. See individual component documentation for available data structures.

## Performance Optimization

To optimize performance when using this theme:

1. **Tree-shake components**: Only import the components you need
   ```astro
   ---
   // Good - imports only what you need
   import { Button } from 'astro-swiss-theme/components/ui';
   
   // Avoid - imports everything
   import * as UI from 'astro-swiss-theme/components/ui';
   ---
   ```

2. **Use client directives selectively**: The theme provides optimized hydration strategies
   - `client:idle` for interactive components (theme toggles, forms)
   - `client:visible` for scroll animations and non-critical components
   - `client:load` only when immediate interactivity is required

3. **Image Optimization**: Use the built-in OptimizedImage component
   ```astro
   ---
   import OptimizedImage from 'astro-swiss-theme/components/OptimizedImage.astro';
   import { generateSizes, getOptimalQuality } from 'astro-swiss-theme/utils/imageUtils';
   ---
   
   <OptimizedImage
     src="/hero-image.jpg"
     alt="Swiss design hero"
     width={1200}
     height={600}
     priority={true}
     quality={getOptimalQuality('hero')}
     sizes={generateSizes()}
   />
   ```

4. **Font Loading**: The theme uses optimized async font loading with system font fallbacks

5. **Code splitting**: The theme is structured to support code splitting through dynamic imports

## Layout Components

The theme includes powerful layout components that can be easily integrated into your Reports and Projects content collections through frontmatter YAML configuration.

### Available Components

#### ContentSplit Component
A professional two-column layout perfect for presenting detailed information with structured items.

```yaml
components:
  - type: "ContentSplit"
    leftTitle: "Our Methodology"
    leftDescription: "Comprehensive description of your approach..."
    rightTitle: "Key Features"
    rightItems:
      - title: "Feature Name"
        description: "Feature description..."
        meta: "Category"
    reversed: false  # Optional: reverse column order
```

#### MinimalList Component  
A clean, numbered or bulleted list ideal for timelines, processes, and feature lists.

```yaml
components:
  - type: "MinimalList"
    title: "Project Timeline"
    numbered: true    # Optional: use numbers vs bullets
    items:
      - title: "Phase 1"
        description: "Phase description..."
        meta: "Timeline"  # Optional meta information
```

### Usage in Content Collections

Add components to any report or project by including them in your frontmatter:

```yaml
---
title: "Your Report Title"
description: "Report description..."
# ... other frontmatter fields
components:
  - type: "MinimalList"
    # MinimalList configuration
  - type: "ContentSplit"
    # ContentSplit configuration
---

# Your Markdown Content

Components will be rendered after your markdown content automatically.
```

### Component Documentation

For detailed usage instructions, examples, and integration guides:

- **[COMPONENTS.md](COMPONENTS.md)** - Complete usage guide with examples
- **[COMPONENT-REFERENCE.md](COMPONENT-REFERENCE.md)** - Quick reference and troubleshooting
- **[COMPONENT-TEMPLATES.md](COMPONENT-TEMPLATES.md)** - Real-world templates for common scenarios
- **[CMS-EXAMPLES.md](CMS-EXAMPLES.md)** - Headless CMS integration examples

### Headless CMS Integration

The components work seamlessly with popular headless CMS platforms:
- Contentful
- Strapi  
- Sanity
- Ghost CMS
- Hygraph
- Directus

Each platform requires specific field configuration detailed in the CMS integration guide.

## Markdown Content Collections

The theme supports comprehensive Markdown content collections for both reports and projects with enhanced layout capabilities through the component system.

---

*This theme is actively maintained and ready for production use.*
