import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
const schema = z.object({key:z.string().uuid(),kind:z.enum(['quote','contact','career','complaint','partner','support']),name:z.string().trim().min(2).max(100),phone:z.string().regex(/^(?:\+91)?[6-9]\d{9}$/),email:z.union([z.string().email().max(254),z.literal('')]),city:z.string().trim().min(2).max(100),language:z.enum(['en','hi','gu']),details:z.string().max(12000),consent:z.literal(true),website:z.string().max(0)});
export const submitEnquiry = createServerFn({method:'POST'}).inputValidator((input:unknown)=>schema.parse(input)).handler(async({data})=>{
 const {supabaseAdmin} = await import('@/integrations/supabase/client.server');
 const bytes = new TextEncoder().encode(data.phone);
 const digest = await crypto.subtle.digest('SHA-256',bytes);
 const hash = Array.from(new Uint8Array(digest)).map(x=>x.toString(16).padStart(2,'0')).join('');
 const {count,error:countError} = await supabaseAdmin.from('enquiries').select('id',{count:'exact',head:true}).eq('contact_hash',hash).gte('created_at',new Date(Date.now()-3600000).toISOString());
 if(countError) throw new Error('Unable to record enquiry. Please try again.');
 if((count??0)>=5) throw new Error('Too many requests. Please try again later.');
 const reference = `MSS-${new Date().getUTCFullYear()}-${crypto.randomUUID().slice(0,8).toUpperCase()}`;
 const {error} = await supabaseAdmin.from('enquiries').insert({reference,submission_key:data.key,kind:data.kind,name:data.name,phone:data.phone,email:data.email||null,city:data.city,language:data.language,details:JSON.parse(data.details),contact_hash:hash});
 if(error?.code==='23505') throw new Error('This request was already recorded. Do not resubmit.');
 if(error) throw new Error('Unable to record enquiry. Please try again.');
 return {reference};
});
