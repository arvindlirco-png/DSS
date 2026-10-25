import {bi} from './data/site';

export const formEndpoint='https://formsubmit.co/skkpdsss@gmail.com';
export const deliveryNote=bi('તમારો સંદેશ FormSubmit દ્વારા સમાજના ઈમેલ skkpdsss@gmail.com પર મોકલાશે. આગળના પૃષ્ઠ પર સુરક્ષા ચકાસણી પૂર્ણ કરો.','Your message will be sent through FormSubmit to skkpdsss@gmail.com. Complete the security check on the next page.');
export const sendLabel=bi('મોકલો','Send');
export function FormDelivery({subject}:{subject:string}){
 return <><input type="hidden" name="_subject" value={subject}/><input type="hidden" name="_template" value="table"/><div className="honeypot" aria-hidden="true"><label>Leave blank<input name="_honey" tabIndex={-1} autoComplete="off"/></label></div></>;
}
