import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Sparkles, Loader2 } from "lucide-react";
import { chatReply } from "@/lib/mock-ai";

export const Route = createFileRoute("/app/chat")({
  head: () => ({ meta: [{ title: "AI Assistant — Copilot" }] }),
  component: Chat,
});

interface Msg { role: "user" | "assistant"; content: string; }

function Chat() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hi! I'm your operations copilot. Ask me to summarize the week, surface blockers, rebalance the team, or pull insights from a recent transcript." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setMessages((m) => [...m, { role: "user", content: userMsg }]);
    setInput(""); setLoading(true);
    const reply = await chatReply(userMsg);
    setMessages((m) => [...m, { role: "assistant", content: reply }]);
    setLoading(false);
  };

  const suggestions = ["Give me this week's brief", "Top priorities tomorrow?", "Who's overloaded on the team?"];

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">Conversation</p>
        <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight mt-1">AI Assistant</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">Ask anything about your operations, tasks, or analyses.</p>
      </div>

      <div className="flex-1 glass card-shadow rounded-2xl flex flex-col overflow-hidden min-h-[60vh]">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
              <div className={`h-8 w-8 rounded-full grid place-items-center shrink-0 ${m.role === "user" ? "bg-muted" : "gradient-bg glow-shadow"}`}>
                {m.role === "user" ? <span className="text-xs font-semibold">You</span> : <Sparkles className="h-4 w-4 text-primary-foreground" />}
              </div>
              <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted/40 border border-border/40"
              }`}>{m.content}</div>
            </motion.div>
          ))}
          {loading && (
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full gradient-bg grid place-items-center"><Sparkles className="h-4 w-4 text-primary-foreground" /></div>
              <div className="rounded-2xl px-4 py-3 bg-muted/40 border border-border/40 inline-flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-3.5 w-3.5 animate-spin" /> Thinking…
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        <div className="border-t border-border/40 p-4">
          <div className="flex flex-wrap gap-2 mb-3">
            {suggestions.map((s) => (
              <button key={s} onClick={() => setInput(s)} className="text-xs rounded-full bg-muted/50 border border-border/40 px-3 py-1.5 text-muted-foreground hover:text-foreground hover:bg-muted">
                {s}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              value={input} onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask your copilot…"
              className="flex-1 rounded-lg bg-input/40 border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
            <button onClick={send} disabled={!input.trim() || loading}
              className="rounded-lg gradient-bg px-4 text-primary-foreground glow-shadow disabled:opacity-50">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
