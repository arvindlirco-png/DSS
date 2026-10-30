import {test,expect} from '@playwright/test';
for(const language of ['English','ગુજરાતી'])test(`GitHub family details email contains every family and member field in ${language}`,async({page,baseURL})=>{
 let payload:URLSearchParams|undefined;const apiRequests:string[]=[];
 await page.route('https://arvindlirco-png.github.io/**',async route=>{
  const path=new URL(route.request().url()).pathname.replace(/^\/DSS\//,'/');
  if(path.includes('/api/'))apiRequests.push(path);
  await route.fulfill({response:await page.request.get(baseURL+path)});
 });
 await page.route('https://formsubmit.co/**',async route=>{
  expect(route.request().method()).toBe('POST');expect(route.request().url()).toBe('https://formsubmit.co/skkpdsss@gmail.com');
  payload=new URLSearchParams(route.request().postData()||'');
  await route.fulfill({contentType:'text/html',body:'<h1>Email provider response</h1>'});
 });
 await page.goto('https://arvindlirco-png.github.io/DSS/#/family-registration');
 await page.getByRole('button',{name:language,exact:true}).click();
 await page.locator('button[type=submit]').click();expect(payload).toBeUndefined();
 await expect(page.locator('#head-select option')).toHaveCount(226);
 await page.locator('#head-select').selectOption('6');
 await page.locator('.registration > button[type=button]').click();
 const controls=page.locator('fieldset input:not([readonly]),fieldset textarea,fieldset select');
 for(const control of await controls.all()){
  const id=await control.getAttribute('id');if(!id||['head-search','head-select'].includes(id))continue;
  const tag=await control.evaluate(el=>el.tagName);
  const type=await control.getAttribute('type');
  if(tag==='SELECT')await control.selectOption({index:1});
  else await control.fill(type==='date'?(id.endsWith('dob')?'2000-01-01':'2020-01-01'):type==='tel'?'9876543210':type==='email'?'member@example.com':`Value for ${id}`);
 }
 await page.getByRole('checkbox').check();
 const expected=await page.locator('form').evaluate((form:HTMLFormElement)=>Object.fromEntries(new FormData(form)));
 await page.locator('button[type=submit]').click();
 await expect(page.getByRole('heading',{name:'Email provider response'})).toBeVisible();
 expect(payload?.get('_subject')).toBe('Samaj Family Registration');expect(payload?.get('Number of family members')).toBe('2');
 expect(payload?.get('Head of family')).toBe('નરેન્દ્રભાઈ વિઠ્ઠલભાઈ વાડીયા');expect(payload?.get('Consent')).toBe('Yes');
 expect(payload?.get('_captcha')).not.toBe('false');expect(payload?.has('_honey')).toBe(true);
 const fields=Object.entries(expected).filter(([key])=>key.startsWith('Family - ')||key.startsWith('Member '));
 expect(fields).toHaveLength(47);
 for(const [key,value] of fields)expect(payload?.get(key),key).toBe(value);
 expect(apiRequests).toEqual([]);
});