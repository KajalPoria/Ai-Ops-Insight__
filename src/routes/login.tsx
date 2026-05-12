import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, Mail, Lock } from "lucide-react";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — AI Operations Copilot" }] }),
  component: Login,
});

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("aria@acme.co");
  const [password, setPassword] = useState("demo1234");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Welcome back");
      navigate({ to: "/app/dashboard" });
    } catch {
      toast.error("Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex flex-1 relative overflow-hidden border-r border-border/40">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative flex flex-col justify-between p-12 w-full">
          <Link to="/"><Logo /></Link>
          <div>
            <p className="font-display text-4xl font-bold tracking-tight max-w-md">
              "Our weekly briefings used to take a full afternoon. Now they're done in <span className="gradient-text">4 minutes.</span>"
            </p>
            <p className="mt-6 text-sm text-muted-foreground">Sarah Whitman · VP Operations, Northwind</p>
          </div>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
          <div className="lg:hidden mb-10 flex justify-center"><Link to="/"><Logo /></Link></div>
          <h1 className="font-display text-3xl font-bold">Welcome back</h1>
          <p className="mt-2 text-sm text-muted-foreground">Sign in to your operations workspace.</p>

          <form onSubmit={submit} className="mt-8 space-y-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Email</label>
              <div className="mt-1.5 relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg bg-input/40 border border-border pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-muted-foreground">Password</label>
                <a className="text-xs text-primary hover:underline" href="#">Forgot?</a>
              </div>
              <div className="mt-1.5 relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  required type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg bg-input/40 border border-border pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>
            </div>

            <button
              type="submit" disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg gradient-bg px-4 py-2.5 text-sm font-semibold text-primary-foreground glow-shadow hover:opacity-95 disabled:opacity-60"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Sign in <ArrowRight className="h-4 w-4" /></>}
            </button>

            <p className="text-center text-xs text-muted-foreground">
              No account? <Link to="/signup" className="text-primary hover:underline">Create one</Link>
            </p>
            <p className="text-center text-[11px] text-muted-foreground/70 mt-6">
              Demo mode — any email + password will work.
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
