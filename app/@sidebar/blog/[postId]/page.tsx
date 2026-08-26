import type { PortableTextBlock } from "next-sanity";
import { fetchBlogPost } from "@/sanity/blog";
import { type HeadingItem, Headings } from "./headings";

function headingLevel(block: { style?: string }): number | undefined {
  if (!block.style) return undefined;
  if (!block.style.startsWith("h")) return undefined;
  return Number.parseInt(block.style.substring(1), 10);
}

export default async function BlogPostSidebar({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const post = await fetchBlogPost((await params).postId);
  const headings = (post.body ?? [])
    .map<[PortableTextBlock, number | undefined]>((block) => [
      block as PortableTextBlock,
      headingLevel(block),
    ])
    .filter(([block, level]) => !!block._key && !!level)
    .map<HeadingItem>(([block, level]) => ({
      // biome-ignore lint/style/noNonNullAssertion: filtered for undefined
      key: block._key!,
      text: block.children?.[0].text ?? "Unknown Heading",
      // biome-ignore lint/style/noNonNullAssertion: filtered for undefined
      level: level!,
    }));

  return <Headings headings={headings} />;
}
