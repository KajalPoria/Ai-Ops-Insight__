import { createFileRoute } from "@tanstack/react-router";
import { demoTeam } from "@/lib/demo-data";
import { Mail } from "lucide-react";

export const Route = createFileRoute("/app/team")({
  head: () => ({ meta: [{ title: "Team — Copilot" }] }),
  component: Team,
});

function Team() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">People</p>
        <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight mt-1">Team</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">{demoTeam.length} members across 6 departments.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {demoTeam.map((m) => (
          <div key={m.id} className="glass card-shadow rounded-2xl p-5">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img src={m.avatar} alt={m.name} className="h-12 w-12 rounded-full bg-muted" />
                <span className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card ${
                  m.status === "online" ? "bg-[oklch(0.72_0.16_155)]" : m.status === "away" ? "bg-[oklch(0.78_0.16_75)]" : "bg-muted-foreground"
                }`} />
              </div>
              <div className="min-w-0">
                <p className="font-semibold truncate">{m.name}</p>
                <p className="text-xs text-muted-foreground truncate">{m.role}</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-muted/40 p-3">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Tasks done</p>
                <p className="font-display text-xl font-bold mt-0.5">{m.tasksCompleted}</p>
              </div>
              <div className="rounded-lg bg-muted/40 p-3">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Productivity</p>
                <p className="font-display text-xl font-bold mt-0.5 gradient-text">{m.productivity}%</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{m.department}</span>
              <a href={`mailto:${m.email}`} className="inline-flex items-center gap-1 text-primary hover:underline">
                <Mail className="h-3 w-3" /> Contact
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
