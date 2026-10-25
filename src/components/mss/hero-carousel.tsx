import { Link } from '@tanstack/react-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSite } from './site-context';
import type { Words } from '@/lib/mss/content';
import security from '@/assets/slide-security.jpg';
import veteran from '@/assets/slide-veteran.jpg';
import recruitment from '@/assets/slide-recruitment.jpg';
import training from '@/assets/slide-training.jpg';
import { photos } from '@/lib/mss/photos';

type To = '/services' | '/request-quote' | '/welfare-trust' | '/careers';
type Slide = { img: string; alt: Words; eyebrow: Words; title: Words; body: Words; primary: [Words, To, string?]; secondary: [Words, To, string?] };

export const slides: Slide[] = [
  { img: security, alt: ['Security supervisor at a corporate campus entrance', 'कॉर्पोरेट परिसर के प्रवेश पर सुरक्षा पर्यवेक्षक', 'કોર્પોરેટ પરિસરના પ્રવેશ પર સુરક્ષા સુપરવાઇઝર'], eyebrow: ['MSS PROFESSIONAL SECURITY SERVICES', 'MSS पेशेवर सुरक्षा सेवाएँ', 'MSS વ્યાવસાયિક સુરક્ષા સેવાઓ'], title: ['MSS Security Solutions', 'MSS सुरक्षा समाधान', 'MSS સુરક્ષા ઉકેલો'], body: ['Professional security solutions designed around responsible personnel, dependable operations and the safety needs of businesses and institutions.', 'ज़िम्मेदार कर्मचारियों, भरोसेमंद संचालन और व्यवसायों व संस्थानों की सुरक्षा ज़रूरतों पर आधारित पेशेवर सुरक्षा समाधान।', 'જવાબદાર કર્મચારીઓ, ભરોસાપાત્ર કામગીરી અને વ્યવસાયો તથા સંસ્થાઓની સુરક્ષા જરૂરિયાતો પર આધારિત વ્યાવસાયિક સુરક્ષા ઉકેલો.'], primary: [['Explore our services', 'हमारी सेवाएँ देखें', 'અમારી સેવાઓ જુઓ'], '/services'], secondary: [['Get a Quote', 'कोटेशन प्राप्त करें', 'ભાવપત્રક મેળવો'], '/request-quote'] },
  { img: veteran, alt: ['Retired veteran speaking with a career counsellor', 'करियर सलाहकार से बात करते सेवानिवृत्त पूर्व सैनिक', 'કારકિર્દી સલાહકાર સાથે વાત કરતા નિવૃત્ત પૂર્વ સૈનિક'], eyebrow: ['MAHAVIR EMPLOYMENT & WELFARE TRUST (PROPOSED)', 'महावीर रोज़गार एवं कल्याण ट्रस्ट (प्रस्तावित)', 'મહાવીર રોજગાર અને કલ્યાણ ટ્રસ્ટ (પ્રસ્તાવિત)'], title: ['A career of service deserves another opportunity.', 'सेवा भरे करियर को एक और अवसर मिलना चाहिए।', 'સેવાભરી કારકિર્દીને બીજી તક મળવી જોઈએ.'], body: ['Building pathways to dignified employment, career development and support for eligible veterans, retired personnel and unemployed candidates.', 'योग्य पूर्व सैनिकों, सेवानिवृत्त कर्मियों और बेरोज़गार उम्मीदवारों के लिए सम्मानजनक रोज़गार, करियर विकास और सहायता के रास्ते।', 'લાયક પૂર્વ સૈનિકો, નિવૃત્ત કર્મચારીઓ અને બેરોજગાર ઉમેદવારો માટે સન્માનજનક રોજગાર, કારકિર્દી વિકાસ અને સહાયના માર્ગો.'], primary: [['Explore the trust', 'ट्रस्ट के बारे में जानें', 'ટ્રસ્ટ વિશે જાણો'], '/welfare-trust'], secondary: [['Register your interest', 'अपनी रुचि दर्ज करें', 'તમારો રસ નોંધાવો'], '/careers'] },
  { img: recruitment, alt: ['Recruiter meeting two job candidates', 'दो उम्मीदवारों से मिलती भर्तीकर्ता', 'બે ઉમેદવારોને મળતી ભરતીકર્તા'], eyebrow: ['EMPLOYMENT OPPORTUNITIES', 'रोज़गार के अवसर', 'રોજગારની તકો'], title: ['Your experience. Your skills. Your next opportunity.', 'आपका अनुभव। आपके कौशल। आपका अगला अवसर।', 'તમારો અનુભવ. તમારી કુશળતા. તમારી આગલી તક.'], body: ['Share your profile for suitable roles with MSS and participating employers. Registration is free and is not a job guarantee.', 'MSS और सहभागी नियोक्ताओं के उपयुक्त पदों के लिए अपनी जानकारी साझा करें। पंजीकरण निःशुल्क है और नौकरी की गारंटी नहीं है।', 'MSS અને સહભાગી નોકરીદાતાઓની યોગ્ય ભૂમિકાઓ માટે તમારી માહિતી આપો. નોંધણી મફત છે અને નોકરીની ખાતરી નથી.'], primary: [['Find opportunities', 'अवसर खोजें', 'તકો શોધો'], '/careers'], secondary: [['Join the employment network', 'रोज़गार नेटवर्क से जुड़ें', 'રોજગાર નેટવર્કમાં જોડાઓ'], '/careers'] },
  { img: training, alt: ['Instructor leading a workplace safety class', 'कार्यस्थल सुरक्षा कक्षा लेते प्रशिक्षक', 'કાર્યસ્થળ સલામતી વર્ગ લેતા પ્રશિક્ષક'], eyebrow: ['TRAINING AND CAREER DEVELOPMENT', 'प्रशिक्षण और करियर विकास', 'તાલીમ અને કારકિર્દી વિકાસ'], title: ['Build skills. Strengthen capability. Advance your career.', 'कौशल बनाएँ। क्षमता बढ़ाएँ। करियर आगे बढ़ाएँ।', 'કુશળતા બનાવો. ક્ષમતા વધારો. કારકિર્દી આગળ વધારો.'], body: ['Planned support in communication, workplace safety, emergency response, supervision and digital literacy through qualified providers.', 'योग्य प्रदाताओं के माध्यम से संवाद, कार्यस्थल सुरक्षा, आपात प्रतिक्रिया, पर्यवेक्षण और डिजिटल साक्षरता में नियोजित सहायता।', 'લાયક પ્રદાતાઓ દ્વારા સંચાર, કાર્યસ્થળ સલામતી, કટોકટી પ્રતિભાવ, દેખરેખ અને ડિજિટલ સાક્ષરતામાં આયોજિત સહાય.'], primary: [['Explore training', 'प्रशिक्षण देखें', 'તાલીમ જુઓ'], '/welfare-trust', 'training'], secondary: [['Express training interest', 'प्रशिक्षण में रुचि बताएँ', 'તાલીમમાં રસ જણાવો'], '/welfare-trust', 'get-involved'] },
  { img: photos[0]?.src ?? security, alt: ['Modern business campus', 'आधुनिक व्यावसायिक परिसर', 'આધુનિક વ્યાપારી પરિસર'], eyebrow: ['PARTNER WITH MSS', 'MSS के साथ साझेदारी', 'MSS સાથે ભાગીદારી'], title: ['Reliable people. Responsible partnerships. Professional security.', 'भरोसेमंद लोग। ज़िम्मेदार साझेदारी। पेशेवर सुरक्षा।', 'ભરોસાપાત્ર લોકો. જવાબદાર ભાગીદારી. વ્યાવસાયિક સુરક્ષા.'], body: ['Connect with MSS to discuss security requirements, suitable workforce solutions and long-term service partnerships.', 'सुरक्षा ज़रूरतों, उपयुक्त कर्मचारी समाधान और दीर्घकालिक साझेदारी पर चर्चा के लिए MSS से जुड़ें।', 'સુરક્ષા જરૂરિયાતો, યોગ્ય કર્મચારી ઉકેલો અને લાંબા ગાળાની ભાગીદારી માટે MSS સાથે જોડાઓ.'], primary: [['Partner with us', 'हमसे साझेदारी करें', 'અમારી સાથે ભાગીદારી કરો'], '/welfare-trust', 'partners'], secondary: [['Get a Quote', 'कोटेशन प्राप्त करें', 'ભાવપત્રક મેળવો'], '/request-quote'] },
  { img: photos[2]?.src ?? recruitment, alt: ['Worker at an Indian workplace', 'भारतीय कार्यस्थल पर कर्मचारी', 'ભારતીય કાર્યસ્થળે કર્મચારી'], eyebrow: ['SUPPORT THE SOCIAL MISSION', 'सामाजिक मिशन का समर्थन करें', 'સામાજિક મિશનને ટેકો આપો'], title: ['Help opportunity reach those who need it.', 'अवसर को ज़रूरतमंदों तक पहुँचाने में मदद करें।', 'તકને જરૂરિયાતમંદો સુધી પહોંચાડવામાં મદદ કરો.'], body: ['Support responsible employment, skills development and eligible welfare programmes through transparent, accountable partnerships.', 'पारदर्शी और जवाबदेह साझेदारी से ज़िम्मेदार रोज़गार, कौशल विकास और योग्य कल्याण कार्यक्रमों का समर्थन करें।', 'પારદર્શક અને જવાબદાર ભાગીદારી દ્વારા જવાબદાર રોજગાર, કૌશલ્ય વિકાસ અને લાયક કલ્યાણ કાર્યક્રમોને ટેકો આપો.'], primary: [['Support the mission', 'मिशन का समर्थन करें', 'મિશનને ટેકો આપો'], '/welfare-trust', 'support'], secondary: [['Explore our impact', 'हमारा प्रभाव देखें', 'અમારો પ્રભાવ જુઓ'], '/welfare-trust', 'impact'] },
];

