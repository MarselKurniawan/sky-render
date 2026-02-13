import { ArrowRight } from "lucide-react";

interface InArticleAdProps {
  title?: string;
  description?: string;
  ctaText?: string;
  ctaUrl?: string;
  bgColor?: string;
  textColor?: string;
}

const InArticleAd = ({
  title = "Diskon 20% Paket Website + Branding",
  description = "Berlaku hingga akhir Februari 2026 · Konsultasi GRATIS!",
  ctaText = "Klaim Sekarang",
  ctaUrl = "https://wa.me/6285117688118?text=Halo%20Saat.%20Saya%20tertarik%20dengan%20promo%20website.",
  bgColor = "hsl(var(--navy))",
  textColor = "hsl(var(--primary-foreground))",
}: InArticleAdProps) => {
  return (
    <div
      className="relative rounded-2xl overflow-hidden my-8 border border-border"
      style={{ backgroundColor: bgColor }}
    >
      {/* Subtle pattern dots */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
        backgroundSize: "20px 20px",
      }} />

      <div className="relative z-10 px-6 py-6 sm:px-8 sm:py-7 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <span className="inline-block text-[10px] font-extrabold uppercase tracking-[0.2em] px-2.5 py-0.5 rounded-full mb-2"
            style={{ color: bgColor, backgroundColor: textColor }}>
            🔥 Promo
          </span>
          <h3 className="text-lg font-extrabold mb-1 leading-tight" style={{ color: textColor }}>
            {title}
          </h3>
          <p className="text-sm opacity-70" style={{ color: textColor }}>
            {description}
          </p>
        </div>
        <a
          href={ctaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-all hover:scale-105 active:scale-100 whitespace-nowrap"
          style={{ backgroundColor: "hsl(var(--electric))", color: "white" }}
        >
          {ctaText} <ArrowRight size={14} />
        </a>
      </div>
    </div>
  );
};

export default InArticleAd;
