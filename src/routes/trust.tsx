import { createFileRoute } from '@tanstack/react-router';
import { TrustPage } from '@/components/mss/pages';
import { pageHead } from '@/lib/mss/seo';
export const Route = createFileRoute('/trust')({
 head:()=>pageHead('Compliance & Trust | MSS Security','PSARA application in process, readiness disclosures, workforce principles and pre-launch review requirements.'),
 component:()=><TrustPage />,
});
