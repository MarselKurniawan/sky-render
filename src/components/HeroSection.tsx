import { motion } from "framer-motion";
import heroOrb from "@/assets/hero-orb.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-electric/5" />
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full bg-electric/5 blur-[120px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full bg-electric/10 px-4 py-1.5 mb-6"
            >
              <div className="h-2 w-2 rounded-full bg-electric animate-pulse-glow" />
              <span className="text-xs font-semibold text-electric uppercase tracking-wider">Creative Digital Agency</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-primary mb-6"
            >
              Bangun Kehadiran Digital untuk{" "}
              <span className="gradient-text">Brand Masa Depan</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed"
            >
              Kami membantu brand tumbuh melalui strategi digital, eksekusi kreatif, dan teknologi yang scalable.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#portfolio"
                className="rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground hover:bg-navy-light transition-all hover:shadow-elevated"
              >
                Lihat Portfolio
              </a>
              <a
                href="https://wa.me/6285117688118?text=Halo%20Saat.%20Saya%20ingin%20request%20quotation%20untuk%20project%20saya."
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border-2 border-primary/20 bg-card px-7 py-3.5 text-sm font-semibold text-primary hover:border-electric hover:text-electric transition-all"
              >
                Minta Penawaran
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.4 }}
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
