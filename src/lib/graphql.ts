interface GraphQLResponse<T = any> {
  data?: T;
  errors?: Array<{
    message: string;
    locations?: Array<{
      line: number;
      column: number;
    }>;
    path?: Array<string | number>;
  }>;
}

export async function fetchGraphQL<T = any>(
  query: string,
  variables?: Record<string, any>,
): Promise<T> {
  const url = process.env.NEXT_PUBLIC_SANITY_GRAPHQL_URL;

  if (!url) {
    throw new Error("NEXT_PUBLIC_SANITY_GRAPHQL_URL is not configured");
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(process.env.SANITY_API_TOKEN && {
        Authorization: `Bearer ${process.env.SANITY_API_TOKEN}`,
      }),
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    next: {
      revalidate: 60, // Cache for 60 seconds by default
    },
  });

  if (!response.ok) {
    throw new Error(
      `GraphQL request failed: ${response.status} ${response.statusText}`,
    );
  }

  const result: GraphQLResponse<T> = await response.json();

  if (result.errors) {
    throw new Error(
      `GraphQL errors: ${result.errors.map((e) => e.message).join(", ")}`,
    );
  }

  if (!result.data) {
    throw new Error("No data returned from GraphQL query");
  }

  return result.data;
}
