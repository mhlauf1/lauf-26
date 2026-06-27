"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fires once an element scrolls into view, then stays true (reveals don't
 * re-hide on scroll-up). Mirrors the IntersectionObserver pattern already used
 * in components/primitives/InViewVideo.tsx and showcase/StickySplit.tsx.
 *
 * The bottom-trimmed rootMargin lets a reveal start just before the element is
 * fully on screen, so it reads as "already settling" rather than popping in.
 */
export function useInView<T extends HTMLElement = HTMLElement>(
  rootMargin = "0px 0px -12% 0px",
  threshold = 0.15,
) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // No IntersectionObserver (or SSR edge) — reveal immediately.
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return { ref, inView };
}
