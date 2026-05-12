import { createFileRoute } from "@tanstack/react-router";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis,
} from "recharts";
import { productivityWeekly, departmentLoad, automationTrend } from "@/lib/demo-data";
import { TrendingUp, Zap, Clock, Target } from "lucide-react";

export const Route = createFileRoute("/app/analytics")({
  head: () => ({ meta: [{ title: "Analytics — Copilot" }] }),
  component: Analytics,
});

const tt = { background: "oklch(0.20 0.02 270)", border: "1px solid oklch(0.30 0.02 270 / 0.6)", borderRadius: 12, fontSize: 12 };

function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">Performance</p>
        <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight mt-1">Productivity Analytics</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">Where your team is winning — and where to focus next.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { l: "Time saved", v: "162 hrs", d: "this month", i: Clock, c: "oklch(0.78 0.18 220)" },
          { l: "Automation rate", v: "94%", d: "task extraction", i: Zap, c: "oklch(0.66 0.20 285)" },
          { l: "Avg. cycle time", v: "1.4 d", d: "down 22% WoW", i: TrendingUp, c: "oklch(0.72 0.16 155)" },
          { l: "Goal attainment", v: "87%", d: "of weekly OKRs", i: Target, c: "oklch(0.78 0.16 75)" },
        ].map((k) => {
          const Icon = k.i;
          return (
            <div key={k.l} className="glass card-shadow rounded-2xl p-5">
              <div className="h-9 w-9 rounded-lg grid place-items-center" style={{ background: `color-mix(in oklab, ${k.c} 18%, transparent)` }}>
                <Icon className="h-4 w-4" style={{ color: k.c }} />
              </div>
              <p className="mt-4 font-display text-3xl font-bold">{k.v}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{k.l} · {k.d}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="glass card-shadow rounded-2xl p-6 lg:col-span-2">
          <h3 className="font-display font-semibold text-lg mb-1">Weekly efficiency</h3>
          <p className="text-xs text-muted-foreground mb-4">Productivity score (0–100)</p>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={productivityWeekly} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid stroke="oklch(0.30 0.02 270 / 0.3)" vertical={false} />
              <XAxis dataKey="day" stroke="oklch(0.70 0.02 270)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="oklch(0.70 0.02 270)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tt} />
              <Line type="monotone" dataKey="score" stroke="oklch(0.78 0.18 220)" strokeWidth={3} dot={{ r: 4, fill: "oklch(0.78 0.18 220)" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="glass card-shadow rounded-2xl p-6">
          <h3 className="font-display font-semibold text-lg mb-1">Automation success</h3>
          <p className="text-xs text-muted-foreground mb-4">94% task accuracy</p>
          <ResponsiveContainer width="100%" height={220}>
            <RadialBarChart innerRadius="60%" outerRadius="100%" data={[{ name: "rate", value: 94, fill: "oklch(0.66 0.20 285)" }]} startAngle={90} endAngle={-270}>
              <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
              <RadialBar background={{ fill: "oklch(0.30 0.02 270 / 0.3)" }} dataKey="value" cornerRadius={20} />
            </RadialBarChart>
          </ResponsiveContainer>
          <p className="text-center -mt-32 mb-12 font-display text-4xl font-bold gradient-text relative">94%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass card-shadow rounded-2xl p-6">
          <h3 className="font-display font-semibold text-lg mb-1">Department workload</h3>
          <p className="text-xs text-muted-foreground mb-4">Active tasks per team</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={departmentLoad} margin={{ top: 6, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid stroke="oklch(0.30 0.02 270 / 0.3)" vertical={false} />
              <XAxis dataKey="department" stroke="oklch(0.70 0.02 270)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="oklch(0.70 0.02 270)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tt} cursor={{ fill: "oklch(0.66 0.20 285 / 0.06)" }} />
              <Bar dataKey="load" fill="oklch(0.66 0.20 285)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="glass card-shadow rounded-2xl p-6">
          <h3 className="font-display font-semibold text-lg mb-1">Hours saved trend</h3>
          <p className="text-xs text-muted-foreground mb-4">Last 6 weeks</p>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={automationTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="ga" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.72 0.16 155)" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="oklch(0.72 0.16 155)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid stroke="oklch(0.30 0.02 270 / 0.3)" vertical={false} />
              <XAxis dataKey="week" stroke="oklch(0.70 0.02 270)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="oklch(0.70 0.02 270)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tt} />
              <Area type="monotone" dataKey="saved" stroke="oklch(0.72 0.16 155)" strokeWidth={2.5} fill="url(#ga)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
