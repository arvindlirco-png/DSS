import {randomBytes, scryptSync, timingSafeEqual} from 'node:crypto';
import {readFileSync, createReadStream} from 'node:fs';
import {resolve, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

export const privateDirectory = process.env.SAMAJ_PRIVATE_DIR || resolve(dirname(fileURLToPath(import.meta.url)), '../../samaj-website-private');
const sessions = new Map();
const attempts = new Map();
const lifetime = 30 * 60 * 1000;
const cookieName = 'samaj_directory';
const protectedPaths = new Set(['/api/member-directory/session','/api/member-directory/login','/api/member-directory/pdf','/documents/member-directory.pdf']);
function cookie(req) {return (req.headers.cookie || '').split(';').map(s=>s.trim()).find(s=>s.startsWith(cookieName+'='))?.slice(cookieName.length+1)}
function authorised(req) {const id=cookie(req);return id && (sessions.get(id)||0)>Date.now()}
function cookieValue(token, age) {return `${cookieName}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${age}${process.env.SAMAJ_SECURE_COOKIE==='true'?'; Secure':''}`}
function json(res,status,data) {res.writeHead(status,{'Content-Type':'application/json; charset=utf-8'});res.end(JSON.stringify(data))}
function sameOrigin(req) {
 const allowed=process.env.SAMAJ_PUBLIC_ORIGIN;
 if(allowed)return req.headers.origin===allowed;
 return /^127\.0\.0\.1:\d+$/.test(req.headers.host||'')&&req.headers.origin===`http://${req.headers.host}`;
}
async function body(req) {
 let value='';
 for await (const chunk of req) {value+=chunk;if(Buffer.byteLength(value)>1024)throw new Error('Too large')}
 return JSON.parse(value);
}

export async function directoryHandler(req,res,next) {
 const path=new URL(req.url,'http://localhost').pathname;
 if(!protectedPaths.has(path)){next();return}
 res.setHeader('Cache-Control','no-store, private');
 res.setHeader('X-Content-Type-Options','nosniff');
 res.setHeader('Referrer-Policy','no-referrer');
 const now=Date.now();
 for(const [key,expires] of sessions)if(expires<=now)sessions.delete(key);
 for(const [key,entry] of attempts)if(entry.until<=now)attempts.delete(key);
 if(path==='/api/member-directory/session'&&req.method==='GET')return json(res,200,{authenticated:!!authorised(req)});
 if(!['GET','HEAD'].includes(req.method)&&!sameOrigin(req))return json(res,403,{error:'origin'});
 if(path==='/api/member-directory/session'&&req.method==='DELETE') {
  sessions.delete(cookie(req));res.setHeader('Set-Cookie',cookieValue('',0));return json(res,200,{authenticated:false});
 }
 if(path==='/api/member-directory/login'&&req.method==='POST') {
  const ip=req.socket.remoteAddress||'unknown';
  const entry=attempts.get(ip)||{count:0,until:now+15*60*1000};
  if(entry.count>=5){res.setHeader('Retry-After',String(Math.ceil((entry.until-now)/1000)));return json(res,429,{error:'rate_limit'})}
  if(!(req.headers['content-type']||'').startsWith('application/json'))return json(res,415,{error:'format'});
  let password;
  try {password=(await body(req)).password;if(typeof password!=='string'||password.length>128)throw new Error('Invalid')}
  catch {return json(res,400,{error:'format'})}
  let config;
  try {config=JSON.parse(readFileSync(resolve(privateDirectory,'access.json'),'utf8'))}
  catch {return json(res,503,{error:'configuration'})}
  let valid=false;
  try {const expected=Buffer.from(config.hash,'hex');const actual=scryptSync(password,config.salt,64);valid=expected.length===actual.length&&timingSafeEqual(actual,expected)}catch{}
  password='';
  if(!valid){entry.count++;attempts.set(ip,entry);return json(res,401,{error:'password'})}
  attempts.delete(ip);
  sessions.delete(cookie(req));
  const token=randomBytes(32).toString('hex');sessions.set(token,now+lifetime);
  res.setHeader('Set-Cookie',cookieValue(token,lifetime/1000));return json(res,200,{authenticated:true});
 }
 if((path==='/api/member-directory/pdf'||path==='/documents/member-directory.pdf')&&['GET','HEAD'].includes(req.method)) {
  if(!authorised(req))return json(res,401,{error:'authentication_required'});
  res.setHeader('Content-Type','application/pdf');
  res.setHeader('Content-Disposition',`${new URL(req.url,'http://localhost').searchParams.get('download')==='1'?'attachment':'inline'}; filename="member-directory.pdf"`);
  const stream=createReadStream(resolve(privateDirectory,'member-directory.pdf'));
  stream.on('error',()=>{if(!res.headersSent)json(res,503,{error:'document_unavailable'});else res.destroy()});
  if(req.method==='HEAD'){stream.destroy();res.end();return}
  stream.pipe(res);return;
 }
 return json(res,405,{error:'method'});
}
