import { defineCollection, z } from 'astro:content';

// Component schemas for content collections
const contentSplitItemsSchema = z.object({
  type: z.literal('ContentSplit'),
  leftTitle: z.string(),
  leftDescription: z.string(),
  rightTitle: z.string(),
  rightItems: z.array(z.object({
    title: z.string(),
    description: z.string(),
    meta: z.string().optional(),
  })),
  reversed: z.boolean().optional(),
});

const contentSplitChartSchema = z.object({
  type: z.literal('ContentSplit'),
  leftTitle: z.string(),
  leftDescription: z.string(),
  rightTitle: z.string(),
  rightChart: z.object({
    id: z.string(),
    title: z.string().optional(),
    description: z.string().optional(),
    embedUrl: z.string(),
    height: z.string().optional(),
  }),
  reversed: z.boolean().optional(),
});

const contentSplitSchema = z.union([contentSplitItemsSchema, contentSplitChartSchema]);

const minimalListSchema = z.object({
  type: z.literal('MinimalList'),
  title: z.string(),
  items: z.array(z.object({
    title: z.string(),
    description: z.string(),
    meta: z.string().optional(),
  })),
  numbered: z.boolean().optional(),
});

const componentSchema = z.union([
  contentSplitSchema,
  minimalListSchema,
]);


// Projects collection for portfolio items, case studies, work samples
const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    // Core identification
    id: z.string().optional(),
    slug: z.string().optional(),
    
    // Content metadata
    title: z.string().min(1, "Project title is required"),
    subtitle: z.string().optional(),
    description: z.string().min(10, "Project description must be at least 10 characters"),
    excerpt: z.string().min(10, "Project excerpt is required for listings").max(200),
    
    // Project details
    client: z.string().optional(),
    industry: z.string().optional(),
    services: z.array(z.string()).default([]),
    technologies: z.array(z.string()).default([]),
    
    // Timeline and status
    startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date format should be YYYY-MM-DD"),
    endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date format should be YYYY-MM-DD").optional(),
    status: z.enum(['completed', 'in-progress', 'planned']).default('completed'),
    
    // Categorization and metadata
    category: z.enum([
      'Web Development',
      'Mobile App',
      'Design',
      'Consulting',
      'Strategy',
      'E-commerce',
      'API Development',
      'Other'
    ]),
    tags: z.array(z.string().min(1)).min(1, "At least one tag is required").max(8, "Maximum 8 tags allowed"),
    
    // Display and visibility
    featured: z.boolean().default(false),
    published: z.boolean().default(true),
    order: z.number().optional(), // for manual ordering
    
    // Media and assets
    featuredImage: z.string().url("Featured image must be a valid URL").optional(),
    gallery: z.array(z.string().url("Gallery image must be a valid URL")).default([]),
    demoUrl: z.string().url("Demo URL must be valid").optional(),
    repositoryUrl: z.string().url("Repository URL must be valid").optional(),
    
    // SEO and metadata
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    canonicalUrl: z.string().url("Canonical URL must be valid").optional(),
    
    // Analytics (optional)
    viewCount: z.number().min(0).optional(),
    likes: z.number().min(0).optional(),
    
    // Components for enhanced content presentation
    components: z.array(componentSchema).optional(),
  }).strict(),
});

// Pages collection for dynamic page creation from CMS
const pagesCollection = defineCollection({
  type: 'content', 
  schema: z.object({
    // Core identification
    id: z.string().optional(),
    slug: z.string().optional(),
    
    // Content metadata
    title: z.string().min(1, "Page title is required"),
    description: z.string().min(10, "Page description is required"),
    
    // Layout and display
    layout: z.enum(['default', 'full-width', 'sidebar', 'landing']).default('default'),
    template: z.enum(['basic', 'hero', 'contact', 'about', 'services']).default('basic'),
    
    // Navigation and hierarchy
    parent: z.string().optional(), // for nested pages
    menuOrder: z.number().optional(),
    showInMenu: z.boolean().default(true),
    menuLabel: z.string().optional(), // override for menu display
    
    // Publishing
    published: z.boolean().default(true),
    publishDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date format should be YYYY-MM-DD").optional(),
    lastModified: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date format should be YYYY-MM-DD").optional(),
    
    // SEO and metadata
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    featuredImage: z.string().url("Featured image must be a valid URL").optional(),
    canonicalUrl: z.string().url("Canonical URL must be valid").optional(),
    noindex: z.boolean().default(false),
    
    // Content structure (for flexible page building)
    sections: z.array(z.object({
      type: z.enum(['hero', 'content', 'gallery', 'contact', 'cta', 'testimonials']),
      title: z.string().optional(),
      content: z.string().optional(),
      settings: z.record(z.any()).optional(), // flexible settings object
    })).optional(),
  }).strict(),
});

const reportsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    // Core identification - Required for proper functioning
    id: z.string().optional(), // Auto-generated from filename, can be optional
    slug: z.string().optional(), // Auto-generated from filename, can be optional
    
    // Content metadata - Essential fields should be required
    title: z.string().min(1, "Title is required"),
    subtitle: z.string().optional(),
    description: z.string().min(10, "Description must be at least 10 characters"),
    tldr: z.string().max(800, "TLDR should be concise (max 800 characters)").optional(),
    
    // Publishing information - Key fields required for consistency
    author: z.string().min(1, "Author is required"),
    publishDate: z.string().regex(/^\w+ \d{4}$/, "Date format should be 'Month YEAR' (e.g., 'December 2024')"),
    category: z.enum([
      "Strategic", 
      "Financial", 
      "Market Analysis", 
      "Technology", 
      "Performance", 
      "Regional"
    ], {
      errorMap: () => ({ message: "Category must be one of: Strategic, Financial, Market Analysis, Technology, Performance, Regional" })
    }),
    tags: z.array(z.string().min(1)).min(1, "At least one tag is required").max(10, "Maximum 10 tags allowed"),
    readTime: z.string().regex(/^\d+\s+min\s+read$/, "Read time format should be 'X min read'"),
    
    // Display options - Clear defaults with validation
    featured: z.boolean().default(false),
    published: z.boolean().default(true),
    
    // Additional metadata - Optional but validated when present
    templateVersion: z.string().default("1.0"),
    lastModified: z.string().optional(),
    
    // SEO and Social Media - Optional but important
    featuredImage: z.string().url("Featured image must be a valid URL").optional(),
    canonicalUrl: z.string().url("Canonical URL must be valid").optional(),
    
    // Performance tracking - Optional analytics
    viewCount: z.number().min(0).optional(),
    downloadCount: z.number().min(0).optional(),
    
    // Components for enhanced content presentation
    components: z.array(componentSchema).optional(),
  }).strict(), // Use strict() instead of passthrough() for better validation
});

export const collections = {
  reports: reportsCollection,
  projects: projectsCollection,  
  pages: pagesCollection,
};