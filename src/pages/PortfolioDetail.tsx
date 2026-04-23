import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Loader2, ArrowLeft, Share2 } from "lucide-react";
import { motion } from "framer-motion";

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

const PortfolioDetail = () => {
  const { id } = useParams();
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [related, setRelated] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      if (!id) return;
      setLoading(true);

      const { data } = await supabase
        .from("portfolios")
        .select("*")
        .eq("id", id)
        .eq("is_published", true)
        .maybeSingle();

      setPortfolio(data);

      if (data) {
        const { data: rel } = await supabase
          .from("portfolios")
          .select("*")
          .eq("is_published", true)
          .eq("category", data.category)
          .neq("id", id)
          .order("display_order")
          .limit(3);
        setRelated(rel ?? []);
      }

      setLoading(false);

      if (data) {
        document.title = `${data.title} — Portfolio Saat.`;
        const setMeta = (attr: string, name: string, content: string | null) => {
          if (!content) return;
          let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
          if (!el) { el = document.createElement("meta"); el.setAttribute(attr, name); document.head.appendChild(el); }
          el.content = content;
        };
        setMeta("name", "description", data.description);
        setMeta("property", "og:title", data.title);
        setMeta("property", "og:description", data.description);
        setMeta("property", "og:image", data.image_url);
        setMeta("property", "og:type", "article");
        setMeta("property", "og:url", window.location.href);
        setMeta("name", "twitter:card", "summary_large_image");
        setMeta("name", "twitter:title", data.title);
        setMeta("name", "twitter:description", data.description);
        setMeta("name", "twitter:image", data.image_url);
      }
    };
    fetch();
  }, [id]);

  const handleShare = async () => {
    if (!portfolio) return;
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: portfolio.title, text: portfolio.description ?? "", url });
      } else {
        await navigator.clipboard.writeText(url);
        alert("Link berhasil disalin!");
      }
    } catch {}
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex justify-center items-center pt-40">
          <Loader2 className="animate-spin text-electric" size={28} />
        </div>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-6 pt-32 text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">Portfolio tidak ditemukan</h1>
          <Link to="/portfolio" className="text-electric hover:underline">
            ← Kembali ke Portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Back button */}
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-electric transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Kembali ke Portfolio
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Category badge */}
            <span className="inline-block rounded-full bg-electric/10 text-electric text-xs font-semibold px-4 py-1.5 mb-4">
              {portfolio.category}
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary mb-4 leading-tight">
              {portfolio.title}
            </h1>

            {/* Metric & Price */}
            <div className="flex flex-wrap gap-4 mb-8">
              {portfolio.metric && (
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-electric bg-electric/10 px-4 py-2 rounded-xl">
                  📊 {portfolio.metric}
                </span>
              )}
              {portfolio.price && (
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary bg-muted px-4 py-2 rounded-xl">
                  💰 {portfolio.price}
                </span>
              )}
            </div>

            {/* Image */}
            {portfolio.image_url && (
              <div className="rounded-2xl overflow-hidden mb-8 border border-border">
                <img
                  src={portfolio.image_url}
                  alt={portfolio.title}
                  className="w-full h-auto object-cover max-h-[500px]"
                />
              </div>
            )}

            {/* Description */}
            {portfolio.description && (
              <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed mb-12">
                <p>{portfolio.description}</p>
              </div>
            )}

            {/* CTA */}
            <div className="p-6 rounded-2xl bg-electric/5 border border-electric/20 text-center">
              <h3 className="text-lg font-bold text-primary mb-2">
                Tertarik dengan project seperti ini?
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Hubungi kami untuk konsultasi gratis.
              </p>
              <a
                href="https://wa.me/6285117688118?text=Halo%20Saat.%20Saya%20tertarik%20dengan%20project%20serupa."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:bg-navy-light transition-all"
              >
                Hubungi Kami
              </a>
            </div>

            <div className="mt-8 pt-6 border-t border-border flex items-center gap-3 cursor-pointer" onClick={handleShare}>
              <Share2 size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground hover:text-electric transition-colors">Bagikan portfolio ini</span>
            </div>
          </motion.div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-16">
              <h3 className="text-xl font-bold text-primary mb-6">
                Portfolio Lainnya
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((p) => (
                  <Link
                    key={p.id}
                    to={`/portfolio/${p.id}`}
                    className="group rounded-2xl overflow-hidden bg-card border border-border shadow-soft hover:shadow-elevated transition-all hover:-translate-y-1"
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      {p.image_url ? (
                        <img
                          src={p.image_url}
                          alt={p.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-electric/80 to-navy flex items-center justify-center">
                          <span className="text-primary-foreground/60 font-bold">{p.title}</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-primary group-hover:text-electric transition-colors text-sm">
                        {p.title}
                      </h4>
                      <span className="text-xs text-muted-foreground">{p.category}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PortfolioDetail;
