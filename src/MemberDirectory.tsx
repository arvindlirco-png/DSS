import {FileText} from 'lucide-react';
import {directoryText as copy} from './data/directory';
import {ui,type Lang,type Text} from './data/site';
export function MemberDirectory({lang}:{lang:Lang}) {
 const t=(text:Text)=>text[lang];
 const pdf='documents/member-directory.pdf';
 return <><div className="page-head"><span className="eyebrow"><FileText size={17}/> {t(copy.public)}</span><h1>{t(copy.title)}</h1><p>{t(copy.intro)}</p></div><section className="card directory-access"><FileText size={35}/><p>{t(copy.note)}</p><div className="actions"><a className="button" href={pdf} target="_blank" rel="noopener noreferrer">{t(ui.view)}</a><a className="button secondary" href={pdf} download>{t(ui.download)}</a></div></section></>;
}
