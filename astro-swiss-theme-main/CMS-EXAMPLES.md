# Headless CMS Integration Examples

This document provides detailed examples for integrating the Astro Swiss Theme's layout components with popular headless CMS platforms.

## Platform-Specific Examples

### 1. Contentful

#### Content Type Setup

**Step 1: Create Content Type**
```json
{
  "name": "Report",
  "displayField": "title",
  "fields": [
    {
      "id": "title",
      "name": "Title",
      "type": "Symbol",
      "required": true
    },
    {
      "id": "slug",
      "name": "Slug",
      "type": "Symbol",
      "required": true,
      "unique": true
    },
    {
      "id": "description",
      "name": "Description",
      "type": "Text",
      "required": true
    },
    {
      "id": "content",
      "name": "Content",
      "type": "RichText"
    },
    {
      "id": "components",
      "name": "Layout Components",
      "type": "Array",
      "items": {
        "type": "Object",
        "validations": [
          {
            "size": {
              "max": 5
            }
          }
        ]
      }
    },
    {
      "id": "author",
      "name": "Author",
      "type": "Symbol",
      "required": true
    },
    {
      "id": "publishDate",
      "name": "Publish Date",
      "type": "Date",
      "required": true
    },
    {
      "id": "category",
      "name": "Category",
      "type": "Symbol",
      "validations": [
        {
          "in": ["Strategic", "Financial", "Market Analysis", "Technology", "Performance", "Regional"]
        }
      ]
    }
  ]
}
```

**Step 2: Content Entry Examples**

**Marketing Report Entry:**
```json
{
  "fields": {
    "title": "Digital Marketing Strategy 2024",
    "slug": "digital-marketing-strategy-2024",
    "description": "Comprehensive digital marketing strategy focusing on emerging platforms and customer engagement.",
    "author": "Marketing Team",
    "publishDate": "2024-03-15",
    "category": "Strategic",
    "components": [
      {
        "type": "ContentSplit",
        "leftTitle": "Strategic Approach",
        "leftDescription": "Our digital marketing strategy leverages data-driven insights to optimize customer acquisition and retention across multiple channels. We focus on creating personalized experiences that drive meaningful engagement and measurable business results.",
        "rightTitle": "Key Channels",
        "rightItems": [
          {
            "title": "Social Media Marketing",
            "description": "Multi-platform social campaigns with targeted content and community engagement.",
            "meta": "Primary"
          },
          {
            "title": "Email Marketing",
            "description": "Automated email sequences with personalization and behavioral targeting.",
            "meta": "Primary"
          },
          {
            "title": "Content Marketing",
            "description": "SEO-optimized blog content and thought leadership articles.",
            "meta": "Secondary"
          },
          {
            "title": "Paid Advertising",
            "description": "PPC campaigns across Google Ads and social media platforms.",
            "meta": "Secondary"
          }
        ],
        "reversed": false
      },
      {
        "type": "MinimalList",
        "title": "Implementation Timeline",
        "numbered": true,
        "items": [
          {
            "title": "Strategy Development",
            "description": "Market research, competitor analysis, and strategic planning phase.",
            "meta": "Month 1"
          },
          {
            "title": "Campaign Creation",
            "description": "Content creation, asset development, and campaign setup.",
            "meta": "Month 2"
          },
          {
            "title": "Launch & Optimization",
            "description": "Campaign launch with continuous monitoring and optimization.",
            "meta": "Month 3-6"
          },
          {
            "title": "Performance Review",
            "description": "Comprehensive analysis and strategy refinement for next quarter.",
            "meta": "Month 6"
          }
        ]
      }
    ]
  }
}
```

