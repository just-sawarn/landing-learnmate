"use client";

import { motion } from "motion/react";
import { features } from "../content";
import { SectionHeading } from "../reveal";
import { stagger, VIEWPORT } from "../motion";
import { Tile } from "./tile";
import { CitesVisual, GuruLadderVisual, HonestVisual, IdeVisual, LessonsVisual } from "./visuals-a";
import { HindiVisual, PlanVisual, ProgressVisual, QuizVisual, TipsVisual } from "./visuals-b";
import type { VisualProps } from "./use-ticker";
import type { ReactNode } from "react";

type Def = { span: string; large?: boolean; visual: (v: VisualProps) => ReactNode };

const LARGE = "md:col-span-6 md:row-span-2 lg:col-span-6";
const SMALL = "md:col-span-3 lg:col-span-4";
const WIDE = "md:col-span-6 lg:col-span-6";

const DEFS: Record<string, Def> = {
  lessons: { span: LARGE, large: true, visual: (v) => <LessonsVisual {...v} /> },
  ide: { span: LARGE, large: true, visual: (v) => <IdeVisual {...v} /> },
  guru: { span: SMALL, visual: (v) => <GuruLadderVisual {...v} /> },
  cites: { span: SMALL, visual: (v) => <CitesVisual {...v} /> },
  honest: { span: SMALL, visual: (v) => <HonestVisual {...v} /> },
  quiz: { span: SMALL, visual: (v) => <QuizVisual {...v} /> },
  plan: { span: SMALL, visual: (v) => <PlanVisual {...v} /> },
  progress: { span: SMALL, visual: (v) => <ProgressVisual {...v} /> },
  tips: { span: WIDE, visual: (v) => <TipsVisual {...v} /> },
  hindi: { span: WIDE, visual: (v) => <HindiVisual {...v} /> },
};

export function BentoGrid() {
  return (
    <section id="features" aria-labelledby="features-title" className="lm-section px-4 py-[72px] sm:px-6 lg:py-[120px]">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeading eyebrow={features.eyebrow} title={features.title} id="features-title" className="mb-12" />
        <motion.div
          variants={stagger(0.07)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="grid grid-cols-1 gap-4 md:grid-cols-6 lg:grid-cols-12 [grid-auto-flow:dense]"
        >
          {features.tiles.map((t) => {
            const d = DEFS[t.id];
            return (
              <Tile key={t.id} title={t.title} body={t.body} className={d.span}>
                {d.visual}
              </Tile>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
