import Image from "next/image";
import { StarMark } from "@/components/primitives/StarMark";
import { projects, type Project } from "@/lib/work";

/**
 * "F03 Bento" — an asymmetric bento collage of mixed-size tiles:
 * one tall image, two stacked text/stat blocks, a secondary image,
 * and a signature card. Reproduces the Paper grid arrangement using
 * CSS grid (col-span / row-span) so it stays a true collage on wide
 * viewports and stacks gracefully on narrow ones.
 *
 * Reads from lib/work.ts. The big tile + secondary image come from
 * projects that ship a cover; the cream + board tiles are imageless
 * tinted blocks carrying a Fraunces-italic line.
 */
function bySlug(slug: string, fallback: number): Project {
  return projects.find((p) => p.slug === slug) ?? projects[fallback];
}

export function Bento({
  big = bySlug("embark", 0),
  side = bySlug("playbook", 3),
  feature = bySlug("the-body-biz", 2),
}: {
  /** large hero tile (needs a cover image) */
  big?: Project;
  /** secondary image tile (needs a cover image) */
  side?: Project;
  /** project supplying the cream "tagline" + board "stat" tiles */
  feature?: Project;
}) {
  return (
    <section
      aria-label="Selected work — bento collage"
      className="flex w-full flex-col gap-[18px] border-t border-line pt-9 pb-14"
    >
      {/* eyebrow */}
      <div className="flex items-center gap-2">
        <StarMark className="text-sm" />
        <span className="font-sans text-[13px] font-semibold uppercase leading-4 tracking-[0.12em] text-ink">
          03 · Bento Collage
        </span>
      </div>

      {/* collage: 12-col / 6-row grid on md+, single column below */}
      <div className="grid w-full auto-rows-[80px] grid-cols-1 gap-4 md:h-[480px] md:auto-rows-auto md:grid-cols-12 md:grid-rows-6">
        {/* BIG — tall image, left, spans full height */}
        <figure className="relative col-span-1 row-span-3 overflow-hidden rounded-[14px] bg-board md:col-span-5 md:row-span-6">
          <Image
            src={big.image!}
            alt={`${big.name} — ${big.blurb}`}
            fill
            sizes="(max-width: 768px) 100vw, 44vw"
            className="object-cover"
          />
          <figcaption className="absolute bottom-5 left-[22px] font-sans text-xs font-semibold uppercase leading-4 tracking-[0.1em] text-white">
            {big.name} — {big.vertical}
          </figcaption>
        </figure>

        {/* CREAM — Fraunces-italic tagline block (top middle) */}
        <article className="col-span-1 row-span-2 flex flex-col justify-center gap-2.5 rounded-[14px] bg-cream p-[26px] md:col-span-4 md:row-span-3">
          <p className="font-italic text-[30px] italic leading-9 text-[#1f2418]">
            {feature.tagline}
          </p>
          <p className="font-sans text-[13px] font-medium leading-4 text-muted">
            {feature.name} · {feature.services}
          </p>
        </article>

        {/* SECONDARY image (top right) */}
        <figure className="relative col-span-1 row-span-2 overflow-hidden rounded-[14px] bg-board md:col-span-3 md:row-span-4">
          <Image
            src={side.image!}
            alt={`${side.name} — ${side.blurb}`}
            fill
            sizes="(max-width: 768px) 100vw, 26vw"
            className="object-cover"
          />
        </figure>

        {/* BOARD — stat block (bottom middle) */}
        <article className="col-span-1 row-span-2 flex flex-col justify-center rounded-[14px] bg-board p-[26px] md:col-span-4 md:row-span-3">
          <p className="font-serif text-[54px] font-light leading-[54px] text-[#f7f3ea]">
            3× faster
          </p>
          <p className="mt-1.5 font-sans text-sm leading-[18px] text-faint">
            checkout after the Stripe rebuild
          </p>
        </article>

        {/* SIGNATURE card (bottom right) */}
        <article className="col-span-1 row-span-2 flex flex-col items-center justify-center gap-1.5 rounded-[14px] border border-line bg-paper md:col-span-3 md:row-span-2">
          <StarMark className="text-[40px] leading-10" />
          <span className="font-serif text-[22px] font-light leading-7 text-ink">
            Lauf
          </span>
        </article>
      </div>
    </section>
  );
}
