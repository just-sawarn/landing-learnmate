"use client";

import { motion } from "motion/react";
import { trust } from "./content";
import { enter, stagger, VIEWPORT } from "./motion";

export function TrustStrip() {
  return (
    <section aria-label="Powered by" className="border-y border-line px-4 py-8 sm:px-6">
      <motion.div
        variants={stagger(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="mx-auto flex max-w-[1200px] flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between"
      >
        <motion.p variants={enter} className="m-0 text-xs font-medium tracking-[0.14em] text-muted uppercase">
          {trust.label}
        </motion.p>
        <ul className="m-0 grid w-full list-none grid-cols-2 gap-x-8 gap-y-5 p-0 lg:flex lg:w-auto lg:gap-12">
          {trust.items.map((t) => (
            <motion.li key={t.name} variants={enter}>
              <span className="block text-[22px] font-semibold tracking-[-0.02em] text-ink">{t.name}</span>
              <span className="text-sm text-muted">{t.role}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
