"use client";

import { useMemo } from "react";
import { cn } from "../cn";
import { useDerived, useProgressSource, type Progress } from "./hooks";
import { renderLine, type Lang } from "./highlight";

export const CODE_LINE_H = 22;

type Frame = { value: string; caret: number };

/**
 * Maps progress 0–1 onto an edit. Without `from` it types `to`. With `from` it
 * backspaces the differing middle, then types the replacement.
 */
export function editFrame(from: string | undefined, to: string, k: number): Frame {
  if (from === undefined) return { value: to.slice(0, k), caret: k };
  let a = 0;
  while (a < from.length && a < to.length && from[a] === to[a]) a++;
  let b = 0;
  while (b < from.length - a && b < to.length - a && from[from.length - 1 - b] === to[to.length - 1 - b]) b++;
  const fromMid = from.slice(a, from.length - b);
  const toMid = to.slice(a, to.length - b);
  const prefix = from.slice(0, a);
  const suffix = from.slice(from.length - b);
  if (k <= fromMid.length) {
    const keep = fromMid.length - k;
    return { value: prefix + fromMid.slice(0, keep) + suffix, caret: a + keep };
  }
  const typed = k - fromMid.length;
  return { value: prefix + toMid.slice(0, typed) + suffix, caret: a + typed };
}

export function editSteps(from: string | undefined, to: string): number {
  if (from === undefined) return to.length;
  let a = 0;
  while (a < from.length && a < to.length && from[a] === to[a]) a++;
  let b = 0;
  while (b < from.length - a && b < to.length - a && from[from.length - 1 - b] === to[to.length - 1 - b]) b++;
  return from.length - a - b + (to.length - a - b);
}

type Props = {
  text: string;
  /** Start from this text and edit towards `text` (supports deleting). */
  from?: string;
  lang?: Lang;
  /** Controlled progress (scroll- or timeline-driven). */
  progress?: Progress;
  /** Timed mode. */
  play?: boolean;
  duration?: number;
  delay?: number;
  repeat?: boolean;
  repeatDelay?: number;
  caret?: boolean;
  lineNumbers?: boolean;
  className?: string;
};

export function TypewriterCode({
  text,
  from,
  lang = "python",
  progress,
  play,
  duration,
  delay,
  repeat,
  repeatDelay,
  caret = true,
  lineNumbers = false,
  className,
}: Props) {
  const source = useProgressSource({ progress, play, duration, delay, repeat, repeatDelay });
  const steps = editSteps(from, text);
  const k = useDerived(source, (v) => Math.round(Math.min(1, Math.max(0, v)) * steps));
  const { value, caret: caretPos } = editFrame(from, text, k);
  const done = k >= steps;

  const lines = value.split("\n");
  const total = useMemo(() => Math.max(text.split("\n").length, (from ?? "").split("\n").length), [text, from]);

  const starts = lines.reduce<number[]>(
    (acc, l, i) => [...acc, i === 0 ? 0 : acc[i - 1] + lines[i - 1].length + 1],
    [],
  );
  return (
    <pre
      className={cn("m-0 font-mono text-[13px] whitespace-pre", className)}
      style={{ lineHeight: `${CODE_LINE_H}px`, minHeight: total * CODE_LINE_H }}
    >
      {lines.map((line, i) => {
        const start = starts[i];
        const here =
          caret &&
          !(done && from !== undefined) &&
          !(done && k === 0) &&
          caretPos >= start &&
          caretPos <= start + line.length;
        return (
          <div key={i} className="flex">
            {lineNumbers && (
              <span className="mr-3 inline-block w-4 shrink-0 select-none text-right text-muted">{i + 1}</span>
            )}
            <span>{renderLine(line, lang, here ? caretPos - start : null)}</span>
          </div>
        );
      })}
    </pre>
  );
}
