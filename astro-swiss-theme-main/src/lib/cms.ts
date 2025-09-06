// Headless CMS integration utilities
// Provides consistent interface for different CMS platforms

export interface CMSConfig {
  type: 'contentful' | 'strapi' | 'sanity' | 'ghost' | 'hygraph' | 'directus';
  apiUrl?: string;
  apiKey?: string;
  spaceId?: string;
  projectId?: string;
  dataset?: string;
  environment?: string;
}

export interface CMSContent {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featuredImage?: string;
  publishedAt: string;
  updatedAt: string;
  status: 'published' | 'draft' | 'archived';
  metadata: Record<string, any>;
}

// Base CMS adapter interface
export abstract class CMSAdapter {
  protected config: CMSConfig;

  constructor(config: CMSConfig) {
    this.config = config;
  }

  abstract fetchContent(contentType: string, options?: FetchOptions): Promise<CMSContent[]>;
  abstract fetchContentById(contentType: string, id: string): Promise<CMSContent | null>;
  abstract fetchContentBySlug(contentType: string, slug: string): Promise<CMSContent | null>;
}

export interface FetchOptions {
  limit?: number;
  offset?: number;
  orderBy?: string;
  order?: 'asc' | 'desc';
  filters?: Record<string, any>;
  includes?: string[];
}

// Contentful adapter
export class ContentfulAdapter extends CMSAdapter {
  async fetchContent(contentType: string, options: FetchOptions = {}): Promise<CMSContent[]> {
    if (!this.config.apiKey || !this.config.spaceId) {
      throw new Error('Contentful API key and space ID are required');
    }

    const params = new URLSearchParams({
      access_token: this.config.apiKey,
      content_type: contentType,
      limit: (options.limit || 100).toString(),
      skip: (options.offset || 0).toString(),
    });

    if (options.orderBy) {
      params.append('order', `${options.order === 'desc' ? '-' : ''}${options.orderBy}`);
    }

    const response = await fetch(
      `https://cdn.contentful.com/spaces/${this.config.spaceId}/environments/${this.config.environment || 'master'}/entries?${params}`
    );

    if (!response.ok) {
      throw new Error(`Contentful API error: ${response.statusText}`);
    }

    const data = await response.json();
    return this.transformContentfulData(data);
  }

  async fetchContentById(contentType: string, id: string): Promise<CMSContent | null> {
    if (!this.config.apiKey || !this.config.spaceId) {
      throw new Error('Contentful API key and space ID are required');
    }

    const params = new URLSearchParams({
      access_token: this.config.apiKey,
    });

    const response = await fetch(
      `https://cdn.contentful.com/spaces/${this.config.spaceId}/environments/${this.config.environment || 'master'}/entries/${id}?${params}`
    );

    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`Contentful API error: ${response.statusText}`);
    }

    const data = await response.json();
    return this.transformContentfulEntry(data);
  }

  async fetchContentBySlug(contentType: string, slug: string): Promise<CMSContent | null> {
    const content = await this.fetchContent(contentType, {
      filters: { 'fields.slug': slug },
      limit: 1
    });
    return content[0] || null;
  }

  private transformContentfulData(data: any): CMSContent[] {
    if (!data.items) return [];

    return data.items.map((item: any) => this.transformContentfulEntry(item));
  }

  private transformContentfulEntry(entry: any): CMSContent {
    const fields = entry.fields || {};
    
    return {
      id: entry.sys.id,
      title: fields.title || '',
      slug: fields.slug || '',
      content: fields.content || fields.description || '',
      excerpt: fields.excerpt || fields.summary || '',
      featuredImage: fields.featuredImage?.fields?.file?.url || fields.image?.fields?.file?.url || '',
      publishedAt: entry.sys.createdAt,
      updatedAt: entry.sys.updatedAt,
      status: 'published',
      metadata: {
        ...fields,
        contentfulId: entry.sys.id,
        contentType: entry.sys.contentType?.sys?.id,
      }
    };
  }
}

