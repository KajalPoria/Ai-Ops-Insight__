import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { LayoutGrid, Table2, Search, Filter } from "lucide-react";
import { demoTasks, type Task, type Status } from "@/lib/demo-data";

export const Route = createFileRoute("/app/tasks")({
  head: () => ({ meta: [{ title: "Tasks — Copilot" }] }),
  component: Tasks,
});

const columns: { id: Status; label: string; color: string }[] = [
  { id: "todo", label: "To do", color: "oklch(0.70 0.02 270)" },
  { id: "in_progress", label: "In progress", color: "oklch(0.66 0.20 285)" },
  { id: "review", label: "Review", color: "oklch(0.78 0.16 75)" },
  { id: "done", label: "Done", color: "oklch(0.72 0.16 155)" },
];

const priorityChip = (p: Task["priority"]) => {
  const m: Record<string, string> = {
    critical: "bg-[oklch(0.65_0.22_25)]/15 text-[oklch(0.78_0.22_25)]",
    high: "bg-[oklch(0.78_0.16_75)]/15 text-[oklch(0.85_0.16_75)]",
    medium: "bg-primary/15 text-primary",
    low: "bg-[oklch(0.78_0.18_220)]/15 text-[oklch(0.85_0.18_220)]",
  };
  return m[p];
};

function Tasks() {
  const [view, setView] = useState<"kanban" | "table">("kanban");
  const [q, setQ] = useState("");
  const filtered = useMemo(
    () => demoTasks.filter((t) => t.title.toLowerCase().includes(q.toLowerCase()) || t.assignee.toLowerCase().includes(q.toLowerCase())),
    [q]
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Pipeline</p>
          <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight mt-1">Tasks</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">{filtered.length} tasks · auto-extracted from your sources</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search…"
              className="rounded-lg bg-muted/40 border border-border pl-9 pr-3 py-2 text-sm w-56 focus:outline-none focus:ring-2 focus:ring-primary/40" />
          </div>
          <button className="rounded-lg bg-muted/40 border border-border px-3 py-2 text-sm inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground">
            <Filter className="h-3.5 w-3.5" /> Filter
          </button>
          <div className="flex items-center rounded-lg bg-muted/40 border border-border p-0.5">
            <button onClick={() => setView("kanban")} className={`px-2.5 py-1.5 rounded-md inline-flex items-center gap-1.5 text-xs ${view === "kanban" ? "bg-card text-foreground" : "text-muted-foreground"}`}>
              <LayoutGrid className="h-3.5 w-3.5" /> Kanban
            </button>
            <button onClick={() => setView("table")} className={`px-2.5 py-1.5 rounded-md inline-flex items-center gap-1.5 text-xs ${view === "table" ? "bg-card text-foreground" : "text-muted-foreground"}`}>
              <Table2 className="h-3.5 w-3.5" /> Table
            </button>
          </div>
        </div>
      </div>

      {view === "kanban" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {columns.map((col) => {
            const tasks = filtered.filter((t) => t.status === col.id);
            return (
              <div key={col.id} className="glass rounded-2xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="inline-flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ background: col.color }} />
                    <h3 className="text-sm font-semibold">{col.label}</h3>
                  </div>
                  <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">{tasks.length}</span>
                </div>
                <div className="space-y-2 min-h-[200px]">
                  {tasks.map((t, i) => (
                    <motion.div key={t.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                      className="rounded-xl bg-card p-3.5 border border-border/60 card-shadow hover:border-primary/40 transition cursor-pointer">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium leading-snug flex-1">{t.title}</p>
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        <span className={`text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded font-semibold ${priorityChip(t.priority)}`}>{t.priority}</span>
                        <span className="text-[10px] text-muted-foreground">{t.department}</span>
                        <span className="text-[10px] text-muted-foreground ml-auto">{t.dueDate}</span>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <img src={t.assigneeAvatar} alt={t.assignee} className="h-5 w-5 rounded-full bg-muted" />
                          <span className="text-[11px] text-muted-foreground">{t.assignee.split(" ")[0]}</span>
                        </div>
                        <span className="text-[10px] text-muted-foreground inline-flex items-center gap-1">
                          <span className="h-1 w-1 rounded-full bg-[oklch(0.72_0.16_155)]" /> {Math.round(t.confidence * 100)}%
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="glass card-shadow rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                {["Task", "Assignee", "Department", "Priority", "Status", "Due", "Confidence"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t.id} className="border-t border-border/40 hover:bg-muted/20 transition">
                  <td className="px-4 py-3 font-medium">{t.title}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    <div className="inline-flex items-center gap-2">
                      <img src={t.assigneeAvatar} alt="" className="h-5 w-5 rounded-full bg-muted" />
                      {t.assignee}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{t.department}</td>
                  <td className="px-4 py-3"><span className={`text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded font-semibold ${priorityChip(t.priority)}`}>{t.priority}</span></td>
                  <td className="px-4 py-3 text-muted-foreground capitalize">{t.status.replace("_", " ")}</td>
                  <td className="px-4 py-3 text-muted-foreground">{t.dueDate}</td>
                  <td className="px-4 py-3 text-muted-foreground">{Math.round(t.confidence * 100)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
