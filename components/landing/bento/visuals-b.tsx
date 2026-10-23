"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "../cn";
import { EASE, SPRING } from "../motion";
import { TopicPill, TypewriterCode, type Mastery } from "../primitives";
import { useTicker, type VisualProps } from "./use-ticker";

/* 6 · Diagnostic quiz, weak topics found */
const OPTIONS = ["A  range(5)", "B  range(1, 5)", "C  range(0, 4)"] as const;
const TOPICS: ReadonlyArray<{ name: string; status: Mastery }> = [
  { name: "Variables", status: "strong" },
  { name: "Lists", status: "okay" },
  { name: "Loops", status: "weak" },
];

export function QuizVisual({ active, fast }: VisualProps) {
  const step = useTicker(active, fast ? 700 : 1100, 6, 5);
  const sorted = step >= 4;
  const order = sorted ? [TOPICS[2], TOPICS[1], TOPICS[0]] : TOPICS;
  return (
    <div className="grid h-[210px] grid-cols-2 gap-3 p-4">
      <div className="flex flex-col justify-center gap-1.5">
        {OPTIONS.map((o, n) => (
          <div
            key={o}
            className={cn(
              "flex items-center justify-between rounded-lg border px-2.5 py-1.5 font-mono text-xs",
              step > n && step <= 3 ? "border-ink bg-surface text-ink" : "border-line bg-surface text-ink-2",
            )}
          >
            {o}
            {step > n && n === 0 && <Check size={12} aria-hidden="true" />}
          </div>
        ))}
      </div>
      <ul className="m-0 flex list-none flex-col justify-center gap-1.5 p-0">
        {order.map((t) => (
          <motion.li
            key={t.name}
            layout
            transition={SPRING}
            className="flex items-center justify-between rounded-lg bg-surface px-2.5 py-1.5 text-xs font-medium text-ink"
          >
            {t.name}
            <TopicPill status={t.status} />
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

/* 7 · A plan that adapts */
export function PlanVisual({ active, fast }: VisualProps) {
  const flipped = useTicker(active, fast ? 1300 : 2200, 2, 1) === 1;
  const face =
    "absolute inset-0 flex flex-col justify-center gap-1.5 rounded-[14px] border border-ink bg-surface p-4 [backface-visibility:hidden]";
  return (
    <div className="flex h-[210px] items-center justify-center" style={{ perspective: 800 }}>
      <motion.div
        className="relative h-[130px] w-[220px]"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: EASE }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className={face}>
          <span className="text-xs font-semibold tracking-wide text-muted uppercase">Plan v1</span>
          <span className="text-[13px] text-ink">1 · Loops 2 · Lists 3 · Functions</span>
        </div>
        <div className={cn(face, "[transform:rotateY(180deg)]")}>
          <span className="text-xs font-semibold tracking-wide text-muted uppercase">Plan v2</span>
          <span className="text-[13px] text-ink">1 · Lists 2 · Functions</span>
          <span className="text-xs text-ink-2">Loops moved to strong.</span>
        </div>
      </motion.div>
    </div>
  );
}

/* 8 · Progress across attempts */
export function ProgressVisual({ active }: VisualProps) {
  const [run, setRun] = useState(0);
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setRun((r) => r + 1), 3600);
    return () => clearInterval(id);
  }, [active]);
  const pts: Array<[number, number]> = [
    [30, 120],
    [150, 80],
    [270, 32],
  ];
  return (
    <div className="flex h-[210px] items-center justify-center">
      <svg key={run} viewBox="0 0 300 170" className="w-[88%]" fill="none">
        <path d="M20 140H290M20 20V140" stroke="#E2E1DB" strokeWidth="1.5" />
        <motion.path
          d="M30 120 L150 80 L270 32"
          stroke="#0F172A"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.6, ease: EASE }}
        />
        {pts.map(([x, y], n) => (
          <g key={n}>
            <motion.circle
              cx={x}
              cy={y}
              r="5"
              fill="#0F172A"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + n * 0.55 }}
            />
            <text x={x} y="158" textAnchor="middle" fontSize="12" fill="#5A6A80">
              Attempt {n + 1}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/* 9 · Instant tips while you type */
export function TipsVisual({ active }: VisualProps) {
  const [cycle, setCycle] = useState(0);
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setCycle((c) => c + 1), 4600);
    return () => clearInterval(id);
  }, [active]);
  return (
    <div className="flex h-[210px] flex-col justify-center gap-3 px-6">
      <div className="rounded-[10px] bg-surface p-3">
        <TypewriterCode key={cycle} text="for i in range(1, 5):" play={active} duration={1600} />
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={cycle}
          className="flex items-center gap-2 self-start rounded-full border border-ink bg-surface px-3 py-1 text-xs text-ink"
          initial={{ opacity: 0, y: 8, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1.9, ...SPRING }}
        >
          <span className="font-semibold">Groq</span> starts at 1, not 0
          <span className="font-mono text-muted">0.4s</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* 10 · Hindi and spoken summaries */
export function HindiVisual({ active, fast }: VisualProps) {
  const hi = useTicker(active, fast ? 1300 : 2200, 2, 0) === 1;
  return (
    <div className="flex h-[210px] flex-col justify-center gap-4 px-6">
      <div className="flex items-center gap-3">
        <div className="relative flex rounded-full border border-line bg-surface p-0.5 text-xs font-semibold">
          <motion.span
            className="absolute inset-y-0.5 w-[44px] rounded-full bg-ink"
            animate={{ x: hi ? 44 : 0 }}
            transition={SPRING}
          />
          <span className={cn("relative w-[44px] py-1 text-center", hi ? "text-ink-2" : "text-bg")}>EN</span>
          <span className={cn("relative w-[44px] py-1 text-center", hi ? "text-bg" : "text-ink-2")}>हिं</span>
        </div>
        <AnimatePresence mode="wait">
          <motion.span
            key={String(hi)}
            className="text-[15px] text-ink"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {hi ? "range(5) में पाँच संख्याएँ मिलती हैं" : "range(5) gives you five numbers"}
          </motion.span>
        </AnimatePresence>
      </div>
      <div className="flex h-10 items-center gap-1">
        {Array.from({ length: 28 }, (_, n) => (
          <motion.span
            key={n}
            className="h-full w-1 origin-center rounded-full bg-ink"
            initial={{ scaleY: 0.2 }}
            animate={active ? { scaleY: [0.2, 0.4 + ((n * 37) % 60) / 100, 0.2] } : { scaleY: 0.35 }}
            transition={{ duration: 0.9 + (n % 5) * 0.12, repeat: Infinity, delay: n * 0.04 }}
          />
        ))}
      </div>
    </div>
  );
}
