/**
 * Shared shell for the hero typography studies (/kit only).
 * Mirrors the real Hero's padding + subhead so each study can be judged at
 * true scale, but drops SiteNav and the tag-pills to keep focus on the
 * headline. The headline markup is passed as children.
 */
export function HeroStudyShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col px-10 py-6">
      {children}
      <p className="mt-7 max-w-[560px] text-[19px] leading-[1.55] text-[#5a5347]">
        A two-person studio for brands serious about how they show up
        online — websites, products, and the systems behind them. Designed
        and built in-house, start to finish.
      </p>
    </div>
  );
}

/** Base size shared by every study line — keep variants comparable. */
export const HEAD_SIZE = "clamp(44px, 6.1vw, 88px)";
