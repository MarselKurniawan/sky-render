import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import ScrollReveal from "@/components/ScrollReveal";
import { Loader2, ArrowRight } from "lucide-react";

interface Portfolio {
  id: string;
  title: string;
  category: string;
  metric: string | null;
  image_url: string | null;
  gradient: string | null;
  description: string | null;
}

const fallbackGradients = [
  "from-electric/80 to-navy",
  "from-navy to-electric/60",
  "from-electric/60 to-navy/90",
  "from-navy/80 to-electric",
  "from-electric to-navy/70",
  "from-navy to-electric/70",
];

const PortfolioSection = () => {
  const [projects, setProjects] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("portfolios")
        .select("*")
        .eq("is_published", true)
        .order("display_order")
        .limit(6);
      setProjects(data ?? []);
      setLoading(false);
    };
    fetch();
  }, []);

  if (loading) {
    return (
      <section id="portfolio" className="py-24">
        <div className="container mx-auto px-6 flex justify-center">
          <Loader2 className="animate-spin text-electric" size={24} />
        </div>
      </section>
    );
  }

  if (projects.length === 0) return null;

  return (
    <section id="portfolio" className="py-24">
      <div className="container mx-auto px-6">
        <ScrollReveal className="text-center mb-16">
          <span className="text-sm font-semibold text-electric uppercase tracking-wider">Karya Kami</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mt-3">Portfolio & Studi Kasus</h2>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ScrollReveal key={project.id} delay={i * 0.08} variant="scale">
              <Link to={`/portfolio/${project.id}`} className="group block">
                <div className="relative rounded-2xl overflow-hidden bg-card border border-border shadow-soft hover:shadow-elevated transition-all duration-500 hover:-translate-y-1">
                  <div className="aspect-[16/10] overflow-hidden relative">
                    {project.image_url ? (
                      <img src={project.image_url} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${project.gradient || fallbackGradients[i % fallbackGradients.length]} flex items-center justify-center`}>
                        <span className="text-primary-foreground/60 text-lg font-bold">{project.title}</span>
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <span className="rounded-full bg-primary/80 backdrop-blur-sm text-primary-foreground text-xs font-semibold px-3 py-1">{project.category}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-primary group-hover:text-electric transition-colors">{project.title}</h3>
                    {project.metric && <p className="text-xs text-electric font-semibold mt-1">{project.metric}</p>}
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="text-center mt-10">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-primary/20 bg-card px-7 py-3 text-sm font-semibold text-primary hover:border-electric hover:text-electric transition-all group"
          >
            Lihat Semua Portfolio
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default PortfolioSection;
