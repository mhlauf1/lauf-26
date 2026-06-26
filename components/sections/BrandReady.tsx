import Link from "next/link";
import { StarMark } from "@/components/primitives/StarMark";

/**
 * "Brand ready" — a two-column value-prop band that sits under the work reel.
 * Left: a star-marked eyebrow, the type-sandwich headline (mirrors the hero),
 * a short lede, a hairline-divided row of serif proof stats, and a pill CTA.
 * Right: an autoplaying studio reel at its natural height, set in a padded
 * cream frame.
 *
 * Self-contained copy — this is a positioning statement, not work data, so it
 * doesn't read from lib/work.ts. Renders WITHOUT outer horizontal padding;
 * drop it in a px-10 wrapper like the other home sections.
 */

/** Proof row — Lauf's signature serif figures (cf. StudioBand). */
const PROOF: { value: string; label: string }[] = [
  { value: "One team", label: "Design + engineering, in-house" },
  { value: "20+", label: "Projects shipped" },
  { value: "USA", label: "Based in the US" },
];

export function BrandReady() {
  return (
    <section className="flex w-full flex-col gap-14 lg:flex-row lg:items-center lg:gap-20">
      {/* Left — positioning copy */}
      <div className="flex flex-col lg:flex-[0.92]">
        {/* eyebrow */}
        <p className="flex items-center gap-2.5 font-sans text-[15px] font-normal text-muted">
          <StarMark className="text-sm text-rust" />
          Why founders choose Lauf
        </p>

        {/* Type sandwich — mirrors the hero: General Sans bookends wrap a
            Cormorant Garamond serif core that carries the italic phrase. */}
        <h2 className="mt-5 flex max-w-[600px] flex-col text-ink">
          {/* sans */}
          <span
            className="font-general font-normal leading-[1.1] tracking-[-0.04em]"
            style={{ fontSize: "clamp(34px, 3.6vw, 50px)" }}
          >
            Designed and built
          </span>
          {/* serif core + italic phrase */}
          <span
            className="font-garamond font-thin leading-[.95] tracking-[-0.06em]"
            style={{ fontSize: "clamp(40px, 4.2vw, 58px)" }}
          >
            in <span className="italic">two weeks</span> —
          </span>
          {/* sans */}
          <span
            className="font-general font-normal leading-[1.2] tracking-[-0.04em]"
            style={{ fontSize: "clamp(34px, 3.6vw, 50px)" }}
          >
            or continuously shipped.
          </span>
        </h2>

        <p className="mt-6 max-w-[460px] font-sans text-[17px] leading-[27px] text-muted">
          For founders and teams who want a site that's designed and engineered
          by the same hands — credible, fast, and built to last, with none of the
          agency handoff or overhead.
        </p>

        {/* proof row — hairline-divided serif figures */}
        <dl className="mt-10 flex flex-wrap gap-x-9 gap-y-7 border-t border-line pt-9">
          {PROOF.map((stat, i) => (
            <div
              key={stat.value}
              className={`flex flex-col gap-1.5 ${
                i > 0 ? "border-line sm:border-l sm:pl-9" : ""
              }`}
            >
              <dt className="font-serif text-[32px] font-light leading-[0.95] tracking-[-0.02em] text-ink">
                {stat.value}
              </dt>
              <dd className="max-w-[180px] font-sans text-[13px] leading-[18px] text-muted">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>

        <Link
          href="/contact"
          className="mt-10 inline-flex w-fit items-center gap-2 rounded-full bg-ink px-7 py-3.5 font-sans text-sm font-medium text-paper transition-colors hover:bg-rust"
        >
          Process + pricing <span aria-hidden>→</span>
        </Link>
      </div>

      {/* Right — single media frame */}
      <div className="lg:flex-[1.08]">
        <div className="rounded-[28px] bg-cream p-4 sm:p-6">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/embark-bg.png"
            aria-label="Studio reel"
            className="block h-auto w-full rounded-2xl"
          >
            <source src="/company-vid-test.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
}
