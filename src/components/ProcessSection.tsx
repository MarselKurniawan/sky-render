import ScrollReveal from "@/components/ScrollReveal";
import { SearchCheck, Target, Rocket, BarChart3 } from "lucide-react";

const steps = [
  { icon: SearchCheck, number: "01", title: "Riset & Analisis", description: "Memahami brand, pasar, dan tujuanmu lewat analisis mendalam." },
  { icon: Target, number: "02", title: "Strategi & Perencanaan", description: "Menyusun roadmap yang sesuai dengan tujuan bisnismu." },
  { icon: Rocket, number: "03", title: "Eksekusi Kreatif", description: "Mewujudkan strategi jadi desain dan pengembangan berkualitas." },
  { icon: BarChart3, number: "04", title: "Optimasi & Pertumbuhan", description: "Peningkatan berkelanjutan berbasis data dan insight performa." },
];

const ProcessSection = () => {
  return (
    <section id="process" className="py-24 bg-background" aria-labelledby="process-heading">
      <div className="container mx-auto px-6">
        <ScrollReveal className="mb-14 max-w-3xl">
          <span className="text-xs font-bold text-accent uppercase tracking-widest">/ Cara Kerja Kami</span>
          <h2
            id="process-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary mt-3 leading-[1]"
          >
            Empat langkah <span className="italic font-serif">presisi</span>.
          </h2>
        </ScrollReveal>

        <div className="divide-y-2 divide-primary border-y-2 border-primary">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <ScrollReveal key={step.title} delay={i * 0.08} variant="fade-up">
                <div className="grid grid-cols-12 gap-4 items-center py-8 px-2 group hover:bg-muted/50 transition-colors">
                  <div className="col-span-2 sm:col-span-1 text-3xl sm:text-5xl font-extrabold text-primary/30 group-hover:text-accent transition-colors">
                    {step.number}
                  </div>
                  <div className="col-span-10 sm:col-span-4">
                    <h3 className="text-xl sm:text-2xl font-extrabold text-primary">{step.title}</h3>
                  </div>
                  <div className="col-span-12 sm:col-span-6 text-muted-foreground text-sm sm:text-base leading-relaxed">
                    {step.description}
                  </div>
                  <div className="hidden sm:flex col-span-1 justify-end">
                    <Icon size={28} className="text-primary/40 group-hover:text-accent transition-colors" />
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
