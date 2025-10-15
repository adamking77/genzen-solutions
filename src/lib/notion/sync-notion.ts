import { Client } from '@notionhq/client';
import type { PageObjectResponse, RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints';
import { NotionToMarkdown } from 'notion-to-md';
import matter from 'gray-matter';
import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

import { reportsFrontmatterSchema, type ReportsFrontmatter, type ReportsFrontmatterInput } from './types';

type NotionPage = PageObjectResponse;

type CollectionPattern = {
  extension: 'md' | 'mdx';
  usesDatePrefix: boolean;
};

type ExistingEntry = {
  fileName: string;
  absolutePath: string;
  baseName: string;
  slugFromFile: string;
};

type PageContent = {
  slug: string;
  markdown: string;
  dateSegment?: string;
  frontmatter: ReportsFrontmatterInput;
};

const COLLECTION_NAME = 'reports';
const COLLECTION_DIR = path.join(process.cwd(), 'src', 'content', COLLECTION_NAME);
const DATE_PREFIX_REGEX = /^\d{4}-\d{2}-\d{2}-/;
const FALLBACK_DESCRIPTION = 'Summary pending from Notion.';
const FALLBACK_AUTHOR = 'GenZen Solutions';
const DEFAULT_TAG = 'General';
const DEFAULT_CATEGORY = 'Strategic';
const VALID_CATEGORIES = new Set([
  'Strategic',
  'Financial',
  'Market Analysis',
  'Technology',
  'Performance',
  'Regional',
]);
const VALID_DIFFICULTIES = new Set(['Beginner', 'Intermediate', 'Advanced']);

const PROPERTY_KEYS = {
  slug: ['Slug'],
  subtitle: ['Subtitle', 'Sub-title', 'Sub title', 'subtitle', 'sub-title', 'sub title'],
  description: ['Description', 'Summary'],
  excerpt: ['Excerpt'],
  tldr: ['TLDR', 'TL;DR', 'Tldr', 'tldr', 'tl;dr', 'TL DR', 'TLDR:'],
  author: ['Author', 'Authors'],
  date: ['Date', 'Publish Date'],
  category: ['Category'],
  tags: ['Tags', 'Topics'],
  readTime: ['Read Time', 'Reading Time'],
  featured: ['Featured'],
  published: ['Published'],
  featuredImage: ['Featured Image', 'Cover Image'],
  featuredImageAlt: ['Featured Image Alt', 'Cover Image Alt'],
  socialImage: ['Social Image'],
  canonicalUrl: ['Canonical URL', 'Canonical Url'],
  technologies: ['Technologies', 'Technology'],
  services: ['Services'],
  difficulty: ['Difficulty'],
  language: ['Language'],
  version: ['Version'],
};

async function main(): Promise<void> {
  await loadLocalEnv();

  const notionToken = process.env.NOTION_TOKEN;
  const databaseId = process.env.NOTION_DB_ARTICLES;

  if (!notionToken) {
    throw new Error('Missing NOTION_TOKEN. Set it in environment variables or .env.local.');
  }

  if (!databaseId) {
    throw new Error('Missing NOTION_DB_ARTICLES. Set it in environment variables or .env.local.');
  }

  await fs.mkdir(COLLECTION_DIR, { recursive: true });

  const pattern = await detectCollectionPattern(COLLECTION_DIR);
  const existingEntries = await indexExistingEntries(COLLECTION_DIR, pattern);

  const notion = new Client({ auth: notionToken });
  const n2m = new NotionToMarkdown({ notionClient: notion });

  const pages = await fetchPublishedPages(notion, databaseId);

  if (pages.length === 0) {
    console.log('No published pages found in the Notion database.');
    return;
  }

  const usedFileNames = new Set<string>([...existingEntries.values()].map((entry) => entry.fileName));
  const usedSlugs = new Set<string>([...existingEntries.values()].map((entry) => entry.slugFromFile));

  let createdCount = 0;
  let updatedCount = 0;

  for (const page of pages) {
    if (page.object !== 'page') {
      continue;
    }

    const mapped = await mapPageToContent(page, n2m);
    const existing = existingEntries.get(page.id);

    let slugForFrontmatter = mapped.slug.length > 0 ? mapped.slug : 'entry';
    let targetFileName: string;
    let targetFilePath: string;

    if (existing) {
      targetFileName = existing.fileName;
      targetFilePath = existing.absolutePath;
      usedFileNames.add(existing.fileName);
      usedSlugs.add(existing.slugFromFile);

      if (existing.slugFromFile !== mapped.slug) {
        console.warn(
          `Notion slug "${mapped.slug}" differs from existing slug "${existing.slugFromFile}". Keeping existing file name.`,
        );
        slugForFrontmatter = existing.slugFromFile;
      } else {
        slugForFrontmatter = mapped.slug;
      }
    } else {
      const dateSegment =
        pattern.usesDatePrefix && mapped.dateSegment
          ? mapped.dateSegment
          : pattern.usesDatePrefix
            ? buildDateSegment(mapped.frontmatter.publishDate)
            : undefined;

      const prefix = pattern.usesDatePrefix ? `${(dateSegment ?? '1970-01-01')}-` : '';
      const baseSlug = slugForFrontmatter;
      let attempt = 0;
      let candidateSlug = baseSlug;
      let candidateBaseName = `${prefix}${candidateSlug}`;
      let candidateFileName = `${candidateBaseName}.${pattern.extension}`;

      while (usedSlugs.has(candidateSlug) || usedFileNames.has(candidateFileName)) {
        attempt += 1;
        candidateSlug = `${baseSlug}-${attempt + 1}`;
        candidateBaseName = `${prefix}${candidateSlug}`;
        candidateFileName = `${candidateBaseName}.${pattern.extension}`;
      }

      slugForFrontmatter = candidateSlug;
      targetFileName = candidateFileName;
      targetFilePath = path.join(COLLECTION_DIR, targetFileName);
      usedSlugs.add(slugForFrontmatter);
      usedFileNames.add(targetFileName);
    }

    const validatedFrontmatter = validateFrontmatter({
      ...mapped.frontmatter,
      id: page.id,
      slug: slugForFrontmatter,
    });

    const fileContents = matter.stringify(
      ensureTrailingNewline(mapped.markdown),
      validatedFrontmatter satisfies ReportsFrontmatter,
    );

    const existingContent = await readFileIfExists(targetFilePath);

    if (existingContent && existingContent === fileContents) {
      continue;
    }

    await fs.writeFile(targetFilePath, fileContents, 'utf8');

    if (existing) {
      updatedCount += 1;
      console.log(`updated: ${path.relative(process.cwd(), targetFilePath)}`);
    } else {
      createdCount += 1;
      console.log(`created: ${path.relative(process.cwd(), targetFilePath)}`);
    }
  }

  console.log(`Notion sync complete. Created ${createdCount} and updated ${updatedCount} entries.`);
}

async function loadLocalEnv(): Promise<void> {
  const envPath = path.join(process.cwd(), '.env.local');

  try {
    const raw = await fs.readFile(envPath, 'utf8');
    for (const line of raw.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) {
        continue;
      }

      const [key, ...rest] = trimmed.split('=');
      if (!key) {
        continue;
      }

      const value = rest.join('=').trim().replace(/^['"]|['"]$/g, '');
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  } catch (error: unknown) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
      throw error;
    }
  }
}

async function detectCollectionPattern(dir: string): Promise<CollectionPattern> {
  try {
    const entries = await fs.readdir(dir);
    const contentFiles = entries.filter((name) => name.endsWith('.md') || name.endsWith('.mdx'));

    if (contentFiles.length === 0) {
      return { extension: 'mdx', usesDatePrefix: false };
    }

    const mdxCount = contentFiles.filter((name) => name.endsWith('.mdx')).length;
    const extension: 'md' | 'mdx' = mdxCount >= contentFiles.length / 2 ? 'mdx' : 'md';

    const datePrefixedCount = contentFiles.filter((name) =>
      DATE_PREFIX_REGEX.test(name.replace(/\.(md|mdx)$/, '')),
    ).length;

    const usesDatePrefix = datePrefixedCount / contentFiles.length >= 0.75;

    return { extension, usesDatePrefix };
  } catch (error: unknown) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return { extension: 'mdx', usesDatePrefix: false };
    }

    throw error;
  }
}

