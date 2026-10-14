import { createFileRoute } from '@tanstack/react-router';
import { CategoryPage } from '@/components/mss/pages';
import { pageHead } from '@/lib/mss/seo';
export const Route=createFileRoute('/technology')({head:()=>pageHead('Technology & Quality | MSS Security','Planned digital attendance, reporting, service coordination and responsible technology direction.'),component:()=> <CategoryPage category="technology" />});
