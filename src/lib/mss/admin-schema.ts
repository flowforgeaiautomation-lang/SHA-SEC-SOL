import { z } from 'zod';
import { leadStatuses, phoneSchema } from './enquiry-schema';

export const leadUpdateSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(leadStatuses),
  name: z.string().trim().min(2).max(100),
  phone: phoneSchema,
  email: z.union([z.string().email().max(254), z.literal('')]),
  city: z.string().trim().min(2).max(100),
  internal_notes: z.string().max(5000),
  follow_up_at: z.union([z.string().datetime({ offset: true }), z.literal('')]),
});

export function csvCell(value: unknown) {
  const text = String(value ?? '');
  const safe = /^[=+\-@\t\r]/.test(text) ? `'${text}` : text;
  return `"${safe.replaceAll('"', '""')}"`;
}