import { defineType } from "sanity";

const post = defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
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
      validation: (rule) => rule.required(),
    },
  ],
});

const navigationItem = defineType({
  name: "navigationItem",
  title: "Navigation Item",
  type: "object",
  fields: [
    {
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required(),
    },
    {
      name: "href",
      title: "URL/Path",
      type: "string",
      validation: (rule) => rule.required(),
    },
    {
      name: "isExternal",
      title: "External Link",
      type: "boolean",
      initialValue: false,
    },
  ],
});

const navigation = defineType({
  name: "navigation",
  title: "Navigation Settings",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Site Title",
      type: "string",
      description: "The main title/brand name displayed in the navigation",
      validation: (rule) => rule.required(),
    },
    {
      name: "items",
      title: "Navigation Items",
      type: "array",
      of: [{ type: "navigationItem" }],
      validation: (rule) => rule.required().min(1),
    },
  ],
  preview: {
    select: {
      title: "title",
      items: "items",
    },
    prepare({ title, items }) {
      return {
        title: "Navigation Settings",
        subtitle: `${title} (${items?.length || 0} items)`,
      };
    },
  },
});

export const schema = {
  types: [post, navigationItem, navigation],
};
