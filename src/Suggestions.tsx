import {useState} from 'react';
import {bi,ui,type Lang,type Text} from './data/site';
import {formLabels} from './data/forms';
import {FormDelivery,formEndpoint,deliveryNote,sendLabel} from './FormDelivery';

export const suggestionTitle=bi('સૂચનો','Suggestions');
const copy={
 intro:bi('સમાજ માટે નવા કાર્યક્રમો અને સુધારાના તમારા વિચારો જણાવો.','Share your ideas for community events and improvements.'),
 form:bi('તમારું સૂચન','Your suggestion'),
 name:bi('તમારું નામ','Your name'),
 email:bi('ઈમેલ (વૈકલ્પિક)','Email (optional)'),
 category:bi('સૂચનનો પ્રકાર','Suggestion type'),
 event:bi('નવો કાર્યક્રમ','New event'),
 general:bi('સામાન્ય સૂચન','General suggestion'),
 website:bi('વેબસાઇટ સુધારો','Website improvement'),
 service:bi('સમાજની સેવાઓ','Community services'),
 eventType:bi('કાર્યક્રમનો પ્રકાર','Event type'),
 choose:bi('પસંદ કરો','Select an option'),
 title:bi('સૂચનનું શીર્ષક','Suggestion title'),
 details:bi('તમારો વિચાર વિગતવાર જણાવો','Describe your idea'),
 date:bi('સૂચિત તારીખ (વૈકલ્પિક)','Preferred date (optional)'),
 venue:bi('સૂચિત સ્થળ (વૈકલ્પિક)','Suggested venue (optional)'),
 help:bi('કાર્યક્રમનો હેતુ, કોના માટે છે અને આયોજન વિશે જણાવો.','Tell us the purpose, who it is for, and how it could be organised.'),
 required:bi('* દર્શાવેલ માહિતી જરૂરી છે.','Fields marked * are required.'),
};
const eventTypes=[
 ['cultural',bi('સાંસ્કૃતિક કાર્યક્રમ અને તહેવાર','Cultural programme & festival')],
 ['gathering',bi('સ્નેહમિલન અને પરિવાર મેળાવડો','Sneh Milan & family gathering')],
 ['education',bi('શિક્ષણ અને કારકિર્દી માર્ગદર્શન','Education & career guidance')],
 ['health',bi('આરોગ્ય શિબિર','Health camp')],
 ['sports',bi('રમતગમત','Sports & recreation')],
 ['service',bi('સમાજ સેવા','Community service')],
 ['youth',bi('યુવા અને બાળકોના કાર્યક્રમો','Youth & children’s activities')],
 ['other',bi('અન્ય','Other')],
] as const;

export function Suggestions({lang}:{lang:Lang}){
 const t=(text:Text)=>text[lang];
 const [category,setCategory]=useState('event');
 return <>
  <div className="page-head"><h1>{t(suggestionTitle)}</h1><p>{t(copy.intro)}</p></div>
  <form className="enquiry card" action={formEndpoint} method="POST">
   <FormDelivery subject="Samaj Suggestion"/>
   <h2>{t(copy.form)}</h2>
   <p className="notice-bar">{t(deliveryNote)}</p><p>{t(copy.required)}</p>
   <div className="form-grid">
    <label>{t(copy.name)} *<input name="name" required autoComplete="name" maxLength={150} pattern={'.*\\S.*'}/></label>
    <label>{t(copy.email)}<input name="email" type="email" autoComplete="email" maxLength={254}/></label>
    <label>{t(copy.category)} *<select name="category" value={category} onChange={e=>setCategory(e.target.value)}>{[['event',copy.event],['general',copy.general],['website',copy.website],['service',copy.service]].map(([value,label])=><option key={value as string} value={value as string}>{t(label as Text)}</option>)}</select></label>
    {category==='event'&&<label>{t(copy.eventType)} *<select name="eventType" required defaultValue=""><option value="" disabled>{t(copy.choose)}</option>{eventTypes.map(([value,label])=><option key={value} value={value}>{t(label)}</option>)}</select></label>}
    {category==='event'&&<><label>{t(copy.date)}<input name="date" type="date"/></label><label>{t(copy.venue)}<input name="venue" maxLength={250}/></label></>}
   </div>
   <label>{t(copy.title)} *<input name="title" required maxLength={200} pattern={'.*\\S.*'}/></label>
   <label>{t(copy.details)} *<textarea name="details" required minLength={10} maxLength={3000} aria-describedby="suggestion-help"/></label>
   <p id="suggestion-help">{t(copy.help)}</p>
   <label className="checkbox"><input type="checkbox" name="consent" value="Yes" required/>{t(formLabels.consent)}</label>
   <div className="actions"><button className="button secondary" type="button" onClick={e=>e.currentTarget.form?.reportValidity()}>{t(ui.validate)}</button><button className="button" type="submit">{t(sendLabel)}</button></div>
  </form>
 </>;
}
