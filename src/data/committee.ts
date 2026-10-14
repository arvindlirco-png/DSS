import {bi, pending, type Text} from './site';
export type Person = {name:Text; role:Text; group:'office'|'finance'|'other'; responsibility:Text; photo:string; phone:string; publicPhone:boolean};
const names = [
 ['નરેન્દ્રભાઈ ભગત','Narendrabhai Bhagat','પ્રમુખ શ્રી','President'],
 ['ધર્મેન્દ્રભાઈ દિવાણી','Dharmendrabhai Diwani','ઉપ પ્રમુખ','Vice President'],
 ['ઈશ્ર્વરભાઈ ભોજાણી','Ishwarbhai Bhojani','ઉપ પ્રમુખ','Vice President'],
 ['અરવિંદભાઈ લીંબાણી','Arvindbhai Limbani','મંત્રી શ્રી','Secretary'],
 ['તુષારભાઈ માકાણી','Tusharbhai Makani','સહ મંત્રી','Joint Secretary'],
 ['હષૅદભાઈ ચોપડા','Harshadbhai Chopda','સહ મંત્રી','Joint Secretary'],
 ['રીતેશભાઈ માવાણી','Riteshbhai Mavani','ખજાનચી શ્રી','Treasurer'],
 ['ભરતભાઈ દિવાણી','Bharatbhai Diwani','સહખજાનચી','Joint Treasurer'],
 ['રસીકભાઇ ગોગારી','Rasikbhai Gogari'],['ભૌતિકભાઈ સુરાણી','Bhautikbhai Surani'],['કિર્તીભાઈ રૈયાણી','Kirtibhai Raiyani'],['નરેન્દ્રભાઈ વાડીયા','Narendrabhai Wadiya'],['પ્રકાસભાઈ ભગત','Prakashbhai Bhagat'],['યોગેશભાઈ પોકાર','Yogeshbhai Pokar'],['મુકેશભાઈ ચોપડા','Mukeshbhai Chopda','સંસ્કૃતિ મંત્રી','Sanskruti Mantri'],['વસંતભાઈ ધોળું','Vasantbhai Dholu','સહ સંસ્કૃતિ મંત્રી','Saha Sanskruti Mantri'],
];
export const committee:Person[] = names.map((n,i)=>({name:bi(n[0],n[1]),role:n[2]?bi(n[2],n[3]):bi('નાણા કમીટી','Finance Committee'),group:i<8?'office':i<14?'finance':'other',responsibility:pending,photo:'',phone:'',publicPhone:false}));
export const committeeNote = bi('આપેલી 16 સભ્યોની યાદી મુજબ. કાર્યકાળ અને સત્તાવાર મંજૂરીની વિગતો બાકી છે. અંગ્રેજી નામો તથા છેલ્લાં બે નામોના ગુજરાતી લખાણની પુષ્ટિ જરૂરી છે.','Based on the supplied list of 16 people. Term and official approval details are pending. English transliterations and the Gujarati spellings of the final two names require confirmation.');
export const groups = {office:bi('હોદ્દેદારો','Office bearers'),finance:bi('નાણા કમીટી','Finance Committee'),other:bi('અન્ય સભ્યો','Other members')};
export const eventCommittees: {name:Text; members:Text[]}[] = [];
