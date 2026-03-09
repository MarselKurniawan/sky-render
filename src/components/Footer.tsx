import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Twitter, Linkedin, Instagram, Github, Mail, Youtube, Facebook } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import logoSaat from "@/assets/logo-saat.png";

const ICON_MAP: Record<string, React.ElementType> = {
  instagram: Instagram,
  twitter: Twitter,
  linkedin: Linkedin,
  github: Github,
  youtube: Youtube,
  facebook: Facebook,
  email: Mail,
};

interface SocialLink {
  key: string;
  url: string;
  icon: React.ElementType;
  label: string;
}

const Footer = () => {
  const [socials, setSocials] = useState<SocialLink[]>([]);
  const [email, setEmail] = useState("hello@saat.agency");
  const [waNumber, setWaNumber] = useState("6285117688118");

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("site_settings")
        .select("key, value")
        .like("key", "footer_%");

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
        const platform = s.key.replace("footer_", "");
        const Icon = ICON_MAP[platform];
        if (Icon) {
          links.push({ key: platform, url: s.value, icon: Icon, label: platform });
        }
      });
      if (links.length > 0) setSocials(links);
    };
    fetch();
  }, []);

  // Default socials if none configured
  const displaySocials = socials.length > 0 ? socials : [
    { key: "instagram", url: "#", icon: Instagram, label: "Instagram" },
    { key: "twitter", url: "#", icon: Twitter, label: "Twitter" },
    { key: "linkedin", url: "#", icon: Linkedin, label: "LinkedIn" },
  ];

  return (
    <footer className="border-t border-border py-16 bg-muted/30">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <img src={logoSaat} alt="Saat." className="h-8 mb-3" />
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
              <div className="flex gap-3">
                {displaySocials.map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.key}
                      href={s.key === "email" ? `mailto:${s.url}` : s.url}
                      target={s.key === "email" ? undefined : "_blank"}
                      rel={s.key === "email" ? undefined : "noopener noreferrer"}
                      className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-electric hover:text-accent-foreground transition-colors"
                      title={s.label}
                    >
                      <Icon size={16} />
                    </a>
                  );
                })}
              </div>
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
