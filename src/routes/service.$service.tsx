import { createFileRoute, notFound } from '@tanstack/react-router';
import { ServiceDetail } from '@/components/mss/pages';
import { services } from '@/lib/mss/content';
import { pageHead } from '@/lib/mss/seo';
export const Route=createFileRoute('/service/$service')({loader:({params})=>{const s=services.find(s=>s.slug===params.service);if(!s)throw notFound();return s},head:({loaderData})=>pageHead(`${loaderData?.name[0]??'Service unavailable'} | MSS`,loaderData?`Discuss ${loaderData.name[0]} requirements with MSS. Assessment, authorisations and operational readiness required.`:'This MSS service is unavailable.'),component:Page});
function Page(){const {service}=Route.useParams();return <ServiceDetail slug={service}/>;}
