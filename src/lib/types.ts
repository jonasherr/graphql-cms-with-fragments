export interface Post {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  excerpt?: string;
  content?: any[];
  publishedAt: string;
}

export interface PostsQueryResult {
  allPost: Post[];
}

export interface PostQueryResult {
  Post: Post;
}
