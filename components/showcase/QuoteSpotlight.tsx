import { StarMark } from "@/components/primitives/StarMark";
import { bySlug, type Project } from "@/lib/work";

type Stat = { value: string; label: string };

type Props = {
  /** the literal pull-quote text */
  quote?: string;
  /** project used for attribution (client name + vertical) */
  project?: Project;
  /** up to two supporting stats shown in the right rail */
  stats?: Stat[];
};

const DEFAULT_QUOTE =
  "They shipped six brand sites on one system — and made us look sharper than firms ten times our size.";

const DEFAULT_STATS: Stat[] = [
  { value: "6 sites", label: "one shared codebase" },
  { value: "100%", label: "in-house, design to deploy" },
];

/**
 * Quote spotlight — a large editorial pull-quote on a full-bleed board band,
 * with client attribution and a stat rail. Full-bleed: this is a colored
 * (board) band, so it owns its own padding and renders full-width.
 *
 * Translated from Paper F10 Quote: bg-board, 64px pad, 16px radius. Quote is
 * light Newsreader; the lone color is the rust StarMark.
 */
export function QuoteSpotlight({
  quote = DEFAULT_QUOTE,
  project = bySlug("cadence"),
  stats = DEFAULT_STATS,
}: Props) {
  return (
    <figure className="m-0 flex w-full flex-col gap-14 rounded-2xl bg-board p-16 md:flex-row">
      {/* quote + attribution */}
      <div className="flex flex-col">
        <StarMark className="text-[60px]" />
        <blockquote className="mt-7 max-w-[778px] font-serif text-[42px] font-light leading-[50px] tracking-[-0.01em] text-[#f7f3ea]">
          {quote}
        </blockquote>
        {project ? (
          <figcaption className="mt-[30px] font-sans text-[15px] font-medium leading-[18px] text-faint">
            {"— "}
            {project.name} &middot; {project.vertical}
          </figcaption>
        ) : null}
      </div>

      {/* stat rail */}
      {stats.length > 0 ? (
        <div className="flex flex-col justify-center gap-[34px] border-line/0 md:grow-[0.7] md:basis-0 md:border-l md:border-l-[#3a322b] md:pl-14">
          {stats.map((s) => (
            <div key={s.value} className="flex flex-col gap-1">
              <span className="font-serif text-[52px] font-normal leading-[52px] text-[#f7f3ea]">
                {s.value}
              </span>
              <span className="font-sans text-[14px] leading-[18px] text-[#8a7e6e]">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      ) : null}
    </figure>
  );
}
