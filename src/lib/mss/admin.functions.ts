import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
import { leadUpdateSchema } from './admin-schema';

export const listEnquiries = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: allowed, error: roleError } = await context.supabase.rpc('has_role', { _user_id: context.userId, _role: 'admin' });
    if (roleError || !allowed) throw new Error('Only authorised MSS team members may access enquiries.');
    const { data, error } = await context.supabase.from('enquiries')
      .select('id,reference,kind,name,phone,email,city,language,details,created_at,status,internal_notes,follow_up_at')
      .order('created_at', { ascending: false }).limit(1000);
    if (error) throw new Error('Enquiries could not be loaded. Please retry.');
    return data ?? [];
  });

export const updateEnquiry = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => leadUpdateSchema.parse(input))
  .handler(async ({ context, data }) => {
    const { data: allowed, error: roleError } = await context.supabase.rpc('has_role', { _user_id: context.userId, _role: 'admin' });
    if (roleError || !allowed) throw new Error('Only authorised MSS team members may update enquiries.');
    const { id, email, follow_up_at, ...fields } = data;
    const { data: saved, error } = await context.supabase.from('enquiries')
      .update({ ...fields, email: email || null, follow_up_at: follow_up_at || null })
      .eq('id', id).select('id').single();
    if (error || !saved) throw new Error('The change could not be confirmed. Please retry.');
    return { id: saved.id };
  });

export const enquiryHistory = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ context, data }) => {
    const { data: allowed, error: roleError } = await context.supabase.rpc('has_role', { _user_id: context.userId, _role: 'admin' });
    if (roleError || !allowed) throw new Error('Only authorised MSS team members may view history.');
    const { data: history, error } = await context.supabase.from('enquiry_history')
      .select('id,created_at,old_status,new_status,change_summary').eq('enquiry_id', data.id)
      .order('created_at', { ascending: false }).limit(100);
    if (error) throw new Error('History could not be loaded.');
    return history ?? [];
  });