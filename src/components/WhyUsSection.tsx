import ScrollReveal from "@/components/ScrollReveal";
import { Lightbulb, Boxes, TrendingUp, Handshake } from "lucide-react";

const reasons = [
  { icon: Lightbulb, title: "Strategic & Creative-Driven", description: "Every project starts with deep research and creative thinking to deliver meaningful results." },
  { icon: Boxes, title: "Web3-Ready Digital Mindset", description: "We stay ahead with cutting-edge Web3 technologies and decentralized approaches." },
  { icon: TrendingUp, title: "Scalable Growth Solutions", description: "Our solutions are built to scale with your business, from startup to enterprise." },
  { icon: Handshake, title: "Long-Term Digital Partnership", description: "We're not just vendors — we're partners invested in your long-term digital success." },
];

const WhyUsSection = () => {
  return (
    <section id="why-us" className="py-24 bg-muted/50">
      <div className="container mx-auto px-6">
        <ScrollReveal className="text-center mb-16">
          <span className="text-sm font-semibold text-electric uppercase tracking-wider">Why Choose Us</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mt-3">Built Different</h2>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, i) => (
            <ScrollReveal key={reason.title} delay={i * 0.12} variant="fade-up">
              <div className="text-center">
                <div className="mx-auto mb-5 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-electric/10 text-electric">
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
