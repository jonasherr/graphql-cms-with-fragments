import { PortableText } from "@portabletext/react";
import { registerUrql } from "@urql/next/rsc";
import { type Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer, footerFragment } from "@/components/layout/footer";
import { Navigation, navigationFragment } from "@/components/layout/navigation";
import { createGraphQLClient, graphql } from "@/lib/graphql";

export const revalidate = 60; // ISR: Revalidate every 60 seconds

const { getClient } = registerUrql(createGraphQLClient);

const GET_PAGE_SLUGS = graphql(`
  query GetPageSlugs {
    allPage(where: { isPublished: { eq: true } }) {
      slug {
        current
      }
    }
  }
`);

const GET_PAGE_BY_SLUG = graphql(
  `
  query GetPageBySlug($slug: String!) {
    Navigation(id: "navigation") {
      ...Navigation
    }
    Footer(id: "footer") {
      ...Footer
    }
    allPage(where: { slug: { current: { eq: $slug } }, isPublished: { eq: true } }, limit: 1) {
      _id
      title
      excerpt
      contentRaw
      seo {
        metaTitle
        metaDescription
      }
      publishedAt
    }
  }
`,
  [navigationFragment, footerFragment],
);

export async function generateStaticParams() {
  try {
    const { data } = await getClient().query(GET_PAGE_SLUGS, {});
    if (!data?.allPage) return [];

    return data.allPage
      .filter((page) => page.slug?.current)
      .map((page) => ({
        name: page.slug?.current,
      }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { name } = await params;

  try {
    const { data } = await getClient().query(GET_PAGE_BY_SLUG, { slug: name });
    const page = data?.allPage?.[0];

    if (!page) {
      return {
        title: "Page Not Found",
      };
    }

    return {
      title: page.seo?.metaTitle || page.title,
      description: page.seo?.metaDescription || page.excerpt,
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Page Not Found",
    };
  }
}

interface PageProps {
  params: Promise<{
    name: string;
  }>;
}

export default async function GeneralPage({ params }: PageProps) {
  const { name } = await params;

  const { data, error } = await getClient().query(GET_PAGE_BY_SLUG, {
    slug: name,
  });
  const page = data?.allPage?.[0];

  if (error) {
    return (
      <div className="min-h-screen">
        {data?.Navigation && <Navigation data={data.Navigation} />}
        <div className="p-8 pb-20 gap-16 sm:p-20">
          <main className="max-w-4xl mx-auto">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
              <h1 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
                Error loading page
              </h1>
              <p className="text-red-600 dark:text-red-300">{error.message}</p>
              <Link
                href="/"
                className="inline-block mt-4 text-blue-600 dark:text-blue-400 hover:underline"
              >
                ← Back to home
              </Link>
            </div>
          </main>
        </div>
        {data?.Footer && <Footer data={data.Footer} />}{" "}
      </div>
    );
  }

  if (!page) {
    notFound();
  }

  const publishedAt = page.publishedAt;

  return (
    <div className="min-h-screen">
      {data?.Navigation && <Navigation data={data.Navigation} />}
      <div className="p-8 pb-20 gap-16 sm:p-20">
        <main className="max-w-4xl mx-auto">
          <article>
            <header className="mb-8">
              <Link
                href="/"
                className="inline-block mb-6 text-blue-600 dark:text-blue-400 hover:underline"
              >
                ← Back to home
              </Link>
              <h1 className="text-4xl font-bold mb-4">{page.title}</h1>
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

            {page.excerpt && (
              <div className="text-xl text-gray-600 dark:text-gray-400 mb-8 italic">
                {page.excerpt}
              </div>
            )}

            {page.contentRaw && (
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <PortableText value={page.contentRaw} />
              </div>
            )}
          </article>
        </main>
      </div>
      {data?.Footer && <Footer data={data.Footer} />}
    </div>
  );
}
