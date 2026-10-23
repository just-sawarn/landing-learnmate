"use client";

import {
  useRamp,
  MasteryBar,
  TopicPill,
  TestRow,
  VariableBox,
  TypewriterCode,
  GuruBubble,
  ProviderBadge,
  PageChip,
  FakeCursor,
  useProgressSource,
} from "@/components/landing/primitives";
import { useEffect, useState } from "react";

function Box({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="relative rounded-[14px] border border-line bg-surface p-5">
      <p className="mb-3 text-xs font-medium tracking-wide text-muted uppercase">{title}</p>
      {children}
    </div>
  );
}

export function Lab() {
  const [n, setN] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setN((v) => (v + 1) % 5), 900);
    return () => clearInterval(id);
  }, []);
  const src = useProgressSource({ play: true, duration: 3000, repeat: true, repeatDelay: 800 });
  const ramp = useRamp(src, 0, 1, 0, 100);
  return (
    <div className="mx-auto grid max-w-[1000px] gap-4 p-8 md:grid-cols-2">
      <Box title="TypewriterCode (play, repeat)">
        <TypewriterCode text={"for i in range(5):\n    print(i)"} progress={src} />
      </Box>
      <Box title="TypewriterCode (delete → retype)">
        <TypewriterCode from="for i in range(1, 5):" text="for i in range(5):" progress={src} />
      </Box>
      <Box title="VariableBox">
        <VariableBox name="i" value={n} className="w-48" />
      </Box>
      <Box title="TestRow">
        <div className="flex flex-col gap-1.5">
          <TestRow label="idle" state="idle" />
          <TestRow label="running" state="running" />
          <TestRow label={n % 2 ? "pass" : "fail"} state={n % 2 ? "pass" : "fail"} />
        </div>
      </Box>
      <Box title="MasteryBar + TopicPill">
        <MasteryBar label="Loops" value={ramp} />
        <div className="mt-3">
          <TopicPill status={(["weak", "okay", "strong"] as const)[n % 3]} />
        </div>
      </Box>
      <Box title="GuruBubble">
        <GuruBubble text="What's the first number range(1, 5) gives you? (p. 6)" progress={src} />
      </Box>
      <Box title="Badges">
        <div className="flex flex-wrap gap-2">
          <ProviderBadge provider="Gemini" />
          <ProviderBadge provider="Claude" solid />
          <ProviderBadge provider="Groq" />
          <ProviderBadge provider="Supabase" />
          <PageChip page={6} />
        </div>
      </Box>
      <Box title="FakeCursor">
        <div className="h-24">
          <FakeCursor x={n * 50} y={20 + (n % 2) * 30} pressed={n === 3} />
        </div>
      </Box>
    </div>
  );
}
