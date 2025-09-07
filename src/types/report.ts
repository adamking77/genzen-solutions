// Type definition for report data from content collection
export interface Report {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  author: string;
  publishDate: string;
  category: string;
  tags: string[];
  readTime: string;
  featured: boolean;
}

// Type for content collection entry
export interface ReportEntry {
  data: Report;
  id: string;
  slug: string;
}