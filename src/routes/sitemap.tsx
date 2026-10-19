import { createFileRoute } from '@tanstack/react-router';
import { SitemapPage } from '@/components/mss/pages';
import { pageHead } from '@/lib/mss/seo';
export const Route = createFileRoute('/sitemap')({
 head:()=>pageHead('Website Directory | MSS','Find all MSS services, industries, company, planning and policy pages.'),
 component:()=><SitemapPage />,
});
