import { registerUrql } from "@urql/next/rsc";
import { Footer, footerFragment } from "@/components/layout/footer";
import { Navigation, navigationFragment } from "@/components/layout/navigation";
import { PostsList, postsListFragment } from "@/components/posts/posts-list";
import { createGraphQLClient, graphql } from "@/lib/graphql";

export const revalidate = 60;

const GET_HOME_PAGE = graphql(
  `
  query GetHomePage($limit: Int, $offset: Int) {
    Navigation(id: "navigation") {
      ...Navigation
    }
    Footer(id: "footer") {
      ...Footer
    }
    allPost(limit: $limit, offset: $offset, sort: [{ publishedAt: DESC }]) {
      ...PostsList
    }
  }
`,
  [navigationFragment, footerFragment, postsListFragment],
);

const { getClient } = registerUrql(createGraphQLClient);

export default async function Home() {
  const { data, error } = await getClient().query(GET_HOME_PAGE, {
    limit: 10,
    offset: 0,
  });
  const posts = data?.allPost ?? [];
  return (
    <div className="min-h-screen">
      <Navigation data={data?.Navigation} />
      <div className="p-8 pb-20 gap-16 sm:p-20">
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
      <Footer data={data?.Footer} />
    </div>
  );
}
