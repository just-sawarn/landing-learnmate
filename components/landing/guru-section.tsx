"use client";

import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { guru } from "./content";
import { LazyWhenNear } from "./lazy-when-near";
import { EASE, VIEWPORT } from "./motion";
import { SectionHeading } from "./reveal";

const GuruChat = dynamic(() => import("./guru-chat"), { ssr: false, loading: () => <ChatSkeleton /> });

function ChatSkeleton() {
  return <div aria-hidden="true" className="h-[540px] animate-pulse rounded-[24px] border border-line bg-surface-2" />;
}

export function GuruSection() {
  return (
    <section id="guru" aria-labelledby="guru-title" className="lm-section px-4 py-[72px] sm:px-6 lg:py-[120px]">
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading eyebrow={guru.eyebrow} title={guru.title} id="guru-title" className="mb-10" />
          <ul className="m-0 flex list-none flex-col gap-4 p-0">
            {guru.manifesto.map((line, i) => (
              <motion.li
                key={line}
                initial={{ opacity: 0, x: -16, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={VIEWPORT}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.12 }}
                className="border-l-2 border-ink pl-4 text-[19px] leading-[1.4] text-ink sm:text-[22px]"
              >
                {line}
              </motion.li>
            ))}
          </ul>
        </div>
        <LazyWhenNear minHeight={540} skeleton={<ChatSkeleton />}>
          <GuruChat />
        </LazyWhenNear>
      </div>
    </section>
  );
}
