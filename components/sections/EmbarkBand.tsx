import { StarMark } from "@/components/primitives/StarMark";
import { TestimonialCarousel } from "@/components/sections/TestimonialCarousel";
import { bySlug, type Project } from "@/lib/work";

type Stat = { value: string; label: string };

/**
 * Embark Band — the flagship/featured client band. A full-bleed dark
 * board running edge-to-edge: editorial headline + body on the left,
 * a sleek client testimonial on the right. Below the copy, three serif
 * stat figures and a pill CTA to the case study.
 *
 * Full-bleed: handles its OWN horizontal padding; place without an
 * outer px-10 wrapper. Reads the Embark project from lib/work.ts.
 */
export function EmbarkBand({
  project = bySlug("embark")!,
  stats = DEFAULT_STATS,
}: {
  project?: Project;
  stats?: Stat[];
}) {
  const testimonials = project.testimonials ?? [];

  return (
    <section
      aria-labelledby="embark-band-heading"
      className="flex w-full flex-col overflow-clip bg-board lg:flex-row"
    >
      {/* Left — editorial copy */}
      <div className="flex flex-[1.15] flex-col justify-between px-10 pb-16 pt-[72px] lg:px-[72px] lg:pr-14">
        <div className="flex flex-col">
          <span className="flex items-center gap-2">
            <span className="font-sans text-sm font-medium  text-[#ffe0b2]">
              <StarMark className="text-xs  mr-1" />
              Spolight Portfolio: Embark {project.vertical}
            </span>
          </span>

          <h2
            id="embark-band-heading"
            className="mt-[26px] flex flex-col font-serif font-light leading-[1.04] tracking-[-0.02em] text-[#f7f3ea]"
            style={{ fontSize: "clamp(46px, 5vw, 72px)" }}
          >
            <span>Seven+ brands.</span>
            <span>One platform.</span>
          </h2>

          <p className="mt-7 max-w-[480px] font-sans text-[17px] leading-[27px] text-[#b7ae9f]">
            A pet-services roll-up that acquired faster than its websites could
            keep up. We built the system that ships every new acquisition on one
            shared Next.js + Sanity platform.
          </p>
        </div>

        {/* Foot — stats + CTA */}
        <div className="mt-12 flex flex-wrap items-end justify-between gap-8">
          <dl className="flex gap-12">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-1">
                <dd className="font-serif text-[46px] font-thin leading-none text-[#f7f3ea]">
                  {s.value}
                </dd>
                <dt className="font-sans text-[11px] font-medium uppercase leading-[14px] tracking-[0.1em] text-[#8a7e6e]">
                  {s.label}
                </dt>
              </div>
            ))}
          </dl>

          <a
            href={`/work/${project.slug}`}
            className="flex shrink-0 items-center gap-2 rounded-full border border-[#4a4138] px-[22px] py-3.5 font-sans text-sm font-medium text-[#f7f3ea] transition-colors hover:border-[#6b5f50] hover:bg-white/[0.04]"
          >
            Read the case study <span aria-hidden>→</span>
          </a>
        </div>
      </div>

      {/* Right — client testimonial carousel (QuoteSpotlight styling) */}
      <div className="relative flex flex-[0.85] flex-col justify-center border-t border-white/[0.08] bg-gradient-to-b from-white/[0.035] to-transparent px-10 py-16 lg:min-h-[560px] lg:border-l lg:border-t-0 lg:px-[72px]">
        {testimonials.length > 0 && (
          <TestimonialCarousel items={testimonials} />
        )}
      </div>
    </section>
  );
}

const DEFAULT_STATS: Stat[] = [
  { value: "7", label: "Live sites" },
  { value: "1", label: "Shared codebase" },
  { value: "days", label: "Per new launch" },
];
