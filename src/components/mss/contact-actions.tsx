import { Phone, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { contactConfig } from '@/lib/mss/contact-config';
import { useSite } from './site-context';
export function ContactActions() {
  const { t } = useSite();
  return <div className="flex flex-wrap gap-3">
    {contactConfig.phone && <Button asChild variant="outline"><a href={`tel:${contactConfig.phone}`}><Phone/>{t(['Call MSS','MSS को कॉल करें','MSS ને કૉલ કરો'])}</a></Button>}
    {contactConfig.whatsapp && <Button asChild variant="outline"><a href={`https://wa.me/${contactConfig.whatsapp.replace(/\D/g,'')}?text=${encodeURIComponent('Hello MSS, I would like to discuss a service enquiry.')}`} target="_blank" rel="noopener noreferrer"><MessageCircle/>{t(['WhatsApp MSS','MSS को WhatsApp करें','MSS ને WhatsApp કરો'])}</a></Button>}
  </div>;
}