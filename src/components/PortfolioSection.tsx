import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import ScrollReveal from "@/components/ScrollReveal";
import { Loader2 } from "lucide-react";

interface Portfolio {
  id: string;
  title: string;
  category: string;
  metric: string | null;
  gradient: string | null;
  image_url: string | null;
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
        .order("display_order");
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
              <div className="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer">
                {project.image_url ? (
                  <img src={project.image_url} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient || fallbackGradients[i % fallbackGradients.length]}`} />
                )}
                <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/60 transition-colors duration-500" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-primary-foreground opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  <span className="text-xs font-semibold uppercase tracking-wider text-electric-light mb-1">{project.category}</span>
                  <h3 className="text-xl font-bold mb-1">{project.title}</h3>
                  {project.metric && <p className="text-sm text-primary-foreground/80">{project.metric}</p>}
                  {project.description && <p className="text-sm text-primary-foreground/70 mt-1">{project.description}</p>}
                </div>
                <div className="absolute inset-0 flex items-center justify-center group-hover:opacity-0 transition-opacity duration-300">
                  <h3 className="text-xl font-bold text-primary-foreground drop-shadow-lg">{project.title}</h3>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
