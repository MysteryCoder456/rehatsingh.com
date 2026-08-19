import { cn } from "@/lib/utils";

export type HeadingItem = {
  key: string;
  text: string;
  level: number;
};

const headingConfig = [
  "w-18 ml-0", // h1
  "w-16 ml-2", // h2
  "w-14 ml-4", // h3
  "w-12 ml-6", // h4
  "w-10 ml-8", // h5
  "w-8 ml-10", // h6
];

export function Headings({ headings }: { headings: HeadingItem[] }) {
  return (
    <div className={cn("text-muted flex flex-col")}>
      {headings.map((h) => {
        return (
          <a
            href={`#heading-${h.key}`}
            key={h.text}
            className="group px-2 py-1 no-underline"
          >
            <div
              className={cn(
                "text-[4px] h-1 bg-muted rounded-md transition-opacity ease-out duration-300 opacity-25 group-hover:opacity-60",
                headingConfig[h.level - 1],
              )}
            />
          </a>
        );
      })}
    </div>
  );
}
