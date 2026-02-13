import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import logoSaat from "@/assets/logo-saat.png";
import { supabase } from "@/integrations/supabase/client";

interface ServiceItem {
  title: string;
  items: string[] | null;
  icon_name: string | null;
}

const navLinks = [
  { label: "Layanan", href: "#services", hasMega: true },
  { label: "Kenapa Kami", href: "#why-us" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Proses", href: "#process" },
  { label: "Blog", href: "#blog" },
  { label: "Testimoni", href: "#testimonials" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const megaRef = useRef<HTMLDivElement>(null);
  const megaTimeout = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const fetchServices = async () => {
      const { data } = await supabase
        .from("services")
        .select("title, items, icon_name")
        .eq("is_published", true)
        .order("display_order");
      if (data) setServices(data);
    };
    fetchServices();
  }, []);

  const handleMegaEnter = () => {
    clearTimeout(megaTimeout.current);
    setMegaOpen(true);
  };
  const handleMegaLeave = () => {
    megaTimeout.current = setTimeout(() => setMegaOpen(false), 200);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <a href="/">
          <img src={logoSaat} alt="Saat." className="h-8" />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            link.hasMega ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={handleMegaEnter}
                onMouseLeave={handleMegaLeave}
                ref={megaRef}
              >
                <a
                  href={link.href}
                  className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                  <ChevronDown size={14} className={`transition-transform ${megaOpen ? "rotate-180" : ""}`} />
                </a>

                <AnimatePresence>
                  {megaOpen && services.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[680px] rounded-2xl bg-card border border-border shadow-elevated p-6 z-50"
                    >
                      <div className="grid grid-cols-3 gap-5">
                        {services.map((svc) => (
                          <div key={svc.title}>
                            <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-2">
                              {svc.title}
                            </h4>
                            {svc.items && svc.items.length > 0 && (
                              <ul className="space-y-1">
                                {svc.items.map((item) => (
                                  <li key={item} className="text-xs text-muted-foreground hover:text-electric transition-colors cursor-default flex items-start gap-1.5">
                                    <span className="mt-1.5 w-1 h-1 rounded-full bg-electric shrink-0" />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="mt-5 pt-4 border-t border-border">
                        <a href="#services" className="text-xs font-semibold text-electric hover:underline">
                          Lihat Semua Layanan →
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            )
          )}
          <a
            href="#cta"
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-navy-light transition-colors"
          >
            Mulai Sekarang
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-primary"
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-border"
          >
            <div className="container mx-auto py-4 px-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#cta"
                onClick={() => setOpen(false)}
                className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground text-center"
              >
                Mulai Sekarang
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
