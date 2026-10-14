import { createFileRoute } from '@tanstack/react-router';
import { ContactPage } from '@/components/mss/pages';
import { pageHead } from '@/lib/mss/seo';
export const Route = createFileRoute('/contact')({
 head:()=>pageHead('Contact MSS | Business and Partner Enquiries','Contact Mahavir Security Solution to discuss your requirement, support or partner enquiry.'),
 component:()=><ContactPage />,
});
