import { createFileRoute } from '@tanstack/react-router';
import { ContactPage } from '@/components/mss/pages';
import { pageHead } from '@/lib/mss/seo';
export const Route = createFileRoute('/careers')({
 head:()=>pageHead('Careers | Express Your Interest with MSS','Submit recruitment interest to MSS. No applicant fees and no invented vacancies or job guarantees.'),
 component:()=><ContactPage kind="career" />,
});
