import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { ChevronLeft, ChevronRight, Send, Music, Building2, Users, Mic2, Sparkles } from "lucide-react";

const slides = [
  {
    icon: Music,
    tag: "#SaatMusik",
    title: "Punya Band atau Proyek Musik?",
    description: "Ceritakan perjalanan musikmu ke dunia lewat profil digital yang autentik. Gratis konsultasi!",
  },
  {
    icon: Building2,
    tag: "#SaatnyaKamuTau",
    title: "Instansi atau Organisasi?",
    description: "Bangun citra profesional instansi, yayasan, atau lembaga kamu dengan profil digital yang informatif.",
  },
  {
    icon: Mic2,
    tag: "#Saat",
    title: "Personal Brand Kamu?",
    description: "Kreator, influencer, public figure — tampilkan siapa kamu ke dunia dengan cara yang memorable.",
  },
  {
    icon: Users,
    tag: "#SaatnyaKamuTau",
    title: "Komunitas Kamu?",
    description: "Dokumentasikan perjalanan, pencapaian, dan cerita komunitasmu secara digital.",
  },
];

const ProfilingBanner = () => {
  const [active, setActive] = useState(0);
  const prev = () => setActive((p) => (p === 0 ? slides.length - 1 : p - 1));
  const next = () => setActive((p) => (p === slides.length - 1 ? 0 : p + 1));

  const current = slides[active];
  const Icon = current.icon;

  const waText = encodeURIComponent(
    `Halo Saat! Saya tertarik untuk dibuatkan profil digital. Kategori: ${current.title.replace("?", "")}`
  );

  return (
    <ScrollReveal className="lg:w-[380px] shrink-0" variant="fade">
      <div className="relative rounded-2xl overflow-hidden bg-navy p-7 h-full min-h-[400px] flex flex-col justify-between transition-all duration-500">
        {/* Dot pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }} />

        {/* Geometric accents */}
        <div className="absolute top-4 right-4 w-14 h-14 border border-electric/15 rounded-xl rotate-12" />
        <div className="absolute bottom-8 left-4 w-10 h-10 border border-electric/10 rounded-full" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-11 h-11 rounded-xl bg-electric/15 flex items-center justify-center border border-electric/20">
              <Icon size={22} className="text-electric" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-electric bg-electric/10 px-3 py-1 rounded-full">
              {current.tag}
            </span>
          </div>

          <div className="flex items-center gap-1.5 mb-2">
            <Sparkles size={14} className="text-electric" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-electric">Submit Profil Kamu</span>
          </div>

          <h3 className="text-xl font-extrabold text-primary-foreground mb-2 leading-tight">{current.title}</h3>
          <p className="text-primary-foreground/60 text-sm leading-relaxed mb-5">{current.description}</p>

          <a
            href={`https://wa.me/6285117688118?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-electric px-5 py-2.5 text-sm font-bold text-white hover:bg-electric-light transition-all hover:shadow-[0_0_25px_hsl(217_91%_60%/0.35)] hover:scale-105 active:scale-100"
          >
            <Send size={14} /> Hubungi Kami
          </a>
        </div>

        {/* Navigation */}
        <div className="relative z-10 flex items-center justify-between mt-5">
          <div className="flex gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-1.5 rounded-full transition-all ${i === active ? "w-6 bg-electric" : "w-1.5 bg-primary-foreground/30"}`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={prev} className="w-8 h-8 rounded-full bg-electric/15 flex items-center justify-center text-primary-foreground hover:bg-electric/25 transition-colors border border-electric/10">
              <ChevronLeft size={16} />
            </button>
            <button onClick={next} className="w-8 h-8 rounded-full bg-electric/15 flex items-center justify-center text-primary-foreground hover:bg-electric/25 transition-colors border border-electric/10">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
};

export default ProfilingBanner;
