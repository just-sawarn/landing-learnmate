import type { Transition, Variants } from "motion/react";

/** Shared motion tokens for the landing page. */
export const EASE = [0.22, 1, 0.36, 1] as const;
export const SPRING: Transition = { type: "spring", stiffness: 260, damping: 30 };
export const VIEWPORT = { once: true, margin: "-15%" } as const;

/** Fade + rise + blur-to-sharp entrance. Use under a parent with `stagger()`. */
export const enter: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: EASE } },
};

export function stagger(gap = 0.07, delay = 0): Variants {
  return { hidden: {}, show: { transition: { staggerChildren: gap, delayChildren: delay } } };
}

/** Quick crossfade used by demo scenes for non-shared elements. */
export const sceneFade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.25, ease: EASE },
} as const;

/** Colour tokens mirrored from marketing.css for Motion colour animations. */
export const COLORS = {
  bg: "#F7F6F2",
  surface: "#FFFFFF",
  surface2: "#EFEEE9",
  ink: "#0F172A",
  ink2: "#334155",
  line: "#E2E1DB",
} as const;
