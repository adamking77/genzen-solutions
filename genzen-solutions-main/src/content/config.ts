import { defineCollection, z } from 'astro:content';

// Enhanced content collection optimized for Astro best practices and CMS integration
const reportsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    // Core identification - CMS compatible
    id: z.string().optional(),
    slug: z.string().optional(),
    
    // Essential content metadata
    title: z.string().min(1, "Title is required"),
    subtitle: z.string().optional(),
    description: z.string().min(10, "Description must be at least 10 characters"),
    excerpt: z.string().max(500, "Excerpt should be concise").optional(),
    tldr: z.string().max(800, "TLDR should be concise").optional(),
    
    // Publishing workflow - CMS friendly
    author: z.string().min(1, "Author is required"),
    publishDate: z.union([
      z.string().regex(/^\w+ \d{4}$/, "Date format: 'Month YEAR'"),
      z.date().transform(date => date.toISOString().split('T')[0])
    ]),
    lastModified: z.union([
      z.string().datetime().optional(),
      z.date().transform(date => date.toISOString()).optional()
    ]).optional(),
    
    // Content classification
    category: z.enum([
      "Strategic", 
      "Financial", 
      "Market Analysis", 
      "Technology", 
      "Performance", 
      "Regional"
    ]),
    tags: z.array(z.string().min(1)).min(1).max(10),
    
    // Content metadata
    readTime: z.string().regex(/^\d+\s+min\s+read$/),
    difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced']).optional(),
    language: z.string().default('en'),
    
    // Publishing controls
    published: z.boolean().default(true),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    
    // Media and SEO - CMS optimized
    featuredImage: z.string().url().optional(),
    featuredImageAlt: z.string().optional(),
    socialImage: z.string().url().optional(),
    canonicalUrl: z.string().url().optional(),
    
    // Optional report-specific metadata
    technologies: z.array(z.string()).optional(),
    services: z.array(z.string()).optional(),
    
    // CMS integration fields
    contentSource: z.enum(['local', 'cms', 'api']).default('local'),
    cmsId: z.string().optional(),
    version: z.string().default("1.0"),
    
    // Analytics and performance
    viewCount: z.number().min(0).default(0),
    downloadCount: z.number().min(0).default(0),
    engagement: z.number().min(0).max(100).optional(),
  })
});

export const collections = {
  reports: reportsCollection,
};