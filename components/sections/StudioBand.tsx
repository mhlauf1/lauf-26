import Image from "next/image";
import { StarMark } from "@/components/primitives/StarMark";

type Stat = {
  /** large serif figure, e.g. "2 people" */
  value: string;
  /** small sans caption beneath, e.g. "No handoffs, ever" */
  label: string;
};

type Person = {
  src: string;
  name: string;
  /** small sans caption beneath the name, e.g. "Design" */
  role: string;
};

type Props = {
  eyebrow?: string;
  /** display heading; the rust star is rendered separately, never in this string */
  heading?: string;
  body?: string;
  stats?: Stat[];
  people?: Person[];
};

const DEFAULT_STATS: Stat[] = [
  { value: "2 people", label: "No handoffs, ever" },
  { value: "20+ brands", label: "Shipped across industries" },
  { value: "all of it", label: "Design through deploy, in-house" },
];

const DEFAULT_PEOPLE: Person[] = [
  { src: "/mike.png", name: "Mike", role: "Design & build" },
  { src: "/clare.png", name: "Clare", role: "Design & strategy" },
];

/**
 * "The Studio" band — the warm-cream introduction to the two-person
 * studio (Mike & Clare, Madison WI). Full-bleed cream; an inner wrapper
 * caps the measure so nothing drifts on ultra-wide screens.
 *
 * Left lane: eyebrow, light Newsreader heading, narrative body, and a
 * hairline-divided row of serif stats. Right lane: the two of us, as a
 * pair of large editorial portraits.
 */
export function StudioBand({
  eyebrow = "The studio — Madison, WI",
  heading = "Hi — we're Mike & Clare.",
  body = "A two-person design and development studio. We take on a handful of clients at a time so the people who pitch your project are the same people who design it, build it, and ship it. Every pixel, every line of code — ours.",
  stats = DEFAULT_STATS,
  people = DEFAULT_PEOPLE,
}: Props) {
  return (
    <section className="w-full bg-cream px-6 py-16 md:px-[72px] md:py-[96px]">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-14 lg:flex-row lg:items-stretch lg:gap-20">
        {/* narrative + stats */}
        <div className="flex flex-1 flex-col">
          <p className="flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-faint">
            <StarMark className="text-sm" />
            {eyebrow}
          </p>
          <h2 className="mt-4 font-serif font-light leading-[0.98] tracking-[-0.02em] text-ink text-[clamp(38px,5vw,58px)]">
            {heading}
          </h2>
          <p className="mt-6 max-w-[520px] text-[18px] leading-[29px] text-muted">
            {body}
          </p>

          {/* stats — horizontal, hairline-divided */}
          <dl className="mt-auto flex flex-wrap gap-x-10 gap-y-8 pt-12">
            {stats.map((stat, i) => (
              <div
                key={stat.value}
                className={`flex flex-col gap-1.5 ${
                  i > 0 ? "border-line pl-10 sm:border-l" : ""
                }`}
              >
                <dt className="font-serif text-[40px] font-light leading-[0.95] text-ink">
                  {stat.value}
                </dt>
                <dd className="text-[13px] leading-[18px] text-muted">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* the two of us */}
        <div className="flex shrink-0 gap-5 sm:gap-6">
          {people.map((person) => (
            <figure key={person.name} className="flex flex-1 flex-col gap-3.5 sm:w-[248px] sm:flex-none">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2px] bg-line">
                <Image
                  src={person.src}
                  alt={person.name}
                  fill
                  sizes="(max-width: 640px) 45vw, 248px"
                  className="object-cover"
                />
              </div>
              <figcaption className="flex flex-col gap-0.5">
                <span className="font-serif text-[20px] leading-none text-ink">
                  {person.name}
                </span>
                <span className="text-[12px] uppercase tracking-[0.12em] text-faint">
                  {person.role}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
