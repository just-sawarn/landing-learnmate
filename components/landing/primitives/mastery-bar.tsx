"use client";

import { motion, useTransform } from "motion/react";
import { cn } from "../cn";
import { useAnimatedValue, useDerived } from "./hooks";
import type { MotionValue } from "motion/react";

/** Mastery 0–100. Animates to new numbers, or follows a MotionValue. */
export function MasteryBar({
  label,
  value,
  className,
}: {
  label: string;
  value: number | MotionValue<number>;
  className?: string;
}) {
  const mv = useAnimatedValue(value);
  const scaleX = useTransform(mv, (v) => Math.min(1, Math.max(0, v / 100)));
  const pct = useDerived(mv, (v) => Math.round(v));
  return (
    <div className={cn("w-full", className)}>
      <div className="mb-1 flex items-baseline justify-between text-xs">
        <span className="font-medium text-ink">{label}</span>
        <span className="font-mono text-ink-2 tabular-nums">{pct}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-surface-2">
        <motion.div className="h-full origin-left rounded-full bg-ink" style={{ scaleX }} />
      </div>
    </div>
  );
}
