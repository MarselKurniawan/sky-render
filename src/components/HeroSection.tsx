import { motion } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative pt-28 pb-16 sm:pt-32 sm:pb-20 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Top label row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-primary px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
            <span className="h-2 w-2 rounded-full bg-accent" />
            Creative Digital Agency · Semarang
          </span>
        </motion.div>

        {/* Headline — massive editorial */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-[clamp(2.5rem,8vw,6.5rem)] font-extrabold leading-[0.95] tracking-tight text-primary"
        >
          Bangun brand
          <br />
          yang <span className="italic font-serif">tak terlupakan</span>
          <span className="inline-block align-middle ml-3 w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-accent" />
        </motion.h1>

        {/* Sub row: description + CTAs */}
        <div className="grid lg:grid-cols-12 gap-8 mt-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-5 text-lg text-muted-foreground leading-relaxed"
          >
            Kami membantu brand tumbuh lewat strategi digital yang tajam,
            eksekusi kreatif yang berani, dan teknologi yang scalable.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="lg:col-span-7 flex flex-wrap items-center gap-3 lg:justify-end"
          >
            <a
              href="#portfolio"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-bold text-primary-foreground hover:bg-accent transition-colors"
            >
              Lihat Portfolio
              <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform" />
            </a>
            <a
              href="https://wa.me/6285117688118?text=Halo%20Saat.%20Saya%20ingin%20request%20quotation%20untuk%20project%20saya."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-primary bg-background px-7 py-4 text-sm font-bold text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Minta Penawaran
            </a>
          </motion.div>
        </div>

        {/* Bottom solid color blocks row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-16"
        >
          <div className="block-navy rounded-3xl p-6 aspect-[4/3] flex flex-col justify-between">
            <Star size={28} fill="currentColor" />
            <div>
              <div className="text-4xl font-extrabold">120+</div>
              <div className="text-sm opacity-70">Project Selesai</div>
            </div>
          </div>
          <div className="block-electric rounded-3xl p-6 aspect-[4/3] flex flex-col justify-between">
            <div className="text-xs font-bold uppercase tracking-widest opacity-80">Sejak</div>
            <div className="text-5xl font-extrabold">2021</div>
          </div>
          <div className="rounded-3xl p-6 aspect-[4/3] flex flex-col justify-between bg-card border-2 border-primary">
            <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Klien Aktif</div>
            <div>
              <div className="text-4xl font-extrabold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Brand & UMKM</div>
            </div>
          </div>
          <div className="block-lime rounded-3xl p-6 aspect-[4/3] flex flex-col justify-between">
            <div className="text-xs font-bold uppercase tracking-widest">Layanan</div>
            <div className="text-5xl font-extrabold">8</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
