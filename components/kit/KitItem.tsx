import { StarMark } from "@/components/primitives/StarMark";

/** A labeled slot in the /kit playground. */
export function KitItem({
  id,
  title,
  note,
  bleed = false,
  children,
}: {
  id: string;
  title: string;
  note?: string;
  bleed?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-line py-14">
      <div className="mb-7 flex flex-wrap items-center gap-3 px-10">
        <StarMark className="text-lg" />
        <span className="font-sans text-[13px] font-semibold uppercase tracking-[0.12em] text-ink">
          {id} · {title}
        </span>
        {note && <span className="text-[13px] text-faint">— {note}</span>}
      </div>
      <div className={bleed ? "" : "px-10"}>{children}</div>
    </section>
  );
}
