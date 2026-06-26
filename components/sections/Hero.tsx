import { StarMark } from "@/components/primitives/StarMark";
import { verticals } from "@/lib/work";
import { StarDivider } from "../primitives/StarDivider";

export function Hero() {
  return (
    <header className="w-full">
      <div className="mt-8">
        <StarDivider />
      </div>

      <div className="flex flex-col px-5 pt-12 sm:px-10 sm:pt-[76px]">
        <div className="flex flex-col items-start justify-between gap-7 lg:flex-row lg:gap-10">
          <h1 className="flex max-w-[1240px] flex-col text-ink">
            {/* L1 — General Sans (regular) + rust star */}
            <span className="flex items-baseline gap-[18px]">
              <span
                className="font-general font-normal leading-[1.05] tracking-[-0.04em] sm:tracking-[-0.06em]"
                style={{ fontSize: "clamp(32px, 7vw, 72px)" }}
              >
                Design and development for
              </span>
            </span>

            {/* L2–L3 — Cormorant Garamond serif core, with the italic phrase */}
            <span
              className="font-garamond font-thin leading-[.95] tracking-[-0.05em] sm:leading-[.9] sm:tracking-[-0.08em]"
              style={{ fontSize: "clamp(40px, 8vw, 80px)" }}
            >
              multi-brand companies
            </span>
            <span
              className="font-garamond font-thin leading-[.95] tracking-[-0.05em] sm:leading-[.9] sm:tracking-[-0.08em]"
              style={{ fontSize: "clamp(40px, 8vw, 80px)" }}
            >
              and growing teams.
            </span>
          </h1>

          <p className="mt-1 max-w-[460px] text-[15px] leading-[1.45] text-[#5a5347] sm:text-[16px] sm:leading-[1.4] lg:ml-auto lg:mt-2 lg:max-w-[420px]">
            A two-person studio for brands serious about how they show up
            online. Websites, products, and the systems behind them. Designed
            and built in-house, start to finish.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-[10px] sm:mt-9">
          <span className="mr-1.5 text-sm text-muted">
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
      </div>
    </header>
  );
}
