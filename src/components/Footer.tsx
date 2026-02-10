import { Twitter, Linkedin, Instagram, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border py-16 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h3 className="text-xl font-bold text-primary mb-3">
              NEXAGEN<span className="text-electric">.</span>
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A Web3 creative agency building next-generation digital experiences for forward-thinking brands.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-primary mb-4 text-sm">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#services" className="hover:text-electric transition-colors">Web Development</a></li>
              <li><a href="#services" className="hover:text-electric transition-colors">Branding</a></li>
              <li><a href="#services" className="hover:text-electric transition-colors">Digital Campaigns</a></li>
              <li><a href="#services" className="hover:text-electric transition-colors">SEO Optimization</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-primary mb-4 text-sm">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-electric transition-colors">About Us</a></li>
              <li><a href="#portfolio" className="hover:text-electric transition-colors">Portfolio</a></li>
              <li><a href="#process" className="hover:text-electric transition-colors">Process</a></li>
              <li><a href="#cta" className="hover:text-electric transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-primary mb-4 text-sm">Connect</h4>
            <div className="flex gap-3">
              {[Twitter, Linkedin, Instagram, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-electric hover:text-accent-foreground transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-4">hello@nexagen.agency</p>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center text-xs text-muted-foreground">
          © 2026 NEXAGEN. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
