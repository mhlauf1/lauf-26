import Image from "next/image";
import { StarMark } from "@/components/primitives/StarMark";
import { projects, type Project } from "@/lib/work";

type Props = {
  /** Project whose screenshots fill the device frames. Defaults to Playbook (web + mobile). */
  project?: Project;
  /** Domain shown in the browser address bar. */
  url?: string;
  /** Small uppercase eyebrow label. */
  label?: string;
};

const fallback = projects.find((p) => p.slug === "playbook") ?? projects[0];

/**
 * "F08 Devices" — a desktop browser window with a phone frame overlapping its
 * bottom-right corner, both holding a project's screenshots. The browser chrome
 * (traffic-light dots, address pill) and the phone (notch, rounded bezel) are
 * built in pure CSS — no external assets. The whole stage sits on a cream board.
 *
 * Reads from lib/work.ts. Renders full-width with no outer horizontal padding.
 */
export function DeviceMockups({
  project = fallback,
  url = "playbookexp.com",
  label = "Devices",
}: Props) {
  const shot = project.image;

  return (
    <div className="flex w-full flex-col gap-[18px]">
      {/* eyebrow */}
      <span className="flex items-center gap-3">
        <StarMark className="text-sm" />
        <span className="font-sans text-[13px] font-semibold uppercase tracking-[0.12em] text-ink">
          {label}
        </span>
      </span>

      {/* stage */}
      <div className="relative w-full overflow-hidden rounded-2xl bg-cream p-6 sm:p-10 lg:p-14">
        {/* browser window */}
        <div className="w-full max-w-[920px] overflow-hidden rounded-[14px] bg-white shadow-[0_26px_60px_rgba(20,20,20,0.14)]">
          {/* chrome bar */}
          <div className="flex items-center gap-[14px] border-b border-line bg-[#F3F0EA] px-[18px] py-3">
            <div className="flex shrink-0 gap-[7px]" aria-hidden>
              <span className="h-[11px] w-[11px] rounded-full bg-[#ED6A5E]" />
              <span className="h-[11px] w-[11px] rounded-full bg-[#F4BF4F]" />
              <span className="h-[11px] w-[11px] rounded-full bg-[#61C554]" />
            </div>
            <div className="ml-2 flex items-center gap-2 rounded-lg bg-white px-4 py-1.5">
              <span className="font-sans text-xs text-faint">{url}</span>
            </div>
          </div>

          {/* viewport */}
          <div className="relative aspect-[920/502] w-full overflow-hidden bg-board">
            {shot ? (
              <Image
                src={shot}
                alt={`${project.name} — ${project.blurb}`}
                fill
                sizes="(max-width: 1024px) 90vw, 920px"
                className="object-cover"
              />
            ) : null}
          </div>
        </div>

        {/* phone — overlaps the browser's bottom-right corner */}
        <div className="pointer-events-none absolute bottom-0 right-4 hidden w-[180px] rounded-[30px] bg-board p-[7px] shadow-[0_30px_60px_rgba(20,20,20,0.22)] sm:right-8 sm:block sm:w-[200px] lg:right-16 lg:w-[228px] lg:rounded-[36px] lg:p-[9px]">
          <div className="relative aspect-[210/446] w-full overflow-hidden rounded-[22px] bg-paper lg:rounded-[28px]">
            {/* notch */}
            <span
              className="absolute left-1/2 top-0 z-10 h-5 w-[84px] -translate-x-1/2 rounded-b-[14px] bg-board lg:h-6 lg:w-24"
              aria-hidden
            />
            {shot ? (
              <Image
                src={shot}
                alt=""
                fill
                sizes="228px"
                className="object-cover object-top"
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
