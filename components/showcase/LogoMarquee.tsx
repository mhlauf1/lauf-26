import { StarMark } from "@/components/primitives/StarMark";
import { projects } from "@/lib/work";

/**
 * Continuous client-name marquee on an ink band. Pure CSS (no JS),
 * seamless via a duplicated track. Pauses on hover.
 */
export function LogoMarquee({
  names = projects.map((p) => p.name),
}: {
  names?: string[];
}) {
  const Run = ({ ariaHidden = false }: { ariaHidden?: boolean }) => (
    <div
      className="flex shrink-0 items-center gap-9 pr-9"
      aria-hidden={ariaHidden}
    >
      {names.map((name) => (
        <span key={name} className="flex items-center gap-9">
          <span className="whitespace-nowrap font-serif text-[38px] font-light text-[#f7f3ea]">
            {name}
          </span>
          <StarMark className="text-[26px]" />
        </span>
      ))}
    </div>
  );

  return (
    <div className="group w-full overflow-hidden rounded-2xl bg-board py-8">
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        <Run />
        <Run ariaHidden />
      </div>
    </div>
  );
}
