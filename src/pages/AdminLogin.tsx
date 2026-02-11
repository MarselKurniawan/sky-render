import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Lock } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { signIn, user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  // If already logged in as admin, redirect
  if (!loading && user && isAdmin) {
    navigate("/admin", { replace: true });
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await signIn(email, password);
    setSubmitting(false);
    if (error) {
      toast.error("Login gagal: " + error.message);
    } else {
      toast.success("Login berhasil!");
      // Small delay to let auth state update
      setTimeout(() => navigate("/admin", { replace: true }), 500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-electric/10 text-electric mb-4">
            <Lock size={24} />
          </div>
          <h1 className="text-2xl font-bold text-primary">Admin Login</h1>
          <p className="text-sm text-muted-foreground mt-1">Masuk untuk mengelola konten website</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="admin@saat.id" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" />
          </div>
          <Button type="submit" className="w-full bg-electric hover:bg-electric/90" disabled={submitting}>
            {submitting ? <Loader2 className="animate-spin mr-2" size={16} /> : null}
            Masuk
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;