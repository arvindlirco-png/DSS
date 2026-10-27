import {bi, pending, type Text} from './site';
export type Person = {name:Text; role:Text; group:'office'|'finance'|'other'; responsibility:Text; photo:string; phone:string; publicPhone:boolean};
const names = [
 ['નરેન્દ્રભાઈ ભગત','Narendrabhai Bhagat','પ્રમુખ શ્રી','President'],
 ['ધર્મેન્દ્રભાઈ દિવાણી','Dharmendrabhai Diwani','ઉપ પ્રમુખ','Vice President'],
 ['ઈશ્ર્વરભાઈ ભોજાણી','Ishwarbhai Bhojani','ઉપ પ્રમુખ','Vice President'],
 ['અરવિંદભાઈ લીંબાણી','Arvindbhai Limbani','મંત્રી શ્રી','Secretary'],
 ['હષૅદભાઈ ચોપડા','Harshadbhai Chopda','સહ મંત્રી','Joint Secretary'],
 ['રીતેશભાઈ માવાણી','Riteshbhai Mavani','ખજાનચી શ્રી','Treasurer'],
 ['ભરતભાઈ દિવાણી','Bharatbhai Diwani','સહખજાનચી','Joint Treasurer'],
 ['દિનેશભાઈ રંગાણી','Dineshbhai Rangani','સંસ્કૃતિ મંત્રી','Sanskruti Mantri'],
 ['રસીકભાઇ ગોગારી','Rasikbhai Gogari'],['ભૌતિકભાઈ સુરાણી','Bhautikbhai Surani'],['કિર્તીભાઈ રૈયાણી','Kirtibhai Raiyani'],['નરેન્દ્રભાઈ વાડીયા','Narendrabhai Wadiya'],['પ્રકાસભાઈ ભગત','Prakashbhai Bhagat'],['યોગેશભાઈ પોકાર','Yogeshbhai Pokar'],
 ['રાધેશ્યામભાઈ પોકાર','Radheyshyambhai Pokar'],['નૈલેશભાઈ પોકાર','Naileshbhai Pokar'],
];
export const committee:Person[] = names.map(n=>({name:bi(n[0],n[1]),role:n[2]?bi(n[2],n[3]):bi('અન્ય સમિતિ સભ્ય','Other Committee Member'),group:n[2]?'office':'other',responsibility:pending,photo:'',phone:'',publicPhone:false}));
export const committeeNote = bi('સુધારેલી સભ્ય યાદી મુજબ. કાર્યકાળ અને સત્તાવાર મંજૂરીની વિગતો બાકી છે.','Based on the updated committee list. Term and official approval details are pending.');
export const groups = {office:bi('હોદ્દેદારો','Office bearers'),finance:bi('નાણા કમીટી','Finance Committee'),other:bi('અન્ય સમિતિ સભ્યો','Other Committee Members')};
export const eventCommittees: {name:Text; members:Text[]}[] = [];
