import Image from "next/image";
import { StarMark } from "@/components/primitives/StarMark";
import { bySlug, type Project } from "@/lib/work";

/**
 * "F09 Scatter" — a polaroid sticker-scatter pinboard.
 *
 * Project covers styled as polaroids (white border, italic Newsreader
 * caption, slight rotation), scattered and overlapping at varied angles
 * across a warm cream board. Two accent note-cards and a rust star tile
 * punctuate the empty quadrant.
 *
 * Layout is faithful to the Paper node: items are absolutely positioned
 * inside a fixed 1360×600 design canvas (transform-origin top-left), and
 * the whole canvas scales to width:100% via aspect-ratio. Reads project
 * data from lib/work.ts.
 *
 * Optional: a gentle motion-safe straighten-on-hover (rotate → 0) that
 * lifts the hovered polaroid above its neighbours.
 */

/** Design canvas the Paper coordinates were authored against. */
const CANVAS_W = 1360;
const CANVAS_H = 600;

type Polaroid = {
  project: Project;
  /** image box, in canvas px */
  imgW: number;
  imgH: number;
  /** top-left of the card, in canvas px */
  top: number;
  left: number;
  rotate: number;
};

type NoteCard = {
  quote: string;
  attribution: string;
  /** card background + matching translucent shadow */
  bg: string;
  shadow: string;
  /** attribution label colour */
  label: string;
  width: number;
  top: number;
  left: number;
  rotate: number;
};

/** Polaroids — covers from lib/work.ts, positions/rotations from Paper. */
const POLAROIDS: Polaroid[] = [
  { project: bySlug("embark")!, imgW: 240, imgH: 200, top: 54, left: 70, rotate: -5 },
  { project: bySlug("the-body-biz")!, imgW: 210, imgH: 250, top: 118, left: 372, rotate: 3.5 },
  { project: bySlug("playbook")!, imgW: 230, imgH: 170, top: 300, left: 150, rotate: 4 },
  { project: bySlug("the-body-biz")!, imgW: 250, imgH: 165, top: 300, left: 560, rotate: -7 },
];

const NOTES: NoteCard[] = [
  {
    quote: "Made to be remembered.",
    attribution: "— Every build",
    bg: "#E04C8A",
    shadow: "#E04C8A38",
    label: "#FBE3EE",
    width: 300,
    top: 80,
    left: 680,
    rotate: -4,
  },
  {
    quote: "One platform, six brands.",
    attribution: "— Embark",
    bg: "#2F6BD6",
    shadow: "#2F6BD638",
    label: "#CFE0FA",
    width: 250,
    top: 120,
    left: 1040,
    rotate: 5,
  },
];

/** px on the design canvas → % of the canvas, so the whole thing scales. */
const pctX = (px: number) => `${(px / CANVAS_W) * 100}%`;
const pctY = (px: number) => `${(px / CANVAS_H) * 100}%`;

export function PolaroidScatter({
  polaroids = POLAROIDS,
  notes = NOTES,
  /** gentle motion-safe straighten + lift on hover */
  straightenOnHover = true,
}: {
  polaroids?: Polaroid[];
  notes?: NoteCard[];
  straightenOnHover?: boolean;
}) {
  return (
    <section
      aria-label="Selected work, pinned"
      className="relative w-full overflow-hidden rounded-2xl bg-cream"
      style={{ aspectRatio: `${CANVAS_W} / ${CANVAS_H}` }}
    >
      {/* photo polaroids */}
      {polaroids.map((p, i) => {
        const { project: proj } = p;
        return (
          <figure
            key={`${proj.slug}-${i}`}
            className={`group absolute z-10 origin-top-left rounded-[3px] bg-white px-3 pb-[34px] pt-3 shadow-[0_18px_36px_#14141429] ${
              straightenOnHover
                ? "transition-transform duration-500 ease-out hover:z-30 motion-safe:hover:[transform:rotate(0deg)_translateY(-6px)]"
                : ""
            }`}
            style={{
              top: pctY(p.top),
              left: pctX(p.left),
              width: pctX(p.imgW + 24),
              rotate: `${p.rotate}deg`,
            }}
          >
            <div
              className="relative overflow-hidden rounded-[1px]"
              style={{ aspectRatio: `${p.imgW} / ${p.imgH}` }}
            >
              {proj.image ? (
                <Image
                  src={proj.image}
                  alt={`${proj.name} — ${proj.blurb}`}
                  fill
                  sizes="(max-width: 1024px) 28vw, 260px"
                  className="object-cover"
                />
              ) : (
                <div
                  className="h-full w-full"
                  style={{ backgroundColor: proj.accent }}
                  aria-hidden
                />
              )}
            </div>
            <figcaption className="mt-2.5 whitespace-nowrap font-italic text-base font-light italic text-muted">
              {proj.name}
            </figcaption>
          </figure>
        );
      })}

      {/* accent note-cards */}
      {notes.map((n, i) => (
        <div
          key={`note-${i}`}
          className={`absolute z-20 flex origin-top-left flex-col gap-2 rounded-[14px] p-[26px] ${
            straightenOnHover
              ? "transition-transform duration-500 ease-out hover:z-30 motion-safe:hover:[transform:rotate(0deg)_translateY(-6px)]"
              : ""
          }`}
          style={{
            top: pctY(n.top),
            left: pctX(n.left),
            width: pctX(n.width),
            rotate: `${n.rotate}deg`,
            backgroundColor: n.bg,
            boxShadow: `0 18px 36px ${n.shadow}`,
          }}
        >
          <p className="font-serif text-[1.65vw] font-normal italic leading-[1.06] text-white [@media(min-width:1360px)]:text-[26px]">
            {n.quote}
          </p>
          <p
            className="font-sans text-[0.78vw] font-medium uppercase tracking-[0.08em] [@media(min-width:1360px)]:text-xs"
            style={{ color: n.label }}
          >
            {n.attribution}
          </p>
        </div>
      ))}

      {/* rust star tile — the one pop of brand colour */}
      <div
        className={`absolute z-20 flex origin-top-left items-center justify-center rounded-[18px] bg-board shadow-[0_18px_36px_#14141433] ${
          straightenOnHover
            ? "transition-transform duration-500 ease-out hover:z-30 motion-safe:hover:[transform:rotate(0deg)_translateY(-6px)]"
            : ""
        }`}
        style={{
          top: pctY(410),
          left: pctX(1110),
          width: pctX(150),
          aspectRatio: "1 / 1",
          rotate: "6deg",
        }}
        aria-hidden
      >
        <StarMark className="text-[5.6vw] [@media(min-width:1360px)]:text-[84px]" />
      </div>
    </section>
  );
}
