"use client";

import dynamic from "next/dynamic";
import { how } from "../content";
import { LazyWhenNear, StageSkeleton } from "../lazy-when-near";
import { SectionHeading } from "../reveal";

const HowStages = dynamic(() => import("./how-stages"), {
  ssr: false,
  loading: () => <StageSkeleton className="mx-auto w-full max-w-[760px]" />,
});

export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="lm-section px-4 py-[72px] sm:px-6 lg:py-[120px]">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeading eyebrow={how.eyebrow} title={how.title} id="how-title" className="mb-12" />
        <p className="lm-sr">
          Four steps: upload a PDF, watch animated lessons play, try the exercise in the IDE with Guru&apos;s help, and
          watch your mastery and revision plan update.
        </p>
        <LazyWhenNear minHeight={420} skeleton={<StageSkeleton className="mx-auto w-full max-w-[760px]" />}>
          <HowStages />
        </LazyWhenNear>
      </div>
    </section>
  );
}
