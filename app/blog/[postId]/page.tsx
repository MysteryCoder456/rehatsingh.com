import { PortableText } from "next-sanity";
import { fetchBlogPost } from "@/sanity/blog";

export default async function BlogPostDetails({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const dateFormatter = Intl.DateTimeFormat(undefined, {
    dateStyle: "long",
    timeStyle: "short",
  });

  const post = await fetchBlogPost((await params).postId);
  const datePublished = new Date(post._createdAt);

  return (
    <main className="list-inside">
      <section>
        <h1 className="text-5xl">{post.title}</h1>
        <div className="mt-2 text-xl text-muted">
          <p>{post.subtitle}</p>
          <p>Published on {dateFormatter.format(datePublished)}</p>
        </div>
      </section>

      <hr />

      <div className="flex flex-col gap-4">
        <PortableText value={post.body} />
      </div>
    </main>
  );
}
