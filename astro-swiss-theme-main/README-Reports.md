# Reports Content Collection Template

This is a comprehensive, reusable Astro content collection template for creating professional report archives. The system is designed for easy portability across different Astro sites while maintaining a clean, Swiss-design aesthetic.

## 🚀 Features

- **Dynamic Section System**: Modular report sections that can be mixed and matched
- **TypeScript Validation**: Comprehensive Zod schema validation for content integrity
- **SEO Optimized**: Built-in SEO metadata and social sharing support
- **Interactive Filtering**: Real-time search and category filtering
- **Responsive Design**: Mobile-first, professional Swiss design
- **Template Portability**: Easy to migrate to other Astro projects

## 📁 File Structure

```
src/
├── content/
│   ├── config.ts                    # Content collection schema
│   └── reports/                     # Report JSON files
│       ├── example-report.json
│       └── ...
├── components/
│   ├── reports/                     # Report section components
│   │   ├── ExecutiveSummary.astro
│   │   ├── DataVisualization.astro
│   │   ├── FinancialHighlights.astro
│   │   └── ... (10 total components)
│   └── interactive/
│       └── ReportsFilter.tsx        # Search/filter interface
└── pages/
    ├── reports.astro               # Reports archive page
    └── reports/
        └── [slug].astro            # Individual report pages
```

## 🛠️ Quick Setup

### 1. Copy Required Files

Copy these directories to your Astro project:
- `src/content/reports/` (with sample JSON files)
- `src/components/reports/`
- `src/components/interactive/ReportsFilter.tsx`
- `src/pages/reports.astro`
- `src/pages/reports/[slug].astro`

### 2. Update Content Config

Merge the reports collection schema from `src/content/config.ts` into your project's content configuration.

### 3. Install Dependencies

```bash
npm install react lucide-react
```

### 4. Configure BaseLayout

Ensure your `BaseLayout.astro` component accepts `title` and `description` props for SEO.

## 📝 Creating Reports

### Basic Report Structure

Create a new JSON file in `src/content/reports/`:

```json
{
  "id": "1",
  "slug": "my-report-2024",
  "title": "My Strategic Report 2024",
  "subtitle": "Comprehensive analysis and insights",
  "description": "A detailed description of the report content for SEO and previews.",
  "author": "Report Author",
  "publishDate": "December 2024",
  "category": "Strategic",
  "tags": ["strategy", "analysis", "2024"],
  "readTime": "8 min read",
  "featured": false,
  "sections": [
    { "component": "ExecutiveSummary", "key": "executive" },
    { "component": "DataVisualization", "key": "data-viz" },
    { "component": "FinancialHighlights", "key": "financial" }
  ],
  "sectionData": {
    "executive": {
      "title": "Executive Summary",
      "description": "Key findings and recommendations...",
      "keyPoints": [
        "Point 1",
        "Point 2"
      ]
    }
  }
}
```

### Available Report Sections

| Component | Purpose | Key Data Fields |
|-----------|---------|----------------|
| `ExecutiveSummary` | Report overview | `title`, `description`, `keyPoints`, `recommendations` |
| `PerformanceMetrics` | KPI dashboard | `title`, `metrics`, `performance` |
| `RegionalPerformance` | Geographic data | `regions`, `performance`, `expansion` |
| `TechnologyStack` | Tech analysis | `technologies`, `adoption`, `impact` |
| `DataVisualization` | Charts/graphs | `chartPlaceholder`, `performanceMetrics` |
| `FinancialHighlights` | Financial data | `metrics`, `description`, `quote` |
| `ClientInsights` | Customer feedback | `insights`, `satisfaction` |
| `MarketAnalysis` | Market research | `chartPlaceholder`, `metrics` |
| `IndustryTrends` | Industry patterns | `digitalTransformation`, `adoption` |
| `FutureOutlook` | Projections | `projections`, `initiatives`, `positioning` |

## 🎨 Customization

### Theme Colors

The template uses CSS custom properties that can be customized:
- `--foreground`: Primary text color
- `--background`: Background color
- `--foreground/10`: Light accent colors

### Component Styling

Each component includes:
- Responsive grid layouts
- Hover animations
- Progressive loading animations
- Consistent typography

### Adding New Section Types

1. Create new Astro component in `src/components/reports/`
2. Add component name to `sectionSchema` enum in `src/content/config.ts`
3. Add rendering logic to `src/pages/reports/[slug].astro`

## 🔧 Advanced Configuration

### SEO Metadata

Add SEO fields to any report:

```json
{
  "seo": {
    "metaTitle": "Custom page title",
    "metaDescription": "Custom meta description",
    "ogImage": "/images/report-thumbnail.jpg",
    "canonicalUrl": "https://yoursite.com/reports/report-slug"
  }
}
```

### Content Validation

The schema includes validation for:
- Slug format (lowercase, hyphens only)
- Title/description length limits
- Required fields
- Category enums
- Tag limits

### Publishing Control

Control report visibility:
```json
{
  "published": true,
  "featured": false
}
```

## 🚀 Migration Guide

### From Other Site Builders

1. **Content**: Convert existing reports to JSON format following the schema
2. **Styling**: Customize CSS custom properties to match your brand
3. **Layout**: Update `BaseLayout.astro` import path
4. **Dependencies**: Install React and Lucide React for interactive components

### Updating Template Version

When updating the template:
1. Check `templateVersion` field for compatibility
2. Review schema changes in `src/content/config.ts`
3. Update existing JSON files if needed
4. Test build process

## 🧪 Testing

### Build Validation

```bash
# Check content collection validation
npm run build

# Development server
npm run dev
```

### Content Validation

The Zod schema will catch:
- Invalid slugs
- Missing required fields
- Content length violations
- Unknown section components
- Invalid category values

## 📊 Performance

### Optimizations Included

- **Static Generation**: All reports are statically generated
- **Lazy Loading**: Images and heavy components load progressively
- **Minimal JavaScript**: Only interactive components use client-side JS
- **SEO Friendly**: Proper meta tags and structured data

### Recommended Practices

- Keep JSON files under 50KB for optimal performance
- Use optimized images for report thumbnails
- Limit to 20-30 reports per category for best UX

## 🤝 Contributing

When extending this template:

1. Maintain TypeScript interfaces consistency
2. Follow Swiss design principles (minimalism, typography, spacing)
3. Test on mobile devices
4. Update documentation for new features
5. Keep components framework-agnostic (prefer Astro over React when possible)

## 📄 License

This template is designed for reuse across projects. Customize freely while maintaining attribution to the Swiss design principles.

---

**Template Version**: 1.0  
**Last Updated**: December 2024  
**Compatibility**: Astro 4.0+