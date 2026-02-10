import ScrollReveal from "@/components/ScrollReveal";
import { ArrowRight } from "lucide-react";

const ProfilingSection = () => {
  return (
    <section id="profiling" className="py-24">
      <div className="container mx-auto px-6">
        <ScrollReveal variant="scale">
          <div className="relative rounded-3xl gradient-navy overflow-hidden px-8 py-16 sm:px-12 sm:py-20">
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-electric/20 blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-electric/10 blur-[80px]" />

            <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
              {/* Left: Brand Identity */}
              <div className="flex-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-electric bg-electric/20 px-3 py-1 rounded-full">
                  Profil Kami
                </span>
                <div className="flex items-center gap-4 mt-6 mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-electric/20 flex items-center justify-center">
                    <span className="text-2xl font-black text-electric">S.</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground">Saat.</h2>
                </div>
                <p className="text-primary-foreground/70 text-base leading-relaxed max-w-lg mb-8">
                  Digital agency yang membantu brand berkembang melalui strategi digital, branding, dan teknologi terkini. Kami percaya setiap bisnis punya cerita unik yang layak diceritakan ke dunia.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://wa.me/6285117688118?text=Halo%20Saat.%20Saya%20ingin%20konsultasi."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-electric px-6 py-3 text-sm font-semibold text-accent-foreground hover:bg-electric-light transition-colors"
                  >
                    Konsultasi Gratis <ArrowRight size={16} />
                  </a>
                  <a
                    href="#portfolio"
                    className="rounded-xl border-2 border-primary-foreground/30 px-6 py-3 text-sm font-semibold text-primary-foreground hover:border-primary-foreground/60 transition-all"
                  >
                    Lihat Portfolio
                  </a>
                </div>
              </div>

              {/* Right: Stats */}
              <div className="grid grid-cols-2 gap-6 lg:gap-8">
                {[
                  { value: "50+", label: "Proyek Selesai" },
                  { value: "30+", label: "Klien Aktif" },
                  { value: "3+", label: "Tahun Pengalaman" },
                  { value: "100%", label: "Kepuasan Klien" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center lg:text-left">
                    <div className="text-3xl sm:text-4xl font-extrabold text-electric mb-1">{stat.value}</div>
                    <div className="text-sm text-primary-foreground/70">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ProfilingSection;
