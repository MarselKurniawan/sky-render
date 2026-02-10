import ScrollReveal from "@/components/ScrollReveal";
import { Globe, Palette, Megaphone, Share2, Search, Camera, Film, FileText } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Website & System Development",
    description: "Pembuatan website company profile, landing page, e-commerce, sistem manajemen internal, dashboard, dan aplikasi web custom sesuai kebutuhan bisnis kamu.",
  },
  {
    icon: Palette,
    title: "Branding & Visual Identity",
    description: "Membangun identitas brand yang kuat mulai dari logo, color palette, brand guideline, typography system, hingga konsistensi visual di semua platform.",
  },
  {
    icon: Megaphone,
    title: "Digital Campaign Strategy",
    description: "Merancang strategi campaign digital mulai dari Meta Ads, Google Ads, TikTok Ads, hingga influencer marketing untuk meningkatkan reach dan konversi.",
  },
  {
    icon: Share2,
    title: "Social Media Management",
    description: "Mengelola akun social media brand kamu — content planning, pembuatan konten, scheduling, community management, hingga analisis performa bulanan.",
  },
  {
    icon: Search,
    title: "SEO Optimization",
    description: "Meningkatkan visibilitas website di Google melalui on-page SEO, technical SEO, keyword research, dan link building untuk mendatangkan traffic organik.",
  },
  {
    icon: Camera,
    title: "Visual Content Production",
    description: "Pembuatan desain logo, poster, banner, feeds Instagram, konten TikTok, foto produk, dan berbagai visual kreatif lainnya untuk kebutuhan branding & campaign.",
  },
  {
    icon: Film,
    title: "Company Profile Video",
    description: "Produksi video company profile profesional untuk mengkomunikasikan cerita brand, value perusahaan, dan membangun kredibilitas secara visual.",
  },
  {
    icon: FileText,
    title: "White Label Content",
    description: "Solusi konten digital siap pakai untuk agency dan bisnis yang ingin menyajikan konten berkualitas di bawah brand mereka sendiri tanpa ribet produksi.",
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
              <div className="group rounded-2xl bg-card p-6 shadow-soft hover:shadow-elevated hover:glow-blue transition-all duration-300 cursor-default h-full">
                <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-electric/10 text-electric group-hover:bg-electric group-hover:text-accent-foreground transition-colors duration-300">
                  <service.icon size={22} />
                </div>
                <h3 className="font-bold text-primary mb-2 text-sm">{service.title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">{service.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
