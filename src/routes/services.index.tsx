import { createFileRoute } from '@tanstack/react-router';
import { ServicesPage } from '@/components/mss/pages';
import { pageHead } from '@/lib/mss/seo';
export const Route = createFileRoute('/services/')({
 head:()=>pageHead('All Services | MSS','Explore the complete MSS security, facility, workforce and technology service direction with readiness disclosures.'),
 component:()=><ServicesPage />,
});
