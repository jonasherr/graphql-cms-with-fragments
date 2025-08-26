import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

// Define the schema
const schema = {
  types: [
    {
      name: "post",
      title: "Post",
      type: "document",
      fields: [
        {
          name: "title",
          title: "Title",
          type: "string",
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: "slug",
          title: "Slug",
          type: "slug",
          options: {
            source: "title",
            maxLength: 96,
          },
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: "excerpt",
          title: "Excerpt",
          type: "text",
          rows: 3,
        },
        {
          name: "content",
          title: "Content",
          type: "array",
          of: [{ type: "block" }],
        },
        {
          name: "publishedAt",
          title: "Published at",
          type: "datetime",
          initialValue: () => new Date().toISOString(),
        },
      ],
    },
  ],
};

export default defineConfig({
  name: "default",
  title: "CMS GraphQL Fragments",

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || "",
  dataset: process.env.SANITY_STUDIO_DATASET || "",

  plugins: [structureTool(), visionTool()],

  schema,
});
