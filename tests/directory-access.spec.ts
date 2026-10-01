import {test,expect} from '@playwright/test';

test('directory requires server authentication for both current and legacy PDF URLs',async({page,context,baseURL})=>{
 const password=process.env.SAMAJ_TEST_PASSWORD;
 expect(password,'Set SAMAJ_TEST_PASSWORD to exercise the protected directory').toBeTruthy();
 const origin=new URL(baseURL!).origin;
 for(const url of ['/api/member-directory/pdf','/api/member-directory/pdf?download=1','/documents/member-directory.pdf']) {
  const response=await page.request.get(url);expect(response.status()).toBe(401);
  expect(response.headers()['cache-control']).toContain('no-store');
 }
 await page.goto('/member-list');
 await page.getByRole('button',{name:'English',exact:true}).click();
 await expect(page.getByLabel('Password',{exact:true})).toBeVisible();
 await page.getByLabel('Password',{exact:true}).fill('not-the-password');
 await page.getByRole('button',{name:'Unlock directory',exact:true}).click();
 await expect(page.getByRole('alert')).toContainText('Incorrect password');
 const crossOrigin=await page.request.post('/api/member-directory/login',{headers:{Origin:'https://unrelated.invalid'},data:{password}});
 expect(crossOrigin.status()).toBe(403);
 await page.getByLabel('Password',{exact:true}).fill(password!);
 await page.getByRole('button',{name:'Unlock directory',exact:true}).click();
 await expect(page.getByRole('heading',{name:'The member directory is unlocked.'})).toBeVisible();
 const cookie=(await context.cookies()).find(c=>c.name==='samaj_directory');
 expect(cookie?.httpOnly).toBe(true);expect(cookie?.sameSite).toBe('Strict');
 for(const url of ['/api/member-directory/pdf','/documents/member-directory.pdf']) {
  const response=await page.request.get(url);expect(response.status()).toBe(200);
  expect((await response.body()).subarray(0,5).toString()).toBe('%PDF-');
  expect(response.headers()['cache-control']).toContain('no-store');
 }
 const download=await page.request.get('/api/member-directory/pdf?download=1');
 expect(download.headers()['content-disposition']).toContain('attachment');
 await page.reload();await page.getByRole('button',{name:'English',exact:true}).click();
 await expect(page.getByRole('heading',{name:'The member directory is unlocked.'})).toBeVisible();
 await page.getByRole('button',{name:'Lock directory',exact:true}).click();
 await expect(page.getByLabel('Password',{exact:true})).toBeVisible();
 expect((await page.request.get('/api/member-directory/pdf')).status()).toBe(401);
 for(let n=0;n<5;n++)expect((await page.request.post('/api/member-directory/login',{headers:{Origin:origin},data:{password:'invalid'}})).status()).toBe(401);
 expect((await page.request.post('/api/member-directory/login',{headers:{Origin:origin},data:{password:'invalid'}})).status()).toBe(429);
});
