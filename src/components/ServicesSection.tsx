import ScrollReveal from "@/components/ScrollReveal";
import { Globe, Palette, Megaphone, Share2, Search, Camera, Film, FileText } from "lucide-react";

const services = [
  { icon: Globe, title: "Website & System Development", description: "Designing and developing high-performance websites and custom systems tailored to business needs, focusing on scalability, speed, and user experience." },
  { icon: Palette, title: "Branding & Visual Identity", description: "Building strong brand identity through logo, visual system, tone, and design consistency to ensure brands stand out in the digital ecosystem." },
  { icon: Megaphone, title: "Digital Campaign Strategy", description: "Creating data-driven digital campaigns that connect brands with the right audience across digital platforms to increase reach and conversions." },
  { icon: Share2, title: "Social Media Management", description: "Managing and optimizing social media presence through content planning, creative execution, and performance analysis." },
  { icon: Search, title: "SEO Optimization", description: "Improving website visibility and search engine ranking through on-page optimization, technical SEO, and strategic keyword targeting." },
  { icon: Camera, title: "Content Production", description: "Producing high-quality photo and video content for branding, campaigns, and social media with a strong storytelling approach." },
  { icon: Film, title: "Company Profile Video", description: "Creating professional company profile videos to communicate brand story, values, and credibility in a compelling visual format." },
  { icon: FileText, title: "White Label Content", description: "Providing ready-to-use digital content solutions for agencies and businesses that want to deliver content under their own brand." },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-electric/[0.02] to-transparent" />
      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal className="text-center mb-16">
          <span className="text-sm font-semibold text-electric uppercase tracking-wider">What We Do</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mt-3">Our Services</h2>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 0.08} variant="scale">
              <div className="group rounded-2xl bg-card p-6 shadow-soft hover:shadow-elevated hover:glow-blue transition-all duration-300 cursor-default h-full">
                <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-electric/10 text-electric group-hover:bg-electric group-hover:text-accent-foreground transition-colors duration-300">
                  <service.icon size={22} />
                </div>
                <h3 className="font-bold text-primary mb-2 text-sm">{service.title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">{service.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
