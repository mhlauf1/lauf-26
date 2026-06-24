import Image from "next/image";
import { projects, bySlug, type Project } from "@/lib/work";

/**
 * "Card Row" — a horizontal strip of work "sticker" cards sitting just
 * below the hero. Each card is a tall (320px) rounded tile: either a
 * cover-image card with a gradient scrim, or a solid tinted block in the
 * project's accent. A couple of color cards tilt slightly for that
 * sticker-on-the-page feel.
 *
 * Content is sourced from lib/work.ts. The default arrangement mirrors the
 * Paper design (Embark image, Cadence cream, Body Biz pink, Playbook image,
 * STOC green); pass `cards` to override.
 */

type CardConfig = {
  slug: string;
  /** force solid tinted block even when the project has a cover image */
  solid?: boolean;
  /** override eyebrow label (defaults to the project's vertical, uppercased) */
  eyebrow?: string;
  /** slight sticker tilt in degrees */
  tilt?: number;
};

const DEFAULT_CARDS: CardConfig[] = [
  { slug: "embark", eyebrow: "FLAGSHIP — PET SERVICES" },
  { slug: "cadence", solid: true },
  { slug: "the-body-biz", solid: true, tilt: -1.5 },
  { slug: "playbook" },
  { slug: "stoc-advisory", solid: true, tilt: 1.5 },
];

/** cream card reads as "light" — dark ink text instead of white */
const CREAM = "#efe8da";

function isLight(hex: string) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  // perceived luminance
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.7;
}

function Card({ project, config }: { project: Project; config: CardConfig }) {
  const showImage = !config.solid && Boolean(project.image);
  const eyebrow = config.eyebrow ?? project.vertical.toUpperCase();
  const bg = config.slug === "cadence" ? CREAM : project.accent;
  const light = !showImage && isLight(bg);

  // text colors: image + dark-solid cards use white-ish; cream uses ink
  const eyebrowColor = showImage
    ? "rgba(255,255,255,0.82)"
    : light
      ? "#8a8270"
      : "rgba(255,255,255,0.85)";
  const titleColor = light ? "#1f2418" : "#ffffff";
  const nameColor = showImage
    ? "rgba(237,230,218,0.92)"
    : light
      ? "#8a8270"
      : "rgba(255,255,255,0.82)";

  return (
    <article
      className="relative flex h-[320px] min-w-0 flex-1 flex-col justify-between overflow-clip rounded-[14px] p-[22px] shadow-[0_18px_40px_rgba(20,20,20,0.12)]"
      style={{
        backgroundColor: showImage ? undefined : bg,
        rotate: config.tilt ? `${config.tilt}deg` : undefined,
      }}
    >
      {showImage && (
        <>
          <Image
            src={project.image!}
            alt={`${project.name} — ${project.blurb}`}
            fill
            sizes="(max-width: 1024px) 50vw, 280px"
            className="object-cover"
          />
          {/* top-to-bottom scrim so the eyebrow and tagline stay legible */}
          <span
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(20,20,20,0.45) 0%, rgba(20,20,20,0.05) 38%, rgba(20,20,20,0.78) 100%)",
            }}
          />
        </>
      )}

      <span
        className="relative font-sans text-xs font-semibold uppercase leading-4 tracking-[0.12em]"
        style={{ color: eyebrowColor }}
      >
        {eyebrow}
      </span>

      <div className="relative flex flex-col gap-2">
        <p
          className="whitespace-pre-line font-serif text-[30px] font-normal italic leading-[31px]"
          style={{ color: titleColor }}
        >
          {project.tagline}
        </p>
        <span
          className="font-sans text-[13px] font-medium leading-4"
          style={{ color: nameColor }}
        >
          {project.name}
        </span>
      </div>
    </article>
  );
}

export function CardStrip({ cards = DEFAULT_CARDS }: { cards?: CardConfig[] }) {
  const resolved = cards
    .map((c) => ({ config: c, project: bySlug(c.slug) }))
    .filter((x): x is { config: CardConfig; project: Project } =>
      Boolean(x.project),
    );

  // fall back to the full work list if an empty override is passed
  const items =
    resolved.length > 0
      ? resolved
      : projects.map((p) => ({ config: { slug: p.slug }, project: p }));

  return (
    <div className="flex w-full items-stretch gap-[18px]">
      {items.map(({ config, project }) => (
        <Card key={project.slug} project={project} config={config} />
      ))}
    </div>
  );
}
