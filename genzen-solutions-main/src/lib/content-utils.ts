import type { CollectionEntry } from 'astro:content';
import { z } from 'zod';

// Content transformation utilities for CMS integration and content processing

export type ReportEntry = CollectionEntry<'reports'>;
export type ReportData = ReportEntry['data'];

/**
 * Content source types for unified handling
 */
export type ContentSource = 'local' | 'cms' | 'api';

/**
 * CMS content interface for external content sources
 */
export interface CMSReport {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  content: string;
  author: string;
  publishDate: string | Date;
  category: string;
  tags: string[];
  featured?: boolean;
  published?: boolean;
  featuredImage?: string;
  lastModified?: string | Date;
  [key: string]: any;
}

/**
 * Transform CMS data to match our content collection schema
 */
export function transformCMSToReport(cmsData: CMSReport): Partial<ReportData> {
  return {
    id: cmsData.id,
    title: cmsData.title,
    subtitle: cmsData.subtitle,
    description: cmsData.description,
    author: cmsData.author,
    publishDate: typeof cmsData.publishDate === 'string' 
      ? cmsData.publishDate 
      : formatDate(cmsData.publishDate),
    category: cmsData.category as ReportData['category'],
    tags: cmsData.tags,
    featured: cmsData.featured ?? false,
    published: cmsData.published ?? true,
    featuredImage: cmsData.featuredImage,
    lastModified: cmsData.lastModified 
      ? (typeof cmsData.lastModified === 'string' ? cmsData.lastModified : cmsData.lastModified.toISOString())
      : undefined,
    contentSource: 'cms' as const,
    cmsId: cmsData.id,
  };
}

/**
 * Format date for consistent display across content sources
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', { 
    month: 'long', 
    year: 'numeric' 
  });
}

/**
 * Calculate reading time based on content length
 */
export function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

/**
 * Generate SEO-friendly slug from title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/**
 * Validate content data against our schema
 */
export function validateReportData(data: unknown): data is ReportData {
  try {
    const schema = z.object({
      title: z.string().min(1),
      description: z.string().min(10),
      author: z.string().min(1),
      publishDate: z.string(),
      category: z.enum(["Strategic", "Financial", "Market Analysis", "Technology", "Performance", "Regional"]),
      tags: z.array(z.string().min(1)).min(1).max(10),
      published: z.boolean().default(true),
      featured: z.boolean().default(false),
    });
    
    schema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Content processing pipeline for unified handling
 */
export class ContentProcessor {
  /**
   * Process content from any source into standardized format
   */
  static async processContent(
    source: ContentSource,
    data: CMSReport | ReportEntry
  ): Promise<Partial<ReportData> | null> {
    try {
      switch (source) {
        case 'cms':
          return transformCMSToReport(data as CMSReport);
          
        case 'local':
          const localEntry = data as ReportEntry;
          return {
            ...localEntry.data,
            contentSource: 'local',
            readTime: localEntry.data.readTime || calculateReadTime(localEntry.body || ''),
          };
          
        case 'api':
          // API content transformation logic would go here
          return transformCMSToReport(data as CMSReport);
          
        default:
          throw new Error(`Unsupported content source: ${source}`);
      }
    } catch (error) {
      console.error('Content processing error:', error);
      return null;
    }
  }

  /**
   * Batch process multiple content items
   */
  static async processBatch(
    items: Array<{ source: ContentSource; data: CMSReport | ReportEntry }>
  ): Promise<Array<Partial<ReportData>>> {
    const processed = await Promise.allSettled(
      items.map(({ source, data }) => this.processContent(source, data))
    );

    return processed
      .filter((result): result is PromiseFulfilledResult<Partial<ReportData>> => 
        result.status === 'fulfilled' && result.value !== null
      )
      .map(result => result.value);
  }
}

/**
 * Content caching utilities for performance optimization
 */
export class ContentCache {
  private static cache = new Map<string, any>();
  private static ttl = 1000 * 60 * 15; // 15 minutes

  static set(key: string, data: any): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  static get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() - entry.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  static clear(): void {
    this.cache.clear();
  }

  static has(key: string): boolean {
    return this.cache.has(key) && this.get(key) !== null;
  }
}