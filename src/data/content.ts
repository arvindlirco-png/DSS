import {bi,pending} from './site';
export const objectives = [
 ['શિક્ષણ','Education','પુસ્તકો, શિષ્યવૃત્તિ અને કારકિર્દી માર્ગદર્શનથી વિદ્યાર્થીઓને સહાય.','Supporting students through books, scholarships and career guidance.','book'],
 ['આરોગ્ય','Health','આરોગ્ય જાગૃતિ, રક્તદાન અને તબીબી સહાય માટે પ્રયત્નો.','Promoting health awareness, blood donation and medical assistance.','heart'],
 ['સંસ્કૃતિ','Culture','કલા, સંગીત, સાહિત્ય અને ભારતીય પરંપરાઓનું સંવર્ધન.','Nurturing art, music, literature and Indian traditions.','sparkles'],
 ['ધાર્મિક અને આધ્યાત્મિક પ્રવૃત્તિ','Faith & spirituality','સત્સંગ, યોગ, ધ્યાન અને મૂલ્યશિક્ષણ દ્વારા સંસ્કારનું સિંચન.','Encouraging shared values through satsang, yoga and meditation.','sun'],
 ['રમતગમત','Sports','રમત અને શારીરિક તંદુરસ્તી દ્વારા સ્વસ્થ જીવનને પ્રોત્સાહન.','Encouraging active lives through sport and physical fitness.','trophy'],
 ['પર્યાવરણ','Environment','વૃક્ષારોપણ, જળસંરક્ષણ અને સ્વચ્છતા માટે જાગૃતિ.','Supporting tree planting, water conservation and cleanliness.','leaf'],
 ['સામાજિક સહાય','Social assistance','જરૂરિયાતમંદ પરિવારો, વૃદ્ધો અને દિવ્યાંગોને સહકાર.','Supporting families in need, older people and people with disabilities.','heart'],
 ['આપત્તિ સહાય','Disaster assistance','આપત્તિ સમયે રાહત અને પુનર્વસન માટે સહયોગ.','Cooperating in relief and rehabilitation during disasters.','heart'],
 ['યુવા વિકાસ','Youth development','કૌશલ્ય, નેતૃત્વ અને સેવાભાવને પ્રોત્સાહન.','Encouraging skills, leadership and community service.','users'],
 ['મહિલા વિકાસ','Women’s development','શિક્ષણ, કૌશલ્ય અને ભાગીદારી માટે તક.','Encouraging education, skills and participation.','users'],
 ['લગ્નવિષયક સહાય','Matrimonial support','સંમતિ અને ગોપનીયતા સાથે પરિવાર પરિચય.','Facilitating family introductions with consent and privacy.','users'],
 ['વ્યવસાયિક સંપર્ક','Professional networking','વ્યવસાય અને કારકિર્દી માટે અનુભવની આપલે.','Sharing experience for business and professional growth.','briefcase'],
 ['કાનૂની જાગૃતિ','Legal awareness','અધિકારો અને જવાબદારીઓ વિશે જાગૃતિ.','Building awareness of rights and responsibilities.','book'],
 ['કૃષિ અને કૃષિ વ્યવસાય','Agriculture & agro-business','ખેતી અને કૃષિ વ્યવસાય વિશે જ્ઞાનની આપલે.','Exchanging knowledge about farming and agro-business.','leaf'],
 ['વિજ્ઞાન અને ટેકનોલોજી','Science & technology','ડિજિટલ શિક્ષણ અને સાયબર સુરક્ષા વિશે જાગૃતિ.','Encouraging digital learning and cyber-security awareness.','sparkles'],
 ['વ્યસન જાગૃતિ','Addiction awareness','સ્વસ્થ આદતો અને સહાય વિશે જાગૃતિ.','Promoting healthy habits and awareness of support.','heart'],
 ['પરિવાર માર્ગદર્શન','Family guidance','સંવાદ, પરામર્શ અને પરસ્પર સમજને પ્રોત્સાહન.','Encouraging dialogue, counselling and understanding.','users'],
 ['પ્રવાસ','Community tours','સમુદાય સાથે સાંસ્કૃતિક અને શૈક્ષણિક પ્રવાસ.','Exploring cultural and educational places together.','sun'],
].map(([gu,en,dgu,den,icon])=>({title:bi(gu,en),description:bi(dgu,den),icon}));
export const objectiveNote = bi('પ્રવૃત્તિના પ્રસ્તાવિત ક્ષેત્રો: આપેલા બંધારણના મુસદ્દા અને વેબસાઇટની સૂચના પરથી. આ ચાલુ સેવાઓની જાહેરાત નથી.','Proposed activity areas based on the draft deed and website brief. These are not announcements of operating services.');
export const aboutSections = [
 {title:bi('પરિચય','Introduction'),body:bi('સમાજનો હેતુ દહેગામના પરિવારોમાં એકતા, સંસ્કૃતિ અને સેવાભાવને પ્રોત્સાહિત કરવાનો છે. આપેલા સંસ્થાપન મુસદ્દામાં શિક્ષણ, આરોગ્ય, સામાજિક સહાય અને પરંપરાના સંવર્ધનનો સમાવેશ થાય છે.','The Samaj aims to encourage unity, culture and service among Dehgam families. The supplied founding draft includes education, health, social assistance and preservation of traditions.')},
 {title:bi('ઇતિહાસ અને સ્થાપના','History & formation'),body:pending},
 {title:bi('શહેરસ્તરીય સમાજની જરૂરિયાત','A city-level community'),body:bi('સ્થાનિક પરિવારોને જોડવા અને સહિયારી પ્રવૃત્તિઓ માટે એક મંચની પ્રસ્તાવિત ભૂમિકા.','A proposed shared platform connecting local families and supporting collective activities.')},
 {title:bi('દ્રષ્ટિ','Vision'),body:bi('સંસ્કાર, સહકાર અને સેવા સાથે જોડાયેલો સમાજ.','A community connected through values, cooperation and service.')},
 {title:bi('ધ્યેય','Mission'),body:bi('શૈક્ષણિક, સાંસ્કૃતિક અને સેવાકીય પ્રવૃત્તિમાં પરિવારોની ભાગીદારી વધારવી.','Encourage families to participate in educational, cultural and service activities.')},
 {title:bi('મૂલ્યો','Core values'),body:bi('એકતા · સેવાભાવ · પારદર્શિતા · પરસ્પર આદર','Unity · Service · Transparency · Mutual respect')},
 {title:bi('કાર્યક્ષેત્ર','Geographical area'),body:bi('મુસદ્દા મુજબ મુખ્ય કાર્યક્ષેત્ર દહેગામ શહેર અને આસપાસનો વિસ્તાર છે.','The draft identifies Dehgam city and surrounding areas as the principal area served.')},
 {title:bi('અન્ય સમાજ સાથે સંબંધ','Relationship with other organisations'),body:pending},
];
export const membershipSections = [
 {title:bi('કોણ અરજી કરી શકે?','Who can apply?'),body:bi('મુસદ્દા કલમ 9 મુજબ મુખ્ય અરજદાર 18 વર્ષ કે તેથી વધુ ઉંમરનો, સનાતન હિંદુ ધર્મ પાળતો અને દહેગામમાં રહેતો અથવા સાચો વ્યવસાય કે સેવા કરતો હોવો જોઈએ. અંતિમ પાત્રતા મંજૂર નિયમો મુજબ રહેશે.','Draft clause 9 proposes a principal applicant aged 18 or over, following Sanatan Hindu Dharma, and residing or genuinely working or doing business in Dehgam. Final eligibility will follow approved rules.')},
 {title:bi('સભ્યપદ શ્રેણી','Membership category'),body:bi('પ્રસ્તાવિત પરિવાર સભ્ય એકમ. મુસદ્દામાં દાન આધારિત વિશેષ મત કે આજીવન દાતા શ્રેણી નથી.','Proposed family membership unit. The draft does not provide donation-based extra votes or a lifetime-donor category.')},
 {title:bi('અરજી પ્રક્રિયા','Application process'),body:bi('ફોર્મ અને જરૂરી વિગતો → કારોબારી સમિતિની ચકાસણી → મંજૂરી ઠરાવ અને નિયત ફીની રસીદ → પરિવાર નોંધપોથીમાં નોંધ. આ પ્રક્રિયા મુસદ્દા મુજબ છે.','Form and supporting details → committee review → approval resolution and applicable fee receipt → entry in the family register. This process is based on the draft.')},
 {title:bi('જરૂરી દસ્તાવેજો','Required documents'),body:bi('મુસદ્દા મુજબ ઓળખ અને સરનામાના પુરાવા, પરિવાર સંબંધની વિગતો, પુખ્ત સભ્યોની સંમતિ અને મુખ્ય તથા વૈકલ્પિક પ્રતિનિધિની પસંદગી. આ વેબસાઇટ પર દસ્તાવેજ અપલોડ કરવાની સુવિધા નથી.','The draft calls for identity and address evidence, family relationships, adult members’ consent, and selection of principal and alternative representatives. This website does not accept document uploads.')},
 {title:bi('પ્રવેશ ફી અને વાર્ષિક લવાજમ','Entry fee & annual subscription'),body:pending},
 {title:bi('અધિકાર અને જવાબદારીઓ','Rights & responsibilities'),body:bi('મુસદ્દા મુજબ દરેક સક્રિય પરિવારને એક મત; નોંધાયેલા પ્રતિનિધિ દ્વારા ભાગીદારી. સભ્યોએ મંજૂર નિયમોનું પાલન કરવાનું રહેશે.','The draft proposes one vote per active family, exercised through its registered representative. Members are expected to follow approved rules.')},
 {title:bi('મહત્વની શરતો','Important conditions'),body:bi('આ માહિતી અંતિમ મંજૂરીને આધીન છે. ફોર્મ ભરવાથી સભ્યપદ મળતું નથી. સભ્યપદથી મિલકતમાં હિસ્સો કે વારસાગત અધિકાર મળતો નથી.','This information is subject to final approval. Completing a form does not confer membership. Membership does not confer a share in property or hereditary rights.')},
];
export const privacySections = [
 {title:bi('માહિતી અને તેનો ઉપયોગ','Information & its use'),body:bi('સંપર્ક અને સૂચન ફોર્મ FormSubmit દ્વારા સમાજના ઈમેલ પર મોકલાય છે. પરિવાર નોંધણીની વિગતો આ કમ્પ્યુટરના સમાજ ડેટાબેઝમાં સાચવાય છે.','Contact and suggestion forms send information through FormSubmit to the Samaj email. Family registrations are stored in the Samaj database on this computer.')},
 {title:bi('સભ્ય યાદીમાં દેખાતી વિગતો','Directory information'),body:bi('સંમતિ સાથે નોંધાયેલ પરિવારના વડાનું નામ, મૂળ ગામ, તાલુકો અને સભ્યોની સંખ્યા યાદીમાં દેખાય છે. ફોન, સરનામું, જન્મ તારીખ અને અન્ય વ્યક્તિગત વિગતો યાદીમાં દેખાતી નથી.','With consent, registered heads of family, villages, talukas and member counts appear in the directory. Phone numbers, addresses, dates of birth and other personal details are not displayed in the directory.')},
 {title:bi('સંગ્રહ અને સુધારા','Storage & corrections'),body:bi('નોંધણીની વિગતો બ્રાઉઝરમાં સાચવાતી નથી. આ કમ્પ્યુટરના સંચાલક ડેટાબેઝની વિગતો મેળવી શકે છે. સુધારા અથવા માહિતી દૂર કરવા સમાજનો સંપર્ક કરો: skkpdsss@gmail.com.','Registration details are not saved in browser storage. The computer administrator can access the database records. Contact skkpdsss@gmail.com for corrections or removal requests.')},
];
export const disclaimerSections = [
 {title:bi('સમાજની માહિતી માટે','For community information'),body:bi('આ વેબસાઇટ સમાજની માહિતી માટે છે. સત્તાવાર રેકોર્ડ અને મંજૂર ઠરાવો પ્રાધાન્ય ધરાવે છે.','This website provides community information. Official records and approved resolutions prevail.')},
 {title:bi('મંજૂરી અને ગોપનીયતા','Approval & privacy'),body:bi('કારોબારી અને સભ્યપદની માહિતી સત્તાવાર મંજૂરીને આધીન છે. ખાનગી માહિતી અધિકૃતતા વિના જાહેર કરવામાં આવતી નથી. મુસદ્દાને અંતિમ નોંધણી દસ્તાવેજ માનવો નહીં.','Committee and membership information is subject to official approval. Private information is not displayed without authorisation. The draft is not a final registration document.')},
 {title:bi('બાહ્ય લિંક્સ','External links'),body:bi('બાહ્ય લિંક્સ સગવડ માટે છે. સંબંધિત સંસ્થાની માહિતી અને નીતિઓ ચકાસવી.','External links are provided for convenience. Check the information and policies of the relevant organisation.')},
];
