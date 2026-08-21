"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { blogHeadingId, cn } from "@/lib/utils";

export type HeadingItem = {
  key: string;
  text: string;
  level: number;
};

const headingConfig = [
  "w-12 ml-0", // h1
  "w-10 ml-2", // h2
  "w-8 ml-4", // h3
  "w-6 ml-6", // h4
  "w-4 ml-8", // h5
  "w-2  ml-10", // h6
];

export function Headings({ headings }: { headings: HeadingItem[] }) {
  const [visibleHeadings, setVisibleHeadings] = useState<
    Record<string, number | undefined>
  >({});

  const firstVisibleHeadingId = useMemo<string | undefined>(() => {
    const visibleHeadingEntries = Object.entries(visibleHeadings);

    if (visibleHeadingEntries.length <= 0) return undefined;
    const firstHeading = visibleHeadingEntries
      .filter(([_, p]) => !!p)
      .reduce(
        (min, curr) => {
          // biome-ignore lint/style/noNonNullAssertion: filtered for undefined
          if (min[1]! > curr[1]!) return curr;
          return min;
        },
        ["", Infinity],
      );

    return firstHeading[0];
  }, [visibleHeadings]);

  const observerCallback: IntersectionObserverCallback = useCallback(
    (entries, _observer) => {
      const updatedHeadings = entries
        .map<[IntersectionObserverEntry, number]>((e) => [
          e,
          window.pageYOffset + e.boundingClientRect.y,
        ])
        .map<[string, number | undefined]>(([e, p]) => [
          e.target.id,
          e.isIntersecting ? p : undefined,
        ])
        .reduce(
          (acc, [key, value]) => {
            acc[key] = value;
            return acc;
          },
          {} as Record<string, number | undefined>,
        );

      setVisibleHeadings((current) => {
        const newHeadings = { ...current, ...updatedHeadings };
        return newHeadings;
      });
    },
    [],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      threshold: 1.0,
    });

    document.querySelectorAll(".blog-heading").forEach((el) => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [observerCallback]);

  return (
    <div className={cn("text-muted flex flex-col")}>
      {headings.map((h) => {
        const headingId = blogHeadingId(h.key);

        return (
          <Tooltip key={h.key}>
            <TooltipTrigger asChild>
              <a
                href={`#${headingId}`}
                className="group px-2 py-1 no-underline"
              >
                <div
                  className={cn(
                    "text-[4px] h-1 rounded-md transition-opacity ease-out duration-300 opacity-25 group-hover:opacity-60",
                    headingConfig[h.level - 1],
                    firstVisibleHeadingId === headingId
                      ? "bg-primary"
                      : "bg-muted",
                  )}
                />
              </a>
            </TooltipTrigger>
            <TooltipContent side="left">{h.text}</TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
}
