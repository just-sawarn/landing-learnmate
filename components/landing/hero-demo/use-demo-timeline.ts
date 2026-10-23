"use client";

import { motionValue, type MotionValue } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type SceneDef = { id: string; label: string; duration: number };

/**
 * One timeline for the whole demo. Each scene owns a MotionValue holding its elapsed ms;
 * only the active scene's value advances, so a scene that is animating out keeps its last frame.
 */
export function useDemoTimeline(scenes: readonly SceneDef[], running: boolean) {
  const times = useMemo<MotionValue<number>[]>(() => scenes.map(() => motionValue(0)), [scenes]);
  const [index, setIndex] = useState(0);
  const [wrapped, setWrapped] = useState(false);
  const indexRef = useRef(0);

  const goTo = useCallback(
    (next: number) => {
      times[next].set(0);
      setWrapped(next <= indexRef.current);
      indexRef.current = next;
      setIndex(next);
    },
    [times],
  );

  useEffect(() => {
    if (!running) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(now - last, 100);
      last = now;
      const i = indexRef.current;
      const next = times[i].get() + dt;
      if (next >= scenes[i].duration) {
        times[i].set(scenes[i].duration);
        goTo((i + 1) % scenes.length);
      } else {
        times[i].set(next);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running, scenes, times, goTo]);

  return { index, wrapped, times, goTo };
}
