import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchGraphQL } from "@/lib/graphql";
import { GET_POST_BY_SLUG, GET_POST_SLUGS } from "@/lib/queries";
import type { PostsQueryResult } from "@/lib/types";

export const revalidate = 60; // ISR: Revalidate every 60 seconds

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  try {
    const data = await fetchGraphQL<PostsQueryResult>(GET_POST_SLUGS);
    return data.allPost.map((post) => ({
      slug: post.slug.current,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;

  let post = null;
  let error: string | null = null;

  try {
    const data = await fetchGraphQL<PostsQueryResult>(GET_POST_BY_SLUG, {
      slug,
    });
    post = data.allPost[0];
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to fetch post";
    console.error("Error fetching post:", err);
  }

  if (error) {
    return (
      <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <main className="max-w-4xl mx-auto">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
            <h1 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
              Error loading post
            </h1>
            <p className="text-red-600 dark:text-red-300">{error}</p>
            <Link
              href="/"
              className="inline-block mt-4 text-blue-600 dark:text-blue-400 hover:underline"
            >
              ← Back to home
            </Link>
          </div>
        </main>
      </div>
    );
  }

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="max-w-4xl mx-auto">
        <article>
          <header className="mb-8">
            <Link
              href="/"
              className="inline-block mb-6 text-blue-600 dark:text-blue-400 hover:underline"
            >
              ← Back to posts
            </Link>
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <time
              dateTime={post.publishedAt}
              className="text-gray-600 dark:text-gray-400"
            >
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </header>

          {post.excerpt && (
            <div className="text-xl text-gray-600 dark:text-gray-400 mb-8 italic">
              {post.excerpt}
            </div>
          )}

          {post.content && (
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {/* For now, just show raw content - you can add a proper Portable Text renderer later */}
              <pre className="whitespace-pre-wrap bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-auto">
                {JSON.stringify(post.content, null, 2)}
              </pre>
            </div>
          )}
        </article>
      </main>
    </div>
  );
}
