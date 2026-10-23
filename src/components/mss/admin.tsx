import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/react-start';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Download, RefreshCw, LogOut, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { listEnquiries, updateEnquiry, enquiryHistory } from '@/lib/mss/admin.functions';
import { leadStatuses } from '@/lib/mss/enquiry-schema';
import { csvCell } from '@/lib/mss/admin-schema';
import { useSite } from './site-context';

type Lead = Awaited<ReturnType<typeof listEnquiries>>[number];
function detail(lead: Lead, key: string) {
  const data = lead.details;
  return data && typeof data === 'object' && !Array.isArray(data) ? String(data[key] ?? '') : '';
}

export function Admin() {
  const { t } = useSite();
  const client = useQueryClient(); const navigate = useNavigate();
  const fetchLeads = useServerFn(listEnquiries); const saveLead = useServerFn(updateEnquiry); const fetchHistory = useServerFn(enquiryHistory);
  const query = useQuery({ queryKey: ['mss-enquiries'], queryFn: () => fetchLeads(), retry: false });
  const [search, setSearch] = useState(''); const [status, setStatus] = useState(''); const [kind, setKind] = useState(''); const [sort, setSort] = useState('newest');
  const [selected, setSelected] = useState<Lead | null>(null); const [saving, setSaving] = useState(false); const [message, setMessage] = useState('');
  const history = useQuery({ queryKey: ['mss-history', selected?.id], queryFn: () => selected ? fetchHistory({ data: { id: selected.id } }) : Promise.resolve([]), enabled: Boolean(selected), retry: false });
  const rows = (query.data ?? []).filter(row => (!status || (row.status === 'received' ? 'New' : row.status) === status) && (!kind || row.kind === kind) && [row.reference, row.name, row.phone, row.email, row.city, detail(row, 'organisation')].join(' ').toLowerCase().includes(search.toLowerCase())).sort((a, b) => sort === 'status' ? a.status.localeCompare(b.status) : sort === 'oldest' ? a.created_at.localeCompare(b.created_at) : b.created_at.localeCompare(a.created_at));
  async function signOut() { await client.cancelQueries(); client.clear(); await supabase.auth.signOut(); await navigate({ to: '/auth', replace: true }); }
  async function save() {
    if (!selected) return;
    setSaving(true); setMessage('');
    try {
      await saveLead({ data: { id: selected.id, name: selected.name, phone: selected.phone, email: selected.email ?? '', city: selected.city, status: (leadStatuses.find(s => s === selected.status) ?? 'New'), internal_notes: selected.internal_notes, follow_up_at: selected.follow_up_at ? new Date(selected.follow_up_at).toISOString() : '' } });
      await client.invalidateQueries({ queryKey: ['mss-enquiries'] }); await client.invalidateQueries({ queryKey: ['mss-history'] });
      setMessage(t(['Changes saved', 'बदलाव सहेजे गए', 'ફેરફારો સાચવ્યા']));
    } catch { setMessage(t(['Changes were not saved. Check the fields and retry.', 'बदलाव नहीं सहेजे गए। विवरण जाँचकर दोबारा प्रयास करें।', 'ફેરફારો સાચવાયા નથી. વિગતો તપાસીને ફરી પ્રયાસ કરો.'])); }
    finally { setSaving(false); }
  }
  function exportRows() {
    const fields = ['Reference', 'Name', 'Company', 'Phone', 'Email', 'Location', 'Site type', 'Guards', 'Duty', 'Requirements', 'Received', 'Status', 'Follow-up', 'Internal notes'];
    const csv = [fields, ...rows.map(r => [r.reference,r.name,detail(r,'organisation'),r.phone,r.email,r.city,detail(r,'type'),detail(r,'guards'),detail(r,'duty'),detail(r,'message'),r.created_at,r.status === 'received' ? 'New' : r.status,r.follow_up_at,r.internal_notes])].map(r => r.map(csvCell).join(',')).join('\r\n');
    const url = URL.createObjectURL(new Blob(['\ufeff', csv], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a'); link.href = url; link.download = 'mss-enquiries.csv'; link.click(); URL.revokeObjectURL(url);
  }
  return <section className="admin-workspace"><div className="container"><div className="section-heading"><div><span className="eyebrow">MSS</span><h1>{t(['Enquiries', 'पूछताछ', 'પૂછપરછ'])}</h1></div><Button variant="outline" onClick={signOut}><LogOut/>{t(['Sign out', 'साइन आउट', 'સાઇન આઉટ'])}</Button></div>
    {query.isPending ? <p role="status">{t(['Loading enquiries…', 'पूछताछ लोड हो रही है…', 'પૂછપરછ લોડ થઈ રહી છે…'])}</p> : query.isError ? <div role="alert"><h2>{t(['Access unavailable', 'प्रवेश उपलब्ध नहीं', 'પ્રવેશ ઉપલબ્ધ નથી'])}</h2><p>{t(['An authorised MSS account is required. No customer records are shown.', 'अधिकृत MSS खाता आवश्यक है। कोई ग्राहक रिकॉर्ड नहीं दिखाया गया है।', 'અધિકૃત MSS ખાતું જરૂરી છે. કોઈ ગ્રાહક રેકોર્ડ દર્શાવાયા નથી.'])}</p><Button variant="outline" onClick={() => query.refetch()}><RefreshCw/>{t(['Retry', 'फिर प्रयास करें', 'ફરી પ્રયાસ કરો'])}</Button></div> : <>
    <div className="admin-toolbar"><input aria-label="Search enquiries" placeholder={t(['Search name, phone or reference', 'नाम, फ़ोन या संदर्भ खोजें', 'નામ, ફોન કે સંદર્ભ શોધો'])} value={search} onChange={e => setSearch(e.target.value)}/><select aria-label="Lead status filter" value={status} onChange={e => setStatus(e.target.value)}><option value="">{t(['All statuses','सभी स्थितियाँ','બધી સ્થિતિઓ'])}</option>{leadStatuses.map(s => <option key={s}>{s}</option>)}</select><select aria-label="Enquiry type" value={kind} onChange={e => setKind(e.target.value)}><option value="">{t(['All types','सभी प्रकार','બધા પ્રકાર'])}</option>{['quote','contact','career','complaint','partner','support'].map(k => <option key={k}>{k}</option>)}</select><select aria-label="Sort enquiries" value={sort} onChange={e => setSort(e.target.value)}><option value="newest">Newest first</option><option value="oldest">Oldest first</option><option value="status">Status</option></select><Button variant="outline" onClick={() => query.refetch()} aria-label="Refresh enquiries" title="Refresh"><RefreshCw/></Button><Button variant="outline" onClick={exportRows} disabled={!rows.length}><Download/>{t(['Export CSV','CSV डाउनलोड','CSV ડાઉનલોડ'])}</Button></div>
    <p>{rows.length} {t(['records · showing up to 1,000 recent enquiries','रिकॉर्ड · नवीनतम 1,000 पूछताछ तक','રેકોર્ડ · તાજેતરની 1,000 પૂછપરછ સુધી'])}</p><div className="admin-table-wrap"><table className="admin-table"><thead><tr>{['Reference','Received','Contact','Location','Type','Status','Follow-up'].map(h => <th key={h}>{h}</th>)}</tr></thead><tbody>{rows.map(row => <tr key={row.id}><td><Button variant="link" onClick={() => {setSelected({...row,status:row.status==='received'?'New':row.status});setMessage('');}}>{row.reference}</Button></td><td>{new Date(row.created_at).toLocaleString()}</td><td>{row.name}<br/>{row.phone}</td><td>{row.city}</td><td>{row.kind}</td><td>{row.status==='received'?'New':row.status}</td><td>{row.follow_up_at ? new Date(row.follow_up_at).toLocaleString() : '—'}</td></tr>)}</tbody></table></div>{!rows.length && <p>{t(['No matching enquiries','कोई मेल खाती पूछताछ नहीं','કોઈ મેળ ખાતી પૂછપરછ નથી'])}</p>}
    {selected && <div className="admin-detail"><div className="section-heading"><h2>{selected.reference}</h2><Button variant="ghost" size="icon" aria-label="Close enquiry" onClick={() => setSelected(null)}><X/></Button></div><dl className="review-list">{['organisation','type','guards','duty','role','experience','message'].map(key => <div key={key}><dt>{key}</dt><dd>{detail(selected,key)||'—'}</dd></div>)}</dl><div className="admin-grid">{(['name','phone','email','city','internal_notes'] as const).map(key => <label className={`field ${key==='internal_notes'?'full':''}`} key={key}>{key.replaceAll('_',' ')}{key==='internal_notes'?<textarea value={selected[key]} onChange={e => setSelected({...selected,[key]:e.target.value})}/>:<input value={selected[key]??''} onChange={e => setSelected({...selected,[key]:e.target.value})}/>}</label>)}<label className="field">Status<select value={selected.status} onChange={e => setSelected({...selected,status:e.target.value})}>{leadStatuses.map(s => <option key={s}>{s}</option>)}</select></label><label className="field">Follow-up (local time)<input type="datetime-local" value={selected.follow_up_at ? new Date(new Date(selected.follow_up_at).getTime()-new Date(selected.follow_up_at).getTimezoneOffset()*60000).toISOString().slice(0,16) : ''} onChange={e => setSelected({...selected,follow_up_at:e.target.value ? new Date(e.target.value).toISOString() : null})}/></label></div><div className="form-actions"><Button onClick={save} disabled={saving}><Save/>{t(['Save changes','बदलाव सहेजें','ફેરફારો સાચવો'])}</Button><Button asChild variant="outline"><a href={`tel:${selected.phone}`}>{t(['Call contact','संपर्क को फ़ोन करें','સંપર્કને ફોન કરો'])}</a></Button></div>{message && <p role="status">{message}</p>}<h3 className="mt-6">{t(['Change history','बदलाव का इतिहास','ફેરફારનો ઇતિહાસ'])}</h3>{history.isError?<p role="alert">History could not be loaded.</p>:history.data?.map(h => <p key={h.id}>{new Date(h.created_at).toLocaleString()} · {h.old_status} → {h.new_status} · {h.change_summary}</p>)}</div>}</>}
  </div></section>;
}