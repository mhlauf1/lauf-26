"use client";

import { type CSSProperties, type ElementType, type ReactNode } from "react";
import { useInView } from "./useInView";

export type RevealLine = {
  content: ReactNode;
  /** Per-line classes — used where each headline line has its own type style. */
  className?: string;
  style?: CSSProperties;
};

type RevealLinesProps = {
  /** Each entry becomes one masked line. Plain nodes inherit the shared style. */
  lines: (RevealLine | ReactNode)[];
  /** Heading element to render (h1 / h2 / span). Default `h2`. */
  as?: ElementType;
  className?: string;
  /** Per-line stagger step (ms). */
  step?: number;
  style?: CSSProperties;
} & Record<string, unknown>;

function normalize(line: RevealLine | ReactNode): RevealLine {
  if (line && typeof line === "object" && "content" in (line as RevealLine)) {
    return line as RevealLine;
  }
  return { content: line as ReactNode };
}

/**
 * Line-level entrance for headlines. Each line is wrapped in a masking
 * `.reveal-line` (overflow-hidden in the `mask` theme) with an inner
 * `.reveal-line__inner` that the per-theme CSS animates. The container is
 * observed once; lines stagger via `--reveal-delay`.
 */
export function RevealLines({
  lines,
  as: Tag = "h2",
  className = "",
  step = 90,
  style,
  ...rest
}: RevealLinesProps) {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <Tag
      ref={ref}
      className={`reveal-lines ${className}`.trim()}
      data-inview={inView}
      style={style}
      {...rest}
    >
      {lines.map((raw, i) => {
        const line = normalize(raw);
        return (
          <span key={i} className="reveal-line">
            <span
              className={`reveal-line__inner ${line.className ?? ""}`.trim()}
              style={
                {
                  "--reveal-delay": `${i * step}ms`,
                  ...line.style,
                } as CSSProperties
              }
            >
              {line.content}
            </span>
          </span>
        );
      })}
    </Tag>
  );
}
