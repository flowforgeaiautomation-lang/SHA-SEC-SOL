import { z } from 'zod';
export const phoneSchema = z.string().trim().regex(/^\+?[1-9]\d{6,14}$/);
export const enquirySchema = z.object({
  key: z.string().uuid(), kind: z.enum(['quote','contact','career','complaint','partner','support']),
  name: z.string().trim().min(2).max(100), phone: phoneSchema,
  email: z.union([z.string().email().max(254), z.literal('')]), city: z.string().trim().min(2).max(100),
  language: z.enum(['en','hi','gu']), details: z.string().max(12000).refine(value => { try { const d = JSON.parse(value); return d !== null && typeof d === 'object' && !Array.isArray(d); } catch { return false; } }),
  consent: z.literal(true), website: z.string().max(0),
}).superRefine((data, ctx) => {
  if (data.kind === 'quote') { const details = JSON.parse(data.details); if (!details.type || typeof details.type !== 'string') ctx.addIssue({code:'custom',path:['details'],message:'Site type is required'}); }
});
export const leadStatuses = ['New','Contacted','Meeting','Quotation','Won','Lost'] as const;