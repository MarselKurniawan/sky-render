import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import ScrollReveal from "@/components/ScrollReveal";
import { ArrowRight } from "lucide-react";

const CtaSection = () => {
  const [waNumber, setWaNumber] = useState("6285117688118");
  const [ctaImage, setCtaImage] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .from("site_settings")
      .select("key, value")
      .in("key", ["whatsapp_number", "cta_image_url"])
      .then(({ data }) => {
        data?.forEach((row) => {
          if (row.key === "whatsapp_number" && row.value) setWaNumber(row.value);
          if (row.key === "cta_image_url" && row.value) setCtaImage(row.value);
        });
      });
  }, []);

  return (
    <section id="cta" className="py-16">
      <div className="container mx-auto px-6">
        <ScrollReveal variant="scale">
          <div className="relative rounded-2xl overflow-hidden bg-electric">
            {/* Dot pattern */}
            <div className="absolute inset-0 opacity-[0.06]" style={{
              backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }} />

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 px-8 py-8 sm:px-12 sm:py-10">
              {/* Text content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-xl sm:text-2xl font-extrabold text-accent-foreground mb-2">
                  Siap Wujudkan Ide Digitalmu?
                </h3>
                <p className="text-accent-foreground/80 text-sm sm:text-base leading-relaxed mb-4">
                  Konsultasi gratis untuk brand, bisnis, dan project kreatifmu bersama tim kami.
                </p>
                <a
                  href={`https://wa.me/${waNumber}?text=${encodeURIComponent("Halo Saat. Saya tertarik untuk memulai project bersama.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:bg-navy-light transition-all hover:shadow-elevated group"
                >
                  Mulai Sekarang
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Right side - dynamic image or fallback */}
              <div className="hidden md:flex items-center shrink-0">
                {ctaImage ? (
                  <div className="w-52 h-36 rounded-xl overflow-hidden border border-accent-foreground/20">
                    <img
                      src={ctaImage}
                      alt="CTA visual"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-48 h-32 rounded-xl bg-accent-foreground/10 backdrop-blur-sm border border-accent-foreground/20 flex items-center justify-center overflow-hidden">
                    <div className="text-center p-4">
                      <div className="w-10 h-10 rounded-full bg-accent-foreground/20 mx-auto mb-2 flex items-center justify-center">
                        <span className="text-accent-foreground text-lg font-bold">S</span>
                      </div>
                      <span className="text-accent-foreground/80 text-xs font-medium">Saat. Creative</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CtaSection;
