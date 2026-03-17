import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Twitter, Linkedin, Instagram, Github, Mail, Youtube, Facebook, Music2 } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import logoSaat from "@/assets/logo-saat.png";

const TikTokIcon = ({ size = 16, ...props }: React.SVGProps<SVGSVGElement> & { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true" {...props}>
    <path d="M14.5 3c.3 2 1.6 3.8 3.5 4.8 1 .6 2.1.9 3.1.9v3.1c-1.4 0-2.7-.3-4-.9-.9-.4-1.7-1-2.4-1.7v6.4c0 1.2-.3 2.3-.9 3.3a6.4 6.4 0 0 1-5.5 3.1A6.3 6.3 0 0 1 2 15.7a6.3 6.3 0 0 1 8.7-5.8V13a3.3 3.3 0 0 0-1.7-.5A3.2 3.2 0 0 0 5.8 16c.2 1.7 1.6 2.9 3.3 2.9 1.8 0 3.2-1.5 3.2-3.3V3h2.2Z" />
  </svg>
);

const ICON_MAP: Record<string, React.ElementType> = {
  instagram: Instagram,
  twitter: Twitter,
  linkedin: Linkedin,
  github: Github,
  youtube: Youtube,
  facebook: Facebook,
  tiktok: TikTokIcon,
  email: Mail,
};

const SOCIAL_LABELS: Record<string, string> = {
  instagram: "Instagram",
  twitter: "Twitter / X",
  linkedin: "LinkedIn",
  github: "GitHub",
  youtube: "YouTube",
  facebook: "Facebook",
  tiktok: "TikTok",
  email: "Email",
};

const SOCIAL_ORDER: Record<string, number> = {
  instagram: 1,
  tiktok: 2,
  twitter: 3,
  linkedin: 4,
  youtube: 5,
  facebook: 6,
  github: 7,
  email: 8,
};

interface SocialLink {
  key: string;
  url: string;
  icon: React.ElementType;
  label: string;
}

const getPlatformKey = (key: string) => key.replace(/^footer_/, "").replace(/_\d+$/, "");

const getSocialLabel = (settingKey: string, platform: string) => {
  const suffix = settingKey.match(/_(\d+)$/)?.[1];
  const base = SOCIAL_LABELS[platform] ?? platform;
  return suffix ? `${base} ${suffix}` : base;
};

const Footer = () => {
  const [socials, setSocials] = useState<SocialLink[]>([]);
  const [email, setEmail] = useState("hello@saat.agency");
  const [waNumber, setWaNumber] = useState("6285117688118");

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("site_settings")
        .select("key, value")
        .like("key", "footer_%")
        .order("key");

      if (!data) return;

      const links: SocialLink[] = [];
      data.forEach((s) => {
        if (!s.value) return;

        if (s.key === "footer_email") {
          setEmail(s.value);
          return;
        }

        if (s.key === "footer_whatsapp") {
          setWaNumber(s.value);
          return;
        }

        const platform = getPlatformKey(s.key);
        const Icon = ICON_MAP[platform];
        if (!Icon) return;

        links.push({
          key: s.key,
          url: s.value,
          icon: Icon,
          label: getSocialLabel(s.key, platform),
        });
      });

      links.sort((a, b) => {
        const orderA = SOCIAL_ORDER[getPlatformKey(a.key)] ?? 999;
        const orderB = SOCIAL_ORDER[getPlatformKey(b.key)] ?? 999;
        return orderA - orderB || a.label.localeCompare(b.label);
      });

      setSocials(links);
    };

    fetch();
  }, []);

  return (
    <footer className="border-t border-border py-16 bg-muted/30">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <img src={logoSaat} alt="Saat." className="h-8 mb-3" width={106} height={32} loading="lazy" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                Creative digital agency yang membantu brand berkembang melalui strategi digital, eksekusi kreatif, dan teknologi yang scalable.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-4 text-sm">Layanan</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#services" className="hover:text-electric transition-colors">Pengembangan Web</a></li>
                <li><a href="#services" className="hover:text-electric transition-colors">Branding</a></li>
                <li><a href="#services" className="hover:text-electric transition-colors">Kampanye Digital</a></li>
                <li><a href="#services" className="hover:text-electric transition-colors">Optimasi SEO</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-4 text-sm">Perusahaan</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-electric transition-colors">Tentang Kami</a></li>
                <li><a href="#portfolio" className="hover:text-electric transition-colors">Portfolio</a></li>
                <li><a href="#process" className="hover:text-electric transition-colors">Proses</a></li>
                <li><a href="#cta" className="hover:text-electric transition-colors">Kontak</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-4 text-sm">Hubungi Kami</h4>
              {socials.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {socials.map((s) => {
                    const Icon = s.icon;
                    return (
                      <a
                        key={s.key}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-electric hover:text-accent-foreground transition-colors"
                        title={s.label}
                        aria-label={s.label}
                      >
                        <Icon size={16} />
                      </a>
                    );
                  })}
                </div>
              )}
              <p className="text-sm text-muted-foreground mt-4">{email}</p>
              <a href={`https://wa.me/${waNumber}`} target="_blank" rel="noopener noreferrer" className="text-sm text-electric hover:underline mt-1 inline-block">
                WhatsApp: {waNumber.replace(/^62/, "0").replace(/(\d{4})(\d{4})(\d+)/, "$1-$2-$3")}
              </a>
            </div>
          </div>

          <div className="border-t border-border mt-12 pt-8 text-center text-xs text-muted-foreground">
            © 2026 Saat. Semua hak dilindungi.
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
};

export default Footer;
