import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import ScrollReveal from "@/components/ScrollReveal";
import { ArrowRight } from "lucide-react";

const CTA_KEYS = ["whatsapp_number", "cta_image_url", "cta_image_alt", "cta_headline", "cta_description"];

const CtaSection = () => {
  const [waNumber, setWaNumber] = useState("6285117688118");
  const [ctaImage, setCtaImage] = useState<string | null>(null);
  const [ctaImageAlt, setCtaImageAlt] = useState("CTA visual");
  const [headline, setHeadline] = useState("Siap Wujudkan Ide Digitalmu?");
  const [description, setDescription] = useState("Konsultasi gratis untuk brand, bisnis, dan project kreatifmu bersama tim kami.");

  useEffect(() => {
    supabase
      .from("site_settings")
      .select("key, value")
      .in("key", CTA_KEYS)
      .then(({ data }) => {
        data?.forEach((row) => {
          if (row.key === "whatsapp_number" && row.value) setWaNumber(row.value);
          if (row.key === "cta_image_url" && row.value) setCtaImage(row.value);
          if (row.key === "cta_image_alt" && row.value) setCtaImageAlt(row.value);
          if (row.key === "cta_headline" && row.value) setHeadline(row.value);
          if (row.key === "cta_description" && row.value) setDescription(row.value);
        });
      });
  }, []);

  return (
    <section id="cta" className="py-16">
      <div className="container mx-auto px-6">
        <ScrollReveal variant="scale">
          <div className="relative rounded-3xl overflow-hidden block-lime p-10 sm:p-14">
            <div className="grid md:grid-cols-12 gap-8 items-end">
              <div className="md:col-span-8">
                <span className="text-xs font-bold uppercase tracking-widest text-primary/60">/ Mulai Project</span>
                <h3 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary mt-3 leading-[1]">
                  {headline}
                </h3>
                <p className="text-primary/70 text-base sm:text-lg leading-relaxed mt-4 max-w-xl">
                  {description}
                </p>
              </div>
              <div className="md:col-span-4 flex md:justify-end">
                <a
                  href={`https://wa.me/${waNumber}?text=${encodeURIComponent("Halo Saat. Saya tertarik untuk memulai project bersama.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-bold text-primary-foreground hover:bg-accent transition-colors group"
                >
                  Mulai Sekarang
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
            {ctaImage && (
              <img
                src={ctaImage}
                alt={ctaImageAlt}
                className="hidden lg:block absolute -right-8 -bottom-8 w-48 h-48 rounded-2xl object-cover border-4 border-primary rotate-6"
              />
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CtaSection;
