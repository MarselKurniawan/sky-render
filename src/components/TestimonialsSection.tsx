import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Alex Chen",
    role: "CEO, NeoVerse Labs",
    text: "NEXAGEN transformed our digital presence completely. Their Web3 expertise and creative vision helped us stand out in a crowded market. Exceptional results.",
  },
  {
    name: "Sarah Mitchell",
    role: "Founder, BlockBrand",
    text: "Working with the NEXAGEN team was a game-changer. They delivered a stunning brand identity and a campaign that tripled our conversions within months.",
  },
  {
    name: "David Park",
    role: "CMO, CryptoLaunch",
    text: "Professional, creative, and truly strategic. They don't just execute — they think deeply about what will move the needle for your business.",
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 gradient-navy opacity-[0.03]" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-electric uppercase tracking-wider">Testimonials</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mt-3">What Clients Say</h2>
        </motion.div>

        <div className="max-w-2xl mx-auto text-center">
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
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-border hover:border-electric hover:text-electric flex items-center justify-center transition-colors text-muted-foreground"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-electric w-6" : "bg-border"}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-border hover:border-electric hover:text-electric flex items-center justify-center transition-colors text-muted-foreground"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
