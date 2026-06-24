"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { StarMark } from "@/components/primitives/StarMark";
import { projects, type Project } from "@/lib/work";

/**
 * "F12 — Pinned Gallery". A pinned horizontal-scroll wall: the section
 * pins to the viewport and vertical scroll translates a row of project
 * panels sideways "through the wall". A live progress bar tracks the run.
 *
 * Panels with a cover image (embark, the-body-biz, playbook) show the
 * photo; the rest render as a tinted accent panel using their work.ts
 * accent. Reads from lib/work.ts.
 *
 * PLACEMENT: this must be placed FULL-BLEED (edge-to-edge). The pinned
 * track spans the whole viewport via `w-screen` with a `-ml-10` offset to
 * counter the /kit `px-10` KitItem wrapper. In a full-bleed slot drop the
 * offset by passing `bleed={false}`.
 *
 * MOTION: GSAP ScrollTrigger pins + translates only when motion is
 * allowed. Under prefers-reduced-motion it degrades to a plain
 * horizontally-scrollable, scroll-snapping row with no pinning. Lenis
 * drives the page scroll; standard ScrollTrigger reads the default
 * scroller, so the two cooperate without extra wiring.
 */
export function PinnedGallery({
  items = projects,
  label = "12 · Pinned horizontal scroll",
  hint = "— page scrolls sideways through the wall",
  bleed = true,
}: {
  items?: Project[];
  label?: string;
  hint?: string;
  /** offset the track left by 40px to escape the /kit px-10 wrapper */
  bleed?: boolean;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);

    if (mq.matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const getScrollDistance = () => track.scrollWidth - window.innerWidth;

      const tween = gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          // pin for as long as the horizontal track is wide
          end: () => `+=${getScrollDistance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (fillRef.current) {
              fillRef.current.style.width = `${self.progress * 100}%`;
            }
          },
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, [items.length]);

  const Header = (
    <div className="flex items-center gap-3 px-10">
      <StarMark className="text-sm" />
      <span className="font-sans text-[13px] font-semibold uppercase leading-4 tracking-[0.12em] text-ink">
        {label}
      </span>
      <span className="font-sans text-[13px] leading-4 text-faint">{hint}</span>
    </div>
  );

  const Panels = items.map((p) => (
    <article
      key={p.slug}
      className="relative h-[clamp(360px,52vh,440px)] w-[clamp(280px,72vw,560px)] shrink-0 overflow-hidden rounded-[14px]"
      style={p.image ? undefined : { backgroundColor: p.accent }}
    >
      {p.image ? (
        <Image
          src={p.image}
          alt={`${p.name} — ${p.blurb}`}
          fill
          sizes="(max-width: 768px) 72vw, 560px"
          className="object-cover"
        />
      ) : (
        <span className="absolute inset-0 grid place-items-center px-8 text-center font-serif text-[clamp(28px,3vw,34px)] font-light italic leading-[1.2] text-white">
          {p.name}
        </span>
      )}

      {p.image && (
        <h3 className="absolute bottom-[18px] left-[22px] font-serif text-[26px] font-light leading-8 text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]">
          {p.name}
        </h3>
      )}
    </article>
  ));

  // ── Reduced motion: plain scroll-snap row, no pin ──────────────────
  if (reduced) {
    return (
      <section
        aria-label="Project gallery"
        className="flex w-full flex-col gap-[18px] border-t border-line pb-14 pt-9"
      >
        {Header}
        <div
          className={`flex snap-x snap-mandatory gap-5 overflow-x-auto px-10 pb-2 [scrollbar-width:thin] ${
            bleed ? "-ml-10 w-screen" : "w-full"
          }`}
        >
          {items.map((p, i) => (
            <div key={p.slug} className="snap-start">
              {Panels[i]}
            </div>
          ))}
        </div>
      </section>
    );
  }

  // ── Pinned horizontal scroll ───────────────────────────────────────
  return (
    <section
      ref={sectionRef}
      aria-label="Project gallery"
      className="relative w-full overflow-clip border-t border-line"
    >
      <div className="flex h-screen flex-col justify-center gap-[18px] py-9">
        {Header}

        <div
          ref={trackRef}
          className={`flex gap-5 will-change-transform ${
            bleed ? "-ml-10 w-screen pl-10 pr-10" : "w-full px-10"
          }`}
        >
          {Panels}
        </div>

        {/* progress bar */}
        <div className="flex w-full items-center gap-4 px-10">
          <div className="h-[3px] flex-1 overflow-hidden rounded-sm bg-line">
            <div ref={fillRef} className="h-full w-0 bg-ink" />
          </div>
          <span className="font-sans text-xs font-medium uppercase leading-4 tracking-[0.1em] text-faint">
            Scroll <span aria-hidden>→</span>
          </span>
        </div>
      </div>
    </section>
  );
}
