import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, Legend,
} from "recharts";
import {
  TrendingUp, ListChecks, Sparkles, Clock, ArrowUpRight, ArrowRight,
  CheckCircle2, AlertTriangle,
} from "lucide-react";
import {
  productivityWeekly, priorityDistribution, departmentLoad,
  recentActivity, demoTasks,
} from "@/lib/demo-data";

export const Route = createFileRoute("/app/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Copilot" }] }),
  component: Dashboard,
});

const kpis = [
  { label: "Tasks completed", value: "184", delta: "+12%", icon: CheckCircle2, color: "oklch(0.72 0.16 155)" },
  { label: "Tasks pending", value: "47", delta: "-8%", icon: ListChecks, color: "oklch(0.78 0.16 75)" },
  { label: "AI summaries", value: "62", delta: "+34%", icon: Sparkles, color: "oklch(0.66 0.20 285)" },
  { label: "Time saved", value: "42 hrs", delta: "+18%", icon: Clock, color: "oklch(0.78 0.18 220)" },
];

function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Overview</p>
          <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight mt-1">Operations Dashboard</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">Your team's pulse for the week of May 11.</p>
        </div>
        <Link to="/app/analyzer" className="inline-flex items-center gap-2 rounded-lg gradient-bg px-4 py-2.5 text-sm font-semibold text-primary-foreground glow-shadow">
          <Sparkles className="h-4 w-4" /> New analysis
        </Link>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k, i) => {
          const Icon = k.icon;
          return (
            <motion.div
              key={k.label}
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="glass card-shadow rounded-2xl p-5"
            >
              <div className="flex items-start justify-between">
                <div className="h-9 w-9 rounded-lg grid place-items-center" style={{ backgroundColor: `color-mix(in oklab, ${k.color} 18%, transparent)` }}>
                  <Icon className="h-4.5 w-4.5" style={{ color: k.color }} />
                </div>
                <span className="text-[11px] font-semibold inline-flex items-center gap-0.5 text-[oklch(0.72_0.16_155)]">
                  <ArrowUpRight className="h-3 w-3" /> {k.delta}
                </span>
              </div>
              <p className="mt-4 font-display text-3xl font-bold">{k.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{k.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="glass card-shadow rounded-2xl p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display font-semibold text-lg">Weekly activity</h3>
              <p className="text-xs text-muted-foreground">Tasks created vs completed</p>
            </div>
            <div className="text-xs text-muted-foreground inline-flex items-center gap-1">
              <TrendingUp className="h-3.5 w-3.5 text-[oklch(0.72_0.16_155)]" /> +12% WoW
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={productivityWeekly} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.66 0.20 285)" stopOpacity={0.45}/>
                  <stop offset="95%" stopColor="oklch(0.66 0.20 285)" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.78 0.18 220)" stopOpacity={0.35}/>
                  <stop offset="95%" stopColor="oklch(0.78 0.18 220)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid stroke="oklch(0.30 0.02 270 / 0.3)" vertical={false} />
              <XAxis dataKey="day" stroke="oklch(0.70 0.02 270)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="oklch(0.70 0.02 270)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "oklch(0.20 0.02 270)", border: "1px solid oklch(0.30 0.02 270 / 0.6)", borderRadius: 12, fontSize: 12 }} />
              <Area type="monotone" dataKey="completed" stroke="oklch(0.66 0.20 285)" strokeWidth={2.5} fill="url(#g1)" />
              <Area type="monotone" dataKey="created" stroke="oklch(0.78 0.18 220)" strokeWidth={2.5} fill="url(#g2)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="glass card-shadow rounded-2xl p-6">
          <h3 className="font-display font-semibold text-lg">Priority mix</h3>
          <p className="text-xs text-muted-foreground mb-2">Open tasks by priority</p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={priorityDistribution} dataKey="value" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3}>
                {priorityDistribution.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "oklch(0.20 0.02 270)", border: "1px solid oklch(0.30 0.02 270 / 0.6)", borderRadius: 12, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 space-y-1.5">
            {priorityDistribution.map((p) => (
              <div key={p.name} className="flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{ background: p.color }} />{p.name}</span>
                <span className="text-muted-foreground">{p.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Department + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="glass card-shadow rounded-2xl p-6 lg:col-span-2">
          <h3 className="font-display font-semibold text-lg">Department workload</h3>
          <p className="text-xs text-muted-foreground mb-4">Active tasks per team</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={departmentLoad} margin={{ top: 6, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid stroke="oklch(0.30 0.02 270 / 0.3)" vertical={false} />
              <XAxis dataKey="department" stroke="oklch(0.70 0.02 270)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="oklch(0.70 0.02 270)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "oklch(0.20 0.02 270)", border: "1px solid oklch(0.30 0.02 270 / 0.6)", borderRadius: 12, fontSize: 12 }} cursor={{ fill: "oklch(0.66 0.20 285 / 0.06)" }} />
              <Bar dataKey="load" fill="oklch(0.66 0.20 285)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass card-shadow rounded-2xl p-6">
          <h3 className="font-display font-semibold text-lg">Recent activity</h3>
          <p className="text-xs text-muted-foreground mb-4">Last 24h</p>
          <ul className="space-y-3">
            {recentActivity.map((a) => (
              <li key={a.id} className="flex items-start gap-3 text-sm">
                <div className="h-7 w-7 rounded-full bg-muted grid place-items-center shrink-0 text-[10px] font-semibold">
                  {a.actor === "AI Copilot" ? <Sparkles className="h-3.5 w-3.5 text-primary" /> : a.actor.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="leading-snug">
                    <span className="font-medium">{a.actor}</span>{" "}
                    <span className="text-muted-foreground">{a.action}</span>{" "}
                    <span className="font-medium">{a.target}</span>
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{a.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tasks preview */}
      <div className="glass card-shadow rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-display font-semibold text-lg">High-priority tasks</h3>
            <p className="text-xs text-muted-foreground">What needs eyes today</p>
          </div>
          <Link to="/app/tasks" className="text-xs text-primary inline-flex items-center gap-1 hover:underline">
            View all <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="space-y-2">
          {demoTasks.filter((t) => t.priority === "critical" || t.priority === "high").slice(0, 5).map((t) => (
            <div key={t.id} className="flex items-center gap-3 rounded-lg bg-muted/30 hover:bg-muted/50 p-3 border border-border/40 transition">
              {t.priority === "critical" ? <AlertTriangle className="h-4 w-4 text-[oklch(0.78_0.22_25)] shrink-0" /> : <ListChecks className="h-4 w-4 text-[oklch(0.85_0.16_75)] shrink-0" />}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{t.title}</p>
                <p className="text-[11px] text-muted-foreground">{t.assignee} · {t.department} · due {t.dueDate}</p>
              </div>
              <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-semibold ${
                t.priority === "critical" ? "bg-[oklch(0.65_0.22_25)]/15 text-[oklch(0.78_0.22_25)]" : "bg-[oklch(0.78_0.16_75)]/15 text-[oklch(0.85_0.16_75)]"
              }`}>{t.priority}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
