import { StarMark } from "@/components/primitives/StarMark";
import { verticals } from "@/lib/work";
import { StarDivider } from "../primitives/StarDivider";

export function Hero() {
  return (
    <header className="w-full">
      <div className="mt-8">
        <StarDivider />
      </div>

      <div className="flex flex-col px-10 pt-[76px]">
        <div className="flex items-start justify-between gap-10">
          <h1 className="flex max-w-[1240px] flex-col text-ink">
            {/* L1 — General Sans (regular) + rust star */}
            <span className="flex items-baseline gap-[18px]">
              <span
                className="font-general font-normal leading-[1.05] tracking-[-0.04em]"
                style={{ fontSize: "clamp(40px, 5.2vw, 72px)" }}
              >
                We design and build
              </span>
            </span>

            {/* L2–L3 — Cormorant Garamond serif core, with the italic phrase */}
            <span
              className="font-garamond font-thin leading-[.9] tracking-[-0.06em]"
              style={{ fontSize: "clamp(48px, 5.2vw, 80px)" }}
            >
              websites that showcase
            </span>
            <span
              className="font-garamond font-thin leading-[.9] tracking-[-0.06em]"
              style={{ fontSize: "clamp(48px, 5.2vw, 80px)" }}
            >
              <span className="italic">growing teams</span> online,
            </span>

            {/* L4 — back to General Sans (regular) */}
            <span
              className="font-general font-normal leading-[1.2] tracking-[-0.04em]"
              style={{ fontSize: "clamp(40px, 5.2vw, 72px)" }}
            >
              done the right way.
            </span>
          </h1>

          <p className="ml-auto mt-2 max-w-[420px] text-[16px] leading-[1.4] text-[#5a5347]">
            A two-person studio for brands serious about how they show up
            online. Websites, products, and the systems behind them. Designed
            and built in-house, start to finish.
          </p>
        </div>

        <div className="mt-9 flex flex-wrap items-center gap-[10px]">
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
