CREATE OR REPLACE FUNCTION public.submit_enquiry(
  p_key uuid, p_kind text, p_name text, p_phone text, p_email text,
  p_city text, p_language text, p_details jsonb
) RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_ref text;
  v_hash text;
  v_recent int;
BEGIN
  SELECT reference INTO v_ref FROM public.enquiries WHERE submission_key = p_key;
  IF v_ref IS NOT NULL THEN RETURN v_ref; END IF;

  IF p_kind NOT IN ('quote','contact','career','complaint','partner','support') THEN RAISE EXCEPTION 'invalid kind'; END IF;
  IF p_language NOT IN ('en','hi','gu') THEN RAISE EXCEPTION 'invalid language'; END IF;
  IF length(btrim(coalesce(p_name,''))) NOT BETWEEN 2 AND 100 THEN RAISE EXCEPTION 'invalid name'; END IF;
  IF length(btrim(coalesce(p_city,''))) NOT BETWEEN 2 AND 100 THEN RAISE EXCEPTION 'invalid city'; END IF;
  IF coalesce(p_phone,'') !~ '^\+?[1-9][0-9]{6,14}$' THEN RAISE EXCEPTION 'invalid phone'; END IF;
  IF p_email IS NOT NULL AND length(p_email) > 254 THEN RAISE EXCEPTION 'invalid email'; END IF;
  IF p_details IS NULL OR jsonb_typeof(p_details) <> 'object' OR length(p_details::text) > 12000 THEN RAISE EXCEPTION 'invalid details'; END IF;

  v_hash := encode(sha256(convert_to(p_phone,'UTF8')),'hex');
  SELECT count(*) INTO v_recent FROM public.enquiries WHERE contact_hash = v_hash AND created_at >= now() - interval '1 hour';
  IF v_recent >= 5 THEN RAISE EXCEPTION 'rate_limited'; END IF;

  v_ref := 'MSS-' || extract(year from now() at time zone 'utc')::int || '-' || upper(substr(replace(gen_random_uuid()::text,'-',''),1,8));
  INSERT INTO public.enquiries(reference, submission_key, kind, name, phone, email, city, language, details, contact_hash, status)
  VALUES (v_ref, p_key, p_kind, btrim(p_name), p_phone, nullif(p_email,''), btrim(p_city), p_language, p_details, v_hash, 'New')
  ON CONFLICT (submission_key) DO NOTHING;
  SELECT reference INTO v_ref FROM public.enquiries WHERE submission_key = p_key;
  RETURN v_ref;
END;
$$;

REVOKE ALL ON FUNCTION public.submit_enquiry(uuid,text,text,text,text,text,text,jsonb) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.submit_enquiry(uuid,text,text,text,text,text,text,jsonb) TO anon, authenticated, service_role;