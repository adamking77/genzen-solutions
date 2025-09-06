// Shared TypeScript interfaces for Reports content collection components

// Base interface that all report section components should extend
export interface BaseReportSectionProps {
  data?: Record<string, any>;
}

// Executive Summary Component
export interface ExecutiveSummaryData {
  title?: string;
  subtitle?: string;
  description?: string;
  keyPoints?: string[];
  recommendations?: {
    immediate?: string;
    shortTerm?: string;
    longTerm?: string;
  };
  timeline?: {
    nextReview?: string;
    duration?: string;
  };
}

export interface ExecutiveSummaryProps extends BaseReportSectionProps {
  data?: ExecutiveSummaryData;
}

// Performance Metrics Component
export interface PerformanceMetricsData {
  title?: string;
  subtitle?: string;
  description?: string;
  metrics?: Array<{
    label: string;
    value: string;
    change?: string;
    period?: string;
    trend?: 'up' | 'down' | 'stable';
  }>;
  summary?: {
    title?: string;
    description?: string;
  };
}

export interface PerformanceMetricsProps extends BaseReportSectionProps {
  data?: PerformanceMetricsData;
}

// Regional Performance Component  
export interface RegionalPerformanceData {
  title?: string;
  subtitle?: string;
  description?: string;
  regions?: Array<{
    name: string;
    performance: string;
    growth: string;
    markets: number;
    highlight: string;
  }>;
  overview?: {
    title?: string;
    description?: string;
  };
}

export interface RegionalPerformanceProps extends BaseReportSectionProps {
  data?: RegionalPerformanceData;
}

// Technology Stack Component
export interface TechnologyStackData {
  title?: string;
  description?: string;
  sections?: {
    cloudArchitecture?: {
      title?: string;
      description?: string;
    };
    analytics?: {
      title?: string;
      description?: string;
    };
    impact?: {
      title?: string;
      description?: string;
    };
  };
  technologies?: Array<{
    category: string;
    tools: string[];
    adoption: number;
  }>;
  stats?: {
    integrations?: number;
    uptime?: string;
  };
}

export interface TechnologyStackProps extends BaseReportSectionProps {
  data?: TechnologyStackData;
}

// Data Visualization Component
export interface DataVisualizationData {
  title?: string;
  subtitle?: string;
  chartPlaceholder?: string;
  performanceMetrics?: {
    title?: string;
    description?: string;
  };
  expansionMetrics?: {
    title?: string;
    description?: string;
  };
  uptime?: {
    label?: string;
    percentage?: number;
  };
  efficiency?: {
    label?: string;
    percentage?: number;
  };
  coverage?: {
    label?: string;
    percentage?: number;
  };
  integration?: {
    label?: string;
    percentage?: number;
  };
}

export interface DataVisualizationProps extends BaseReportSectionProps {
  data?: DataVisualizationData;
}

// Financial Highlights Component
export interface FinancialHighlightsData {
  title?: string;
  description?: string[];
  quote?: {
    text: string;
    attribution: string;
  };
  metrics?: Array<{
    label: string;
    value: string;
    change: string;
    period: string;
  }>;
}

export interface FinancialHighlightsProps extends BaseReportSectionProps {
  data?: FinancialHighlightsData;
}

// Client Insights Component
export interface ClientInsightsData {
  title?: string;
  subtitle?: string;
  description?: string;
  insights?: Array<{
    category: string;
    score: number;
    feedback: string;
    clients: number;
  }>;
}

export interface ClientInsightsProps extends BaseReportSectionProps {
  data?: ClientInsightsData;
}

// Market Analysis Component
export interface MarketAnalysisData {
  title?: string;
  subtitle?: string;
  description?: string;
  chartPlaceholder?: string;
  metrics?: {
    marketGrowth?: {
      value: string;
      label: string;
    };
    confidence?: {
      value: string;
      label: string;
    };
  };
}

export interface MarketAnalysisProps extends BaseReportSectionProps {
  data?: MarketAnalysisData;
}

// Industry Trends Component
export interface IndustryTrendsData {
  title?: string;
  subtitle?: string;
  chartPlaceholder?: string;
  digitalTransformation?: {
    title?: string;
    description?: string;
  };
  adoption?: {
    label?: string;
    percentage?: number;
  };
  potential?: {
    label?: string;
    percentage?: number;
  };
  implementation?: {
    label?: string;
    percentage?: number;
  };
  innovation?: {
    label?: string;
    percentage?: number;
  };
}

export interface IndustryTrendsProps extends BaseReportSectionProps {
  data?: IndustryTrendsData;
}

// Future Outlook Component
export interface FutureOutlookData {
  title?: string;
  subtitle?: string;
  introduction?: {
    mainParagraph?: string;
    secondaryParagraph?: string;
  };
  projections?: {
    title?: string;
    description?: string;
    items?: Array<{
      year: string;
      investment?: string;
      revenue?: string;
      roi?: string;
      confidence: 'High' | 'Medium' | 'Low';
    }>;
  };
  initiatives?: {
    title?: string;
    description?: string;
    items?: Array<{
      title: string;
      timeline: string;
      description: string;
    }>;
  };
  positioning?: {
    title?: string;
    mainParagraph?: string;
    riskParagraph?: string;
  };
}

export interface FutureOutlookProps extends BaseReportSectionProps {
  data?: FutureOutlookData;
}

// Union type for all report section data types
export type ReportSectionData = 
  | ExecutiveSummaryData
  | PerformanceMetricsData  
  | RegionalPerformanceData
  | TechnologyStackData
  | DataVisualizationData
  | FinancialHighlightsData
  | ClientInsightsData
  | MarketAnalysisData
  | IndustryTrendsData
  | FutureOutlookData;

// Report content collection entry type
export interface ReportEntry {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  author: string;
  publishDate: string;
  category: 'Strategic' | 'Technology' | 'Financial' | 'Market Research' | 'Performance' | 'Regional' | 'Industry Analysis';
  tags: string[];
  readTime: string;
  featured: boolean;
  published?: boolean;
  sections?: Array<{
    component: string;
    key: string;
    data?: any;
  }>;
  sectionData?: Record<string, ReportSectionData>;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: string;
    ogType?: string;
    canonicalUrl?: string;
  };
  templateVersion?: string;
  lastModified?: string;
}

// Enhanced types based on improved content collection schema
import type { CollectionEntry } from 'astro:content';

// Define the valid categories as a strict type (matching content config)
export type StrictReportCategory = 
  | "Strategic" 
  | "Financial" 
  | "Market Analysis" 
  | "Technology" 
  | "Performance" 
  | "Regional";

// Extract the schema type for reports with strict validation
export type StrictReportData = CollectionEntry<'reports'>['data'];

// Utility type for report filtering with strict types
export interface StrictReportFilters {
  category?: StrictReportCategory;
  tags?: string[];
  featured?: boolean;
  published?: boolean;
  searchTerm?: string;
}

// Type for report statistics with strict categories
export interface StrictReportStats {
  totalReports: number;
  featuredReports: number;
  categoryCounts: Record<StrictReportCategory, number>;
  popularTags: Array<{ tag: string; count: number }>;
}

// Type for report sorting options
export type SortOption = 'date-desc' | 'date-asc' | 'title' | 'category' | 'featured';

// Helper type for components that work with validated report data
export interface ValidatedReportProps {
  report: StrictReportData & { id: string; slug: string };
  className?: string;
}