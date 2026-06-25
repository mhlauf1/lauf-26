import { StarMark } from "@/components/primitives/StarMark";
import { HeroStudyShell, HEAD_SIZE } from "./HeroStudyShell";

/**
 * Hero · B — Mixed bottom line (the move).
 * Top line serif roman; bottom line sets three registers side-by-side:
 *   [websites] = Schibsted sans (concrete deliverable)
 *   that work and / right. = Newsreader roman
 *   feel = Newsreader italic (the emotive payoff)
 * Sans word is sized in em (0.86) + weight 500 + tracked in so it sits calmly
 * beside Newsreader 300 instead of shouting.
 */
export function HeroStudyB() {
  return (
    <HeroStudyShell>
      <h1 className="flex max-w-[1180px] flex-col tracking-[-0.02em] text-ink">
        <span className="flex items-start gap-[18px]">
          <span
            className="font-serif font-light leading-[0.95]"
            style={{ fontSize: HEAD_SIZE }}
          >
            We design and build
          </span>
          <StarMark className="mt-2 text-[34px]" />
        </span>
        <span
          className="font-serif font-light leading-[1.04]"
          style={{ fontSize: HEAD_SIZE }}
        >
          <span className="font-sans text-[0.86em] font-medium tracking-[-0.01em]">
            websites
          </span>{" "}
          that work and <span className="italic">feel</span> right.
        </span>
      </h1>
    </HeroStudyShell>
  );
}
