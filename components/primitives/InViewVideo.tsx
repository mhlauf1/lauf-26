"use client";

import { useEffect, useRef } from "react";

/**
 * A muted, looping video that begins playing only once it scrolls into view
 * and pauses again when it leaves. Used for overlay mockups in the work grid
 * so off-screen cards don't autoplay. Falls back to playing immediately if
 * IntersectionObserver is unavailable.
 */
export function InViewVideo({
  src,
  className,
  ariaLabel,
}: {
  src: string;
  className?: string;
  ariaLabel?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!("IntersectionObserver" in window)) {
      el.play().catch(() => {});
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      loop
      muted
      playsInline
      preload="metadata"
      aria-label={ariaLabel}
      className={className}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
