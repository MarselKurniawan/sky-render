import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { ArrowRight, Calendar, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import BannerAd from "@/components/BannerAd";

const categories = [
  { id: "all", label: "Semua" },
  { id: "digital-marketing", label: "Digital Marketing" },
  { id: "branding", label: "Branding" },
  { id: "teknologi", label: "Teknologi" },
];

const allPosts = [
  {
    id: 1,
    title: "5 Strategi Digital Marketing yang Wajib Dicoba di 2026",
    excerpt: "Pelajari strategi digital marketing terkini yang bisa meningkatkan pertumbuhan bisnis kamu secara signifikan.",
    category: "digital-marketing",
    date: "8 Feb 2026",
    readTime: "5 menit",
    image: "from-electric/60 to-navy",
  },
  {
    id: 2,
    title: "Panduan Lengkap Membangun Brand Identity yang Kuat",
    excerpt: "Brand identity yang konsisten adalah kunci untuk membangun kepercayaan dan loyalitas pelanggan.",
    category: "branding",
    date: "5 Feb 2026",
    readTime: "7 menit",
    image: "from-navy to-electric/50",
  },
  {
    id: 3,
    title: "Tren Website Design 2026: Apa yang Harus Kamu Tahu",
    excerpt: "Dari AI-powered design hingga immersive experiences, ini tren website yang akan mendominasi tahun ini.",
    category: "teknologi",
    date: "2 Feb 2026",
    readTime: "6 menit",
    image: "from-electric/80 to-navy/90",
  },
  {
    id: 4,
    title: "Cara Meningkatkan Engagement di Social Media",
    excerpt: "Tips dan trik untuk meningkatkan engagement rate di berbagai platform social media.",
    category: "digital-marketing",
    date: "28 Jan 2026",
    readTime: "4 menit",
    image: "from-navy/80 to-electric",
  },
  {
    id: 5,
    title: "Mengapa Rebranding Penting untuk Bisnis yang Bertumbuh",
    excerpt: "Kapan waktu yang tepat untuk rebranding dan bagaimana melakukannya dengan benar.",
    category: "branding",
    date: "25 Jan 2026",
    readTime: "8 menit",
    image: "from-electric to-navy/70",
  },
  {
    id: 6,
    title: "SEO vs SEM: Mana yang Lebih Cocok untuk Bisnis Kamu?",
    excerpt: "Memahami perbedaan dan kapan menggunakan SEO atau SEM untuk hasil maksimal.",
    category: "digital-marketing",
    date: "20 Jan 2026",
    readTime: "5 menit",
    image: "from-navy to-electric/70",
  },
  {
    id: 7,
    title: "Memilih Tech Stack yang Tepat untuk Startup",
    excerpt: "Framework dan tools terbaik untuk membangun produk digital yang scalable di tahun 2026.",
    category: "teknologi",
    date: "15 Jan 2026",
    readTime: "6 menit",
    image: "from-electric/70 to-navy/80",
  },
  {
    id: 8,
    title: "Color Psychology dalam Branding: Panduan Praktis",
    excerpt: "Bagaimana warna mempengaruhi persepsi brand dan cara memilih palet warna yang tepat.",
    category: "branding",
    date: "10 Jan 2026",
    readTime: "5 menit",
    image: "from-navy/70 to-electric/60",
  },
  {
    id: 9,
    title: "AI dalam Digital Marketing: Peluang dan Tantangan",
    excerpt: "Bagaimana AI mengubah landscape digital marketing dan cara memanfaatkannya.",
    category: "teknologi",
    date: "5 Jan 2026",
    readTime: "7 menit",
    image: "from-electric/50 to-navy",
  },
];

const POSTS_PER_PAGE = 3;

const BlogSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPosts = activeCategory === "all"
    ? allPosts
    : allPosts.filter((post) => post.category === activeCategory);

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
    <section id="blog" className="py-24">
      <div className="container mx-auto px-6">
        <ScrollReveal className="text-center mb-12">
          <span className="text-sm font-semibold text-electric uppercase tracking-wider">Blog</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mt-3">Artikel & Insight Terbaru</h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            Tips, strategi, dan insight terbaru seputar digital marketing, branding, dan teknologi.
          </p>
        </ScrollReveal>

        {/* Categories */}
        <ScrollReveal className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
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
        <div className="text-sm text-muted-foreground mb-6 text-center">
          Menampilkan {paginatedPosts.length} dari {filteredPosts.length} artikel
        </div>

        {/* Blog Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {paginatedPosts.map((post, i) => (
            <ScrollReveal key={post.id} delay={i * 0.1} variant="fade-up">
              <article className="group rounded-2xl bg-card shadow-soft hover:shadow-elevated transition-all duration-300 overflow-hidden h-full flex flex-col cursor-pointer">
                <div className={`aspect-[16/9] bg-gradient-to-br ${post.image} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300" />
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-accent-foreground bg-electric/90 px-3 py-1 rounded-full">
                      {categories.find((c) => c.id === post.category)?.label}
                    </span>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="font-bold text-primary mb-2 group-hover:text-electric transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-electric group-hover:gap-2 transition-all">
                    Baca Selengkapnya <ArrowRight size={14} />
                  </span>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

        {/* Banner Ad */}
        <BannerAd />

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
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm font-semibold text-electric hover:gap-3 transition-all"
          >
            Lihat Semua Artikel <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
