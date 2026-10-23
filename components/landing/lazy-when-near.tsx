"use client";

import { useInView } from "motion/react";
import { useRef, type ReactNode } from "react";

/** Mounts `children` (typically a `next/dynamic` component) only once the area is near the viewport. */
export function LazyWhenNear({
  children,
  skeleton,
  minHeight,
}: {
  children: ReactNode;
  skeleton: ReactNode;
  minHeight: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const near = useInView(ref, { once: true, margin: "700px" });
  return (
    <div ref={ref} style={{ minHeight }}>
      {near ? children : skeleton}
    </div>
  );
}

export function StageSkeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-[14px] border border-line bg-surface-2 ${className ?? ""}`}
      style={{ aspectRatio: "762 / 442" }}
    />
  );
}
