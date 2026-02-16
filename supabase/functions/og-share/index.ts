import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const url = new URL(req.url);
  const slug = url.searchParams.get("slug");
  const origin = url.searchParams.get("origin") || "https://sky-render.lovable.app";

  if (!slug) {
    return new Response("Missing slug", { status: 400, headers: corsHeaders });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const { data } = await supabase
    .from("articles")
    .select("title, excerpt, seo_title, seo_description, og_image_url, image_url, article_type")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  const title = escapeHtml(data?.seo_title || data?.title || "Saat.");
  const description = escapeHtml(data?.seo_description || data?.excerpt || "Saat. — Creative Digital Agency");
  const image = data?.og_image_url || data?.image_url || `${origin}/favicon.png`;
  // Clean URL: domain.com/slug
  const articleUrl = `${origin}/${slug}`;

  const html = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="${image}">
  <meta property="og:url" content="${articleUrl}">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="Saat.">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${image}">
  <link rel="icon" href="${origin}/favicon.png" type="image/png">
  <meta http-equiv="refresh" content="0;url=${articleUrl}">
</head>
<body>
  <script>window.location.href="${articleUrl}";</script>
  <p>Redirecting to <a href="${articleUrl}">${title}</a>...</p>
</body>
</html>`;

  return new Response(html, {
    headers: { ...corsHeaders, "Content-Type": "text/html; charset=utf-8" },
  });
});

function escapeHtml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
