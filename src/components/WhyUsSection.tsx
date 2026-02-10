import ScrollReveal from "@/components/ScrollReveal";
import { Sparkles, Rocket, BarChart3, Users } from "lucide-react";

const reasons = [
  {
    icon: Sparkles,
    title: "Kreatif & Strategis",
    description: "Setiap project dimulai dengan riset mendalam dan pendekatan kreatif yang menghasilkan output yang meaningful dan berdampak.",
    highlight: "Research-driven",
  },
  {
    icon: Rocket,
    title: "Eksekusi Cepat & Berkualitas",
    description: "Tim kami bekerja dengan workflow yang efisien sehingga project selesai tepat waktu tanpa mengorbankan kualitas.",
    highlight: "Fast delivery",
  },
  {
    icon: BarChart3,
    title: "Solusi yang Scalable",
    description: "Solusi yang kami buat dirancang untuk tumbuh bersama bisnis kamu, dari startup hingga enterprise level.",
    highlight: "Growth-ready",
  },
  {
    icon: Users,
    title: "Partner Jangka Panjang",
    description: "Kami bukan cuma vendor — kami partner digital yang ikut invest di kesuksesan jangka panjang brand kamu.",
    highlight: "Trusted partner",
  },
];

const WhyUsSection = () => {
  return (
    <section id="why-us" className="py-24 bg-muted/50">
      <div className="container mx-auto px-6">
        <ScrollReveal className="text-center mb-16">
          <span className="text-sm font-semibold text-electric uppercase tracking-wider">Kenapa Pilih Kami</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mt-3">Yang Bikin Kami Beda</h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">Kami menggabungkan strategi, kreativitas, dan teknologi untuk memberikan hasil terbaik.</p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, i) => (
            <ScrollReveal key={reason.title} delay={i * 0.12} variant="fade-up">
              <div className="relative bg-card rounded-2xl p-8 shadow-soft hover:shadow-elevated hover:glow-blue transition-all duration-300 text-center h-full group">
                <div className="absolute top-4 right-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-electric/60 bg-electric/10 px-2.5 py-1 rounded-full">
                    {reason.highlight}
                  </span>
                </div>
                <div className="mx-auto mb-5 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-electric/10 text-electric group-hover:bg-electric group-hover:text-accent-foreground transition-colors duration-300">
                  <reason.icon size={28} />
                </div>
                <h3 className="font-bold text-primary mb-2">{reason.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{reason.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
