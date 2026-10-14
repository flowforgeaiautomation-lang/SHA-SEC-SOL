import { createFileRoute } from '@tanstack/react-router';
import { ProcessPage } from '@/components/mss/pages';
import { pageHead } from '@/lib/mss/seo';
export const Route = createFileRoute('/how-it-works')({
 head:()=>pageHead('How It Works | MSS Enquiry to Service','Ten clear steps from requirement to authorised service. Enquiries and preliminary proposals are not deployment approvals.'),
 component:()=><ProcessPage />,
});