export function HeroCarousel({ interval = 6000 }: { interval?: number }) {
  const { t } = useSite();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hover, setHover] = useState(false);
  const [reduced, setReduced] = useState(false);
  const touch = useRef<number | null>(null);
  const n = slides.length;
  const go = useCallback((k: number) => setI(((k % n) + n) % n), [n]);
  useEffect(() => { const m = window.matchMedia('(prefers-reduced-motion: reduce)'); setReduced(m.matches); }, []);
  useEffect(() => {
    if (paused || hover || reduced) return;
    const id = window.setTimeout(() => setI(x => (x + 1) % n), interval);
    return () => window.clearTimeout(id);
  }, [i, paused, hover, reduced, interval, n]);
  const s = slides[i];
  if (!s) return null;
  const cta = ([label, to, hash]: [Words, To, string?], variant: 'secondary' | 'heroOutline') => <Button asChild variant={variant}><Link to={to} {...(hash ? { hash } : {})}>{t(label)}<ArrowUpRight /></Link></Button>;
  return (
    <section className="carousel" aria-roledescription="carousel" aria-label={t(['Highlights', 'मुख्य बातें', 'મુખ્ય બાબતો'])}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onFocus={() => setHover(true)} onBlur={() => setHover(false)}
      onTouchStart={e => { touch.current = e.touches[0]?.clientX ?? null; }}
      onTouchEnd={e => { const start = touch.current; const end = e.changedTouches[0]?.clientX; if (start != null && end != null && Math.abs(end - start) > 40) go(i + (end < start ? 1 : -1)); touch.current = null; }}>
      {slides.map((sl, k) => <img key={k} src={sl.img} alt={k === i ? t(sl.alt) : ''} aria-hidden={k !== i} className={`carousel-img${k === i ? ' is-active' : ''}`} width={1600} height={912} loading={k === 0 ? 'eager' : 'lazy'} fetchPriority={k === 0 ? 'high' : 'low'} decoding="async" />)}
      <div className="carousel-shade" />
      <div className="container carousel-content" key={i} aria-live={paused ? 'polite' : 'off'}>
        <span className="eyebrow">{t(s.eyebrow)}</span>
        <h1>{t(s.title)}</h1>
        <p>{t(s.body)}</p>
        <div className="hero-actions">{cta(s.primary, 'secondary')}{cta(s.secondary, 'heroOutline')}</div>
      </div>
      <div className="container carousel-controls">
        <div className="carousel-dots" role="group" aria-label={t(['Choose slide', 'स्लाइड चुनें', 'સ્લાઇડ પસંદ કરો'])}>
          {slides.map((sl, k) => <Button variant="ghost" key={k} type="button" className={k === i ? 'is-active' : ''} aria-label={`${k + 1} / ${n}: ${t(sl.eyebrow)}`} aria-current={k === i} onClick={() => go(k)} />)}
        </div>
        <div className="carousel-buttons">
          <Button variant="ghost" type="button" onClick={() => go(i - 1)} aria-label={t(['Previous slide', 'पिछली स्लाइड', 'પાછલી સ્લાઇડ'])}><ChevronLeft /></Button>
          <Button variant="ghost" type="button" onClick={() => setPaused(p => !p)} aria-label={t(paused ? ['Play slides', 'स्लाइड चलाएँ', 'સ્લાઇડ ચલાવો'] : ['Pause slides', 'स्लाइड रोकें', 'સ્લાઇડ રોકો'])}>{paused ? <Play /> : <Pause />}</Button>
          <Button variant="ghost" type="button" onClick={() => go(i + 1)} aria-label={t(['Next slide', 'अगली स्लाइड', 'આગલી સ્લાઇડ'])}><ChevronRight /></Button>
        </div>
      </div>
    </section>
  );
}
