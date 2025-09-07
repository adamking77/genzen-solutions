import { z } from 'zod';
import type { ReportData } from './content-utils';

/**
 * Enhanced error handling and validation utilities
 */

export class ContentValidationError extends Error {
  constructor(
    message: string,
    public field?: string,
    public value?: any,
    public code?: string
  ) {
    super(message);
    this.name = 'ContentValidationError';
  }
}

export class ContentProcessingError extends Error {
  constructor(
    message: string,
    public source?: string,
    public originalError?: Error
  ) {
    super(message);
    this.name = 'ContentProcessingError';
  }
}

/**
 * Comprehensive validation schemas with detailed error messages
 */
export const ReportSchema = z.object({
  // Core fields with custom validation
  title: z.string()
    .min(1, 'Title is required')
    .max(200, 'Title must be under 200 characters')
    .refine(title => title.trim().length > 0, 'Title cannot be empty or whitespace only'),

  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must be under 1000 characters'),

  author: z.string()
    .min(1, 'Author is required')
    .max(100, 'Author name must be under 100 characters'),

  // Date validation with multiple formats
  publishDate: z.union([
    z.string().regex(
      /^\w+ \d{4}$/,
      'Date format must be "Month YEAR" (e.g., "December 2024")'
    ),
    z.string().datetime('Invalid ISO datetime format'),
    z.date().transform(date => date.toISOString())
  ]),

  // Category with strict enum
  category: z.enum([
    'Strategic',
    'Financial', 
    'Market Analysis',
    'Technology',
    'Performance',
    'Regional'
  ], {
    errorMap: (issue, ctx) => ({
      message: `Category must be one of: Strategic, Financial, Market Analysis, Technology, Performance, Regional. Received: "${ctx.data}"`
    })
  }),

  // Tags validation
  tags: z.array(
    z.string()
      .min(1, 'Tag cannot be empty')
      .max(50, 'Tag must be under 50 characters')
      .refine(tag => !/^\s|\s$/.test(tag), 'Tag cannot start or end with whitespace')
  )
    .min(1, 'At least one tag is required')
    .max(10, 'Maximum 10 tags allowed')
    .refine(tags => {
      const uniqueTags = new Set(tags.map(tag => tag.toLowerCase()));
      return uniqueTags.size === tags.length;
    }, 'Tags must be unique (case-insensitive)'),

  // Read time validation
  readTime: z.string()
    .regex(/^\d+\s+min\s+read$/, 'Read time format must be "X min read"'),

  // Boolean fields with defaults
  published: z.boolean().default(true),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),

  // URL validation for images
  featuredImage: z.string().url('Featured image must be a valid URL').optional(),
  socialImage: z.string().url('Social image must be a valid URL').optional(),
  canonicalUrl: z.string().url('Canonical URL must be a valid URL').optional(),

  // Optional fields with validation
  subtitle: z.string().max(300, 'Subtitle must be under 300 characters').optional(),
  excerpt: z.string().max(500, 'Excerpt must be under 500 characters').optional(),
  tldr: z.string().max(800, 'TLDR must be under 800 characters').optional(),
  featuredImageAlt: z.string().max(200, 'Image alt text must be under 200 characters').optional(),

  // Array fields
  technologies: z.array(z.string().min(1)).max(20, 'Maximum 20 technologies allowed').optional(),
  services: z.array(z.string().min(1)).max(20, 'Maximum 20 services allowed').optional(),

  // Metadata fields
  language: z.string().length(2, 'Language must be a 2-character ISO code').default('en'),
  difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced']).optional(),
  
  // System fields
  contentSource: z.enum(['local', 'cms', 'api']).default('local'),
  cmsId: z.string().optional(),
  version: z.string().default('1.0'),
  
  // Analytics fields
  viewCount: z.number().min(0, 'View count cannot be negative').default(0),
  downloadCount: z.number().min(0, 'Download count cannot be negative').default(0),
  engagement: z.number().min(0).max(100, 'Engagement must be between 0-100').optional(),

  // Optional system fields
  id: z.string().optional(),
  slug: z.string().optional(),
  lastModified: z.union([
    z.string().datetime(),
    z.date().transform(date => date.toISOString())
  ]).optional(),
}).strict();

/**
 * Content validation service
 */
export class ContentValidator {
  /**
   * Validate a single report with detailed error reporting
   */
  static validateReport(data: unknown): {
    success: boolean;
    data?: ReportData;
    errors?: ContentValidationError[];
  } {
    try {
      const validatedData = ReportSchema.parse(data);
      return {
        success: true,
        data: validatedData as ReportData
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationErrors = error.issues.map(issue => 
          new ContentValidationError(
            issue.message,
            issue.path.join('.'),
            issue.code === 'invalid_type' ? `Expected ${issue.expected}, got ${issue.received}` : issue.code,
            issue.code
          )
        );

        return {
          success: false,
          errors: validationErrors
        };
      }

      return {
        success: false,
        errors: [new ContentValidationError('Unknown validation error', undefined, undefined, 'unknown')]
      };
    }
  }

