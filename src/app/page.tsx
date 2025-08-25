import Link from "next/link";
import { fetchGraphQL } from "@/lib/graphql";
import { GET_ALL_POSTS } from "@/lib/queries";
import type { PostsQueryResult } from "@/lib/types";

export const revalidate = 60; // ISR: Revalidate every 60 seconds

export default async function Home() {
  let posts: PostsQueryResult["allPost"] = [];
  let error: string | null = null;

  try {
    const data = await fetchGraphQL<PostsQueryResult>(GET_ALL_POSTS, {
      limit: 10,
      offset: 0,
    });
    posts = data.allPost;
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to fetch posts";
    console.error("Error fetching posts:", err);
  }

  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="max-w-4xl mx-auto">
        <header className="mb-16 text-center">
          <h1 className="text-4xl font-bold mb-4">CMS GraphQL Fragments</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            A Next.js blog powered by Sanity CMS and GraphQL
          </p>
        </header>

        {error ? (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
              Error loading posts
            </h2>
            <p className="text-red-600 dark:text-red-300">{error}</p>
            <p className="text-sm text-red-500 dark:text-red-400 mt-2">
              Make sure your Sanity GraphQL API is deployed and environment
              variables are configured.
            </p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold mb-4">No posts found</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Create some posts in your Sanity Studio to see them here.
            </p>
          </div>
        ) : (
          <div className="grid gap-8">
            {posts.map((post) => (
              <article
                key={post._id}
                className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <h2 className="text-2xl font-semibold mb-3">
                  <Link
                    href={`/posts/${post.slug.current}`}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {post.title}
                  </Link>
                </h2>
                {post.excerpt && (
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {post.excerpt}
                  </p>
                )}
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500">
                  <time dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <Link
                    href={`/posts/${post.slug.current}`}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Read more →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
