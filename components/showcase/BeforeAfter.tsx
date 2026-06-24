"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";

type Props = {
  afterSrc: string;
  afterAlt?: string;
  beforeLabel?: string;
  afterLabel?: string;
  /** initial reveal position, 0–100 */
  start?: number;
};

/**
 * Drag-to-reveal before/after. "Before" is a wireframe skeleton of the
 * old site; "after" is the real rebuild. Pointer-driven, keyboard-accessible.
 */
export function BeforeAfter({
  afterSrc,
  afterAlt = "",
  beforeLabel = "BEFORE",
  afterLabel = "AFTER — BY LAUF",
  start = 45,
}: Props) {
  const [pct, setPct] = useState(start);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromX = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPct(Math.min(100, Math.max(0, next)));
  }, []);

  return (
    <div
      ref={ref}
      className="relative w-full select-none overflow-hidden rounded-2xl bg-board"
      style={{ height: "clamp(360px, 46vw, 600px)" }}
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        setFromX(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && setFromX(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
    >
      {/* AFTER — the real rebuild */}
      <Image
        src={afterSrc}
        alt={afterAlt}
        fill
        sizes="(max-width: 1024px) 100vw, 1360px"
        className="object-cover"
        style={{ objectPosition: "center 30%" }}
      />

      {/* BEFORE — wireframe skeleton of the old site, clipped to the left */}
      <div
        className="absolute inset-0 bg-[#e9e5dc]"
        style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
      >
        <div className="flex h-full flex-col gap-3.5 p-8">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-[#c9c2b4]" />
            <div className="h-[11px] w-[90px] rounded bg-[#c9c2b4]" />
          </div>
          <div className="mt-4 h-[30px] w-[70%] rounded-md bg-[#cfc8ba]" />
          <div className="h-[30px] w-[52%] rounded-md bg-[#cfc8ba]" />
          <div className="mt-2 h-[14px] w-[38%] rounded bg-[#d7d1c4]" />
          <div className="mt-5 flex gap-3">
            <div className="h-24 w-[150px] rounded-md bg-[#d7d1c4]" />
            <div className="h-24 w-[150px] rounded-md bg-[#d7d1c4]" />
          </div>
        </div>
      </div>

      {/* labels */}
      <span className="absolute left-6 top-6 rounded-full bg-ink/80 px-3.5 py-[7px] text-[11px] font-semibold tracking-[0.1em] text-white">
        {beforeLabel}
      </span>
      <span className="absolute right-6 top-6 rounded-full border border-white/30 bg-white/15 px-3.5 py-[7px] text-[11px] font-semibold tracking-[0.1em] text-white">
        {afterLabel}
      </span>

      {/* handle */}
      <div
        className="pointer-events-none absolute inset-y-0 w-0.5 bg-paper"
        style={{ left: `${pct}%` }}
      />
      <button
        type="button"
        aria-label="Drag to compare before and after"
        className="absolute top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-paper text-ink shadow-lg"
        style={{ left: `${pct}%` }}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setPct((p) => Math.max(0, p - 4));
          if (e.key === "ArrowRight") setPct((p) => Math.min(100, p + 4));
        }}
      >
        <span className="text-[15px] font-semibold">⇄</span>
      </button>
    </div>
  );
}
