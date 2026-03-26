import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface ClientLogo {
  id: string;
  name: string;
  image_url: string;
}

const ClientLogosSection = () => {
  const [logos, setLogos] = useState<ClientLogo[]>([]);

  useEffect(() => {
    supabase
      .from("client_logos")
      .select("id, name, image_url")
      .eq("is_active", true)
      .order("display_order", { ascending: true })
      .then(({ data }) => setLogos((data as ClientLogo[]) ?? []));
  }, []);

  if (logos.length === 0) return null;

  return (
    <section className="py-12 sm:py-16 border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6">
        <p className="text-center text-xs uppercase tracking-widest text-muted-foreground mb-8">
          Dipercaya oleh
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          {logos.map((logo) => (
            <div
              key={logo.id}
              className="h-10 sm:h-12 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            >
              <img
                src={logo.image_url}
                alt={logo.name}
                className="h-full w-auto object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogosSection;
