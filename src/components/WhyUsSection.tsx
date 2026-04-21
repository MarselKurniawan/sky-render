import ScrollReveal from "@/components/ScrollReveal";
import { Sparkles, Rocket, BarChart3, Users } from "lucide-react";

const reasons = [
  {
    icon: Sparkles,
    title: "Kreatif & Strategis",
    description: "Setiap project dimulai dengan riset mendalam dan pendekatan kreatif yang menghasilkan output meaningful.",
    highlight: "Research-driven",
  },
  {
    icon: Rocket,
    title: "Eksekusi Cepat & Berkualitas",
    description: "Tim kami bekerja dengan workflow efisien sehingga project selesai tepat waktu tanpa mengorbankan kualitas.",
    highlight: "Fast delivery",
  },
  {
    icon: BarChart3,
    title: "Solusi yang Scalable",
    description: "Solusi yang kami buat dirancang untuk tumbuh bersama bisnismu, dari startup hingga enterprise.",
    highlight: "Growth-ready",
  },
  {
    icon: Users,
    title: "Partner Jangka Panjang",
    description: "Kami bukan cuma vendor — kami partner digital yang ikut invest di kesuksesan brand kamu.",
    highlight: "Trusted",
  },
];

const WhyUsSection = () => {
  return (
    <section id="why-us" className="py-24 block-navy rounded-t-[3rem]" aria-labelledby="why-us-heading">
      <div className="container mx-auto px-6">
        <ScrollReveal className="mb-14 max-w-3xl">
          <span className="text-xs font-bold text-lime uppercase tracking-widest">/ Kenapa Pilih Kami</span>
          <h2
            id="why-us-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mt-3 leading-[1] text-primary-foreground"
          >
            Yang bikin kami <span className="italic font-serif text-lime">beda</span>.
          </h2>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <ScrollReveal key={reason.title} delay={i * 0.1} variant="fade-up">
                <div className="relative rounded-3xl p-7 h-full bg-primary-foreground/5 border border-primary-foreground/10 hover:bg-primary-foreground/10 transition-colors">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-lime text-primary mb-6">
                    <Icon size={26} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-lime block mb-2">
                    {reason.highlight}
                  </span>
                  <h3 className="font-extrabold text-xl text-primary-foreground mb-2">{reason.title}</h3>
                  <p className="text-sm text-primary-foreground/70 leading-relaxed">{reason.description}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
