"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { StarMark } from "@/components/primitives/StarMark";
import { projects, type Project } from "@/lib/work";

/**
 * "F06 Sticky Split" — a sticky split-scroll section. The text column on the
 * left pins (position: sticky, vertically centred) while a column of images
 * on the right scrolls past it. Each image is a "step"; as a step enters the
 * viewport its copy swaps into the pinned panel and its number lights up.
 *
 * Pure CSS `position: sticky` does the pinning — no GSAP. The active-step
 * tracking uses IntersectionObserver, which is purely cosmetic: with
 * prefers-reduced-motion (or no JS) the layout is a normal stacked scroll —
 * the pinned panel simply shows the first step and every image is reachable.
 *
 * Reads from lib/work.ts. Defaults to the three image-bearing projects, since
 * each step needs a preview to scroll through. Tall by design: the section
 * needs roughly (steps × ~80vh) of scroll room to demonstrate the pin.
 */

export type StickyStep = {
  /** small caps eyebrow, e.g. "CASE — EMBARK PET SERVICES" */
  kicker: string;
  /** serif display headline for the step */
  heading: string;
  /** supporting paragraph */
  body: string;
  /** the image shown alongside this step */
  image: string;
  /** alt text for the image */
  alt: string;
};

function toStep(p: Project): StickyStep {
  return {
    kicker: `CASE — ${p.name}`,
    heading: p.tagline,
    body: p.blurb,
    image: p.image!,
    alt: `${p.name} — ${p.blurb}`,
  };
}

const defaultSteps: StickyStep[] = projects
  .filter((p) => p.image)
  .slice(0, 3)
  .map(toStep);

export function StickySplit({
  eyebrow = "06 · Sticky Split-Scroll",
  note = "text pins while images scroll",
  steps = defaultSteps,
}: {
  eyebrow?: string;
  note?: string;
  steps?: StickyStep[];
}) {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const els = stepRefs.current.filter((el): el is HTMLDivElement => el !== null);
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const i = Number((entry.target as HTMLElement).dataset.index);
            if (!Number.isNaN(i)) setActive(i);
          }
        }
      },
      // Fire when a step crosses the vertical centre of the viewport.
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [steps.length]);

  const current = steps[active] ?? steps[0];

  return (
    <section
      aria-label="Sticky split scroll"
      className="flex w-full flex-col gap-[18px] border-t border-line pt-9 pb-14"
    >
      {/* header row */}
      <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
        <StarMark className="text-xs" />
        <span className="font-sans text-[13px] font-semibold uppercase tracking-[0.12em] text-ink">
          {eyebrow}
        </span>
        <span className="font-sans text-[13px] text-faint">— {note}</span>
      </div>

      {/* split: sticky text column + scrolling image column */}
      <div className="flex w-full flex-col gap-12 md:flex-row md:items-start">
        {/* sticky text column (~45%) */}
        <div className="md:basis-0 md:grow-[0.82]">
          <div className="flex min-h-[60vh] flex-col justify-center md:sticky md:top-0 md:h-screen">
            <p
              key={`k-${active}`}
              className="font-sans text-xs font-semibold uppercase tracking-[0.12em] text-faint motion-safe:animate-fade-in"
            >
              {current.kicker}
            </p>

            <h2
              key={`h-${active}`}
              className="mt-[18px] font-serif font-normal tracking-[-0.02em] text-ink motion-safe:animate-fade-in"
              style={{ fontSize: "clamp(34px, 3.6vw, 46px)", lineHeight: 1.04 }}
            >
              {current.heading}
            </h2>

            <p
              key={`b-${active}`}
              className="mt-5 max-w-[380px] text-base leading-[1.625] text-muted motion-safe:animate-fade-in"
            >
              {current.body}
            </p>

            {/* step indicator */}
            <ol
              aria-hidden
              className="mt-[30px] flex items-center gap-3.5"
            >
              {steps.map((_, i) => (
                <li key={i} className="flex items-center gap-3.5">
                  <span
                    className="font-serif text-[22px] font-light leading-7 transition-colors duration-300"
                    style={{ color: i === active ? "#141414" : "#C9C2B4" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {i < steps.length - 1 && (
                    <span
                      className="h-px w-[60px] transition-colors duration-300"
                      style={{
                        backgroundColor: i < active ? "#141414" : "#C9C2B4",
                      }}
                    />
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* scrolling image column (~55%) */}
        <div className="flex flex-col gap-4 md:basis-0 md:grow-[1.18]">
          {steps.map((step, i) => (
            <div
              key={`${step.image}-${i}`}
              ref={(el) => {
                stepRefs.current[i] = el;
              }}
              data-index={i}
              aria-current={i === active ? "true" : undefined}
              className="relative aspect-[774/360] w-full overflow-hidden rounded-xl bg-board"
            >
              <Image
                src={step.image}
                alt={step.alt}
                fill
                sizes="(max-width: 768px) 100vw, 55vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
