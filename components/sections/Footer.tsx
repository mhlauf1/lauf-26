import { StarMark } from "@/components/primitives/StarMark";

type FooterColumn = {
  heading: string;
  links: { label: string; href: string }[];
};

const COLUMNS: FooterColumn[] = [
  {
    heading: "Explore",
    links: [
      { label: "Work", href: "/work" },
      { label: "Studio", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Connect",
    links: [
      { label: "michael@lauf.co", href: "mailto:michael@lauf.co" },
      { label: "Book a call", href: "/contact" },
      { label: "Instagram", href: "#" },
    ],
  },
];

/**
 * Full-bleed site footer — paper background, edge-to-edge, owns its own
 * px-10 padding. The "Lauf*" wordmark lockup matches the nav in Hero.tsx
 * (Newsreader display + rust StarMark, never a hardcoded asterisk).
 *
 * Two zones: a top row (wordmark + blurb on the left, vertical link lanes
 * on the right) and a hairline-divided bottom bar (colophon + a live
 * booking status with a green availability dot).
 */
export function Footer({
  blurb = "Design and development, built in-house. For people serious about how they show up online.",
  colophon = "© 2026 Lauf · Madison, WI",
  status = "Now booking — 2 projects open for Q3 2026",
  columns = COLUMNS,
}: {
  blurb?: string;
  colophon?: string;
  status?: string;
  columns?: FooterColumn[];
}) {
  return (
    <footer className="flex w-full flex-col gap-14 bg-paper px-10 pt-[72px] pb-9">
      {/* top: wordmark + blurb / link lanes */}
      <div className="flex w-full flex-wrap items-start justify-between gap-y-10">
        <div className="flex max-w-[380px] flex-col gap-4">
          <div className="flex items-baseline gap-[3px]">
            <span className="font-serif text-[34px] font-light leading-none tracking-[-0.01em] text-ink">
              Lauf
            </span>
            <StarMark className="text-xl" />
          </div>
          <p className="text-[15px] leading-[1.6] text-muted">{blurb}</p>
        </div>

        <div className="flex gap-[72px]">
          {columns.map((col) => (
            <nav
              key={col.heading}
              aria-label={col.heading}
              className="flex flex-col gap-3.5"
            >
              <span className="font-sans text-xs font-semibold uppercase tracking-[0.12em] text-faint">
                {col.heading}
              </span>
              {col.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[15px] text-ink transition-colors hover:text-rust"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          ))}
        </div>
      </div>

      {/* bottom: colophon / live status */}
      <div className="flex w-full flex-wrap items-center justify-between gap-y-3 border-t border-line pt-7">
        <span className="text-[13px] text-faint">{colophon}</span>
        <span className="flex items-center gap-2 text-[13px] font-medium text-muted">
          <span className="h-[7px] w-[7px] shrink-0 rounded-full bg-[#3fa56a]" />
          {status}
        </span>
      </div>
    </footer>
  );
}
