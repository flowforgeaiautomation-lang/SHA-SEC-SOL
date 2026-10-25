import { createFileRoute } from '@tanstack/react-router';
import { AboutPage } from '@/components/mss/pages';
import { pageHead } from '@/lib/mss/seo';
export const Route = createFileRoute('/about')({
 head:()=>pageHead('About MSS | Mahavir Singh Chaudhary & Our Story','Discover how founder Mahavir Singh Chaudhary’s former CISF service inspires MSS’s discipline, responsibility and respect for people.'),
 component:()=><AboutPage />,
});
