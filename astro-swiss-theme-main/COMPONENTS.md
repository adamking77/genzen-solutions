# Layout Components Guide

The Astro Swiss Theme includes powerful layout components that can be easily integrated into your Reports and Projects content collections. These components enhance your markdown content with professional, responsive layouts.

## Available Components

### 1. ContentSplit Component

A two-column layout that displays descriptive content on the left and structured items on the right.

**Use Cases:**
- Methodology explanations with detailed steps
- Service offerings with feature lists
- Technical overviews with key technologies
- Process descriptions with deliverables

**Visual Layout:**
```
┌─────────────────┬─────────────────┐
│  Left Column    │  Right Column   │
│  ─────────────  │  ─────────────  │
│  Title          │  Title          │
│  Description    │  • Item 1       │
│  Additional     │  • Item 2       │
│  Content        │  • Item 3       │
└─────────────────┴─────────────────┘
```

### 2. MinimalList Component

A clean, numbered or bulleted list with optional meta information for each item.

**Use Cases:**
- Project timelines and phases
- Step-by-step processes
- Feature lists
- Deliverables and milestones

**Visual Layout:**
```
┌─────────────────────────────────────┐
│  Title                              │
│  ─────────────────────────────────  │
│  01  Item Title        [Meta]       │
│      Item description...            │
│                                     │
│  02  Item Title        [Meta]       │
│      Item description...            │
└─────────────────────────────────────┘
```

## Usage in Markdown Files

### Basic Syntax

Add components to your frontmatter using the `components` field:

```yaml
---
title: "Your Content Title"
description: "Your description..."
components:
  - type: "ComponentName"
    # Component-specific fields
---

# Your Markdown Content

Your regular markdown content goes here and will appear before the components.
```

### ContentSplit Example

```yaml
---
title: "Digital Transformation Strategy"
description: "Complete digital transformation roadmap..."
components:
  - type: "ContentSplit"
    leftTitle: "Our Methodology"
    leftDescription: "We employ a comprehensive approach that combines strategic planning with tactical execution. Our methodology has been refined through dozens of successful digital transformations across various industries."
    rightTitle: "Key Phases"
    rightItems:
      - title: "Discovery & Assessment"
        description: "Comprehensive analysis of current state and future requirements."
        meta: "Week 1-2"
      - title: "Strategy Development"
        description: "Create detailed roadmap with prioritized initiatives and timelines."
        meta: "Week 3-4"
      - title: "Implementation Planning"
        description: "Detailed project plans with resource allocation and risk mitigation."
        meta: "Week 5-6"
      - title: "Execution & Monitoring"
        description: "Hands-on implementation support with continuous progress tracking."
        meta: "Ongoing"
    reversed: false
---
```

### MinimalList Example

```yaml
---
title: "Software Development Project"
description: "Custom software solution development..."
components:
  - type: "MinimalList"
    title: "Development Phases"
    numbered: true
    items:
      - title: "Requirements Gathering"
        description: "Detailed stakeholder interviews and functional specification development."
        meta: "2-3 weeks"
      - title: "System Architecture"
        description: "Technical architecture design and technology stack selection."
        meta: "1-2 weeks"
      - title: "Development & Testing"
        description: "Agile development cycles with continuous testing and quality assurance."
        meta: "8-12 weeks"
      - title: "Deployment & Support"
        description: "Production deployment with ongoing maintenance and support."
        meta: "2-4 weeks"
---
```

### Multiple Components

You can include multiple components in a single content file:

```yaml
---
title: "Complete Project Overview"
components:
  - type: "MinimalList"
    title: "Project Milestones"
    numbered: true
    items:
      - title: "Project Kickoff"
        description: "Initial stakeholder meeting and project scope confirmation."
        meta: "Day 1"
      - title: "Design Approval"
        description: "Final design review and stakeholder sign-off."
        meta: "Week 4"
      - title: "Development Complete"
        description: "All features implemented and tested."
        meta: "Week 12"

  - type: "ContentSplit"
    leftTitle: "Technical Architecture"
    leftDescription: "Our solution leverages modern cloud-native technologies to ensure scalability, reliability, and performance."
    rightTitle: "Technology Stack"
    rightItems:
      - title: "Frontend Framework"
        description: "React with Next.js for optimal performance and SEO."
        meta: "UI Layer"
      - title: "Backend Services"
        description: "Node.js with Express and PostgreSQL database."
        meta: "API Layer"
      - title: "Cloud Infrastructure"
        description: "AWS with auto-scaling and monitoring capabilities."
        meta: "Infrastructure"
---
```

## Component Field Reference

### ContentSplit Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | String | ✅ | Must be "ContentSplit" |
| `leftTitle` | String | ✅ | Title for the left column |
| `leftDescription` | String | ✅ | Main descriptive text for left column |
| `rightTitle` | String | ✅ | Title for the right column |
| `rightItems` | Array | ✅ | List of items for right column |
| `reversed` | Boolean | ❌ | Reverses column order (default: false) |

