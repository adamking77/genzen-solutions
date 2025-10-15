import { z } from 'zod';

export const reportsFrontmatterSchema = z.object({
  id: z.string().optional(),
  slug: z.string().optional(),
  title: z.string().min(1),
  subtitle: z.string().optional(),
  description: z.string().min(10),
  excerpt: z.string().max(500).optional(),
  tldr: z.string().max(800).optional(),
  author: z.string().min(1),
  publishDate: z.string().regex(/^\w+ \d{4}$/),
  lastModified: z.string().datetime().optional(),
  category: z.enum([
    'Strategic',
    'Financial',
    'Market Analysis',
    'Technology',
    'Performance',
    'Regional',
  ]),
  tags: z.array(z.string().min(1)).min(1).max(10),
  readTime: z.string().regex(/^\d+\s+min\s+read$/),
  difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced']).optional(),
  language: z.string().default('en'),
  published: z.boolean().default(true),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
  featuredImage: z.string().url().optional(),
  featuredImageAlt: z.string().optional(),
  socialImage: z.string().url().optional(),
  canonicalUrl: z.string().url().optional(),
  technologies: z.array(z.string()).optional(),
  services: z.array(z.string()).optional(),
  contentSource: z.enum(['local', 'cms', 'api']).default('local'),
  cmsId: z.string().optional(),
  version: z.string().default('1.0'),
  viewCount: z.number().min(0).default(0),
  downloadCount: z.number().min(0).default(0),
  engagement: z.number().min(0).max(100).optional(),
});

export type ReportsFrontmatter = z.infer<typeof reportsFrontmatterSchema>;
export type ReportsFrontmatterInput = z.input<typeof reportsFrontmatterSchema>;
