import { createServerFn } from '@tanstack/react-start';
import { createClient } from '@supabase/supabase-js';
import type { Database, Json } from '@/integrations/supabase/types';
import { enquirySchema } from './enquiry-schema';

// Uses only the public URL/publishable key so intake works on every host (Lovable and Cloudflare)
// without the private service key. Validation, throttling and idempotency also run in the database.
function publicClient() {
  const url = process.env['SUPABASE_URL'] || import.meta.env['VITE_SUPABASE_URL'];
  const key = process.env['SUPABASE_PUBLISHABLE_KEY'] || import.meta.env['VITE_SUPABASE_PUBLISHABLE_KEY'];
  if (!url || !key) throw new Error('Enquiry service is not configured.');
  const auth = { persistSession: false, autoRefreshToken: false };
  if (!key.startsWith('sb_')) return createClient<Database>(url, key, { auth });
  const shim = (input: RequestInfo | URL, init?: RequestInit) => { const h = new Headers(init?.headers); h.delete('Authorization'); h.set('apikey', key); return fetch(input, { ...init, headers: h }); };
  return createClient<Database>(url, key, { auth, global: { fetch: shim } });
}

export const submitEnquiry = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => enquirySchema.parse(input))
  .handler(async ({ data }) => {
    const { data: reference, error } = await publicClient().rpc('submit_enquiry', {
      p_key: data.key, p_kind: data.kind, p_name: data.name, p_phone: data.phone,
      p_email: data.email || '', p_city: data.city, p_language: data.language, p_details: JSON.parse(data.details) as Json,
    });
    if (error) {
      console.error('submit_enquiry failed', error.code, error.message);
      if (error.message.includes('rate_limited')) throw new Error('Too many requests. Please try again later.');
      throw new Error('Unable to record enquiry. Please try again.');
    }
    if (!reference) throw new Error('Unable to record enquiry. Please try again.');
    return { reference: String(reference) };
  });
