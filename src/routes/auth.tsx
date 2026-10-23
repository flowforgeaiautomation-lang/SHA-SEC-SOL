import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { lovable } from '@/integrations/lovable';
import { supabase } from '@/integrations/supabase/client';
import { pageHead } from '@/lib/mss/seo';
import { useSite } from '@/components/mss/site-context';

export const Route = createFileRoute('/auth')({
  head: () => pageHead('MSS Team Sign In', 'Private sign-in for authorised MSS enquiry management.'),
  component: TeamSignIn,
});

function TeamSignIn() {
  const { t } = useSite();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  async function signIn() {
    setBusy(true); setError('');
    try {
      const result = await lovable.auth.signInWithOAuth('google', { redirect_uri: `${window.location.origin}/auth` });
      if (result.error) throw result.error;
      if (result.redirected) return;
      const { data } = await supabase.auth.getUser();
      if (data.user) await navigate({ to: '/admin' });
    } catch { setError(t(['Sign-in could not be completed. Please retry.', 'साइन इन नहीं हो सका। दोबारा प्रयास करें।', 'સાઇન ઇન થઈ શક્યું નથી. ફરી પ્રયાસ કરો.'])); }
    finally { setBusy(false); }
  }
  return <section className="section"><div className="container article"><span className="eyebrow">MSS</span><h1>{t(['Team sign in', 'टीम साइन इन', 'ટીમ સાઇન ઇન'])}</h1><p>{t(['Enquiry access is restricted to authorised MSS team members.', 'पूछताछ केवल अधिकृत MSS टीम के सदस्य देख सकते हैं।', 'પૂછપરછ ફક્ત અધિકૃત MSS ટીમના સભ્યો જોઈ શકે.'])}</p><div className="flex flex-wrap gap-3"><Button disabled={busy} onClick={signIn}>{t(['Continue with Google', 'Google से जारी रखें', 'Google સાથે આગળ વધો'])}</Button><Button variant="outline" onClick={() => navigate({ to: '/admin' })}>{t(['Open enquiries', 'पूछताछ खोलें', 'પૂછપરછ ખોલો'])}</Button></div>{error && <p className="form-error" role="alert">{error}</p>}</div></section>;
}