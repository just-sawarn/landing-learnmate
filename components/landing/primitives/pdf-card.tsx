import { cn } from "../cn";

/** A small PDF file icon with an optional filename label. */
export function PdfCard({ name, className }: { name?: string; className?: string }) {
  return (
    <div className={cn("flex flex-col items-center gap-1.5", className)}>
      <div className="relative h-[84px] w-16 rounded-[8px] border border-ink bg-surface shadow-raised">
        <span className="absolute top-0 right-0 size-4 rounded-bl-[6px] border-b border-l border-ink bg-surface-2" />
        <span className="absolute bottom-2 left-2 rounded bg-ink px-1.5 py-px font-mono text-xs font-semibold text-bg">
          PDF
        </span>
        <span className="absolute top-5 left-2 h-1 w-9 rounded-full bg-line" />
        <span className="absolute top-8 left-2 h-1 w-7 rounded-full bg-line" />
        <span className="absolute top-11 left-2 h-1 w-10 rounded-full bg-line" />
      </div>
      {name && <span className="font-mono text-xs whitespace-nowrap text-ink-2">{name}</span>}
    </div>
  );
}
