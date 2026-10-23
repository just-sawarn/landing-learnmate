"use client";

import { AnimatePresence, motion } from "motion/react";
import { cn } from "../cn";
import { COLORS, SPRING } from "../motion";

export type Mastery = "weak" | "okay" | "strong";

const STYLE: Record<Mastery, { backgroundColor: string; color: string; borderColor: string }> = {
  weak: { backgroundColor: "rgba(15,23,42,0)", color: COLORS.ink, borderColor: COLORS.ink },
  okay: { backgroundColor: COLORS.surface2, color: COLORS.ink2, borderColor: "#94A3B8" },
  strong: { backgroundColor: COLORS.ink, color: COLORS.bg, borderColor: COLORS.ink },
};

/** weak = outlined, okay = tinted, strong = filled. State is weight and fill, never colour. */
export function TopicPill({ status, layoutId, className }: { status: Mastery; layoutId?: string; className?: string }) {
  return (
    <motion.span
      layout
      layoutId={layoutId}
      initial={false}
      animate={STYLE[status]}
      transition={SPRING}
      className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium", className)}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={status}
          initial={{ y: 7, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -7, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {status}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
}
