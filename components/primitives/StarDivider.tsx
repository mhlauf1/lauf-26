import { StarMark } from "@/components/primitives/StarMark";

/** A hairline rule with the rust star centered on it — the section break. */
export function StarDivider() {
  return (
    <div className="flex items-center gap-5" aria-hidden>
      <span className="h-px flex-1 bg-line" />
      <StarMark className="text-lg" />
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}
