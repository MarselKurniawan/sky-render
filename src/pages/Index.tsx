import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProfilingSection from "@/components/ProfilingSection";
import ServicesSection from "@/components/ServicesSection";
import WhyUsSection from "@/components/WhyUsSection";
import PortfolioSection from "@/components/PortfolioSection";
import ProcessSection from "@/components/ProcessSection";
import BlogSection from "@/components/BlogSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import HiddenKeywords from "@/components/HiddenKeywords";
import { useSeo } from "@/hooks/useSeo";
import { useTrackingScripts } from "@/hooks/useTrackingScripts";

const Index = () => {
  useSeo("/");
  useTrackingScripts();

  return (
    <div className="min-h-screen bg-background">
      <HiddenKeywords />
      <Navbar />
      <HeroSection />
      <ProfilingSection />
      <ServicesSection />
      <WhyUsSection />
      <PortfolioSection />
      <ProcessSection />
      <BlogSection />
      <TestimonialsSection />
      <CtaSection />
      <Footer />
    </div>
  );
};

export default Index;