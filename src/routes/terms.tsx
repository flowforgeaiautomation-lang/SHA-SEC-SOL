import { createFileRoute } from '@tanstack/react-router';
import { PoliciesPage } from '@/components/mss/pages';
import { pageHead } from '@/lib/mss/seo';
export const Route = createFileRoute('/terms')({
 head:()=>pageHead('Terms of Use | MSS Security','Draft terms for use of MSS information, preliminary coverage planning and enquiry forms.'),
 component:()=><PoliciesPage type="terms" />,
});
