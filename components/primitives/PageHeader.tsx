import { StarMark } from "@/components/primitives/StarMark";

/**
 * The standard sub-page opener: rust-star eyebrow, a light Newsreader
 * display title, and an optional lede. Matches the editorial register of
 * the homepage section heads. Owns its own horizontal padding (px-10).
 */
export function PageHeader({
  eyebrow,
  title,
  lede,
  className = "",
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  className?: string;
}) {
  return (
    <header className={`flex flex-col px-10 pt-[72px] ${className}`}>
      <span className="flex items-center gap-2">
        <StarMark className="text-sm" />
        <span className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-faint">
          {eyebrow}
        </span>
      </span>

      <h1
        className="mt-6 max-w-[1100px] font-serif font-light leading-[1.02] tracking-[-0.02em] text-ink"
        style={{ fontSize: "clamp(44px, 6vw, 84px)" }}
      >
        {title}
      </h1>

      {lede && (
        <p className="mt-7 max-w-[620px] font-sans text-[19px] leading-[1.55] text-muted">
          {lede}
        </p>
      )}
    </header>
  );
}