**Technical Report Entry:**
```json
{
  "fields": {
    "title": "Cloud Migration Assessment",
    "slug": "cloud-migration-assessment",
    "description": "Comprehensive assessment of current infrastructure and cloud migration roadmap.",
    "author": "DevOps Team",
    "publishDate": "2024-04-20",
    "category": "Technology",
    "components": [
      {
        "type": "MinimalList",
        "title": "Migration Phases",
        "numbered": true,
        "items": [
          {
            "title": "Infrastructure Assessment",
            "description": "Complete audit of existing systems, dependencies, and performance baselines.",
            "meta": "4 weeks"
          },
          {
            "title": "Migration Strategy",
            "description": "Develop detailed migration plan with risk assessment and rollback procedures.",
            "meta": "2 weeks"
          },
          {
            "title": "Pilot Migration",
            "description": "Migrate non-critical applications to validate approach and identify issues.",
            "meta": "6 weeks"
          },
          {
            "title": "Full Migration",
            "description": "Complete migration of all applications with monitoring and optimization.",
            "meta": "12 weeks"
          }
        ]
      },
      {
        "type": "ContentSplit",
        "leftTitle": "Cloud Benefits",
        "leftDescription": "Migrating to cloud infrastructure will provide significant benefits including improved scalability, reduced operational costs, enhanced security, and increased deployment velocity.",
        "rightTitle": "Expected Outcomes",
        "rightItems": [
          {
            "title": "Cost Reduction",
            "description": "40% reduction in infrastructure costs through optimized resource usage.",
            "meta": "Financial"
          },
          {
            "title": "Improved Performance",
            "description": "50% faster deployment times with auto-scaling capabilities.",
            "meta": "Performance"
          },
          {
            "title": "Enhanced Security",
            "description": "Enterprise-grade security with compliance certifications.",
            "meta": "Security"
          },
          {
            "title": "Better Reliability",
            "description": "99.9% uptime SLA with automated disaster recovery.",
            "meta": "Reliability"
          }
        ],
        "reversed": false
      }
    ]
  }
}
```

#### Contentful API Integration

```typescript
// lib/contentful.ts
import { createClient } from 'contentful';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export interface ContentfulReport {
  fields: {
    title: string;
    slug: string;
    description: string;
    content: any; // Rich text content
    components: ComponentData[];
    author: string;
    publishDate: string;
    category: string;
  };
}

export async function getReports(): Promise<ContentfulReport[]> {
  const entries = await client.getEntries({
    content_type: 'report',
    order: '-fields.publishDate'
  });
  
  return entries.items as ContentfulReport[];
}

export async function getReportBySlug(slug: string): Promise<ContentfulReport | null> {
  const entries = await client.getEntries({
    content_type: 'report',
    'fields.slug': slug,
    limit: 1
  });
  
  return entries.items[0] as ContentfulReport || null;
}
```

### 2. Strapi

#### Collection Type Setup

**Step 1: Create Collection Type**

```javascript
// api/report/models/report.js
module.exports = {
  attributes: {
    title: {
      type: 'string',
      required: true,
    },
    slug: {
      type: 'uid',
      targetField: 'title',
      required: true,
    },
    description: {
      type: 'text',
      required: true,
    },
    content: {
      type: 'richtext',
    },
    components: {
      type: 'json',
    },
    author: {
      type: 'string',
      required: true,
    },
    publishDate: {
      type: 'date',
      required: true,
    },
    category: {
      type: 'enumeration',
      enum: ['Strategic', 'Financial', 'Market Analysis', 'Technology', 'Performance', 'Regional'],
      required: true,
    },
    featured: {
      type: 'boolean',
      default: false,
    },
  },
};
```

**Step 2: API Configuration**

```javascript
// api/report/config/routes.json
{
  "routes": [
    {
      "method": "GET",
      "path": "/reports",
      "handler": "report.find",
      "config": {
        "policies": []
      }
    },
    {
      "method": "GET",
      "path": "/reports/:slug",
      "handler": "report.findOne",
      "config": {
        "policies": []
      }
    }
  ]
}
```

**Step 3: Content Examples**

**Product Launch Report:**
```json
{
  "title": "Product Launch Analysis Q1 2024",
  "slug": "product-launch-analysis-q1-2024",
  "description": "Detailed analysis of our Q1 product launches including performance metrics and market feedback.",
  "author": "Product Team",
  "publishDate": "2024-04-01",
  "category": "Performance",
  "components": [
    {
      "type": "ContentSplit",
      "leftTitle": "Launch Overview",
      "leftDescription": "Our Q1 product launches exceeded expectations across all key performance indicators. The strategic approach of staggered releases allowed for optimal market penetration and customer adoption.",
      "rightTitle": "Key Products",
      "rightItems": [
        {
          "title": "Mobile App 2.0",
          "description": "Complete redesign with new features and improved user experience.",
          "meta": "February"
        },
        {
          "title": "Enterprise Dashboard",
          "description": "Advanced analytics platform for business intelligence and reporting.",
          "meta": "March"
        },
        {
          "title": "API Platform",
          "description": "Developer-friendly API suite with comprehensive documentation.",
          "meta": "March"
        }
      ]
    },
    {
      "type": "MinimalList",
      "title": "Success Metrics",
      "numbered": false,
      "items": [
        {
          "title": "User Adoption",
          "description": "150% increase in active users within 30 days of mobile app launch.",
          "meta": "Primary KPI"
        },
        {
          "title": "Revenue Impact",
          "description": "25% growth in monthly recurring revenue from enterprise customers.",
          "meta": "Primary KPI"
        },
        {
          "title": "Developer Engagement",
          "description": "500+ developers registered for API platform in first month.",
          "meta": "Secondary KPI"
        },
        {
          "title": "Customer Satisfaction",
          "description": "4.8/5 average rating across all new product features.",
          "meta": "Secondary KPI"
        }
      ]
    }
  ]
}
```

