import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Sparkles, ArrowRight, CheckCircle2, FileText, ListChecks,
  BarChart3, Brain, Zap, Shield, Users, Star,
} from "lucide-react";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Operations Copilot — Turn meetings into action" },
      { name: "description", content: "Convert meeting transcripts, emails and notes into structured tasks, summaries and executive reports — automatically." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center">
          <Logo />
          <nav className="hidden md:flex items-center gap-8 mx-auto text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition">Features</a>
            <a href="#benefits" className="hover:text-foreground transition">Benefits</a>
            <a href="#stats" className="hover:text-foreground transition">Stats</a>
            <a href="#testimonials" className="hover:text-foreground transition">Testimonials</a>
          </nav>
          <div className="ml-auto flex items-center gap-3">
            <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground transition">Sign in</Link>
            <Link to="/signup" className="rounded-lg gradient-bg px-4 py-2 text-sm font-medium text-primary-foreground glow-shadow hover:opacity-95 transition">
              Start free
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />
        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-muted-foreground mb-8"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.72_0.16_155)] animate-pulse" />
            New · GPT-5 powered task extraction
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]"
          >
            Turn every meeting
            <br />
            into <span className="gradient-text">structured action.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground"
          >
            AI Operations Copilot reads your transcripts, emails and notes — then ships back tasks,
            owners, deadlines, risks, and an exec-ready report. Save hours per week, every week.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <Link to="/signup" className="group inline-flex items-center gap-2 rounded-xl gradient-bg px-6 py-3 text-sm font-semibold text-primary-foreground glow-shadow hover:scale-[1.02] transition">
              Start free trial <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition" />
            </Link>
            <Link to="/app/dashboard" className="inline-flex items-center gap-2 rounded-xl glass px-6 py-3 text-sm font-semibold hover:bg-card transition">
              Open live demo
            </Link>
          </motion.div>

          <p className="mt-5 text-xs text-muted-foreground">No credit card · SOC 2 ready · Self-host available</p>

          {/* Hero preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55 }}
            className="mt-16 mx-auto max-w-5xl"
          >
            <div className="glass card-shadow rounded-2xl p-2">
              <div className="rounded-xl bg-card overflow-hidden border border-border/50">
                <div className="flex items-center gap-2 border-b border-border/50 px-4 py-2.5">
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-[oklch(0.65_0.22_25)]/70" />
                    <div className="h-2.5 w-2.5 rounded-full bg-[oklch(0.78_0.16_75)]/70" />
                    <div className="h-2.5 w-2.5 rounded-full bg-[oklch(0.72_0.16_155)]/70" />
                  </div>
                  <span className="ml-3 text-xs text-muted-foreground">copilot.acme.co/app/analyzer</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
                  <div className="md:col-span-2 p-6 border-r border-border/50">
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Input · Transcript</div>
                    <div className="space-y-2 text-xs text-muted-foreground/90 font-mono">
                      <p>Aria: Billing migration cutover is May 22…</p>
                      <p>Marcus: Need a senior backend by Wed.</p>
                      <p>Diego: Three enterprise leads blocked on legal.</p>
                      <p className="text-muted-foreground/50">[+ 24 more lines]</p>
                    </div>
                  </div>
                  <div className="md:col-span-3 p-6 space-y-3">
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">AI Output · Action items</div>
                    {[
                      { p: "critical", t: "Pair Sam on reconciliation job", o: "Marcus · May 13" },
                      { p: "high", t: "Escalate enterprise legal redlines", o: "Diego · May 12" },
                      { p: "high", t: "Deliver churn analysis draft", o: "Priya · May 14" },
                      { p: "medium", t: "Reconcile April vendor invoices", o: "Sana · May 20" },
                    ].map((a, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + i * 0.1 }}
                        className="flex items-center gap-3 rounded-lg bg-muted/40 p-3 border border-border/50"
                      >
                        <CheckCircle2 className="h-4 w-4 text-[oklch(0.72_0.16_155)] shrink-0" />
                        <div className="flex-1 text-left min-w-0">
                          <p className="text-sm font-medium truncate">{a.t}</p>
                          <p className="text-xs text-muted-foreground">{a.o}</p>
                        </div>
                        <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-semibold ${
                          a.p === "critical" ? "bg-[oklch(0.65_0.22_25)]/15 text-[oklch(0.78_0.22_25)]"
                          : a.p === "high" ? "bg-[oklch(0.78_0.16_75)]/15 text-[oklch(0.85_0.16_75)]"
                          : "bg-primary/15 text-primary"
                        }`}>{a.p}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section id="stats" className="border-y border-border/40 bg-card/30 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { v: "8.4 hrs", l: "Saved per user / week" },
            { v: "94%", l: "Task extraction accuracy" },
            { v: "3.2×", l: "Faster exec reporting" },
            { v: "112+", l: "Teams shipping with us" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="font-display text-3xl md:text-4xl font-bold gradient-text">{s.v}</div>
              <div className="text-xs md:text-sm text-muted-foreground mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">Built for operators</h2>
          <p className="mt-4 text-muted-foreground">Everything your ops team needs to turn unstructured chaos into measured outcomes.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { i: Brain, t: "AI Transcript Analyzer", d: "Paste a transcript or upload a file — get summary, action items, owners, deadlines and risks instantly." },
            { i: ListChecks, t: "Smart Task Extraction", d: "Tasks ship with assignee, due date, priority, department and confidence — ready for kanban or table views." },
            { i: FileText, t: "Executive Reports", d: "One-click exec-ready summaries with insights, blockers, risks and recommended actions. Export to PDF." },
            { i: BarChart3, t: "Productivity Analytics", d: "Time saved, automation success rate, weekly efficiency, department workload — visualised beautifully." },
            { i: Zap, t: "AI Assistant", d: "Ask anything about your operations. Search analyses, request summaries, surface blockers in seconds." },
            { i: Shield, t: "Enterprise grade", d: "JWT auth, RLS, audit logs, granular roles, and self-host option. Built for serious teams." },
          ].map((f, i) => {
            const Icon = f.i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass rounded-2xl p-6 hover:border-primary/40 transition group"
              >
                <div className="h-11 w-11 rounded-xl gradient-bg grid place-items-center mb-4 group-hover:scale-110 transition">
                  <Icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="font-display font-semibold text-lg">{f.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.d}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="border-t border-border/40 bg-card/20">
        <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
              Reclaim the hours your team loses to <span className="gradient-text">manual ops.</span>
            </h2>
            <p className="mt-5 text-muted-foreground">
              Every week, your operators spend hours summarizing meetings, chasing action items, and writing
              reports leadership barely reads. Copilot does it in seconds — and does it better.
            </p>
            <ul className="mt-8 space-y-3">
              {[
                "Cut meeting documentation time by 80%",
                "Eliminate dropped action items and missed deadlines",
                "Generate executive-ready reports on demand",
                "Surface risks and blockers your team would have missed",
              ].map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[oklch(0.72_0.16_155)] mt-0.5 shrink-0" />
                  <span className="text-sm">{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="glass rounded-2xl p-8 card-shadow">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="font-display font-semibold">This week with Copilot</span>
              </div>
              <div className="space-y-4">
                {[
                  { l: "Time saved", v: "42 hrs", c: "oklch(0.72 0.16 155)" },
                  { l: "Tasks auto-extracted", v: "184", c: "oklch(0.66 0.20 285)" },
                  { l: "Reports generated", v: "12", c: "oklch(0.78 0.18 220)" },
                  { l: "Risks surfaced early", v: "7", c: "oklch(0.78 0.16 75)" },
                ].map((m) => (
                  <div key={m.l} className="flex items-center justify-between rounded-lg bg-muted/40 p-4 border border-border/50">
                    <span className="text-sm text-muted-foreground">{m.l}</span>
                    <span className="font-display text-2xl font-bold" style={{ color: m.c }}>{m.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">Loved by ops leaders</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { n: "Sarah Whitman", r: "VP Ops, Northwind", q: "Our weekly briefings used to take a full afternoon. Now they're done in 4 minutes and the leadership team actually reads them." },
            { n: "Kunal Mehta", r: "COO, Lattice.io", q: "The task extraction accuracy is genuinely scary-good. We've stopped dropping commitments from cross-functional meetings entirely." },
            { n: "Elena Rossi", r: "Head of PMO, Helix", q: "It paid for itself in the first week. The risk detection alone has saved us two missed deadlines this quarter." },
          ].map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-[oklch(0.78_0.16_75)] text-[oklch(0.78_0.16_75)]" />
                ))}
              </div>
              <p className="text-sm leading-relaxed">"{t.q}"</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="h-9 w-9 rounded-full gradient-bg grid place-items-center text-sm font-semibold text-primary-foreground">
                  {t.n.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium">{t.n}</p>
                  <p className="text-xs text-muted-foreground">{t.r}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="glass rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-20 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)]" />
          <div className="relative">
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
              Ship operations at <span className="gradient-text">AI speed.</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Join 100+ teams turning every meeting into measurable progress.
            </p>
            <Link to="/signup" className="mt-8 inline-flex items-center gap-2 rounded-xl gradient-bg px-7 py-3.5 text-sm font-semibold text-primary-foreground glow-shadow hover:scale-[1.02] transition">
              Get started free <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/40">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <Logo size="sm" />
          <p className="text-xs text-muted-foreground">© 2026 AI Operations Copilot · Built for operators who ship</p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Users className="h-3.5 w-3.5" /> SOC 2 · GDPR · HIPAA-ready
          </div>
        </div>
      </footer>
    </div>
  );
}
