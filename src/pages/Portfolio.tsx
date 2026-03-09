import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { Loader2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Portfolio {
  id: string;
  title: string;
  category: string;
  metric: string | null;
  description: string | null;
  image_url: string | null;
  price: string | null;
  gradient: string | null;
}

const fallbackGradients = [
  "from-electric/80 to-navy",
  "from-navy to-electric/60",
  "from-electric/60 to-navy/90",
  "from-navy/80 to-electric",
  "from-electric to-navy/70",
  "from-navy to-electric/70",
];

const Portfolio = () => {
  const [searchParams] = useSearchParams();
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState("Semua");

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("portfolios")
        .select("*")
        .eq("is_published", true)
        .order("display_order");

      const items = data ?? [];
      setPortfolios(items);

      const cats = [...new Set(items.map((p) => p.category))];
      setCategories(cats);

      const catFromUrl = searchParams.get("category");
      if (catFromUrl && cats.includes(catFromUrl)) {
        setActiveCategory(catFromUrl);
      }

      setLoading(false);
    };
    fetch();
  }, [searchParams]);

  const filtered =
    activeCategory === "Semua"
      ? portfolios
      : portfolios.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-16">
        <div className="container mx-auto px-6">
          <ScrollReveal className="text-center mb-12">
            <span className="text-sm font-semibold text-electric uppercase tracking-wider">
              Karya Kami
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary mt-3">
              Portfolio
            </h1>
            <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
              Lihat hasil kerja kami untuk berbagai brand dan bisnis di seluruh Indonesia.
            </p>
          </ScrollReveal>

          {/* Category filter */}
          {categories.length > 0 && (
            <ScrollReveal className="flex flex-wrap justify-center gap-2 mb-12">
              <button
                onClick={() => setActiveCategory("Semua")}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                  activeCategory === "Semua"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                Semua
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </ScrollReveal>
          )}

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-electric" size={28} />
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-20">
              Belum ada portfolio untuk kategori ini.
            </p>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filtered.map((project, i) => (
                  <Link
                    key={project.id}
                    to={`/portfolio/${project.id}`}
                    className="group block"
                  >
                    <div className="relative rounded-2xl overflow-hidden bg-card border border-border shadow-soft hover:shadow-elevated transition-all duration-500 hover:-translate-y-1">
                      {/* Image */}
                      <div className="aspect-[16/10] overflow-hidden relative">
                        {project.image_url ? (
                          <img
                            src={project.image_url}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        ) : (
                          <div
                            className={`w-full h-full bg-gradient-to-br ${
                              project.gradient ||
                              fallbackGradients[i % fallbackGradients.length]
                            } flex items-center justify-center`}
                          >
                            <span className="text-primary-foreground/60 text-lg font-bold">
                              {project.title}
                            </span>
                          </div>
                        )}
                        {/* Category badge */}
                        <div className="absolute top-4 left-4">
                          <span className="rounded-full bg-primary/80 backdrop-blur-sm text-primary-foreground text-xs font-semibold px-3 py-1">
                            {project.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <h3 className="text-lg font-bold text-primary group-hover:text-electric transition-colors mb-1">
                          {project.title}
                        </h3>
                        {project.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                            {project.description}
                          </p>
                        )}
                        <div className="flex items-center justify-between">
                          {project.metric && (
                            <span className="text-xs font-semibold text-electric">
                              {project.metric}
                            </span>
                          )}
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground group-hover:text-electric transition-colors ml-auto">
                            Lihat Detail
                            <ArrowRight
                              size={12}
                              className="group-hover:translate-x-1 transition-transform"
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Portfolio;
