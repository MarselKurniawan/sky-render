import ScrollReveal from "@/components/ScrollReveal";
import { Sparkles, ArrowRight, Zap, Rocket } from "lucide-react";

const CtaSection = () => {
  return (
    <section id="cta" className="py-24">
      <div className="container mx-auto px-6">
        <ScrollReveal variant="scale">
          <div className="relative rounded-3xl overflow-hidden bg-navy">
            {/* Decorative dot pattern */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }} />

            {/* Geometric decorations */}
            <div className="absolute top-8 right-12 w-20 h-20 border-2 border-electric/20 rounded-2xl rotate-12" />
            <div className="absolute bottom-12 left-8 w-16 h-16 border-2 border-electric/15 rounded-full" />
            <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-electric/30 rounded-full" />
            <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-electric/20 rounded-full" />

            {/* Floating icons */}
            <div className="absolute top-8 left-12 animate-bounce" style={{ animationDelay: "0s", animationDuration: "3s" }}>
              <div className="w-10 h-10 rounded-xl bg-electric/15 flex items-center justify-center">
                <Sparkles size={18} className="text-electric" />
              </div>
            </div>
            <div className="absolute bottom-12 right-16 animate-bounce" style={{ animationDelay: "1s", animationDuration: "3.5s" }}>
              <div className="w-10 h-10 rounded-xl bg-electric/15 flex items-center justify-center">
                <Zap size={18} className="text-electric" />
              </div>
            </div>
            <div className="absolute top-16 right-24 animate-bounce" style={{ animationDelay: "0.5s", animationDuration: "4s" }}>
              <div className="w-8 h-8 rounded-lg bg-electric/10 flex items-center justify-center">
                <Rocket size={14} className="text-electric/80" />
              </div>
            </div>

            <div className="relative z-10 px-8 py-20 sm:px-12 sm:py-24 text-center">
              <div className="inline-flex items-center gap-2 bg-electric/15 text-electric text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
                <Sparkles size={12} />
                Mari Berkolaborasi
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-primary-foreground mb-5 leading-tight max-w-3xl mx-auto">
                Punya Ide Besar?{" "}
                <span className="text-electric">Wujudkan</span> Bersama Kami.
              </h2>

              <p className="text-primary-foreground/60 mb-10 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
                Dari konsep hingga eksekusi — kami siap membantu brand, musisi, dan bisnis kamu tampil di dunia digital.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href="https://wa.me/6285117688118?text=Halo%20Saat.%20Saya%20tertarik%20untuk%20memulai%20project%20bersama."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-electric px-8 py-4 text-sm font-bold text-white hover:bg-electric-light hover:shadow-[0_0_30px_hsl(217_91%_60%/0.4)] transition-all duration-300 hover:scale-105"
                >
                  Mulai Project
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="https://wa.me/6285117688118?text=Halo%20Saat.%20Saya%20ingin%20request%20quotation%20untuk%20project%20saya."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-primary-foreground/20 px-8 py-4 text-sm font-bold text-primary-foreground hover:border-electric hover:text-electric transition-all duration-300"
                >
                  Minta Penawaran
                </a>
              </div>

              {/* Trust badges */}
              <div className="mt-12 flex flex-wrap justify-center gap-6 text-primary-foreground/50 text-xs font-medium">
                <span className="flex items-center gap-1.5">✓ Respon Cepat</span>
                <span className="flex items-center gap-1.5">✓ Konsultasi Gratis</span>
                <span className="flex items-center gap-1.5">✓ Harga Transparan</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CtaSection;