#### Strapi API Integration

```typescript
// lib/strapi.ts
const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';

export interface StrapiReport {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  components: ComponentData[];
  author: string;
  publishDate: string;
  category: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export async function getReports(): Promise<StrapiReport[]> {
  const response = await fetch(`${STRAPI_URL}/api/reports?sort=publishDate:desc`);
  const data = await response.json();
  return data.data;
}

export async function getReportBySlug(slug: string): Promise<StrapiReport | null> {
  const response = await fetch(`${STRAPI_URL}/api/reports?filters[slug][$eq]=${slug}`);
  const data = await response.json();
  return data.data[0] || null;
}
```

### 3. Sanity

#### Schema Setup

**Step 1: Document Schema**

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
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.required()
    },
    {
      name: 'content',
      title: 'Content',
      type: 'blockContent'
    },
    {
      name: 'components',
      title: 'Layout Components',
      type: 'array',
      of: [
        {type: 'contentSplit'},
        {type: 'minimalList'}
      ]
    },
    {
      name: 'author',
      title: 'Author',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'publishDate',
      title: 'Publish Date',
      type: 'datetime',
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Strategic', value: 'strategic'},
          {title: 'Financial', value: 'financial'},
          {title: 'Market Analysis', value: 'market-analysis'},
          {title: 'Technology', value: 'technology'},
          {title: 'Performance', value: 'performance'},
          {title: 'Regional', value: 'regional'}
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false
    }
  ],
  orderings: [
    {
      title: 'Publish Date (Newest)',
      name: 'publishDateDesc',
      by: [{field: 'publishDate', direction: 'desc'}]
    }
  ]
}
```

**Step 2: Component Schemas**

```javascript
// schemas/contentSplit.js
export default {
  name: 'contentSplit',
  title: 'Content Split',
  type: 'object',
  fields: [
    {
      name: 'type',
      type: 'string',
      initialValue: 'ContentSplit',
      hidden: true
    },
    {
      name: 'leftTitle',
      title: 'Left Column Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'leftDescription',
      title: 'Left Column Description',
      type: 'text',
      rows: 6,
      validation: Rule => Rule.required()
    },
    {
      name: 'rightTitle',
      title: 'Right Column Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'rightItems',
      title: 'Right Column Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              validation: Rule => Rule.required()
            },
            {
              name: 'meta',
              title: 'Meta Information',
              type: 'string',
              description: 'Optional timing, category, or status information'
            }
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'meta'
            }
          }
        }
      ],
      validation: Rule => Rule.min(1).max(8)
    },
    {
      name: 'reversed',
      title: 'Reversed Layout',
      type: 'boolean',
      initialValue: false,
      description: 'Swap left and right columns on desktop'
    }
  ],
  preview: {
    select: {
      title: 'leftTitle',
      subtitle: 'rightTitle',
      items: 'rightItems'
    },
    prepare({title, subtitle, items}) {
      return {
        title: `Content Split: ${title}`,
        subtitle: `${subtitle} (${items?.length || 0} items)`
      }
    }
  }
}
```

```javascript
// schemas/minimalList.js
export default {
  name: 'minimalList',
  title: 'Minimal List',
  type: 'object',
  fields: [
    {
      name: 'type',
      type: 'string',
      initialValue: 'MinimalList',
      hidden: true
    },
    {
      name: 'title',
      title: 'List Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'numbered',
      title: 'Numbered List',
      type: 'boolean',
      initialValue: false,
      description: 'Use numbers instead of bullet points'
    },
    {
      name: 'items',
      title: 'List Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              validation: Rule => Rule.required()
            },
            {
              name: 'meta',
              title: 'Meta Information',
              type: 'string',
              description: 'Optional timing, category, or status information'
            }
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'meta'
            }
          }
        }
      ],
      validation: Rule => Rule.min(1).max(10)
    }
  ],
  preview: {
    select: {
      title: 'title',
      items: 'items',
      numbered: 'numbered'
    },
    prepare({title, items, numbered}) {
      return {
        title: `${numbered ? 'Numbered' : 'Bulleted'} List: ${title}`,
        subtitle: `${items?.length || 0} items`
      }
    }
  }
}
```

**Step 3: Content Examples**

Using Sanity Studio, create content with the visual editor:

**Financial Report Example:**
```javascript
// This would be created through Sanity Studio UI, but here's the resulting data structure
{
  "_type": "report",
  "title": "Q1 2024 Financial Performance",
  "slug": {"current": "q1-2024-financial-performance"},
  "description": "Comprehensive analysis of Q1 financial results with projections for Q2.",
  "author": "Finance Team",
  "publishDate": "2024-04-15T09:00:00.000Z",
  "category": "financial",
  "components": [
    {
      "_type": "contentSplit",
      "type": "ContentSplit",
      "leftTitle": "Financial Highlights",
      "leftDescription": "Q1 2024 demonstrated strong financial performance with revenue growth exceeding projections across all business units. Cost optimization initiatives contributed to improved margins while strategic investments positioned us for continued growth.",
      "rightTitle": "Key Metrics",
      "rightItems": [
        {
          "title": "Revenue Growth",
          "description": "32% year-over-year revenue increase driven by new customer acquisition.",
          "meta": "Primary"
        },
        {
          "title": "Profit Margin",
          "description": "18.5% gross margin improvement through operational efficiency.",
          "meta": "Primary"
        },
        {
          "title": "Customer Acquisition",
          "description": "45% increase in new customers compared to Q4 2023.",
          "meta": "Growth"
        },
        {
          "title": "Market Expansion",
          "description": "Successful launch in 3 new geographic markets.",
          "meta": "Growth"
        }
      ],
      "reversed": false
    },
    {
      "_type": "minimalList",
      "type": "MinimalList",
      "title": "Q2 Strategic Priorities",
      "numbered": true,
      "items": [
        {
          "title": "Product Development",
          "description": "Accelerate development of next-generation features based on customer feedback.",
          "meta": "High Priority"
        },
        {
          "title": "Market Expansion",
          "description": "Enter 2 additional markets with localized product offerings.",
          "meta": "Medium Priority"
        },
        {
          "title": "Team Scaling",
          "description": "Hire 25 additional team members across engineering and sales.",
          "meta": "High Priority"
        },
        {
          "title": "Partnership Development",
          "description": "Establish strategic partnerships to enhance product ecosystem.",
          "meta": "Medium Priority"
        }
      ]
    }
  ]
}
```

#### Sanity API Integration

```typescript
// lib/sanity.ts
import {createClient} from '@sanity/client'

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2023-05-03'
})

