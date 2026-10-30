import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import http from 'node:http';
import {spawnSync} from 'node:child_process';
import {randomUUID} from 'node:crypto';
process.env.SAMAJ_DB_PATH=join(mkdtempSync(join(tmpdir(),'samaj-api-test-')),'members.sqlite');
const {registrationsHandler}=await import('./registrations.mjs');
test('database validation, private fields, retry safety, duplicate protection and disk persistence',async()=>{
 const server=http.createServer((req,res)=>registrationsHandler(req,res));
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const origin=`http://127.0.0.1:${server.address().port}`;
 const payload={requestId:randomUUID(),consent:true,family:{headName:'Test family',village:'Test village',taluka:'Bhuj',address:'Private address',mobile:'9876543210'},members:[{name:'Test family',relationship:'Self (head of family)',dob:'1990-01-01',blood:'A+'}]};
 const post=(data,from=origin)=>fetch(origin+'/api/families',{method:'POST',headers:{Origin:from,'Content-Type':'application/json'},body:JSON.stringify(data)});
 try{
  assert.equal((await post({...payload,consent:false})).status,400);
  assert.equal((await post(payload,'https://untrusted.example')).status,403);
  assert.equal((await post({...payload,members:[{...payload.members[0],dob:'2026-02-30'}]})).status,400);
  const response=await post(payload);assert.equal(response.status,201);const saved=await response.json();
  const retry=await post(payload);assert.equal(retry.status,200);assert.equal((await retry.json()).id,saved.id);
  assert.equal((await post({...payload,requestId:randomUUID()})).status,409);
  assert.equal((await post({...payload,family:{...payload.family,address:'Changed'}})).status,409);
  const listing=await(await fetch(origin+'/api/families')).json();assert.equal(listing.families.length,1);assert.equal(listing.families[0].count,1);
  assert.equal(JSON.stringify(listing).includes('Private address'),false);assert.equal(JSON.stringify(listing).includes('9876543210'),false);
  const check=spawnSync(process.execPath,['--input-type=module','-e',"import {DatabaseSync} from 'node:sqlite';const db=new DatabaseSync(process.env.SAMAJ_DB_PATH);const rows=db.prepare('SELECT data FROM families').all();console.log(rows.length,JSON.parse(rows[0].data).members[0].blood);"],{encoding:'utf8'});
  assert.equal(check.status,0);assert.equal(check.stdout.trim(),'1 A+');
 }finally{await new Promise(resolve=>server.close(resolve));}
});