// Strapi adapter
export class StrapiAdapter extends CMSAdapter {
  async fetchContent(contentType: string, options: FetchOptions = {}): Promise<CMSContent[]> {
    if (!this.config.apiUrl) {
      throw new Error('Strapi API URL is required');
    }

    const params = new URLSearchParams({
      'pagination[limit]': (options.limit || 100).toString(),
      'pagination[start]': (options.offset || 0).toString(),
      'populate': '*',
    });

    if (options.orderBy) {
      params.append('sort', `${options.orderBy}:${options.order || 'asc'}`);
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.config.apiKey) {
      headers['Authorization'] = `Bearer ${this.config.apiKey}`;
    }

    const response = await fetch(
      `${this.config.apiUrl}/api/${contentType}?${params}`,
      { headers }
    );

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.statusText}`);
    }

    const data = await response.json();
    return this.transformStrapiData(data);
  }

  async fetchContentById(contentType: string, id: string): Promise<CMSContent | null> {
    if (!this.config.apiUrl) {
      throw new Error('Strapi API URL is required');
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.config.apiKey) {
      headers['Authorization'] = `Bearer ${this.config.apiKey}`;
    }

    const response = await fetch(
      `${this.config.apiUrl}/api/${contentType}/${id}?populate=*`,
      { headers }
    );

    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`Strapi API error: ${response.statusText}`);
    }

    const data = await response.json();
    return this.transformStrapiEntry(data.data);
  }

  async fetchContentBySlug(contentType: string, slug: string): Promise<CMSContent | null> {
    const content = await this.fetchContent(contentType, {
      filters: { slug: { $eq: slug } },
      limit: 1
    });
    return content[0] || null;
  }

  private transformStrapiData(data: any): CMSContent[] {
    if (!data.data) return [];
    
    return data.data.map((item: any) => this.transformStrapiEntry(item));
  }

  private transformStrapiEntry(entry: any): CMSContent {
    const attributes = entry.attributes || {};
    
    return {
      id: entry.id.toString(),
      title: attributes.title || '',
      slug: attributes.slug || '',
      content: attributes.content || attributes.description || '',
      excerpt: attributes.excerpt || attributes.summary || '',
      featuredImage: attributes.featuredImage?.data?.attributes?.url || attributes.image?.data?.attributes?.url || '',
      publishedAt: attributes.publishedAt || attributes.createdAt,
      updatedAt: attributes.updatedAt,
      status: attributes.publishedAt ? 'published' : 'draft',
      metadata: {
        ...attributes,
        strapiId: entry.id,
      }
    };
  }
}

// Sanity adapter
export class SanityAdapter extends CMSAdapter {
  async fetchContent(contentType: string, options: FetchOptions = {}): Promise<CMSContent[]> {
    if (!this.config.projectId || !this.config.dataset) {
      throw new Error('Sanity project ID and dataset are required');
    }

    const query = `*[_type == "${contentType}"] | order(_createdAt desc) [${options.offset || 0}...${(options.offset || 0) + (options.limit || 100)}]`;
    
    const params = new URLSearchParams({
      query,
    });

    const response = await fetch(
      `https://${this.config.projectId}.api.sanity.io/v2021-10-21/data/query/${this.config.dataset}?${params}`
    );

    if (!response.ok) {
      throw new Error(`Sanity API error: ${response.statusText}`);
    }

    const data = await response.json();
    return this.transformSanityData(data.result);
  }

  async fetchContentById(contentType: string, id: string): Promise<CMSContent | null> {
    if (!this.config.projectId || !this.config.dataset) {
      throw new Error('Sanity project ID and dataset are required');
    }

    const query = `*[_type == "${contentType}" && _id == "${id}"][0]`;
    
    const params = new URLSearchParams({
      query,
    });

    const response = await fetch(
      `https://${this.config.projectId}.api.sanity.io/v2021-10-21/data/query/${this.config.dataset}?${params}`
    );

    if (!response.ok) {
      throw new Error(`Sanity API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.result ? this.transformSanityEntry(data.result) : null;
  }

  async fetchContentBySlug(contentType: string, slug: string): Promise<CMSContent | null> {
    if (!this.config.projectId || !this.config.dataset) {
      throw new Error('Sanity project ID and dataset are required');
    }

    const query = `*[_type == "${contentType}" && slug.current == "${slug}"][0]`;
    
    const params = new URLSearchParams({
      query,
    });

    const response = await fetch(
      `https://${this.config.projectId}.api.sanity.io/v2021-10-21/data/query/${this.config.dataset}?${params}`
    );

    if (!response.ok) {
      throw new Error(`Sanity API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.result ? this.transformSanityEntry(data.result) : null;
  }

  private transformSanityData(data: any[]): CMSContent[] {
    return data.map(item => this.transformSanityEntry(item));
  }

  private transformSanityEntry(entry: any): CMSContent {
    return {
      id: entry._id,
      title: entry.title || '',
      slug: entry.slug?.current || '',
      content: entry.content || entry.description || '',
      excerpt: entry.excerpt || entry.summary || '',
      featuredImage: entry.featuredImage?.asset?.url || entry.image?.asset?.url || '',
      publishedAt: entry.publishedAt || entry._createdAt,
      updatedAt: entry._updatedAt,
      status: 'published',
      metadata: {
        ...entry,
        sanityId: entry._id,
      }
    };
  }
}

// Factory function to create CMS adapter
export function createCMSAdapter(config: CMSConfig): CMSAdapter {
  switch (config.type) {
    case 'contentful':
      return new ContentfulAdapter(config);
    case 'strapi':
      return new StrapiAdapter(config);
    case 'sanity':
      return new SanityAdapter(config);
    default:
      throw new Error(`Unsupported CMS type: ${config.type}`);
  }
}

// Helper function to get CMS config from environment variables
export function getCMSConfigFromEnv(): CMSConfig | null {
  const cmsType = import.meta.env.CMS_TYPE as CMSConfig['type'];
  
  if (!cmsType) return null;

  const baseConfig: CMSConfig = { type: cmsType };

  switch (cmsType) {
    case 'contentful':
      return {
        ...baseConfig,
        apiKey: import.meta.env.CONTENTFUL_ACCESS_TOKEN,
        spaceId: import.meta.env.CONTENTFUL_SPACE_ID,
        environment: import.meta.env.CONTENTFUL_ENVIRONMENT || 'master',
      };
    case 'strapi':
      return {
        ...baseConfig,
        apiUrl: import.meta.env.STRAPI_API_URL,
        apiKey: import.meta.env.STRAPI_API_TOKEN,
      };
    case 'sanity':
      return {
        ...baseConfig,
        projectId: import.meta.env.SANITY_PROJECT_ID,
        dataset: import.meta.env.SANITY_DATASET,
        apiKey: import.meta.env.SANITY_API_TOKEN,
      };
    default:
      return baseConfig;
  }
}

// Utility to transform CMS content to Astro content format
export function transformToAstroContent(cmsContent: CMSContent, contentType: 'projects' | 'pages' | 'reports') {
  const baseTransform = {
    id: cmsContent.id,
    slug: cmsContent.slug,
    collection: contentType,
    data: {
      title: cmsContent.title,
      description: cmsContent.excerpt || cmsContent.content.substring(0, 200) + '...',
      published: cmsContent.status === 'published',
      publishDate: cmsContent.publishedAt,
      lastModified: cmsContent.updatedAt,
      featuredImage: cmsContent.featuredImage,
      ...cmsContent.metadata,
    },
    body: cmsContent.content,
  };

  // Add content-type specific transformations
  switch (contentType) {
    case 'projects':
      return {
        ...baseTransform,
        data: {
          ...baseTransform.data,
          excerpt: cmsContent.excerpt || cmsContent.content.substring(0, 200),
          category: cmsContent.metadata.category || 'Other',
          tags: cmsContent.metadata.tags || [],
          technologies: cmsContent.metadata.technologies || [],
          featured: cmsContent.metadata.featured || false,
          client: cmsContent.metadata.client,
          industry: cmsContent.metadata.industry,
          services: cmsContent.metadata.services || [],
          startDate: cmsContent.metadata.startDate,
          endDate: cmsContent.metadata.endDate,
          status: cmsContent.metadata.status || 'completed',
          demoUrl: cmsContent.metadata.demoUrl,
          repositoryUrl: cmsContent.metadata.repositoryUrl,
        },
      };
    case 'pages':
      return {
        ...baseTransform,
        data: {
          ...baseTransform.data,
          layout: cmsContent.metadata.layout || 'default',
          template: cmsContent.metadata.template || 'basic',
          showInMenu: cmsContent.metadata.showInMenu !== false,
          menuOrder: cmsContent.metadata.menuOrder,
          menuLabel: cmsContent.metadata.menuLabel,
          sections: cmsContent.metadata.sections || [],
        },
      };
    case 'reports':
      return {
        ...baseTransform,
        data: {
          ...baseTransform.data,
          author: cmsContent.metadata.author || 'Unknown',
          category: cmsContent.metadata.category || 'Strategic',
          tags: cmsContent.metadata.tags || [],
          readTime: cmsContent.metadata.readTime || '5 min read',
          featured: cmsContent.metadata.featured || false,
        },
      };
    default:
      return baseTransform;
  }
}