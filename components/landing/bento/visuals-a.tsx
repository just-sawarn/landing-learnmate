"use client";

import { AnimatePresence, motion } from "motion/react";
import { Lock, LockOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "../cn";
import { EASE, SPRING } from "../motion";
import { PageChip, TypewriterCode, VariableBox } from "../primitives";
import { ScaledStage } from "../scaled-stage";
import { useTicker, type VisualProps } from "./use-ticker";

const fadeSwap = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.3, ease: EASE },
} as const;

/* 1 · Animated explainer lessons */
function CountingBox({ active }: { active: boolean }) {
  const i = useTicker(active, 520, 5);
  return <VariableBox name="i" value={i} className="w-48" />;
}

export function LessonsVisual({ active, fast }: VisualProps) {
  const scene = useTicker(active, fast ? 1800 : 2800, 3);
  return (
    <ScaledStage width={520} height={290}>
      <div className="absolute inset-4 flex flex-col overflow-hidden rounded-[12px] border border-line bg-surface">
        <div className="flex h-8 items-center justify-between border-b border-line px-3 text-xs font-semibold text-ink">
          Loops <PageChip page={6} />
        </div>
        <div className="relative flex-1">
          <AnimatePresence mode="wait">
            {scene === 0 && (
              <motion.div key="code" className="absolute inset-0 p-5" {...fadeSwap}>
                <div className="rounded-[10px] bg-surface-2 p-4">
                  <TypewriterCode
                    text={"for i in range(5):\n    print(i)"}
                    play={active}
                    duration={1500}
                    repeat={false}
                  />
                </div>
              </motion.div>
            )}
            {scene === 1 && (
              <motion.div key="var" className="absolute inset-0 flex items-center justify-center gap-4" {...fadeSwap}>
                <span className="font-mono text-sm text-ink-2">print(i) →</span>
                <CountingBox active={active} />
              </motion.div>
            )}
            {scene === 2 && (
              <motion.div key="flow" className="absolute inset-0 flex items-center justify-center" {...fadeSwap}>
                <div className="relative h-[110px] w-[260px]">
                  {["start", "i in range(5)?", "print(i)"].map((l, n) => (
                    <span
                      key={l}
                      className="absolute left-[60px] flex h-7 w-[140px] items-center justify-center rounded-lg border border-ink bg-surface font-mono text-xs"
                      style={{ top: n * 40 }}
                    >
                      {l}
                    </span>
                  ))}
                  <motion.span
                    className="absolute top-0 left-0 size-3 rounded-full bg-ink"
                    animate={{ x: [124, 124, 124, 230, 230, 124], y: [10, 50, 90, 90, 50, 50] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="flex h-9 items-center gap-3 border-t border-line px-3">
          <span className="font-mono text-xs text-ink-2">
            {["range(5) gives five numbers", "i ticks from 0 to 4", "the loop repeats"][scene]}
          </span>
          <div className="ml-auto h-1 w-28 rounded-full bg-line">
            <motion.div
              className="h-full origin-left rounded-full bg-ink"
              animate={{ scaleX: (scene + 1) / 3 }}
              transition={{ duration: 0.6, ease: EASE }}
            />
          </div>
        </div>
      </div>
    </ScaledStage>
  );
}

/* 2 · Run real code beside the lesson */
const LANGS = [
  { name: "Python", code: 'print("hello")', out: "hello" },
  { name: "JavaScript", code: 'console.log("hello");', out: "hello" },
  { name: "C++", code: 'std::cout << "hello";', out: "hello" },
  { name: "Java", code: 'System.out.println("hello");', out: "hello" },
  { name: "React", code: "<h1>hello</h1>", out: "hello (rendered)" },
] as const;

export function IdeVisual({ active, fast }: VisualProps) {
  const i = useTicker(active, fast ? 1400 : 2200, LANGS.length, 0);
  const lang = LANGS[i];
  return (
    <ScaledStage width={520} height={290}>
      <div className="absolute inset-4 flex flex-col overflow-hidden rounded-[12px] border border-line bg-surface">
        <div className="flex h-9 items-center gap-1 border-b border-line px-2">
          {LANGS.map((l, n) => (
            <span key={l.name} className="relative rounded-md px-2.5 py-1 text-xs font-medium text-ink-2">
              {n === i && (
                <motion.span layoutId="ide-tab" className="absolute inset-0 rounded-md bg-ink" transition={SPRING} />
              )}
              <span className={cn("relative", n === i && "text-bg")}>{l.name}</span>
            </span>
          ))}
        </div>
        <div className="relative m-3 flex-1 rounded-[10px] bg-surface-2 p-4">
          <AnimatePresence mode="wait">
            <motion.div key={lang.name} {...fadeSwap}>
              <TypewriterCode
                text={lang.code}
                lang={lang.name === "Python" ? "python" : "js"}
                progress={1}
                caret={false}
              />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mx-3 mb-3 h-[58px] rounded-[10px] bg-ink px-3 py-2 font-mono text-[13px] text-bg">
          <div className="text-bg/60">$ run</div>
          <AnimatePresence mode="wait">
            <motion.div
              key={lang.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.25 }}
            >
              {lang.out}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </ScaledStage>
  );
}

/* 3 · Guru teaches, doesn't tell */
const RUNGS = ["Ask a guiding question", "Name the concept (p. 6)", "Show a partial fix"] as const;

export function GuruLadderVisual({ active, fast }: VisualProps) {
  const step = useTicker(active, fast ? 900 : 1500, 4, 2);
  const unlocked = step >= 3;
  return (
    <div className="flex h-[210px] flex-col justify-center gap-2 px-5">
      {RUNGS.map((r, n) => (
        <div
          key={r}
          className={cn(
            "flex items-center gap-2.5 rounded-[10px] border px-3 py-2 text-[13px] transition-colors duration-300",
            step === n ? "border-ink bg-ink text-bg" : "border-line bg-surface text-ink-2",
          )}
        >
          <span className="flex size-5 items-center justify-center rounded-full border border-current font-mono text-xs">
            {n + 1}
          </span>
          {r}
        </div>
      ))}
      <div className="flex items-center gap-2 pl-1 text-[13px] text-ink-2">
        {unlocked ? <LockOpen size={14} aria-hidden="true" /> : <Lock size={14} aria-hidden="true" />}
        Full solution {unlocked ? "unlocked" : "locked until asked twice"}
      </div>
    </div>
  );
}

/* 4 · Every answer cites its page */
export function CitesVisual({ active, fast }: VisualProps) {
  const line = useTicker(active, fast ? 1000 : 1700, 4, 1);
  return (
    <div className="flex h-[210px] items-center gap-4 px-5">
      <p className="m-0 flex-1 text-[13px] leading-[1.55] text-ink-2">
        range stops before the end value, like a fence with posts numbered from 0.{" "}
        <PageChip page={6} className="align-middle" />
      </p>
      <div className="w-[88px] shrink-0 rounded-[8px] border border-ink bg-surface p-2">
        <p className="m-0 mb-1.5 font-mono text-xs text-muted">p. 6</p>
        {[0, 1, 2, 3].map((n) => (
          <motion.div
            key={n}
            className="mb-1.5 h-2 rounded-full"
            animate={{ backgroundColor: n === line ? "#0F172A" : "#E2E1DB" }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </div>
  );
}

/* 5 · Honest when it doesn't know */
export function HonestVisual({ active }: VisualProps) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setShown((s) => !s), 2200);
    return () => clearInterval(id);
  }, [active]);
  return (
    <div className="flex h-[210px] flex-col justify-center gap-2.5 px-5">
      <div className="self-end rounded-[12px] bg-ink px-3 py-1.5 text-[13px] text-bg">How do I use pandas?</div>
      <AnimatePresence mode="wait">
        {shown && (
          <motion.div
            key="reply"
            className="rounded-[12px] border border-line bg-surface p-3"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <span className="mb-1.5 inline-block rounded-full bg-amber-bg px-2.5 py-0.5 text-xs font-semibold text-amber-ink">
              Beyond your uploaded material
            </span>
            <p className="m-0 text-[13px] text-ink-2">That isn&apos;t in your PDF, but here&apos;s the idea…</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