async function indexExistingEntries(dir: string, pattern: CollectionPattern): Promise<Map<string, ExistingEntry>> {
  const entries = new Map<string, ExistingEntry>();

  try {
    const items = await fs.readdir(dir);

    for (const fileName of items) {
      if (!fileName.endsWith(`.${pattern.extension}`)) {
        continue;
      }

      const absolutePath = path.join(dir, fileName);
      const stat = await fs.stat(absolutePath);
      if (!stat.isFile()) {
        continue;
      }

      const raw = await fs.readFile(absolutePath, 'utf8');
      const parsed = matter(raw);

      const cmsId = parsed.data?.cmsId;
      if (typeof cmsId !== 'string' || cmsId.trim().length === 0) {
        continue;
      }

      const baseName = path.parse(fileName).name;
      const slugFromFile = pattern.usesDatePrefix ? baseName.replace(DATE_PREFIX_REGEX, '') : baseName;

      entries.set(cmsId, {
        fileName,
        absolutePath,
        baseName,
        slugFromFile,
      });
    }
  } catch (error: unknown) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
      throw error;
    }
  }

  return entries;
}

async function fetchPublishedPages(client: Client, databaseId: string): Promise<PageObjectResponse[]> {
  const pages: PageObjectResponse[] = [];
  let cursor: string | undefined;

  do {
    const response = await client.databases.query({
      database_id: databaseId,
      filter: {
        property: 'Published',
        checkbox: { equals: true },
      },
      start_cursor: cursor,
      page_size: 100,
    });

    for (const result of response.results) {
      if (result.object === 'page') {
        pages.push(result as PageObjectResponse);
      }
    }

    cursor = response.has_more ? response.next_cursor ?? undefined : undefined;
  } while (cursor);

  return pages;
}

