"use client";

import { FakeCursor, useRamp, useStep, type TestState } from "../primitives";
import { CODE_BUG, SceneRoot, type SceneProps } from "./shared";
import { IdePanel, PausedPlayer } from "./work-area";

/** Check button centre in content-region coordinates. */
export const CHECK_XY = { x: 676, y: 20 } as const;
export const CURSOR_REST = { x: 560, y: 210 } as const;

export function SceneCheckpoint({ t, ref }: SceneProps) {
  const code = useRamp(t, 1100, 1900);
  const s = useStep(t, [1400, 1550, 2500, 2650, 2850, 3000, 3150]);
  const final: readonly TestState[] = ["fail", "fail", "pass"];
  const tests = [0, 1, 2].map((i): TestState => (s >= 5 + i ? final[i] : s >= 3 ? "running" : "idle")) as [
    TestState,
    TestState,
    TestState,
  ];
  return (
    <SceneRoot ref={ref}>
      <PausedPlayer tall />
      <IdePanel
        slideIn
        code={{ text: CODE_BUG, progress: code }}
        tests={tests}
        output={s >= 5 ? "1 2 3 4" : null}
        checkPressed={s === 3}
      />
      <FakeCursor {...(s >= 2 ? CHECK_XY : CURSOR_REST)} visible={s >= 1} pressed={s === 3} />
    </SceneRoot>
  );
}
