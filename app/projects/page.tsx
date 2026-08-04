import type { SanityDocument } from "next-sanity";
import { Suspense } from "react";
import { ProjectCard, ProjectSkeleton } from "@/components/projects";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/utils";

const PROJECTS_QUERY = `*[_type == "project" && defined(slug.current)]|order(completedOn desc, startedOn){_id, title, slug, description, image, projectUrl }`;

async function ProjectsGrid() {
  const projects = await client.fetch<SanityDocument[]>(
    PROJECTS_QUERY,
    {},
    { next: { revalidate: 3600 } },
  );

  return (
    <>
      {projects.map((project) => {
        const imageSrc = urlFor(project.image)?.width(1280).height(720).url();
        return (
          <ProjectCard
            key={project._id}
            title={project.title}
            slug={project.slug.current}
            description={project.description}
            imageSrc={imageSrc}
            projectHref={project.projectUrl}
          />
        );
      })}
    </>
  );
}

export default function Projects() {
  return (
    <main>
      <section>
        <h1 className="mb-2">Projects</h1>
        <p className="text-muted mb-8">
          A collection of my work, ranging from personal projects to production
          software deployed at startups and companies.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-8">
          <Suspense
            fallback={[...Array(2).keys()].map((i) => (
              <ProjectSkeleton key={i} />
            ))}
          >
            <ProjectsGrid />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
