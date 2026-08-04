import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import FeaturedProjects from "@/components/featured-projects";
import Hero from "@/components/hero";
import { ProjectSkeleton } from "@/components/projects";
import {
  Timeline,
  TimelineActivity,
  TimelineActivityList,
  TimelineItem,
} from "@/components/timeline";

export default function Home() {
  return (
    <main>
      <section className="h-lvh -mt-18">
        <Hero />
      </section>

      <section>
        <h1 className="mb-4">Featured Projects</h1>

        <div className="grid sm:grid-cols-2 grid-cols-1 lg:gap-8 gap-4">
          <Suspense
            fallback={[...Array(2).keys()].map((i) => (
              <ProjectSkeleton key={i} />
            ))}
          >
            <FeaturedProjects />
          </Suspense>
        </div>

        <div className="text-base pt-6 w-full text-center">
          <Link href="/projects" className="inline-flex items-center">
            See All <ChevronRightIcon className="w-[1em]" />
          </Link>
        </div>
      </section>

      <section>
        <h1 className="mb-2">My Story</h1>
        <p className="text-muted">
          How I've evolved as a developer over the years.
        </p>

        <Timeline>
          <TimelineItem
            title="Learning to Make Things Exist"
            subtitle="Middle School"
            position="first"
          >
            <p>
              Programming sparked my curiosity when I learned QBasic in middle
              school. But it truly got my attention when I realized it could{" "}
              <b>do real things</b>, not just print text on a screen. Most of my
              first projects were remakes of games I enjoyed playing when I was
              younger.
            </p>
          </TimelineItem>

          <TimelineItem title="Developing for the World" subtitle="High School">
            <p>
              I began seeking validation. Whether it was in the form of user
              feedback from projects I'd shipped, prizes from things I'd built
              for competitions, or cold hard cash; I had subconsciously
              internalized the <b>feedback-iteration loop</b> as a developer.
            </p>
          </TimelineItem>

          <TimelineItem
            title="Intersection of Disciplines"
            subtitle="Late High School & Early College"
          >
            <p>
              As I learnt more about the world, my interests shifted. I began to
              view code as a facilitator for other fields, a tool to{" "}
              <b>amplify ideas</b> that exist outside the Computer Science
              sphere. This helped me explore fresh ideas that I previously would
              not have fully appreciated.
            </p>
          </TimelineItem>

          <TimelineItem
            title="Product-Driven Mindset"
            subtitle="Present"
            position="last"
          >
            <p>
              Over the years, I went from creating software purely for the sake
              of writing code to developing helpful products that solve real
              problems. Of course, I still enjoy the development journey and all
              the decisions that come with it, but my primary motivator is now
              the <b>value</b> my work brings to people.
            </p>

            {/* TODO: show and make dynamic */}
            <div className="hidden">
              <TimelineActivityList>
                <TimelineActivity title="Flux" description="TODO" />
                <TimelineActivity title="Mind Merge" description="TODO" />
                <TimelineActivity title="FreeVoIP" description="TODO" />
                <TimelineActivity title="Red Coral" description="TODO" />
                <TimelineActivity title="Drippr" description="TODO" />
              </TimelineActivityList>
            </div>
          </TimelineItem>
        </Timeline>
      </section>

      <section>
        <h1 className="mb-2">Professional Experience</h1>

        <Timeline>
          <TimelineItem
            title="Al Masaood LLC"
            subtitle="Software Developer Intern – Summer 2025 "
            position="first"
          >
            <div className="flex flex-row items-center">
              <ul className="list-outside ms-3.5">
                <li>
                  Built and launched a React/SPFx timesheet tracker for 30+
                  technicians, saving 1,500+ sheets weekly through
                  SAP-integrated SharePoint
                </li>
                <li>
                  Assisted development of a legal chatbot using FastAPI, React,
                  and RAG, saving the legal team 8 hrs/wk
                </li>
                <li>
                  Partnered with the insurance department on an app for vehicle
                  inventory and insurance, handling data modeling and SharePoint
                  API integration
                </li>
              </ul>

              <Image
                src="/images/experience/masaood.png"
                alt="Al Masaood's Logo"
                width={630}
                height={630}
                className="max-w-[20%] h-auto object-cover ms-8 hidden lg:block"
              />
            </div>
          </TimelineItem>

          <TimelineItem
            title="Data Science for Sustainable Development"
            subtitle="Student Developer – Fall 2024"
            position="last"
          >
            <div className="flex flex-row items-center">
              <ul className="list-outside ms-3.5">
                <li>
                  Built a statistics dashboard for the open-source{" "}
                  <a
                    href="https://redcoralmap.web.app/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Red-CORAL
                  </a>{" "}
                  crime visualization project, analyzing 1,200+ data points
                  using React and Firebase
                </li>
                <li>
                  Helped build a modular filtering system using logic
                  predicates, enabling flexible data slicing and real-time
                  geospatial visualization
                </li>
                <li>
                  Participated in biweekly workshops focused on applied data
                  science and professional development
                </li>
              </ul>

              <Image
                src="/images/experience/dssd.png"
                alt="Data Science for Sustainable Development's Logo"
                width={512}
                height={512}
                className="max-w-[20%] h-auto object-cover ms-8 hidden lg:block"
              />
            </div>
          </TimelineItem>
        </Timeline>
      </section>
    </main>
  );
}
