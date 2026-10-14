import { createFileRoute } from '@tanstack/react-router';
import { TrustPage } from '@/components/mss/pages';
import { pageHead } from '@/lib/mss/seo';
export const Route = createFileRoute('/delivery-model')({
 head:()=>pageHead('Delivery Model | MSS Security','Understand direct, verified-provider and planned services, approval requirements and responsible service delivery.'),
 component:()=><TrustPage variant="delivery-model" />,
});
