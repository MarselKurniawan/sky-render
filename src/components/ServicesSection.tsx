import ScrollReveal from "@/components/ScrollReveal";
import { Globe, Palette, Megaphone, Share2, Search, Camera, Film, FileText, ArrowUpRight } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Website & System Development",
    description: "Pembuatan website dan sistem digital custom sesuai kebutuhan bisnis kamu.",
    items: ["Company Profile", "Landing Page", "E-Commerce", "Sistem Internal", "Dashboard", "Aplikasi Web Custom"],
    span: "lg:col-span-2 lg:row-span-2",
    variant: "navy",
    featured: true,
  },
  {
    icon: Palette,
    title: "Branding & Visual Identity",
    description: "Membangun identitas brand yang kuat dan konsisten.",
    items: ["Logo Design", "Color & Typography", "Brand Guideline", "Visual System"],
    span: "lg:col-span-2",
    variant: "lime",
  },
  {
    icon: Megaphone,
    title: "Digital Campaign Strategy",
    description: "Strategi campaign digital untuk meningkatkan reach & konversi.",
    items: ["Meta Ads", "Google Ads", "TikTok Ads", "Influencer Marketing"],
    span: "",
    variant: "card",
  },
  {
    icon: Share2,
    title: "Social Media Management",
    description: "Pengelolaan akun social media brand kamu secara menyeluruh.",
    items: ["Content Planning", "Pembuatan Konten", "Scheduling", "Community Management"],
    span: "",
    variant: "card",
  },
  {
    icon: Search,
    title: "SEO Optimization",
    description: "Tingkatkan visibilitas website di Google untuk traffic organik.",
    items: ["On-Page SEO", "Technical SEO", "Keyword Research", "SEO Audit"],
    span: "lg:col-span-2",
    variant: "electric",
  },
  {
    icon: Camera,
    title: "Visual Content Production",
    description: "Pembuatan visual kreatif untuk branding & campaign.",
    items: ["Desain Logo", "Poster & Banner", "Feeds Instagram", "Foto Produk"],
    span: "",
    variant: "card",
  },
  {
    icon: Film,
    title: "Company Profile Video",
    description: "Produksi video profesional untuk mengkomunikasikan cerita brand.",
    items: ["Video Company Profile", "Brand Story", "Testimoni", "Event Documentation"],
    span: "",
    variant: "card",
  },
  {
    icon: FileText,
    title: "White Label Content",
    description: "Solusi konten digital siap pakai untuk agency dan bisnis.",
    items: ["Konten Social Media", "Template Desain", "Copywriting", "Konten Blog"],
    span: "lg:col-span-2",
    variant: "navy",
  },
];

const variantClass = (v: string) => {
  switch (v) {
    case "navy":
      return "block-navy";
    case "electric":
      return "block-electric";
    case "lime":
      return "block-lime";
    default:
      return "bg-card text-card-foreground border-2 border-primary";
  }
};

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 bg-background" aria-labelledby="services-heading">
      <div className="container mx-auto px-6">
        <ScrollReveal className="mb-12 max-w-4xl">
          <span className="text-xs font-bold text-accent uppercase tracking-widest">/ Layanan Kami</span>
          <h2
            id="services-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary mt-3 leading-[1]"
          >
            Solusi digital lengkap untuk
            <span className="italic font-serif"> bisnismu</span>.
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-fr gap-4">
          {services.map((service, i) => {
            const Icon = service.icon;
            const isFeatured = service.featured;
            return (
              <ScrollReveal key={service.title} delay={i * 0.05} variant="fade-up" className={service.span}>
                <article
                  className={`group relative rounded-3xl p-7 h-full flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1 ${variantClass(service.variant)}`}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${
                        service.variant === "card" ? "bg-primary text-primary-foreground" : "bg-background/15 backdrop-blur-sm"
                      }`}
                    >
                      <Icon size={26} strokeWidth={2} />
                    </div>
                    <ArrowUpRight
                      size={22}
                      className="opacity-40 group-hover:opacity-100 group-hover:rotate-45 transition-all"
                    />
                  </div>

                  <div>
                    <h3 className={`font-extrabold mb-2 ${isFeatured ? "text-2xl sm:text-3xl" : "text-lg"}`}>
                      {service.title}
                    </h3>
                    <p className={`${isFeatured ? "text-base" : "text-sm"} opacity-80 leading-relaxed mb-5`}>
                      {service.description}
                    </p>

                    <ul className="flex flex-wrap gap-1.5">
                      {service.items.map((item) => (
                        <li
                          key={item}
                          className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                            service.variant === "card"
                              ? "bg-muted text-muted-foreground"
                              : "bg-background/15 backdrop-blur-sm"
                          }`}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
