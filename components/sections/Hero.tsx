import { StarMark } from "@/components/primitives/StarMark";
import { verticals } from "@/lib/work";

function Nav() {
  return (
    <nav className="flex items-center justify-between px-10 pt-7">
      <div className="flex flex-1 items-center gap-7 text-sm font-medium text-ink">
        <a href="#">Work</a>
        <a href="#">Studio</a>
        <a href="#">Pricing</a>
      </div>

      <div className="flex shrink-0 items-start gap-0.5">
        <span className="font-serif text-2xl font-light leading-none tracking-tight text-ink">
          Lauf
        </span>
        <StarMark className="text-base" />
      </div>

      <div className="flex flex-1 items-center justify-end gap-[18px]">
        <span className="flex items-center gap-[7px] text-[13px] text-muted">
          <span className="h-[7px] w-[7px] rounded-full bg-[#3fa56a]" />
          2 projects open — Q3
        </span>
        <a
          href="#"
          className="rounded-full bg-ink px-[18px] py-[9px] text-[13px] font-medium text-paper"
        >
          Let&rsquo;s talk
        </a>
        <a href="#" className="text-[13px] font-medium text-ink">
          Book a call
        </a>
      </div>
    </nav>
  );
}

export function Hero() {
  return (
    <header className="w-full">
      <Nav />

      <div className="flex flex-col px-10 pt-[76px]">
        <h1 className="flex max-w-[1180px] flex-col tracking-[-0.02em] text-ink">
          <span className="flex items-start gap-[18px]">
            <span
              className="font-serif font-light leading-[0.95]"
              style={{ fontSize: "clamp(44px, 6.1vw, 88px)" }}
            >
              We design and build
            </span>
            <StarMark className="mt-2 text-[34px]" />
          </span>
          <span
            className="font-serif font-light italic leading-[1.04]"
            style={{ fontSize: "clamp(44px, 6.1vw, 88px)" }}
          >
            websites that thrive.
          </span>
        </h1>

        <p className="mt-7 max-w-[560px] text-[19px] leading-[1.55] text-[#5a5347]">
          A two-person studio for brands serious about how they show up
          online — websites, products, and the systems behind them. Designed
          and built in-house, start to finish.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-[10px]">
          <span className="mr-1.5 text-sm text-muted">
            Built for founders &amp; teams across
          </span>
          {verticals.map((v) => (
            <span
              key={v.label}
              className="flex items-center gap-[7px] rounded-full border border-line px-[14px] py-[7px] text-[13px] font-medium text-ink"
            >
              <span
                className="h-[7px] w-[7px] rounded-full"
                style={{ backgroundColor: v.color }}
              />
              {v.label}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
