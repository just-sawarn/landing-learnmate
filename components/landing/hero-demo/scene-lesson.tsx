"use client";

import { motion, useTransform } from "motion/react";
import { Pause, Play } from "lucide-react";
import { SPRING } from "../motion";
import { PageChip, TypedText, TypewriterCode, VariableBox, useDerived, useRamp, useStep } from "../primitives";
import { CAPTION, CODE_LOOP, CardBody, Fade, SceneRoot, clamp01, lerp, type SceneProps } from "./shared";

const LOOP_START = 1900;
const LOOP_END = 4100;

/** Flowchart token position (design px inside the 230×190 chart). */
function tokenPos(v: number): { x: number; y: number } {
  const start = { x: 115, y: 18 };
  const cond = { x: 115, y: 67 };
  const print = { x: 115, y: 114 };
  const done = { x: 115, y: 162 };
  const br = { x: 200, y: 114 };
  const tr = { x: 200, y: 67 };
  if (v < LOOP_START - 250) return start;
  if (v < LOOP_START) {
    const p = (v - (LOOP_START - 250)) / 250;
    return { x: lerp(start.x, cond.x, p), y: lerp(start.y, cond.y, p) };
  }
  if (v < LOOP_END) {
    const lap = ((v - LOOP_START) / (LOOP_END - LOOP_START)) * 5;
    const ph = lap % 1;
    const path = [cond, print, br, tr, cond];
    const seg = Math.min(3, Math.floor(ph * 4));
    const p = ph * 4 - seg;
    return { x: lerp(path[seg].x, path[seg + 1].x, p), y: lerp(path[seg].y, path[seg + 1].y, p) };
  }
  const p = clamp01((v - LOOP_END) / 300);
  return { x: lerp(cond.x, done.x, p), y: lerp(cond.y, done.y, p) };
}

function Flowchart({ t }: { t: SceneProps["t"] }) {
  const pos = useTransform(t, tokenPos);
  const x = useTransform(pos, (p) => p.x - 6);
  const y = useTransform(pos, (p) => p.y - 6);
  const node = "fill-surface stroke-ink";
  return (
    <div className="relative h-[190px] w-[230px]">
      <svg viewBox="0 0 230 190" className="absolute inset-0" fill="none">
        <g className="stroke-ink-2" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M115 30V52M115 82V100M115 128V132" />
          <path d="M165 114H200V67H175M179 63l-5 4 5 4" />
          <path d="M55 67H30V162H75M71 158l5 4-5 4" />
        </g>
        <rect x="75" y="6" width="80" height="24" rx="12" className={node} strokeWidth="1.4" />
        <rect x="55" y="52" width="120" height="30" rx="8" className={node} strokeWidth="1.4" />
        <rect x="65" y="100" width="100" height="28" rx="8" className={node} strokeWidth="1.4" />
        <rect x="75" y="150" width="80" height="24" rx="12" className="fill-surface-2 stroke-ink" strokeWidth="1.4" />
        <g className="fill-ink font-mono" fontSize="11" textAnchor="middle">
          <text x="115" y="22">
            start
          </text>
          <text x="115" y="71">
            i in range(5)?
          </text>
          <text x="115" y="118">
            print(i)
          </text>
          <text x="115" y="166">
            done
          </text>
        </g>
      </svg>
      <motion.span
        className="absolute top-0 left-0 size-3 rounded-full bg-ink shadow-[0_0_0_4px_rgba(15,23,42,0.12)]"
        style={{ x, y }}
      />
    </div>
  );
}

export function LessonBody({ t }: { t: SceneProps["t"] }) {
  const code = useRamp(t, 700, 1900);
  const caption = useRamp(t, 900, 3300);
  const scrub = useRamp(t, 600, 4500, 0, 0.92);
  const i = useDerived(t, (v) =>
    v < LOOP_START ? -1 : Math.min(4, Math.floor(((v - LOOP_START) / (LOOP_END - LOOP_START)) * 5)),
  );
  const step = useStep(t, [700, 4500]);
  return (
    <>
      <div className="absolute inset-x-0 top-0 flex h-[34px] items-center justify-between border-b border-line px-4">
        <span className="text-[13px] font-semibold text-ink">
          Loops <span className="font-normal text-muted">· repeating with for</span>
        </span>
        {step >= 1 && (
          <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={SPRING}>
            <PageChip page={6} />
          </motion.span>
        )}
      </div>
      <div className="absolute inset-x-0 top-[34px] flex h-[216px] gap-3 p-3">
        <div className="w-[236px] shrink-0 rounded-[12px] bg-surface-2 p-3">
          <p className="m-0 mb-2 font-mono text-xs text-muted">lesson.py</p>
          <TypewriterCode text={CODE_LOOP} progress={code} caret />
        </div>
        <div className="flex w-[190px] shrink-0 flex-col gap-2">
          <p className="m-0 text-xs font-medium tracking-wide text-muted uppercase">Variables</p>
          <VariableBox name="i" value={i < 0 ? null : i} />
          <p className="m-0 mt-1 text-xs font-medium tracking-wide text-muted uppercase">Output</p>
          <div className="flex-1 overflow-hidden rounded-[12px] bg-ink p-2.5 font-mono text-[13px] leading-[19px] text-bg">
            {Array.from({ length: Math.max(0, i + 1) }, (_, n) => (
              <motion.div
                key={n}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                {n}
              </motion.div>
            ))}
          </div>
        </div>
        <Flowchart t={t} />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-[86px] border-t border-line px-4 pt-2.5">
        <div className="rounded-[10px] bg-surface-2 px-3 py-1.5 text-center text-[13px] text-ink">
          <TypedText text={CAPTION} progress={caption} />
        </div>
        <div className="mt-3 flex items-center gap-3">
          <Play size={14} className="fill-ink text-ink" aria-hidden="true" />
          <div className="relative h-1 flex-1 rounded-full bg-line">
            <motion.div className="h-full origin-left rounded-full bg-ink" style={{ scaleX: scrub }} />
            <span className="absolute top-1/2 left-[92%] size-2 -translate-y-1/2 rotate-45 border border-ink bg-surface" />
          </div>
        </div>
      </div>
      {step >= 2 && (
        <Fade className="absolute inset-x-0 top-[34px] z-10 flex h-[216px] items-center justify-center bg-surface/80">
          <div className="flex h-11 items-center gap-2 rounded-full border border-ink bg-surface px-5 text-[13px] font-semibold text-ink shadow-raised">
            <Pause size={14} className="fill-ink" aria-hidden="true" /> Checkpoint · Your turn
          </div>
        </Fade>
      )}
    </>
  );
}

export function SceneLesson({ t, ref }: SceneProps) {
  return (
    <SceneRoot ref={ref}>
      <motion.div
        layoutId="loops-card"
        className="absolute inset-0 overflow-hidden border border-ink bg-surface shadow-raised"
        style={{ borderRadius: 14 }}
        transition={{ layout: { ...SPRING, stiffness: 180 } }}
      >
        <CardBody delay={0.35}>
          <LessonBody t={t} />
        </CardBody>
      </motion.div>
    </SceneRoot>
  );
}
