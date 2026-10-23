"use client";

import {
  AnimatePresence,
  motion,
  motionValue,
  useInView,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useReduced } from "../use-reduced";
import { Pause, Play } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type PointerEvent } from "react";
import { hero } from "../content";
import { LogoMark } from "../logo";
import { AppWindow, ProviderBadge } from "../primitives";
import { ScaledStage } from "../scaled-stage";
import { SceneCheckpoint } from "./scene-checkpoint";
import { SceneFixed } from "./scene-fixed";
import { SceneGuru } from "./scene-guru";
import { SceneLesson } from "./scene-lesson";
import { SceneTopics } from "./scene-topics";
import { SceneUpload } from "./scene-upload";
import { SCENES, type SceneProps } from "./shared";
import { useDemoTimeline } from "./use-demo-timeline";

const COMPONENTS = [SceneUpload, SceneTopics, SceneLesson, SceneCheckpoint, SceneGuru, SceneFixed] as const;
const BADGE = ["Gemini", "Gemini", "Gemini", null, "Claude", "Claude"] as const;

function AppBar({ index }: { index: number }) {
  const badge = BADGE[index];
  return (
    <div className="absolute inset-x-0 top-0 flex h-9 items-center gap-2 border-b border-line bg-surface px-4">
      <LogoMark className="size-5 text-ink" />
      <span className="text-[13px] font-semibold text-ink">LearnMate</span>
      <span className="mx-auto font-mono text-xs text-muted">python-loops-lists.pdf › Loops</span>
      <div className="flex w-[70px] justify-end">
        <AnimatePresence mode="popLayout" initial={false}>
          {badge && (
            <motion.span
              key={badge}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <ProviderBadge provider={badge} />
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Segment({
  state,
  t,
  duration,
}: {
  state: "done" | "active" | "todo";
  t: MotionValue<number>;
  duration: number;
}) {
  const scaleX = useTransform(t, (v) => Math.min(1, v / duration));
  return (
    <span className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 overflow-hidden rounded-full bg-line">
      {state === "active" ? (
        <motion.span className="block h-full origin-left bg-ink" style={{ scaleX }} />
      ) : (
        <span
          className="block h-full origin-left bg-ink"
          style={{ transform: `scaleX(${state === "done" ? 1 : 0})` }}
        />
      )}
    </span>
  );
}

export function HeroDemo() {
  const reduce = useReduced();
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { amount: 0.2 });
  const [userPlaying, setUserPlaying] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);
  const [tilt, setTilt] = useState(false);

  useEffect(() => {
    const onVis = () => setTabVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVis);
    const mq = window.matchMedia("(min-width: 1024px) and (hover: hover)");
    const onMq = () => setTilt(mq.matches);
    onMq();
    mq.addEventListener("change", onMq);
    return () => {
      document.removeEventListener("visibilitychange", onVis);
      mq.removeEventListener("change", onMq);
    };
  }, []);

  const running = userPlaying && inView && tabVisible && !reduce;
  const { index, wrapped, times, goTo } = useDemoTimeline(SCENES, running);

  const rotX = useSpring(0, { stiffness: 110, damping: 18 });
  const rotY = useSpring(0, { stiffness: 110, damping: 18 });
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [22, -22]);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!tilt || reduce || !wrapRef.current) return;
    const r = wrapRef.current.getBoundingClientRect();
    rotY.set(((e.clientX - r.left) / r.width - 0.5) * 8);
    rotX.set(-((e.clientY - r.top) / r.height - 0.5) * 8);
  };
  const onLeave = () => {
    rotX.set(0);
    rotY.set(0);
  };

  const finalT = useMemo(() => motionValue(SCENES[SCENES.length - 1].duration), []);
  const Active = COMPONENTS[index] as (props: SceneProps) => React.ReactElement;
  const frameIndex = reduce ? SCENES.length - 1 : index;

  return (
    <div ref={wrapRef} onPointerMove={onMove} onPointerLeave={onLeave} style={{ perspective: 1400 }}>
      <p className="lm-sr">{hero.demoSummary}</p>
      <motion.div style={{ rotateX: rotX, rotateY: rotY, y }} aria-hidden="true">
        <ScaledStage width={762} height={442}>
          <AppWindow
            url="learnmate.app/learn/loops"
            className="h-[442px] w-[762px]"
            bodyClassName="relative h-[404px] w-[760px] bg-bg"
          >
            <AppBar index={frameIndex} />
            {reduce ? (
              <SceneFixed t={finalT} />
            ) : (
              <AnimatePresence mode="popLayout" custom={wrapped}>
                <Active key={index} t={times[index]} />
              </AnimatePresence>
            )}
          </AppWindow>
        </ScaledStage>
      </motion.div>

      {!reduce && (
        <div className="mt-4 flex items-center gap-3">
          <div className="flex flex-1 gap-1.5" role="group" aria-label="Demo scenes">
            {SCENES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                aria-label={`Scene ${i + 1} of ${SCENES.length}: ${s.label}`}
                aria-current={i === index ? "step" : undefined}
                onClick={() => goTo(i)}
                className="relative h-6 flex-1 cursor-pointer rounded-full"
              >
                <Segment
                  state={i < index ? "done" : i === index ? "active" : "todo"}
                  t={times[i]}
                  duration={s.duration}
                />
              </button>
            ))}
          </div>
          <button
            type="button"
            aria-pressed={!userPlaying}
            aria-label={userPlaying ? "Pause demo" : "Play demo"}
            onClick={() => setUserPlaying((p) => !p)}
            className="flex size-8 cursor-pointer items-center justify-center rounded-full border border-line bg-surface text-ink transition-colors hover:bg-surface-2"
          >
            {userPlaying ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
          </button>
        </div>
      )}
    </div>
  );
}
