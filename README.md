# CMS GraphQL Fragments

A Next.js blog powered by Sanity CMS and GraphQL with Incremental Static Regeneration (ISR).

## Features

- **Server-side GraphQL queries** - No client-side GraphQL bundle
- **Incremental Static Regeneration** - Fast loading with automatic revalidation
- **Sanity CMS integration** - Content management with GraphQL API
- **TypeScript** - Full type safety
- **Tailwind CSS** - Modern styling

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Set up Sanity Project

1. Create a new Sanity project at [sanity.io](https://sanity.io)
2. Copy your project ID and dataset name
3. Create a read token in your Sanity project settings

### 3. Configure Environment Variables

Copy `.env.example` to `.env.local` and fill in your Sanity details:

```bash
cp .env.example .env.local
```

Update the values in `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-api-token
NEXT_PUBLIC_SANITY_GRAPHQL_URL=https://your-project-id.api.sanity.io/v2025-02-19/graphql/production/default
```

### 4. Deploy Sanity GraphQL API

```bash
npx sanity graphql deploy
```

### 5. Create Content

1. Run Sanity Studio: `npx sanity dev`
2. Create some posts with the following fields:
   - Title (required)
   - Slug (required)
   - Excerpt (optional)
   - Content (optional)
   - Published At (required)

### 6. Run Development Server

```bash
npm run dev
```

## Architecture

- **Server Components** - All pages are server-rendered
- **ISR** - Pages revalidate every 60 seconds
- **GraphQL** - Direct fetch to Sanity's GraphQL API
- **No client-side GraphQL** - Smaller bundle, better performance

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run Biome linter
- `npm run format` - Format code with Biome

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page (posts list)
│   └── posts/[slug]/
│       ├── page.tsx        # Individual post page
│       └── not-found.tsx   # 404 page for posts
├── lib/
│   ├── graphql.ts          # GraphQL client
│   ├── queries.ts          # GraphQL queries
│   └── types.ts            # TypeScript types
└── components/             # React components
```
