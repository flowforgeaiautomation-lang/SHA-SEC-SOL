import { createFileRoute } from '@tanstack/react-router';
import { ContactPage } from '@/components/mss/pages';
import { pageHead } from '@/lib/mss/seo';
import { z } from 'zod';
export const Route=createFileRoute('/request-quote')({validateSearch:z.object({need:z.string().optional(),service:z.string().optional(),industry:z.string().optional()}),head:()=>pageHead('Request a Proposal | MSS','Share your security, facility or workforce requirement with MSS. No account required. Preliminary planning only.'),component:Page});
function Page(){const s=Route.useSearch();return <ContactPage kind="quote" need={s.need??s.service??s.industry??''}/>;}
