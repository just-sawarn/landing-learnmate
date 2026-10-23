"use client";

import { motion } from "motion/react";
import { cn } from "../cn";
import { useDerived, useProgressSource, type Progress } from "./hooks";
import { ProviderBadge } from "./provider-badge";

export function TypingDots({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1", className)} aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="size-1.5 rounded-full bg-muted"
          animate={{ y: [0, -4, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.14 }}
        />
      ))}
    </span>
  );
}

/** Guru's chat bubble: streams its text word by word. */
export function GuruBubble({
  text,
  progress,
  play,
  duration = 2400,
  delay,
  badge = true,
  className,
}: {
  text: string;
  progress?: Progress;
  play?: boolean;
  duration?: number;
  delay?: number;
  badge?: boolean;
  className?: string;
}) {
  const source = useProgressSource({ progress, play, duration, delay });
  const words = text.split(" ");
  const count = useDerived(source, (v) => Math.round(Math.min(1, Math.max(0, v)) * words.length));
  return (
    <div className={cn("rounded-[14px] border border-line bg-surface p-3 shadow-raised", className)}>
      <div className="mb-1.5 flex items-center gap-2">
        <span className="flex size-6 items-center justify-center rounded-full bg-ink text-xs font-semibold text-bg">
          G
        </span>
        <span className="text-xs font-semibold text-ink">Guru</span>
        {badge && <ProviderBadge provider="Claude" className="ml-auto" />}
      </div>
      <p className="relative m-0 text-[13px] leading-[1.5] text-ink-2">
        <span className="invisible">{text}</span>
        <span className="absolute inset-0">
          {words.slice(0, count).map((w, i) => (
            <motion.span key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
              {w}{" "}
            </motion.span>
          ))}
        </span>
      </p>
    </div>
  );
}
