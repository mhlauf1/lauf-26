import Image from "next/image";
import { CadenceCover } from "@/components/sections/CadenceCover";
import { InViewVideo } from "@/components/primitives/InViewVideo";
import { StarMark } from "@/components/primitives/StarMark";
import { projects, type Project } from "@/lib/work";
import { StarDivider } from "../primitives/StarDivider";
import { Reveal } from "@/components/anim/Reveal";
import { RevealLines } from "@/components/anim/RevealLines";

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
  items = projects.slice(0, 6),
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
    <section className={`flex w-full flex-col ${flush ? "" : "pt-[36px]"}`}>
      {/* Section head */}
      <div className="mb-8">
        <StarDivider />
      </div>
      <div className="flex flex-col md:flex-row md:items-end justify-between ">
        <div className="flex flex-col gap-3.5">
          <p className="flex items-center gap-2.5 font-sans text-[15px] font-normal text-muted">
            <StarMark className="text-sm text-rust" />
            {eyebrow}
          </p>
          <RevealLines
            as="h2"
            className="font-serif text-[clamp(38px,4.4vw,52px)] font-light leading-[1.05] tracking-[-0.05em] text-ink"
            lines={[heading]}
          />
        </div>
      </div>

      <ul className="mt-12 grid list-none grid-cols-1 gap-x-6 gap-y-14 p-0 md:grid-cols-2">
        {items.map((project, i) => (
          <WorkCard key={project.slug} project={project} index={i} />
        ))}
      </ul>
    </section>
  );
}

/**
 * Local cover art used only on the homepage work grid — independent of each
 * project's canonical `image` (which still drives the case page, tabbed
 * viewer, etc.). Cadence is handled separately below (tagline over bg).
 */
const GRID_COVER: Record<string, string> = {
  embark: "/embark-bg.png",
  "the-body-biz": "/bb-mockup-2.jpg",
  playbook: "/playbook-mock.jpg",
  "stoc-advisory": "/stoc-cover.png",
};

/** Slugs whose homepage cover is a muted autoplay/loop video instead of a still. */
const GRID_VIDEO: Record<string, string> = {
  "brady-digital": "/brady-into.mp4",
  embark: "/embark-spiral.mp4",
};

export function WorkCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  const isCadence = project.slug === "cadence";
  const isStoc = project.slug === "stoc-advisory";
  const isPlaybook = project.slug === "playbook";
  const video = GRID_VIDEO[project.slug];
  const cover = GRID_COVER[project.slug] ?? project.image;
  return (
    <Reveal as="li" index={index} className="flex flex-col gap-5">
      <a
        href={`/work/${project.slug}`}
        className="group hover-card flex flex-col gap-5 no-underline"
      >
        {/* Cover */}
        <div
          className="hover-card__media relative flex h-[480px] w-full items-center justify-center overflow-hidden bg-cream"
          style={
            video || cover || isCadence
              ? undefined
              : { backgroundColor: project.accent }
          }
        >
          {isStoc ? (
            <>
              <Image
                src="/stoc-cover.png"
                alt=""
                aria-hidden
                fill
                sizes="(max-width: 768px) 100vw, 668px"
                className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.03]"
              />
              <Image
                src="/stoc-hero-1.png"
                alt={`${project.name} — ${project.blurb}`}
                width={1200}
                height={600}
                sizes="(max-width: 768px) 68vw, 450px"
                className="relative z-10 w-[84%] rounded-md shadow-2xl ring-1 ring-black/10 transition-transform duration-500 motion-safe:group-hover:scale-[1.03] md:w-[68%]"
              />
              <span className="absolute left-[22px] top-5 z-20 font-sans text-xs font-semibold tracking-[0.-12em] bg-white/20 px-2 py-1 rounded-full text-white">
                {project.vertical}
              </span>
            </>
          ) : isPlaybook ? (
            <>
              <Image
                src="/playbook-mock.jpg"
                alt=""
                aria-hidden
                fill
                sizes="(max-width: 768px) 100vw, 668px"
                className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.03]"
              />
              <InViewVideo
                src="/playbook-video.mp4"
                ariaLabel={`${project.name} — ${project.blurb}`}
                className="relative z-10 w-[84%] rounded-md shadow-2xl ring-1 ring-black/10 transition-transform duration-500 motion-safe:group-hover:scale-[1.03] md:w-[68%]"
              />
              <span className="absolute left-[22px] top-5 z-20 font-sans text-xs font-semibold tracking-[0.-12em] bg-white/20 px-2 py-1 rounded-full text-white">
                {project.vertical}
              </span>
            </>
          ) : video ? (
            <>
              <video
                autoPlay
                loop
                muted
                playsInline
                aria-label={`${project.name} — ${project.blurb}`}
                className={`absolute inset-0 h-full w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.03] ${
                  project.slug === "brady-digital"
                    ? "object-[57%_center] md:object-center"
                    : ""
                }`}
              >
                <source src={video} type="video/mp4" />
              </video>
              <span className="absolute left-[22px] top-5 z-10 font-sans text-xs font-semibold tracking-[0.-12em] bg-white/20 px-2 py-1 rounded-full text-white">
                {project.vertical}
              </span>
            </>
          ) : cover ? (
            <>
              <Image
                src={cover}
                alt={`${project.name} — ${project.blurb}`}
                fill
                sizes="(max-width: 768px) 100vw, 668px"
                className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.03]"
              />
              <span className="absolute left-[22px] top-5 z-10 font-sans text-xs font-semibold tracking-[0.-12em] bg-white/20 px-2 py-1 rounded-full text-white">
                {project.vertical}
              </span>
            </>
          ) : (
            <>
              {isCadence && <CadenceCover />}
              <span className="absolute left-[22px] top-5 z-10 font-sans text-xs  font-semibold tracking-[0.-12em] bg-white/20 px-2 py-1 rounded-full text-white">
                {project.vertical}
              </span>
              {isCadence ? (
                <div className="relative z-10 flex flex-col items-center gap-7">
                  <Image
                    src="/cadence-hero.jpg"
                    alt="Cadence Private Capital"
                    width={650}
                    height={460}
                    sizes="200px"
                    className="h-auto w-[104px] [filter:brightness(0)_invert(1)]"
                  />
                  <p className="whitespace-nowrap text-center font-sans text-[clamp(22px,5.6vw,46px)] font-medium leading-[1.1] tracking-tighter text-white">
                    {project.tagline}
                  </p>
                </div>
              ) : (
                <p className="max-w-[80%] text-center font-italic text-[clamp(34px,3.4vw,46px)] font-normal italic leading-[1.2] text-white">
                  {project.tagline}
                </p>
              )}
            </>
          )}
        </div>

        {/* Footer row */}
        <div className="flex w-full flex-col gap-2 md:flex-row md:items-start md:justify-between md:gap-6">
          <div className="order-2 flex flex-col gap-1.5 md:order-none">
            <h3 className="font-serif text-[26px] font-light leading-8 tracking-[-0.03em] text-ink">
              {project.name}
            </h3>
            <p className="font-sans text-[15px] font-normal leading-[18px] text-muted">
              {project.blurb}
            </p>
          </div>
          <span className="order-1 font-sans text-[13px] font-medium leading-4 text-faint md:order-none md:shrink-0 md:pt-1.5">
            {project.services}
          </span>
        </div>
      </a>
    </Reveal>
  );
}
