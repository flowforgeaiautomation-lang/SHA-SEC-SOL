import { createFileRoute } from '@tanstack/react-router';
import { PoliciesPage } from '@/components/mss/pages';
import { pageHead } from '@/lib/mss/seo';
export const Route = createFileRoute('/privacy')({
 head:()=>pageHead('Privacy Notice | MSS Security','Draft privacy information for MSS enquiry and recruitment records, contact, corrections and retention review.'),
 component:()=><PoliciesPage type="privacy" />,
});
