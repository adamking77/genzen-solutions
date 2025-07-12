import type { APIRoute } from 'astro';
import { Client } from '@notionhq/client';

export const prerender = false;

// Initialize Notion client
const notion = new Client({
  auth: import.meta.env.NOTION_API_KEY || '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',
});

const DATABASE_ID = import.meta.env.NOTION_DATABASE_ID || '22e39a7d43de80a49016d2d9631b498a';

export const POST: APIRoute = async ({ request }) => {
  try {
    // Parse the form data
    const formData = await request.json();
    
    // Prepare properties for Notion
    const properties: any = {};
    
    // Map form fields to Notion properties
    for (const [key, value] of Object.entries(formData)) {
      if (value) {
        if (Array.isArray(value)) {
          // Multi-select field
          properties[key] = {
            multi_select: value.map((item: string) => ({ name: item }))
          };
        } else {
          // Text or select field
          if (key === 'Submitted By' || key === 'Timing') {
            // Select field
            properties[key] = {
              select: { name: value as string }
            };
          } else {
            // Text field
            properties[key] = {
              rich_text: [{ text: { content: value as string } }]
            };
          }
        }
      }
    }

    // Add submission timestamp
    properties['Submission Date'] = {
      date: { start: new Date().toISOString() }
    };

    // Create the page in Notion
    const response = await notion.pages.create({
      parent: { database_id: DATABASE_ID },
      properties,
    });

    return new Response(JSON.stringify({ 
      success: true, 
      id: response.id 
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error('Notion API Error:', error);
    
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Failed to submit form' 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};