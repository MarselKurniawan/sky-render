import ScrollReveal from "@/components/ScrollReveal";
import { Globe, Palette, Megaphone, Share2, Search, Camera, Film, FileText } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Website & System Development",
    description: "Pembuatan website dan sistem digital custom sesuai kebutuhan bisnis kamu.",
    items: ["Company Profile", "Landing Page", "E-Commerce", "Sistem Manajemen Internal", "Dashboard & Admin Panel", "Aplikasi Web Custom"],
  },
  {
    icon: Palette,
    title: "Branding & Visual Identity",
    description: "Membangun identitas brand yang kuat dan konsisten di semua platform.",
    items: ["Logo Design", "Color Palette & Typography", "Brand Guideline", "Visual System", "Konsistensi Brand"],
  },
  {
    icon: Megaphone,
    title: "Digital Campaign Strategy",
    description: "Merancang strategi campaign digital untuk meningkatkan reach dan konversi.",
    items: ["Meta Ads (Facebook & Instagram)", "Google Ads", "TikTok Ads", "Influencer Marketing", "Campaign Analytics"],
  },
  {
    icon: Share2,
    title: "Social Media Management",
    description: "Mengelola akun social media brand kamu secara menyeluruh.",
    items: ["Content Planning", "Pembuatan Konten", "Scheduling & Posting", "Community Management", "Analisis Performa Bulanan"],
  },
  {
    icon: Search,
    title: "SEO Optimization",
    description: "Meningkatkan visibilitas website di Google untuk mendatangkan traffic organik.",
    items: ["On-Page SEO", "Technical SEO", "Keyword Research", "Link Building", "SEO Audit"],
  },
  {
    icon: Camera,
    title: "Visual Content Production",
    description: "Pembuatan berbagai visual kreatif untuk kebutuhan branding & campaign.",
    items: ["Desain Logo", "Poster & Banner", "Feeds Instagram", "Konten TikTok", "Foto Produk", "Thumbnail YouTube"],
  },
  {
    icon: Film,
    title: "Company Profile Video",
    description: "Produksi video profesional untuk mengkomunikasikan cerita dan value brand.",
    items: ["Video Company Profile", "Brand Story Video", "Testimoni Video", "Event Documentation"],
  },
  {
    icon: FileText,
    title: "White Label Content",
    description: "Solusi konten digital siap pakai untuk agency dan bisnis tanpa ribet produksi.",
    items: ["Konten Social Media", "Template Desain", "Copywriting", "Konten Blog & Artikel"],
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-electric/[0.02] to-transparent" />
      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal className="text-center mb-16">
          <span className="text-sm font-semibold text-electric uppercase tracking-wider">Layanan Kami</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mt-3">Apa yang Bisa Kami Bantu?</h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">Dari website hingga campaign digital, kami siap bantu brand kamu tumbuh di era digital.</p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 0.08} variant="scale">
              <div className="group rounded-2xl bg-card p-6 shadow-soft hover:shadow-elevated hover:glow-blue transition-all duration-300 cursor-default h-full flex flex-col">
                <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-electric/10 text-electric group-hover:bg-electric group-hover:text-accent-foreground transition-colors duration-300">
                  <service.icon size={22} />
                </div>
                <h3 className="font-bold text-primary mb-1.5 text-sm">{service.title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground mb-3">{service.description}</p>
                <ul className="mt-auto space-y-1">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-electric shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
