import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, Upload, FileText, Loader2, CheckCircle2, AlertTriangle,
  ArrowRight, Copy, Wand2,
} from "lucide-react";
import { analyzeText } from "@/lib/mock-ai";
import { sampleTranscript, type Analysis } from "@/lib/demo-data";
import { toast } from "sonner";

export const Route = createFileRoute("/app/analyzer")({
  head: () => ({ meta: [{ title: "AI Analyzer — Copilot" }] }),
  component: Analyzer,
});

function Analyzer() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);

  const run = async () => {
    if (!text.trim()) { toast.error("Paste a transcript or upload a file first"); return; }
    setLoading(true);
    try {
      const a = await analyzeText(text);
      setAnalysis(a);
      toast.success("Analysis complete");
    } finally { setLoading(false); }
  };

  const onFile = async (file: File) => {
    if (file.size > 2_000_000) { toast.error("File too large (max 2MB)"); return; }
    const t = await file.text();
    setText(t);
    toast.success(`Loaded ${file.name}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">Workspace</p>
        <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight mt-1">AI Transcript Analyzer</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">Paste a transcript, email thread, or notes. Get tasks, owners, deadlines, risks and next steps in seconds.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Input */}
        <div className="lg:col-span-2 space-y-4">
          <div
            onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
            onDragLeave={() => setDrag(false)}
            onDrop={(e) => { e.preventDefault(); setDrag(false); const f = e.dataTransfer.files[0]; if (f) onFile(f); }}
            className={`glass card-shadow rounded-2xl p-5 transition ${drag ? "ring-2 ring-primary/60" : ""}`}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display font-semibold">Source</h3>
              <div className="flex gap-1.5">
                <button onClick={() => setText(sampleTranscript)} className="text-[11px] inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-muted-foreground hover:text-foreground">
                  <Wand2 className="h-3 w-3" /> Use sample
                </button>
                <button onClick={() => fileRef.current?.click()} className="text-[11px] inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-muted-foreground hover:text-foreground">
                  <Upload className="h-3 w-3" /> Upload .txt
                </button>
                <input ref={fileRef} type="file" accept=".txt,.md" hidden onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])} />
              </div>
            </div>
            <textarea
              value={text} onChange={(e) => setText(e.target.value)}
              placeholder="Paste your meeting transcript, email thread, or operational notes here…"
              className="w-full h-72 rounded-xl bg-input/40 border border-border p-4 text-sm font-mono leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
            <div className="mt-3 flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground">{text.length.toLocaleString()} characters · drag a file to upload</span>
              <button
                onClick={run} disabled={loading || !text.trim()}
                className="inline-flex items-center gap-2 rounded-lg gradient-bg px-4 py-2 text-sm font-semibold text-primary-foreground glow-shadow hover:opacity-95 disabled:opacity-50"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                {loading ? "Analyzing…" : "Analyze with AI"}
              </button>
            </div>
          </div>

          <div className="glass rounded-2xl p-5">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">What you'll get</h4>
            <ul className="space-y-2 text-sm">
              {["Executive summary", "Key discussion points", "Action items with owners + dates", "Risks and follow-ups", "Suggested next steps", "Priority classification"].map((b) => (
                <li key={b} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[oklch(0.72_0.16_155)]" /> {b}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Output */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {!analysis && !loading && (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="glass card-shadow rounded-2xl p-12 text-center h-full min-h-[500px] grid place-items-center">
                <div>
                  <div className="mx-auto h-14 w-14 rounded-2xl gradient-bg grid place-items-center mb-4 glow-shadow">
                    <FileText className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-xl font-semibold">Ready when you are</h3>
                  <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">Paste content on the left and run the analyzer. Results appear here.</p>
                </div>
              </motion.div>
            )}

            {loading && (
              <motion.div key="load" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="glass card-shadow rounded-2xl p-12 h-full min-h-[500px] grid place-items-center">
                <div className="text-center">
                  <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
                  <p className="mt-4 font-display text-lg">Reading transcript…</p>
                  <p className="text-xs text-muted-foreground mt-1">Extracting tasks, owners, and risks</p>
                </div>
              </motion.div>
            )}

            {analysis && !loading && (
              <motion.div key="result" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                <div className="glass card-shadow rounded-2xl p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-semibold ${
                        analysis.priority === "critical" ? "bg-[oklch(0.65_0.22_25)]/15 text-[oklch(0.78_0.22_25)]" :
                        analysis.priority === "high" ? "bg-[oklch(0.78_0.16_75)]/15 text-[oklch(0.85_0.16_75)]" :
                        "bg-primary/15 text-primary"
                      }`}>{analysis.priority} priority</span>
                      <h3 className="mt-2 font-display text-xl font-semibold">Executive summary</h3>
                    </div>
                    <button onClick={() => { navigator.clipboard.writeText(analysis.summary); toast.success("Summary copied"); }}
                      className="text-xs inline-flex items-center gap-1 rounded-md bg-muted px-2.5 py-1.5 hover:text-foreground text-muted-foreground">
                      <Copy className="h-3 w-3" /> Copy
                    </button>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/90">{analysis.summary}</p>
                </div>

                <div className="glass rounded-2xl p-6">
                  <h4 className="font-display font-semibold mb-3">Action items</h4>
                  <div className="space-y-2">
                    {analysis.actionItems.map((a, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                        className="flex items-start gap-3 rounded-lg bg-muted/30 border border-border/40 p-3">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm">{a.text}</p>
                          <p className="text-[11px] text-muted-foreground mt-0.5">{a.owner} · due {a.due}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="glass rounded-2xl p-6">
                    <h4 className="font-display font-semibold mb-3 inline-flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-primary" /> Key points
                    </h4>
                    <ul className="space-y-2 text-sm">
                      {analysis.keyPoints.map((k, i) => <li key={i} className="flex gap-2"><span className="text-primary">›</span>{k}</li>)}
                    </ul>
                  </div>
                  <div className="glass rounded-2xl p-6">
                    <h4 className="font-display font-semibold mb-3 inline-flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-[oklch(0.78_0.22_25)]" /> Risks
                    </h4>
                    <ul className="space-y-2 text-sm">
                      {analysis.risks.map((r, i) => <li key={i} className="flex gap-2"><span className="text-[oklch(0.78_0.22_25)]">!</span>{r}</li>)}
                    </ul>
                  </div>
                </div>

                <div className="glass rounded-2xl p-6">
                  <h4 className="font-display font-semibold mb-3">Suggested next steps</h4>
                  <div className="space-y-2">
                    {analysis.nextSteps.map((n, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <ArrowRight className="h-4 w-4 text-primary" /> {n}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
