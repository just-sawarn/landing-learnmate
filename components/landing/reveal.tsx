"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { enter, stagger, VIEWPORT } from "./motion";

/** Fade + rise + blur-to-sharp when scrolled into view (once). */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={enter}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

/** Parent that staggers `enter` children. */
export function RevealGroup({
  children,
  className,
  gap = 0.07,
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
}) {
  return (
    <motion.div className={className} variants={stagger(gap)} initial="hidden" whileInView="show" viewport={VIEWPORT}>
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  id,
  className,
}: {
  eyebrow: string;
  title: string;
  id?: string;
  className?: string;
}) {
  return (
    <RevealGroup className={className} gap={0.08}>
      <motion.p variants={enter} className="mb-3 text-xs font-medium tracking-[0.14em] text-muted uppercase">
        {eyebrow}
      </motion.p>
      <motion.h2
        id={id}
        variants={enter}
        className="max-w-[18ch] text-[34px] leading-[1.08] font-semibold tracking-[-0.03em] text-ink sm:text-[44px]"
      >
        {title}
      </motion.h2>
    </RevealGroup>
  );
}
