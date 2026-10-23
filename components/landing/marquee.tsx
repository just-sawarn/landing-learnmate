import {
  Atom,
  Braces,
  Code2,
  Coffee,
  Cpu,
  FileCode2,
  Globe,
  Hash,
  Palette,
  Terminal,
  type LucideIcon,
} from "lucide-react";
import { marquee } from "./content";

const ICONS: Record<string, LucideIcon> = {
  Python: Terminal,
  JavaScript: Braces,
  TypeScript: FileCode2,
  HTML: Globe,
  CSS: Palette,
  React: Atom,
  C: Hash,
  "C++": Cpu,
  Java: Coffee,
  Go: Code2,
  Rust: Cpu,
};

function Row({ items, reverse }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items, ...items, ...items];
  return (
    <div
      className="lm-marquee overflow-hidden"
      style={{
        maskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
        WebkitMaskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
      }}
    >
      <div className={`lm-marquee-track ${reverse ? "rev" : ""}`}>
        {doubled.map((name, i) => {
          const Icon = ICONS[name] ?? Code2;
          return (
            <span
              key={i}
              aria-hidden={i >= items.length}
              className="mr-4 inline-flex shrink-0 items-center gap-2.5 rounded-full border border-line bg-surface px-5 py-3 text-[17px] font-medium text-ink"
            >
              <Icon size={18} aria-hidden="true" />
              {name}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export function Marquee() {
  return (
    <section aria-label="Languages you can run" className="py-[72px] lg:py-[120px]">
      <p className="m-0 mb-8 px-4 text-center text-xs font-medium tracking-[0.14em] text-muted uppercase">
        Runs in the side-along IDE
      </p>
      <div className="flex flex-col gap-4">
        <Row items={marquee.rows[0]} />
        <Row items={marquee.rows[1]} reverse />
      </div>
    </section>
  );
}
