import { getCollection, type CollectionEntry } from 'astro:content';
import { 
  ContentProcessor, 
  ContentCache,
  type CMSReport,
  type ContentSource,
  type ReportData 
} from './content-utils';

/**
 * Base content adapter interface
 */
export interface ContentAdapter {
  source: ContentSource;
  fetchContent(): Promise<ReportData[]>;
  fetchSingleContent(slug: string): Promise<ReportData | null>;
  isAvailable(): Promise<boolean>;
}

/**
 * Local MDX content adapter for Astro content collections
 */
export class LocalContentAdapter implements ContentAdapter {
  source: ContentSource = 'local';

  async fetchContent(): Promise<ReportData[]> {
    const cacheKey = 'local-reports-all';
    const cached = ContentCache.get<ReportData[]>(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const reports = await getCollection('reports');
      const publishedReports = reports
        .filter(report => report.data.published !== false)
        .map(report => ({
          ...report.data,
          slug: report.slug,
          contentSource: 'local' as const,
        }));

      ContentCache.set(cacheKey, publishedReports);
      return publishedReports;
    } catch (error) {
      console.error('Error fetching local content:', error);
      return [];
    }
  }

  async fetchSingleContent(slug: string): Promise<ReportData | null> {
    const cacheKey = `local-report-${slug}`;
    const cached = ContentCache.get<ReportData>(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const reports = await getCollection('reports');
      const report = reports.find(r => r.slug === slug && r.data.published !== false);
      
      if (!report) {
        return null;
      }

      const reportData = {
        ...report.data,
        slug: report.slug,
        contentSource: 'local' as const,
      };

      ContentCache.set(cacheKey, reportData);
      return reportData;
    } catch (error) {
      console.error('Error fetching single local content:', error);
      return null;
    }
  }

  async isAvailable(): Promise<boolean> {
    try {
      await getCollection('reports');
      return true;
    } catch {
      return false;
    }
  }
}

/**
 * Generic CMS adapter template - can be extended for specific CMS platforms
 */
export abstract class CMSAdapter implements ContentAdapter {
  source: ContentSource = 'cms';
  protected baseUrl: string;
  protected apiKey?: string;

  constructor(baseUrl: string, apiKey?: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  abstract fetchContent(): Promise<ReportData[]>;
  abstract fetchSingleContent(slug: string): Promise<ReportData | null>;
  abstract isAvailable(): Promise<boolean>;

  protected getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.apiKey) {
      headers['Authorization'] = `Bearer ${this.apiKey}`;
    }

    return headers;
  }
}

/**
 * Notion CMS adapter for Notion database integration
 */
export class NotionAdapter extends CMSAdapter {
  private databaseId: string;

  constructor(databaseId: string, apiKey: string) {
    super('https://api.notion.com/v1', apiKey);
    this.databaseId = databaseId;
  }

