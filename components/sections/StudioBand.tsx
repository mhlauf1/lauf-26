import { StarMark } from "@/components/primitives/StarMark";

type Stat = {
  /** large serif figure, e.g. "2 people" */
  value: string;
  /** small sans caption beneath, e.g. "No handoffs, ever" */
  label: string;
};

type Props = {
  eyebrow?: string;
  /** display heading; the rust star is rendered separately, never in this string */
  heading?: string;
  body?: string;
  stats?: Stat[];
};

const DEFAULT_STATS: Stat[] = [
  { value: "2 people", label: "No handoffs, ever" },
  { value: "20+ brands", label: "Shipped across industries" },
  { value: "all of it", label: "Design through deploy, in-house" },
];

/**
 * "The Studio" band — the warm-cream introduction to the two-person
 * studio (Mike & Clare, Madison WI). Full-bleed: it owns its own
 * horizontal padding rather than sitting inside the page's px-10 wrapper.
 *
 * Left lane: eyebrow, light Newsreader display heading, narrative body.
 * Right lane: a hairline-divided stack of serif stats. Static, no hooks.
 */
export function StudioBand({
  eyebrow = "The studio — Madison, WI",
  heading = "Hi — we're Mike & Clare.",
  body = "A two-person design and development studio. We take on a handful of clients at a time so the people who pitch your project are the same people who design it, build it, and ship it. Every pixel, every line of code — ours.",
  stats = DEFAULT_STATS,
}: Props) {
  return (
    <section className="flex w-full flex-col items-start gap-12 bg-cream px-6 py-16 md:flex-row md:items-center md:gap-[72px] md:px-[72px] md:py-[88px]">
      {/* narrative */}
      <div className="flex flex-1 flex-col">
        <p className="flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-faint">
          <StarMark className="text-sm" />
          {eyebrow}
        </p>
        <h2 className="mt-3.5 font-serif font-light leading-[1.0] tracking-[-0.02em] text-ink text-[clamp(38px,5vw,56px)]">
          {heading}
        </h2>
        <p className="mt-[26px] max-w-[560px] text-[18px] leading-[29px] text-muted">
          {body}
        </p>
      </div>

      {/* stats */}
      <dl className="flex flex-col gap-7 self-stretch border-line pl-0 md:max-w-[420px] md:flex-[0_0_36%] md:self-auto md:border-l md:pl-16">
        {stats.map((stat) => (
          <div key={stat.value} className="flex flex-col gap-1">
            <dt className="font-serif text-[44px] font-light leading-[1.0] text-ink">
              {stat.value}
            </dt>
            <dd className="text-[14px] leading-[18px] text-muted">
              {stat.label}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
