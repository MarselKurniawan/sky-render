
-- Create promo_banners table
CREATE TABLE public.promo_banners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  cta_text text DEFAULT 'Klaim Sekarang',
  cta_url text,
  badge_text text DEFAULT '🔥 Promo',
  is_active boolean NOT NULL DEFAULT true,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.promo_banners ENABLE ROW LEVEL SECURITY;

-- Admins full access
CREATE POLICY "Admins full access promo_banners"
  ON public.promo_banners FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Anyone can read active banners
CREATE POLICY "Anyone can read active promo_banners"
  ON public.promo_banners FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

-- Add banner_id to articles table
ALTER TABLE public.articles
  ADD COLUMN banner_id uuid REFERENCES public.promo_banners(id) ON DELETE SET NULL;
