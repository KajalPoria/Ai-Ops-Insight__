import { Sparkles } from "lucide-react";

export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const px = size === "lg" ? "h-10 w-10" : size === "sm" ? "h-7 w-7" : "h-9 w-9";
  const text = size === "lg" ? "text-2xl" : size === "sm" ? "text-base" : "text-lg";
  return (
    <div className="flex items-center gap-2.5">
      <div className={`${px} relative grid place-items-center rounded-xl gradient-bg glow-shadow`}>
        <Sparkles className="h-1/2 w-1/2 text-primary-foreground" strokeWidth={2.5} />
      </div>
      <div className="flex flex-col leading-none">
        <span className={`font-display font-bold ${text}`}>Copilot</span>
        <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Ops Intelligence</span>
      </div>
    </div>
  );
}
