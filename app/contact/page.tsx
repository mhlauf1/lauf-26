import type { Metadata } from "next";
import { PageHeader } from "@/components/primitives/PageHeader";
import { ContactForm } from "@/components/sections/ContactForm";
import { Footer } from "@/components/sections/Footer";
import { StarMark } from "@/components/primitives/StarMark";

export const metadata: Metadata = {
  title: "Contact — Lauf",
  description:
    "Tell us what you're building. Lauf is a two-person design and development studio in Madison, WI — now booking two projects for Q3 2026.",
};

const DETAILS = [
  { label: "Email", value: "michael@lauf.co", href: "mailto:michael@lauf.co" },
  { label: "Studio", value: "Madison, Wisconsin" },
  { label: "Availability", value: "2 projects open — Q3 2026" },
  { label: "Response", value: "Usually within a day" },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <PageHeader
        eyebrow="Now booking — Q3 2026"
        title={
          <>
            Let&rsquo;s talk about
            <br />
            what you&rsquo;re <span className="italic">building.</span>
          </>
        }
        lede="One site or a whole portfolio of brands — tell us what you have in mind and we'll tell you how we'd approach it. No forms-to-nowhere; it lands straight in our inbox."
      />

      <section className="mt-20 grid grid-cols-1 gap-x-20 gap-y-14 px-10 pb-24 lg:grid-cols-[0.8fr_1.2fr]">
        {/* Left — details */}
        <aside className="flex flex-col gap-10">
          <dl className="flex flex-col">
            {DETAILS.map((d) => (
              <div
                key={d.label}
                className="flex items-start justify-between gap-6 border-t border-line py-5"
              >
                <dt className="font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-faint">
                  {d.label}
                </dt>
                <dd className="text-right font-sans text-[15px] font-medium text-ink">
                  {d.href ? (
                    <a
                      href={d.href}
                      className="underline-offset-2 transition-colors hover:text-rust hover:underline"
                    >
                      {d.value}
                    </a>
                  ) : (
                    d.value
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <p className="flex items-start gap-3 border-t border-line pt-7 font-serif text-[20px] font-light leading-[1.45] text-ink">
            <StarMark className="mt-1 text-lg" />
            <span>
              You&rsquo;ll talk to the two people who&rsquo;ll actually design
              and build it — not a salesperson.
            </span>
          </p>
        </aside>

        {/* Right — form */}
        <div className="lg:pt-1">
          <ContactForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}
