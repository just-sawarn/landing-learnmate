"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useReduced } from "./use-reduced";
import { useRef } from "react";
import { problem } from "./content";
import { EASE, VIEWPORT } from "./motion";

function ScrollWord({ word, i, n, progress }: { word: string; i: number; n: number; progress: MotionValue<number> }) {
  const color = useTransform(progress, [i / n, (i + 1) / n], ["#5A6A80", "#0F172A"]);
  return (
    <motion.span style={{ color }} className="mr-[0.25em] inline-block">
      {word}
    </motion.span>
  );
}

export function Problem() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReduced();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const words = problem.resolution.split(" ");
  return (
    <section ref={ref} aria-label="The problem" className="px-4 py-[72px] sm:px-6 lg:py-[120px]">
      <div className="mx-auto max-w-[980px]">
        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease: EASE }}
          className="m-0 text-xs font-medium tracking-[0.14em] text-muted uppercase"
        >
          {problem.eyebrow}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
          className="mt-3 mb-10 text-[34px] leading-[1.1] font-semibold tracking-[-0.03em] text-ink sm:text-[48px]"
        >
          {problem.lead}
        </motion.h2>
        <ul className="m-0 mb-12 flex list-none flex-col gap-3 p-0">
          {problem.struck.map((s, i) => (
            <li key={s} className="relative w-fit text-[22px] text-muted sm:text-[28px]">
              {s}
              <motion.span
                aria-hidden="true"
                className="absolute top-1/2 left-0 h-[2px] w-full origin-left bg-ink"
                initial={{ scaleX: reduce ? 1 : 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.7, ease: EASE, delay: 0.3 + i * 0.25 }}
              />
            </li>
          ))}
        </ul>
        <p className="m-0 text-[30px] leading-[1.2] font-semibold tracking-[-0.03em] text-ink sm:text-[44px]">
          <span className="lm-sr">{problem.resolution}</span>
          <span aria-hidden="true">
            {words.map((w, i) =>
              reduce ? (
                <span key={i} className="mr-[0.25em] inline-block">
                  {w}
                </span>
              ) : (
                <ScrollWord key={i} word={w} i={i} n={words.length} progress={scrollYProgress} />
              ),
            )}
          </span>
        </p>
      </div>
    </section>
  );
}
