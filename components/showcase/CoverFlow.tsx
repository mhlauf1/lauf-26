"use client";

import Image from "next/image";
import { useState } from "react";
import { StarMark } from "@/components/primitives/StarMark";
import { projects, type Project } from "@/lib/work";

/**
 * "F14 Coverflow" — a cover-flow carousel. The center cover faces forward;
 * flanking covers tilt back in 3D (perspective + rotateY) and dim as they
 * recede. Click a side cover — or use the prev/next buttons or arrow keys —
 * to bring it to the front.
 *
 * Reads from lib/work.ts. Projects with a cover image show it; the rest get
 * a flat tinted ground in their own accent (color lives in the work).
 *
 * Motion-safe: with `prefers-reduced-motion`, the 3D rig drops away and the
 * deck renders as a simple centered carousel — only the active cover is shown,
 * flat and forward, no perspective or rotateY.
 */
export function CoverFlow({
  items = projects,
}: {
  items?: Project[];
}) {
  const [active, setActive] = useState(
    Math.min(2, Math.max(0, Math.floor(projects.length / 2))),
  );

  const go = (dir: 1 | -1) =>
    setActive((a) => (a + dir + items.length) % items.length);

  return (
    <div className="flex w-full flex-col">
      {/* header — matches the Paper label row */}
      <div className="mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <StarMark className="text-[18px]" />
        <span className="font-sans text-[13px] font-semibold uppercase tracking-[0.12em] text-ink">
          Cover-flow carousel
        </span>
        <span className="font-sans text-[13px] font-normal text-faint">
          — covers tilt back in 3D as they pass
        </span>
      </div>

      {/* stage — ink board ground, the deck floats on it */}
      <div className="relative w-full overflow-hidden rounded-[16px] bg-board">
        {/* 3D rig: perspective only applied in the motion-safe path */}
        <ul
          className="flex h-[500px] list-none items-center justify-center [perspective:1200px] motion-reduce:[perspective:none]"
          aria-label="Project covers"
        >
          {items.map((project, i) => {
            // signed distance from the active cover
            const offset = i - active;
            const dist = Math.abs(offset);
            const isCenter = offset === 0;

            // depth → opacity, mirroring the Paper computed styles
            const opacity = isCenter ? 1 : dist === 1 ? 0.85 : 0.55;
            // angle grows with distance; sign follows the side
            const rotateY = isCenter ? 0 : Math.sign(offset) * (dist === 1 ? 38 : 52);
            // covers overlap as they recede toward the edges
            const x = offset * 232 - Math.sign(offset) * 44;
            const z = isCenter ? 0 : -90 * dist;
            const scale = isCenter ? 1 : dist === 1 ? 0.86 : 0.78;

            return (
              <li
                key={project.slug}
                data-center={isCenter}
                className="absolute transition-[transform,opacity] duration-500 ease-out motion-reduce:transition-opacity motion-reduce:duration-300"
                style={{
                  zIndex: items.length - dist,
                  opacity: isCenter ? 1 : opacity,
                  // 3D transform for motion-safe; CSS swaps it flat below
                  transform: `translateX(${x}px) translateZ(${z}px) rotateY(${rotateY}deg) scale(${scale})`,
                }}
              >
                <Cover
                  project={project}
                  isCenter={isCenter}
                  onSelect={() => setActive(i)}
                  onNav={go}
                />
              </li>
            );
          })}

          {/* Reduced-motion overrides: drop the 3D, hide side covers, flatten.
              Scoped via the parent <ul> so we don't touch globals.css. */}
          <style>{`
            @media (prefers-reduced-motion: reduce) {
              ul[aria-label="Project covers"] > li { transform: none !important; }
              ul[aria-label="Project covers"] > li[data-center="false"] {
                opacity: 0 !important;
                pointer-events: none;
              }
            }
          `}</style>
        </ul>

        {/* controls */}
        <button
          type="button"
          aria-label="Previous cover"
          onClick={() => go(-1)}
          className="absolute left-5 top-1/2 z-30 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
        >
          <span aria-hidden className="text-lg">‹</span>
        </button>
        <button
          type="button"
          aria-label="Next cover"
          onClick={() => go(1)}
          className="absolute right-5 top-1/2 z-30 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
        >
          <span aria-hidden className="text-lg">›</span>
        </button>
      </div>
    </div>
  );
}

/** A single cover. The active one is keyboard-focusable and arrow-navigable. */
function Cover({
  project,
  isCenter,
  onSelect,
  onNav,
}: {
  project: Project;
  isCenter: boolean;
  onSelect: () => void;
  onNav: (dir: 1 | -1) => void;
}) {
  // center = 340×452, sides scale down via the parent transform
  return (
    <button
      type="button"
      tabIndex={isCenter ? 0 : -1}
      aria-current={isCenter ? "true" : undefined}
      aria-label={`${project.name} — ${project.blurb}`}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (!isCenter) return;
        if (e.key === "ArrowRight") {
          e.preventDefault();
          onNav(1);
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          onNav(-1);
        }
      }}
      className="relative block h-[452px] w-[340px] overflow-hidden rounded-[16px] text-left shadow-[0_34px_70px_#14141447] outline-offset-4 outline-rust focus-visible:outline-2"
      style={{ backgroundColor: project.accent }}
    >
      {project.image ? (
        <Image
          src={project.image}
          alt=""
          fill
          sizes="340px"
          className="object-cover"
        />
      ) : null}

      {/* bottom gradient + name, mirroring Paper's label frame */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-b from-transparent to-board/80 p-6">
        <span className="font-serif text-[30px] font-light leading-[36px] text-white">
          {project.name}
        </span>
      </div>
    </button>
  );
}
