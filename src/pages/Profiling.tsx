import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import BannerAd from "@/components/BannerAd";
import { Calendar, Clock, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useSeo } from "@/hooks/useSeo";

const AD_EVERY_N = 3;

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

const Profiling = () => {
  const [articles, setArticles] = useState<ProfilingArticle[]>([]);
  const [loading, setLoading] = useState(true);
  useSeo("/profiling");

  useEffect(() => {
    const fetchArticles = async () => {
      const { data } = await supabase
        .from("articles")
        .select("id, slug, title, excerpt, category, created_at, read_time, image_url")
        .eq("article_type", "profiling")
        .eq("is_published", true)
        .order("created_at", { ascending: false });
      setArticles(data ?? []);
      setLoading(false);
    };
    fetchArticles();
  }, []);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <ScrollReveal className="text-center mb-12">
            <span className="text-sm font-semibold text-electric uppercase tracking-wider">Profiling</span>
            <h1 className="text-3xl sm:text-4xl font-bold text-primary mt-3">Semua Artikel Profiling</h1>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
              Kumpulan profil digital band, musisi, instansi, komunitas, dan personal brand.
            </p>
          </ScrollReveal>

          <div className="max-w-3xl mx-auto space-y-4">
            {loading ? (
              <div className="flex justify-center py-12"><Loader2 className="animate-spin text-electric" size={24} /></div>
            ) : articles.length === 0 ? (
              <p className="text-muted-foreground text-center py-12">Belum ada artikel profiling.</p>
            ) : (
              articles.map((post, i) => (
                <div key={post.id}>
                  <ScrollReveal delay={i * 0.06} variant="fade-up">
                    <Link to={`/artikel/${post.slug}`}>
                      <article className="group flex gap-4 rounded-xl bg-card shadow-soft hover:shadow-elevated transition-all duration-300 overflow-hidden cursor-pointer p-4">
                        <div className={`w-28 h-28 sm:w-36 sm:h-28 shrink-0 rounded-xl bg-gradient-to-br ${post.image_url?.startsWith("http") ? "" : (post.image_url || "from-electric/60 to-navy")} relative overflow-hidden`}>
                          {post.image_url?.startsWith("http") ? (
                            <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300" />
                          )}
                        </div>
                        <div className="flex flex-col flex-1 min-w-0 py-0.5">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-electric mb-1">
                            {post.category}
                          </span>
                          <h3 className="font-bold text-base text-primary mb-1 group-hover:text-electric transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed mb-2 flex-1 line-clamp-2">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1"><Calendar size={12} /> {formatDate(post.created_at)}</span>
                            {post.read_time && <span className="flex items-center gap-1"><Clock size={12} /> {post.read_time}</span>}
                          </div>
                        </div>
                      </article>
                    </Link>
                  </ScrollReveal>

                  {(i + 1) % AD_EVERY_N === 0 && i < articles.length - 1 && <BannerAd />}
                </div>
              ))
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profiling;