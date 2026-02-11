import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BannerAd from "@/components/BannerAd";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";

// Sample article data (will be from DB later)
const sampleArticles: Record<string, {
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  content: string[];
}> = {
  "perjalanan-musik-band-lokal": {
    title: "Perjalanan Musik Band Lokal: Dari Garasi ke Panggung Besar",
    category: "musik",
    date: "8 Feb 2026",
    readTime: "5 menit",
    image: "from-electric/60 to-navy",
    content: [
      "Setiap band besar punya cerita kecil di baliknya. Begitu juga dengan Senja Kala, sebuah band indie asal Bandung yang memulai perjalanan musiknya dari garasi rumah sang vokalis pada tahun 2021.",
      "Dengan modal gitar akustik bekas dan semangat yang membara, mereka mulai menulis lagu-lagu pertama mereka. Genre mereka? Campuran indie folk dengan sentuhan musik tradisional Sunda yang membuat mereka unik di tengah lautan band indie Indonesia.",
      "Titik balik datang ketika single pertama mereka, 'Hujan di Bulan Juni', viral di media sosial. Dalam waktu dua minggu, lagu tersebut diputar lebih dari 500.000 kali di platform streaming. Label rekaman mulai melirik, dan tawaran manggung berdatangan.",
      "Kini, Senja Kala telah merilis dua album penuh dan tampil di berbagai festival musik besar di Indonesia. Dari Synchronize Fest hingga Java Jazz Festival, mereka membuktikan bahwa musik yang autentik selalu menemukan audiensnya.",
      "Profil digital yang kami buatkan untuk Senja Kala mencakup dokumentasi perjalanan musik mereka, galeri foto profesional, diskografi lengkap, dan halaman merchandise. Semua dalam satu platform yang mencerminkan identitas visual band mereka.",
    ],
  },
  "profil-dinas-pariwisata-kota-bandung": {
    title: "Profil Dinas Pariwisata Kota Bandung: Inovasi Digital",
    category: "instansi",
    date: "5 Feb 2026",
    readTime: "7 menit",
    image: "from-navy to-electric/50",
    content: [
      "Di era digital, instansi pemerintah pun perlu hadir secara online dengan cara yang menarik dan informatif. Dinas Pariwisata Kota Bandung menjadi salah satu contoh terbaik transformasi digital di sektor pemerintahan.",
      "Kami dipercaya untuk membangun profil digital mereka yang tidak hanya informatif, tetapi juga interaktif. Pengunjung bisa menjelajahi peta wisata interaktif, membaca cerita di balik setiap destinasi, dan bahkan memesan tiket langsung.",
      "Hasilnya? Dalam 6 bulan pertama setelah peluncuran, traffic website meningkat 340% dan engagement di media sosial naik 200%. Yang lebih penting, kunjungan wisatawan ke destinasi-destinasi yang dipromosikan meningkat signifikan.",
      "Profil digital ini juga mencakup dashboard analitik real-time yang membantu Dinas Pariwisata memahami tren kunjungan dan preferensi wisatawan, sehingga mereka bisa membuat keputusan berbasis data.",
    ],
  },
};

const ArticleDetail = () => {
  const { slug } = useParams();
  const article = slug ? sampleArticles[slug] : null;

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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            {/* Back */}
            <Link to="/profiling" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-electric transition-colors mb-6">
              <ArrowLeft size={16} /> Kembali ke Profiling
            </Link>

            {/* Hero Image */}
            <div className={`w-full h-48 sm:h-64 rounded-2xl bg-gradient-to-br ${article.image} mb-8 relative overflow-hidden`}>
              <div className="absolute inset-0 bg-primary/10" />
            </div>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-electric bg-electric/10 px-3 py-1 rounded-full">
                {article.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground"><Calendar size={12} /> {article.date}</span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock size={12} /> {article.readTime}</span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-6 leading-tight">{article.title}</h1>

            {/* Content */}
            <div className="space-y-4">
              {article.content.map((paragraph, i) => (
                <div key={i}>
                  <p className="text-muted-foreground leading-relaxed">{paragraph}</p>
                  {/* Inject ad after 2nd paragraph */}
                  {i === 1 && <BannerAd />}
                </div>
              ))}
            </div>

            {/* Share */}
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
