import { createFileRoute } from '@tanstack/react-router';
import { PoliciesPage } from '@/components/mss/pages';
import { pageHead } from '@/lib/mss/seo';
export const Route = createFileRoute('/cookies')({
 head:()=>pageHead('Cookie Preferences | MSS Security','Manage session preferences and learn about language storage. No analytics provider is configured.'),
 component:()=><PoliciesPage type="cookies" />,
});
