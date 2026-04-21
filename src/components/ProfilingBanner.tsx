import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { ChevronLeft, ChevronRight, Send, Music, Building2, Users, Mic2 } from "lucide-react";

const slides = [
  {
    icon: Music,
    tag: "#SaatMusik",
    title: "Punya band atau proyek musik?",
    description: "Ceritakan perjalanan musikmu ke dunia lewat profil digital yang autentik.",
    variant: "navy",
  },
  {
    icon: Building2,
    tag: "#SaatnyaKamuTau",
    title: "Instansi atau organisasi?",
    description: "Bangun citra profesional instansi, yayasan, atau lembaga dengan profil informatif.",
    variant: "lime",
  },
  {
    icon: Mic2,
    tag: "#Saat",
    title: "Personal brand kamu?",
    description: "Kreator, influencer, public figure — tampilkan siapa kamu dengan cara memorable.",
    variant: "electric",
  },
  {
    icon: Users,
    tag: "#SaatnyaKamuTau",
    title: "Komunitas kamu?",
    description: "Dokumentasikan perjalanan, pencapaian, dan cerita komunitasmu secara digital.",
    variant: "navy",
  },
];

const variantClass = (v: string) => {
  switch (v) {
    case "navy":
      return "block-navy";
    case "electric":
      return "block-electric";
    case "lime":
      return "block-lime";
    default:
      return "block-navy";
  }
};

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
      <div
        className={`relative rounded-3xl overflow-hidden p-7 h-full min-h-[420px] flex flex-col justify-between transition-all duration-500 ${variantClass(current.variant)}`}
      >
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-background/15 backdrop-blur-sm flex items-center justify-center">
              <Icon size={22} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest bg-background/15 backdrop-blur-sm px-3 py-1.5 rounded-full">
              {current.tag}
            </span>
          </div>

          <span className="text-[10px] font-bold uppercase tracking-widest opacity-70 block mb-3">
            / Submit Profil Kamu
          </span>

          <h3 className="text-3xl font-extrabold mb-3 leading-[1.05]">{current.title}</h3>
          <p className="text-sm leading-relaxed opacity-80 mb-6">{current.description}</p>

          <a
            href={`https://wa.me/6285117688118?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-background text-foreground px-6 py-3 text-sm font-bold hover:bg-foreground hover:text-background transition-colors"
          >
            <Send size={14} /> Hubungi Kami
          </a>
        </div>

        <div className="relative z-10 flex items-center justify-between mt-5">
          <div className="flex gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${i === active ? "w-6 bg-current opacity-100" : "w-1.5 bg-current opacity-30"}`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={prev}
              aria-label="Slide sebelumnya"
              className="w-9 h-9 rounded-full bg-background/15 backdrop-blur-sm flex items-center justify-center hover:bg-background/25 transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={next}
              aria-label="Slide selanjutnya"
              className="w-9 h-9 rounded-full bg-background/15 backdrop-blur-sm flex items-center justify-center hover:bg-background/25 transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
};

export default ProfilingBanner;
