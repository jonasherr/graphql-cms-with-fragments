# Agent Guidelines for cms-graphql-fragments

## Commands
- **Build**: `npm run build` (uses Next.js with Turbopack)
- **Dev**: `npm run dev` (development server with Turbopack)
- **Lint**: `npm run lint` (Biome linter)
- **Format**: `npm run format` (Biome formatter)
- **No test command configured** - check with user if tests are needed

## Code Style
- **Formatter**: Biome with 2-space indentation
- **Imports**: Auto-organized by Biome, use `@/*` for src imports
- **Types**: Strict TypeScript, explicit types for props/exports
- **Naming**: camelCase for variables/functions, PascalCase for components
- **Components**: Function declarations with explicit return types when complex
- **Error Handling**: Use TypeScript strict mode, handle async errors properly

## Framework Specifics
- Next.js 15 App Router with React 19
- Tailwind CSS for styling
- Use `next/image` for images, `next/font` for fonts
- Export metadata objects for SEO
- Use `className` prop for styling

## GraphQL & Data Fetching
- **Client**: URQL with `@urql/next/rsc` for React Server Components
- **Type Safety**: gql.tada with GraphQL introspection from `src/lib/generated/graphql-env`
- **Client Setup**: Use `createGraphQLClient()` from `@/lib/graphql`
- **Query Pattern**: 
  ```typescript
  import { registerUrql } from "@urql/next/rsc";
  import { createGraphQLClient, graphql } from "@/lib/graphql";
  
  const { getClient } = registerUrql(createGraphQLClient);
  
  const QUERY = graphql(`
    query QueryName($param: String!) {
      field
    }
  `);
  
  const { data, error } = await getClient().query(QUERY, { param: "value" });
  ```
- **Error Handling**: Always check for `error` object and provide user-friendly error UI
- **ISR**: Use `export const revalidate = 60` for Incremental Static Regeneration
- **Scalars**: DateTime, Date (string), JSON (TypedObject from Sanity)