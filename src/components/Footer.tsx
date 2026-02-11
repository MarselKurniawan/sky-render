import { Twitter, Linkedin, Instagram, Github } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import logoSaat from "@/assets/logo-saat.png";

const Footer = () => {
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
                {[Twitter, Linkedin, Instagram, Github].map((Icon, i) => (
                  <a key={i} href="#" className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-electric hover:text-accent-foreground transition-colors">
                    <Icon size={16} />
                  </a>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-4">hello@saat.agency</p>
              <a href="https://wa.me/6285117688118" target="_blank" rel="noopener noreferrer" className="text-sm text-electric hover:underline mt-1 inline-block">WhatsApp: 0851-1768-8118</a>
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
