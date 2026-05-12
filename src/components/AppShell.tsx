import { Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Sparkles, ListChecks, FileText, BarChart3,
  MessageSquare, Users, Settings, LogOut, Moon, Sun, Search, Bell,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/lib/auth";
import { useTheme } from "@/lib/theme";

const nav = [
  { to: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/app/analyzer", label: "AI Analyzer", icon: Sparkles },
  { to: "/app/tasks", label: "Tasks", icon: ListChecks },
  { to: "/app/reports", label: "Reports", icon: FileText },
  { to: "/app/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/app/chat", label: "AI Assistant", icon: MessageSquare },
  { to: "/app/team", label: "Team", icon: Users },
  { to: "/app/settings", label: "Settings", icon: Settings },
] as const;

export function AppShell() {
  const { user, loading, logout } = useAuth();
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [user, loading, navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r border-sidebar-border bg-sidebar/60 backdrop-blur-xl">
        <div className="px-5 pt-6 pb-4">
          <Link to="/"><Logo /></Link>
        </div>
        <nav className="flex-1 px-3 space-y-0.5">
          {nav.map((item) => {
            const active = path.startsWith(item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground card-shadow"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                }`}
              >
                <Icon className={`h-4 w-4 ${active ? "text-primary" : ""}`} />
                {item.label}
                {active && (
                  <motion.div layoutId="nav-indicator" className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
                )}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-sidebar-border">
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="h-9 w-9 rounded-full gradient-bg grid place-items-center text-sm font-semibold text-primary-foreground">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user.company}</p>
            </div>
            <button onClick={logout} className="rounded-md p-2 text-muted-foreground hover:bg-sidebar-accent hover:text-foreground" aria-label="Sign out">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border/60 bg-background/40 backdrop-blur-xl flex items-center gap-3 px-4 md:px-8 sticky top-0 z-30">
          <div className="md:hidden"><Logo size="sm" /></div>
          <div className="flex-1 max-w-md hidden sm:flex items-center gap-2 rounded-lg bg-muted/50 border border-border/60 px-3 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input className="bg-transparent flex-1 outline-none text-sm placeholder:text-muted-foreground" placeholder="Search tasks, reports, transcripts…" />
            <kbd className="hidden md:inline text-[10px] font-medium text-muted-foreground bg-background/80 border border-border rounded px-1.5 py-0.5">⌘K</kbd>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <button onClick={toggle} className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground" aria-label="Toggle theme">
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground relative" aria-label="Notifications">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-[oklch(0.78_0.18_220)]" />
            </button>
          </div>
        </header>
        <main className="flex-1 px-4 md:px-8 py-8 max-w-[1600px] w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
