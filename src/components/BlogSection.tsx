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

        {/* Split Layout: Profiling Banner (Left) + Articles (Right) */}
        <div className="flex flex-col lg:flex-row gap-8 mb-8">
          {/* Left: Profiling Banner */}
          <ScrollReveal variant="fade-left" className="lg:w-[340px] shrink-0">
            <div className="gradient-navy rounded-2xl p-6 sm:p-8 h-full flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-electric/20 blur-[50px]" />
              <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-electric/10 blur-[40px]" />
              <div className="relative z-10 flex flex-col h-full">
                <span className="text-[10px] font-bold uppercase tracking-widest text-electric bg-electric/20 px-3 py-1 rounded-full self-start mb-6">
                  Profil
                </span>
                <div className="w-16 h-16 rounded-2xl bg-electric/20 flex items-center justify-center mb-5">
                  <span className="text-2xl font-black text-electric">S.</span>
                </div>
                <h3 className="text-xl font-bold text-primary-foreground mb-3">Saat.</h3>
                <p className="text-primary-foreground/70 text-sm leading-relaxed mb-6 flex-1">
                  Digital agency yang membantu brand berkembang melalui strategi digital, branding, dan teknologi terkini. Kami percaya setiap bisnis punya cerita unik.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-electric/20 flex items-center justify-center">
                      <span className="text-xs font-bold text-electric">50+</span>
                    </div>
                    <span className="text-sm text-primary-foreground/80">Proyek Selesai</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-electric/20 flex items-center justify-center">
                      <span className="text-xs font-bold text-electric">30+</span>
                    </div>
                    <span className="text-sm text-primary-foreground/80">Klien Aktif</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-electric/20 flex items-center justify-center">
                      <span className="text-xs font-bold text-electric">3+</span>
                    </div>
                    <span className="text-sm text-primary-foreground/80">Tahun Pengalaman</span>
                  </div>
                </div>
                <a
                  href="https://wa.me/6285117688118?text=Halo%20Saat.%20Saya%20ingin%20konsultasi."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-electric px-5 py-2.5 text-sm font-semibold text-accent-foreground hover:bg-electric-light transition-colors"
                >
                  Konsultasi Gratis <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Categories + Articles */}
          <div className="flex-1 min-w-0">
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

            {/* Article List */}
            <div className="space-y-4 mb-6">
              {paginatedPosts.map((post, i) => (
                <ScrollReveal key={post.id} delay={i * 0.08} variant="fade-up">
                  <article className="group flex gap-4 rounded-xl bg-card shadow-soft hover:shadow-elevated transition-all duration-300 overflow-hidden cursor-pointer p-4">
                    <div className={`w-28 h-28 sm:w-36 sm:h-28 shrink-0 rounded-xl bg-gradient-to-br ${post.image} relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300" />
                    </div>
                    <div className="flex flex-col flex-1 min-w-0 py-0.5">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-electric">
                          {categories.find((c) => c.id === post.category)?.label}
                        </span>
                      </div>
                      <h3 className="font-bold text-sm text-primary mb-1 group-hover:text-electric transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-2 flex-1 line-clamp-2 hidden sm:block">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                        <span className="flex items-center gap-1"><Calendar size={10} /> {post.date}</span>
                        <span className="flex items-center gap-1"><Clock size={10} /> {post.readTime}</span>
                      </div>
                    </div>
                  </article>
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
