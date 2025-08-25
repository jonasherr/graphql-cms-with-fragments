export const GET_ALL_POSTS = `
  query GetAllPosts($limit: Int, $offset: Int) {
    allPost(limit: $limit, offset: $offset, sort: [{ publishedAt: DESC }]) {
      _id
      title
      slug {
        current
      }
      excerpt
      publishedAt
    }
  }
`;

export const GET_POST_BY_SLUG = `
  query GetPostBySlug($slug: String!) {
    allPost(where: { slug: { current: { eq: $slug } } }, limit: 1) {
      _id
      title
      slug {
        current
      }
      excerpt
      content
      publishedAt
    }
  }
`;

export const GET_POST_SLUGS = `
  query GetPostSlugs {
    allPost {
      slug {
        current
      }
    }
  }
`;
