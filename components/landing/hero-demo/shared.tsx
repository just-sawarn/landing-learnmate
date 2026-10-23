"use client";

import { motion, type HTMLMotionProps, type MotionValue } from "motion/react";
import type { ReactNode, Ref } from "react";
import { sceneFade } from "../motion";
import type { SceneDef } from "./use-demo-timeline";

export const SCENES: readonly SceneDef[] = [
  { id: "upload", label: "Upload", duration: 2600 },
  { id: "topics", label: "Topic map", duration: 2600 },
  { id: "lesson", label: "Lesson", duration: 5200 },
  { id: "checkpoint", label: "Checkpoint", duration: 3600 },
  { id: "guru", label: "Guru", duration: 4000 },
  { id: "fixed", label: "Fixed", duration: 3400 },
];

export const CODE_LOOP = "for i in range(5):\n    print(i)";
export const CODE_BUG = "for i in range(1, 5):\n    print(i)";
export const CAPTION = "range(5) gives you five numbers, starting at zero.";
export const GURU_TEXT =
  "What's the first number range(1, 5) gives you? Compare it with what the worksheet expects on p. 6.";
export const TESTS = ["prints 5 lines", "starts at 0", "ends at 4"] as const;

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
export const lerp = (a: number, b: number, p: number) => a + (b - a) * p;

export type SceneProps = { t: MotionValue<number>; ref?: Ref<HTMLDivElement> };

/**
 * Root of a scene: the 728×336 content region. It never fades on a normal hand-off (so shared
 * `layoutId` elements stay visible mid-morph); only the loop wrap-around fades it out.
 */
export function SceneRoot({
  children,
  fadeIn = false,
  ref,
}: {
  children: ReactNode;
  fadeIn?: boolean;
  ref?: Ref<HTMLDivElement>;
}) {
  return (
    <motion.div
      ref={ref}
      className="absolute inset-x-4 top-[52px] bottom-4"
      initial={fadeIn ? { opacity: 0 } : false}
      animate={{ opacity: 1, transition: { duration: 0.4 } }}
      variants={{ gone: (wrap: boolean) => (wrap ? { opacity: 0, transition: { duration: 0.35 } } : { opacity: 1 }) }}
      exit="gone"
    >
      {children}
    </motion.div>
  );
}

/** A non-shared element: crossfades in and out with its scene. */
export function Fade({ className, children, ...rest }: HTMLMotionProps<"div">) {
  return (
    <motion.div className={className} {...sceneFade} {...rest}>
      {children}
    </motion.div>
  );
}

/**
 * Contents of a shared `loops-card` box. Fades out fast when the box starts morphing and in again
 * once it has settled, so text is never stretched by the layout transform.
 */
export function CardBody({ children, delay = 0.25 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay, duration: 0.25 } }}
      exit={{ opacity: 0, transition: { duration: 0.1 } }}
    >
      {children}
    </motion.div>
  );
}
