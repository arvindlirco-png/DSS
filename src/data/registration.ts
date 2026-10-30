import {bi, type Text} from './site';

export type RegistrationField = {id:string; label:Text; type?:string; required?:boolean; options?:Text[]};
const choices=(items:string[][])=>items.map(([gu,en])=>bi(gu,en));
export const registrationTitle=bi('પરિવાર નોંધણી ફોર્મ','Family registration form');
export const familyFields:RegistrationField[]=[
 {id:'familyId',label:bi('પરિવાર ID (હોય તો)','Family ID (if assigned)')},
 {id:'receipt',label:bi('સભ્યપદ / પહોંચ નંબર','Membership / Receipt No.')},
 {id:'village',label:bi('કચ્છનું મૂળ ગામ','Original Kutch village'),required:true},
 {id:'taluka',label:bi('કચ્છનો તાલુકો','Taluka in Kutch'),required:true,options:choices([['અબડાસા','Abdasa'],['અંજાર','Anjar'],['ભચાઉ','Bhachau'],['ભુજ','Bhuj'],['ગાંધીધામ','Gandhidham'],['લખપત','Lakhpat'],['માંડવી','Mandvi'],['મુન્દ્રા','Mundra'],['નખત્રાણા','Nakhatrana'],['રાપર','Rapar']])},
 {id:'address',label:bi('હાલનું સરનામું','Present address'),type:'textarea',required:true},
 {id:'mobile',label:bi('પરિવારનો મોબાઇલ નંબર','Family mobile number'),type:'tel',required:true},
 {id:'email',label:bi('પરિવારનું ઈમેલ સરનામું','Family email address'),type:'email'},
 {id:'housing',label:bi('પોતાનું / ભાડાનું મકાન','Own house / Rented house'),options:choices([['પોતાનું','Owned'],['ભાડાનું','Rented'],['અન્ય','Other']])},
 {id:'notes',label:bi('વિશેષ નોંધ','Special notes'),type:'textarea'},
];
export const personFields:RegistrationField[]=[
 {id:'name',label:bi('પૂરું નામ','Full name'),required:true},
 {id:'relationship',label:bi('પરિવારના વડા સાથે સંબંધ','Relationship with head of family'),required:true,options:choices([['પોતે (પરિવારના વડા)','Self (head of family)'],['જીવનસાથી','Spouse'],['પુત્ર','Son'],['પુત્રી','Daughter'],['પિતા','Father'],['માતા','Mother'],['ભાઈ','Brother'],['બહેન','Sister'],['પુત્રવધૂ','Daughter-in-law'],['જમાઈ','Son-in-law'],['પૌત્ર / દોહિત્ર','Grandson'],['પૌત્રી / દોહિત્રી','Granddaughter'],['અન્ય','Other']])},
 {id:'gender',label:bi('જાતિ','Gender'),options:choices([['પુરુષ','Male'],['સ્ત્રી','Female'],['અન્ય','Other'],['જણાવવા ઇચ્છતા નથી','Prefer not to say']])},
 {id:'dob',label:bi('જન્મ તારીખ','Date of birth'),type:'date'},
 {id:'marital',label:bi('વૈવાહિક સ્થિતિ','Marital status'),options:choices([['અપરિણીત','Single'],['પરિણીત','Married'],['વિધવા / વિધુર','Widowed'],['છૂટાછેડા લીધેલ','Divorced'],['અલગ રહે છે','Separated']])},
 {id:'anniversary',label:bi('લગ્નની તારીખ (વૈકલ્પિક)','Wedding anniversary (optional)'),type:'date'},
 {id:'mobile',label:bi('મોબાઇલ નંબર','Mobile number'),type:'tel'},
 {id:'email',label:bi('ઈમેલ સરનામું','Email address'),type:'email'},
 {id:'blood',label:bi('બ્લડ ગ્રુપ (વૈકલ્પિક)','Blood group (optional)'),options:['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(x=>bi(x,x)).concat([bi('ખબર નથી','Unknown')])},
 {id:'qualification',label:bi('સૌથી ઉચ્ચ શૈક્ષણિક લાયકાત','Highest qualification'),options:choices([['પ્રાથમિક','Primary'],['માધ્યમિક','Secondary'],['ઉચ્ચતર માધ્યમિક','Higher secondary'],['ડિપ્લોમા / ITI','Diploma / ITI'],['સ્નાતક','Graduate'],['અનુસ્નાતક','Postgraduate'],['ડોક્ટરેટ','Doctorate'],['અન્ય','Other']])},
 {id:'course',label:bi('અભ્યાસક્રમ / વિશેષતા','Course / Specialisation')},
 {id:'studying',label:bi('હાલ અભ્યાસ કરે છે?','Presently studying?'),options:choices([['હા','Yes'],['ના','No']])},
 {id:'occupation',label:bi('વ્યવસાયનો પ્રકાર','Occupation category'),options:choices([['વેપાર','Business'],['નોકરી','Salaried'],['સ્વતંત્ર વ્યવસાય','Professional / Self-employed'],['ખેતી','Agriculture'],['વિદ્યાર્થી','Student'],['ગૃહિણી / ગૃહકાર્ય','Homemaker'],['નિવૃત્ત','Retired'],['હાલ કાર્યરત નથી','Not currently working'],['અન્ય','Other']])},
 {id:'employer',label:bi('વેપાર / વ્યવસાય / નોકરીદાતાનું નામ','Business / Profession / Employer name')},
 {id:'business',label:bi('વ્યવસાય / ઉત્પાદનો / સેવાઓની વિગતો','Nature of business / Products / Services'),type:'textarea'},
 {id:'skills',label:bi('કુશળતા અને વિશેષ જ્ઞાન','Skills and special knowledge'),type:'textarea'},
 {id:'awards',label:bi('સિદ્ધિઓ / પુરસ્કારો','Achievements / Awards'),type:'textarea'},
 {id:'hobbies',label:bi('શોખ અને રસ','Hobbies and interests')},
 {id:'serve',label:bi('સમાજ સેવા કરવા ઇચ્છુક છો?','Willing to serve Samaj?'),options:choices([['હા','Yes'],['ના','No']])},
];
