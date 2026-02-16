import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { Check, Star, Crown, Phone } from "lucide-react";
import { useSeo } from "@/hooks/useSeo";

interface ServiceWithPrices {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  prices: {
    id: string;
    name: string;
    description: string | null;
    price: string;
    features: string[] | null;
    is_popular: boolean;
    display_order: number;
  }[];
}

const Pricelist = () => {
  useSeo("/pricelist");
  const [services, setServices] = useState<ServiceWithPrices[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("");

  useEffect(() => {
    const fetch = async () => {
      const { data: svcData } = await supabase
        .from("services")
        .select("id, title, slug, description")
        .eq("is_published", true)
        .order("display_order");

      if (!svcData) return;

      const { data: priceData } = await supabase
        .from("service_prices")
        .select("*")
        .order("display_order");

      const grouped: ServiceWithPrices[] = svcData.map((s) => ({
        ...s,
        prices: (priceData ?? []).filter((p) => p.service_id === s.id),
      })).filter(s => s.prices.length > 0);

      setServices(grouped);
      if (grouped.length > 0) setActiveTab(grouped[0].id);
      setLoading(false);
    };
    fetch();
  }, []);

  const activeService = services.find((s) => s.id === activeTab);

  const getRenewalPrice = (features: string[] | null) => {
    const renewal = features?.find((f) => f.match(/di tahun berikutnya/i));
    return renewal || null;
  };

  const getMainFeatures = (features: string[] | null) => {
    return features?.filter((f) => !f.match(/di tahun berikutnya/i)) ?? [];
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          <ScrollReveal className="text-center mb-12">
            <span className="text-sm font-semibold text-electric uppercase tracking-wider">Pricelist</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mt-3">
              Pilih Paket yang Cocok untuk Anda
            </h1>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Tim profesional kami akan bantu wujudkan website anda dengan memilih paket yang tepat. Konsultasi Gratis! hingga website anda tayang.
            </p>
          </ScrollReveal>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-electric border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <>
              {/* Tabs */}
              <div className="flex flex-wrap justify-center gap-2 mb-12">
                {services.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveTab(s.id)}
                    className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                      activeTab === s.id
                        ? "bg-primary text-primary-foreground shadow-elevated"
                        : "bg-card text-muted-foreground border border-border hover:border-electric/50 hover:text-primary"
                    }`}
                  >
                    {s.title}
                  </button>
                ))}
              </div>

              {/* Description */}
              {activeService?.description && (
                <p className="text-center text-muted-foreground mb-10 max-w-xl mx-auto text-sm">
                  {activeService.description}
                </p>
              )}

              {/* Price Cards */}
              {activeService && (
                <div className={`grid gap-6 max-w-6xl mx-auto ${
                  activeService.prices.length === 1 ? "max-w-md" :
                  activeService.prices.length === 2 ? "md:grid-cols-2 max-w-3xl" :
                  "md:grid-cols-2 lg:grid-cols-3"
                }`}>
                  {activeService.prices.map((pkg, i) => {
                    const renewal = getRenewalPrice(pkg.features);
                    const features = getMainFeatures(pkg.features);
                    const isCall = pkg.price.toLowerCase().includes("hubungi");

                    return (
                      <ScrollReveal key={pkg.id} delay={i * 0.1} variant="scale">
                        <div
                          className={`relative rounded-2xl p-6 h-full flex flex-col transition-all duration-300 ${
                            pkg.is_popular
                              ? "bg-primary text-primary-foreground shadow-elevated scale-[1.02] border-2 border-electric"
                              : "bg-card border border-border shadow-soft hover:shadow-elevated"
                          }`}
                        >
                          {/* Badge */}
                          {pkg.is_popular && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                              <span className="inline-flex items-center gap-1 bg-electric text-accent-foreground text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                                <Star size={12} className="fill-current" />
                                Most Popular
                              </span>
                            </div>
                          )}

                          {/* Header */}
                          <div className="mb-5">
                            <h3 className={`text-lg font-bold mb-1 ${pkg.is_popular ? "" : "text-primary"}`}>
                              {pkg.name}
                            </h3>
                            {pkg.description && (
                              <p className={`text-xs leading-relaxed ${pkg.is_popular ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                                {pkg.description}
                              </p>
                            )}
                          </div>

                          {/* Price */}
                          <div className="mb-5">
                            {isCall ? (
                              <div className="flex items-center gap-2">
                                <Phone size={20} className="text-electric" />
                                <span className={`text-2xl font-bold ${pkg.is_popular ? "" : "text-primary"}`}>
                                  Hubungi Kami
                                </span>
                              </div>
                            ) : (
                              <>
                                <span className={`text-3xl font-bold ${pkg.is_popular ? "" : "text-electric"}`}>
                                  {pkg.price}
                                </span>
                                {renewal && (
                                  <p className={`text-xs mt-1 ${pkg.is_popular ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                                    {renewal}
                                  </p>
                                )}
                              </>
                            )}
                          </div>

                          {/* Divider */}
                          <div className={`border-t mb-5 ${pkg.is_popular ? "border-primary-foreground/20" : "border-border"}`} />

                          {/* Features */}
                          <ul className="space-y-2.5 flex-1 mb-6">
                            {features.map((feat, fi) => (
                              <li key={fi} className="flex items-start gap-2.5 text-sm">
                                <Check size={16} className={`mt-0.5 shrink-0 ${pkg.is_popular ? "text-electric" : "text-electric"}`} />
                                <span className={pkg.is_popular ? "text-primary-foreground/90" : "text-muted-foreground"}>
                                  {feat}
                                </span>
                              </li>
                            ))}
                          </ul>

                          {/* CTA */}
                          <a
                            href="https://wa.me/6281234567890?text=Halo%20saya%20tertarik%20dengan%20paket%20" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`block text-center py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                              pkg.is_popular
                                ? "bg-electric text-accent-foreground hover:bg-electric-light shadow-lg"
                                : "bg-primary text-primary-foreground hover:bg-navy-light"
                            }`}
                          >
                            Pilih Paket
                          </a>
                        </div>
                      </ScrollReveal>
                    );
                  })}
                </div>
              )}

              {/* Bottom CTA */}
              <ScrollReveal className="text-center mt-16">
                <div className="bg-primary rounded-2xl p-8 max-w-2xl mx-auto relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-electric/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-electric/5 rounded-full translate-y-1/2 -translate-x-1/2" />
                  <div className="relative z-10">
                    <Crown className="mx-auto mb-3 text-electric" size={28} />
                    <h3 className="text-xl font-bold text-primary-foreground mb-2">Butuh Paket Custom?</h3>
                    <p className="text-primary-foreground/70 text-sm mb-5">
                      Konsultasikan kebutuhan spesifik bisnis Anda. Kami siap membantu dengan solusi terbaik.
                    </p>
                    <a
                      href="https://wa.me/6281234567890?text=Halo%20saya%20ingin%20konsultasi%20paket%20custom"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-electric text-accent-foreground px-8 py-3 rounded-xl font-semibold text-sm hover:bg-electric-light transition-colors"
                    >
                      Konsultasi Gratis
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            </>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Pricelist;
