"use client";

import { AnimatePresence, motion } from "motion/react";
import { FakeCursor, useRamp, useStep, type TestState } from "../primitives";
import { SPRING } from "../motion";
import { CODE_BUG, CODE_LOOP, SceneRoot, type SceneProps } from "./shared";
import { CHECK_XY, CURSOR_REST } from "./scene-checkpoint";
import { GuruDock, IdePanel, MasteryCard } from "./work-area";

export function PlanBanner() {
  return (
    <motion.div
      className="absolute top-[-44px] left-1/2 z-20 -ml-[260px] flex h-7 w-[520px] items-center gap-2 rounded-full border border-ink bg-ink pr-4 pl-1 text-xs text-bg shadow-raised"
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={SPRING}
    >
      <span className="rounded-full bg-bg px-2 py-0.5 text-xs font-semibold text-ink">Plan v2</span>
      Loops moved from weak to strong. Next focus: Lists.
    </motion.div>
  );
}

export function SceneFixed({ t, ref }: SceneProps) {
  const code = useRamp(t, 250, 950);
  const s = useStep(t, [1000, 1100, 1450, 1600, 1700, 1820, 1940, 2000, 2500, 2650]);
  const tests = [0, 1, 2].map((i): TestState =>
    s >= 5 + i ? "pass" : s >= 3 ? "running" : i === 2 ? "pass" : "fail",
  ) as [TestState, TestState, TestState];
  return (
    <SceneRoot ref={ref}>
      <MasteryCard value={s >= 8 ? 85 : 40} status={s >= 9 ? "strong" : "weak"} />
      <GuruDock progress={1} rise={false} />
      <IdePanel
        code={{ text: CODE_LOOP, from: CODE_BUG, progress: code }}
        tests={tests}
        output={s >= 5 ? "0 1 2 3 4" : "1 2 3 4"}
        bug
        bugVisible={false}
        checkPressed={s === 3}
      />
      <FakeCursor {...(s >= 2 ? CHECK_XY : CURSOR_REST)} visible={s >= 1 && s < 7} pressed={s === 3} />
      <AnimatePresence>{s >= 10 && <PlanBanner key="banner" />}</AnimatePresence>
    </SceneRoot>
  );
}