#### rightItems Structure
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | String | ✅ | Item title |
| `description` | String | ✅ | Item description |
| `meta` | String | ❌ | Optional meta info (timing, category, etc.) |

### MinimalList Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | String | ✅ | Must be "MinimalList" |
| `title` | String | ✅ | List title |
| `items` | Array | ✅ | List items |
| `numbered` | Boolean | ❌ | Use numbers instead of bullets (default: false) |

#### items Structure
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | String | ✅ | Item title |
| `description` | String | ✅ | Item description |
| `meta` | String | ❌ | Optional meta info (timing, category, etc.) |

## Usage in Headless CMS

### Contentful Setup

#### 1. Create Content Type Fields

Add a JSON field called `components` to your content type:

```json
{
  "fields": [
    {
      "id": "components",
      "name": "Layout Components",
      "type": "Array",
      "required": false,
      "items": {
        "type": "Object"
      }
    }
  ]
}
```

#### 2. Content Entry Example

```json
{
  "fields": {
    "title": "Advanced Analytics Platform",
    "description": "Comprehensive data analytics solution...",
    "components": [
      {
        "type": "ContentSplit",
        "leftTitle": "Data Intelligence",
        "leftDescription": "Transform raw data into actionable insights with our advanced analytics platform featuring machine learning algorithms and real-time processing capabilities.",
        "rightTitle": "Core Features",
        "rightItems": [
          {
            "title": "Real-time Processing",
            "description": "Process millions of data points per second with sub-millisecond latency.",
            "meta": "Performance"
          },
          {
            "title": "Predictive Analytics",
            "description": "ML-powered forecasting and trend analysis for strategic planning.",
            "meta": "Intelligence"
          },
          {
            "title": "Custom Dashboards",
            "description": "Flexible dashboard creation with drag-and-drop interface.",
            "meta": "Visualization"
          }
        ],
        "reversed": false
      }
    ]
  }
}
```

### Strapi Setup

#### 1. Collection Type Configuration

Create or modify your collection type to include a JSON field:

```json
{
  "collectionName": "reports",
  "info": {
    "displayName": "Report"
  },
  "attributes": {
    "title": {
      "type": "string",
      "required": true
    },
    "components": {
      "type": "json",
      "required": false
    }
  }
}
```

#### 2. JSON Structure in Strapi

```json
{
  "components": [
    {
      "type": "MinimalList",
      "title": "Implementation Roadmap",
      "numbered": true,
      "items": [
        {
          "title": "Planning & Analysis",
          "description": "Comprehensive requirement gathering and technical analysis phase.",
          "meta": "Month 1"
        },
        {
          "title": "Design & Prototyping",
          "description": "UI/UX design and interactive prototype development.",
          "meta": "Month 2"
        },
        {
          "title": "Development & Testing",
          "description": "Full-scale development with continuous integration and testing.",
          "meta": "Month 3-5"
        },
        {
          "title": "Deployment & Launch",
          "description": "Production deployment and go-live support.",
          "meta": "Month 6"
        }
      ]
    }
  ]
}
```

### Sanity Studio Setup

#### 1. Schema Definition

Create a schema file for your document type:

```javascript
// schemas/report.js
export default {
  name: 'report',
  title: 'Report',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'components',
      title: 'Layout Components',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'contentSplit',
          title: 'Content Split',
          fields: [
            {
              name: 'type',
              type: 'string',
              initialValue: 'ContentSplit',
              hidden: true
            },
            {
              name: 'leftTitle',
              title: 'Left Title',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'leftDescription',
              title: 'Left Description',
              type: 'text',
              validation: Rule => Rule.required()
            },
            {
              name: 'rightTitle',
              title: 'Right Title',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'rightItems',
              title: 'Right Items',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {name: 'title', type: 'string', title: 'Title'},
                    {name: 'description', type: 'text', title: 'Description'},
                    {name: 'meta', type: 'string', title: 'Meta Info'}
                  ]
                }
              ]
            },
            {
              name: 'reversed',
              title: 'Reversed Layout',
              type: 'boolean',
              initialValue: false
            }
          ],
          preview: {
            select: {
              title: 'leftTitle',
              subtitle: 'rightTitle'
            },
            prepare({title, subtitle}) {
              return {
                title: `ContentSplit: ${title}`,
                subtitle: subtitle
              }
            }
          }
        },
        {
          type: 'object',
          name: 'minimalList',
          title: 'Minimal List',
          fields: [
            {
              name: 'type',
              type: 'string',
              initialValue: 'MinimalList',
              hidden: true
            },
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'numbered',
              title: 'Numbered List',
              type: 'boolean',
              initialValue: false
            },
            {
              name: 'items',
              title: 'Items',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {name: 'title', type: 'string', title: 'Title'},
                    {name: 'description', type: 'text', title: 'Description'},
                    {name: 'meta', type: 'string', title: 'Meta Info'}
                  ]
                }
              ]
            }
          ],
          preview: {
            select: {
              title: 'title',
              items: 'items'
            },
            prepare({title, items}) {
              return {
                title: `MinimalList: ${title}`,
                subtitle: `${items?.length || 0} items`
              }
            }
          }
        }
      ]
    }
  ]
}
```

