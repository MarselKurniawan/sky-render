import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface SeoData {
  title: string | null;
  description: string | null;
  keywords: string[] | null;
  og_title: string | null;
  og_description: string | null;
  og_image_url: string | null;
  canonical_url: string | null;
}

export const useSeo = (pagePath: string) => {
  const [seo, setSeo] = useState<SeoData | null>(null);

  useEffect(() => {
    const fetchSeo = async () => {
      const { data } = await supabase
        .from("seo_settings")
        .select("title, description, keywords, og_title, og_description, og_image_url, canonical_url")
        .eq("page_path", pagePath)
        .maybeSingle();
      if (data) setSeo(data);
    };
    fetchSeo();
  }, [pagePath]);

  useEffect(() => {
    if (!seo) return;

    if (seo.title) document.title = seo.title;

    const setMeta = (name: string, content: string | null, property?: boolean) => {
      if (!content) return;
      const attr = property ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    setMeta("description", seo.description);
    setMeta("keywords", seo.keywords?.join(", ") ?? null);
    setMeta("og:title", seo.og_title || seo.title, true);
    setMeta("og:description", seo.og_description || seo.description, true);
    setMeta("og:image", seo.og_image_url, true);
    setMeta("twitter:title", seo.og_title || seo.title);
    setMeta("twitter:description", seo.og_description || seo.description);
    setMeta("twitter:image", seo.og_image_url);

    if (seo.canonical_url) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = seo.canonical_url;
    }
  }, [seo]);

  return seo;
};
