import { createFileRoute } from '@tanstack/react-router';
import { WelfareTrustPage } from '@/components/mss/welfare-trust';
import { pageHead } from '@/lib/mss/seo';
export const Route = createFileRoute('/welfare-trust')({
  head: () => pageHead('Mahavir Employment & Welfare Trust | MSS', 'Proposed MSS initiative for dignified employment, skills and welfare for veterans, retired personnel and unemployed adults in India.'),
  component: WelfareTrustPage,
});
