import {useEffect,useState} from 'react';
import {LockKeyhole,FileText} from 'lucide-react';
import {directoryText as copy} from './data/directory';
import {ui,type Lang,type Text} from './data/site';

export function MemberDirectory({lang}:{lang:Lang}) {
 const t=(text:Text)=>text[lang];
 const [authenticated,setAuthenticated]=useState(false);
 const [password,setPassword]=useState('');
 const [busy,setBusy]=useState(true);
 const [error,setError]=useState<Text|null>(null);
 useEffect(()=>{
  let active=true;
  const check=()=>fetch('/api/member-directory/session',{cache:'no-store'}).then(async response=>{
   if(!response.ok)throw new Error();
   const value=await response.json();
   if(active)setAuthenticated(value.authenticated===true);
  }).catch(()=>{if(active){setAuthenticated(false);setError(copy.unavailable)}}).finally(()=>{if(active)setBusy(false)});
  check();const timer=window.setInterval(check,30000);
  return ()=>{active=false;window.clearInterval(timer)};
 },[]);
 async function unlock(e:React.FormEvent) {
  e.preventDefault();setBusy(true);setError(null);
  try {
   const response=await fetch('/api/member-directory/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({password})});
   if(response.ok){setAuthenticated(true);setPassword('')}
   else setError(response.status===401?copy.wrong:response.status===429?copy.limited:copy.unavailable);
  }catch{setError(copy.unavailable)}finally{setBusy(false)}
 }
 async function lock() {
  setBusy(true);setError(null);
  try {const response=await fetch('/api/member-directory/session',{method:'DELETE'});if(!response.ok)throw new Error();setAuthenticated(false);setPassword('')}
  catch{setError(copy.unavailable)}finally{setBusy(false)}
 }
 return <><div className="page-head"><span className="eyebrow"><LockKeyhole size={17}/> {t(copy.protected)}</span><h1>{t(copy.title)}</h1><p>{t(copy.intro)}</p></div><section className="card directory-access">
 {error&&<p role="alert" className="notice-bar">{t(error)}</p>}
 {authenticated?<><FileText size={35}/><h2>{t(copy.unlocked)}</h2><p>{t(copy.session)}</p><div className="actions"><a className="button" href="/api/member-directory/pdf" target="_blank" rel="noopener noreferrer">{t(ui.view)}</a><a className="button secondary" href="/api/member-directory/pdf?download=1">{t(ui.download)}</a><button className="button secondary" onClick={lock} disabled={busy}>{t(copy.lock)}</button></div></>:
 <form onSubmit={unlock}><label htmlFor="directory-password">{t(copy.password)}<input id="directory-password" type="password" autoComplete="current-password" required maxLength={128} value={password} onChange={e=>setPassword(e.target.value)}/></label><button className="button" type="submit" disabled={busy}>{t(busy?copy.checking:copy.unlock)}</button></form>}
 </section></>;
}
