import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import ScrollReveal from "@/components/ScrollReveal";
import { ArrowUpRight, Sparkles } from "lucide-react";

interface Banner {
  id: string;
  title: string;
  description: string | null;
  cta_text: string | null;
  cta_url: string | null;
  badge_text: string | null;
}

const BannerAd = () => {
  const [banner, setBanner] = useState<Banner | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("promo_banners")
        .select("id, title, description, cta_text, cta_url, badge_text")
        .eq("is_active", true)
        .order("display_order")
        .limit(1)
        .maybeSingle();
      setBanner(data);
    };
    fetch();
  }, []);

  if (!banner) return null;

  return (
    <ScrollReveal variant="fade">
      <div className="relative rounded-3xl overflow-hidden my-6 block-lime p-7 sm:p-9">
        <div className="grid sm:grid-cols-12 gap-6 items-end relative z-10">
          <div className="sm:col-span-8">
            {banner.badge_text && (
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest bg-primary text-primary-foreground px-3 py-1.5 rounded-full mb-4">
                <Sparkles size={11} /> {banner.badge_text}
              </span>
            )}
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary leading-[1.05] mb-2">
              {banner.title}
            </h3>
            {banner.description && (
              <p className="text-primary/70 text-sm sm:text-base leading-relaxed max-w-lg">
                {banner.description}
              </p>
            )}
          </div>

          {banner.cta_url && banner.cta_text && (
            <div className="sm:col-span-4 flex sm:justify-end">
              <a
                href={banner.cta_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground hover:bg-accent transition-colors whitespace-nowrap"
              >
                {banner.cta_text}
                <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />
              </a>
            </div>
          )}
        </div>
      </div>
    </ScrollReveal>
  );
};

export default BannerAd;
