import { Suspense } from "react";
import { fetchBlogPosts } from "@/sanity/blog";

async function BlogPostsList() {
  const posts = await fetchBlogPosts();

  return posts.map((post) => {
    const bodyPreview = post.body?.[0].children?.map((c) => c.text).join(" ");

    return (
      <section key={post._id}>
        <h2>{post.title}</h2>
        <p className="text-muted">{post.subtitle}</p>
        {bodyPreview ? (
          <p>{bodyPreview}</p>
        ) : (
          <p className="text-muted italic">No Preview Available</p>
        )}
      </section>
    );
  });
}

export default function Blog() {
  return (
    <main>
      <section>
        <h1 className="mb-2">Blogs</h1>
        <p className="text-muted">
          My unfiltered thoughts about life and current affairs in tech.
        </p>
      </section>

      <Suspense
        fallback={
          // TODO: add a suspense block
          <p>Loading...</p>
        }
      >
        <BlogPostsList />
      </Suspense>
    </main>
  );
}
