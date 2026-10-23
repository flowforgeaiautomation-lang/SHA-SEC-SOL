import { describe, expect, it } from 'vitest';
import { enquirySchema, phoneSchema } from '@/lib/mss/enquiry-schema';
import { leadUpdateSchema, csvCell } from '@/lib/mss/admin-schema';

const request = { key: '00000000-0000-4000-8000-000000000001', kind: 'quote', name: 'Test Client', phone: '+442079460958', email: '', city: 'London', language: 'en', details: '{"type":"Office / Commercial Building"}', consent: true, website: '' };
describe('MSS enquiry rules', () => {
  it('accepts international phone numbers', () => { expect(phoneSchema.safeParse('+442079460958').success).toBe(true); });
  it('does not require a business email', () => { expect(enquirySchema.safeParse(request).success).toBe(true); });
  it('requires the quote site type', () => { expect(enquirySchema.safeParse({ ...request, details: '{}' }).success).toBe(false); });
  it('requires consent', () => { expect(enquirySchema.safeParse({ ...request, consent: false }).success).toBe(false); });
  it('rejects honeypot submissions', () => { expect(enquirySchema.safeParse({ ...request, website: 'spam.example' }).success).toBe(false); });
  it('accepts exactly the six requested lead statuses', () => {
    const lead = { id: request.key, name: request.name, phone: request.phone, email: '', city: request.city, internal_notes: '', follow_up_at: '' };
    for (const status of ['New', 'Contacted', 'Meeting', 'Quotation', 'Won', 'Lost']) expect(leadUpdateSchema.safeParse({ ...lead, status }).success).toBe(true);
    expect(leadUpdateSchema.safeParse({ ...lead, status: 'Approved' }).success).toBe(false);
  });
  it('neutralises spreadsheet formula injection in exports', () => { expect(csvCell('=1+1')).toBe('"\'=1+1"'); });
});