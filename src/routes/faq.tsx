import { createFileRoute } from '@tanstack/react-router';
import { FAQPage } from '@/components/mss/pages';
import { pageHead } from '@/lib/mss/seo';
export const Route = createFileRoute('/faq')({
 head:()=>pageHead('Frequently Asked Questions | MSS','Honest answers about enquiries, quotations, staffing, licensing, providers and careers at MSS.'),
 component:()=><FAQPage />,
});
