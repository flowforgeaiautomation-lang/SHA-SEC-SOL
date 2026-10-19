import { createFileRoute } from '@tanstack/react-router';
import { PlannerPage } from '@/components/mss/pages';
import { pageHead } from '@/lib/mss/seo';
export const Route = createFileRoute('/coverage-planner')({
 head:()=>pageHead('24-Hour Coverage Planner | MSS','Calculate daily security coverage, gaps, overlap and person-hours. Preliminary planning, not an approved staffing schedule.'),
 component:()=><PlannerPage />,
});
