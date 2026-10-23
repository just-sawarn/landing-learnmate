import { Asterisk, Database, Sparkles, Zap } from "lucide-react";
import { cn } from "../cn";

export type Provider = "Gemini" | "Claude" | "Groq" | "Supabase";

const ICONS = { Gemini: Sparkles, Claude: Asterisk, Groq: Zap, Supabase: Database } as const;

export function ProviderBadge({
  provider,
  solid = false,
  className,
}: {
  provider: Provider;
  solid?: boolean;
  className?: string;
}) {
  const Icon = ICONS[provider];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium",
        solid ? "border-ink bg-ink text-bg" : "border-line bg-surface text-ink-2",
        className,
      )}
    >
      <Icon size={11} strokeWidth={2.2} aria-hidden="true" />
      {provider}
    </span>
  );
}
