import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

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

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",

  plugins: [structureTool(), visionTool()],

  schema,
});
