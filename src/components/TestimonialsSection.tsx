import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { motion } from "framer-motion";

const testimonials = [
  { name: "Andi Wijaya", role: "CEO, TechNusa", text: "Saat. benar-benar mengubah kehadiran digital kami. Keahlian dan visi kreatif mereka membantu kami tampil beda di pasar yang kompetitif. Hasil yang luar biasa." },
  { name: "Rina Sari", role: "Founder, BrandLokal", text: "Bekerja dengan tim Saat. adalah game-changer. Mereka menghasilkan identitas brand yang stunning dan kampanye yang menaikkan konversi kami 3x lipat." },
  { name: "Budi Santoso", role: "CMO, StartupIndo", text: "Profesional, kreatif, dan benar-benar strategis. Mereka tidak hanya mengeksekusi — mereka berpikir mendalam tentang apa yang akan menggerakkan bisnis kamu." },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 gradient-navy opacity-[0.03]" />
      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal className="text-center mb-16">
          <span className="text-sm font-semibold text-electric uppercase tracking-wider">Testimoni</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mt-3">Apa Kata Klien Kami</h2>
        </ScrollReveal>

        <ScrollReveal variant="fade" className="max-w-2xl mx-auto text-center">
          <Quote size={40} className="mx-auto mb-6 text-electric/30" />
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-lg text-primary leading-relaxed mb-8 italic">
                "{testimonials[current].text}"
              </p>
              <p className="font-bold text-primary">{testimonials[current].name}</p>
              <p className="text-sm text-muted-foreground">{testimonials[current].role}</p>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-4 mt-10">
            <button onClick={prev} className="w-10 h-10 rounded-full border border-border hover:border-electric hover:text-electric flex items-center justify-center transition-colors text-muted-foreground" aria-label="Testimoni sebelumnya">
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-electric w-6" : "bg-border"}`} aria-label={`Ke testimoni ${i + 1}`} />
              ))}
            </div>
            <button onClick={next} className="w-10 h-10 rounded-full border border-border hover:border-electric hover:text-electric flex items-center justify-center transition-colors text-muted-foreground" aria-label="Testimoni selanjutnya">
              <ChevronRight size={18} />
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default TestimonialsSection;
