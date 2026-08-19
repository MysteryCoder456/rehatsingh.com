import { PortableText, type PortableTextReactComponents } from "next-sanity";
import { fetchBlogPost } from "@/sanity/blog";

const headingId = (key?: string) => `heading-${key}`;

const components: Partial<PortableTextReactComponents> = {
  block: {
    h1: ({ children, value }) => <h1 id={headingId(value._key)}>{children}</h1>,
    h2: ({ children, value }) => <h2 id={headingId(value._key)}>{children}</h2>,
    h3: ({ children, value }) => <h3 id={headingId(value._key)}>{children}</h3>,
    h4: ({ children, value }) => <h4 id={headingId(value._key)}>{children}</h4>,
    h5: ({ children, value }) => <h5 id={headingId(value._key)}>{children}</h5>,
    h6: ({ children, value }) => <h6 id={headingId(value._key)}>{children}</h6>,
  },
};

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
        <PortableText value={post.body} components={components} />
      </div>
    </main>
  );
}
