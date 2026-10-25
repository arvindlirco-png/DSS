export type Lang = 'gu' | 'en';
export type Text = { gu: string; en: string };
export const bi = (gu: string, en: string): Text => ({gu,en});
export const pending = bi('માહિતી અપડેટ કરવાની બાકી છે','To be updated');
export const site = {
  name: bi('શ્રી ક.ક.પા. દહેગામ શહેર સનાતન સમાજ','Dehgam Shahar Sanatan Samaj'),
  shortName: bi('દહેગામ શહેર સનાતન સમાજ','Dehgam Shahar Sanatan Samaj'),
  tagline: bi('સંગઠન થી સેવા','Together in service'),
  location: bi('દહેગામ · ગાંધીનગર · ગુજરાત','Dehgam · Gandhinagar · Gujarat'),
  logo: 'images/logo.png', banner: '', publicUrl: 'https://arvindlirco-png.github.io/DSS',
  hero: bi('સંસ્કારનો વારસો.\nસેવાનો સંકલ્પ.','Rooted in culture.\nUnited in service.'),
  welcome: bi('આપણા સમાજનું એક આંગણું. સાથે મળીએ, પરંપરાઓને જાળવીએ અને આવતી પેઢી માટે ઉજ્જવળ ભવિષ્ય રચીએ.','A shared home for our community. Coming together to preserve our traditions and create a brighter future for the next generation.'),
  intro: bi('દહેગામના પરિવારોને જોડતું સમાજનું માહિતી કેન્દ્ર. શિક્ષણ, આરોગ્ય, સંસ્કૃતિ અને સેવાના હેતુઓ સાથે સૌના સહકારથી આગળ વધવાની ભાવના.','A community information hub connecting families in Dehgam, with a shared spirit of education, health, culture and service.'),
  draft: bi('મુસદ્દો · અંતિમ મંજૂરી બાકી છે','Draft · awaiting final approval'),
  sample: bi('નમૂનારૂપ માહિતી','Sample content'),
  contact: { address: pending, phone: pending, email: bi('skkpdsss@gmail.com','skkpdsss@gmail.com'), hours: pending, mapsUrl: '', socialLinks: [] as {label: string; url: string}[] },
  formNote: bi('ઓનલાઇન અરજી હાલમાં બંધ છે. સુરક્ષિત સર્વર જોડાયા પછી જ ફોર્મ મોકલી શકાશે. અહીં ભરેલી માહિતી સંગ્રહિત કે મોકલવામાં આવતી નથી.','Online submission is currently disabled until a secure backend is connected. Information entered here is neither stored nor sent.'),
  footer: bi('વેબસાઇટનું સંચાલન: દહેગામ શહેર સનાતન સમાજ','Website managed by Dehgam Shahar Sanatan Samaj'),
};
export const navigation = [
  ['/',bi('મુખ્ય પૃષ્ઠ','Home')], ['/about',bi('સમાજ વિશે','About Us')], ['/objectives',bi('હેતુઓ','Objectives')], ['/committee',bi('કારોબારી સમિતિ','Karobari Samiti')], ['/events',bi('કાર્યક્રમો','Events')], ['/notices',bi('સૂચનાઓ','Notices')], ['/gallery',bi('ફોટો ગેલેરી','Gallery')], ['/documents',bi('દસ્તાવેજો','Documents')], ['/membership',bi('સભ્યપદ','Membership')], ['/contact',bi('સંપર્ક','Contact Us')],
] as const;
export const ui = {
 service:bi('સેવા','Service'), culture:bi('સંસ્કાર','Culture'), unity:bi('સંગઠન','Unity'), images:bi('ચિત્રો','images'), quickLinks:bi('ઉપયોગી લિંક્સ','Quick links'),
 learn: bi('સમાજને જાણો','Discover our Samaj'), join: bi('સમાજ સાથે જોડાઓ','Become a member'), all:bi('બધા','All'), viewAll:bi('બધું જુઓ','View all'), details:bi('વિગતો જુઓ','View details'), upcoming:bi('આગામી','Upcoming'), past:bi('પૂર્ણ થયેલ','Completed'), search:bi('શોધો','Search'), empty:bi('કોઈ માહિતી મળી નથી.','No records found.'), download:bi('ડાઉનલોડ','Download'), view:bi('જુઓ','View'), category:bi('શ્રેણી','Category'), date:bi('તારીખ','Date'), language:bi('ભાષા','Language'), term:bi('સમિતિનો કાર્યકાળ','Committee term'), photo:bi('ફોટો બાકી છે','Photo pending'), close:bi('બંધ કરો','Close'), next:bi('આગળ','Next'), previous:bi('પાછળ','Previous'), menu:bi('મેનુ','Menu'), skip:bi('મુખ્ય માહિતી પર જાઓ','Skip to content'), privacy:bi('ગોપનીયતા નીતિ','Privacy Policy'), disclaimer:bi('જાહેર સ્પષ્ટતા','Disclaimer'), submit:bi('અરજી મોકલો — હાલમાં બંધ','Submit — currently disabled'), validate:bi('માહિતી તપાસો','Check details'), valid:bi('માહિતીનું સ્વરૂપ યોગ્ય છે. કંઈ મોકલવામાં આવ્યું નથી.','The details pass validation. Nothing has been submitted.'), new:bi('નવું','New'), loading:bi('લોડ થઈ રહ્યું છે…','Loading…'), notFound:bi('આ પૃષ્ઠ મળ્યું નથી','Page not found'), back:bi('મુખ્ય પૃષ્ઠ પર પાછા','Back to home'), contactCta:bi('ચાલો, સમાજ સાથે જોડાઈએ.','Let’s build a stronger community.'), contactBody:bi('સૂચનો, સહકાર અને સમાજ સંબંધિત માહિતી માટે સંપર્ક કરો.','Get in touch for community information, suggestions and opportunities to help.'),
};
export const headings = {
 objectives:bi('સેવા અનેક, ભાવના એક','Many ways to serve. One shared purpose.'), events:bi('સાથે મળવાની ક્ષણો','Moments that bring us together'), notices:bi('સમાજની સૂચનાઓ','From the notice board'), committee:bi('સમાજના સેવાભાવી સાથીઓ','The people serving our community'), gallery:bi('આપણી યાદોનું આંગણું','Our community, in moments'), documents:bi('માહિતી અને દસ્તાવેજો','Information & documents'), membership:bi('એક પરિવાર, એક સમાજ','One family. One community.'), stats:bi('આપણો સમાજ, એક નજરે','Our community at a glance'), about:bi('આપણી ઓળખ, આપણો સંકલ્પ','Our identity. Our commitment.'),
};
export const statistics = [
 {value:'220+',label:bi('પરિવાર નોંધો','Family records')},
 {value:'1100+',label:bi('પરિવાર સભ્યો','Family members')},
 {value:null,label:bi('યોજાયેલા કાર્યક્રમો','Events conducted')},
 {value:null,label:bi('સેવા પ્રવૃત્તિઓ','Service activities')},
];
export const statsNote = bi('સમાજના દર્શાવેલ આંકડા: 220+ પરિવાર નોંધો અને 1100+ પરિવાર સભ્યો. આપેલી યાદીમાં એક પરિવારની સભ્યસંખ્યા બાકી છે. આ ચકાસાયેલ સક્રિય સભ્યપદની સંખ્યા નથી. સભ્ય યાદી ટૂંક સમયમાં ઉપલબ્ધ થશે.','Displayed community figures: 220+ family records and 1100+ family members. One family-member count is missing from the supplied list. These are not verified active membership counts. The member directory is coming soon.');
