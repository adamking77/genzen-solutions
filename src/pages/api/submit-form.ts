import type { APIRoute } from 'astro';
import { Client } from '@notionhq/client';

export const prerender = false;

// Initialize Notion client
const notion = new Client({
  auth: import.meta.env.NOTION_API_KEY,
});

const DATABASE_ID = import.meta.env.NOTION_DATABASE_ID;

export const POST: APIRoute = async ({ request }) => {
  try {
    // Parse the form data
    const formData = await request.json();
    
    console.log('Received form data:', JSON.stringify(formData, null, 2));
    
    // Prepare properties for Notion
    const properties: any = {};
    
    // Map form fields to Notion properties
    for (const [key, value] of Object.entries(formData)) {
      console.log(`Processing field: ${key}, value:`, value, 'type:', typeof value, 'isArray:', Array.isArray(value));
      
      if (value !== null && value !== undefined && value !== '') {
        if (Array.isArray(value)) {
          // Multi-select fields - include even if empty array
          properties[key] = {
            multi_select: value.map((item: string) => ({ name: item }))
          };
          console.log(`Added multi-select for ${key}:`, properties[key]);
        } else {
          // Handle different field types
          if (key === 'Name') {
            // Title field
            properties[key] = {
              title: [{ text: { content: value as string } }]
            };
          } else if (key === 'Email') {
            // Email field
            properties[key] = {
              email: value as string
            };
          } else if (key === 'Submitted By' || key === 'Timing') {
            // Select fields
            properties[key] = {
              select: { name: value as string }
            };
          } else {
            // Text fields (Organization, Role)
            properties[key] = {
              rich_text: [{ text: { content: value as string } }]
            };
          }
          console.log(`Added field ${key}:`, properties[key]);
        }
      } else {
        console.log(`Skipped field ${key} - empty value`);
      }
    }
    
    console.log('Final properties object:', JSON.stringify(properties, null, 2));

    // Note: Submission Date removed as it doesn't exist in the database
    // You can add this field to your Notion database if you want automatic timestamps

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