import {test,expect} from '@playwright/test';
for(const kind of ['contact','suggestions'])test(`${kind} posts validated details to the configured email service`,async({page})=>{
 let payload:URLSearchParams|undefined;
 await page.route('https://formsubmit.co/**',async route=>{
  expect(route.request().method()).toBe('POST');
  expect(route.request().url()).toBe('https://formsubmit.co/skkpdsss@gmail.com');
  payload=new URLSearchParams(route.request().postData()||'');
  await route.fulfill({contentType:'text/html',body:'<h1>Provider response</h1>'});
 });
 await page.goto('/#/'+kind);
 await page.getByRole('button',{name:'English',exact:true}).click();
 await page.getByRole('button',{name:'Send',exact:true}).click();
 expect(payload).toBeUndefined();
 await page.locator('[name=name]').fill('Test Member');
 await page.locator('[name=email]').fill('member@example.com');
 if(kind==='contact'){
  await page.locator('[name=mobile]').fill('9876543210');
  await page.locator('[name=message]').fill('A community enquiry.');
 }else{
  await page.locator('[name=eventType]').selectOption('education');
  await page.locator('[name=title]').fill('Career workshop');
  await page.locator('[name=details]').fill('A workshop for community students.');
 }
 await page.locator('[name=consent]').check();
 await page.getByRole('button',{name:'Send',exact:true}).click();
 await expect(page.getByRole('heading',{name:'Provider response'})).toBeVisible();
 expect(payload?.get('_subject')).toBe(kind==='contact'?'Samaj Contact Enquiry':'Samaj Suggestion');
 expect(payload?.get('name')).toBe('Test Member');
 expect(payload?.get('email')).toBe('member@example.com');
 expect(payload?.get('consent')).toBe('Yes');
 expect(payload?.get('_captcha')).not.toBe('false');
 expect(payload?.has('_honey')).toBe(true);
 expect(payload?.get(kind==='contact'?'message':'eventType')).toBe(kind==='contact'?'A community enquiry.':'education');
});
