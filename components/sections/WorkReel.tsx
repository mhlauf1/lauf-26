"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { reel, type ReelShot } from "@/lib/work";

/**
 * Work reel — a continuous right-to-left loop of work photos, edge to edge.
 * No eyebrows, no taglines, no credits: just good imagery, like a filmstrip.
 *
 * JS-driven (we advance scrollLeft each frame and wrap by one track width for
 * a seamless loop). Hovering never stops it; you can grab and drag the strip
 * left or right, and a flick carries momentum that eases back into the drift.
 * Reduced-motion: the auto-drift is off, so it's just a draggable scroller.
 * Cards keep each photo's aspect ratio at a shared height, so widths vary
 * for a natural editorial rhythm.
 */

const CARD_H = 460; // px — shared height; width derives from each photo's ratio
const LOOP_SECONDS = 80; // time to traverse one track (matches the old marquee)

function Track({
  shots,
  ariaHidden = false,
}: {
  shots: ReelShot[];
  ariaHidden?: boolean;
}) {
  return (
    <ul
      className="flex shrink-0 items-stretch gap-5 pr-5"
      aria-hidden={ariaHidden}
      role={ariaHidden ? "presentation" : "list"}
    >
      {shots.map((shot, i) => {
        const width = Math.round(CARD_H * (shot.w / shot.h));
        return (
          <li
            key={`${shot.src}-${i}`}
            className="relative shrink-0 overflow-hidden  bg-cream"
            style={{ height: CARD_H, width }}
          >
            {shot.video ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                aria-label={shot.alt}
                className="pointer-events-none absolute inset-0 h-full w-full object-cover"
              >
                <source src={shot.src} type="video/mp4" />
              </video>
            ) : (
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                draggable={false}
                sizes={`${width}px`}
                className="pointer-events-none object-cover"
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}

export function WorkReel({ shots = reel }: { shots?: ReelShot[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    const inner = innerRef.current;
    if (!scroller || !inner) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // One track's width = half the duplicated content (two identical tracks).
    const trackWidth = () => inner.scrollWidth / 2;

    // Keep scrollLeft within [0, trackWidth) so the loop is seamless.
    const wrap = () => {
      const w = trackWidth();
      if (w <= 0) return;
      if (scroller.scrollLeft >= w) scroller.scrollLeft -= w;
      else if (scroller.scrollLeft < 0) scroller.scrollLeft += w;
    };

    let raf = 0;
    let last = 0;
    let velocity = 0; // px/sec of scrollLeft; eases toward the auto drift
    let dragging = false;
    let startX = 0;
    let startScroll = 0;
    let lastMoveX = 0;
    let lastMoveT = 0;

    const tick = (t: number) => {
      if (!last) last = t;
      const dt = Math.min((t - last) / 1000, 0.05); // clamp big gaps (tab switch)
      last = t;

      if (!dragging) {
        const auto = reduce ? 0 : trackWidth() / LOOP_SECONDS;
        // Ease the live velocity toward the steady drift (~0.4s settle).
        velocity += (auto - velocity) * Math.min(1, dt * 2.5);
        scroller.scrollLeft += velocity * dt;
        wrap();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onDown = (e: PointerEvent) => {
      dragging = true;
      velocity = 0;
      startX = e.clientX;
      startScroll = scroller.scrollLeft;
      lastMoveX = e.clientX;
      lastMoveT = e.timeStamp;
      scroller.setPointerCapture?.(e.pointerId);
      scroller.style.cursor = "grabbing";
    };

    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      e.preventDefault();
      scroller.scrollLeft = startScroll - (e.clientX - startX);
      wrap();
      const mdt = (e.timeStamp - lastMoveT) / 1000;
      if (mdt > 0) velocity = -(e.clientX - lastMoveX) / mdt; // carried as momentum
      lastMoveX = e.clientX;
      lastMoveT = e.timeStamp;
    };

    const onUp = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      scroller.releasePointerCapture?.(e.pointerId);
      scroller.style.cursor = "grab";
    };

    scroller.addEventListener("pointerdown", onDown);
    scroller.addEventListener("pointermove", onMove);
    scroller.addEventListener("pointerup", onUp);
    scroller.addEventListener("pointercancel", onUp);

    return () => {
      cancelAnimationFrame(raf);
      scroller.removeEventListener("pointerdown", onDown);
      scroller.removeEventListener("pointermove", onMove);
      scroller.removeEventListener("pointerup", onUp);
      scroller.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <section aria-label="Selected work" className="w-full">
      <div
        ref={scrollerRef}
        className="w-full cursor-grab select-none overflow-x-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ touchAction: "pan-y" }}
      >
        <div ref={innerRef} className="flex w-max">
          <Track shots={shots} />
          <Track shots={shots} ariaHidden />
        </div>
      </div>
    </section>
  );
}
