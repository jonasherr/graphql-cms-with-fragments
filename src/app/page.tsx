import { registerUrql } from "@urql/next/rsc";
import { graphql } from "gql.tada";
import { createGraphQLClient } from "@/lib/graphql";
import { PostsList, postsListFragment } from "@/components/posts/PostsList";

export const revalidate = 60; // ISR: Revalidate every 60 seconds

const GET_ALL_POSTS = graphql(
  `
  query GetAllPosts($limit: Int, $offset: Int) {
    allPost(limit: $limit, offset: $offset, sort: [{ publishedAt: DESC }]) {
      ...PostsList
    }
  }
`,
  [postsListFragment],
);

const { getClient } = registerUrql(createGraphQLClient);

export default async function Home() {
  const { data, error } = await getClient().query(GET_ALL_POSTS, {
    limit: 10,
    offset: 0,
  });
  const posts = data?.allPost ?? [];

  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="max-w-4xl mx-auto">
        <header className="mb-16 text-center">
          <h1 className="text-4xl font-bold mb-4">CMS GraphQL Fragments</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            A Next.js blog powered by Sanity CMS and GraphQL
          </p>
        </header>

        <PostsList posts={posts} error={error} />
      </main>
    </div>
  );
}
