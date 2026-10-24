import { createServerFn } from '@tanstack/react-start';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import type { Database } from '@/integrations/supabase/types';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
import { profileSchema, vacancySchema, applicationUpdateSchema } from './portal-schema';
export const listVacancies=createServerFn({method:'GET'}).handler(async()=>{
 const key=process.env['SUPABASE_PUBLISHABLE_KEY']!;
 const client=createClient<Database>(process.env['SUPABASE_URL']!,key,{auth:{persistSession:false,autoRefreshToken:false},global:{fetch:(input,init)=>{const headers=new Headers(init?.headers);if(key.startsWith('sb_')&&headers.get('Authorization')===`Bearer ${key}`)headers.delete('Authorization');headers.set('apikey',key);return fetch(input,{...init,headers});}}});
 const {data,error}=await client.from('vacancies').select('id,title,employer,location,job_type,responsibilities,eligibility,qualifications,salary,hours,benefits,deadline').eq('status','active').eq('verified',true).or(`deadline.is.null,deadline.gt.${new Date().toISOString()}`).order('created_at',{ascending:false}).limit(200);
 if(error)throw new Error('Vacancies could not be loaded.');return data??[];
});
export const candidateData=createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).handler(async({context})=>{
 const [profile,applications]=await Promise.all([context.supabase.from('profiles').select('*').eq('id',context.userId).maybeSingle(),context.supabase.from('applications').select('id,vacancy_id,status,interview_at,created_at,updated_at').eq('user_id',context.userId).order('created_at',{ascending:false})]);
 if(profile.error||applications.error)throw new Error('Your account could not be loaded.');
 const ids=(applications.data??[]).map(a=>a.id);const history=ids.length?await context.supabase.from('application_history').select('application_id,status,created_at').in('application_id',ids).order('created_at',{ascending:false}):{data:[],error:null};
 return {profile:profile.data,applications:applications.data??[],history:history.data??[]};
});
export const saveProfile=createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).inputValidator((i:unknown)=>profileSchema.parse(i)).handler(async({context,data})=>{
 const {consent,...profile}=data;const {error}=await context.supabase.from('profiles').upsert({...profile,id:context.userId,consent_at:new Date().toISOString(),updated_at:new Date().toISOString()});if(error)throw new Error('Profile not saved.');return {saved:true};
});
export const applyForVacancy=createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).inputValidator((i:unknown)=>z.object({vacancy_id:z.string().uuid(),candidate_note:z.string().max(2000)}).parse(i)).handler(async({context,data})=>{
 const {data:existing}=await context.supabase.from('applications').select('id').eq('user_id',context.userId).eq('vacancy_id',data.vacancy_id).maybeSingle();if(existing)return {id:existing.id};
 const {data:saved,error}=await context.supabase.from('applications').insert({...data,user_id:context.userId}).select('id').single();if(error||!saved)throw new Error('Complete your profile and consent first. The vacancy must still be open.');return {id:saved.id};
});
export const recruitmentData=createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).handler(async({context})=>{
 const role=await context.supabase.rpc('has_role',{_user_id:context.userId,_role:'admin'});if(role.error||!role.data)throw new Error('Authorised recruitment staff only.');
 const [profiles,vacancies,applications]=await Promise.all([context.supabase.from('profiles').select('*').order('updated_at',{ascending:false}).limit(1000),context.supabase.from('vacancies').select('*').order('created_at',{ascending:false}).limit(500),context.supabase.from('applications').select('*').order('created_at',{ascending:false}).limit(1000)]);if(profiles.error||vacancies.error||applications.error)throw new Error('Recruitment records unavailable.');return {profiles:profiles.data??[],vacancies:vacancies.data??[],applications:applications.data??[]};
});
export const saveVacancy=createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).inputValidator((i:unknown)=>vacancySchema.parse(i)).handler(async({context,data})=>{
 const role=await context.supabase.rpc('has_role',{_user_id:context.userId,_role:'admin'});if(role.error||!role.data)throw new Error('Authorised recruitment staff only.');
 const {id,deadline,...fields}=data;const value={...fields,deadline:deadline||null,updated_at:new Date().toISOString()};const result=id?await context.supabase.from('vacancies').update(value).eq('id',id).select('id').single():await context.supabase.from('vacancies').insert(value).select('id').single();if(result.error||!result.data)throw new Error('Vacancy not saved.');return {id:result.data.id};
});
export const updateApplication=createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).inputValidator((i:unknown)=>applicationUpdateSchema.parse(i)).handler(async({context,data})=>{
 const role=await context.supabase.rpc('has_role',{_user_id:context.userId,_role:'admin'});if(role.error||!role.data)throw new Error('Authorised recruitment staff only.');
 const {id,interview_at,...fields}=data;const {error}=await context.supabase.from('applications').update({...fields,interview_at:interview_at||null,updated_at:new Date().toISOString()}).eq('id',id);if(error)throw new Error('Application not updated.');return {saved:true};
});