async function mapPageToContent(page: PageObjectResponse, n2m: NotionToMarkdown): Promise<PageContent> {
  const title = getTitle(page) ?? 'Untitled Article';

  const slugSource =
    getRichText(page, PROPERTY_KEYS.slug) ??
    title;

  const slugSafe = slugify(slugSource);
  const slug =
    slugSafe.length > 0
      ? slugSafe
      : `entry-${page.id.replace(/[^a-z0-9]/gi, '').toLowerCase().slice(0, 8) || 'item'}`;

  const description =
    stringOrUndefined(getRichText(page, PROPERTY_KEYS.description)) ?? ensureMinLength(FALLBACK_DESCRIPTION, 10);

  const subtitle = stringOrUndefined(getTextProperty(page, PROPERTY_KEYS.subtitle));
  const excerpt = truncate(stringOrUndefined(getRichText(page, PROPERTY_KEYS.excerpt)), 500);
  const tldr = truncate(stringOrUndefined(getTextProperty(page, PROPERTY_KEYS.tldr)), 800);

  const authorNames = getPeople(page, PROPERTY_KEYS.author);
  const authorRichText = stringOrUndefined(getRichText(page, PROPERTY_KEYS.author));
  const author = authorNames.length > 0 ? authorNames.join(', ') : authorRichText ?? FALLBACK_AUTHOR;

  const publishDateIso = getDate(page, PROPERTY_KEYS.date) ?? page.created_time;
  const publishDate = formatPublishDate(publishDateIso);

  const categoryValue = getSelect(page, PROPERTY_KEYS.category);
  const category = categoryValue && VALID_CATEGORIES.has(categoryValue) ? categoryValue : DEFAULT_CATEGORY;

  const tags = limitArray(
    getMultiSelect(page, PROPERTY_KEYS.tags),
    10,
  );
  if (tags.length === 0) {
    tags.push(DEFAULT_TAG);
  }

  const readTimeNumber = getNumber(page, PROPERTY_KEYS.readTime);
  const readTimeValue = readTimeNumber ?? getRichText(page, PROPERTY_KEYS.readTime) ?? undefined;
  const readTime = formatReadTime(readTimeValue);

  const difficultyValue = getSelect(page, PROPERTY_KEYS.difficulty);
  const difficulty = difficultyValue && VALID_DIFFICULTIES.has(difficultyValue) ? difficultyValue : undefined;

  const published = getCheckbox(page, PROPERTY_KEYS.published) ?? true;
  const featured = getCheckbox(page, PROPERTY_KEYS.featured) ?? false;

  const featuredImage =
    getFileUrl(page, PROPERTY_KEYS.featuredImage) ?? getPageCover(page);
  const featuredImageAlt =
    stringOrUndefined(getRichText(page, PROPERTY_KEYS.featuredImageAlt)) ??
    (featuredImage ? `Cover image for ${title}` : undefined);

  const socialImage = getUrl(page, PROPERTY_KEYS.socialImage);
  const canonicalUrl = getUrl(page, PROPERTY_KEYS.canonicalUrl);

  const technologies = getMultiSelect(page, PROPERTY_KEYS.technologies);
  const services = getMultiSelect(page, PROPERTY_KEYS.services);

  const language = stringOrUndefined(getSelect(page, PROPERTY_KEYS.language) ?? getRichText(page, PROPERTY_KEYS.language)) ?? 'en';
  const version = stringOrUndefined(getRichText(page, PROPERTY_KEYS.version)) ?? '1.0';

  const markdownBlocks = await n2m.pageToMarkdown(page.id);
  const markdownRaw = n2m.toMarkdownString(markdownBlocks);
  const markdown = ensureContent(extractMarkdown(markdownRaw), title);

  const frontmatter: ReportsFrontmatterInput = {
    id: page.id,
    slug,
    title,
    subtitle,
    description,
    excerpt,
    tldr,
    author,
    publishDate,
    lastModified: page.last_edited_time,
    category,
    tags,
    readTime,
    difficulty,
    language,
    published,
    featured,
    draft: !published,
    featuredImage,
    featuredImageAlt,
    socialImage,
    canonicalUrl,
    technologies: technologies.length > 0 ? technologies : undefined,
    services: services.length > 0 ? services : undefined,
    contentSource: 'cms',
    cmsId: page.id,
    version,
  };

  return {
    slug,
    markdown,
    dateSegment: formatDateSegment(publishDateIso),
    frontmatter,
  };
}

