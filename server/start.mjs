import http from 'node:http';
import {registrationsHandler} from './registrations.mjs';
import {readFile} from 'node:fs/promises';
import {resolve,extname,dirname,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'../dist');
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.png':'image/png','.svg':'image/svg+xml','.woff':'font/woff','.woff2':'font/woff2','.pdf':'application/pdf'};
http.createServer((req,res)=>{
 (async()=>{
  if(await registrationsHandler(req,res))return;
  if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);res.end();return}
  try {
   const path=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
   const file=resolve(root,'.'+path);
   if(!file.startsWith(root+sep)&&file!==root){res.writeHead(404);res.end();return}
   let data,extension=extname(file);
   try{data=await readFile(file)}catch{
    if(extension){res.writeHead(404);res.end();return}
    data=await readFile(resolve(root,'index.html'));extension='.html';
   }
   res.writeHead(200,{'Content-Type':types[extension]||'application/octet-stream','X-Content-Type-Options':'nosniff','Cache-Control':'no-cache'});
   res.end(req.method==='HEAD'?undefined:data);
  }catch{res.writeHead(400);res.end()}
 })().catch(()=>{if(!res.headersSent)res.writeHead(500);res.end()});
}).listen(Number(process.env.PORT||4180),process.env.HOST||'127.0.0.1',()=>console.log('Samaj production server ready'));
