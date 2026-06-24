"use client";

import { useEffect, useRef, useState } from "react";
import { StarMark } from "@/components/primitives/StarMark";
import { projects, type Project } from "@/lib/work";

/**
 * "Departures" — a split-flap board listing selected work, the way an
 * airport board lists flights. Each letter sits on its own flap tile and
 * cycles through a few characters before settling on its final glyph
 * when the board scrolls into view.
 *
 * Reads from lib/work.ts. The flip is motion-safe only: with
 * prefers-reduced-motion set, every tile shows its final character
 * immediately and nothing animates. The full row label is exposed to
 * screen readers as plain text; the cycling tiles are aria-hidden.
 */

type Row = {
  /** name shown in flaps (uppercased, A–Z) */
  label: string;
  /** screen-reader / status line, e.g. "LIVE — 6 BRANDS" */
  status: string;
  live: boolean;
};

const FLAP_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function statusFor(p: Project): string {
  const state = (p.status ?? "shipped").toUpperCase();
  if (p.status === "live") {
    // a short, board-style descriptor pulled from the work
    const tail = p.vertical.split(/[·,]/)[0]!.trim().toUpperCase();
    return `${state} — ${tail}`;
  }
  return `${state} — ${p.year ?? ""}`.trim().replace(/—\s*$/, "").trim();
}

function toRows(items: Project[]): Row[] {
  return items.map((p) => ({
    label: p.name.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 9),
    status: statusFor(p),
    live: p.status === "live",
  }));
}

export function SplitFlap({
  items = projects.slice(0, 3),
  heading = "DEPARTURES — SELECTED WORK",
}: {
  items?: Project[];
  heading?: string;
}) {
  const rows = toRows(items);

  return (
    <section
      className="flex w-full flex-col gap-[18px] border-t border-line pb-14 pt-9"
      aria-label="Selected work — departures board"
    >
      {/* keyframes kept local so this module stays self-contained */}
      <style>{
        "@keyframes splitflap-flip{0%{transform:rotateX(-90deg);opacity:0}100%{transform:rotateX(0);opacity:1}}"
      }</style>

      {/* eyebrow */}
      <div className="flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.2em] text-faint">
        <StarMark className="text-sm" />
        <span>11 · Split-Flap Board</span>
        <span className="text-faint/70">— names flip into place on load</span>
      </div>

      {/* the board */}
      <div className="flex w-full flex-col gap-4 rounded-2xl bg-board px-11 py-10">
        {/* column headers */}
        <div className="flex items-center justify-between border-b border-[#2C271F] pb-[18px]">
          <span className="font-mono text-xs font-medium uppercase leading-4 tracking-[0.2em] text-[#8A7E6E]">
            {heading}
          </span>
          <span className="font-mono text-xs font-medium uppercase leading-4 tracking-[0.2em] text-[#8A7E6E]">
            Status
          </span>
        </div>

        {rows.map((row, i) => (
          <FlapRow key={i} row={row} delay={i * 220} />
        ))}
      </div>
    </section>
  );
}

function FlapRow({ row, delay }: { row: Row; delay: number }) {
  const chars = row.label.split("");

  return (
    <div
      className="flex w-full items-center justify-between"
      aria-label={`${row.label} — ${row.status}`}
    >
      {/* flap tiles — decorative; the row label is on the row's aria-label */}
      <div className="flex gap-[5px]" aria-hidden>
        {chars.map((c, i) => (
          <Flap key={i} target={c} delay={delay + i * 90} />
        ))}
      </div>

      {/* status */}
      <div className="flex items-center gap-[9px]" aria-hidden>
        <span
          className="size-[7px] shrink-0 rounded-full"
          style={{ backgroundColor: row.live ? "#3FA56A" : "#D6A12F" }}
        />
        <span className="font-mono text-[15px] font-medium uppercase leading-[18px] tracking-[0.14em] text-[#EDE4D2]">
          {row.status}
        </span>
      </div>
    </div>
  );
}

/**
 * A single flap tile. On mount (and only when motion is allowed) it cycles
 * through a handful of random letters, then locks onto `target`. The tile
 * has the classic horizontal seam: lighter top half, dark divider, slightly
 * darker bottom half.
 */
function Flap({ target, delay }: { target: string; delay: number }) {
  const [shown, setShown] = useState(target);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (reduce || target === " ") {
      setShown(target);
      return;
    }

    // pre-roll: show a couple of random glyphs, then settle on target.
    const steps = 4;
    for (let s = 0; s < steps; s++) {
      const t = setTimeout(() => {
        const rand = FLAP_CHARS[Math.floor(Math.random() * FLAP_CHARS.length)]!;
        setShown(s === steps - 1 ? target : rand);
      }, delay + s * 75);
      timers.current.push(t);
    }

    const ref = timers.current;
    return () => {
      ref.forEach(clearTimeout);
      ref.length = 0;
    };
  }, [target, delay]);

  return (
    <span
      className="flex h-14 w-[42px] shrink-0 items-center justify-center overflow-hidden rounded"
      style={{
        backgroundImage:
          "linear-gradient(180deg, #2B271F 0%, #2B271F 49%, #131009 49%, #131009 51%, #28241D 51%, #28241D 100%)",
      }}
    >
      <span
        key={shown}
        className="font-mono text-[28px] font-medium leading-[34px] text-[#EDE4D2] motion-safe:[animation:splitflap-flip_75ms_ease-out]"
      >
        {shown}
      </span>
    </span>
  );
}