function validateFrontmatter(data: ReportsFrontmatterInput): ReportsFrontmatter {
  const parsed = reportsFrontmatterSchema.safeParse(data);
  if (!parsed.success) {
    const issues = parsed.error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`).join('; ');
    throw new Error(`Frontmatter validation failed: ${issues}`);
  }

  const { viewCount, downloadCount, engagement, ...rest } = parsed.data;

  // Remove undefined values except subtitle/tldr (keep for debugging)
  const cleaned = Object.fromEntries(
    Object.entries(rest).filter(([key, value]) =>
      value !== undefined || key === 'subtitle' || key === 'tldr'
    )
  ) as ReportsFrontmatter;

  return cleaned;
}

function ensureContent(content: string, title: string): string {
  const trimmed = content.trim();
  if (trimmed.length > 0) {
    return trimmed;
  }

  return `# ${title}\n\n_Content coming soon._`;
}

function ensureTrailingNewline(content: string): string {
  return content.endsWith('\n') ? content : `${content}\n`;
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}

function formatPublishDate(isoDate: string): string {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) {
    return 'January 1970';
  }

  const month = date.toLocaleString('en-US', { month: 'long', timeZone: 'UTC' });
  const year = date.getUTCFullYear();
  return `${month} ${year}`;
}

function formatDateSegment(isoDate: string | undefined): string | undefined {
  if (!isoDate) {
    return undefined;
  }

  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) {
    return undefined;
  }

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function buildDateSegment(publishDate: string): string | undefined {
  const match = publishDate.match(/(\w+)\s+(\d{4})/);
  if (!match) {
    return undefined;
  }

  const [, monthName, year] = match;
  const monthIndex = new Date(`${monthName} 1, ${year}`).getMonth();
  if (Number.isNaN(monthIndex)) {
    return undefined;
  }

  const month = String(monthIndex + 1).padStart(2, '0');
  return `${year}-${month}-01`;
}

function formatReadTime(raw?: string | number): string {
  if (typeof raw === 'number' && Number.isFinite(raw) && raw > 0) {
    return `${Math.round(raw)} min read`;
  }

  if (typeof raw === 'string') {
    const match = raw.match(/\d+/);
    if (match) {
      return `${match[0]} min read`;
    }
  }

  return '5 min read';
}

function truncate(value: string | undefined, limit: number): string | undefined {
  if (!value) {
    return undefined;
  }

  if (value.length <= limit) {
    return value;
  }

  const shortened = value.slice(0, limit - 3).trimEnd();
  return `${shortened}...`;
}

function ensureMinLength(value: string, minLength: number): string {
  if (value.length >= minLength) {
    return value;
  }

  const padding = '.'.repeat(minLength - value.length);
  return `${value}${padding}`;
}

function stringOrUndefined(value: string | undefined | null): string | undefined {
  if (typeof value !== 'string') {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function limitArray(values: string[], limit: number): string[] {
  return values.slice(0, limit);
}

function extractMarkdown(
  md: string | { parent: string; children?: string[] },
): string {
  if (typeof md === 'string') {
    return md;
  }

  const parts = [md.parent, ...(md.children ?? [])].filter(Boolean);
  return parts.join('\n\n');
}

async function readFileIfExists(filePath: string): Promise<string | undefined> {
  try {
    return await fs.readFile(filePath, 'utf8');
  } catch (error: unknown) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return undefined;
    }
    throw error;
  }
}

