"use client";

import { AnimatePresence, motion } from "motion/react";
import { cn } from "../cn";
import { EASE } from "../motion";

/** A named variable whose value flips like a departure board when it changes. */
export function VariableBox({
  name,
  value,
  className,
}: {
  name: string;
  value: number | string | null;
  className?: string;
}) {
  return (
    <div className={cn("flex items-stretch overflow-hidden rounded-[12px] border border-ink bg-surface", className)}>
      <div className="flex items-center bg-ink px-3 font-mono text-[13px] font-semibold text-bg">{name}</div>
      <div
        className="relative flex h-11 min-w-16 flex-1 items-center justify-center overflow-hidden px-3 font-mono text-xl font-semibold text-ink"
        style={{ perspective: 200 }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={String(value)}
            initial={{ y: 18, opacity: 0, rotateX: -70 }}
            animate={{ y: 0, opacity: 1, rotateX: 0 }}
            exit={{ y: -18, opacity: 0, rotateX: 70 }}
            transition={{ duration: 0.28, ease: EASE }}
          >
            {value ?? "–"}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
