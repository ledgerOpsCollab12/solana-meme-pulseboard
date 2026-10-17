CREATE TABLE public.api_requests (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
 email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 255),
 message text NOT NULL CHECK (char_length(message) BETWEEN 1 AND 2000),
 created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.api_requests TO service_role;
ALTER TABLE public.api_requests ENABLE ROW LEVEL SECURITY;
CREATE TABLE public.feature_recommendations (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
 email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 255),
 message text NOT NULL CHECK (char_length(message) BETWEEN 1 AND 2000),
 created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.feature_recommendations TO service_role;
ALTER TABLE public.feature_recommendations ENABLE ROW LEVEL SECURITY;