"use client";

import { AnimatePresence, animate, motion, useInView, useMotionValue, useScroll, type MotionValue } from "motion/react";
import { useReduced } from "../use-reduced";
import { Pause } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "../cn";
import { how } from "../content";
import { EASE, SPRING } from "../motion";
import {
  AppWindow,
  GuruBubble,
  MasteryBar,
  PageChip,
  TestIcon,
  TestRow,
  TopicPill,
  TypedText,
  TypewriterCode,
  VariableBox,
  useDerived,
  useRamp,
  type Mastery,
  type TestState,
} from "../primitives";
import { ScaledStage } from "../scaled-stage";

const W = 662;
const H = 422;
const BUG = "for i in range(1, 5):\n    print(i)";
const FIXED = "for i in range(5):\n    print(i)";
const TESTS = ["prints 5 lines", "starts at 0", "ends at 4"] as const;

type P = { p: MotionValue<number> };

/* Step 1 — upload */
function StageUpload({ p }: P) {
  const dropY = useRamp(p, 0, 0.22, -150, 0);
  const dropO = useRamp(p, 0, 0.12);
  const flips = [useRamp(p, 0.25, 0.42, 0, -170), useRamp(p, 0.35, 0.52, 0, -170), useRamp(p, 0.45, 0.62, 0, -170)];
  const done = useDerived(p, (v) => (v < 0.5 ? 0 : v < 0.65 ? 1 : v < 0.8 ? 2 : 3));
  const states = (i: number): TestState => (done > i ? "pass" : done === i ? "running" : "idle");
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-14 px-10">
      <motion.div style={{ y: dropY, opacity: dropO }} className="relative h-[190px] w-[200px]">
        <div style={{ perspective: 600 }} className="absolute top-3 left-[55px]">
          {flips.map((r, n) => (
            <motion.div
              key={n}
              style={{ rotateY: r, originX: 0, zIndex: 3 - n }}
              className="absolute top-0 left-0 h-[126px] w-[96px] rounded-[8px] border border-ink bg-surface p-3 shadow-raised"
            >
              <div className="mb-2 h-1.5 w-10 rounded-full bg-line" />
              <div className="mb-2 h-1.5 w-14 rounded-full bg-line" />
              <div className="h-1.5 w-8 rounded-full bg-line" />
              <span className="absolute right-2 bottom-2 font-mono text-xs text-muted">p. {n + 1}</span>
            </motion.div>
          ))}
        </div>
        <span className="absolute inset-x-0 bottom-0 text-center font-mono text-xs text-ink-2">
          python-loops-lists.pdf
        </span>
      </motion.div>
      <div className="flex w-[230px] flex-col gap-2.5">
        {how.checklist.map((label, i) => (
          <div
            key={label}
            className="flex items-center gap-3 rounded-[12px] border border-line bg-surface px-4 py-3 text-[15px] text-ink"
          >
            <TestIcon state={states(i)} />
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}

/* Step 2 — it comes alive */
function StageAlive({ p }: P) {
  const topicsO = useRamp(p, 0.12, 0.28, 1, 0);
  const playerO = useRamp(p, 0.15, 0.3);
  const code = useRamp(p, 0.3, 0.55);
  const caption = useRamp(p, 0.35, 0.85);
  const scrub = useRamp(p, 0.3, 1);
  const i = useDerived(p, (v) => (v < 0.55 ? -1 : Math.min(4, Math.floor(((v - 0.55) / 0.4) * 5))));
  return (
    <div className="absolute inset-0">
      <motion.div style={{ opacity: topicsO }} className="absolute inset-x-8 top-8 grid grid-cols-3 gap-3">
        {["Variables · p. 2", "Conditionals · p. 4", "Loops · p. 6", "Lists · p. 9", "Functions · p. 12"].map((t) => (
          <div
            key={t}
            className={cn(
              "rounded-[12px] border bg-surface p-4 text-[14px] font-semibold text-ink",
              t.startsWith("Loops") ? "border-ink" : "border-line",
            )}
          >
            {t}
            <div className="mt-3 h-1.5 w-3/4 rounded-full bg-line" />
          </div>
        ))}
      </motion.div>
      <motion.div
        style={{ opacity: playerO }}
        className="absolute inset-6 overflow-hidden rounded-[14px] border border-ink bg-surface"
      >
        <div className="flex h-9 items-center justify-between border-b border-line px-4 text-[13px] font-semibold text-ink">
          Loops <PageChip page={6} />
        </div>
        <div className="flex gap-4 p-4">
          <div className="w-[250px] rounded-[12px] bg-surface-2 p-4">
            <TypewriterCode text={FIXED} progress={code} />
          </div>
          <div className="flex flex-1 flex-col gap-3">
            <VariableBox name="i" value={i < 0 ? null : i} />
            <div className="h-[92px] rounded-[12px] bg-ink p-3 font-mono text-[13px] leading-[18px] text-bg">
              {Array.from({ length: Math.max(0, i + 1) }, (_, n) => (
                <div key={n} className="inline-block w-5">
                  {n}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute inset-x-4 bottom-4">
          <div className="rounded-[10px] bg-surface-2 px-3 py-2 text-center text-[13px] text-ink">
            <TypedText text="range(5) gives you five numbers, starting at zero." progress={caption} />
          </div>
          <div className="mt-3 h-1 rounded-full bg-line">
            <motion.div className="h-full origin-left rounded-full bg-ink" style={{ scaleX: scrub }} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* Step 3 — try it yourself */
function StageTry({ p }: P) {
  const code = useRamp(p, 0.08, 0.3);
  const fix = useRamp(p, 0.78, 0.88);
  const guruO = useRamp(p, 0.5, 0.56);
  const words = useRamp(p, 0.55, 0.78);
  const phase = useDerived(p, (v) => (v < 0.36 ? 0 : v < 0.44 ? 1 : v < 0.8 ? 2 : v < 0.9 ? 3 : 4));
  const fixing = phase >= 3 || p.get() >= 0.78;
  const state = (i: number): TestState =>
    phase === 0 ? "idle" : phase === 1 || phase === 3 ? "running" : phase === 2 ? (i === 2 ? "pass" : "fail") : "pass";
  return (
    <div className="absolute inset-0 flex gap-4 p-6">
      <div className="flex w-[210px] flex-col justify-between">
        <div className="rounded-[12px] border border-ink bg-surface p-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-ink">
            <Pause size={12} className="fill-ink" aria-hidden="true" /> Your turn
          </div>
          <p className="m-0 mt-1.5 text-[13px] leading-[1.45] text-ink-2">Print 0 to 4, one per line. (p. 6)</p>
        </div>
        <motion.div style={{ opacity: guruO }}>
          <GuruBubble
            text="What's the first number range(1, 5) gives you? Compare it with the worksheet on p. 6."
            progress={words}
          />
        </motion.div>
      </div>
      <div className="flex flex-1 flex-col gap-3 rounded-[14px] border border-line bg-surface p-4">
        <div className="flex items-center justify-between font-mono text-xs text-ink-2">
          loops.py <span className="rounded-full bg-ink px-3 py-1 font-sans text-xs font-medium text-bg">Check</span>
        </div>
        <div className="rounded-[10px] bg-surface-2 p-3">
          {fixing ? (
            <TypewriterCode text={FIXED} from={BUG} progress={fix} />
          ) : (
            <TypewriterCode text={BUG} progress={code} />
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          {TESTS.map((t, i) => (
            <TestRow key={t} label={t} state={state(i)} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* Step 4 — plan changes */
function StagePlan({ p }: P) {
  const loops = useRamp(p, 0.1, 0.5, 40, 85);
  const strong = useDerived(p, (v) => v > 0.5);
  const v2 = useDerived(p, (v) => v > 0.68);
  const bannerO = useRamp(p, 0.8, 0.9);
  const rows: Array<{ name: string; status: Mastery; value: number | MotionValue<number> }> = [
    { name: "Loops", status: strong ? "strong" : "weak", value: loops },
    { name: "Lists", status: "okay", value: 55 },
    { name: "Variables", status: "strong", value: 80 },
  ];
  const order = strong ? [rows[1], rows[0], rows[2]] : rows;
  return (
    <div className="absolute inset-0 flex gap-5 p-6">
      <ul className="m-0 flex flex-1 list-none flex-col gap-3 p-0">
        {order.map((r) => (
          <motion.li
            key={r.name}
            layout
            transition={SPRING}
            className="rounded-[12px] border border-line bg-surface p-3.5"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[14px] font-semibold text-ink">{r.name}</span>
              <TopicPill status={r.status} />
            </div>
            <MasteryBar label="Mastery" value={r.value} />
          </motion.li>
        ))}
      </ul>
      <div className="flex w-[230px] flex-col gap-3" style={{ perspective: 800 }}>
        <motion.div
          className="relative h-[150px]"
          animate={{ rotateY: v2 ? 180 : 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="absolute inset-0 rounded-[14px] border border-ink bg-surface p-4 [backface-visibility:hidden]">
            <p className="m-0 mb-2 text-xs font-semibold tracking-wide text-muted uppercase">Plan v1</p>
            <p className="m-0 text-[14px] leading-[1.6] text-ink">
              1 · Loops
              <br />2 · Lists
              <br />3 · Functions
            </p>
          </div>
          <div className="absolute inset-0 rounded-[14px] border border-ink bg-surface p-4 [transform:rotateY(180deg)] [backface-visibility:hidden]">
            <p className="m-0 mb-2 text-xs font-semibold tracking-wide text-muted uppercase">Plan v2</p>
            <p className="m-0 text-[14px] leading-[1.6] text-ink">
              1 · Lists
              <br />2 · Functions
              <br />3 · Review loops
            </p>
          </div>
        </motion.div>
        <motion.p
          style={{ opacity: bannerO }}
          className="m-0 rounded-[12px] bg-ink px-3 py-2.5 text-[13px] leading-[1.45] text-bg"
        >
          Loops moved from weak to strong. Next focus: Lists.
        </motion.p>
      </div>
    </div>
  );
}

const STAGES = [StageUpload, StageAlive, StageTry, StagePlan] as const;

function StageWindow({ index, p }: { index: number; p: MotionValue<number> }) {
  const Stage = STAGES[index];
  return (
    <div aria-hidden="true">
      <ScaledStage width={W + 2} height={H + 2}>
        <AppWindow
          url="learnmate.app/learn"
          className="h-[424px] w-[664px]"
          bodyClassName="relative h-[386px] w-[662px] bg-bg"
        >
          <Stage p={p} />
        </AppWindow>
      </ScaledStage>
    </div>
  );
}

function ScrollStep({ index, global }: { index: number; global: MotionValue<number> }) {
  const p = useRamp(global, index / 4, (index + 1) / 4);
  return <StageWindow index={index} p={p} />;
}

function useLoopProgress(active: boolean, ms: number): MotionValue<number> {
  const reduce = useReduced();
  const mv = useMotionValue(1);
  useEffect(() => {
    if (reduce) {
      mv.set(1);
      return;
    }
    if (!active) return;
    mv.set(0);
    const c = animate(mv, 1, { duration: ms / 1000, ease: "linear", repeat: Infinity, repeatDelay: 1.2 });
    return () => c.stop();
  }, [active, ms, reduce, mv]);
  return mv;
}

function StepCard({ index }: { index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: "0px" });
  const p = useLoopProgress(inView, 7000);
  const step = how.steps[index];
  return (
    <li ref={ref} className="list-none rounded-[24px] border border-line bg-surface p-4 shadow-raised sm:p-6">
      <div className="mb-4 flex items-start gap-3">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-ink font-mono text-sm text-bg">
          {index + 1}
        </span>
        <div>
          <h3 className="m-0 text-xl font-semibold tracking-[-0.02em] text-ink">{step.title}</h3>
          <p className="mt-1 mb-0 text-[15px] leading-[1.55] text-ink-2">{step.body}</p>
        </div>
      </div>
      <StageWindow index={index} p={p} />
    </li>
  );
}

function StickyLayout() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 55%", "end 55%"] });
  const active = useDerived(scrollYProgress, (v) => Math.max(0, Math.min(3, Math.floor(v * 4))));
  const fill = useRamp(scrollYProgress, 0, 1);
  return (
    <div ref={ref} className="grid grid-cols-2 gap-16">
      <ol className="relative m-0 list-none p-0 pl-14">
        <span aria-hidden="true" className="absolute top-0 bottom-0 left-[19px] w-px bg-line" />
        <motion.span
          aria-hidden="true"
          className="absolute top-0 bottom-0 left-[19px] w-px origin-top bg-ink"
          style={{ scaleY: fill }}
        />
        {how.steps.map((s, i) => (
          <li key={s.title} className="relative flex min-h-[65vh] items-center">
            <span
              className={cn(
                "absolute -left-14 flex size-10 items-center justify-center rounded-full border font-mono text-sm transition-colors duration-300",
                i <= active ? "border-ink bg-ink text-bg" : "border-line bg-bg text-muted",
              )}
            >
              {i + 1}
            </span>
            <div className={cn("transition-opacity duration-300", i === active ? "opacity-100" : "opacity-45")}>
              <h3 className="m-0 mb-3 text-[28px] leading-[1.15] font-semibold tracking-[-0.02em] text-ink">
                {s.title}
              </h3>
              <p className="m-0 max-w-[26rem] text-[17px] leading-[1.6] text-ink-2">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="relative">
        <div className="sticky top-28">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              <ScrollStep index={active} global={scrollYProgress} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default function HowStages() {
  const reduce = useReduced();
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const on = () => setDesktop(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  if (desktop && !reduce) return <StickyLayout />;
  return (
    <ol className="m-0 flex list-none flex-col gap-6 p-0">
      {how.steps.map((s, i) => (
        <StepCard key={s.title} index={i} />
      ))}
    </ol>
  );
}
