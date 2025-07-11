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
    // Dynamic report content sections
    executiveSummary: z.object({
      keyPoints: z.array(z.string()),
      recommendations: z.array(z.object({
        category: z.string(),
        description: z.string(),
        timeline: z.string().optional()
      })),
      nextReview: z.string().optional(),
      projectTimeline: z.string().optional()
    }).optional(),
    dataVisualization: z.object({
      title: z.string(),
      description: z.string(),
      services: z.array(z.object({
        name: z.string(),
        description: z.string()
      }))
    }).optional(),
    financialHighlights: z.object({
      title: z.string(),
      description: z.string(),
      highlights: z.array(z.object({
        label: z.string(),
        value: z.string(),
        change: z.string(),
        period: z.string()
      }))
    }).optional(),
    clientInsights: z.object({
      title: z.string(),
      subtitle: z.string(),
      insights: z.array(z.object({
        category: z.string(),
        score: z.string(),
        feedback: z.string(),
        statistic: z.string()
      }))
    }).optional(),
    marketAnalysis: z.object({
      title: z.string(),
      description: z.string(),
      marketGrowth: z.string(),
      confidenceLevel: z.string(),
      chartData: z.array(z.object({
        month: z.string(),
        growth: z.number(),
        competition: z.number()
      })).optional()
    }).optional(),
    industryTrends: z.object({
      title: z.string(),
      description: z.string(),
      currentAdoption: z.number(),
      growthPotential: z.number(),
      trendData: z.array(z.object({
        sector: z.string(),
        adoption: z.number(),
        potential: z.number()
      })).optional()
    }).optional(),
    futureOutlook: z.object({
      title: z.string(),
      description: z.string(),
      projections: z.array(z.object({
        year: z.string(),
        revenue: z.string(),
        growth: z.string(),
        confidence: z.number()
      })),
      initiatives: z.array(z.object({
        title: z.string(),
        timeline: z.string(),
        impact: z.string(),
        description: z.string()
      }))
    }).optional()
  }),
});

export const collections = {
  reports: reportsCollection,
};