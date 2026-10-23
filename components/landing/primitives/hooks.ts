"use client";

import { useEffect, useRef, useState } from "react";
import { useReduced } from "../use-reduced";
import {
  animate,
  isMotionValue,
  useMotionValue,
  useMotionValueEvent,
  type MotionValue,
  type Transition,
} from "motion/react";

/** A 0–1 value, either set by a parent (number / MotionValue) or driven by `play`. */
export type Progress = number | MotionValue<number>;

type SourceOptions = {
  progress?: Progress;
  play?: boolean;
  /** ms */
  duration?: number;
  /** ms */
  delay?: number;
  repeat?: boolean;
  /** ms */
  repeatDelay?: number;
};

/**
 * Normalises "controlled" (`progress`) and "timed" (`play`) usage into one MotionValue.
 * With reduced motion a timed source jumps to its final frame.
 */
export function useProgressSource({
  progress,
  play = false,
  duration = 1500,
  delay = 0,
  repeat = false,
  repeatDelay = 0,
}: SourceOptions): MotionValue<number> {
  const own = useMotionValue(typeof progress === "number" ? progress : 0);
  const reduce = useReduced();

  useEffect(() => {
    if (typeof progress === "number") own.set(progress);
  }, [progress, own]);

  useEffect(() => {
    if (progress !== undefined) return;
    if (reduce) {
      own.set(1);
      return;
    }
    if (!play) return;
    own.set(0);
    const controls = animate(own, 1, {
      duration: duration / 1000,
      delay: delay / 1000,
      ease: "linear",
      repeat: repeat ? Infinity : 0,
      repeatDelay: repeatDelay / 1000,
    });
    return () => controls.stop();
  }, [progress, play, duration, delay, repeat, repeatDelay, reduce, own]);

  return isMotionValue(progress) ? progress : own;
}

/** Subscribes to a MotionValue but only re-renders when the derived primitive changes. */
export function useDerived<T extends string | number | boolean>(mv: MotionValue<number>, fn: (v: number) => T): T {
  const fnRef = useRef(fn);
  useEffect(() => {
    fnRef.current = fn;
  });
  const [state, setState] = useState<T>(() => fn(mv.get()));
  useEffect(() => setState(fnRef.current(mv.get())), [mv]);
  useMotionValueEvent(mv, "change", (v) => setState(fnRef.current(v)));
  return state;
}

/** How many thresholds `t` has passed — a cheap discrete "step" for scripted scenes. */
export function useStep(t: MotionValue<number>, thresholds: readonly number[]): number {
  return useDerived(t, (v) => thresholds.filter((x) => v >= x).length);
}

/** Returns a MotionValue that eases toward `value` when a plain number changes. */
export function useAnimatedValue(
  value: number | MotionValue<number>,
  transition: Transition = { duration: 1, ease: [0.22, 1, 0.36, 1] },
): MotionValue<number> {
  const mv = useMotionValue(isMotionValue(value) ? value.get() : value);
  const reduce = useReduced();
  useEffect(() => {
    if (isMotionValue(value)) {
      mv.set(value.get());
      return value.on("change", (v) => mv.set(v));
    }
    if (reduce) {
      mv.set(value);
      return;
    }
    const controls = animate(mv, value, transition);
    return () => controls.stop();
    // transition is intentionally excluded: callers pass inline objects.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, mv, reduce]);
  return mv;
}

/**
 * Derives a MotionValue from another without writing during render (Motion's `useTransform`
 * does, which trips React when a child subscribes with setState). Linear ramp, clamped.
 */
export function useRamp(
  src: MotionValue<number>,
  inMin: number,
  inMax: number,
  outMin = 0,
  outMax = 1,
): MotionValue<number> {
  const map = (v: number) => outMin + (outMax - outMin) * Math.min(1, Math.max(0, (v - inMin) / (inMax - inMin)));
  const out = useMotionValue(map(src.get()));
  useEffect(() => {
    const update = () => out.set(map(src.get()));
    update();
    return src.on("change", update);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, out, inMin, inMax, outMin, outMax]);
  return out;
}
