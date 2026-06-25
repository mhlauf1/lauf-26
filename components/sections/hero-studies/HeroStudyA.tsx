import { StarMark } from "@/components/primitives/StarMark";
import { HeroStudyShell, HEAD_SIZE } from "./HeroStudyShell";

/**
 * Hero · A — Editorial control (Bajgart-faithful, all-Newsreader).
 * Roman lines with a single italic emphasis word ("thrive"), like Bajgart's
 * "meaning with *feeling*". No sans in the mix — this is the baseline the
 * mixed-register variants are measured against.
 */
export function HeroStudyA() {
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
          websites that <span className="italic">thrive</span>.
        </span>
      </h1>
    </HeroStudyShell>
  );
}
