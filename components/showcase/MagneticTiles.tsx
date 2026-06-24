"use client";

import Image from "next/image";
import { useRef } from "react";
import { StarMark } from "@/components/primitives/StarMark";
import { projects, type Project } from "@/lib/work";

/**
 * "F15 Magnetic" — a row of tiles that lean toward the cursor on hover.
 *
 * The magnetic effect is pure transform math: on pointermove we translate
 * the tile a small fraction of the distance from its center to the cursor,
 * scheduled on a single requestAnimationFrame to avoid layout thrash. On
 * leave it eases back to rest. The whole thing is motion-safe — when the
 * user prefers reduced motion the lean is disabled and tiles stay static
 * (hover only nudges the cover scale via CSS).
 *
 * Reads from lib/work.ts. Tiles with a cover image show it; the rest get a
 * tinted accent ground so the row stays full even without art.
 */
export function MagneticTiles({
  items = projects.slice(0, 4),
  /** how far a tile leans toward the cursor, as a fraction of the offset */
  strength = 0.16,
}: {
  items?: Project[];
  strength?: number;
}) {
  return (
    <div className="flex w-full flex-col gap-9">
      {/* eyebrow header */}
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="flex items-baseline gap-2">
          <StarMark className="text-lg" />
          <span className="font-sans text-[13px] font-semibold uppercase tracking-[0.12em] text-ink">
            Magnetic hover tiles
          </span>
        </span>
        <span className="font-sans text-[13px] text-faint">
          — tiles lean toward your cursor
        </span>
      </div>

      {/* the magnetic row */}
      <div className="flex w-full flex-col gap-5 sm:flex-row">
        {items.map((p) => (
          <Tile key={p.slug} project={p} strength={strength} />
        ))}
      </div>
    </div>
  );
}

function Tile({ project, strength }: { project: Project; strength: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const frame = useRef<number | null>(null);

  const lean = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const dy = (e.clientY - (rect.top + rect.height / 2)) * strength;
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
    });
  };

  const reset = () => {
    const el = ref.current;
    if (!el) return;
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.style.transform = "translate3d(0, 0, 0)";
    });
  };

  return (
    <a
      ref={ref}
      href={`/work/${project.slug}`}
      onPointerMove={lean}
      onPointerLeave={reset}
      onBlur={reset}
      aria-label={`${project.name} — ${project.blurb}`}
      className="group relative block h-[300px] flex-1 overflow-hidden rounded-[14px] bg-board outline-none transition-[transform,box-shadow] duration-300 ease-out will-change-transform focus-visible:ring-2 focus-visible:ring-rust focus-visible:ring-offset-2 focus-visible:ring-offset-paper sm:h-[340px]"
    >
      {project.image ? (
        <Image
          src={project.image}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, 25vw"
          className="object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.04]"
        />
      ) : (
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundColor: project.accent,
            backgroundImage: `radial-gradient(120% 120% at 30% 20%, ${project.accent} 0%, #16140f 130%)`,
          }}
        />
      )}

      {/* legibility scrim under the label */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-board/80"
      />

      <span className="absolute bottom-3.5 left-[18px] right-[18px] font-serif text-[22px] font-light leading-7 text-white">
        {project.name}
      </span>
    </a>
  );
}
