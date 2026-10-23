"use client";

import { cn } from "../cn";
import { useDerived, useProgressSource, type Progress } from "./hooks";

/** Plain-prose typewriter (captions). Reserves the full text's height so nothing shifts. */
export function TypedText({
  text,
  progress,
  play,
  duration = 2000,
  delay,
  className,
}: {
  text: string;
  progress?: Progress;
  play?: boolean;
  duration?: number;
  delay?: number;
  className?: string;
}) {
  const source = useProgressSource({ progress, play, duration, delay });
  const n = useDerived(source, (v) => Math.round(Math.min(1, Math.max(0, v)) * text.length));
  return (
    <span className={cn("relative inline-block", className)}>
      <span className="invisible">{text}</span>
      <span className="absolute inset-0">
        {text.slice(0, n)}
        {n > 0 && n < text.length && <span className="lm-caret" aria-hidden="true" />}
      </span>
    </span>
  );
}
