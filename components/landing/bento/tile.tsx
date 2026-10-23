"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState, type ReactNode } from "react";
import { cn } from "../cn";
import { enter } from "../motion";
import type { VisualProps } from "./use-ticker";

export function Tile({
  title,
  body,
  className,
  visualClassName,
  children,
}: {
  title: string;
  body: string;
  className?: string;
  visualClassName?: string;
  children: (v: VisualProps) => ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "100px" });
  const [hover, setHover] = useState(false);
  return (
    <motion.article
      ref={ref}
      variants={enter}
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      className={cn(
        "flex flex-col rounded-[24px] border border-line bg-surface p-5 shadow-raised transition-colors duration-200 hover:border-ink/35",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className={cn("relative mb-5 overflow-hidden rounded-[14px] bg-surface-2", visualClassName)}
      >
        {children({ active: inView, fast: hover })}
      </div>
      <h3 className="m-0 text-[19px] font-semibold tracking-[-0.02em] text-ink">{title}</h3>
      <p className="mt-1.5 mb-0 text-[15px] leading-[1.55] text-ink-2">{body}</p>
    </motion.article>
  );
}
