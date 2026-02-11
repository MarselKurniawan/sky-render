import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import BannerAd from "@/components/BannerAd";
import { Calendar, Clock } from "lucide-react";

const allProfilingArticles = [
  { id: 1, slug: "perjalanan-musik-band-lokal", title: "Perjalanan Musik Band Lokal: Dari Garasi ke Panggung Besar", excerpt: "Kisah inspiratif sebuah band indie lokal yang berhasil menembus industri musik nasional.", category: "musik", date: "8 Feb 2026", readTime: "5 menit", image: "from-electric/60 to-navy" },
  { id: 2, slug: "profil-dinas-pariwisata-kota-bandung", title: "Profil Dinas Pariwisata Kota Bandung: Inovasi Digital", excerpt: "Bagaimana Dinas Pariwisata menggunakan profil digital untuk mempromosikan destinasi wisata.", category: "instansi", date: "5 Feb 2026", readTime: "7 menit", image: "from-navy to-electric/50" },
  { id: 3, slug: "komunitas-fotografi-jakarta", title: "Komunitas Fotografi Jakarta: Cerita di Balik Lensa", excerpt: "Dokumentasi perjalanan komunitas fotografi terbesar di Jakarta selama 5 tahun terakhir.", category: "komunitas", date: "2 Feb 2026", readTime: "6 menit", image: "from-electric/80 to-navy/90" },
  { id: 4, slug: "personal-brand-kreator-konten", title: "Personal Brand: Bagaimana Kreator Konten Ini Membangun Audiensnya", excerpt: "Strategi dan perjalanan seorang kreator konten dalam membangun personal brand yang kuat.", category: "personal", date: "28 Jan 2026", readTime: "4 menit", image: "from-navy/80 to-electric" },
  { id: 5, slug: "sekolah-musik-yamaha", title: "Sekolah Musik Yamaha: Profil Institusi Pendidikan Musik", excerpt: "Melihat lebih dekat bagaimana institusi pendidikan musik membangun profil digitalnya.", category: "instansi", date: "25 Jan 2026", readTime: "8 menit", image: "from-electric to-navy/70" },
  { id: 6, slug: "band-underground-surabaya", title: "Band Underground Surabaya: Ekspresi Tanpa Batas", excerpt: "Profil lengkap scene musik underground di Surabaya dan band-band yang menggerakkannya.", category: "musik", date: "20 Jan 2026", readTime: "6 menit", image: "from-navy to-electric/70" },
];

const AD_EVERY_N = 3;

const Profiling = () => {
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
            {allProfilingArticles.map((post, i) => (
              <div key={post.id}>
                <ScrollReveal delay={i * 0.06} variant="fade-up">
                  <Link to={`/artikel/${post.slug}`}>
                    <article className="group flex gap-4 rounded-xl bg-card shadow-soft hover:shadow-elevated transition-all duration-300 overflow-hidden cursor-pointer p-4">
                      <div className={`w-28 h-28 sm:w-36 sm:h-28 shrink-0 rounded-xl bg-gradient-to-br ${post.image} relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300" />
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
                          <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                          <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                        </div>
                      </div>
                    </article>
                  </Link>
                </ScrollReveal>

                {(i + 1) % AD_EVERY_N === 0 && i < allProfilingArticles.length - 1 && <BannerAd />}
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profiling;