export interface SanityReport {
  _id: string;
  title: string;
  slug: {current: string};
  description: string;
  content: any[];
  components: ComponentData[];
  author: string;
  publishDate: string;
  category: string;
  featured: boolean;
}

export async function getReports(): Promise<SanityReport[]> {
  const query = `*[_type == "report"] | order(publishDate desc) {
    _id,
    title,
    slug,
    description,
    content,
    components,
    author,
    publishDate,
    category,
    featured
  }`;
  
  return await client.fetch(query);
}

export async function getReportBySlug(slug: string): Promise<SanityReport | null> {
  const query = `*[_type == "report" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    content,
    components,
    author,
    publishDate,
    category,
    featured
  }`;
  
  return await client.fetch(query, {slug});
}
```

### 4. Ghost CMS

#### Custom Theme Integration

**Step 1: Theme Structure**

```
ghost-theme/
├── assets/
├── partials/
│   └── components.hbs
├── post.hbs
└── package.json
```

**Step 2: Ghost Post Integration**

```handlebars
{{!-- post.hbs --}}
<article class="post">
    <header class="post-header">
        <h1 class="post-title">{{title}}</h1>
        <p class="post-excerpt">{{excerpt}}</p>
    </header>
    
    <div class="post-content">
        {{content}}
    </div>
    
    {{!-- Render components from custom fields --}}
    {{#if custom.components}}
        {{> components components=custom.components}}
    {{/if}}
</article>
```

```handlebars
{{!-- partials/components.hbs --}}
{{#each components}}
    {{#if (eq type "ContentSplit")}}
        <section class="py-24 lg:py-40 bg-secondary/30">
            <div class="max-w-7xl mx-auto px-8 lg:px-12">
                <div class="grid grid-cols-12 gap-20 {{#if reversed}}lg:[&>*:nth-child(1)]:col-start-7 lg:[&>*:nth-child(2)]:col-start-1 lg:[&>*:nth-child(2)]:row-start-1{{/if}}">
                    <div class="col-span-12 lg:col-span-6">
                        <h2 class="text-4xl md:text-5xl font-light leading-[1.1] tracking-tight">{{leftTitle}}</h2>
                        <p class="text-lg font-light text-muted-foreground">{{leftDescription}}</p>
                    </div>
                    <div class="col-span-12 lg:col-span-6">
                        <h3 class="text-2xl font-light">{{rightTitle}}</h3>
                        {{#each rightItems}}
                            <div class="border-b border-border pb-8">
                                <h4 class="text-xl font-light">{{title}}</h4>
                                {{#if meta}}<span class="text-xs">{{meta}}</span>{{/if}}
                                <p class="text-base font-light">{{description}}</p>
                            </div>
                        {{/each}}
                    </div>
                </div>
            </div>
        </section>
    {{/if}}
    
    {{#if (eq type "MinimalList")}}
        <section class="py-20 lg:py-32 bg-foreground/5">
            <div class="max-w-5xl mx-auto px-8 lg:px-12">
                <h2 class="text-3xl font-light">{{title}}</h2>
                {{#each items}}
                    <div class="flex items-start space-x-8 py-8 border-b border-foreground/10">
                        {{#if ../numbered}}<div class="text-lg font-light w-8">{{@index}}</div>{{/if}}
                        <div class="flex-1">
                            <h3 class="text-xl font-light">{{title}}</h3>
                            {{#if meta}}<div class="text-xs">{{meta}}</div>{{/if}}
                            <p class="text-base font-light">{{description}}</p>
                        </div>
                    </div>
                {{/each}}
            </div>
        </section>
    {{/if}}
{{/each}}
```

### 5. Hygraph (GraphCMS)

#### Content Model Setup

```graphql
type Report implements Node {
  id: ID! @isUnique
  title: String!
  slug: String! @isUnique
  description: String!
  content: RichText
  components: [ComponentUnion!]
  author: String!
  publishDate: DateTime!
  category: CategoryEnum!
  featured: Boolean! @defaultValue(value: false)
}

union ComponentUnion = ContentSplit | MinimalList

type ContentSplit {
  leftTitle: String!
  leftDescription: String!
  rightTitle: String!
  rightItems: [RightItem!]!
  reversed: Boolean! @defaultValue(value: false)
}

type MinimalList {
  title: String!
  numbered: Boolean! @defaultValue(value: false)
  items: [ListItem!]!
}

type RightItem {
  title: String!
  description: String!
  meta: String
}

type ListItem {
  title: String!
  description: String!
  meta: String
}

enum CategoryEnum {
  STRATEGIC
  FINANCIAL
  MARKET_ANALYSIS
  TECHNOLOGY
  PERFORMANCE
  REGIONAL
}
```

#### GraphQL Queries

```graphql
# Get all reports
query GetReports {
  reports(orderBy: publishDate_DESC) {
    id
    title
    slug
    description
    author
    publishDate
    category
    featured
    components {
      ... on ContentSplit {
        leftTitle
        leftDescription
        rightTitle
        rightItems {
          title
          description
          meta
        }
        reversed
      }
      ... on MinimalList {
        title
        numbered
        items {
          title
          description
          meta
        }
      }
    }
  }
}

# Get report by slug
query GetReportBySlug($slug: String!) {
  report(where: {slug: $slug}) {
    id
    title
    slug
    description
    content {
      html
    }
    author
    publishDate
    category
    featured
    components {
      ... on ContentSplit {
        leftTitle
        leftDescription
        rightTitle
        rightItems {
          title
          description
          meta
        }
        reversed
      }
      ... on MinimalList {
        title
        numbered
        items {
          title
          description
          meta
        }
      }
    }
  }
}
```

### 6. Directus

#### Collection Setup

**Step 1: Create Collections**

```javascript
// Reports collection
{
  "collection": "reports",
  "fields": [
    {
      "field": "id",
      "type": "integer",
      "schema": {
        "is_primary_key": true,
        "has_auto_increment": true
      }
    },
    {
      "field": "title",
      "type": "string",
      "schema": {
        "is_nullable": false
      }
    },
    {
      "field": "slug",
      "type": "string",
      "schema": {
        "is_nullable": false,
        "is_unique": true
      }
    },
    {
      "field": "description",
      "type": "text"
    },
    {
      "field": "content",
      "type": "text"
    },
    {
      "field": "components",
      "type": "json"
    },
    {
      "field": "author",
      "type": "string"
    },
    {
      "field": "publish_date",
      "type": "timestamp"
    },
    {
      "field": "category",
      "type": "string"
    }
  ]
}
```

**Step 2: API Integration**

```typescript
// lib/directus.ts
import { Directus } from '@directus/sdk';

interface Report {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  components: ComponentData[];
  author: string;
  publish_date: string;
  category: string;
}

const directus = new Directus(process.env.DIRECTUS_URL!);

export async function getReports(): Promise<Report[]> {
  const response = await directus.items('reports').readByQuery({
    sort: ['-publish_date'],
    limit: -1
  });
  
  return response.data as Report[];
}

export async function getReportBySlug(slug: string): Promise<Report | null> {
  const response = await directus.items('reports').readByQuery({
    filter: {
      slug: {
        _eq: slug
      }
    },
    limit: 1
  });
  
  return response.data?.[0] as Report || null;
}
```

## Migration Scripts

### From WordPress to Components

```javascript
// migration/wordpress-to-components.js
async function migrateWordPressToComponents(posts) {
  return posts.map(post => {
    const components = [];
    
    // Extract content sections that match component patterns
    const contentSections = extractContentSections(post.content);
    
    contentSections.forEach(section => {
      if (section.type === 'list') {
        components.push({
          type: 'MinimalList',
          title: section.title,
          numbered: section.numbered,
          items: section.items.map(item => ({
            title: item.title,
            description: item.description,
            meta: item.meta || null
          }))
        });
      }
      
      if (section.type === 'split') {
        components.push({
          type: 'ContentSplit',
          leftTitle: section.leftTitle,
          leftDescription: section.leftDescription,
          rightTitle: section.rightTitle,
          rightItems: section.rightItems,
          reversed: false
        });
      }
    });
    
    return {
      title: post.title,
      slug: post.slug,
      description: post.excerpt,
      content: post.content,
      components: components,
      author: post.author,
      publishDate: post.date,
      category: mapCategory(post.category)
    };
  });
}
```

### Validation Script

```javascript
// scripts/validate-components.js
import { z } from 'zod';

const componentSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('ContentSplit'),
    leftTitle: z.string().min(1),
    leftDescription: z.string().min(1),
    rightTitle: z.string().min(1),
    rightItems: z.array(z.object({
      title: z.string(),
      description: z.string(),
      meta: z.string().optional()
    })).min(1),
    reversed: z.boolean().optional()
  }),
  z.object({
    type: z.literal('MinimalList'),
    title: z.string().min(1),
    items: z.array(z.object({
      title: z.string(),
      description: z.string(),
      meta: z.string().optional()
    })).min(1),
    numbered: z.boolean().optional()
  })
]);

export function validateComponents(components) {
  try {
    z.array(componentSchema).parse(components);
    return { valid: true, errors: [] };
  } catch (error) {
    return { 
      valid: false, 
      errors: error.errors.map(err => ({
        path: err.path.join('.'),
        message: err.message
      }))
    };
  }
}

// Usage example
const result = validateComponents([
  {
    type: 'ContentSplit',
    leftTitle: 'Example',
    leftDescription: 'Description',
    rightTitle: 'Items',
    rightItems: [
      { title: 'Item 1', description: 'Description 1' }
    ]
  }
]);

if (!result.valid) {
  console.error('Validation errors:', result.errors);
}
```

This comprehensive guide provides everything needed to integrate the layout components with major headless CMS platforms, including setup instructions, content examples, API integration code, and migration utilities.