## Best Practices

### Content Guidelines

1. **Keep descriptions concise**
   - Aim for 1-2 sentences per item description
   - Use active voice and clear, actionable language
   - Break long descriptions into multiple items

2. **Use meta fields strategically**
   - For timing information ("Week 1-2", "3 months")
   - For categorization ("Frontend", "Backend", "Design")
   - For status indicators ("Complete", "In Progress", "Planned")

3. **Balance content length**
   - Don't overload with too many items (4-6 per component works well)
   - Keep titles short and descriptive
   - Use parallel structure for consistency

### Layout Guidelines

1. **Component ordering**
   - Place MinimalList before ContentSplit for better content flow
   - Use no more than 2-3 components per page
   - Consider the reading flow and visual hierarchy

2. **Content balance**
   - Match the complexity of left and right content in ContentSplit
   - Ensure consistent item lengths in MinimalList
   - Use the `reversed` option to improve visual balance

3. **Mobile considerations**
   - Components automatically stack on mobile devices
   - Keep meta information concise for mobile display
   - Test readability on different screen sizes

### Technical Guidelines

1. **Field validation**
   - All required fields must be provided (enforced by Zod schema)
   - Array fields cannot be empty
   - Type field must match exactly ("ContentSplit" or "MinimalList")

2. **Performance**
   - Components are rendered server-side for optimal performance
   - No JavaScript required for basic functionality
   - Images and media should be optimized externally

3. **Accessibility**
   - Components include proper semantic HTML structure
   - Color contrast meets WCAG guidelines
   - Keyboard navigation is fully supported

## Common Use Cases

### For Reports

**Market Analysis Report**
```yaml
components:
  - type: "ContentSplit"
    leftTitle: "Market Dynamics"
    leftDescription: "Current market conditions show significant opportunities for growth across multiple sectors."
    rightTitle: "Key Findings"
    rightItems:
      - title: "Market Growth"
        description: "23% year-over-year growth in target demographics."
        meta: "Primary"
      - title: "Competitive Landscape"
        description: "Limited competition in emerging market segments."
        meta: "Secondary"
```

**Technical Report**
```yaml
components:
  - type: "MinimalList"
    title: "System Requirements"
    numbered: false
    items:
      - title: "Infrastructure"
        description: "Cloud-based architecture with auto-scaling capabilities."
        meta: "Critical"
      - title: "Security"
        description: "End-to-end encryption and compliance with industry standards."
        meta: "Critical"
```

### For Projects

**Software Development Project**
```yaml
components:
  - type: "MinimalList"
    title: "Development Phases"
    numbered: true
    items:
      - title: "Planning & Analysis"
        description: "Requirements gathering and technical specification."
        meta: "4 weeks"
      - title: "Development & Testing"
        description: "Agile development with continuous integration."
        meta: "12 weeks"

  - type: "ContentSplit"
    leftTitle: "Technical Approach"
    leftDescription: "Modern web technologies with emphasis on performance and maintainability."
    rightTitle: "Technology Stack"
    rightItems:
      - title: "Frontend"
        description: "React with TypeScript for type safety."
        meta: "UI/UX"
      - title: "Backend"
        description: "Node.js with Express and PostgreSQL."
        meta: "API"
```

## Troubleshooting

### Common Issues

1. **Component not rendering**
   - Check that the `type` field exactly matches "ContentSplit" or "MinimalList"
   - Ensure all required fields are provided
   - Verify YAML syntax is correct

2. **Validation errors**
   - Review the field reference table for required fields
   - Check that arrays contain at least one item
   - Ensure string fields are not empty

3. **Styling issues**
   - Components inherit the theme's design system
   - Custom CSS modifications should be made in the component files
   - Test responsiveness on different screen sizes

### Getting Help

- Check the browser console for validation errors
- Review the Zod schema in `/src/content/config.ts` for exact field requirements
- Test with minimal examples first, then add complexity
- Ensure your markdown frontmatter YAML is properly formatted

## Migration from Other Systems

### From Static HTML
If you're migrating from static HTML components:

1. Extract content into structured data
2. Map HTML sections to component types
3. Convert styling information to meta fields
4. Test component rendering before removing HTML

### From Other CMSs
When migrating from other content management systems:

1. Export existing structured content as JSON
2. Map field names to component schema
3. Validate data structure against Zod schema
4. Import into your chosen headless CMS