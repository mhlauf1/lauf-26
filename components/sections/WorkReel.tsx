import Image from "next/image";
import { reel, type ReelShot } from "@/lib/work";

/**
 * Work reel — a continuous right-to-left loop of work photos, edge to edge.
 * No eyebrows, no taglines, no credits: just good imagery, like a filmstrip.
 *
 * Pure CSS (a duplicated track translated -50%), so no JS. Pauses on hover.
 * Reduced-motion: the loop stops and becomes a normal horizontal scroller.
 * Cards keep each photo's aspect ratio at a shared height, so widths vary
 * for a natural editorial rhythm.
 */

const CARD_H = 460; // px — shared height; width derives from each photo's ratio

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
            className="relative shrink-0 overflow-hidden rounded-2xl bg-cream"
            style={{ height: CARD_H, width }}
          >
            <Image
              src={shot.src}
              alt={shot.alt}
              fill
              sizes={`${width}px`}
              className="object-cover transition-transform duration-700 ease-out hover:scale-[1.04]"
            />
          </li>
        );
      })}
    </ul>
  );
}

export function WorkReel({ shots = reel }: { shots?: ReelShot[] }) {
  return (
    <section
      aria-label="Selected work"
      className="group w-full overflow-x-auto motion-safe:overflow-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <div className="flex w-max motion-safe:animate-reel group-hover:[animation-play-state:paused]">
        <Track shots={shots} />
        <Track shots={shots} ariaHidden />
      </div>
    </section>
  );
}
