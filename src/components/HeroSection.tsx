import { motion } from "framer-motion";
import heroOrb from "@/assets/hero-orb.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-electric/5" />
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full bg-electric/5 blur-[120px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-electric/10 px-4 py-1.5 mb-6">
              <div className="h-2 w-2 rounded-full bg-electric animate-pulse-glow" />
              <span className="text-xs font-semibold text-electric uppercase tracking-wider">Web3 Creative Agency</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-primary mb-6">
              Building Digital Presence for the{" "}
              <span className="gradient-text">Next-Gen Brand</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed">
              We help brands grow through digital strategy, creative execution, and scalable technology.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#portfolio"
                className="rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground hover:bg-navy-light transition-all hover:shadow-elevated"
              >
                View Portfolio
              </a>
              <a
                href="#cta"
                className="rounded-xl border-2 border-primary/20 bg-card px-7 py-3.5 text-sm font-semibold text-primary hover:border-electric hover:text-electric transition-all"
              >
                Get Quotation
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <img
                src={heroOrb}
                alt="Abstract 3D gradient orb"
                className="w-[350px] sm:w-[450px] lg:w-[500px] animate-float drop-shadow-2xl"
              />
              <div className="absolute inset-0 rounded-full bg-electric/10 blur-[80px] animate-pulse-glow" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
