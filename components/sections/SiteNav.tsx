"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { StarMark } from "@/components/primitives/StarMark";

/**
 * Site-wide top nav. Rendered once in the root layout, so it lives on every
 * page. The "Lauf*" wordmark lockup is the brand mark — serif display + rust
 * StarMark, never a hardcoded asterisk.
 *
 * The active link is derived from the current pathname (underlined) so
 * wayfinding reads at a glance. Owns its own horizontal padding (px-10),
 * like the other full-bleed bands.
 */

type NavKey = "work" | "studio" | "pricing";

const LINKS: { key: NavKey; label: string; href: string }[] = [
  { key: "work", label: "Work", href: "/work" },
  { key: "studio", label: "Studio", href: "/about" },
  { key: "pricing", label: "Pricing", href: "/contact" },
];

export function SiteNav() {
  const pathname = usePathname();
  const active = LINKS.find(
    (link) => pathname === link.href || pathname.startsWith(`${link.href}/`),
  )?.key;

  return (
    <nav className="flex items-center justify-between px-10 pt-7">
      <Link
        href="/"
        aria-label="Lauf — home"
        className="flex flex-1 shrink-0 items-start gap-0.5"
      >
        <span className="font-serif text-2xl font-light leading-none tracking-tight text-ink">
          Lauf
        </span>
        <StarMark className="text-base" />
      </Link>

      <div className="flex items-center gap-7 text-sm text-ink">
        {LINKS.map((link) => (
          <Link
            key={link.key}
            href={link.href}
            aria-current={active === link.key ? "page" : undefined}
            className={`transition-colors hover:text-rust ${
              active === link.key
                ? "underline decoration-rust decoration-1 underline-offset-[6px]"
                : ""
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="flex flex-1 items-center justify-end gap-[18px]">
        <span className="flex items-center gap-[7px] text-[13px] text-muted">
          <span className="h-[7px] w-[7px] rounded-full bg-[#3fa56a]" />2
          projects open — Q3
        </span>
        <Link
          href="/contact"
          className="rounded-full bg-ink px-[18px] py-[9px] text-[13px] font-medium text-paper transition-colors hover:bg-rust"
        >
          Let&rsquo;s talk
        </Link>
        <a
          href="mailto:michael@lauf.co"
          className="text-[13px] font-medium text-ink transition-colors hover:text-rust"
        >
          Book a call
        </a>
      </div>
    </nav>
  );
}
