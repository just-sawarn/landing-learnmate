"use client";

import { motion, useInView } from "motion/react";
import { useReduced } from "./use-reduced";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { useCta } from "./auth-context";
import { finalCta } from "./content";
import { enter, stagger, VIEWPORT } from "./motion";

const GLYPHS = ["{ }", "( )", "=>", "for", "if", "[ ]", "i++", "def", "</>", "0", "1", "&&"];
const PLACED = Array.from({ length: 22 }, (_, i) => ({
  g: GLYPHS[i % GLYPHS.length],
  left: (i * 37 + 9) % 94,
  top: (i * 53 + 7) % 86,
  dur: 14 + (i % 6) * 3,
  size: 18 + (i % 4) * 8,
}));

export function FinalCta() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "100px" });
  const reduce = useReduced();
  const cta = useCta();
  return (
    <section aria-labelledby="cta-title" className="px-4 pb-[72px] sm:px-6 lg:pb-[120px]">
      <motion.div
        ref={ref}
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="relative mx-auto max-w-[1200px] overflow-hidden rounded-[32px] bg-ink px-6 py-20 text-center sm:py-28"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 font-mono text-bg opacity-[0.07] select-none"
        >
          {PLACED.map((c, i) => (
            <motion.span
              key={i}
              data-g={c.g}
              className="absolute before:content-[attr(data-g)]"
              style={{ left: `${c.left}%`, top: `${c.top}%`, fontSize: c.size }}
              animate={inView && !reduce ? { y: [0, -24, 0], x: [0, 10, 0] } : { y: 0, x: 0 }}
              transition={{ duration: c.dur, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </div>
        <motion.h2
          id="cta-title"
          variants={enter}
          className="relative m-0 text-[38px] leading-[1.05] font-semibold tracking-[-0.03em] text-bg sm:text-[60px]"
        >
          {finalCta.title}
        </motion.h2>
        <motion.div variants={enter} className="relative mt-10">
          <Link
            href={cta.final.href}
            className="group inline-flex items-center gap-2 rounded-full bg-bg px-7 py-4 text-[16px] font-medium text-ink transition-transform hover:-translate-y-0.5"
          >
            {cta.final.label}
            <ArrowRight
              size={16}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
