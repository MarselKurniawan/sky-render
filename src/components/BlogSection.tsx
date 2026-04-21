import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import { ArrowUpRight, Calendar, Clock, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import BannerAd from "@/components/BannerAd";

const categories = [
  { id: "all", label: "Semua" },
  { id: "digital-marketing", label: "Digital Marketing" },
  { id: "branding", label: "Branding" },
  { id: "teknologi", label: "Teknologi" },
];

const POSTS_PER_PAGE = 4;

const BlogSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["blog-articles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("is_published", true)
        .eq("article_type", "blog")
        .order("published_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const filteredPosts = activeCategory === "all"
    ? posts
    : posts.filter((post) => post.category === activeCategory);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setCurrentPage(1);
  };

  return (
    <section id="blog" className="py-24 bg-background" aria-labelledby="blog-heading">
      <div className="container mx-auto px-6">
        <ScrollReveal className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-accent uppercase tracking-widest">/ Blog</span>
            <h2
              id="blog-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary mt-3 leading-[1]"
            >
              Insight & <span className="italic font-serif">cerita</span> terbaru.
            </h2>
          </div>
          <Link
            to="/artikel"
            className="hidden lg:inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-accent group whitespace-nowrap"
          >
            Lihat Semua <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />
          </Link>
        </ScrollReveal>

        {/* Categories */}
        <ScrollReveal className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all border-2 ${
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-primary border-primary/20 hover:border-primary"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </ScrollReveal>

        {isLoading && (
          <div className="flex justify-center py-16">
            <Loader2 className="animate-spin text-accent" size={28} />
          </div>
        )}

        {!isLoading && posts.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <p>Belum ada artikel. Tambahkan dari admin panel.</p>
          </div>
        )}

        {/* Article Grid — magazine style */}
        {!isLoading && paginatedPosts.length > 0 && (
          <div className="grid sm:grid-cols-2 gap-5 mb-8">
            {paginatedPosts.map((post, i) => (
              <ScrollReveal key={post.id} delay={i * 0.06} variant="fade-up">
                <Link to={`/${post.slug}`}>
                  <article className="group h-full rounded-3xl overflow-hidden bg-card border-2 border-primary/10 hover:border-primary transition-colors duration-200 flex flex-col">
                    <div className="aspect-[16/9] overflow-hidden bg-muted relative">
                      {post.image_url ? (
                        <img
                          src={post.image_url}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full block-navy flex items-center justify-center">
                          <span className="text-6xl font-extrabold text-primary-foreground/20 italic font-serif">
                            Saat.
                          </span>
                        </div>
                      )}
                      <span className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-widest bg-background text-primary px-3 py-1.5 rounded-full">
                        {categories.find((c) => c.id === post.category)?.label || post.category}
                      </span>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="font-extrabold text-xl text-primary mb-2 group-hover:text-accent transition-colors line-clamp-2 leading-tight">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4 flex-1">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-primary/10">
                        <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                          {post.published_at && (
                            <span className="flex items-center gap-1">
                              <Calendar size={11} />
                              {new Date(post.published_at).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </span>
                          )}
                          {post.read_time && (
                            <span className="flex items-center gap-1">
                              <Clock size={11} /> {post.read_time}
                            </span>
                          )}
                        </div>
                        <ArrowUpRight
                          size={18}
                          className="text-primary/40 group-hover:text-accent group-hover:rotate-45 transition-all"
                        />
                      </div>
                    </div>
                  </article>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        )}

        <BannerAd />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-11 h-11 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-primary"
              aria-label="Halaman sebelumnya"
            >
              <ChevronLeft size={18} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-11 h-11 rounded-full text-sm font-bold transition-all border-2 ${
                  currentPage === page
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-primary/20 text-primary hover:border-primary"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-11 h-11 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-primary"
              aria-label="Halaman selanjutnya"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}

        <div className="text-center mt-8 lg:hidden">
          <Link
            to="/artikel"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-bold text-primary-foreground hover:bg-accent transition-colors"
          >
            Lihat Semua Artikel <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
