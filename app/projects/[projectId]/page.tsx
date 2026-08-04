import { LinkIcon } from "lucide-react";
import Image from "next/image";
import type { SanityDocument } from "next-sanity";
import { PortableText } from "next-sanity";
import FloatingBallBackground from "@/components/floating-balls-background";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/utils";

const PROJECT_QUERY = `*[_type == "project" && defined(slug.current) && slug.current == $projectId][0]`;

export default async function ProjectDetails({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const project = await client.fetch<SanityDocument>(
    PROJECT_QUERY,
    await params,
    { next: { revalidate: 3600 } },
  );
  const imageUrl = urlFor(project.image);
  const imageSrc = imageUrl?.width(1280).height(720).url();

  return (
    <>
      <FloatingBallBackground colors={project.colors} />

      <main>
        <section className="flex flex-row max-h-44 justify-stretch">
          <div className="gap-4 flex flex-col flex-1">
            <div>
              <h1 className="text-5xl">{project.title}</h1>
              <p className="text-xl text-muted line-clamp-1">
                {project.description}
              </p>
            </div>

            <div className="flex flex-row gap-1">
              {project.technologies.map((tech: string) => (
                <Badge key={tech} variant="outline">
                  {tech}
                </Badge>
              ))}
            </div>

            <Button asChild className="max-w-max">
              <a
                href={project.projectUrl}
                target="_blank"
                className="no-underline"
              >
                <span className="inline-flex gap-2 items-center">
                  <LinkIcon />
                  Check Out
                </span>
              </a>
            </Button>
          </div>

          {imageSrc && (
            <Image
              src={imageSrc}
              width={1280}
              height={720}
              alt={`An image showcasing the project ${project.title}`}
              className="w-auto h-full rounded-lg hidden sm:block"
            />
          )}
        </section>

        <section>
          <PortableText value={project.body} />
        </section>
      </main>
    </>
  );
}
