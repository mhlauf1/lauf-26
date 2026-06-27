"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { StarMark } from "@/components/primitives/StarMark";

/**
 * Site-wide top nav. Rendered once in the root layout, so it lives on every
 * page. The "Lauf*" wordmark lockup is the brand mark — serif display + rust
 * StarMark, never a hardcoded asterisk.
 *
 * Desktop: inline links + status pill + CTA. Mobile (< md): wordmark + a
 * hamburger that opens a full-screen paper overlay with large serif links.
 * The active link is derived from the current pathname for wayfinding.
 */

type NavKey = "work" | "studio" | "pricing";

const LINKS: { key: NavKey; label: string; href: string }[] = [
  { key: "work", label: "Work", href: "/work" },
  { key: "studio", label: "Studio", href: "/about" },
  { key: "pricing", label: "Pricing", href: "/contact" },
];

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const active = LINKS.find(
    (link) => pathname === link.href || pathname.startsWith(`${link.href}/`),
  )?.key;

  // Close the overlay on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock background scroll + allow Esc to close while the overlay is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <nav className="relative z-50 flex items-center justify-between px-5 pt-3 sm:px-10 sm:pt-5">
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

      {/* Desktop center links */}
      <div className="hidden items-center gap-7 text-sm text-ink md:flex">
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

      {/* Desktop right cluster */}
      <div className="hidden flex-1 items-center justify-end gap-[18px] md:flex">
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

      {/* Mobile hamburger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="relative z-50 -mr-1 flex h-10 w-10 items-center justify-center md:hidden"
      >
        <span className="relative block h-[14px] w-[22px]">
          <span
            className={`absolute left-0 block h-[1.5px] w-full bg-ink transition-all duration-300 ease-out ${
              open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
            }`}
          />
          <span
            className={`absolute left-0 top-1/2 block h-[1.5px] w-full -translate-y-1/2 bg-ink transition-all duration-200 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute left-0 block h-[1.5px] w-full bg-ink transition-all duration-300 ease-out ${
              open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
            }`}
          />
        </span>
      </button>

      {/* Mobile overlay menu */}
      <div
        className={`fixed inset-0 z-40 bg-paper transition-[opacity,visibility] duration-300 md:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="flex h-full flex-col px-5 pb-10 pt-[88px]">
          <div className="flex flex-col">
            {LINKS.map((link, i) => (
              <Link
                key={link.key}
                href={link.href}
                aria-current={active === link.key ? "page" : undefined}
                className="group flex items-baseline justify-between border-b border-line py-5"
                style={{
                  transition: "opacity 0.4s ease, transform 0.4s ease",
                  transitionDelay: open ? `${120 + i * 70}ms` : "0ms",
                  opacity: open ? 1 : 0,
                  transform: open ? "translateY(0)" : "translateY(12px)",
                }}
              >
                <span
                  className={`font-garamond text-[clamp(40px,13vw,64px)] font-thin leading-[0.95] tracking-[-0.04em] transition-colors ${
                    active === link.key
                      ? "text-rust"
                      : "text-ink group-hover:text-rust"
                  }`}
                >
                  {link.label}
                </span>
                <StarMark className="text-xl opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            ))}
          </div>

          <div
            className="mt-auto flex flex-col gap-5"
            style={{
              transition: "opacity 0.4s ease",
              transitionDelay: open ? "340ms" : "0ms",
              opacity: open ? 1 : 0,
            }}
          >
            <span className="flex items-center gap-[7px] text-[13px] text-muted">
              <span className="h-[7px] w-[7px] rounded-full bg-[#3fa56a]" />2
              projects open — Q3
            </span>
            <Link
              href="/contact"
              className="flex items-center justify-center rounded-full bg-ink px-6 py-4 text-[15px] font-medium text-paper transition-colors hover:bg-rust"
            >
              Let&rsquo;s talk
            </Link>
            <a
              href="mailto:michael@lauf.co"
              className="text-center text-[14px] font-medium text-ink transition-colors hover:text-rust"
            >
              Book a call
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
