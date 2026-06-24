import { projects } from "@/lib/work";

/**
 * Static trusted-by band: a small uppercase eyebrow over a single
 * justified row of client names. Distinct from <LogoMarquee/> (which
 * scrolls) — this one is a still, editorial proof block.
 *
 * Full-bleed: owns its own horizontal padding (px-10), so place it
 * OUTSIDE the page's px-10 wrapper, not inside it.
 */
export function TrustedBy({
  label = "Trusted by the teams behind",
  names = projects.map((p) => p.name),
}: {
  label?: string;
  names?: string[];
}) {
  return (
    <section aria-label={label} className="flex w-full flex-col gap-7 px-10 pt-22">
      <p className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-faint">
        {label}
      </p>
      <ul className="flex w-full flex-wrap items-center justify-between gap-6">
        {names.map((name) => (
          <li
            key={name}
            className="font-serif text-[27px] font-normal leading-[34px] text-[#3A352E]"
          >
            {name}
          </li>
        ))}
      </ul>
    </section>
  );
}
