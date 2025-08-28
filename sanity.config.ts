import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schema } from "./src/lib/schema";

export default defineConfig({
  name: "default",
  title: "CMS GraphQL Fragments",

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || "",
  dataset: process.env.SANITY_STUDIO_DATASET || "",

  plugins: [structureTool(), visionTool()],

  schema,
});
