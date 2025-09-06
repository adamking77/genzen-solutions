# Markdown Content Collections

The Astro Swiss Theme supports Markdown content collections for reports, allowing you to create rich, narrative-driven content with embedded data visualizations.

## Creating Markdown Reports

To create a Markdown report:

1. Create a new file in `src/content/reports/` with a `.md` extension
2. Add frontmatter with the required metadata fields
3. Write your content in Markdown format
4. Embed charts using the `<ChartWrapper />` component

## Frontmatter Schema

All reports must include the following fields in their frontmatter:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | Yes | Unique identifier for the report |
| slug | string | Yes | URL-friendly version of the title |
| title | string | Yes | Report title (max 200 characters) |
| subtitle | string | Yes | Report subtitle (max 300 characters) |
| description | string | Yes | Report description (max 500 characters) |
| author | string | Yes | Report author |
| publishDate | string | Yes | Publication date |
| category | string | Yes | Report category (must be from predefined list) |
| tags | array | Yes | Array of tags (1-10 items) |
| readTime | string | Yes | Reading time estimate |
| featured | boolean | No | Whether report is featured (default: false) |
| published | boolean | No | Whether report is published (default: true) |

## Embedding Charts

To embed charts in your Markdown content, use the `<ChartWrapper />` component:

```md
<ChartWrapper 
  id="performance-metrics" 
  title="Performance Metrics" 
  description="Key performance indicators over time"
  type="line" />
```

### ChartWrapper Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| id | string | Yes | - | Unique identifier for the chart |
| title | string | No | - | Chart title |
| description | string | No | - | Chart description |
| type | string | No | "line" | Chart type (line, bar, pie, area) |

## CMS Integration

To integrate with a headless CMS:

1. Configure your CMS to export content as Markdown with frontmatter
2. Set up a deployment workflow that syncs content to `src/content/reports/`
3. Use the chart `id` field to match CMS chart data with embedded chart components

## Best Practices

1. Use descriptive slugs that match your report titles
2. Include relevant tags to improve discoverability
3. Keep descriptions concise but informative
4. Use consistent chart ID naming conventions
5. Test your Markdown content locally before deploying