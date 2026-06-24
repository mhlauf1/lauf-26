"use client";

import Image from "next/image";
import { useState } from "react";
import { StarMark } from "@/components/primitives/StarMark";
import { projects, type Project } from "@/lib/work";

/**
 * "A closer look" — a tabbed case viewer. Pick a client, the preview
 * cross-fades to that project's cover. Tabs are a proper ARIA tablist
 * (arrow-key navigable); the cross-fade is motion-safe only.
 *
 * Reads from lib/work.ts. Defaults to projects that have a cover image,
 * since each tab needs a preview to show.
 */
export function TabbedViewer({
  items = projects.filter((p) => p.image),
}: {
  items?: Project[];
}) {
  const [active, setActive] = useState(0);
  const current = items[active];

  return (
    <div className="flex w-full flex-col">
      {/* header: title on the left, tabs on the right */}
      <div className="mb-[34px] flex flex-wrap items-end justify-between gap-y-6">
        <div className="flex flex-col gap-3.5">
          <span className="flex items-center gap-2">
            <StarMark className="text-sm" />
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-faint">
              In detail
            </span>
          </span>
          <h2
            className="font-serif font-light leading-[1.05] tracking-[-0.02em] text-ink"
            style={{ fontSize: "clamp(38px, 4.4vw, 52px)" }}
          >
            A closer look.
          </h2>
        </div>

        <div role="tablist" aria-label="Case studies" className="flex flex-wrap items-center gap-2.5">
          {items.map((p, i) => {
            const selected = i === active;
            return (
              <button
                key={p.slug}
                role="tab"
                type="button"
                aria-selected={selected}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                    e.preventDefault();
                    const dir = e.key === "ArrowRight" ? 1 : -1;
                    setActive((a) => (a + dir + items.length) % items.length);
                  }
                }}
                className={`rounded-full px-[18px] py-2.5 text-sm font-medium transition-colors ${
                  selected
                    ? "bg-ink text-paper"
                    : "border border-[#e0dace] text-muted hover:text-ink"
                }`}
              >
                {p.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* preview panel */}
      <div className="relative h-[clamp(420px,42vw,580px)] w-full overflow-hidden rounded-[14px] bg-board">
        <div key={current.slug} className="absolute inset-0 motion-safe:animate-fade-in">
          <Image
            src={current.image!}
            alt={`${current.name} — ${current.blurb}`}
            fill
            sizes="(max-width: 1024px) 100vw, 1360px"
            className="object-cover"
          />

          {/* gradient + overlay content */}
          <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-y-5 bg-gradient-to-b from-transparent to-board/[0.86] px-9 py-[34px]">
            <div className="flex max-w-[610px] flex-col gap-3">
              <span
                className="font-sans text-xs font-semibold uppercase tracking-[0.12em]"
                style={{ color: current.accent }}
              >
                {current.vertical} — {current.year}
              </span>
              <p className="font-serif text-[clamp(26px,3vw,34px)] font-light leading-[1.06] tracking-[-0.01em] text-white">
                {current.name} — {current.tagline}
              </p>
              <p className="text-[15px] text-white/70">{current.services}</p>
            </div>

            <a
              href={`/work/${current.slug}`}
              className="flex shrink-0 items-center gap-2 rounded-full border border-white/25 bg-white/[0.12] px-[22px] py-3.5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              View case <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
