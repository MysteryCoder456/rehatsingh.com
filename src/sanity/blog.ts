import { client } from "@/sanity/client";
import type { BlogPost } from "./types";

const POSTS_QUERY = `*[_type == "blogPost" && defined(slug.current)]|order(_createdAt){ _id, slug, title, subtitle, publishedOn, body }`;

export function fetchBlogPosts(): Promise<BlogPost[]> {
  return client.fetch<BlogPost[]>(
    POSTS_QUERY,
    {},
    { next: { revalidate: 60 } },
  );
}
