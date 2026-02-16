import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InArticleAd from "@/components/InArticleAd";
import TableOfContents from "@/components/TableOfContents";
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
  og_image_url: string | null;
  hidden_keywords: string | null;
}

const ArticleDetail = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    const fetchArticle = async () => {
      const { data } = await supabase
        .from("articles")
        .select("title, category, article_type, created_at, read_time, image_url, content, excerpt, hashtags, seo_title, seo_description, og_image_url, hidden_keywords")
        .eq("slug", slug)
        .eq("is_published", true)
        .maybeSingle();
      setArticle(data);
      setLoading(false);

      if (data) {
        document.title = data.seo_title || data.title;
        const setMeta = (attr: string, name: string, content: string | null) => {
          if (!content) return;
          let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
          if (!el) {
            el = document.createElement("meta");
            el.setAttribute(attr, name);
            document.head.appendChild(el);
          }
          el.content = content;
        };
        setMeta("name", "description", data.seo_description || data.excerpt);
        setMeta("property", "og:title", data.seo_title || data.title);
        setMeta("property", "og:description", data.seo_description || data.excerpt);
        setMeta("property", "og:image", data.og_image_url || data.image_url);
        setMeta("property", "og:type", "article");
        setMeta("property", "og:url", window.location.href);
        setMeta("property", "og:site_name", "Saat.");
        setMeta("name", "twitter:title", data.seo_title || data.title);
        setMeta("name", "twitter:description", data.seo_description || data.excerpt);
        setMeta("name", "twitter:image", data.og_image_url || data.image_url);
        setMeta("name", "twitter:card", "summary_large_image");
      }
    };
    fetchArticle();
  }, [slug]);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });

  const backPath = article?.article_type === "profiling" ? "/profiling" : "/";
  const backLabel = article?.article_type === "profiling" ? "Kembali ke Profiling" : "Kembali";

  const isHtml = (str: string) => /<[a-z][\s\S]*>/i.test(str);

  const handleShare = async () => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const origin = window.location.origin;
    const shareUrl = `${supabaseUrl}/functions/v1/og-share?slug=${slug}&origin=${encodeURIComponent(origin)}`;
    const title = article?.seo_title || article?.title || "Saat.";

    try {
      if (navigator.share) {
        await navigator.share({ title, url: shareUrl });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        alert("Link berhasil disalin!");
      }
    } catch (e) {
      // user cancelled share
    }
  };

  // Split HTML content into chunks for ad injection
  const renderContentWithAds = (content: string) => {
    if (isHtml(content)) {
      // Parse HTML, split by block elements, inject ads
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, "text/html");
      const children = Array.from(doc.body.children);
      const adPositions = [2, 5]; // inject ads after element 2 and 5

      const chunks: { html: string; adAfter: boolean }[] = [];
      children.forEach((child, i) => {
        chunks.push({
          html: child.outerHTML,
          adAfter: adPositions.includes(i),
        });
      });

      return (
        <div data-article-content>
          {chunks.map((chunk, i) => (
            <div key={i}>
              <div dangerouslySetInnerHTML={{ __html: chunk.html }} />
              {chunk.adAfter && <InArticleAd />}
            </div>
          ))}
        </div>
      );
    }

    // Markdown content
    const paragraphs = content.split("\n").filter((p) => p.trim());
    return (
      <div data-article-content>
        {paragraphs.map((p, i) => (
          <div key={i}>
            <ReactMarkdown>{p}</ReactMarkdown>
            {i === 2 && <InArticleAd />}
          </div>
        ))}
      </div>
    );
  };

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
            <Link to="/" className="text-electric hover:underline">← Kembali</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <Link to={backPath} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-electric transition-colors mb-6">
              <ArrowLeft size={16} /> {backLabel}
            </Link>

            {article.image_url?.startsWith("http") ? (
              <img src={article.image_url} alt={article.title} className="w-full h-48 sm:h-64 rounded-2xl object-cover mb-8" />
            ) : (
              <div className={`w-full h-48 sm:h-64 rounded-2xl bg-navy mb-8 relative overflow-hidden`}>
                <div className="absolute inset-0 opacity-[0.04]" style={{
                  backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }} />
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-electric bg-electric/10 px-3 py-1 rounded-full">
                {article.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground"><Calendar size={12} /> {formatDate(article.created_at)}</span>
              {article.read_time && <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock size={12} /> {article.read_time}</span>}
            </div>

            {article.hashtags && article.hashtags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {article.hashtags.map((tag, i) => (
                  <span key={i} className="text-xs text-electric">{tag.startsWith("#") ? tag : `#${tag}`}</span>
                ))}
              </div>
            )}

            <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-6 leading-tight">{article.title}</h1>

            {/* Table of Contents */}
            {article.content && isHtml(article.content) && (
              <TableOfContents content={article.content} />
            )}

            <div className="prose prose-sm max-w-none text-muted-foreground space-y-4 [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-primary [&_h1]:mt-8 [&_h1]:mb-4 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-primary [&_h2]:mt-6 [&_h2]:mb-3 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-primary [&_h3]:mt-4 [&_h3]:mb-2 [&_img]:rounded-xl [&_img]:my-6 [&_img]:max-w-full [&_blockquote]:border-l-4 [&_blockquote]:border-electric [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground/80">
              {article.content ? (
                renderContentWithAds(article.content)
              ) : article.excerpt ? (
                <p className="leading-relaxed">{article.excerpt}</p>
              ) : (
                <p className="text-muted-foreground italic">Konten belum tersedia.</p>
              )}
            </div>

            <div className="mt-10 pt-6 border-t border-border flex items-center gap-3 cursor-pointer" onClick={handleShare}>
              <Share2 size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground hover:text-electric transition-colors">Bagikan artikel ini</span>
            </div>
          </div>
        </div>
      </main>
      {/* Hidden keywords per article */}
      {article.hidden_keywords && (
        <div aria-hidden="true" style={{ fontSize: "1px", lineHeight: "1px", color: "transparent", overflow: "hidden", height: "1px", width: "1px", position: "absolute", top: 0, left: 0, userSelect: "none", pointerEvents: "none" }}>
          {article.hidden_keywords}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ArticleDetail;
