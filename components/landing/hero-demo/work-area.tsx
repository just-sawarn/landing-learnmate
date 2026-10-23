"use client";

import { AnimatePresence, motion, type MotionValue } from "motion/react";
import { FileCode2, Pause } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "../cn";
import { EASE, SPRING } from "../motion";
import {
  GuruBubble,
  MasteryBar,
  PageChip,
  TestRow,
  TopicPill,
  TypewriterCode,
  type Mastery,
  type TestState,
} from "../primitives";
import { CODE_LOOP, CardBody, GURU_TEXT, TESTS } from "./shared";

/** Wavy squiggle path that can be drawn with pathLength. */
function wavy(width: number): string {
  const segs = Math.round(width / 5);
  return `M0 3 q2.5 -3 5 0${" t5 0".repeat(segs - 1)}`;
}

type IdeProps = {
  code: { text: string; from?: string; progress: MotionValue<number> | number };
  tests: readonly [TestState, TestState, TestState];
  output: string | null;
  tip?: ReactNode;
  checkPressed?: boolean;
  slideIn?: boolean;
  bug?: boolean;
  bugVisible?: boolean;
};

/** The side-along IDE: editor, hidden tests, optional Groq tip slot, console. 476×336. */
export function IdePanel({
  code,
  tests,
  output,
  tip,
  checkPressed = false,
  slideIn = false,
  bug = false,
  bugVisible = true,
}: IdeProps) {
  return (
    <motion.div
      layoutId="ide"
      className="absolute top-0 left-[252px] h-[336px] w-[476px] overflow-hidden border border-line bg-surface shadow-raised"
      style={{ borderRadius: 14 }}
      transition={SPRING}
    >
      <motion.div
        className="h-full"
        initial={slideIn ? { x: 120, opacity: 0 } : false}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 190, damping: 26, delay: slideIn ? 0.3 : 0 }}
      >
        <div className="flex h-[34px] items-center gap-2 border-b border-line px-3">
          <span className="flex items-center gap-1.5 rounded-md bg-surface-2 px-2 py-0.5 font-mono text-xs text-ink">
            <FileCode2 size={12} aria-hidden="true" /> loops.py
          </span>
          <span className="ml-auto flex h-6 w-[52px] items-center justify-center rounded-full border border-ink text-xs font-medium text-ink">
            Run
          </span>
          <motion.span
            className="flex h-6 w-16 items-center justify-center rounded-full bg-ink text-xs font-medium text-bg"
            animate={{ scale: checkPressed ? 0.9 : 1 }}
            transition={{ duration: 0.12 }}
          >
            Check
          </motion.span>
        </div>
        <div className="flex flex-col gap-1.5 px-3 pt-2.5">
          <div className="relative h-[64px] rounded-[12px] bg-surface-2 px-3 py-[10px]">
            <TypewriterCode text={code.text} from={code.from} progress={code.progress} lineNumbers />
            {bug && (
              <svg
                className="absolute top-[27px] left-[110px]"
                width="86"
                height="6"
                viewBox="0 0 86 6"
                fill="none"
                aria-hidden="true"
              >
                <motion.path
                  d={wavy(86)}
                  stroke="#0F172A"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: bugVisible ? 1 : 0, opacity: bugVisible ? 1 : 0 }}
                  transition={{ duration: bugVisible ? 0.6 : 0.25, ease: EASE }}
                />
              </svg>
            )}
          </div>
          <div className="flex h-[112px] flex-col gap-[3px]">
            <p className="m-0 flex h-[18px] items-center justify-between text-xs font-medium tracking-wide text-muted uppercase">
              Hidden tests <span className="font-mono normal-case">{tests.filter((s) => s === "pass").length}/3</span>
            </p>
            {TESTS.map((label, i) => (
              <TestRow key={label} label={label} state={tests[i]} className="py-[3px]" />
            ))}
          </div>
          <div className="h-[22px]">
            <AnimatePresence>{tip}</AnimatePresence>
          </div>
          <div className="h-[56px] rounded-[12px] bg-ink px-3 py-1.5 font-mono text-[13px] leading-[19px] text-bg">
            <div className="text-bg/60">$ python loops.py</div>
            <div>{output ?? " "}</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

const FROZEN = CODE_LOOP;

/** The paused lesson player. `tall` = the Your-turn checkpoint view, otherwise compact. */
export function PausedPlayer({ tall }: { tall: boolean }) {
  return (
    <motion.div
      layoutId="loops-card"
      className={cn(
        "absolute top-0 left-0 w-[240px] overflow-hidden border border-ink bg-surface shadow-raised",
        tall ? "h-[336px]" : "h-[128px]",
      )}
      style={{ borderRadius: 14 }}
      transition={SPRING}
    >
      <CardBody>
        <div className="flex h-[34px] items-center justify-between border-b border-line px-3">
          <span className="text-[13px] font-semibold text-ink">Loops</span>
          <PageChip page={6} />
        </div>
        <div className="px-3 pt-2.5">
          <div className="rounded-[10px] bg-surface-2 px-2.5 py-1.5">
            <TypewriterCode text={FROZEN} progress={1} caret={false} className="text-xs" />
          </div>
        </div>
        {tall ? (
          <div className="absolute inset-x-3 top-[118px] rounded-[12px] border border-ink bg-surface p-3 shadow-raised">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-ink">
              <Pause size={12} className="fill-ink" aria-hidden="true" /> Your turn
            </div>
            <p className="m-0 mt-1.5 text-[13px] leading-[1.45] text-ink-2">
              Print the numbers 0 to 4, one per line. (Worksheet Q3, p. 6)
            </p>
          </div>
        ) : (
          <p className="absolute bottom-2.5 left-3 m-0 flex items-center gap-1.5 text-xs text-muted">
            <Pause size={11} className="fill-muted" aria-hidden="true" /> Paused at checkpoint
          </p>
        )}
      </CardBody>
    </motion.div>
  );
}

/** The Loops mastery card; shares `loops-card` so the paused player morphs into it. */
export function MasteryCard({ value, status }: { value: number; status: Mastery }) {
  return (
    <motion.div
      layoutId="loops-card"
      className="absolute top-0 left-0 h-[128px] w-[240px] overflow-hidden border border-ink bg-surface p-3 shadow-raised"
      style={{ borderRadius: 14 }}
      transition={SPRING}
    >
      <CardBody>
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[13px] font-semibold text-ink">Loops</span>
          <TopicPill status={status} />
        </div>
        <MasteryBar label="Mastery" value={value} />
        <p className="m-0 mt-3 text-xs text-muted">Updates after every Check</p>
      </CardBody>
    </motion.div>
  );
}

/** Guru's bubble, anchored to the bottom of the left column. */
export function GuruDock({ progress, rise }: { progress: MotionValue<number> | number; rise: boolean }) {
  return (
    <motion.div layoutId="guru-bubble" className="absolute bottom-0 left-0 w-[240px]" transition={SPRING}>
      <motion.div
        initial={rise ? { y: 60, opacity: 0 } : false}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 160, damping: 22 }}
      >
        <GuruBubble text={GURU_TEXT} progress={progress} />
      </motion.div>
    </motion.div>
  );
}
