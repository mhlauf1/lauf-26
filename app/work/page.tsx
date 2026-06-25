import type { Metadata } from "next";
import { PageHeader } from "@/components/primitives/PageHeader";
import { WorkGrid } from "@/components/sections/WorkGrid";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";
import { StarMark } from "@/components/primitives/StarMark";
import { projects } from "@/lib/work";

export const metadata: Metadata = {
  title: "Work — Lauf",
  description:
    "Selected work from Lauf — websites, products, and multi-brand systems designed and built in-house across pet services, private equity, wellness, SaaS, advisory, and the trades.",
};

export default function WorkPage() {
  return (
    <main className="min-h-screen">
      <PageHeader
        eyebrow="Selected work"
        title={
          <>
            Things we&rsquo;ve designed
            <br />
            and <span className="italic">built in-house.</span>
          </>
        }
        lede="A two-person studio means the people who pitched the work are the ones who shipped it. A few of the brands, products, and systems we've made lately."
      />

      <section className="px-10 pt-16">
        <WorkGrid
          items={projects}
          flush
          showAllLink={false}
          eyebrow={`${projects.length} projects`}
          heading="Every brand we’ve built lately."
        />
      </section>

      {/* Quiet sign-off before the CTA */}
      <p className="mt-20 flex items-center justify-center gap-3 px-10 text-center font-sans text-sm text-faint">
        <StarMark className="text-base" />
        More in the works — new projects ship most quarters.
      </p>

      <div className="mt-20">
        <CTA
          eyebrow="Have something in mind?"
          headingTop="Let’s make yours"
          headingBottom="the next one."
        />
      </div>

      <Footer />
    </main>
  );
}
