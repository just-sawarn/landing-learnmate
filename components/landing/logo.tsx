import { cn } from "./cn";

/** Open book whose spine is a blinking code cursor. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" className={cn("size-7", className)} fill="none" aria-hidden="true">
      <path
        d="M13 6.5C10.5 4.8 7 4.5 3.5 5v15.5c3.5-.5 7-.2 9.5 1.5V6.5z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M15 6.5c2.5-1.7 6-2 9.5-1.5v15.5c-3.5-.5-7-.2-9.5 1.5V6.5z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <rect className="lm-caret-rect" x="13" y="5" width="2" height="18" rx="1" fill="currentColor" />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-ink", className)}>
      <LogoMark />
      <span className="text-[17px] font-semibold tracking-[-0.02em]">LearnMate</span>
    </span>
  );
}
