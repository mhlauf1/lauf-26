"use client";

import Image from "next/image";
import { useState } from "react";
import { StarMark } from "@/components/primitives/StarMark";
import { projects, type Project } from "@/lib/work";

/**
 * "Selected work, in motion." — a showreel / video-loop hero panel.
 *
 * NOTE: we have no video assets, so this is a *poster placeholder*. A project
 * cover image stands in for the reel, with a play affordance, an eyebrow, a
 * serif caption, and a "00:42 ↻ LOOP" runtime chip — matching the Paper F05
 * layout exactly. Clicking the play button only toggles a paused/playing
 * pressed state (there is no real media to drive). When "playing", a subtle
 * motion-safe Ken-Burns scale animates the poster.
 *
 * Reads from lib/work.ts. Defaults to the Embark cover.
 */
export function Showreel({
  project = projects.find((p) => p.slug === "embark") ?? projects[0],
  eyebrow = "SHOWREEL — 2026",
  caption = "Selected work, in motion.",
  runtime = "00:42",
}: {
  project?: Project;
  eyebrow?: string;
  caption?: string;
  runtime?: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative h-[clamp(440px,46vw,620px)] w-full overflow-hidden rounded-[14px] bg-board">
      {/* poster: a project cover stands in for the (absent) reel */}
      <Image
        src={project.image!}
        alt={`${project.name} — ${project.blurb}`}
        fill
        sizes="(max-width: 1024px) 100vw, 1360px"
        className={`object-cover transition-transform duration-[8000ms] ease-out ${
          playing ? "motion-safe:scale-110" : "scale-100"
        }`}
        style={{ objectPosition: "center 24%" }}
        priority={false}
      />

      {/* top-to-bottom darkening so the caption + eyebrow stay legible */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(16,17,22,0.5) 0%, rgba(16,17,22,0.12) 35%, rgba(16,17,22,0.72) 100%)",
        }}
      />

      {/* eyebrow */}
      <div className="absolute left-[30px] top-7 flex items-center gap-2.5">
        <StarMark className="text-[20px]" />
        <span className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-white">
          {eyebrow}
        </span>
      </div>

      {/* play affordance (placeholder — no real media to play) */}
      <button
        type="button"
        aria-pressed={playing}
        aria-label={playing ? "Pause showreel" : "Play showreel"}
        onClick={() => setPlaying((p) => !p)}
        className="absolute left-1/2 top-1/2 grid h-[92px] w-[92px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-[1.5px] border-white/60 bg-white/[0.16] backdrop-blur-sm transition-colors hover:bg-white/[0.26] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
      >
        {playing ? (
          <span className="flex items-center gap-[6px]" aria-hidden>
            <span className="h-[26px] w-[7px] rounded-[1px] bg-white" />
            <span className="h-[26px] w-[7px] rounded-[1px] bg-white" />
          </span>
        ) : (
          <span
            aria-hidden
            className="ml-1.5 h-0 w-0 border-y-[13px] border-l-[22px] border-y-transparent border-l-white"
          />
        )}
      </button>

      {/* bottom row: serif caption + runtime/loop chip */}
      <div className="absolute inset-x-[30px] bottom-7 flex items-end justify-between gap-6">
        <p className="font-serif text-[clamp(26px,3vw,34px)] font-light leading-[1.05] tracking-[-0.01em] text-white">
          {caption}
        </p>

        <div className="flex shrink-0 items-center gap-2.5 rounded-full border border-white/[0.28] bg-white/[0.14] px-[18px] py-2.5 font-sans text-[13px] font-medium text-white">
          <span>{runtime}</span>
          <span aria-hidden>↻ LOOP</span>
        </div>
      </div>
    </div>
  );
}
