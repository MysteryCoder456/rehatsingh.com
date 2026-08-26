import { NewspaperIcon } from "lucide-react";
import { Suspense } from "react";
import { BlogPostPreview, BlogPostSkeleton } from "@/components/blog";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { fetchBlogPosts } from "@/sanity/blog";

async function BlogPostsList() {
  const posts = await fetchBlogPosts();

  if (posts.length <= 0)
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <NewspaperIcon />
          </EmptyMedia>
          <EmptyTitle>No Posts Yet</EmptyTitle>
          <EmptyDescription>Check back later!</EmptyDescription>
        </EmptyHeader>
      </Empty>
    );

  return posts.map((post) => <BlogPostPreview key={post._id} post={post} />);
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
