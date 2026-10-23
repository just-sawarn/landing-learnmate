"use client";

import { motion } from "motion/react";
import { Zap } from "lucide-react";
import { useRamp, useStep } from "../primitives";
import { CODE_BUG, SceneRoot, type SceneProps } from "./shared";
import { GuruDock, IdePanel, PausedPlayer } from "./work-area";

export function GroqTip({ text }: { text: string }) {
  return (
    <motion.div
      className="flex h-[22px] items-center gap-1.5 rounded-full border border-line bg-surface-2 px-2.5 text-xs text-ink-2"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
    >
      <Zap size={11} className="fill-ink text-ink" aria-hidden="true" />
      <span className="font-semibold text-ink">Groq</span> {text}
      <span className="ml-auto font-mono text-muted">0.4s</span>
    </motion.div>
  );
}

export function SceneGuru({ t, ref }: SceneProps) {
  const words = useRamp(t, 350, 2700);
  const s = useStep(t, [900, 2500, 3600]);
  return (
    <SceneRoot ref={ref}>
      <PausedPlayer tall={false} />
      <GuruDock progress={words} rise />
      <IdePanel
        code={{ text: CODE_BUG, progress: 1 }}
        tests={["fail", "fail", "pass"]}
        output="1 2 3 4"
        bug
        bugVisible={s >= 1}
        tip={s === 2 ? <GroqTip key="tip" text="range(1, 5) starts at 1, not 0" /> : null}
      />
    </SceneRoot>
  );
}
