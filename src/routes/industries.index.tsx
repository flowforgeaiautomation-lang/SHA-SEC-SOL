import { createFileRoute } from '@tanstack/react-router';
import { IndustriesPage } from '@/components/mss/pages';
import { pageHead } from '@/lib/mss/seo';
export const Route = createFileRoute('/industries/')({
 head:()=>pageHead('Industries | MSS Security Gujarat','Explore security, workplace and workforce requirements for Indian factories, offices, warehouses and communities.'),
 component:()=><IndustriesPage />,
});
