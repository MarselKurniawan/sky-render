
-- 1. Storage bucket for media/assets
INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true);

-- Storage policies
CREATE POLICY "Anyone can view media" ON storage.objects FOR SELECT USING (bucket_id = 'media');
CREATE POLICY "Admins can upload media" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update media" ON storage.objects FOR UPDATE USING (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete media" ON storage.objects FOR DELETE USING (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'));

-- 2. Add hidden_keywords to articles
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS hidden_keywords text;

-- 3. Add price to portfolios
ALTER TABLE public.portfolios ADD COLUMN IF NOT EXISTS price text;

-- 4. Article categories table
CREATE TABLE public.article_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL UNIQUE,
  slug text NOT NULL UNIQUE,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.article_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read article categories" ON public.article_categories FOR SELECT USING (true);
CREATE POLICY "Admins full access article categories" ON public.article_categories FOR ALL USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Seed some default categories
INSERT INTO public.article_categories (name, slug, display_order) VALUES
  ('Digital Marketing', 'digital-marketing', 1),
  ('Branding', 'branding', 2),
  ('Web Development', 'web-development', 3),
  ('SEO', 'seo', 4),
  ('Social Media', 'social-media', 5);
