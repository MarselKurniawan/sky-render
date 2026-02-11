import { useState, useRef, useEffect } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { ArrowRight, ChevronLeft, ChevronRight, Calendar, Clock, Music, Building2, Users, Mic2, Loader2 } from "lucide-react";
import BannerAd from "@/components/BannerAd";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const banners = [
  {
    icon: Music,
    tag: "#SaatMusik",
    title: "Profil Band & Musisi",
    description: "Ceritakan kisah perjalanan musikmu lewat profil digital yang autentik dan menarik.",
    gradient: "from-electric/80 to-navy",
  },
  {
    icon: Building2,
    tag: "#SaatnyaKamuTau",
    title: "Profil Instansi & Organisasi",
    description: "Bangun citra profesional untuk instansi, komunitas, atau organisasi kamu.",
    gradient: "from-navy to-electric/60",
  },
  {
    icon: Mic2,
    tag: "#Saat",
    title: "Profil Personal Brand",
    description: "Tampilkan siapa kamu ke dunia — dari kreator, influencer, hingga public figure.",
    gradient: "from-electric/60 to-navy/90",
  },
  {
    icon: Users,
    tag: "#SaatnyaKamuTau",
    title: "Profil Komunitas",
    description: "Dokumentasikan perjalanan dan pencapaian komunitasmu secara digital.",
    gradient: "from-navy/80 to-electric",
  },
];

// Config: inject banner ad after article index (0-based)
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
  const [activeBanner, setActiveBanner] = useState(0);
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

  const prevBanner = () => setActiveBanner((p) => (p === 0 ? banners.length - 1 : p - 1));
  const nextBanner = () => setActiveBanner((p) => (p === banners.length - 1 ? 0 : p + 1));

  const current = banners[activeBanner];
  const Icon = current.icon;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
  };

  return (
    <section id="profiling" className="py-24">
      <div className="container mx-auto px-6">
        <ScrollReveal className="text-center mb-12">
          <span className="text-sm font-semibold text-electric uppercase tracking-wider">Profiling</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mt-3">Ceritakan Kisah Mereka ke Dunia</h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            Kami membantu membuat profil digital untuk band, musisi, instansi, komunitas, dan personal brand.
          </p>
        </ScrollReveal>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* LEFT — Banner Carousel */}
          <ScrollReveal className="lg:w-[380px] shrink-0" variant="fade">
            <div className={`relative rounded-2xl overflow-hidden bg-gradient-to-br ${current.gradient} p-8 h-full min-h-[360px] flex flex-col justify-between transition-all duration-500`}>
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-electric/20 blur-[60px]" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-card/20 backdrop-blur flex items-center justify-center mb-4">
                  <Icon size={28} className="text-primary-foreground" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-electric-light bg-card/10 px-3 py-1 rounded-full">
                  {current.tag}
                </span>
                <h3 className="text-2xl font-bold text-primary-foreground mt-4 mb-2">{current.title}</h3>
                <p className="text-primary-foreground/80 text-sm leading-relaxed">{current.description}</p>
              </div>

              <div className="relative z-10 flex items-center justify-between mt-6">
                <div className="flex gap-1.5">
                  {banners.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveBanner(i)}
                      className={`h-1.5 rounded-full transition-all ${i === activeBanner ? "w-6 bg-primary-foreground" : "w-1.5 bg-primary-foreground/40"}`}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button onClick={prevBanner} className="w-8 h-8 rounded-full bg-card/20 backdrop-blur flex items-center justify-center text-primary-foreground hover:bg-card/30 transition-colors">
                    <ChevronLeft size={16} />
                  </button>
                  <button onClick={nextBanner} className="w-8 h-8 rounded-full bg-card/20 backdrop-blur flex items-center justify-center text-primary-foreground hover:bg-card/30 transition-colors">
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* RIGHT — Scrollable Articles */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="flex justify-center py-12"><Loader2 className="animate-spin text-electric" size={24} /></div>
            ) : articles.length === 0 ? (
              <p className="text-muted-foreground text-center py-12">Belum ada artikel profiling.</p>
            ) : (
              <div ref={scrollRef} className="space-y-4 max-h-[480px] overflow-y-auto pr-2 scrollbar-thin">
                {articles.map((post, i) => (
                  <div key={post.id}>
                    <ScrollReveal delay={i * 0.06} variant="fade-up">
                      <Link to={`/artikel/${post.slug}`}>
                        <article className="group flex gap-4 rounded-xl bg-card shadow-soft hover:shadow-elevated transition-all duration-300 overflow-hidden cursor-pointer p-4">
                          <div className={`w-24 h-24 sm:w-32 sm:h-24 shrink-0 rounded-xl bg-gradient-to-br ${post.image_url || "from-electric/60 to-navy"} relative overflow-hidden`}>
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
                            <h3 className="font-bold text-sm text-primary mb-1 group-hover:text-electric transition-colors line-clamp-2">
                              {post.title}
                            </h3>
                            <p className="text-xs text-muted-foreground leading-relaxed mb-2 flex-1 line-clamp-2 hidden sm:block">
                              {post.excerpt}
                            </p>
                            <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                              <span className="flex items-center gap-1"><Calendar size={10} /> {formatDate(post.created_at)}</span>
                              {post.read_time && <span className="flex items-center gap-1"><Clock size={10} /> {post.read_time}</span>}
                            </div>
                          </div>
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
                className="inline-flex items-center gap-2 rounded-xl bg-electric px-6 py-3 text-sm font-semibold text-accent-foreground hover:bg-electric-light transition-colors"
              >
                Lihat Semua Profiling <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilingSection;
