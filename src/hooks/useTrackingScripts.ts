import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useTrackingScripts = () => {
  useEffect(() => {
    const loadScripts = async () => {
      // Fetch GA and GSC codes from site_settings
      const { data } = await supabase
        .from("site_settings")
        .select("key, value")
        .in("key", ["google_analytics_id", "google_search_console_verification"]);

      if (!data) return;

      const gaId = data.find(s => s.key === "google_analytics_id")?.value;
      const gscCode = data.find(s => s.key === "google_search_console_verification")?.value;

      // Inject Google Analytics
      if (gaId && !document.querySelector(`script[src*="gtag"]`)) {
        const s1 = document.createElement("script");
        s1.async = true;
        s1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
        document.head.appendChild(s1);

        const s2 = document.createElement("script");
        s2.textContent = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`;
        document.head.appendChild(s2);
      }

      // Inject Google Search Console verification
      if (gscCode && !document.querySelector('meta[name="google-site-verification"]')) {
        const meta = document.createElement("meta");
        meta.name = "google-site-verification";
        meta.content = gscCode;
        document.head.appendChild(meta);
      }
    };

    loadScripts();
  }, []);
};
