"use client";

import Image from "next/image";
import { StarMark } from "@/components/primitives/StarMark";
import { projects, type Project } from "@/lib/work";

/**
 * "Stacked scroll-cards" (Paper F07). A vertical run of case-study cards
 * that pile up as you scroll: each card is `position: sticky` at a slightly
 * larger top offset than the one before, so cards stack on top of one
 * another instead of scrolling away. Pure CSS — no JS, no scroll listeners.
 *
 * Reduced-motion: when the viewer prefers reduced motion we drop the sticky
 * behaviour (via the `motion-reduce:!static` utility) so the cards render as
 * a plain vertical stack with no pinning or overlap.
 *
 * Reads from lib/work.ts. Cards with a cover image get a split image panel;
 * imageless cards get a tinted accent block in its place.
 */
export function StackCards({
  items = projects.slice(0, 4),
}: {
  items?: Project[];
}) {
  const total = items.length;

  return (
    <div className="flex w-full flex-col gap-[18px] border-t border-line pt-9 pb-14">
      {/* eyebrow / section label */}
      <div className="flex items-center gap-3">
        <StarMark className="text-[18px]" />
        <span className="font-sans text-[13px] font-semibold uppercase tracking-[0.12em] text-ink">
          07 · Stacked scroll-cards
        </span>
        <span className="font-sans text-[13px] text-faint">
          — cases stack as you scroll
        </span>
      </div>

      {/* the scroll run: each card sticks higher than the last */}
      <ol className="m-0 flex list-none flex-col gap-6 p-0">
        {items.map((project, i) => (
          <li
            key={project.slug}
            className="sticky motion-reduce:!static"
            style={{ top: `calc(7vh + ${i * 16}px)` }}
          >
            <Card project={project} index={i} total={total} />
          </li>
        ))}
      </ol>
    </div>
  );
}

function Card({
  project,
  index,
  total,
}: {
  project: Project;
  index: number;
  total: number;
}) {
  return (
    <article
      className="mx-auto flex h-[380px] w-full max-w-[1000px] overflow-clip rounded-2xl border border-line bg-paper"
      style={{ boxShadow: "0 -10px 40px #1414141a" }}
    >
      {/* left panel: cover image, or a tinted accent block when imageless */}
      <div className="relative h-full w-[420px] shrink-0 overflow-clip">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.name} — ${project.blurb}`}
            fill
            sizes="420px"
            className="object-cover"
            style={{ objectPosition: "center 30%" }}
          />
        ) : (
          <div
            className="flex h-full w-full flex-col justify-end p-8"
            style={{ backgroundColor: tint(project.accent) }}
          >
            <span
              className="font-serif text-[clamp(34px,3.4vw,46px)] font-light leading-[0.98] tracking-[-0.01em]"
              style={{ color: project.accent }}
            >
              {project.name}
            </span>
          </div>
        )}
      </div>

      {/* right panel: copy */}
      <div className="flex flex-1 basis-0 flex-col justify-between px-10 py-9">
        <div className="flex items-center justify-between">
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.12em] text-faint">
            {project.vertical}
          </span>
          <span className="font-sans text-[13px] font-medium text-[#b0a89a]">
            Card {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>

        <div className="flex flex-col gap-3.5">
          <h3 className="font-serif text-[clamp(30px,3.2vw,40px)] font-light leading-[1.05] tracking-[-0.01em] text-ink">
            {project.name} — {project.tagline}
          </h3>
          <p className="font-sans text-[15px] text-muted">{project.services}</p>
        </div>

        <a
          href={`/work/${project.slug}`}
          className="flex items-center gap-2.5 text-[14px] font-medium text-ink transition-opacity hover:opacity-70"
        >
          <StarMark className="text-[18px]" />
          Read the case <span aria-hidden>→</span>
        </a>
      </div>
    </article>
  );
}

/** A soft, paper-tinted wash of the project's accent for imageless cards. */
function tint(hex: string): string {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return "#f1eadc";
  const n = parseInt(m[1], 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  // mix ~16% accent into the warm paper ground (#fdfcfa)
  const mix = (c: number, base: number) => Math.round(c * 0.16 + base * 0.84);
  return `rgb(${mix(r, 253)}, ${mix(g, 252)}, ${mix(b, 250)})`;
}
