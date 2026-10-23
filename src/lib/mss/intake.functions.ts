import { createServerFn } from '@tanstack/react-start';
import { enquirySchema } from './enquiry-schema';
export const submitEnquiry = createServerFn({method:'POST'}).inputValidator((input:unknown)=>enquirySchema.parse(input)).handler(async({data})=>{
 const {supabaseAdmin} = await import('@/integrations/supabase/client.server');
 const {data:existing,error:lookupError}=await supabaseAdmin.from('enquiries').select('reference').eq('submission_key',data.key).maybeSingle();
 if(lookupError) throw new Error('Unable to record enquiry.');
 if(existing) return {reference:existing.reference};
 const bytes = new TextEncoder().encode(data.phone);
 const digest = await crypto.subtle.digest('SHA-256',bytes);
 const hash = Array.from(new Uint8Array(digest)).map(x=>x.toString(16).padStart(2,'0')).join('');
 const {count,error:countError} = await supabaseAdmin.from('enquiries').select('id',{count:'exact',head:true}).eq('contact_hash',hash).gte('created_at',new Date(Date.now()-3600000).toISOString());
 if(countError) throw new Error('Unable to record enquiry. Please try again.');
 if((count??0)>=5) throw new Error('Too many requests. Please try again later.');
 const reference = `MSS-${new Date().getUTCFullYear()}-${crypto.randomUUID().slice(0,8).toUpperCase()}`;
 const {error} = await supabaseAdmin.from('enquiries').insert({reference,submission_key:data.key,kind:data.kind,name:data.name,phone:data.phone,email:data.email||null,city:data.city,language:data.language,details:JSON.parse(data.details),contact_hash:hash,status:'New'});
 if(error?.code==='23505'){const {data:record}=await supabaseAdmin.from('enquiries').select('reference').eq('submission_key',data.key).maybeSingle();if(record)return {reference:record.reference};}
 if(error) throw new Error('Unable to record enquiry. Please try again.');
 return {reference};
});
