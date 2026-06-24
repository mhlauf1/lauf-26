import { StarMark } from "@/components/primitives/StarMark";

/**
 * "How we work" — a two-column services band. Left: an editorial intro
 * (eyebrow + display heading + lede). Right: a numbered services list as a
 * proper definition list, each row a hairline-topped lane with a fixed-width
 * number slot so titles align across rows.
 *
 * Copy is literal from the design (service lists don't live in lib/work.ts).
 * Renders WITHOUT outer horizontal padding — drop it in a px-10 wrapper.
 */

export type Service = {
  /** two-digit lane number, e.g. "01" */
  number: string;
  title: string;
  description: string;
};

const DEFAULT_SERVICES: Service[] = [
  {
    number: "01",
    title: "Design",
    description:
      "Web & mobile UI, brand identity, art direction, design systems. Built to ship, not just to present.",
  },
  {
    number: "02",
    title: "Development",
    description:
      "Next.js + React, full-stack apps, Sanity CMS, Stripe. Fast, accessible, and yours to own.",
  },
  {
    number: "03",
    title: "Brand systems",
    description:
      "Multi-brand platforms and shared design systems that scale to the next site, product, or acquisition.",
  },
  {
    number: "04",
    title: "Partnership",
    description:
      "Your standing web partner as the portfolio grows. Launch is the start, not the invoice.",
  },
];

export function Services({
  eyebrow = "How we work",
  services = DEFAULT_SERVICES,
}: {
  eyebrow?: string;
  services?: Service[];
}) {
  return (
    <section className="flex w-full flex-col gap-14 pt-[118px] lg:flex-row lg:items-start lg:gap-20">
      {/* Intro */}
      <div className="flex flex-col lg:flex-[0.9]">
        <span className="flex items-center gap-2">
          <StarMark className="text-sm" />
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-faint">
            {eyebrow}
          </span>
        </span>

        <h2 className="mt-6 font-serif text-[52px] font-light leading-[1.05] tracking-[-0.02em] text-ink">
          Two people.
          <br />
          The whole stack.
        </h2>

        <p className="mt-6 max-w-[380px] font-sans text-[17px] leading-[27px] text-muted">
          No handoffs. No account managers. The people who design your site are
          the ones who write the code that ships it.
        </p>
      </div>

      {/* Services list */}
      <dl className="flex flex-col lg:flex-[1.1]">
        {services.map((service) => (
          <div
            key={service.number}
            className="flex items-start gap-6 border-t border-line py-7"
          >
            <span
              aria-hidden
              className="w-10 shrink-0 pt-2 font-sans text-[13px] font-medium leading-4 tracking-[0.04em] text-ink"
            >
              {service.number}
            </span>
            <div className="flex flex-1 flex-col gap-[7px]">
              <dt className="font-serif text-[28px] font-light leading-[34px] tracking-[-0.01em] text-ink">
                {service.title}
              </dt>
              <dd className="font-sans text-[15px] leading-6 text-muted">
                {service.description}
              </dd>
            </div>
          </div>
        ))}
      </dl>
    </section>
  );
}