function getTitle(page: NotionPage): string | undefined {
  for (const property of Object.values(page.properties)) {
    if (property?.type === 'title') {
      return getPlainText(property.title);
    }
  }
  return undefined;
}

function getRichText(page: NotionPage, keys: string[]): string | undefined {
  const property = findProperty(page, keys, ['rich_text']);
  if (property?.type === 'rich_text') {
    return getPlainText(property.rich_text);
  }
  return undefined;
}

function getTextProperty(page: NotionPage, keys: string[]): string | undefined {
  // Try rich_text first
  const richTextProp = findProperty(page, keys, ['rich_text']);
  if (richTextProp?.type === 'rich_text') {
    return getPlainText(richTextProp.rich_text);
  }

  // Try title type
  const titleProp = findProperty(page, keys, ['title']);
  if (titleProp?.type === 'title') {
    return getPlainText(titleProp.title);
  }

  return undefined;
}

function getDate(page: NotionPage, keys: string[]): string | undefined {
  const property = findProperty(page, keys, ['date']);
  if (property?.type === 'date') {
    return property.date?.start ?? undefined;
  }
  return undefined;
}

function getCheckbox(page: NotionPage, keys: string[]): boolean | undefined {
  const property = findProperty(page, keys, ['checkbox']);
  if (property?.type === 'checkbox') {
    return property.checkbox;
  }
  return undefined;
}

function getSelect(page: NotionPage, keys: string[]): string | undefined {
  const property = findProperty(page, keys, ['select']);
  if (property?.type === 'select') {
    return property.select?.name ?? undefined;
  }
  return undefined;
}

function getMultiSelect(page: NotionPage, keys: string[]): string[] {
  const property = findProperty(page, keys, ['multi_select']);
  if (property?.type === 'multi_select') {
    return property.multi_select.map((item) => item.name).filter(Boolean);
  }
  return [];
}

function getPeople(page: NotionPage, keys: string[]): string[] {
  const property = findProperty(page, keys, ['people']);
  if (property?.type === 'people') {
    return property.people.map((person) => person.name).filter((name): name is string => Boolean(name));
  }
  return [];
}

function getUrl(page: NotionPage, keys: string[]): string | undefined {
  const property = findProperty(page, keys, ['url', 'rich_text']);
  if (property?.type === 'url') {
    return isValidUrl(property.url) ? property.url ?? undefined : undefined;
  }
  if (property?.type === 'rich_text') {
    const value = getPlainText(property.rich_text);
    return isValidUrl(value) ? value : undefined;
  }
  return undefined;
}

function getFileUrl(page: NotionPage, keys: string[]): string | undefined {
  const property = findProperty(page, keys, ['files', 'url']);

  if (property?.type === 'files') {
    for (const file of property.files) {
      if (file.type === 'external' && isValidUrl(file.external.url)) {
        return file.external.url;
      }
      if (file.type === 'file' && isValidUrl(file.file.url)) {
        return file.file.url;
      }
    }
  }

  if (property?.type === 'url' && isValidUrl(property.url)) {
    return property.url ?? undefined;
  }

  return undefined;
}

function getNumber(page: NotionPage, keys: string[]): number | undefined {
  const property = findProperty(page, keys, ['number']);
  if (property?.type === 'number' && typeof property.number === 'number') {
    return property.number;
  }
  return undefined;
}

function getPageCover(page: PageObjectResponse): string | undefined {
  const cover = page.cover;
  if (!cover) {
    return undefined;
  }

  if (cover.type === 'external' && isValidUrl(cover.external.url)) {
    return cover.external.url;
  }

  if (cover.type === 'file' && isValidUrl(cover.file.url)) {
    return cover.file.url;
  }

  return undefined;
}

function findProperty(page: NotionPage, keys: string[], allowedTypes: string[]) {
  const entries = Object.entries(page.properties);
  const loweredKeys = keys.map((key) => key.toLowerCase());

  for (const [propertyName, propertyValue] of entries) {
    if (!propertyValue || !('type' in propertyValue)) {
      continue;
    }

    const matchesCandidate =
      loweredKeys.includes(propertyName.toLowerCase()) ||
      loweredKeys.some((keyword) => propertyName.toLowerCase().includes(keyword));

    if (matchesCandidate && allowedTypes.includes(propertyValue.type)) {
      return propertyValue;
    }
  }

  return undefined;
}

function getPlainText(items: RichTextItemResponse[]): string {
  return items.map((item) => item.plain_text).join('').trim();
}

function isValidUrl(value: string | null | undefined): value is string {
  if (!value) {
    return false;
  }

  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
