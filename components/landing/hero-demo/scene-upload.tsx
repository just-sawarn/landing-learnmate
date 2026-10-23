"use client";

import { AnimatePresence, motion, useTransform } from "motion/react";
import { EASE } from "../motion";
import { PdfCard, ProviderBadge, useStep } from "../primitives";
import { Fade, SceneRoot, type SceneProps } from "./shared";

const STATUS = ["Reading pages…", "Finding topics…", "Building exercises…"];

export function SceneUpload({ t, ref }: SceneProps) {
  const step = useStep(t, [650, 700, 1350, 1950]);
  const fill = useTransform(t, [700, 2400], [0, 1]);
  const status = Math.min(Math.max(step - 2, 0), STATUS.length - 1);
  return (
    <SceneRoot ref={ref} fadeIn>
      <Fade className="absolute top-0 left-0 w-full text-center text-[13px] text-muted">
        Step 1 · Drop your study material
      </Fade>
      <motion.div
        className="absolute top-[28px] left-[184px] h-[200px] w-[360px] rounded-[20px] border-2 border-dashed border-ink/45 bg-surface-2/60"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: step >= 1 ? [1, 1.03, 1] : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: step >= 1 ? 0.5 : 0.35, ease: EASE }}
      >
        <p className="absolute inset-x-0 bottom-3 m-0 text-center text-xs text-muted">
          PDF up to 20 pages, or paste text
        </p>
        <AnimatePresence>
          {step >= 2 && (
            <motion.span
              className="absolute top-3 right-3"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <ProviderBadge provider="Gemini" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
      <motion.div layoutId="pdf" className="absolute top-[58px] left-[279px] w-[170px]" style={{ borderRadius: 8 }}>
        <motion.div
          initial={{ y: -150, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 170, damping: 17 }}
        >
          <PdfCard name="python-loops-lists.pdf" />
        </motion.div>
      </motion.div>
      <Fade className="absolute top-[254px] left-[184px] w-[360px]">
        <div className="h-1 overflow-hidden rounded-full bg-line">
          <motion.div className="h-full origin-left rounded-full bg-ink" style={{ scaleX: fill }} />
        </div>
        <div className="relative mt-2 h-5 text-center text-[13px] font-medium text-ink-2">
          <AnimatePresence mode="popLayout" initial={false}>
            {step >= 2 && (
              <motion.span
                key={status}
                className="absolute inset-x-0"
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -8, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {STATUS[status]}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </Fade>
    </SceneRoot>
  );
}
