import { verticals } from "@/lib/work";
import { StarDivider } from "../primitives/StarDivider";
import { StarMark } from "@/components/primitives/StarMark";
import { RevealLines } from "@/components/anim/RevealLines";

export function Hero() {
  return (
    <header className="w-full">
      <div className="mt-8">
        <StarDivider />
      </div>

      <div className="flex flex-col px-5 pt-12 sm:px-10 sm:pt-[76px]">
        {/* Display sentence — one continuous Cormorant Garamond line that wraps
            naturally and rises in with the crisp reveal. */}
        <RevealLines
          as="h1"
          className="flex w-full flex-col text-start max-w-[700px] text-ink"
          lines={[
            {
              content:
                "A design and development studio of two, building the websites, products, and systems brands run on.",
              className:
                "font-garamond font-thin leading-[1.06] tracking-[-0.03em] sm:leading-[1.02] sm:tracking-[-0.04em]",
              style: { fontSize: "clamp(26px, 3.3vw, 42px)" },
            },
          ]}
        />

        <div className="mt-8 flex flex-col gap-5 sm:mt-9 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          <div className="flex flex-wrap items-center gap-[10px]">
            <span className="w-full text-sm text-muted sm:mr-1.5 sm:w-auto">
              Built for founders &amp; teams across
            </span>
            {verticals.map((v) => (
              <span
                key={v.label}
                className="flex items-center gap-[7px] rounded-full border border-line px-[14px] py-[7px] text-[13px] font-medium text-ink"
              >
                <span
                  className="h-[7px] w-[7px] rounded-full"
                  style={{ backgroundColor: v.color }}
                />
                {v.label}
              </span>
            ))}
          </div>

          <a
            href="/work"
            className="group inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-line bg-transparent px-6 py-3 font-sans text-sm font-medium text-ink transition-colors duration-300 hover:border-rust hover:bg-rust hover:text-paper"
          >
            <StarMark className="translate-y-[3px] text-[15px] text-rust transition-colors duration-300 group-hover:text-paper" />
            View work
            <span aria-hidden className="hover-arrow">
              →
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
