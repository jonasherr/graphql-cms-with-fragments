import { PortableText } from "@portabletext/react";
import { registerUrql } from "@urql/next/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Author, authorFragment } from "@/components/posts/author";
import { createGraphQLClient, graphql } from "@/lib/graphql";

const { getClient } = registerUrql(createGraphQLClient);

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const GET_POST_SLUGS = graphql(`
  query GetPostSlugs {
    allPost {
      slug {
        current
      }
    }
  }
`);

const GET_POST_BY_SLUG = graphql(
  `
  query GetPostBySlug($slug: String!) {
    allPost(where: { slug: { current: { eq: $slug } } }, limit: 1) {
      _id
      title
      excerpt
      contentRaw
      publishedAt
      author {
        ...Author
      }
    }
  }
`,
  [authorFragment],
);

export async function generateStaticParams() {
  try {
    const { data } = await getClient().query(GET_POST_SLUGS, {});
    return (
      data?.allPost
        .filter((post) => post.slug?.current)
        .map((post) => ({
          slug: post.slug?.current,
        })) ?? []
    );
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;

  const { data, error } = await getClient().query(GET_POST_BY_SLUG, { slug });
  const post = data?.allPost[0];

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
        <h1 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
          Error loading post
        </h1>
        <p className="text-red-600 dark:text-red-300">{error.message}</p>
        <Link
          href="/"
          className="inline-block mt-4 text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← Back to home
        </Link>
      </div>
    );
  }

  if (!post) {
    notFound();
  }

  const publishedAt = post.publishedAt;

  return (
    <article>
      <header className="mb-8">
        <Link
          href="/"
          className="inline-block mb-6 text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← Back to posts
        </Link>
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        {publishedAt && (
          <time
            dateTime={publishedAt}
            className="text-gray-600 dark:text-gray-400"
          >
            {new Date(publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        )}
      </header>

      {post.excerpt && (
        <div className="text-xl text-gray-600 dark:text-gray-400 mb-8 italic">
          {post.excerpt}
        </div>
      )}

      {post.contentRaw && (
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <PortableText value={post.contentRaw} />
        </div>
      )}

      {post.author && <Author data={post.author} />}
    </article>
  );
}
