
CREATE TABLE public.media_metadata (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  file_name text NOT NULL UNIQUE,
  alt_text text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.media_metadata ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read media metadata"
ON public.media_metadata FOR SELECT TO public
USING (true);

CREATE POLICY "Admins full access media metadata"
ON public.media_metadata FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));
