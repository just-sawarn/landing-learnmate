"use client";

import { useEffect, useState } from "react";
import { useReduced } from "../use-reduced";

/** Cycles 0..count-1 every `ms` while `active`. With reduced motion it holds `staticIndex`. */
export function useTicker(active: boolean, ms: number, count: number, staticIndex = count - 1): number {
  const reduce = useReduced();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!active || reduce) return;
    const id = setInterval(() => setI((v) => (v + 1) % count), ms);
    return () => clearInterval(id);
  }, [active, reduce, ms, count]);
  return reduce ? staticIndex : i;
}

export type VisualProps = { active: boolean; fast: boolean };
