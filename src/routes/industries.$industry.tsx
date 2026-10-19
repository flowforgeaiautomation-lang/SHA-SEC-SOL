import { createFileRoute, notFound } from '@tanstack/react-router';
import { IndustriesPage } from '@/components/mss/pages';
import { industries } from '@/lib/mss/content';
import { pageHead } from '@/lib/mss/seo';
export const Route=createFileRoute('/industries/$industry')({loader:({params})=>{const i=industries.find(i=>i.slug===params.industry);if(!i)throw notFound();return i},head:({loaderData})=>pageHead(`${loaderData?.name[0]??'Industry unavailable'} | MSS`,loaderData?.need[0]??'This MSS industry page is unavailable.'),component:Page});
function Page(){const {industry}=Route.useParams();return <IndustriesPage slug={industry}/>;}
