# Report Template Customization Guide

## Current Structure (Good for Basic Customization)

### Easy to Customize:
✅ **Report Metadata** - title, subtitle, author, category, tags, dates
✅ **Section Order** - reorder existing components in any sequence  
✅ **Content Data** - modify text, numbers, lists within existing components
✅ **Styling** - consistent brand colors and typography applied automatically

### Requires Code Changes:
❌ **New Component Types** - Adding completely new section types
❌ **Custom Layouts** - Changing how sections are structured
❌ **Dynamic Components** - Components that change based on content type

## Improved Flexible Structure (Recommended)

### 1. Generic Section Types
Instead of fixed components, use flexible section types:

```json
{
  "sections": [
    {
      "type": "hero",
      "layout": "split", 
      "content": { "title": "...", "description": "..." }
    },
    {
      "type": "metrics", 
      "layout": "grid-4",
      "content": { "items": [...] }
    },
    {
      "type": "content",
      "layout": "two-column", 
      "content": { "left": "...", "right": "..." }
    }
  ]
}
```

### 2. Layout Variants
Each section type supports multiple layouts:

**Metrics Section:**
- `grid-2` - 2 column grid
- `grid-3` - 3 column grid  
- `grid-4` - 4 column grid
- `horizontal` - side-by-side layout

**Content Section:**
- `single` - full width content
- `two-column` - split left/right
- `sidebar` - main content + sidebar

### 3. Component Mapping System
```astro
---
const componentMap = {
  'hero': import('../../components/flexible/HeroSection.astro'),
  'metrics': import('../../components/flexible/MetricsSection.astro'), 
  'content': import('../../components/flexible/ContentSection.astro'),
  'chart': import('../../components/flexible/ChartSection.astro')
};

// Dynamic component rendering
sections.map(section => {
  const Component = componentMap[section.type];
  return <Component layout={section.layout} content={section.content} />;
})
---
```

## Implementation Options

### Option 1: Keep Current (Low Effort)
- Good for: Standard business reports with similar structure
- Customization: Content only, fixed component types
- Effort: Minimal - just edit JSON content

### Option 2: Create Flexible Template (Medium Effort) 
- Good for: Varied report types, custom layouts
- Customization: Content + layout + new section types
- Effort: Moderate - build flexible components

### Option 3: Full CMS Integration (High Effort)
- Good for: Non-technical content editing
- Customization: Everything via UI
- Effort: Significant - build admin interface

## Recommendation for GenZen Solutions

Given your intelligence/security focus, I recommend **Option 2** with these specific improvements:

### Custom Section Types for Your Content:
1. **Threat Analysis** - Security assessment layouts
2. **Risk Metrics** - Specialized security KPIs  
3. **Intelligence Summary** - Briefing-style layouts
4. **Recommendation Matrix** - Priority/impact grids
5. **Timeline** - Sequential event layouts

Would you like me to implement any of these improvements?