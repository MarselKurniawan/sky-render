import ScrollReveal from "@/components/ScrollReveal";
import { ArrowRight, Flame, TicketPercent } from "lucide-react";

const BannerAd = () => {
  return (
    <ScrollReveal variant="fade">
      <div className="relative rounded-2xl overflow-hidden my-6 border-2 border-yellow-400/40">
        {/* Hot ad gradient background */}
        <div className="bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 px-5 py-6 sm:px-8 sm:py-7 flex flex-col sm:flex-row items-center justify-between gap-5">
          {/* Decorative glow */}
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-yellow-300/30 blur-[80px]" />
          <div className="absolute bottom-0 left-1/4 w-32 h-32 rounded-full bg-red-400/20 blur-[50px]" />

          <div className="relative z-10 flex items-start gap-4 text-center sm:text-left">
            <div className="hidden sm:flex w-14 h-14 rounded-2xl bg-white/20 backdrop-blur items-center justify-center shrink-0 border border-white/30">
              <TicketPercent size={26} className="text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start mb-1.5">
                <Flame size={14} className="text-yellow-200 animate-pulse" />
                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-yellow-100 bg-black/20 px-2.5 py-0.5 rounded-full">
                  🔥 Promo Terbatas
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-white mb-1 leading-tight drop-shadow-md">
                Diskon 20% Paket Website + Branding
              </h3>
              <p className="text-white/80 text-xs sm:text-sm font-medium">
                Berlaku hingga akhir Februari 2026 · Konsultasi <span className="font-bold text-yellow-200">GRATIS!</span>
              </p>
            </div>
          </div>

          <div className="relative z-10 shrink-0">
            <a
              href="https://wa.me/6285117688118?text=Halo%20Saat.%20Saya%20tertarik%20dengan%20promo%20diskon%2020%25%20paket%20website%20%2B%20branding."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-red-600 hover:bg-yellow-100 transition-all hover:shadow-xl hover:scale-105 active:scale-100 whitespace-nowrap shadow-lg"
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
