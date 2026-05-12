// Demo data for AI Operations Copilot
export type Priority = "low" | "medium" | "high" | "critical";
export type Status = "todo" | "in_progress" | "review" | "done";

export interface Task {
  id: string;
  title: string;
  assignee: string;
  assigneeAvatar: string;
  dueDate: string;
  priority: Priority;
  status: Status;
  department: string;
  source: string;
  confidence: number;
}

export interface Report {
  id: string;
  title: string;
  date: string;
  summary: string;
  insights: string[];
  risks: string[];
  recommendations: string[];
  author: string;
}

export interface Analysis {
  id: string;
  title: string;
  date: string;
  summary: string;
  keyPoints: string[];
  actionItems: { text: string; owner: string; due: string }[];
  risks: string[];
  followUps: string[];
  priority: Priority;
  nextSteps: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar: string;
  department: string;
  tasksCompleted: number;
  productivity: number;
  status: "online" | "away" | "offline";
}

const avatar = (seed: string) =>
  `https://api.dicebear.com/9.x/glass/svg?seed=${encodeURIComponent(seed)}`;

export const demoTeam: TeamMember[] = [
  { id: "u1", name: "Aria Chen", role: "VP Operations", email: "aria@acme.co", avatar: avatar("Aria"), department: "Operations", tasksCompleted: 142, productivity: 94, status: "online" },
  { id: "u2", name: "Marcus Holt", role: "Engineering Lead", email: "marcus@acme.co", avatar: avatar("Marcus"), department: "Engineering", tasksCompleted: 118, productivity: 88, status: "online" },
  { id: "u3", name: "Priya Raman", role: "Product Manager", email: "priya@acme.co", avatar: avatar("Priya"), department: "Product", tasksCompleted: 96, productivity: 91, status: "away" },
  { id: "u4", name: "Diego Alvarez", role: "Customer Success", email: "diego@acme.co", avatar: avatar("Diego"), department: "Success", tasksCompleted: 73, productivity: 82, status: "online" },
  { id: "u5", name: "Sana Okafor", role: "Finance Ops", email: "sana@acme.co", avatar: avatar("Sana"), department: "Finance", tasksCompleted: 64, productivity: 86, status: "offline" },
  { id: "u6", name: "Leo Tanaka", role: "Designer", email: "leo@acme.co", avatar: avatar("Leo"), department: "Design", tasksCompleted: 88, productivity: 90, status: "online" },
];

export const demoTasks: Task[] = [
  { id: "t1", title: "Finalize Q3 OKRs and circulate to leadership", assignee: "Aria Chen", assigneeAvatar: avatar("Aria"), dueDate: "2026-05-18", priority: "high", status: "in_progress", department: "Operations", source: "Leadership Sync 05/10", confidence: 0.94 },
  { id: "t2", title: "Migrate billing service to new payment provider", assignee: "Marcus Holt", assigneeAvatar: avatar("Marcus"), dueDate: "2026-05-22", priority: "critical", status: "in_progress", department: "Engineering", source: "Engineering Standup", confidence: 0.97 },
  { id: "t3", title: "Draft customer churn analysis for May", assignee: "Priya Raman", assigneeAvatar: avatar("Priya"), dueDate: "2026-05-15", priority: "high", status: "review", department: "Product", source: "Product Review", confidence: 0.91 },
  { id: "t4", title: "Schedule onboarding calls with 3 enterprise leads", assignee: "Diego Alvarez", assigneeAvatar: avatar("Diego"), dueDate: "2026-05-14", priority: "medium", status: "todo", department: "Success", source: "Sales Handoff Email", confidence: 0.88 },
  { id: "t5", title: "Reconcile vendor invoices for April", assignee: "Sana Okafor", assigneeAvatar: avatar("Sana"), dueDate: "2026-05-20", priority: "medium", status: "todo", department: "Finance", source: "Finance Notes", confidence: 0.85 },
  { id: "t6", title: "Redesign empty states for analyzer", assignee: "Leo Tanaka", assigneeAvatar: avatar("Leo"), dueDate: "2026-05-19", priority: "low", status: "in_progress", department: "Design", source: "Design Critique", confidence: 0.82 },
  { id: "t7", title: "Audit RLS policies on tasks collection", assignee: "Marcus Holt", assigneeAvatar: avatar("Marcus"), dueDate: "2026-05-13", priority: "critical", status: "done", department: "Engineering", source: "Security Review", confidence: 0.96 },
  { id: "t8", title: "Publish weekly executive briefing", assignee: "Aria Chen", assigneeAvatar: avatar("Aria"), dueDate: "2026-05-16", priority: "high", status: "review", department: "Operations", source: "Exec Sync", confidence: 0.93 },
  { id: "t9", title: "Update onboarding playbook with new flow", assignee: "Diego Alvarez", assigneeAvatar: avatar("Diego"), dueDate: "2026-05-25", priority: "low", status: "todo", department: "Success", source: "CS Retro", confidence: 0.79 },
  { id: "t10", title: "Investigate spike in API latency p95", assignee: "Marcus Holt", assigneeAvatar: avatar("Marcus"), dueDate: "2026-05-12", priority: "critical", status: "in_progress", department: "Engineering", source: "Incident #482", confidence: 0.98 },
  { id: "t11", title: "Prep board deck for May review", assignee: "Priya Raman", assigneeAvatar: avatar("Priya"), dueDate: "2026-05-21", priority: "high", status: "todo", department: "Product", source: "Board Prep Email", confidence: 0.9 },
  { id: "t12", title: "Roll out SSO to remaining workspaces", assignee: "Marcus Holt", assigneeAvatar: avatar("Marcus"), dueDate: "2026-05-30", priority: "medium", status: "todo", department: "Engineering", source: "Security Roadmap", confidence: 0.84 },
];

