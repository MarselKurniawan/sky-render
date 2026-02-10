import ScrollReveal from "@/components/ScrollReveal";
import { motion } from "framer-motion";

const CtaSection = () => {
  return (
    <section id="cta" className="py-24">
      <div className="container mx-auto px-6">
        <ScrollReveal variant="scale">
          <div className="relative rounded-3xl gradient-navy overflow-hidden px-8 py-20 text-center">
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-electric/20 blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-electric/10 blur-[80px]" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4 leading-tight">
                Ready to Scale Your Digital Presence?
              </h2>
              <p className="text-primary-foreground/70 mb-10 text-lg">
                Let's build something extraordinary together.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="#"
                  className="rounded-xl bg-primary-foreground px-8 py-3.5 text-sm font-semibold text-primary hover:bg-primary-foreground/90 transition-all hover:shadow-elevated"
                >
                  Start Your Project
                </a>
                <a
                  href="#"
                  className="rounded-xl border-2 border-primary-foreground/30 px-8 py-3.5 text-sm font-semibold text-primary-foreground hover:border-primary-foreground/60 transition-all"
                >
                  Request Quotation
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CtaSection;
