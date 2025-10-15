# Notion Content Sync

This project pulls long-form reports from the Notion **Articles** database into the existing `reports` content collection.

## 1. Environment Variables

Create `.env.local` in the project root (already gitignored):

```
NOTION_TOKEN=your_notion_integration_token_here
NOTION_DB_ARTICLES=your_notion_database_id_here
```

For Vercel deploys, add the same keys to **Project Settings → Environment Variables**.

## 2. Install Dependencies

Install packages once (pnpm shown, npm also works):

```
pnpm install
```

## 3. Sync From Notion

Run the sync script before building or deploying:

```
pnpm notion:sync
```

The script will:

- Load the Notion database, filtering for `Published = true`.
- Convert page content to Markdown via `notion-to-md`.
- Map Notion properties into the `reports` frontmatter schema.
- Write or update files under `src/content/reports` using the existing `.mdx` filename pattern.

## 4. Build Pipeline Notes

- Re-run `pnpm notion:sync` whenever Notion content changes.
- Ensure the command runs ahead of `astro build` locally and in CI (e.g., Vercel Build Command: `pnpm notion:sync && pnpm build`).
- `.env.local` stays uncommitted; production secrets live in Vercel.

## 5. Troubleshooting

- Missing env vars → the script exits with a clear error.
- Schema validation failures → review the message for the field/value that needs attention in Notion.
- The script is idempotent; rerunning it only updates changed pages.
