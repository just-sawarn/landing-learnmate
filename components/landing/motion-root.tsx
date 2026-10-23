"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/** Honours prefers-reduced-motion everywhere: transforms and layout animations are skipped, fades remain. */
export function MotionRoot({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
