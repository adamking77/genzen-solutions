import { Client } from '@notionhq/client';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const notion = new Client({
  auth: "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"
});
const DATABASE_ID = "22e39a7d43de80a49016d2d9631b498a";
const POST = async ({ request }) => {
  try {
    const formData = await request.json();
    console.log("Received form data:", JSON.stringify(formData, null, 2));
    const properties = {};
    for (const [key, value] of Object.entries(formData)) {
      console.log(`Processing field: ${key}, value:`, value, "type:", typeof value, "isArray:", Array.isArray(value));
      if (value !== null && value !== void 0 && value !== "") {
        if (Array.isArray(value)) {
          properties[key] = {
            multi_select: value.map((item) => ({ name: item }))
          };
          console.log(`Added multi-select for ${key}:`, properties[key]);
        } else {
          if (key === "Name") {
            properties[key] = {
              title: [{ text: { content: value } }]
            };
          } else if (key === "Email") {
            properties[key] = {
              email: value
            };
          } else if (key === "Submitted By" || key === "Timing") {
            properties[key] = {
              select: { name: value }
            };
          } else {
            properties[key] = {
              rich_text: [{ text: { content: value } }]
            };
          }
          console.log(`Added field ${key}:`, properties[key]);
        }
      } else {
        console.log(`Skipped field ${key} - empty value`);
      }
    }
    console.log("Final properties object:", JSON.stringify(properties, null, 2));
    const response = await notion.pages.create({
      parent: { database_id: DATABASE_ID },
      properties
    });
    return new Response(JSON.stringify({
      success: true,
      id: response.id
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("Notion API Error:", error);
    return new Response(JSON.stringify({
      success: false,
      error: "Failed to submit form"
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
