import type { Metadata } from "next";
import { PortableText, type PortableTextReactComponents } from "next-sanity";
import { blogHeadingId } from "@/lib/utils";
import { fetchBlogPost } from "@/sanity/blog";

type BlogPostDetailsProps = {
  params: Promise<{ postId: string }>;
};

const headingClassName = "blog-heading";

const components: Partial<PortableTextReactComponents> = {
  block: {
    h1: ({ children, value }) => (
      <h1 className={headingClassName} id={blogHeadingId(value._key)}>
        {children}
      </h1>
    ),
    h2: ({ children, value }) => (
      <h2 className={headingClassName} id={blogHeadingId(value._key)}>
        {children}
      </h2>
    ),
    h3: ({ children, value }) => (
      <h3 className={headingClassName} id={blogHeadingId(value._key)}>
        {children}
      </h3>
    ),
    h4: ({ children, value }) => (
      <h4 className={headingClassName} id={blogHeadingId(value._key)}>
        {children}
      </h4>
    ),
    h5: ({ children, value }) => (
      <h5 className={headingClassName} id={blogHeadingId(value._key)}>
        {children}
      </h5>
    ),
    h6: ({ children, value }) => (
      <h6 className={headingClassName} id={blogHeadingId(value._key)}>
        {children}
      </h6>
    ),
  },
};

export async function generateMetadata({
  params,
}: BlogPostDetailsProps): Promise<Metadata> {
  const postId = (await params).postId;
  const post = await fetchBlogPost(postId);

  return {
    title: post.title,
    description: post.subtitle,
    authors: [{ name: "Rehatbir Singh" }],
    openGraph: {
      type: "article",
      url: `/blog/${postId}`,
      title: post.title,
      description: post.subtitle,
      images: { url: "/images/pingy.png" },
    },
    twitter: {
      card: "summary",
      title: post.title,
      description: post.subtitle,
      images: { url: "/images/pingy.png" },
    },
  };
}

export default async function BlogPostDetails({
  params,
}: BlogPostDetailsProps) {
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
