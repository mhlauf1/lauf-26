"use client";

import { type ElementType, type ReactNode } from "react";
import { useInView } from "./useInView";

type RevealProps = {
  children: ReactNode;
  /** Element to render. Default `div`. */
  as?: ElementType;
  /** Stagger position — multiplied by the per-theme step into a delay. */
  index?: number;
  /** Override the per-item stagger step (ms). */
  step?: number;
  className?: string;
  style?: React.CSSProperties;
} & Record<string, unknown>;

/**
 * Element-level entrance reveal. The visual behaviour for every theme lives in
 * CSS keyed off `html[data-anim] .reveal[data-inview="true"]` — this component
 * only flips `data-inview` when the element enters the viewport and exposes a
 * `--reveal-delay` for staggering. GPU-friendly (opacity/transform/filter).
 */
export function Reveal({
  children,
  as: Tag = "div",
  index = 0,
  step = 70,
  className = "",
  style,
  ...rest
}: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`.trim()}
      data-inview={inView}
      style={{ "--reveal-delay": `${index * step}ms`, ...style } as React.CSSProperties}
      {...rest}
    >
      {children}
    </Tag>
  );
}
