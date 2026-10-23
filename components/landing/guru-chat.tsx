"use client";

import { AnimatePresence, motion, useInView } from "motion/react";
import { useReduced } from "./use-reduced";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { guru } from "./content";
import { EASE } from "./motion";
import { GuruBubble, TypingDots } from "./primitives";

/** Step at which each message appears; typing dots show between. */
const AT = [300, 3600, 7600, 9000];

export default function GuruChat() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReduced();
  const [liveStep, setStep] = useState(0);
  const [liveOpen, setOpen] = useState(false);
  const step = reduce ? 5 : liveStep;
  const open = reduce ? true : liveOpen;

  useEffect(() => {
    if (reduce || !inView) return;
    const timers = [
      ...AT.map((ms, i) => setTimeout(() => setStep(i + 1), ms)),
      setTimeout(() => setStep(5), 11200),
      setTimeout(() => setOpen(true), 6600),
    ];
    return () => timers.forEach(clearTimeout);
  }, [inView, reduce]);

  const [q1, a1, q2, a2] = guru.chat;
  const typingGuru = step === 1 || step === 3;
  return (
    <div
      ref={ref}
      className="flex h-[540px] flex-col gap-3 rounded-[24px] border border-line bg-surface p-5 shadow-raised sm:p-6"
    >
      <div className="flex items-center gap-2 border-b border-line pb-3 text-sm font-semibold text-ink">
        <span className="flex size-6 items-center justify-center rounded-full bg-ink text-xs text-bg">G</span> Guru
      </div>
      <AnimatePresence initial={false}>
        {step >= 1 && <Student key="q1" text={q1.text} />}
        {step === 1 && <Typing key="t1" />}
        {step >= 2 && (
          <motion.div
            key="a1"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <GuruBubble text={a1.text} play duration={reduce ? 1 : 3400} className="shadow-none" />
          </motion.div>
        )}
        {step >= 2 && (
          <motion.div
            key="looked"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: reduce ? 0 : 3.2 }}
          >
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              className="flex cursor-pointer items-center gap-1.5 rounded-full border border-line bg-surface-2 px-3 py-1 text-xs font-medium text-ink-2"
            >
              {guru.looked}
              <ChevronDown
                size={13}
                aria-hidden="true"
                className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.p
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="m-0 overflow-hidden pl-3 font-mono text-xs text-muted"
                >
                  <span className="block pt-2">{guru.lookedItems}</span>
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        )}
        {step >= 3 && <Student key="q2" text={q2.text} />}
        {step === 3 && <Typing key="t2" />}
        {step >= 4 && (
          <motion.div
            key="a2"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <GuruBubble text={a2.text} play duration={reduce ? 1 : 2000} className="shadow-none" />
          </motion.div>
        )}
      </AnimatePresence>
      <span className="sr-only">{typingGuru ? "Guru is typing" : ""}</span>
    </div>
  );
}

function Student({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: EASE }}
      className="max-w-[80%] self-end rounded-[16px] rounded-br-[4px] bg-ink px-3.5 py-2 text-[14px] text-bg"
    >
      {text}
    </motion.div>
  );
}

function Typing() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.1 } }}
      className="w-fit rounded-[14px] border border-line bg-surface-2 px-3 py-2.5"
    >
      <TypingDots />
    </motion.div>
  );
}
