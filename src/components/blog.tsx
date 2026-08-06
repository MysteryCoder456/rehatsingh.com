import type { BlogPost } from "@/sanity/types";
import { Skeleton } from "./ui/skeleton";

export function BlogPostPreview({ post }: { post: BlogPost }) {
  const bodyPreview = post.body?.[0].children?.map((c) => c.text).join(" ");

  return (
    <section>
      <h2>{post.title}</h2>
      <p className="text-muted">{post.subtitle}</p>
      {bodyPreview ? (
        <p>
          {bodyPreview}{" "}
          <a href="/" className="text-muted">
            {/* TODO: add link to full blog post */}
            Read more
          </a>
        </p>
      ) : (
        <p className="text-muted italic">No Preview Available</p>
      )}
    </section>
  );
}

export function BlogPostSkeleton() {
  return (
    <section>
      <h2>
        <Skeleton className="w-[60%] h-5.5 my-2" />
      </h2>
      <p className="mt-2">
        <Skeleton className="mb-4 h-3" />
        <Skeleton className="my-4 h-3" />
        <Skeleton className="my-4 h-3 w-[30%]" />
      </p>
    </section>
  );
}
