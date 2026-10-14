import { createFileRoute } from '@tanstack/react-router';
import { ContactPage } from '@/components/mss/pages';
import { pageHead } from '@/lib/mss/seo';
export const Route = createFileRoute('/complaints')({
 head:()=>pageHead('Complaints & Support | MSS Security','Record your service concern or grievance with MSS and receive a private reference after successful recording.'),
 component:()=><ContactPage kind="complaint" />,
});
