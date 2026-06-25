import Image from "next/image";
import { StarMark } from "@/components/primitives/StarMark";
import { projects, type Project } from "@/lib/work";
import { StarDivider } from "../primitives/StarDivider";

/**
 * "Selected work" — the homepage case grid. A two-column grid of project
 * cards: each has a 400px cover (real cover image where one exists, else a
 * tinted block carrying the project's Fraunces-italic tagline) above a
 * footer row with the project name, services, and a one-line blurb.
 *
 * Reads from lib/work.ts. Cover tint + eyebrow color come from project.accent
 * — the only place color enters the chrome — because color lives in the work.
 */
export function WorkGrid({
  items = projects.slice(0, 4),
  eyebrow = "Selected work",
  heading = "A few brands we’ve built lately.",
  /** show the "All projects →" link in the head (hidden on the /work index) */
  showAllLink = true,
  /** drop the top padding when the page already provides its own header */
  flush = false,
}: {
  items?: Project[];
  eyebrow?: string;
  heading?: string;
  showAllLink?: boolean;
  flush?: boolean;
}) {
  return (
    <section className={`flex w-full flex-col ${flush ? "" : "pt-[74px]"}`}>
      {/* Section head */}
      <div className="flex items-end justify-between ">
        <div className="flex flex-col gap-3.5">
          <span className="flex items-center gap-2">
            <StarMark className="text-sm" />
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-faint">
              {eyebrow}
            </span>
          </span>
          <h2 className="font-serif text-[clamp(38px,4.4vw,52px)] font-light leading-[1.05] tracking-[-0.05em] text-ink">
            {heading}
          </h2>
        </div>

        {showAllLink && (
          <a
            href="/work"
            className="shrink-0 pb-2 font-sans text-sm font-medium text-ink transition-colors hover:text-rust"
          >
            All projects <span aria-hidden>&rarr;</span>
          </a>
        )}
      </div>
      <div className="mt-7">
        <StarDivider />
      </div>
      <ul className="mt-12 grid list-none grid-cols-1 gap-x-6 gap-y-14 p-0 md:grid-cols-2">
        {items.map((project) => (
          <WorkCard key={project.slug} project={project} />
        ))}
      </ul>
    </section>
  );
}

export function WorkCard({ project }: { project: Project }) {
  return (
    <li className="flex flex-col gap-5">
      <a
        href={`/work/${project.slug}`}
        className="group flex flex-col gap-5 no-underline"
      >
        {/* Cover */}
        <div
          className="relative flex h-[400px] w-full items-center justify-center overflow-hidden rounded-xl bg-cream"
          style={
            project.image ? undefined : { backgroundColor: project.accent }
          }
        >
          {project.image ? (
            <>
              <Image
                src={project.image}
                alt={`${project.name} — ${project.blurb}`}
                fill
                sizes="(max-width: 768px) 100vw, 668px"
                className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.03]"
              />
              <span className="absolute left-[22px] top-5 z-10 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-white">
                {project.vertical}
              </span>
            </>
          ) : (
            <>
              <span className="absolute left-[22px] top-5 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-white/85">
                {project.vertical}
              </span>
              <p className="max-w-[80%] text-center font-italic text-[clamp(34px,3.4vw,46px)] font-normal italic leading-[1.2] text-white">
                {project.tagline}
              </p>
            </>
          )}
        </div>

        {/* Footer row */}
        <div className="flex w-full items-start justify-between gap-6">
          <div className="flex flex-col gap-1.5">
            <h3 className="font-serif text-[26px] font-light leading-8 tracking-[-0.03em] text-ink transition-colors group-hover:text-rust">
              {project.name}
            </h3>
            <p className="font-sans text-[15px] font-normal leading-[18px] text-muted">
              {project.blurb}
            </p>
          </div>
          <span className="shrink-0 pt-1.5 font-sans text-[13px] font-medium leading-4 text-faint">
            {project.services}
          </span>
        </div>
      </a>
    </li>
  );
}
