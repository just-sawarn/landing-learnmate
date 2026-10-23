"use client";

import { AnimatePresence, motion } from "motion/react";
import { EASE, SPRING } from "../motion";
import { PageChip, PdfCard, TestIcon, TopicPill, useDerived, useStep } from "../primitives";
import { CardBody, Fade, SceneRoot, type SceneProps } from "./shared";

export const TOPICS = [
  { name: "Variables", page: 2 },
  { name: "Conditionals", page: 4 },
  { name: "Loops", page: 6 },
  { name: "Lists", page: 9 },
  { name: "Functions", page: 12 },
] as const;

const CARD_W = 168;
const CARD_H = 132;
const originX = 4 + 85;
const originY = 96 + 42;

function cardPos(i: number) {
  const col = i % 3;
  const row = Math.floor(i / 3);
  return { left: 204 + col * (CARD_W + 10), top: 20 + row * (CARD_H + 12) };
}

const QUIZ = ["pass", "pass", "fail", "pass", "fail"] as const;

export function SceneTopics({ t, ref }: SceneProps) {
  const step = useStep(t, [350, 800, 1500, 1900]);
  const marked = useDerived(t, (v) => Math.max(0, Math.min(5, Math.floor((v - 1550) / 90))));
  return (
    <SceneRoot ref={ref}>
      <motion.div
        layoutId="pdf"
        className="absolute w-[170px]"
        style={{ left: 4, top: 96, borderRadius: 8 }}
        transition={SPRING}
      >
        <PdfCard name="python-loops-lists.pdf" />
      </motion.div>

      {TOPICS.map((_, i) => {
        const p = cardPos(i);
        const dx = p.left + CARD_W / 2 - originX;
        const dy = p.top + CARD_H / 2 - originY;
        return (
          <motion.div
            key={i}
            className="absolute h-[34px] w-[26px] rounded-[4px] border border-ink bg-surface"
            style={{ left: originX - 13, top: originY - 17 }}
            initial={{ opacity: 0, x: 0, y: 0, rotate: 0, scale: 0.6 }}
            animate={
              step >= 2
                ? {
                    opacity: 0,
                    x: dx,
                    y: dy,
                    rotate: 0,
                    scale: 4.2,
                    transition: { duration: 0.55, delay: i * 0.05, ease: EASE },
                  }
                : step >= 1
                  ? {
                      opacity: 1,
                      x: 52 + i * 9,
                      y: (i - 2) * 16,
                      rotate: (i - 2) * 11,
                      scale: 1,
                      transition: { type: "spring", stiffness: 200, damping: 20, delay: i * 0.03 },
                    }
                  : { opacity: 0, x: 0, y: 0, rotate: 0, scale: 0.6 }
            }
          />
        );
      })}

      {TOPICS.map((topic, i) => {
        const p = cardPos(i);
        const isLoops = topic.name === "Loops";
        const body = (
          <>
            <div className="flex items-start justify-between gap-2">
              <span className="text-[15px] font-semibold tracking-[-0.01em] text-ink">{topic.name}</span>
              <PageChip page={topic.page} />
            </div>
            <div className="mt-3 space-y-1.5">
              <div className="h-1.5 w-4/5 rounded-full bg-line" />
              <div className="h-1.5 w-3/5 rounded-full bg-line" />
            </div>
            <div className="absolute bottom-3 left-3 h-6">
              <AnimatePresence>
                {isLoops && step >= 4 && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={SPRING}
                    className="inline-block origin-left"
                  >
                    <TopicPill status="weak" />
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </>
        );
        const cls = "absolute rounded-[14px] border bg-surface p-3 shadow-raised";
        const style = { left: p.left, top: p.top, width: CARD_W, height: CARD_H, borderRadius: 14 };
        const animate = { opacity: step >= 2 ? 1 : 0, y: step >= 2 ? 0 : 10 };
        const transition = { duration: 0.45, delay: step >= 2 ? 0.3 + i * 0.07 : 0, ease: EASE };
        return isLoops ? (
          <motion.div
            key={topic.name}
            layoutId="loops-card"
            className={`${cls} ${step >= 4 ? "border-ink" : "border-line"}`}
            style={style}
            initial={{ opacity: 0, y: 10 }}
            animate={animate}
            transition={{ ...transition, layout: SPRING }}
          >
            <CardBody delay={0.1}>{body}</CardBody>
          </motion.div>
        ) : (
          <motion.div
            key={topic.name}
            className={`${cls} border-line`}
            style={style}
            initial={{ opacity: 0, y: 10 }}
            animate={animate}
            exit={{ opacity: 0 }}
            transition={transition}
          >
            {body}
          </motion.div>
        );
      })}

      <Fade
        className="absolute rounded-[14px] border border-dashed border-line bg-surface-2/60 p-3"
        style={{ ...cardPos(5), width: CARD_W, height: CARD_H }}
        animate={{ opacity: step >= 3 ? 1 : 0 }}
      >
        <p className="m-0 text-[13px] font-semibold text-ink">Diagnostic quiz</p>
        <p className="mt-0.5 mb-3 text-xs text-muted">Marking your answers…</p>
        <div className="flex gap-2">
          {QUIZ.map((r, i) => (
            <TestIcon key={i} state={i < marked ? r : "idle"} />
          ))}
        </div>
      </Fade>
    </SceneRoot>
  );
}
