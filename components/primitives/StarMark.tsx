/**
 * The Lauf star — a Fraunces asterisk in rust. The one deliberate
 * pop of color in the brand. Everything else stays ink-on-warm-white.
 */
export function StarMark({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`font-italic font-medium text-rust leading-none ${className}`}
    >
      *
    </span>
  );
}
