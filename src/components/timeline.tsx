import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function Timeline({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col">{children}</div>;
}

export type TimelineItemProps = {
  title?: string;
  subtitle?: string;
  position?: "first" | "last";
  aside?: React.ReactNode;
  children: React.ReactNode;
};

export function TimelineItem({
  title,
  subtitle,
  position,
  aside,
  children,
}: TimelineItemProps) {
  const content = (
    <>
      {(title || subtitle) && (
        <CardHeader className={aside ? "lg:px-0" : undefined}>
          {title && <CardTitle>{title}</CardTitle>}
          {subtitle && <CardDescription>{subtitle}</CardDescription>}
        </CardHeader>
      )}
      <CardContent className={aside ? "lg:px-0" : undefined}>
        {children}
      </CardContent>
    </>
  );

  return (
    <div className="flex flex-row">
      <div className="flex-none flex flex-col justify-center relative items-center ms-4 mx-8">
        <div
          className={cn(
            "w-1.5 bg-border absolute h-full z-0",
            position && "h-[50%]",
            position === "first" && "bottom-0",
            position === "last" && "top-0",
          )}
        ></div>
        <div className="bg-primary w-4 h-4 rounded-full z-1" />
      </div>

      <Card className="flex-1 my-6 min-w-0">
        {aside ? (
          <div className="lg:grid lg:grid-cols-3 lg:px-6">
            <div className="flex min-w-0 flex-col gap-6 lg:col-span-2">
              {content}
            </div>
            <div className="hidden items-center justify-center px-6 lg:flex">
              {aside}
            </div>
          </div>
        ) : (
          content
        )}
      </Card>
    </div>
  );
}

export function TimelineActivityList({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row gap-4 pt-6 py-3 overflow-x-auto">
      {children}
    </div>
  );
}

export type TimelineActivityProps = {
  title: string;
  description?: string;
};

export function TimelineActivity({
  title,
  description,
}: TimelineActivityProps) {
  const imageFilename = `${title.toLowerCase().replace(/\s+/, "-")}.png`;
  const imageSrc = `/images/story/${imageFilename}`;

  return (
    <div className="text-sm">
      <Image
        src={imageSrc}
        width={1280}
        height={720}
        alt={`An image showcasing ${title}`}
        className="rounded-lg max-w-64 aspect-video bg-secondary text-center"
      />

      <div className="mt-2">
        <span>{title}</span>
        {description && (
          <>
            <br />
            <span className="text-muted">{description}</span>
          </>
        )}
      </div>
    </div>
  );
}
