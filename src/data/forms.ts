import {bi} from './site';
export const fields = [
 {id:'name',label:bi('પૂરું નામ','Full name'),type:'text',required:true,autoComplete:'name'},
 {id:'relative',label:bi('પિતા / જીવનસાથીનું નામ','Father’s / spouse’s name'),type:'text',required:true},
 {id:'mobile',label:bi('મોબાઇલ નંબર','Mobile number'),type:'tel',required:true,autoComplete:'tel'},
 {id:'email',label:bi('ઈમેલ (વૈકલ્પિક)','Email (optional)'),type:'email',required:false,autoComplete:'email'},
 {id:'dob',label:bi('જન્મ તારીખ (વૈકલ્પિક)','Date of birth (optional)'),type:'date',required:false},
 {id:'address',label:bi('સરનામું','Address'),type:'text',required:true,autoComplete:'street-address'},
 {id:'society',label:bi('સોસાયટી / વિસ્તાર','Society / area'),type:'text',required:true},
 {id:'occupation',label:bi('વ્યવસાય','Occupation'),type:'text',required:true},
 {id:'family',label:bi('પરિવારના સભ્યોની સંખ્યા','Family-member count'),type:'number',required:true},
];
export const formLabels = {title:bi('સભ્યપદ પૂછપરછ','Membership enquiry'),contactTitle:bi('સંપર્ક ફોર્મ','Contact form'),message:bi('તમારો સંદેશ','Your message'),consent:bi('મારી માહિતીનો આ પૂછપરછ માટે ઉપયોગ કરવા હું સંમતિ આપું છું.','I consent to the use of my information for this enquiry.'),category:bi('સભ્યપદ શ્રેણી','Membership category'),family:bi('પરિવાર સભ્યપદ (પ્રસ્તાવિત)','Family membership (proposed)'),required:bi('* જરૂરી વિગતો','* Required fields'),mobileHelp:bi('10 અંકનો ભારતીય મોબાઇલ નંબર; +91 વૈકલ્પિક.','10-digit Indian mobile number; optional +91 prefix.'),address:bi('કાર્યાલયનું સરનામું','Office address'),phone:bi('જાહેર ફોન નંબર','Public phone number'),email:bi('ઈમેલ','Email'),hours:bi('કાર્યાલય સમય','Office hours'),maps:bi('નકશાનું સ્થાન બાકી છે','Map location to be updated'),social:bi('સોશિયલ મીડિયા','Social media'),persons:bi('મુખ્ય સંપર્ક વ્યક્તિઓ','Key contact persons'),formDownload:bi('છાપી શકાય તેવું ફોર્મ','Printable form')};
