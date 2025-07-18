import { defineCollection, z } from 'astro:content';

const insightsCollection = defineCollection({
  type: 'content', // Using 'content' type for Markdown files
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    description: z.string(),
    author: z.string(),
    publishDate: z.string(),
    category: z.string(),
    tags: z.array(z.string()),
    readTime: z.string(),
    featured: z.boolean().optional(),
    
    // Component data sections
    executiveSummary: z.object({
      keyPoints: z.array(z.string()),
      recommendations: z.object({
        immediate: z.string(),
        shortTerm: z.string(),
        longTerm: z.string()
      }),
      nextReview: z.string().optional(),
      timeline: z.string().optional()
    }).optional(),
    
    financialHighlights: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      highlights: z.array(z.object({
        label: z.string(),
        value: z.string(),
        change: z.string(),
        period: z.string()
      }))
    }).optional(),
    
    clientInsights: z.object({
      title: z.string().optional(),
      subtitle: z.string().optional(),
      insights: z.array(z.object({
        category: z.string(),
        score: z.string(),
        feedback: z.string(),
        statistic: z.string()
      }))
    }).optional(),
    
    // Legacy support for metrics field (maps to financialHighlights)
    metrics: z.array(z.object({
      label: z.string(),
      value: z.string(),
      change: z.string(),
      period: z.string()
    })).optional(),
    
    // Legacy support for insights field (needs conversion)
    insights: z.array(z.object({
      category: z.string(),
      score: z.number(),
      feedback: z.string(),
      clients: z.number()
    })).optional()
  }),
});

export const collections = {
  insights: insightsCollection,
};