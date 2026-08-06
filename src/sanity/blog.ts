import { groq } from "next-sanity";
import { client } from "@/sanity/client";
import type { BlogPost } from "./types";

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  const query = groq`*[_type == "blogPost" && defined(slug.current)]|order(_createdAt desc)`;
  return await client.fetch<BlogPost[]>(
    query,
    {},
    { next: { revalidate: 60 } },
  );
}

export async function fetchBlogPost(postId: string): Promise<BlogPost> {
  const query = groq`*[_type == "blogPost" && defined(slug.current) && slug.current == $postId][0]`;
  return await client.fetch<BlogPost>(
    query,
    { postId },
    { next: { revalidate: 60 } },
  );
}
