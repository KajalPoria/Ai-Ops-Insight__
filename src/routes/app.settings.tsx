import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import { useTheme } from "@/lib/theme";
import { Moon, Sun } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/app/settings")({
  head: () => ({ meta: [{ title: "Settings — Copilot" }] }),
  component: Settings,
});

function Settings() {
  const { user, logout } = useAuth();
  const { theme, toggle } = useTheme();
  if (!user) return null;
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">Workspace</p>
        <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight mt-1">Settings</h1>
      </div>

      <div className="glass card-shadow rounded-2xl p-6 space-y-4">
        <h2 className="font-display font-semibold">Profile</h2>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-muted-foreground">Name</label>
            <input defaultValue={user.name} className="mt-1.5 w-full rounded-lg bg-input/40 border border-border px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Email</label>
            <input defaultValue={user.email} className="mt-1.5 w-full rounded-lg bg-input/40 border border-border px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Company</label>
            <input defaultValue={user.company} className="mt-1.5 w-full rounded-lg bg-input/40 border border-border px-3 py-2 text-sm" />
          </div>
        </div>
        <button onClick={() => toast.success("Profile saved")} className="rounded-lg gradient-bg px-4 py-2 text-sm font-semibold text-primary-foreground glow-shadow">Save changes</button>
      </div>

      <div className="glass card-shadow rounded-2xl p-6">
        <h2 className="font-display font-semibold mb-4">Appearance</h2>
        <div className="flex items-center justify-between rounded-lg bg-muted/40 p-4">
          <div>
            <p className="text-sm font-medium">Theme</p>
            <p className="text-xs text-muted-foreground">Switch between dark and light mode</p>
          </div>
          <button onClick={toggle} className="inline-flex items-center gap-2 rounded-lg bg-card border border-border px-3 py-2 text-sm">
            {theme === "dark" ? <><Sun className="h-4 w-4" /> Light</> : <><Moon className="h-4 w-4" /> Dark</>}
          </button>
        </div>
      </div>

      <div className="glass card-shadow rounded-2xl p-6">
        <h2 className="font-display font-semibold mb-2">Danger zone</h2>
        <p className="text-xs text-muted-foreground mb-4">Sign out of your workspace.</p>
        <button onClick={logout} className="rounded-lg bg-destructive/15 border border-destructive/40 text-destructive px-4 py-2 text-sm font-semibold">Sign out</button>
      </div>
    </div>
  );
}
