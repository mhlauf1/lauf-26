import { StarMark } from "./StarMark";

/** Small uppercase eyebrow with the star, used above every section. */
export function SectionLabel({
  children,
  star = true,
  className = "",
}: {
  children: React.ReactNode;
  star?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {star && <StarMark className="text-lg" />}
      <span className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-faint">
        {children}
      </span>
    </div>
  );
}
