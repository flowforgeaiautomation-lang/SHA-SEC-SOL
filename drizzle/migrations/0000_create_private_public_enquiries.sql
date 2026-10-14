CREATE TABLE public.enquiries (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 reference text NOT NULL UNIQUE,
 submission_key uuid NOT NULL UNIQUE,
 kind text NOT NULL,
 name text NOT NULL,
 phone text NOT NULL,
 email text,
 city text NOT NULL,
 language text NOT NULL DEFAULT 'en',
 details jsonb NOT NULL DEFAULT '{}'::jsonb,
 consent_at timestamptz NOT NULL DEFAULT now(),
 created_at timestamptz NOT NULL DEFAULT now(),
 status text NOT NULL DEFAULT 'received',
 contact_hash text NOT NULL
);
GRANT ALL ON public.enquiries TO service_role;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
CREATE INDEX enquiries_contact_time_idx ON public.enquiries(contact_hash, created_at DESC);
COMMENT ON TABLE public.enquiries IS 'Private website enquiries. No browser role access. Validated server-side intake only; company review through Cloud until staff workflow exists.';