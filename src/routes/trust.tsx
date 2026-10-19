import { createFileRoute } from '@tanstack/react-router';
import { TrustPage } from '@/components/mss/pages';
import { pageHead } from '@/lib/mss/seo';
export const Route = createFileRoute('/trust')({
 head:()=>pageHead('Compliance & Trust | MSS','Service approvals, workforce principles and responsible planning at MSS.'),
 component:()=><TrustPage />,
});
