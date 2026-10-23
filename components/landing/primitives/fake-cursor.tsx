"use client";

import { motion } from "motion/react";

/** A pointer that glides to (x, y) in its parent and "clicks" when `pressed`. */
export function FakeCursor({
  x,
  y,
  pressed = false,
  visible = true,
}: {
  x: number;
  y: number;
  pressed?: boolean;
  visible?: boolean;
}) {
  return (
    <motion.div
      className="pointer-events-none absolute top-0 left-0 z-30"
      initial={false}
      animate={{ x, y, opacity: visible ? 1 : 0 }}
      transition={{
        x: { type: "spring", stiffness: 120, damping: 20 },
        y: { type: "spring", stiffness: 120, damping: 20 },
        opacity: { duration: 0.2 },
      }}
    >
      <motion.span
        className="absolute -top-3 -left-3 size-6 rounded-full border border-ink"
        initial={false}
        animate={pressed ? { scale: [0.4, 1.6], opacity: [0.5, 0] } : { scale: 0.4, opacity: 0 }}
        transition={{ duration: 0.45 }}
      />
      <motion.svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        initial={false}
        animate={{ scale: pressed ? 0.82 : 1 }}
        transition={{ duration: 0.12 }}
        style={{ originX: 0, originY: 0 }}
      >
        <path
          d="M3 2v15l4.2-3.6 2.8 6 2.6-1.2-2.8-5.8 5.6-.2L3 2z"
          fill="#0F172A"
          stroke="#F7F6F2"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </motion.svg>
    </motion.div>
  );
}
