import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import { ArrowRight, Calendar, Clock, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import BannerAd from "@/components/BannerAd";

const categories = [
  { id: "all", label: "Semua" },
  { id: "digital-marketing", label: "Digital Marketing" },
  { id: "branding", label: "Branding" },
  { id: "teknologi", label: "Teknologi" },
];

const POSTS_PER_PAGE = 3;

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

  const gradients = [
    "from-electric/60 to-navy",
    "from-navy to-electric/50",
    "from-electric/80 to-navy/90",
    "from-navy/80 to-electric",
  ];

  return (
    <section id="blog" className="py-24">
      <div className="container mx-auto px-6">
        <ScrollReveal className="text-center mb-12">
          <span className="text-sm font-semibold text-electric uppercase tracking-wider">Blog</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mt-3">Artikel & Insight Terbaru</h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            Tips, strategi, dan insight terbaru seputar digital marketing, branding, dan teknologi.
          </p>
        </ScrollReveal>

        <div className="mb-8">
          <div>
            {/* Categories */}
            <ScrollReveal className="flex flex-wrap gap-2 mb-6">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat.id
                      ? "bg-electric text-accent-foreground shadow-soft"
                      : "bg-card text-muted-foreground hover:text-primary border border-border hover:border-electric/50"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </ScrollReveal>

            {/* Post count */}
            <div className="text-xs text-muted-foreground mb-4">
              Menampilkan {paginatedPosts.length} dari {filteredPosts.length} artikel
            </div>

            {/* Loading */}
            {isLoading && (
              <div className="flex justify-center py-16">
                <Loader2 className="animate-spin text-electric" size={28} />
              </div>
            )}

            {/* Empty state */}
            {!isLoading && posts.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                <p>Belum ada artikel. Tambahkan dari admin panel.</p>
              </div>
            )}

            {/* Article List */}
            <div className="space-y-4 mb-6">
              {paginatedPosts.map((post, i) => (
                <ScrollReveal key={post.id} delay={i * 0.08} variant="fade-up">
                  <Link to={`/artikel/${post.slug}`}>
                    <article className="group flex gap-4 rounded-xl bg-card shadow-soft hover:shadow-elevated transition-all duration-300 overflow-hidden cursor-pointer p-4">
                      <div className={`w-28 h-28 sm:w-36 sm:h-28 shrink-0 rounded-xl bg-gradient-to-br ${post.image_url ? "" : gradients[i % gradients.length]} relative overflow-hidden`}>
                        {post.image_url ? (
                          <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300" />
                        )}
                      </div>
                      <div className="flex flex-col flex-1 min-w-0 py-0.5">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-electric">
                            {categories.find((c) => c.id === post.category)?.label || post.category}
                          </span>
                        </div>
                        <h3 className="font-bold text-sm text-primary mb-1 group-hover:text-electric transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed mb-2 flex-1 line-clamp-2 hidden sm:block">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                          {post.published_at && (
                            <span className="flex items-center gap-1">
                              <Calendar size={10} />
                              {new Date(post.published_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                            </span>
                          )}
                          {post.read_time && (
                            <span className="flex items-center gap-1"><Clock size={10} /> {post.read_time}</span>
                          )}
                        </div>
                      </div>
                    </article>
                  </Link>
                </ScrollReveal>
              ))}
            </div>

            {/* Banner Ad */}
            <BannerAd />
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-10 h-10 rounded-full border border-border hover:border-electric hover:text-electric flex items-center justify-center transition-colors text-muted-foreground disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Halaman sebelumnya"
            >
              <ChevronLeft size={18} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-full text-sm font-medium transition-all ${
                  currentPage === page
                    ? "bg-electric text-accent-foreground"
                    : "border border-border text-muted-foreground hover:border-electric hover:text-electric"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-10 h-10 rounded-full border border-border hover:border-electric hover:text-electric flex items-center justify-center transition-colors text-muted-foreground disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Halaman selanjutnya"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* Show More */}
        <div className="text-center mt-8">
          <a href="#" className="inline-flex items-center gap-2 text-sm font-semibold text-electric hover:gap-3 transition-all">
            Lihat Semua Artikel <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
