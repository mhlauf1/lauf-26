import { StarMark } from "@/components/primitives/StarMark";
import { projects, type Project } from "@/lib/work";

/**
 * "Now / Next" — a studio availability board. Three lanes on an ink panel:
 * what's shipping NOW, what's NEXT in the booking queue, and a START call
 * to action. Reuses the Hero availability cue (green dot #3fa56a) so the
 * booking signal reads consistently across the site.
 *
 * Reads from lib/work.ts: the NOW headline is drawn from the first "live"
 * project; the queue label comes from project statuses. Pure presentation —
 * no hooks, so no "use client".
 *
 * Renders inside the px-10 KitItem wrapper (not full-bleed): the panel is a
 * rounded ink board sitting under an eyebrow row with a hairline top border.
 */

type Props = {
  /** project currently in the studio (defaults to the first "live" project) */
  now?: Project;
  /** small descriptor under the NOW headline */
  nowDetail?: string;
  /** NEXT — booking headline */
  nextHeadline?: string;
  /** NEXT — booking sub-line */
  nextDetail?: string;
  /** START column headline */
  startHeadline?: string;
  /** START button label */
  ctaLabel?: string;
  /** START button href */
  ctaHref?: string;
};

const firstLive = projects.find((p) => p.status === "live") ?? projects[0];

export function NowNext({
  now = firstLive,
  nowDetail = "Design + build · est. ship in 3 weeks",
  nextHeadline = "1 slot open — Q3 2026.",
  nextDetail = "Then waitlisting for Q4",
  startHeadline = "Tell us what you're building.",
  ctaLabel = "Start a conversation",
  ctaHref = "#",
}: Props = {}) {
  const eyebrow =
    "font-sans text-xs font-semibold uppercase leading-4 tracking-[0.16em]";
  const headline =
    "font-serif font-light text-[42px] leading-[46px] tracking-[-0.01em] text-[#f7f3ea]";
  const sub = "text-[15px] leading-[18px] text-faint";

  return (
    <section
      aria-labelledby="nownext-label"
      className="flex w-full flex-col gap-[18px] border-t border-line pt-9 pb-14"
    >
      {/* eyebrow row */}
      <p
        id="nownext-label"
        className="flex items-center gap-3 font-sans text-[13px] font-semibold uppercase leading-4 tracking-[0.12em] text-ink"
      >
        <StarMark className="text-lg" />
        13 · Now / Next — Availability
      </p>

      {/* ink status board */}
      <div className="flex w-full flex-col overflow-clip rounded-2xl bg-board sm:flex-row">
        {/* NOW — in the studio */}
        <div className="flex flex-[1.4] flex-col justify-between gap-10 p-11">
          <p className={`${eyebrow} flex items-center gap-2.5 text-[#3fa56a]`}>
            <span
              aria-hidden
              className="h-2 w-2 shrink-0 rounded-full bg-[#3fa56a]"
            />
            Now — in the studio
          </p>
          <div className="flex flex-col gap-2.5">
            <h3 className={headline}>{`Building ${now.name}'s seventh brand.`}</h3>
            <p className={sub}>{nowDetail}</p>
          </div>
        </div>

        {/* NEXT — booking */}
        <div className="flex flex-1 flex-col justify-between gap-10 border-t border-[#2c271f] p-11 sm:border-l sm:border-t-0">
          <p className={`${eyebrow} text-[#c8a877]`}>Next — booking</p>
          <div className="flex flex-col gap-2.5">
            <h3 className={headline}>{nextHeadline}</h3>
            <p className={sub}>{nextDetail}</p>
          </div>
        </div>

        {/* START */}
        <div className="flex flex-[0.75] flex-col justify-between gap-10 border-t border-[#2c271f] bg-[#1e1a14] p-11 sm:border-l sm:border-t-0">
          <p className={`${eyebrow} text-[#8a7e6e]`}>Start</p>
          <div className="flex flex-col gap-3.5">
            <h3 className="font-serif text-[30px] font-light leading-8 text-[#f7f3ea]">
              {startHeadline}
            </h3>
            <a
              href={ctaHref}
              className="flex items-center gap-2 self-start rounded-full bg-[#f7f3ea] px-5 py-3 text-[15px] font-medium text-ink transition-colors hover:bg-white"
            >
              {ctaLabel} <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
