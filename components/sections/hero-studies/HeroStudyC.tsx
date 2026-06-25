import { StarMark } from "@/components/primitives/StarMark";
import { HeroStudyShell, HEAD_SIZE } from "./HeroStudyShell";

/**
 * Hero · C — Tight mixed variant (alternate copy, brand-led).
 * Same three-register mix as B but with the brand/Bajgart-adjacent copy,
 * tighter tracking + leading, and the sans word leading the bottom line:
 *   [connect] = Schibsted sans
 *   , mean something, and / it. = Newsreader roman
 *   feel = Newsreader italic
 */
export function HeroStudyC() {
  return (
    <HeroStudyShell>
      <h1 className="flex max-w-[1180px] flex-col tracking-[-0.03em] text-ink">
        <span className="flex items-start gap-[18px]">
          <span
            className="font-serif font-light leading-[0.92]"
            style={{ fontSize: HEAD_SIZE }}
          >
            We build brands that
          </span>
          <StarMark className="mt-2 text-[34px]" />
        </span>
        <span
          className="font-serif font-light leading-[1.0]"
          style={{ fontSize: HEAD_SIZE }}
        >
          <span className="font-sans text-[0.84em] font-medium tracking-[-0.01em]">
            connect
          </span>
          , mean something, and{" "}
          <span className="italic">feel</span> it.
        </span>
      </h1>
    </HeroStudyShell>
  );
}
