import { defineCollection, z } from 'astro:content';

const reportsCollection = defineCollection({
  type: 'data', // Using 'data' type for JSON files
  schema: z.object({
    id: z.string(),
    slug: z.string(),
    title: z.string(),
    subtitle: z.string(),
    description: z.string(),
    author: z.string(),
    publishDate: z.string(),
    category: z.string(),
    tags: z.array(z.string()),
    readTime: z.string(),
    featured: z.boolean(),
    // New structure with sections array and sectionData
    sections: z.array(z.object({
      component: z.string(),
      key: z.string()
    })).optional(),
    sectionData: z.record(z.any()).optional() // Flexible schema for different section types
  }),
});

export const collections = {
  reports: reportsCollection,
};