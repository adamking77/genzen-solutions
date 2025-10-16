import { Client } from '@notionhq/client';
import path from 'node:path';
import fs from 'node:fs/promises';
import process from 'node:process';

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
      if (!key) continue;
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

async function main(): Promise<void> {
  await loadLocalEnv();

  const notionToken = process.env.NOTION_TOKEN;
  const databaseId = process.env.NOTION_DB_ARTICLES;

  if (!notionToken) {
    throw new Error('NOTION_TOKEN is not set.');
  }

  const notion = new Client({ auth: notionToken });
  console.log('Checking Notion connectivity…');

  try {
    const search = await notion.search({
      filter: { property: 'object', value: 'database' },
      sort: { direction: 'ascending', timestamp: 'last_edited_time' },
      page_size: 25,
    });
    if (search.results.length === 0) {
      console.log('No databases visible to this integration.');
    } else {
      console.log('Databases visible to this integration:');
      for (const result of search.results) {
        if (result.object === 'database') {
          console.log(`- ${result.id} "${(result as any).title?.[0]?.plain_text ?? 'Untitled'}"`);
        }
      }
    }
  } catch (error) {
    console.error('Failed to search databases:', error);
  }

  if (databaseId) {
    try {
      const db = await notion.databases.retrieve({ database_id: databaseId });
      console.log('Successfully retrieved target database:');
      console.log(`- ID: ${db.id}`);
      console.log(`- Title: ${(db as any).title?.[0]?.plain_text ?? 'Untitled'}`);
      console.log('- Properties:');
      for (const [name, prop] of Object.entries(db.properties)) {
        console.log(`  • ${name} (${prop.type})`);
      }
    } catch (error) {
      console.error(`Failed to retrieve database ${databaseId}:`, error);
    }
  } else {
    console.warn('NOTION_DB_ARTICLES is not set; skipping direct retrieval test.');
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
