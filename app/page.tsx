import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { StarDivider } from "@/components/primitives/StarDivider";
import { StarMark } from "@/components/primitives/StarMark";
import { LogoMarquee } from "@/components/showcase/LogoMarquee";
import { TabbedViewer } from "@/components/showcase/TabbedViewer";
import { BeforeAfter } from "@/components/showcase/BeforeAfter";
import { bySlug } from "@/lib/work";

export default function Home() {
  const playbook = bySlug("playbook");

  return (
    <main className="min-h-screen pb-24">
      <Hero />

      {/* trusted-by marquee */}
      <section className="mt-28 px-10">
        <p className="mb-6 text-sm text-muted">
          Trusted by founders and teams across six brands and counting.
        </p>
        <LogoMarquee />
      </section>

      {/* a closer look — tabbed case viewer */}
      <section className="mt-28">
        <TabbedViewer />
      </section>

      <div className="my-24">
        <StarDivider />
      </div>

      {/* before / after */}
      <section className="px-10">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-y-4">
          <h2
            className="font-serif font-light leading-[1.05] tracking-[-0.02em] text-ink"
            style={{ fontSize: "clamp(34px, 4vw, 48px)" }}
          >
            The difference, dragged.
          </h2>
          <p className="max-w-sm text-[15px] text-muted">
            Drag the handle — the old site on the left, the rebuild on the
            right. Every project starts where the last one left off.
          </p>
        </div>
        <BeforeAfter
          afterSrc={playbook!.image!}
          afterAlt="Playbook rebuild by Lauf"
        />
      </section>

      <div className="my-24">
        <StarDivider />
      </div>

      {/* closing CTA */}
      <section className="px-10 text-center">
        <h2
          className="mx-auto max-w-3xl font-serif font-light leading-[1.08] tracking-[-0.02em] text-ink"
          style={{ fontSize: "clamp(40px, 6vw, 76px)" }}
        >
          Let&rsquo;s build the whole thing
          <StarMark className="ml-1 align-top text-3xl" />
        </h2>
        <p className="mx-auto mt-6 max-w-md text-[17px] leading-[1.5] text-muted">
          Two people, in-house, start to finish. We take two projects a
          quarter — there&rsquo;s room this one.
        </p>
        <div className="mt-9 flex items-center justify-center gap-4">
          <a
            href="#"
            className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper"
          >
            Let&rsquo;s talk
          </a>
          <Link
            href="/kit"
            className="text-sm font-medium text-ink underline decoration-line underline-offset-4"
          >
            Browse the component kit →
          </Link>
        </div>
      </section>
    </main>
  );
}
