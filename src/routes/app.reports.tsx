import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Download, Copy, Sparkles, Loader2, Calendar } from "lucide-react";
import { demoReports } from "@/lib/demo-data";
import { toast } from "sonner";

export const Route = createFileRoute("/app/reports")({
  head: () => ({ meta: [{ title: "Reports — Copilot" }] }),
  component: Reports,
});

function Reports() {
  const [selected, setSelected] = useState(demoReports[0]);
  const [generating, setGenerating] = useState(false);

  const generate = async () => {
    setGenerating(true);
    await new Promise((r) => setTimeout(r, 1200));
    setGenerating(false);
    toast.success("New report generated");
  };

  const exportPdf = () => {
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`
      <html><head><title>${selected.title}</title>
      <style>body{font-family:Inter,system-ui;max-width:720px;margin:40px auto;padding:0 24px;color:#111;line-height:1.6}
      h1{font-size:28px;margin-bottom:4px}h2{font-size:16px;margin-top:28px;border-bottom:1px solid #ddd;padding-bottom:6px}
      .meta{color:#666;font-size:13px;margin-bottom:24px}ul{padding-left:20px}</style></head>
      <body>
        <h1>${selected.title}</h1>
        <div class="meta">${selected.date} · By ${selected.author}</div>
        <h2>Executive Summary</h2><p>${selected.summary}</p>
        <h2>Key Insights</h2><ul>${selected.insights.map((i) => `<li>${i}</li>`).join("")}</ul>
        <h2>Risks</h2><ul>${selected.risks.map((i) => `<li>${i}</li>`).join("")}</ul>
        <h2>Recommended Actions</h2><ul>${selected.recommendations.map((i) => `<li>${i}</li>`).join("")}</ul>
      </body></html>
    `);
    win.document.close();
    setTimeout(() => win.print(), 400);
    toast.success("Report ready to export");
  };

  const copy = () => {
    const txt = `${selected.title}\n\n${selected.summary}\n\nInsights:\n${selected.insights.map((i) => `• ${i}`).join("\n")}\n\nRisks:\n${selected.risks.map((i) => `• ${i}`).join("\n")}\n\nRecommendations:\n${selected.recommendations.map((i) => `• ${i}`).join("\n")}`;
    navigator.clipboard.writeText(txt);
    toast.success("Report copied to clipboard");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Insights</p>
          <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight mt-1">Executive Reports</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">AI-generated, exec-ready summaries — published in seconds.</p>
        </div>
        <button onClick={generate} disabled={generating} className="inline-flex items-center gap-2 rounded-lg gradient-bg px-4 py-2.5 text-sm font-semibold text-primary-foreground glow-shadow disabled:opacity-60">
          {generating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          {generating ? "Generating…" : "Generate new report"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        <div className="lg:col-span-1 space-y-2">
          {demoReports.map((r) => (
            <button key={r.id} onClick={() => setSelected(r)}
              className={`w-full text-left glass rounded-xl p-4 transition ${selected.id === r.id ? "ring-2 ring-primary/60 card-shadow" : "hover:bg-card/80"}`}>
              <div className="flex items-start gap-3">
                <FileText className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-medium leading-snug">{r.title}</p>
                  <p className="text-[11px] text-muted-foreground mt-1 inline-flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {r.date}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <motion.div key={selected.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-3 glass card-shadow rounded-2xl p-8">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h2 className="font-display text-2xl font-bold">{selected.title}</h2>
              <p className="text-xs text-muted-foreground mt-1">{selected.date} · by {selected.author}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={copy} className="text-xs inline-flex items-center gap-1.5 rounded-md bg-muted px-3 py-1.5 hover:text-foreground text-muted-foreground">
                <Copy className="h-3.5 w-3.5" /> Copy
              </button>
              <button onClick={exportPdf} className="text-xs inline-flex items-center gap-1.5 rounded-md gradient-bg text-primary-foreground px-3 py-1.5 font-semibold">
                <Download className="h-3.5 w-3.5" /> Export PDF
              </button>
            </div>
          </div>

          <section className="mt-8">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Executive Summary</h3>
            <p className="text-sm leading-relaxed">{selected.summary}</p>
          </section>

          <section className="mt-6">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Key Insights</h3>
            <ul className="space-y-2">
              {selected.insights.map((i, idx) => (
                <li key={idx} className="flex gap-3 text-sm rounded-lg bg-muted/30 border border-border/40 p-3">
                  <span className="text-primary font-semibold">{idx + 1}.</span>{i}
                </li>
              ))}
            </ul>
          </section>

          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <section>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Risks</h3>
              <ul className="space-y-2">
                {selected.risks.map((r, i) => (
                  <li key={i} className="flex gap-2 text-sm rounded-lg bg-[oklch(0.65_0.22_25)]/8 border border-[oklch(0.65_0.22_25)]/30 p-3">
                    <span className="text-[oklch(0.78_0.22_25)]">!</span>{r}
                  </li>
                ))}
              </ul>
            </section>
            <section>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Recommendations</h3>
              <ul className="space-y-2">
                {selected.recommendations.map((r, i) => (
                  <li key={i} className="flex gap-2 text-sm rounded-lg bg-[oklch(0.72_0.16_155)]/8 border border-[oklch(0.72_0.16_155)]/30 p-3">
                    <span className="text-[oklch(0.72_0.16_155)]">✓</span>{r}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
