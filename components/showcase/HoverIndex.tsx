"use client";

import Image from "next/image";
import { useState } from "react";
import { StarMark } from "@/components/primitives/StarMark";
import { projects, type Project } from "@/lib/work";

/**
 * "F02 Index" — a hover-reveal project index. A vertical list of rows
 * (name on the left, vertical · year on the right). Hovering or focusing a
 * row lifts it onto a warm ground and floats that project's cover preview
 * beside the name.
 *
 * Reads from lib/work.ts. Projects without a cover image use a tinted block
 * built from their accent (color lives in the work).
 *
 * Interaction: the preview only animates/reveals on hover-capable, non
 * reduced-motion devices. On touch / no-hover and `prefers-reduced-motion`,
 * every row shows its preview inline and statically (no transition).
 */
export function HoverIndex({
  items = projects,
  label = "02 · Index — Hover to reveal",
}: {
  items?: Project[];
  label?: string;
}) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="flex w-full flex-col" aria-label="Project index">
      {/* eyebrow */}
      <span className="mb-1 flex items-center gap-3 pb-5">
        <StarMark className="text-[18px]" />
        <span className="font-sans text-[13px] font-semibold uppercase tracking-[0.12em] text-ink">
          {label}
        </span>
      </span>

      <ul className="flex w-full flex-col">
        {items.map((project, i) => {
          const open = active === i;
          return (
            <li key={project.slug}>
              <a
                href={`/work/${project.slug}`}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive((a) => (a === i ? null : a))}
                onFocus={() => setActive(i)}
                onBlur={() => setActive((a) => (a === i ? null : a))}
                className={`group flex items-center justify-between gap-6 border-t px-1.5 py-[22px] no-underline outline-none transition-colors duration-300 motion-reduce:transition-none ${
                  open
                    ? "border-t-ink bg-cream/40"
                    : "border-t-line bg-transparent"
                } focus-visible:border-t-ink focus-visible:bg-cream/40`}
              >
                {/* left: star + name */}
                <span className="flex min-w-0 items-center gap-[18px]">
                  <StarMark
                    className={`text-[22px] transition-opacity duration-300 motion-reduce:transition-none motion-reduce:opacity-100 ${
                      open ? "opacity-100" : "opacity-0"
                    } group-focus-visible:opacity-100`}
                  />
                  <span
                    className={`truncate font-serif font-light leading-[1.1] tracking-[-0.01em] transition-colors duration-300 motion-reduce:transition-none ${
                      open ? "text-ink" : "text-faint"
                    } group-focus-visible:text-ink`}
                    style={{ fontSize: "clamp(30px, 3.4vw, 44px)" }}
                  >
                    {project.name}
                  </span>
                </span>

                {/* right: floating preview (hover/focus) + meta */}
                <span className="flex shrink-0 items-center gap-[22px]">
                  <span
                    aria-hidden
                    className={`relative hidden h-[140px] w-[230px] overflow-hidden rounded-lg transition-[opacity,transform] duration-300 ease-out motion-reduce:!opacity-100 motion-reduce:!translate-y-0 motion-reduce:transition-none sm:block [@media(hover:none)]:!translate-y-0 [@media(hover:none)]:!opacity-100 [@media(hover:none)]:transition-none ${
                      open
                        ? "opacity-100 translate-y-0"
                        : "translate-y-1 opacity-0"
                    } group-focus-visible:!opacity-100 group-focus-visible:!translate-y-0`}
                  >
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt=""
                        fill
                        sizes="230px"
                        className="object-cover"
                      />
                    ) : (
                      <span
                        className="flex h-full w-full items-center justify-center font-serif text-2xl font-light italic text-white/90"
                        style={{ backgroundColor: project.accent }}
                      >
                        {project.name}
                      </span>
                    )}
                  </span>

                  <span className="flex items-center gap-[22px]">
                    <span
                      className={`whitespace-nowrap font-sans text-[13px] font-medium uppercase tracking-[0.06em] transition-colors duration-300 motion-reduce:transition-none ${
                        open ? "text-muted" : "text-faint"
                      } group-focus-visible:text-muted`}
                    >
                      {project.vertical} · {project.year ?? "—"}
                    </span>
                    <span
                      aria-hidden
                      className={`text-[22px] leading-none text-ink transition-opacity duration-300 motion-reduce:transition-none motion-reduce:opacity-100 ${
                        open ? "opacity-100" : "opacity-0"
                      } group-focus-visible:opacity-100`}
                    >
                      ↗
                    </span>
                  </span>
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
