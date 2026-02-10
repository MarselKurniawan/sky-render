import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { FileText, Image, Layers, Settings } from "lucide-react";

const AdminDashboard = () => {
  const [counts, setCounts] = useState({ articles: 0, portfolios: 0, services: 0 });

  useEffect(() => {
    const fetchCounts = async () => {
      const [a, p, s] = await Promise.all([
        supabase.from("articles").select("id", { count: "exact", head: true }),
        supabase.from("portfolios").select("id", { count: "exact", head: true }),
        supabase.from("services").select("id", { count: "exact", head: true }),
      ]);
      setCounts({
        articles: a.count ?? 0,
        portfolios: p.count ?? 0,
        services: s.count ?? 0,
      });
    };
    fetchCounts();
  }, []);

  const stats = [
    { label: "Artikel", count: counts.articles, icon: FileText, color: "text-electric" },
    { label: "Portfolio", count: counts.portfolios, icon: Image, color: "text-emerald-500" },
    { label: "Layanan", count: counts.services, icon: Layers, color: "text-amber-500" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-6">Dashboard</h1>
      <div className="grid sm:grid-cols-3 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl bg-card border border-border p-5">
            <div className="flex items-center gap-3 mb-2">
              <s.icon size={20} className={s.color} />
              <span className="text-sm font-medium text-muted-foreground">{s.label}</span>
            </div>
            <p className="text-3xl font-bold text-primary">{s.count}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
