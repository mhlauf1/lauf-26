"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { StarMark } from "@/components/primitives/StarMark";
import type { Testimonial } from "@/lib/work";

const AUTOPLAY_MS = 7000;

/**
 * Sleek testimonial carousel for the flagship band's right panel. Slides are
 * stacked in one grid cell (so the panel sizes to the tallest quote — no
 * layout jump) and crossfade between them. Auto-advances, pauses on hover/
 * focus, and respects prefers-reduced-motion (no autoplay, instant swaps).
 */
export function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = usePrefersReducedMotion();
  const count = items.length;

  const go = useCallback(
    (next: number) => setActive((next + count) % count),
    [count],
  );

  useEffect(() => {
    if (paused || reduced || count < 2) return;
    const id = setTimeout(() => go(active + 1), AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [active, paused, reduced, count, go]);

  return (
    <div
      className="relative flex flex-col gap-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Client testimonials"
    >
      {/* rust star accent — constant across slides, sets the editorial tone */}
      <StarMark className="text-[48px]" />

      {/* stacked slides — all share one grid cell so height = tallest quote */}
      <div className="grid">
        {items.map((t, i) => (
          <figure
            key={t.name}
            aria-hidden={i !== active}
            className={`col-start-1 row-start-1 flex  flex-col gap-7 transition-opacity duration-500 ${
              i === active ? "opacity-100" : "pointer-events-none opacity-0"
            } ${reduced ? "transition-none" : ""}`}
          >
            <blockquote className="font-serif text-[clamp(22px,2.1vw,30px)] font-light leading-[1.34] tracking-[-0.01em] text-[#f3ede2]">
              {t.quote}
            </blockquote>

            <figcaption className="font-sans text-[15px] font-medium leading-[18px] text-faint">
              {"— "}
              {t.name} &middot; {t.role}
            </figcaption>
          </figure>
        ))}
      </div>

      {/* controls — dots + index, only when there's more than one */}
      {count > 1 && (
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2.5">
            {items.map((t, i) => (
              <button
                key={t.name}
                type="button"
                onClick={() => go(i)}
                aria-label={`Show testimonial ${i + 1} of ${count}`}
                aria-current={i === active}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === active
                    ? "w-6 bg-[#f7f3ea]"
                    : "w-1.5 bg-white/25 hover:bg-white/45"
                }`}
              />
            ))}
          </div>

          <span className="font-sans text-[12px] font-medium tabular-nums tracking-[0.08em] text-[#8a7e6e]">
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(count).padStart(2, "0")}
          </span>
        </div>
      )}
    </div>
  );
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  const mql = useRef<MediaQueryList | null>(null);

  useEffect(() => {
    mql.current = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mql.current!.matches);
    update();
    mql.current.addEventListener("change", update);
    return () => mql.current?.removeEventListener("change", update);
  }, []);

  return reduced;
}
