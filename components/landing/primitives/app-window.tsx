import { Lock } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "../cn";

/** Framed app window with traffic-light dots and a fake URL bar. */
export function AppWindow({
  url,
  children,
  className,
  bodyClassName,
}: {
  url: string;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <div className={cn("overflow-hidden rounded-[14px] border border-line bg-surface shadow-raised", className)}>
      <div className="flex h-9 items-center gap-3 border-b border-line bg-surface-2 px-3">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-2.5 rounded-full border border-ink/30 bg-surface" />
          ))}
        </div>
        <div className="mx-auto flex h-6 w-[44%] items-center justify-center gap-1.5 rounded-full border border-line bg-surface font-mono text-xs text-muted">
          <Lock size={10} aria-hidden="true" />
          {url}
        </div>
        <div className="w-[42px]" />
      </div>
      <div className={bodyClassName}>{children}</div>
    </div>
  );
}
