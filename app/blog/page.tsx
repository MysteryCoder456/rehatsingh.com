import { Suspense } from "react";
import { BlogPostPreview, BlogPostSkeleton } from "@/components/blog";
import { fetchBlogPosts } from "@/sanity/blog";

async function BlogPostsList() {
  const posts = await fetchBlogPosts();

  return (
    <>
      {posts.map((post) => (
        <BlogPostPreview key={post._id} post={post} />
      ))}
    </>
  );
}

export default function Blog() {
  return (
    <main>
      <section>
        <h1 className="mb-2">Blogs</h1>
        <p className="text-muted">
          My unfiltered thoughts about my life, hobbies, and current affairs in
          tech.
        </p>
      </section>

      <Suspense
        fallback={[...Array(3).keys()].map((i) => <BlogPostSkeleton key={i} />)}
      >
        <BlogPostsList />
      </Suspense>
    </main>
  );
}
