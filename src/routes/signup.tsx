import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Create account — AI Operations Copilot" }] }),
  component: Signup,
});

function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) { toast.error("Password must be at least 8 characters"); return; }
    setLoading(true);
    try {
      await signup(name, email, password, company);
      toast.success("Workspace created");
      navigate({ to: "/app/dashboard" });
    } catch {
      toast.error("Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="flex justify-center mb-8"><Link to="/"><Logo /></Link></div>
        <div className="glass card-shadow rounded-2xl p-8">
          <h1 className="font-display text-2xl font-bold">Create your workspace</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">Free to start. No credit card required.</p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground">Full name</label>
                <input required value={name} onChange={(e) => setName(e.target.value)}
                  className="mt-1.5 w-full rounded-lg bg-input/40 border border-border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Company</label>
                <input required value={company} onChange={(e) => setCompany(e.target.value)}
                  className="mt-1.5 w-full rounded-lg bg-input/40 border border-border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Work email</label>
              <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5 w-full rounded-lg bg-input/40 border border-border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Password</label>
              <input required type="password" minLength={8} value={password} onChange={(e) => setPassword(e.target.value)}
                className="mt-1.5 w-full rounded-lg bg-input/40 border border-border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
              <p className="mt-1 text-[11px] text-muted-foreground">Min. 8 characters</p>
            </div>

            <button type="submit" disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg gradient-bg px-4 py-2.5 text-sm font-semibold text-primary-foreground glow-shadow hover:opacity-95 disabled:opacity-60">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Create workspace <ArrowRight className="h-4 w-4" /></>}
            </button>
            <p className="text-center text-xs text-muted-foreground">
              Have an account? <Link to="/login" className="text-primary hover:underline">Sign in</Link>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
