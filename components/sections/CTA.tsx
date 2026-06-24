import { StarMark } from "@/components/primitives/StarMark";

type Props = {
  eyebrow?: string;
  /** Display heading — rendered in two lines. */
  headingTop?: string;
  headingBottom?: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
  email?: string;
};

/**
 * Closing CTA band. FULL-BLEED dark board (#16140F / bg-board) — owns its
 * own horizontal padding, so render it edge-to-edge, NOT inside the px-10
 * wrapper. Light Newsreader display heading on warm dark, rust star eyebrow,
 * a pill primary action, and a quiet mailto fallback.
 */
export function CTA({
  eyebrow = "NOW BOOKING — Q3 2026",
  headingTop = "Great work starts",
  headingBottom = "with a conversation.",
  body = "One site or a whole portfolio of brands — tell us what you're building and we'll tell you how we'd approach it.",
  ctaLabel = "Start a conversation",
  ctaHref = "/contact",
  email = "michael@lauf.co",
}: Props) {
  return (
    <section className="flex w-full flex-col items-center bg-board px-6 py-[104px] text-center sm:px-[72px] sm:pb-[110px]">
      {/* eyebrow */}
      <span className="flex items-center gap-2">
        <StarMark className="text-sm" />
        <span className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-faint">
          {eyebrow}
        </span>
      </span>

      {/* display heading */}
      <h2
        className="mt-7 font-serif font-light leading-[0.98] tracking-[-0.02em] text-[#F7F3EA]"
        style={{ fontSize: "clamp(44px, 5.6vw, 80px)" }}
      >
        {headingTop}
        <br />
        {headingBottom}
      </h2>

      {/* supporting copy */}
      <p className="mt-[26px] max-w-[520px] font-sans text-[18px] leading-[28px] text-[#B7AE9F]">
        {body}
      </p>

      {/* primary action */}
      <a
        href={ctaHref}
        className="group mt-[38px] inline-flex items-center gap-2.5 rounded-full bg-[#F7F3EA] px-[30px] py-[18px] font-sans text-base font-semibold text-board transition-colors hover:bg-paper"
      >
        {ctaLabel}
        <span
          aria-hidden
          className="transition-transform motion-safe:group-hover:translate-x-0.5"
        >
          →
        </span>
      </a>

      {/* email fallback */}
      <p className="mt-5 font-sans text-sm text-[#8A7E6E]">
        or email{" "}
        <a
          href={`mailto:${email}`}
          className="underline-offset-2 transition-colors hover:text-[#B7AE9F] hover:underline"
        >
          {email}
        </a>
      </p>
    </section>
  );
}
