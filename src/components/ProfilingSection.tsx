import ScrollReveal from "@/components/ScrollReveal";
import { ArrowRight, Music, Building2, Users, Mic2 } from "lucide-react";

const profilingItems = [
  {
    icon: Music,
    tag: "#SaatMusik",
    title: "Profil Band & Musisi",
    description: "Ceritakan kisah perjalanan musikmu lewat profil digital yang autentik dan menarik.",
    gradient: "from-electric/80 to-navy",
  },
  {
    icon: Building2,
    tag: "#SaatnyaKamuTau",
    title: "Profil Instansi & Organisasi",
    description: "Bangun citra profesional untuk instansi, komunitas, atau organisasi kamu.",
    gradient: "from-navy to-electric/60",
  },
  {
    icon: Mic2,
    tag: "#Saat",
    title: "Profil Personal Brand",
    description: "Tampilkan siapa kamu ke dunia — dari kreator, influencer, hingga public figure.",
    gradient: "from-electric/60 to-navy/90",
  },
  {
    icon: Users,
    tag: "#SaatnyaKamuTau",
    title: "Profil Komunitas",
    description: "Dokumentasikan perjalanan dan pencapaian komunitasmu secara digital.",
    gradient: "from-navy/80 to-electric",
  },
];

const ProfilingSection = () => {
  return (
    <section id="profiling" className="py-24">
      <div className="container mx-auto px-6">
        <ScrollReveal className="text-center mb-12">
          <span className="text-sm font-semibold text-electric uppercase tracking-wider">
            Profiling
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mt-3">
            Ceritakan Kisah Mereka ke Dunia
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            Kami membantu membuat profil digital untuk band, musisi, instansi, komunitas, dan personal brand — lengkap dengan cerita, visual, dan identitas unik.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {profilingItems.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.1} variant="fade-up">
              <div className="group relative rounded-2xl bg-card border border-border p-6 hover:shadow-elevated transition-all duration-300 h-full flex flex-col cursor-pointer hover:border-electric/40">
                {/* Gradient top accent */}
                <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r ${item.gradient}`} />

                <div className="w-12 h-12 rounded-xl bg-electric/10 flex items-center justify-center mb-4 group-hover:bg-electric/20 transition-colors">
                  <item.icon size={22} className="text-electric" />
                </div>

                <span className="text-[10px] font-bold uppercase tracking-widest text-electric mb-2">
                  {item.tag}
                </span>

                <h3 className="font-bold text-primary text-base mb-2 group-hover:text-electric transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {item.description}
                </p>

                <div className="mt-4 pt-3 border-t border-border">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-electric group-hover:gap-2 transition-all">
                    Lihat Contoh <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom CTA */}
        <ScrollReveal className="text-center mt-12">
          <a
            href="https://wa.me/6285117688118?text=Halo%20Saat.%20Saya%20tertarik%20dengan%20layanan%20profiling."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-electric px-6 py-3 text-sm font-semibold text-accent-foreground hover:bg-electric-light transition-colors"
          >
            Mau Dibuatkan Profil? <ArrowRight size={16} />
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ProfilingSection;
