import { createFileRoute } from '@tanstack/react-router';
import { Admin } from '@/components/mss/admin';
import { pageHead } from '@/lib/mss/seo';
export const Route = createFileRoute('/_authenticated/admin')({
  head: () => ({ ...pageHead('MSS | Private Enquiry Management', 'Authorised MSS enquiry review, follow-ups and history.'), meta: [...pageHead('MSS | Private Enquiry Management', 'Authorised MSS enquiry review, follow-ups and history.').meta, { name: 'robots', content: 'noindex,nofollow' }] }),
  component: Admin,
});