import ScrollReveal from "@/components/ScrollReveal";
import { ArrowRight, Flame, TicketPercent } from "lucide-react";

const BannerAd = () => {
  return (
    <ScrollReveal variant="fade">
      <div className="relative rounded-2xl overflow-hidden my-6 border-2 border-electric/30 shadow-elevated">
        <div className="bg-gradient-to-r from-navy via-navy-light to-electric/40 px-5 py-6 sm:px-8 sm:py-7 flex flex-col sm:flex-row items-center justify-between gap-5">
          {/* Decorative glow */}
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-electric/20 blur-[80px]" />
          <div className="absolute bottom-0 left-1/4 w-32 h-32 rounded-full bg-electric/10 blur-[50px]" />

          <div className="relative z-10 flex items-start gap-4 text-center sm:text-left">
            <div className="hidden sm:flex w-14 h-14 rounded-2xl bg-electric/20 backdrop-blur items-center justify-center shrink-0 border border-electric/30">
              <TicketPercent size={26} className="text-electric-light" />
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start mb-1.5">
                <Flame size={14} className="text-electric-light animate-pulse" />
                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-electric-light bg-electric/15 px-2.5 py-0.5 rounded-full">
                  🔥 Promo Terbatas
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-primary-foreground mb-1 leading-tight">
                Diskon 20% Paket Website + Branding
              </h3>
              <p className="text-primary-foreground/70 text-xs sm:text-sm font-medium">
                Berlaku hingga akhir Februari 2026 · Konsultasi <span className="font-bold text-electric-light">GRATIS!</span>
              </p>
            </div>
          </div>

          <div className="relative z-10 shrink-0">
            <a
              href="https://wa.me/6285117688118?text=Halo%20Saat.%20Saya%20tertarik%20dengan%20promo%20diskon%2020%25%20paket%20website%20%2B%20branding."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-electric px-6 py-3 text-sm font-bold text-accent-foreground hover:bg-electric-light transition-all hover:shadow-[0_0_30px_hsl(217_91%_60%/0.4)] hover:scale-105 active:scale-100 whitespace-nowrap"
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
