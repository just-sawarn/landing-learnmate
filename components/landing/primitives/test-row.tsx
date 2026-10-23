"use client";

import { AnimatePresence, motion } from "motion/react";
import { cn } from "../cn";
import { SPRING } from "../motion";

export type TestState = "idle" | "running" | "pass" | "fail";

export function TestIcon({ state }: { state: TestState }) {
  return (
    <span className="relative inline-block size-[18px]">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.svg
          key={state}
          viewBox="0 0 18 18"
          className="absolute inset-0 size-[18px]"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={SPRING}
          fill="none"
        >
          {state === "pass" && (
            <>
              <circle cx="9" cy="9" r="8.5" fill="#0F172A" />
              <motion.path
                d="M5.2 9.3 7.8 11.9 12.8 6.4"
                stroke="#F7F6F2"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.3, delay: 0.08 }}
              />
            </>
          )}
          {state === "fail" && (
            <>
              <circle cx="9" cy="9" r="7.8" stroke="#0F172A" strokeWidth="1.6" />
              <path d="M6.2 6.2 11.8 11.8M11.8 6.2 6.2 11.8" stroke="#0F172A" strokeWidth="1.6" strokeLinecap="round" />
            </>
          )}
          {state === "idle" && (
            <circle cx="9" cy="9" r="7.8" stroke="#64748B" strokeWidth="1.4" strokeDasharray="2.5 2.5" />
          )}
          {state === "running" && (
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, ease: "linear", repeat: Infinity }}
              style={{ originX: "9px", originY: "9px" }}
            >
              <circle cx="9" cy="9" r="7.8" stroke="#E2E1DB" strokeWidth="1.6" />
              <path d="M9 1.2a7.8 7.8 0 0 1 7.8 7.8" stroke="#0F172A" strokeWidth="1.6" strokeLinecap="round" />
            </motion.g>
          )}
        </motion.svg>
      </AnimatePresence>
    </span>
  );
}

const STATE_LABEL: Record<TestState, string> = { idle: "hidden", running: "running", pass: "passed", fail: "failed" };

export function TestRow({ label, state, className }: { label: string; state: TestState; className?: string }) {
  return (
    <div
      className={cn(
        "flex items-center gap-2.5 rounded-[10px] border bg-surface px-3 py-[5px]",
        state === "fail" ? "border-ink" : "border-line",
        className,
      )}
    >
      <TestIcon state={state} />
      <span className="font-mono text-xs text-ink-2">{label}</span>
      <span className="ml-auto font-mono text-xs text-muted">{STATE_LABEL[state]}</span>
    </div>
  );
}
