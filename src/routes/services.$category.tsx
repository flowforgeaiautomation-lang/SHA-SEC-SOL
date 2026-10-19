import { createFileRoute, notFound } from '@tanstack/react-router';
import { CategoryPage } from '@/components/mss/pages';
import { families } from '@/lib/mss/content';
import { pageHead } from '@/lib/mss/seo';
export const Route=createFileRoute('/services/$category')({loader:({params})=>{const f=families.find(f=>f.slug===params.category);if(!f)throw notFound();return f},head:({loaderData})=>pageHead(`${loaderData?.name[0]??'Service unavailable'} | MSS`,loaderData?.desc[0]??'This MSS service category is unavailable.'),component:Page});
function Page(){const {category}=Route.useParams();return <CategoryPage category={category}/>;}
