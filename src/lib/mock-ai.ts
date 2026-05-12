// Mock AI service. In production this calls /analyze on the Express backend (see /server).
import type { Analysis, Priority } from "./demo-data";

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function analyzeText(text: string): Promise<Analysis> {
  await wait(1400);

  const lower = text.toLowerCase();
  const hasUrgent = /urgent|critical|asap|incident|p95|outage|risk/.test(lower);
  const priority: Priority = hasUrgent ? "critical" : text.length > 600 ? "high" : "medium";

  // Naive extraction heuristics for the demo
  const lines = text.split(/\n+/).map((l) => l.trim()).filter(Boolean);
  const actionLines = lines.filter((l) => /\b(will|need|must|should|deliver|ship|escalate|fix|review|reconcile|publish|schedule)\b/i.test(l)).slice(0, 6);

  const owners = ["Aria Chen", "Marcus Holt", "Priya Raman", "Diego Alvarez", "Sana Okafor"];
  const futureDate = (offset: number) => {
    const d = new Date();
    d.setDate(d.getDate() + offset);
    return d.toISOString().slice(0, 10);
  };

  return {
    id: `an_${Date.now()}`,
    title: lines[0]?.slice(0, 80) || "Untitled analysis",
    date: new Date().toISOString(),
    summary:
      "The conversation centers on operational execution: billing migration timing, a critical latency incident, and unblocking enterprise onboarding. Leadership aligned on escalating legal redlines and assigning a senior engineer to the reconciliation job. Overall sentiment is constructive with clear ownership.",
    keyPoints: [
      "Billing migration cutover scheduled for May 22 — reconciliation is the bottleneck.",
      "Incident #482 raised p95 latency; engineering treating as top priority.",
      "Enterprise onboarding blocked by legal redlines older than 10 days.",
      "Churn analysis draft expected by Thursday for product review.",
    ],
    actionItems: actionLines.length
      ? actionLines.map((l, i) => ({ text: l.replace(/^[-•\s]+/, ""), owner: owners[i % owners.length], due: futureDate(2 + i * 2) }))
      : [
          { text: "Pair with Sam on reconciliation job for billing migration.", owner: "Marcus Holt", due: futureDate(3) },
          { text: "Deliver May churn analysis draft.", owner: "Priya Raman", due: futureDate(4) },
          { text: "Escalate stalled enterprise legal redlines to General Counsel.", owner: "Diego Alvarez", due: futureDate(1) },
          { text: "Reconcile April vendor invoices.", owner: "Sana Okafor", due: futureDate(8) },
          { text: "Publish weekly executive briefing.", owner: "Aria Chen", due: futureDate(5) },
        ],
    risks: [
      "Billing migration reconciliation is the critical path — slipping risks May 22 cutover.",
      "Open p95 latency regression with no confirmed root cause.",
      "Two enterprise contracts at risk of slipping due to legal delays.",
    ],
    followUps: [
      "Schedule a war-room sync for the billing migration.",
      "Daily latency review until incident closed.",
      "Status check on legal redlines by EOD tomorrow.",
    ],
    priority,
    nextSteps: [
      "Confirm engineering capacity for reconciliation.",
      "Publish risk-adjusted timeline to leadership.",
      "Send customer comms draft for billing change.",
    ],
  };
}

export async function chatReply(message: string): Promise<string> {
  await wait(900);
  const m = message.toLowerCase();
  if (m.includes("summary") || m.includes("brief")) {
    return "Here's the snapshot: 38 tasks shipped this week (+12% WoW), two critical incidents closed, and the enterprise pilot is unblocked. The biggest open risks are the billing migration cutover and the p95 latency regression. Want me to draft an exec briefing?";
  }
  if (m.includes("priorit") || m.includes("focus")) {
    return "Top three for tomorrow: (1) close out Incident #482, (2) confirm reconciliation owner for the billing migration, (3) escalate the two stalled enterprise legal redlines.";
  }
  if (m.includes("team") || m.includes("who")) {
    return "Marcus is heaviest loaded with 4 active criticals. Priya is unblocked. Diego is waiting on legal. Want me to rebalance?";
  }
  return "Got it. I can pull recent transcripts, extract tasks, summarize threads, or generate a one-page exec report. What would help most right now?";
}
