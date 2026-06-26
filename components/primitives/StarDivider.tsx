import { StarMark } from "@/components/primitives/StarMark";

/**
 * A hairline rule with the rust star centered on it — the section break.
 * `tone="dark"` switches the hairlines to a light tint for use on the dark
 * `bg-board` sections (the star stays rust either way).
 */
export function StarDivider({ tone = "light" }: { tone?: "light" | "dark" }) {
  const line = tone === "dark" ? "bg-white/15" : "bg-line";
  return (
    <div className="flex items-center gap-5" aria-hidden>
      <span className={`h-px flex-1 ${line}`} />
      <StarMark className="text-lg" />
      <span className={`h-px flex-1 ${line}`} />
    </div>
  );
}
