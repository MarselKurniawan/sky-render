import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { ChevronLeft, ChevronRight, Send, Music, Building2, Users, Mic2, Sparkles } from "lucide-react";

const slides = [
  {
    icon: Music,
    tag: "#SaatMusik",
    title: "Punya Band atau Proyek Musik?",
    description: "Ceritakan perjalanan musikmu ke dunia lewat profil digital yang autentik. Gratis konsultasi!",
    gradient: "from-emerald-600 via-teal-500 to-cyan-400",
    accent: "text-cyan-200",
    badgeBg: "bg-emerald-900/40",
  },
  {
    icon: Building2,
    tag: "#SaatnyaKamuTau",
    title: "Instansi atau Organisasi?",
    description: "Bangun citra profesional instansi, yayasan, atau lembaga kamu dengan profil digital yang informatif.",
    gradient: "from-violet-700 via-purple-600 to-fuchsia-500",
    accent: "text-fuchsia-200",
    badgeBg: "bg-violet-900/40",
  },
  {
    icon: Mic2,
    tag: "#Saat",
    title: "Personal Brand Kamu?",
    description: "Kreator, influencer, public figure — tampilkan siapa kamu ke dunia dengan cara yang memorable.",
    gradient: "from-orange-600 via-amber-500 to-yellow-400",
    accent: "text-yellow-200",
    badgeBg: "bg-orange-900/40",
  },
  {
    icon: Users,
    tag: "#SaatnyaKamuTau",
    title: "Komunitas Kamu?",
    description: "Dokumentasikan perjalanan, pencapaian, dan cerita komunitasmu secara digital.",
    gradient: "from-sky-600 via-blue-500 to-indigo-500",
    accent: "text-sky-200",
    badgeBg: "bg-sky-900/40",
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
      <div className={`relative rounded-2xl overflow-hidden bg-gradient-to-br ${current.gradient} p-7 h-full min-h-[400px] flex flex-col justify-between transition-all duration-500`}>
        {/* Glow effects */}
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/15 blur-[60px]" />
        <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white/10 blur-[40px]" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center border border-white/20">
              <Icon size={22} className="text-white" />
            </div>
            <span className={`text-[10px] font-bold uppercase tracking-widest ${current.accent} ${current.badgeBg} px-3 py-1 rounded-full backdrop-blur`}>
              {current.tag}
            </span>
          </div>

          <div className="flex items-center gap-1.5 mb-2">
            <Sparkles size={14} className={current.accent} />
            <span className={`text-[10px] font-bold uppercase tracking-widest ${current.accent}`}>Submit Profil Kamu</span>
          </div>

          <h3 className="text-xl font-extrabold text-white mb-2 leading-tight drop-shadow-sm">{current.title}</h3>
          <p className="text-white/80 text-sm leading-relaxed mb-5">{current.description}</p>

          {/* CTA Button */}
          <a
            href={`https://wa.me/6285117688118?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-gray-900 hover:bg-white/90 transition-all hover:shadow-xl hover:scale-105 active:scale-100 shadow-lg"
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
                className={`h-1.5 rounded-full transition-all ${i === active ? "w-6 bg-white" : "w-1.5 bg-white/40"}`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={prev} className="w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-white/30 transition-colors border border-white/10">
              <ChevronLeft size={16} />
            </button>
            <button onClick={next} className="w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-white/30 transition-colors border border-white/10">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
};

export default ProfilingBanner;
