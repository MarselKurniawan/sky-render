import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BannerAd from "@/components/BannerAd";
import { ArrowLeft, Calendar, Clock, Share2, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import ReactMarkdown from "react-markdown";

interface Article {
  title: string;
  category: string;
  article_type: string;
  created_at: string;
  read_time: string | null;
  image_url: string | null;
  content: string | null;
  excerpt: string | null;
  hashtags: string[] | null;
  seo_title: string | null;
  seo_description: string | null;
}

const ArticleDetail = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    const fetch = async () => {
      const { data } = await supabase
        .from("articles")
        .select("title, category, article_type, created_at, read_time, image_url, content, excerpt, hashtags, seo_title, seo_description")
        .eq("slug", slug)
        .eq("is_published", true)
        .maybeSingle();
      setArticle(data);
      setLoading(false);
      if (data?.seo_title) document.title = data.seo_title;
      else if (data?.title) document.title = data.title;
    };
    fetch();
  }, [slug]);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });

  const backPath = article?.article_type === "profiling" ? "/profiling" : "/";
  const backLabel = article?.article_type === "profiling" ? "Kembali ke Profiling" : "Kembali";

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16 flex justify-center"><Loader2 className="animate-spin text-electric" size={24} /></main>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-2xl font-bold text-primary mb-4">Artikel tidak ditemukan</h1>
            <Link to="/profiling" className="text-electric hover:underline">← Kembali ke Profiling</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Split content into paragraphs for ad injection
  const paragraphs = article.content?.split("\n").filter((p) => p.trim()) ?? [];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <Link to={backPath} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-electric transition-colors mb-6">
              <ArrowLeft size={16} /> {backLabel}
            </Link>

            {/* Hero Image */}
            {article.image_url?.startsWith("http") ? (
              <img src={article.image_url} alt={article.title} className="w-full h-48 sm:h-64 rounded-2xl object-cover mb-8" />
            ) : (
              <div className={`w-full h-48 sm:h-64 rounded-2xl bg-gradient-to-br ${article.image_url || "from-electric/60 to-navy"} mb-8 relative overflow-hidden`}>
                <div className="absolute inset-0 bg-primary/10" />
              </div>
            )}

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-electric bg-electric/10 px-3 py-1 rounded-full">
                {article.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground"><Calendar size={12} /> {formatDate(article.created_at)}</span>
              {article.read_time && <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock size={12} /> {article.read_time}</span>}
            </div>

            {/* Hashtags */}
            {article.hashtags && article.hashtags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {article.hashtags.map((tag, i) => (
                  <span key={i} className="text-xs text-electric">{tag.startsWith("#") ? tag : `#${tag}`}</span>
                ))}
              </div>
            )}

            <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-6 leading-tight">{article.title}</h1>

            {/* Content with ad injection */}
            <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
              {paragraphs.length > 0 ? (
                paragraphs.map((p, i) => (
                  <div key={i}>
                    <ReactMarkdown>{p}</ReactMarkdown>
                    {i === 1 && <BannerAd />}
                  </div>
                ))
              ) : article.excerpt ? (
                <p className="leading-relaxed">{article.excerpt}</p>
              ) : (
                <p className="text-muted-foreground italic">Konten belum tersedia.</p>
              )}
            </div>

            <div className="mt-10 pt-6 border-t border-border flex items-center gap-3">
              <Share2 size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Bagikan artikel ini</span>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ArticleDetail;
