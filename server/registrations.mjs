import {DatabaseSync} from 'node:sqlite';
import {mkdirSync,readFileSync} from 'node:fs';
import {dirname,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {randomUUID} from 'node:crypto';

const defaultPath=fileURLToPath(new URL('../../samaj-website-private/members.sqlite',import.meta.url));
const heads=JSON.parse(readFileSync(new URL('../src/data/familyHeads.json',import.meta.url),'utf8'));
let db;
function database(){
 if(!db){
  const path=resolve(process.env.SAMAJ_DB_PATH||defaultPath);mkdirSync(dirname(path),{recursive:true});
  db=new DatabaseSync(path);db.exec(`PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000;
   CREATE TABLE IF NOT EXISTS families (id TEXT PRIMARY KEY, family_key TEXT NOT NULL UNIQUE, request_id TEXT NOT NULL UNIQUE, created_at TEXT NOT NULL, data TEXT NOT NULL);`);
 }
 return db;
}
function reply(res,status,data){res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(JSON.stringify(data));}
const familyKeys=['familyId','receipt','village','taluka','address','mobile','email','housing','notes','headName','sourceRow'];
const personKeys=['name','relationship','gender','dob','marital','anniversary','mobile','email','blood','qualification','course','studying','occupation','employer','business','skills','awards','hobbies','serve'];
function clean(record,keys){
 if(!record||typeof record!=='object'||Array.isArray(record))throw Error('Invalid record');
 const out={};for(const key of keys){const v=record[key]??'';if(typeof v!=='string'||v.length>3000)throw Error('Invalid field');out[key]=v.trim();}return out;
}
function checkContact(record,required=false){
 if((required||record.mobile)&&! /^(?:\+91[ -]?)?[6-9][0-9]{9}$/.test(record.mobile))throw Error('Enter a valid 10-digit Indian mobile number');
 if(record.email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(record.email))throw Error('Enter a valid email address');
}
function validate(value){
 if(value.consent!==true)throw Error('Consent is required');
 if(typeof value.requestId!=='string'||! /^[\w-]{16,80}$/.test(value.requestId))throw Error('Invalid request ID');
 const family=clean(value.family,familyKeys);
 if(family.sourceRow&&!heads.some(h=>String(h.sourceRow)===family.sourceRow&&h.name===family.headName))throw Error('Select a valid family head from the list');
 if(!family.sourceRow){const match=heads.find(h=>h.name===family.headName);if(match)family.sourceRow=String(match.sourceRow);}
 for(const k of ['headName','village','taluka','address','mobile'])if(!family[k])throw Error('Complete all required family fields');
 checkContact(family,true);
 if(!Array.isArray(value.members)||!value.members.length||value.members.length>50)throw Error('Add between 1 and 50 family members');
 const members=value.members.map((p,i)=>{
  const member=clean(p,personKeys);if(!member.name||!member.relationship)throw Error('Each member needs a name and relationship');
  if((i===0&&member.relationship!=='Self (head of family)')||(i>0&&member.relationship==='Self (head of family)'))throw Error('Only the first member can be the head');
  checkContact(member);
  for(const key of ['dob','anniversary'])if(member[key]){
   const d=new Date(member[key]);if(!/^\d{4}-\d{2}-\d{2}$/.test(member[key])||Number.isNaN(d.valueOf())||d.toISOString().slice(0,10)!==member[key]||member[key]>new Date().toLocaleDateString('en-CA',{timeZone:'Asia/Kolkata'}))throw Error('Enter a valid date that is not in the future');
  }
  if(member.dob&&member.anniversary&&member.anniversary<member.dob)throw Error('Wedding date cannot precede date of birth');
  return member;
 });
 if(members[0].name!==family.headName)throw Error('Head name must match the first family member');
 return {family,members,consent:true};
}
export async function registrationsHandler(req,res){
 const path=new URL(req.url,'http://localhost').pathname;
 if(!path.startsWith('/api/families'))return false;
 if(path!=='/api/families'){reply(res,404,{error:'Not found'});return true;}
 try{
  if(req.method==='GET'){
   const rows=database().prepare('SELECT id, created_at, data FROM families ORDER BY created_at DESC').all();
   reply(res,200,{families:rows.map(row=>{const data=JSON.parse(row.data);return {id:row.id,createdAt:row.created_at,headName:data.family.headName,village:data.family.village,taluka:data.family.taluka,count:data.members.length};})});return true;
  }
  if(req.method!=='POST'){reply(res,405,{error:'Method not allowed'});return true;}
  const origin=req.headers.origin;
  if(!origin||origin!==(process.env.SAMAJ_PUBLIC_ORIGIN||`http://${req.headers.host}`)){reply(res,403,{error:'Origin not allowed'});return true;}
  if(!(req.headers['content-type']||'').startsWith('application/json')){reply(res,415,{error:'JSON required'});return true;}
  let raw='';for await(const chunk of req){raw+=chunk;if(Buffer.byteLength(raw)>256000){reply(res,413,{error:'Submission too large'});return true;}}
  let value,data;try{value=JSON.parse(raw);data=validate(value);}catch(error){reply(res,400,{error:error.message});return true;}
  const connection=database();
  const old=connection.prepare('SELECT id, data FROM families WHERE request_id=?').get(value.requestId);
  if(old){if(old.data!==JSON.stringify(data)){reply(res,409,{error:'This request was already saved. Reload before submitting a different family.'});return true;}reply(res,200,{id:old.id});return true;}
  const key=data.family.sourceRow?`sheet1-row-${data.family.sourceRow}`:`new-${data.family.headName.normalize('NFKC').toLowerCase()}-${data.family.mobile.replace(/\D/g,'').slice(-10)}`;
  if(connection.prepare('SELECT id FROM families WHERE family_key=?').get(key)){reply(res,409,{error:'This family is already registered. Contact the Samaj office to correct an existing record.'});return true;}
  const id=randomUUID();connection.prepare('INSERT INTO families VALUES (?,?,?,?,?)').run(id,key,value.requestId,new Date().toISOString(),JSON.stringify(data));
  reply(res,201,{id});return true;
 }catch(error){console.error('Member database operation failed:',error.code||error.name);reply(res,500,{error:'Unable to save right now. Your form is still available; please retry.'});return true;}
}
