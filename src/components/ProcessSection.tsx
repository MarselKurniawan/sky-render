import ScrollReveal from "@/components/ScrollReveal";
import { SearchCheck, Target, Rocket, BarChart3 } from "lucide-react";

const steps = [
  { icon: SearchCheck, number: "01", title: "Discovery & Research", description: "Understanding your brand, market, and goals through deep analysis." },
  { icon: Target, number: "02", title: "Strategy & Planning", description: "Crafting a tailored roadmap aligned with your business objectives." },
  { icon: Rocket, number: "03", title: "Creative Execution", description: "Bringing strategy to life with world-class design and development." },
  { icon: BarChart3, number: "04", title: "Optimization & Growth", description: "Continuous improvement driven by data and performance insights." },
];

const ProcessSection = () => {
  return (
    <section id="process" className="py-24 bg-muted/50">
      <div className="container mx-auto px-6">
        <ScrollReveal className="text-center mb-16">
          <span className="text-sm font-semibold text-electric uppercase tracking-wider">How We Work</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mt-3">Our Process</h2>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <ScrollReveal key={step.title} delay={i * 0.15} variant="fade-up">
              <div className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(50%+32px)] w-[calc(100%-64px)] h-px bg-border" />
                )}
                <div className="text-center">
                  <div className="relative mx-auto mb-4 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-card shadow-soft">
                    <step.icon size={24} className="text-electric" />
                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="font-bold text-primary mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
