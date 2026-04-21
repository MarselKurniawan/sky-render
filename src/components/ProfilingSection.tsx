import { useState, useRef, useEffect } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { ArrowUpRight, Calendar, Clock, Loader2 } from "lucide-react";
import BannerAd from "@/components/BannerAd";
import ProfilingBanner from "@/components/ProfilingBanner";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const AD_AFTER_INDEX = 1;

interface ProfilingArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  category: string;
  created_at: string;
  read_time: string | null;
  image_url: string | null;
}

const ProfilingSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [articles, setArticles] = useState<ProfilingArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      const { data } = await supabase
        .from("articles")
        .select("id, slug, title, excerpt, category, created_at, read_time, image_url")
        .eq("article_type", "profiling")
        .eq("is_published", true)
        .order("created_at", { ascending: false })
        .limit(5);
      setArticles(data ?? []);
      setLoading(false);
    };
    fetchArticles();
  }, []);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });

  return (
    <section id="profiling" className="py-24 bg-background" aria-labelledby="profiling-heading">
      <div className="container mx-auto px-6">
        <ScrollReveal className="mb-12 max-w-3xl">
          <span className="text-xs font-bold text-accent uppercase tracking-widest">/ Profiling</span>
          <h2
            id="profiling-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary mt-3 leading-[1]"
          >
            Ceritakan kisah mereka <span className="italic font-serif">ke dunia</span>.
          </h2>
          <p className="text-muted-foreground mt-4 text-base sm:text-lg max-w-2xl">
            Profil digital untuk band, musisi, instansi, komunitas, dan personal brand.
          </p>
        </ScrollReveal>

        <div className="flex flex-col lg:flex-row gap-4">
          <ProfilingBanner />

          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="animate-spin text-accent" size={24} />
              </div>
            ) : articles.length === 0 ? (
              <p className="text-muted-foreground text-center py-12">Belum ada artikel profiling.</p>
            ) : (
              <div ref={scrollRef} className="space-y-3 max-h-[480px] overflow-y-auto pr-2">
                {articles.map((post, i) => (
                  <div key={post.id}>
                    <ScrollReveal delay={i * 0.06} variant="fade-up">
                      <Link to={`/${post.slug}`}>
                        <article className="group flex gap-4 rounded-2xl bg-card border-2 border-primary/10 hover:border-primary transition-colors duration-200 overflow-hidden cursor-pointer p-4">
                          <div className="w-24 h-24 sm:w-32 sm:h-24 shrink-0 rounded-xl overflow-hidden bg-muted">
                            {post.image_url?.startsWith("http") ? (
                              <img
                                src={post.image_url}
                                alt={post.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                loading="lazy"
                              />
                            ) : (
                              <div className="w-full h-full block-navy flex items-center justify-center">
                                <span className="text-2xl font-extrabold text-primary-foreground/30">S.</span>
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col flex-1 min-w-0 py-0.5">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-accent mb-1">
                              {post.category}
                            </span>
                            <h3 className="font-extrabold text-base text-primary mb-1 group-hover:text-accent transition-colors line-clamp-2">
                              {post.title}
                            </h3>
                            <p className="text-xs text-muted-foreground leading-relaxed mb-2 flex-1 line-clamp-2 hidden sm:block">
                              {post.excerpt}
                            </p>
                            <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar size={10} /> {formatDate(post.created_at)}
                              </span>
                              {post.read_time && (
                                <span className="flex items-center gap-1">
                                  <Clock size={10} /> {post.read_time}
                                </span>
                              )}
                            </div>
                          </div>
                          <ArrowUpRight
                            size={20}
                            className="self-center text-primary/30 group-hover:text-accent group-hover:rotate-45 transition-all shrink-0"
                          />
                        </article>
                      </Link>
                    </ScrollReveal>

                    {i === AD_AFTER_INDEX && <BannerAd />}
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 text-center lg:text-left">
              <Link
                to="/profiling"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-bold text-primary-foreground hover:bg-accent transition-colors group"
              >
                Lihat Semua Profiling
                <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilingSection;
