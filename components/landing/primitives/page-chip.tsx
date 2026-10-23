import { FileText } from "lucide-react";
import { cn } from "../cn";

export function PageChip({ page, className }: { page: number; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1 rounded-full border whitespace-nowrap border-line bg-surface px-2 py-0.5 font-mono text-xs text-muted",
        className,
      )}
    >
      <FileText size={11} aria-hidden="true" />
      p. {page}
    </span>
  );
}
