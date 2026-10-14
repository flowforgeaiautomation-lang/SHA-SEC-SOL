import { createFileRoute } from '@tanstack/react-router';
import { AboutPage } from '@/components/mss/pages';
import { pageHead } from '@/lib/mss/seo';
export const Route = createFileRoute('/about')({
 head:()=>pageHead('About MSS | Leadership, Braj Roots & Purpose','Learn about Mahavir Singh Chaudhary, Founder & CEO, and Sujal Singh Chaudhary, Managing Director, and the purpose behind MSS.'),
 component:()=><AboutPage />,
});
