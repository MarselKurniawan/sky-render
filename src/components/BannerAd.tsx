import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import ScrollReveal from "@/components/ScrollReveal";
import { ArrowRight, Flame, TicketPercent } from "lucide-react";

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
      <div className="relative rounded-2xl overflow-hidden my-6 border border-border shadow-elevated">
        <div className="bg-navy px-5 py-6 sm:px-8 sm:py-7 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }} />

          <div className="absolute top-3 right-6 w-12 h-12 border border-electric/15 rounded-xl rotate-12" />
          <div className="absolute bottom-3 left-1/4 w-8 h-8 border border-electric/10 rounded-full" />

          <div className="relative z-10 flex items-start gap-4 text-center sm:text-left">
            <div className="hidden sm:flex w-14 h-14 rounded-2xl bg-electric/15 items-center justify-center shrink-0 border border-electric/20">
              <TicketPercent size={26} className="text-electric" />
            </div>
            <div>
              {banner.badge_text && (
                <div className="flex items-center gap-2 justify-center sm:justify-start mb-1.5">
                  <Flame size={14} className="text-electric animate-pulse" />
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-electric bg-electric/10 px-2.5 py-0.5 rounded-full">
                    {banner.badge_text}
                  </span>
                </div>
              )}
              <h3 className="text-lg sm:text-xl font-extrabold text-primary-foreground mb-1 leading-tight">
                {banner.title}
              </h3>
              {banner.description && (
                <p className="text-primary-foreground/60 text-xs sm:text-sm font-medium">
                  {banner.description}
                </p>
              )}
            </div>
          </div>

          {banner.cta_url && banner.cta_text && (
            <div className="relative z-10 shrink-0">
              <a
                href={banner.cta_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-electric px-6 py-3 text-sm font-bold text-accent-foreground hover:bg-electric-light transition-all hover:shadow-[0_0_25px_hsl(217_91%_60%/0.35)] hover:scale-105 active:scale-100 whitespace-nowrap"
              >
                {banner.cta_text} <ArrowRight size={14} />
              </a>
            </div>
          )}
        </div>
      </div>
    </ScrollReveal>
  );
};

export default BannerAd;
