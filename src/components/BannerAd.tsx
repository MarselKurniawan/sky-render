import ScrollReveal from "@/components/ScrollReveal";

const BannerAd = () => {
  return (
    <ScrollReveal variant="fade">
      <div className="relative rounded-2xl overflow-hidden my-8">
        <div className="gradient-navy px-6 py-8 sm:px-10 sm:py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-electric/20 blur-[60px]" />
          <div className="relative z-10 text-center sm:text-left">
            <span className="text-[10px] font-bold uppercase tracking-widest text-electric bg-electric/20 px-3 py-1 rounded-full">
              Promo Spesial
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-primary-foreground mt-3 mb-1">
              Diskon 20% untuk Paket Website + Branding
            </h3>
            <p className="text-primary-foreground/70 text-sm">
              Berlaku hingga akhir Februari 2026. Konsultasi gratis sekarang!
            </p>
          </div>
          <div className="relative z-10 shrink-0">
            <a
              href="https://wa.me/6285117688118?text=Halo%20Saat.%20Saya%20tertarik%20dengan%20promo%20diskon%2020%25%20paket%20website%20%2B%20branding."
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-primary-foreground px-6 py-3 text-sm font-semibold text-primary hover:bg-primary-foreground/90 transition-all hover:shadow-elevated whitespace-nowrap"
            >
              Klaim Sekarang
            </a>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
};

export default BannerAd;