export const demoReports: Report[] = [
  {
    id: "r1",
    title: "Weekly Operations Briefing — May 11",
    date: "2026-05-11",
    author: "AI Copilot",
    summary:
      "Team velocity is up 12% week-over-week with 38 tasks shipped. Engineering closed two critical incidents. Customer Success unblocked the enterprise pilot. Key risks center on the billing migration timeline and an open p95 latency regression.",
    insights: [
      "Engineering throughput hit a 6-week high; PR cycle time down to 1.4 days.",
      "Customer Success expanded NRR by 6 points across pilot accounts.",
      "Product completed 80% of May roadmap commitments two weeks early.",
    ],
    risks: [
      "Billing provider migration is at risk of slipping past May 22.",
      "API p95 latency spiked 38% on Tuesday; root cause still under investigation.",
      "Two enterprise contracts pending legal redlines for >10 days.",
    ],
    recommendations: [
      "Carve a dedicated war-room for billing migration through next Friday.",
      "Pair platform + infra on the latency investigation by EOD.",
      "Escalate stalled legal redlines to General Counsel.",
    ],
  },
  {
    id: "r2",
    title: "Engineering Health — Week 19",
    date: "2026-05-09",
    author: "AI Copilot",
    summary:
      "Engineering shipped 24 PRs across 3 squads with zero rollbacks. Incident response improved with MTTR down 22%. The platform team needs reinforcement to keep pace with infrastructure demand.",
    insights: [
      "Zero rollbacks for the second consecutive week.",
      "MTTR improved from 47m to 36m on P1 incidents.",
      "Test coverage on core services crossed 82%.",
    ],
    risks: [
      "Platform team capacity constrained by SSO rollout overlap.",
      "Outdated dependency in payment-gateway flagged HIGH severity.",
    ],
    recommendations: [
      "Backfill platform team with 1 senior engineer this quarter.",
      "Schedule dependency upgrade window for next sprint.",
    ],
  },
];

export const productivityWeekly = [
  { day: "Mon", completed: 18, created: 22, score: 78 },
  { day: "Tue", completed: 24, created: 19, score: 84 },
  { day: "Wed", completed: 31, created: 26, score: 89 },
  { day: "Thu", completed: 27, created: 24, score: 86 },
  { day: "Fri", completed: 38, created: 21, score: 94 },
  { day: "Sat", completed: 12, created: 8, score: 71 },
  { day: "Sun", completed: 9, created: 5, score: 68 },
];

export const departmentLoad = [
  { department: "Engineering", load: 42 },
  { department: "Operations", load: 28 },
  { department: "Product", load: 22 },
  { department: "Success", load: 18 },
  { department: "Finance", load: 12 },
  { department: "Design", load: 15 },
];

export const priorityDistribution = [
  { name: "Critical", value: 12, color: "oklch(0.65 0.22 25)" },
  { name: "High", value: 28, color: "oklch(0.78 0.16 75)" },
  { name: "Medium", value: 41, color: "oklch(0.66 0.20 285)" },
  { name: "Low", value: 19, color: "oklch(0.78 0.18 220)" },
];

export const automationTrend = [
  { week: "W14", saved: 22 },
  { week: "W15", saved: 31 },
  { week: "W16", saved: 38 },
  { week: "W17", saved: 47 },
  { week: "W18", saved: 56 },
  { week: "W19", saved: 64 },
];

export const sampleTranscript = `Meeting: Weekly Operations Sync — May 10, 2026
Attendees: Aria, Marcus, Priya, Diego, Sana

Aria: Let's start with the billing migration. Marcus, where are we?
Marcus: We finished the dual-write phase. Cutover is scheduled for May 22. Risk is the reconciliation job — it's slow. I need a senior backend engineer on it by Wednesday.
Aria: Approved. Pull Sam in.
Priya: On product side, churn analysis for May is in review. I'll have a draft by Thursday.
Diego: Three enterprise leads need onboarding calls scheduled this week. Two of them are blocked on legal redlines for over ten days.
Aria: Diego, escalate the redlines to General Counsel today. Critical.
Sana: April vendor invoices need to be reconciled by May 20. I'll handle it.
Marcus: One more — we had a p95 latency spike on Tuesday. Investigation is open as Incident #482. Critical.
Aria: Make that the top engineering priority. Wrap up by EOW.

Action items recap:
- Marcus: pair with Sam on reconciliation, fix p95 latency by Friday.
- Priya: deliver churn draft by Thursday.
- Diego: escalate enterprise legal redlines today.
- Sana: reconcile April invoices by May 20.
- Aria: publish executive briefing by Friday.`;

export const recentActivity = [
  { id: "a1", actor: "Aria Chen", action: "published", target: "Weekly Operations Briefing", time: "2m ago" },
  { id: "a2", actor: "AI Copilot", action: "extracted 7 tasks from", target: "Leadership Sync 05/10", time: "14m ago" },
  { id: "a3", actor: "Marcus Holt", action: "resolved", target: "Incident #482", time: "1h ago" },
  { id: "a4", actor: "Priya Raman", action: "shared", target: "Churn Analysis Draft", time: "3h ago" },
  { id: "a5", actor: "Diego Alvarez", action: "scheduled", target: "Enterprise onboarding x3", time: "5h ago" },
  { id: "a6", actor: "AI Copilot", action: "generated", target: "Engineering Health Report", time: "Yesterday" },
];
