import type { Metadata } from "next";
import { PageHeader } from "@/components/primitives/PageHeader";
import { StudioBand } from "@/components/sections/StudioBand";
import { Services } from "@/components/sections/Services";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";
import { SectionLabel } from "@/components/primitives/SectionLabel";

export const metadata: Metadata = {
  title: "Studio — Lauf",
  description:
    "Lauf is a two-person design and development studio in Madison, WI. Mike and Clare take on a handful of clients at a time and ship every project in-house, from first sketch to deploy.",
};

const PRINCIPLES = [
  {
    title: "Two people, the whole stack.",
    body: "No account managers, no handoffs. The people who design your site write the code that ships it — so nothing gets lost in translation.",
  },
  {
    title: "A handful of clients at a time.",
    body: "We work in depth, not in volume. Taking on fewer projects means each one gets the attention a launch actually deserves.",
  },
  {
    title: "Built to be owned.",
    body: "Fast, accessible, standards-based code on tooling you control. Launch is the start of the relationship, not the end of the invoice.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <PageHeader
        eyebrow="The studio — Madison, WI"
        title={
          <>
            A small studio that
            <br />
            ships <span className="italic">the whole thing.</span>
          </>
        }
        lede="Lauf is Mike and Clare — a two-person design and development studio. We design it, build it, and launch it ourselves, for people serious about how they show up online."
      />

      <div className="mt-20">
        <StudioBand />
      </div>

      {/* Principles */}
      <section className="px-10 pt-[118px]">
        <SectionLabel>What that means for you</SectionLabel>
        <ul className="mt-12 grid list-none grid-cols-1 gap-x-12 gap-y-12 p-0 md:grid-cols-3">
          {PRINCIPLES.map((p, i) => (
            <li
              key={p.title}
              className="flex flex-col gap-4 border-t border-line pt-7"
            >
              <span className="font-sans text-[13px] font-medium tracking-[0.04em] text-faint">
                0{i + 1}
              </span>
              <h3 className="font-serif text-[26px] font-light leading-[1.15] tracking-[-0.01em] text-ink">
                {p.title}
              </h3>
              <p className="font-sans text-[15px] leading-6 text-muted">
                {p.body}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="px-10">
        <Services />
      </section>

      <div className="mt-[118px]">
        <TrustedBy />
      </div>

      <div className="mt-22">
        <CTA
          eyebrow="Now booking — Q3 2026"
          headingTop="Want to work"
          headingBottom="with us?"
        />
      </div>

      <Footer />
    </main>
  );
}
