import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";
import { StarMark } from "@/components/primitives/StarMark";
import { SectionLabel } from "@/components/primitives/SectionLabel";
import { projects, bySlug } from "@/lib/work";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = bySlug(slug);
  if (!project) return { title: "Work — Lauf" };
  return {
    title: `${project.name} — Lauf`,
    description: project.caseStudy?.intro ?? project.blurb,
  };
}

/** Index helper so we can link to the next project at the foot of the page. */
function nextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = bySlug(slug);
  if (!project) notFound();

  const cs = project.caseStudy ?? {};
  const next = nextProject(slug);

  return (
    <main className="min-h-screen">
      {/* Back link */}
      <div className="px-10 pt-7">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 font-sans text-sm font-medium text-muted transition-colors hover:text-rust"
        >
          <span aria-hidden>←</span> All work
        </Link>
      </div>

      {/* Header */}
      <header className="flex flex-col px-10 pt-12">
        <span className="flex items-center gap-2.5 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-faint">
          <span
            className="h-[7px] w-[7px] rounded-full"
            style={{ backgroundColor: project.accent }}
          />
          {project.vertical}
          {project.year && <span className="text-line">·</span>}
          {project.year && <span>{project.year}</span>}
        </span>

        <h1
          className="mt-6 max-w-[1100px] font-serif font-light leading-[1.0] tracking-[-0.02em] text-ink"
          style={{ fontSize: "clamp(48px, 7vw, 96px)" }}
        >
          {project.name}
        </h1>

        <p className="mt-7 max-w-[680px] font-serif text-[clamp(22px,2.4vw,30px)] font-light italic leading-[1.4] text-ink">
          {cs.intro ?? project.tagline}
        </p>

        {/* Meta row */}
        <dl className="mt-12 flex flex-wrap gap-x-16 gap-y-8 border-t border-line pt-8">
          <MetaItem term="Services" value={project.services} />
          {cs.stack && cs.stack.length > 0 && (
            <MetaItem term="Built with" value={cs.stack.join(" · ")} />
          )}
          {project.status && (
            <MetaItem
              term="Status"
              value={project.status === "live" ? "Live" : "Shipped"}
            />
          )}
          {cs.liveUrl && (
            <div className="flex flex-col gap-1.5">
              <dt className="font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-faint">
                Visit
              </dt>
              <dd>
                <a
                  href={cs.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-sans text-[15px] font-medium text-ink underline-offset-2 transition-colors hover:text-rust hover:underline"
                >
                  Live site <span aria-hidden>↗</span>
                </a>
              </dd>
            </div>
          )}
        </dl>
      </header>

      {/* Cover */}
      {project.image && (
        <div className="mt-14 px-10">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-cream">
            <Image
              src={project.image}
              alt={`${project.name} — ${project.blurb}`}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover"
            />
          </div>
        </div>
      )}

      {/* Narrative */}
      <div className="mx-auto mt-20 flex max-w-[1180px] flex-col gap-16 px-10">
        {cs.problem && <CaseBlock label="The problem" body={cs.problem} />}
        {cs.approach && <CaseBlock label="Our approach" body={cs.approach} />}
        {cs.outcome && <CaseBlock label="The outcome" body={cs.outcome} />}
      </div>

      {/* Stats */}
      {cs.stats && cs.stats.length > 0 && (
        <dl className="mx-auto mt-20 flex max-w-[1180px] flex-wrap gap-x-20 gap-y-10 border-y border-line px-10 py-14">
          {cs.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-2">
              <dt className="font-serif text-[clamp(40px,4.4vw,60px)] font-light leading-none text-ink">
                {stat.value}
              </dt>
              <dd className="font-sans text-sm text-muted">{stat.label}</dd>
            </div>
          ))}
        </dl>
      )}

      {/* Gallery */}
      {cs.gallery && cs.gallery.length > 0 && (
        <section className="mt-20 px-10">
          <SectionLabel className="mb-7">From the project</SectionLabel>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {cs.gallery.map((src, i) => (
              <div
                key={src}
                className={`relative aspect-[4/3] overflow-hidden rounded-2xl bg-cream ${
                  // first shot spans full width for an editorial rhythm
                  i === 0 ? "md:col-span-2 md:aspect-[16/9]" : ""
                }`}
              >
                <Image
                  src={src}
                  alt={`${project.name} — project image ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Next project */}
      <Link
        href={`/work/${next.slug}`}
        className="group mt-24 flex flex-col gap-2 border-t border-line px-10 py-14 transition-colors hover:bg-cream/50"
      >
        <span className="flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-faint">
          <StarMark className="text-sm" /> Next project
        </span>
        <span className="flex items-center justify-between gap-6">
          <span className="font-serif text-[clamp(32px,4vw,52px)] font-light leading-[1.05] tracking-[-0.02em] text-ink transition-colors group-hover:text-rust">
            {next.name}
          </span>
          <span
            aria-hidden
            className="shrink-0 font-serif text-[clamp(32px,4vw,52px)] font-light text-ink transition-transform motion-safe:group-hover:translate-x-1"
          >
            →
          </span>
        </span>
      </Link>

      <CTA />
      <Footer />
    </main>
  );
}

function MetaItem({ term, value }: { term: string; value: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <dt className="font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-faint">
        {term}
      </dt>
      <dd className="font-sans text-[15px] font-medium text-ink">{value}</dd>
    </div>
  );
}

function CaseBlock({ label, body }: { label: string; body: string }) {
  return (
    <div className="flex flex-col gap-5 md:flex-row md:gap-16">
      <div className="md:w-[200px] md:shrink-0 md:pt-2">
        <SectionLabel>{label}</SectionLabel>
      </div>
      <p className="max-w-[680px] font-serif text-[clamp(20px,2vw,26px)] font-light leading-[1.5] tracking-[-0.01em] text-ink">
        {body}
      </p>
    </div>
  );
}
