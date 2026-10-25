import {FileText} from 'lucide-react';
import {directoryText as copy} from './data/directory';
import {type Lang,type Text} from './data/site';
export function MemberDirectory({lang}:{lang:Lang}) {
 const t=(text:Text)=>text[lang];
 return <><div className="page-head"><span className="eyebrow"><FileText size={17}/> {t(copy.public)}</span><h1>{t(copy.title)}</h1><p>{t(copy.intro)}</p></div><section className="card directory-access"><FileText size={35}/><h2>{t(copy.comingSoon)}</h2></section></>;
}
