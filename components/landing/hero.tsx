"use client";

import { motion } from "motion/react";
import { ArrowRight, CircleHelp, FileText, Play, SquareTerminal } from "lucide-react";
import Link from "next/link";
import { useCta } from "./auth-context";
import { hero } from "./content";
import { HeroDemo } from "./hero-demo";
import { EASE, enter, stagger } from "./motion";

const PROOF_ICONS = { page: FileText, code: SquareTerminal, help: CircleHelp } as const;

function Word({ word }: { word: string }) {
  const core = word.replace(/[.,]$/, "");
  const punct = word.slice(core.length);
  const underlined = core === hero.underlineWord;
  return (
    <span className="mr-[0.24em] inline-block whitespace-nowrap">
      <motion.span variants={enter} className="relative inline-block">
        {core}
        {underlined && (
          <svg
            className="pointer-events-none absolute -bottom-[0.14em] left-0 h-[0.2em] w-full overflow-visible"
            viewBox="0 0 100 12"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
          >
            <motion.path
              d="M2 8 C 22 2, 38 11, 56 6 S 86 3, 98 7"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 1.1, ease: EASE }}
            />
          </svg>
        )}
      </motion.span>
      {punct}
    </span>
  );
}

export function Hero() {
  const cta = useCta();
  return (
    <section aria-labelledby="hero-title" className="relative px-4 pt-6 pb-[72px] sm:px-6 sm:pt-10 lg:pb-[120px]">
      <div aria-hidden="true" className="lm-dots absolute inset-x-0 top-0 -z-10 h-[760px]" />
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <motion.div className="lg:col-span-5" variants={stagger(0.08)} initial="hidden" animate="show">
          <motion.p
            variants={enter}
            className="mb-6 inline-flex max-w-full items-center rounded-full border border-line bg-surface px-3.5 py-1.5 text-[13px] text-ink-2 shadow-raised"
          >
            {hero.eyebrow}
          </motion.p>
          <motion.h1
            variants={stagger(0.07, 0.1)}
            className="m-0 text-[40px] leading-[1.04] font-semibold tracking-[-0.03em] text-ink sm:text-[56px] xl:text-[64px]"
          >
            {hero.headline.map((w) => (
              <Word key={w} word={w} />
            ))}
          </motion.h1>
          <motion.p
            variants={enter}
            className="mt-6 mb-0 max-w-[34rem] text-[17px] leading-[1.6] text-ink-2 sm:text-lg"
          >
            {hero.sub}
          </motion.p>
          <motion.div variants={enter} className="mt-8 flex flex-wrap gap-3">
            <Link
              href={cta.hero.href}
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-[15px] font-medium text-bg shadow-raised transition-transform hover:-translate-y-0.5"
            >
              {cta.hero.label}
              <ArrowRight
                size={16}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 rounded-full border border-ink/20 bg-surface px-6 py-3.5 text-[15px] font-medium text-ink transition-colors hover:border-ink/50"
            >
              <Play size={14} aria-hidden="true" className="fill-ink" />
              {hero.secondary}
            </a>
          </motion.div>
          <motion.ul variants={enter} className="m-0 mt-8 flex list-none flex-col gap-2.5 p-0">
            {hero.proof.map((p) => {
              const Icon = PROOF_ICONS[p.icon as keyof typeof PROOF_ICONS];
              return (
                <li key={p.text} className="flex items-center gap-2.5 text-sm text-muted">
                  <Icon size={16} aria-hidden="true" className="shrink-0 text-ink" />
                  {p.text}
                </li>
              );
            })}
          </motion.ul>
        </motion.div>
        <motion.div
          className="lg:col-span-7"
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
        >
          <HeroDemo />
        </motion.div>
      </div>
    </section>
  );
}
