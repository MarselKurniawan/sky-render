import ScrollReveal from "@/components/ScrollReveal";

const projects = [
  { title: "DeFi Dashboard", category: "Web Development", metric: "+180% User Engagement", gradient: "from-electric/80 to-navy" },
  { title: "NeoVerse Branding", category: "Branding & Identity", metric: "50K+ Social Impressions", gradient: "from-navy to-electric/60" },
  { title: "CryptoLaunch Campaign", category: "Digital Campaign", metric: "3x Conversion Rate", gradient: "from-electric/60 to-navy/90" },
  { title: "MetaStudio Platform", category: "System Development", metric: "99.9% Uptime", gradient: "from-navy/80 to-electric" },
  { title: "BlockBrand Content", category: "Content Production", metric: "1M+ Video Views", gradient: "from-electric to-navy/70" },
  { title: "ChainSocial Growth", category: "Social Media", metric: "+400% Followers", gradient: "from-navy to-electric/70" },
];

const PortfolioSection = () => {
  return (
    <section id="portfolio" className="py-24">
      <div className="container mx-auto px-6">
        <ScrollReveal className="text-center mb-16">
          <span className="text-sm font-semibold text-electric uppercase tracking-wider">Our Work</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mt-3">Portfolio & Case Studies</h2>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ScrollReveal key={project.title} delay={i * 0.08} variant="scale">
              <div className="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer">
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} />
                <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/60 transition-colors duration-500" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-primary-foreground opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  <span className="text-xs font-semibold uppercase tracking-wider text-electric-light mb-1">{project.category}</span>
                  <h3 className="text-xl font-bold mb-1">{project.title}</h3>
                  <p className="text-sm text-primary-foreground/80">{project.metric}</p>
                </div>
                <div className="absolute inset-0 flex items-center justify-center group-hover:opacity-0 transition-opacity duration-300">
                  <h3 className="text-xl font-bold text-primary-foreground">{project.title}</h3>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
