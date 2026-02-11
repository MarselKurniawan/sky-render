import ScrollReveal from "@/components/ScrollReveal";
import { Zap, ArrowRight, Gift } from "lucide-react";

const BannerAd = () => {
  return (
    <ScrollReveal variant="fade">
      <div className="relative rounded-2xl overflow-hidden my-6 border border-electric/20">
        <div className="bg-gradient-to-r from-navy via-navy/95 to-electric/30 px-5 py-6 sm:px-8 sm:py-7 flex flex-col sm:flex-row items-center justify-between gap-5">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-electric/15 blur-[80px]" />
          <div className="absolute bottom-0 left-1/3 w-32 h-32 rounded-full bg-electric/10 blur-[50px]" />

          <div className="relative z-10 flex items-start gap-4 text-center sm:text-left">
            <div className="hidden sm:flex w-12 h-12 rounded-xl bg-electric/20 items-center justify-center shrink-0">
              <Gift size={22} className="text-electric" />
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start mb-1.5">
                <Zap size={12} className="text-electric" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-electric">
                  Promo Spesial
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-primary-foreground mb-1 leading-tight">
                Diskon 20% Paket Website + Branding
              </h3>
              <p className="text-primary-foreground/60 text-xs sm:text-sm">
                Berlaku hingga akhir Februari 2026 · Konsultasi gratis!
              </p>
            </div>
          </div>

          <div className="relative z-10 shrink-0">
            <a
              href="https://wa.me/6285117688118?text=Halo%20Saat.%20Saya%20tertarik%20dengan%20promo%20diskon%2020%25%20paket%20website%20%2B%20branding."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-electric px-5 py-2.5 text-sm font-semibold text-accent-foreground hover:bg-electric-light transition-all hover:shadow-elevated whitespace-nowrap"
            >
              Klaim Sekarang <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
};

export default BannerAd;
