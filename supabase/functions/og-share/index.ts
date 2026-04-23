import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function escapeHtml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const url = new URL(req.url);
  const type = url.searchParams.get("type") || "article";
  const slug = url.searchParams.get("slug");
  const id = url.searchParams.get("id");
  const origin = url.searchParams.get("origin") || "https://saatdigital.com";

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  let title = "Saat.";
  let description = "Saat. — Creative Digital Agency";
  let image = `${origin}/favicon.png`;
  let canonicalUrl = origin;
  let ogType = "website";

  if (type === "portfolio" && id) {
    const { data } = await supabase
      .from("portfolios")
      .select("title, description, image_url, category")
      .eq("id", id)
      .eq("is_published", true)
      .maybeSingle();
    if (data) {
      title = data.title;
      description = data.description || `${data.category} — Portfolio Saat.`;
      image = data.image_url || image;
      canonicalUrl = `${origin}/portfolio/${id}`;
      ogType = "article";
    }
  } else if (type === "landing" || (!slug && !id)) {
    const { data } = await supabase
      .from("seo_settings")
      .select("title, description, og_title, og_description, og_image_url, canonical_url")
      .eq("page_path", "/")
      .maybeSingle();
    if (data) {
      title = data.og_title || data.title || title;
      description = data.og_description || data.description || description;
      image = data.og_image_url || image;
      canonicalUrl = data.canonical_url || origin;
      ogType = "website";
    }
  } else if (slug) {
    const { data } = await supabase
      .from("articles")
      .select("title, excerpt, seo_title, seo_description, og_image_url, image_url")
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle();
    if (data) {
      title = data.seo_title || data.title;
      description = data.seo_description || data.excerpt || description;
      image = data.og_image_url || data.image_url || image;
      canonicalUrl = `${origin}/${slug}`;
      ogType = "article";
    }
  }

  const t = escapeHtml(title);
  const d = escapeHtml(description);

  const html = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>${t}</title>
  <meta name="description" content="${d}">
  <meta property="og:title" content="${t}">
  <meta property="og:description" content="${d}">
  <meta property="og:image" content="${image}">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:type" content="${ogType}">
  <meta property="og:site_name" content="Saat.">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${t}">
  <meta name="twitter:description" content="${d}">
  <meta name="twitter:image" content="${image}">
  <link rel="canonical" href="${canonicalUrl}">
  <link rel="icon" href="${origin}/favicon.png" type="image/png">
  <meta http-equiv="refresh" content="0;url=${canonicalUrl}">
</head>
<body>
  <script>window.location.replace("${canonicalUrl}");</script>
  <p>Redirecting to <a href="${canonicalUrl}">${t}</a>...</p>
</body>
</html>`;

  return new Response(html, {
    headers: {
      ...corsHeaders,
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
});
