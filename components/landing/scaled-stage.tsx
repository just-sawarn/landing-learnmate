"use client";

import { motion, useMotionValue } from "motion/react";
import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

/**
 * Renders children at a fixed design size and scales the whole thing to the container width,
 * so scripted choreography never reflows at small widths. The outer box reserves its aspect
 * ratio (no layout shift). The scale is a motion `scale` value so layout animations inside
 * can account for it.
 */
export function ScaledStage({
  width,
  height,
  children,
  className,
}: {
  width: number;
  height: number;
  children: ReactNode;
  className?: string;
}) {
  const outer = useRef<HTMLDivElement>(null);
  const scale = useMotionValue(1);
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    const el = outer.current;
    if (!el) return;
    const measure = () => {
      scale.set(el.clientWidth / width);
      setReady(true);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [scale, width]);

  return (
    <div
      ref={outer}
      className={className}
      style={{ position: "relative", width: "100%", aspectRatio: `${width} / ${height}` }}
    >
      <motion.div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width,
          height,
          scale,
          originX: 0,
          originY: 0,
          opacity: ready ? 1 : 0,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
