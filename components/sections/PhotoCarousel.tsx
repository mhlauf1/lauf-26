import Image from "next/image";
import { StarMark } from "@/components/primitives/StarMark";
import { projects, type Project } from "@/lib/work";

/**
 * "From the studio" — a continuously looping photo carousel of work.
 * The strip drifts left forever via a duplicated track (pure CSS, the
 * shared `animate-marquee` keyframe), and pauses on hover/focus. Motion
 * is motion-safe only: with reduced-motion the strip becomes a static,
 * horizontally-scrollable row so nothing is lost.
 *
 * Reads from lib/work.ts. Only a few projects ship cover photos, so the
 * deck loops/repeats those across the strip — the visual rhythm matches
 * the Paper design (mix of wide and narrow frames).
 */

/** Width buckets cycled across the strip for an editorial, uneven rhythm. */
const WIDTHS = [300, 270, 420, 300, 480, 300] as const;

type Slide = { project: Project; width: number };

export function PhotoCarousel({
  items = projects.filter((p) => p.image),
  eyebrow = "From the studio",
  heading = "Brands we've helped show up.",
}: {
  items?: Project[];
  eyebrow?: string;
  heading?: string;
}) {
  // Build a deck long enough to fill the strip, repeating cover photos and
  // cycling through the width buckets so adjacent frames vary in size.
  const deck: Slide[] = WIDTHS.map((width, i) => ({
    project: items[i % items.length],
    width,
  }));

  const Run = ({ ariaHidden = false }: { ariaHidden?: boolean }) => (
    <ul
      className="flex shrink-0 items-start gap-[18px] pr-[18px]"
      aria-hidden={ariaHidden || undefined}
      // a duplicated visual track is decorative; the real list is the first Run
      role={ariaHidden ? "presentation" : "list"}
    >
      {deck.map(({ project, width }, i) => (
        <li
          key={`${project.slug}-${i}`}
          className="relative h-[340px] shrink-0 overflow-hidden rounded-xl bg-board"
          style={{ width }}
        >
          <Image
            src={project.image!}
            alt={`${project.name} — ${project.blurb}`}
            fill
            sizes={`${width}px`}
            className="object-cover"
          />
          <span className="absolute bottom-[14px] left-4 font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-white">
            {project.name}
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <section
      aria-label={heading}
      className="flex w-full flex-col gap-[30px] pt-[118px]"
    >
      {/* header: title on the left, drag affordance on the right */}
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
        <div className="flex flex-col gap-[22px]">
          <span className="flex items-center gap-2">
            <StarMark className="text-[13px]" />
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-faint">
              {eyebrow}
            </span>
          </span>
          <h2
            className="font-serif font-light leading-[1.05] tracking-[-0.02em] text-ink"
            style={{ fontSize: "clamp(34px, 4.2vw, 52px)" }}
          >
            {heading}
          </h2>
        </div>

        <span
          aria-hidden
          className="font-sans text-[13px] font-medium tracking-[0.04em] text-faint"
        >
          ← Drag to explore →
        </span>
      </div>

      {/* Photo strip. motion-safe: a seamless looping marquee that pauses on
          hover/focus. motion-reduce: a static, horizontally-scrollable row. */}
      <div className="group w-full overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden motion-safe:overflow-hidden">
        <div className="flex w-max motion-safe:animate-marquee group-hover:motion-safe:[animation-play-state:paused] group-focus-within:motion-safe:[animation-play-state:paused]">
          <Run />
          <Run ariaHidden />
        </div>
      </div>
    </section>
  );
}