  async fetchContent(): Promise<ReportData[]> {
    const cacheKey = 'notion-reports-all';
    const cached = ContentCache.get<ReportData[]>(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const response = await fetch(`${this.baseUrl}/databases/${this.databaseId}/query`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({
          filter: {
            property: 'Published',
            checkbox: { equals: true }
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Notion API error: ${response.status}`);
      }

      const data = await response.json();
      const reports = await Promise.all(
        data.results.map((page: any) => this.transformNotionPage(page))
      );

      const validReports = reports.filter(Boolean) as ReportData[];
      ContentCache.set(cacheKey, validReports);
      
      return validReports;
    } catch (error) {
      console.error('Error fetching Notion content:', error);
      return [];
    }
  }

  async fetchSingleContent(slug: string): Promise<ReportData | null> {
    const cacheKey = `notion-report-${slug}`;
    const cached = ContentCache.get<ReportData>(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const response = await fetch(`${this.baseUrl}/databases/${this.databaseId}/query`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({
          filter: {
            and: [
              { property: 'Published', checkbox: { equals: true } },
              { property: 'Slug', rich_text: { equals: slug } }
            ]
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Notion API error: ${response.status}`);
      }

      const data = await response.json();
      if (data.results.length === 0) {
        return null;
      }

      const report = await this.transformNotionPage(data.results[0]);
      if (report) {
        ContentCache.set(cacheKey, report);
      }
      
      return report;
    } catch (error) {
      console.error('Error fetching single Notion content:', error);
      return null;
    }
  }

  async isAvailable(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/databases/${this.databaseId}`, {
        headers: this.getHeaders()
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  private async transformNotionPage(page: any): Promise<ReportData | null> {
    try {
      // Transform Notion page properties to our schema
      const properties = page.properties;
      
      return {
        id: page.id,
        slug: this.extractText(properties.Slug),
        title: this.extractText(properties.Title),
        subtitle: this.extractText(properties.Subtitle),
        description: this.extractText(properties.Description),
        author: this.extractText(properties.Author),
        publishDate: properties.PublishDate?.date?.start || new Date().toISOString().split('T')[0],
        category: this.extractSelect(properties.Category) as ReportData['category'],
        tags: this.extractMultiSelect(properties.Tags),
        readTime: this.extractText(properties.ReadTime) || '5 min read',
        featured: properties.Featured?.checkbox || false,
        published: properties.Published?.checkbox || true,
        featuredImage: this.extractUrl(properties.FeaturedImage),
        contentSource: 'cms' as const,
        cmsId: page.id,
        version: "1.0",
        viewCount: 0,
        downloadCount: 0,
      };
    } catch (error) {
      console.error('Error transforming Notion page:', error);
      return null;
    }
  }

  private extractText(property: any): string {
    if (!property) return '';
    if (property.rich_text?.[0]?.plain_text) return property.rich_text[0].plain_text;
    if (property.title?.[0]?.plain_text) return property.title[0].plain_text;
    return '';
  }

  private extractSelect(property: any): string {
    return property?.select?.name || '';
  }

  private extractMultiSelect(property: any): string[] {
    return property?.multi_select?.map((item: any) => item.name) || [];
  }

  private extractUrl(property: any): string | undefined {
    if (property?.url) return property.url;
    if (property?.files?.[0]?.file?.url) return property.files[0].file.url;
    return undefined;
  }
}

/**
 * Content adapter manager for unified content fetching
 */
export class ContentAdapterManager {
  private adapters: ContentAdapter[] = [];
  private primaryAdapter: ContentAdapter;

  constructor() {
    // Default to local adapter
    this.primaryAdapter = new LocalContentAdapter();
    this.adapters.push(this.primaryAdapter);
  }

  /**
   * Add additional content adapters
   */
  addAdapter(adapter: ContentAdapter, setPrimary = false): void {
    this.adapters.push(adapter);
    if (setPrimary) {
      this.primaryAdapter = adapter;
    }
  }

  /**
   * Fetch content from primary adapter with fallback
   */
  async fetchContent(): Promise<ReportData[]> {
    // Try primary adapter first
    try {
      if (await this.primaryAdapter.isAvailable()) {
        const content = await this.primaryAdapter.fetchContent();
        if (content.length > 0) {
          return content;
        }
      }
    } catch (error) {
      console.warn('Primary adapter failed, trying fallbacks:', error);
    }

    // Try fallback adapters
    for (const adapter of this.adapters) {
      if (adapter === this.primaryAdapter) continue;
      
      try {
        if (await adapter.isAvailable()) {
          const content = await adapter.fetchContent();
          if (content.length > 0) {
            console.log(`Using fallback adapter: ${adapter.source}`);
            return content;
          }
        }
      } catch (error) {
        console.warn(`Adapter ${adapter.source} failed:`, error);
      }
    }

    return [];
  }

  /**
   * Fetch single content item with adapter fallback
   */
  async fetchSingleContent(slug: string): Promise<ReportData | null> {
    // Try primary adapter first
    try {
      if (await this.primaryAdapter.isAvailable()) {
        const content = await this.primaryAdapter.fetchSingleContent(slug);
        if (content) {
          return content;
        }
      }
    } catch (error) {
      console.warn('Primary adapter failed for single content:', error);
    }

    // Try fallback adapters
    for (const adapter of this.adapters) {
      if (adapter === this.primaryAdapter) continue;
      
      try {
        if (await adapter.isAvailable()) {
          const content = await adapter.fetchSingleContent(slug);
          if (content) {
            console.log(`Using fallback adapter for ${slug}: ${adapter.source}`);
            return content;
          }
        }
      } catch (error) {
        console.warn(`Adapter ${adapter.source} failed for ${slug}:`, error);
      }
    }

    return null;
  }

  /**
   * Get available adapters
   */
  async getAvailableAdapters(): Promise<ContentAdapter[]> {
    const available: ContentAdapter[] = [];
    
    for (const adapter of this.adapters) {
      try {
        if (await adapter.isAvailable()) {
          available.push(adapter);
        }
      } catch {
        // Adapter not available
      }
    }

    return available;
  }
}

// Export singleton instance
export const contentManager = new ContentAdapterManager();