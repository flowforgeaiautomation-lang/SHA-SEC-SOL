import { createFileRoute } from '@tanstack/react-router';
import { TrustPage } from '@/components/mss/pages';
import { pageHead } from '@/lib/mss/seo';
export const Route = createFileRoute('/quality-standards')({
 head:()=>pageHead('Quality Standards | MSS Security','Intended quality, reporting, communication and accountability standards, distinguished from established operating capabilities.'),
 component:()=><TrustPage variant="quality-standards" />,
});