  /**
   * Validate multiple reports with batch error handling
   */
  static validateReportBatch(items: unknown[]): {
    success: boolean;
    validItems: ReportData[];
    errors: Array<{ index: number; errors: ContentValidationError[] }>;
  } {
    const validItems: ReportData[] = [];
    const errors: Array<{ index: number; errors: ContentValidationError[] }> = [];

    items.forEach((item, index) => {
      const result = this.validateReport(item);
      if (result.success && result.data) {
        validItems.push(result.data);
      } else if (result.errors) {
        errors.push({ index, errors: result.errors });
      }
    });

    return {
      success: errors.length === 0,
      validItems,
      errors
    };
  }

  /**
   * Validate required fields only (useful for partial updates)
   */
  static validateRequiredFields(data: unknown): {
    success: boolean;
    errors?: ContentValidationError[];
  } {
    const requiredSchema = z.object({
      title: z.string().min(1),
      description: z.string().min(10),
      author: z.string().min(1),
      category: z.enum(['Strategic', 'Financial', 'Market Analysis', 'Technology', 'Performance', 'Regional']),
      tags: z.array(z.string().min(1)).min(1).max(10),
    });

    try {
      requiredSchema.parse(data);
      return { success: true };
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationErrors = error.issues.map(issue => 
          new ContentValidationError(
            `Required field validation failed: ${issue.message}`,
            issue.path.join('.'),
            issue.code,
            'required_field_error'
          )
        );

        return {
          success: false,
          errors: validationErrors
        };
      }

      return {
        success: false,
        errors: [new ContentValidationError('Unknown required field validation error')]
      };
    }
  }
}

/**
 * Error reporting and logging utilities
 */
export class ErrorReporter {
  private static errors: Array<{
    timestamp: Date;
    error: Error;
    context?: string;
    data?: any;
  }> = [];

  /**
   * Log an error with context
   */
  static logError(error: Error, context?: string, data?: any): void {
    this.errors.push({
      timestamp: new Date(),
      error,
      context,
      data
    });

    // Console logging for development
    if (import.meta.env.DEV) {
      console.group(`🚨 Content Error: ${error.name}`);
      console.error('Message:', error.message);
      if (context) console.log('Context:', context);
      if (data) console.log('Data:', data);
      if (error.stack) console.log('Stack:', error.stack);
      console.groupEnd();
    }
  }

  /**
   * Get recent errors
   */
  static getRecentErrors(limit = 10): Array<{
    timestamp: Date;
    error: Error;
    context?: string;
    data?: any;
  }> {
    return this.errors
      .slice(-limit)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  /**
   * Clear error history
   */
  static clearErrors(): void {
    this.errors = [];
  }

  /**
   * Get error statistics
   */
  static getErrorStats(): {
    total: number;
    byType: Record<string, number>;
    recent: number;
  } {
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);

    const byType = this.errors.reduce((acc, { error }) => {
      acc[error.name] = (acc[error.name] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const recent = this.errors.filter(({ timestamp }) => timestamp > oneHourAgo).length;

    return {
      total: this.errors.length,
      byType,
      recent
    };
  }
}

/**
 * Content health checker
 */
export class ContentHealthChecker {
  /**
   * Perform comprehensive content health check
   */
  static async performHealthCheck(reports: ReportData[]): Promise<{
    healthy: boolean;
    issues: Array<{
      severity: 'error' | 'warning' | 'info';
      message: string;
      field?: string;
      reportId?: string;
    }>;
    stats: {
      totalReports: number;
      publishedReports: number;
      featuredReports: number;
      categoriesUsed: string[];
      averageReadTime: number;
    };
  }> {
    const issues: Array<{
      severity: 'error' | 'warning' | 'info';
      message: string;
      field?: string;
      reportId?: string;
    }> = [];

    // Validation checks
    reports.forEach((report, index) => {
      const validation = ContentValidator.validateReport(report);
      if (!validation.success && validation.errors) {
        validation.errors.forEach(error => {
          issues.push({
            severity: 'error',
            message: error.message,
            field: error.field,
            reportId: report.id || `report-${index}`
          });
        });
      }
    });

    // Content quality checks
    reports.forEach(report => {
      // Check for missing featured images on featured reports
      if (report.featured && !report.featuredImage) {
        issues.push({
          severity: 'warning',
          message: 'Featured report missing featured image',
          field: 'featuredImage',
          reportId: report.id || report.title
        });
      }

      // Check for very short descriptions
      if (report.description.length < 50) {
        issues.push({
          severity: 'info',
          message: 'Description might be too short for SEO',
          field: 'description',
          reportId: report.id || report.title
        });
      }

      // Check for missing alt text
      if (report.featuredImage && !report.featuredImageAlt) {
        issues.push({
          severity: 'warning',
          message: 'Featured image missing alt text',
          field: 'featuredImageAlt',
          reportId: report.id || report.title
        });
      }
    });

    // Calculate stats
    const publishedReports = reports.filter(r => r.published);
    const featuredReports = reports.filter(r => r.featured);
    const categoriesUsed = [...new Set(reports.map(r => r.category))];
    
    const readTimes = reports
      .map(r => parseInt(r.readTime.match(/^\d+/)?.[0] || '0'))
      .filter(time => time > 0);
    const averageReadTime = readTimes.reduce((sum, time) => sum + time, 0) / readTimes.length || 0;

    return {
      healthy: issues.filter(issue => issue.severity === 'error').length === 0,
      issues,
      stats: {
        totalReports: reports.length,
        publishedReports: publishedReports.length,
        featuredReports: featuredReports.length,
        categoriesUsed,
        averageReadTime: Math.round(averageReadTime)
      }
    };
  }
}