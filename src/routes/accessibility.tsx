import { createFileRoute } from '@tanstack/react-router';
import { PoliciesPage } from '@/components/mss/pages';
import { pageHead } from '@/lib/mss/seo';
export const Route = createFileRoute('/accessibility')({
 head:()=>pageHead('Accessibility | MSS','Accessibility approach and contact route for usability concerns at MSS.'),
 component:()=><PoliciesPage type="accessibility" />,
});
