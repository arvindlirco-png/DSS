import {test,expect} from '@playwright/test';
const routes=['/','/about','/objectives','/committee','/events','/events/community-gathering-sample','/events/education-sample','/notices','/gallery','/documents','/membership','/family-registration','/member-list','/contact','/suggestions','/privacy','/disclaimer','/missing'];
test('every route renders in both languages on desktop and mobile without errors or overflow',async({page})=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
 for(const width of [1440,768,390]){
  await page.setViewportSize({width,height:950});
  for(const route of routes){
   await page.goto('/#'+route);await expect(page.locator('h1')).toBeVisible();expect(await page.evaluate(()=>window.scrollY)).toBe(0);await expect(page.locator('html')).toHaveAttribute('lang','gu');
   await expect(page.locator('body')).not.toContainText('undefined');
   for(const language of ['English','ગુજરાતી']){
    await page.getByRole('button',{name:language,exact:true}).click();
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBeTruthy();
   }
  }
 }
 expect(errors).toEqual([]);
});
test('committee, source totals, bilingual navigation and mobile menu',async({page})=>{
 await page.goto('/#/committee');await expect(page.locator('.person')).toHaveCount(16);
 await expect(page.locator('.person a[href^="tel:"]')).toHaveCount(0);
 await page.getByRole('button',{name:'English',exact:true}).click();await expect(page.getByRole('heading',{name:'Narendrabhai Bhagat'})).toBeVisible();
 await page.setViewportSize({width:390,height:844});await page.getByRole('button',{name:'Menu',exact:true}).click();await page.locator('nav').getByRole('link',{name:'Membership',exact:true}).click();await expect(page.locator('nav')).toBeHidden();
 await expect(page.locator('.stats')).toContainText('220+');await expect(page.locator('.stats')).toContainText('1100+');
 await expect(page.locator('html')).toHaveAttribute('lang','en');
});
test('event and notice filters, empty state and document downloads',async({page})=>{
 await page.goto('/#/events');await page.getByRole('button',{name:'English',exact:true}).click();await page.getByRole('button',{name:'Completed',exact:true}).click();await expect(page.locator('.event-card')).toHaveCount(2);await expect(page.locator('.event-card')).toContainText(['Navratri Celebration 2026','Learning & career guidance']);
 await page.goto('/#/notices');await page.getByRole('button',{name:'English',exact:true}).click();await page.getByRole('searchbox').fill('nonexistent record');await expect(page.getByText('No records found.',{exact:true})).toBeVisible();await page.getByRole('searchbox').fill('');await page.getByRole('combobox').selectOption('1');await expect(page.locator('.notice-list article')).toHaveCount(1);
 await page.goto('/#/documents');for(const a of await page.locator('a[download]').all()){const response=await page.request.get((await a.getAttribute('href'))!);expect(response.ok()).toBeTruthy();const href=(await a.getAttribute('href'))!;if(href.endsWith('.pdf')){expect((await response.body()).subarray(0,5).toString()).toBe('%PDF-')}else{expect(await response.text()).toContain('<title>');}}
});
test('gallery keyboard viewer, registration link and contact validation',async({page})=>{
 await page.goto('/#/gallery');await page.getByRole('button',{name:'English',exact:true}).click();await page.locator('.gallery-tile').first().click();await expect(page.locator('dialog')).toBeVisible();await page.keyboard.press('ArrowRight');await expect(page.locator('.viewer-toolbar')).toContainText('2 / 3');await page.keyboard.press('Escape');await expect(page.locator('dialog')).not.toBeVisible();await expect(page.locator('.gallery-tile').first()).toBeFocused();
 await page.goto('/#/membership');await page.getByRole('button',{name:'English',exact:true}).click();await expect(page.locator('main').getByRole('link',{name:'Family registration form',exact:true})).toBeVisible();
 await page.goto('/#/contact');await page.getByRole('button',{name:'English',exact:true}).click();await expect(page.getByRole('button',{name:'Send',exact:true})).toBeEnabled();await page.locator('#c-name').fill('Test');await page.locator('#c-mobile').fill('invalid');await page.getByRole('button',{name:'Check details'}).click();expect(await page.locator('#c-mobile').evaluate((el:HTMLInputElement)=>el.validity.valid)).toBeFalsy();
});
test('capture desktop and mobile home',async({page})=>{
 await page.setViewportSize({width:1440,height:1100});await page.goto('/#/');await page.screenshot({path:'test-results/home-desktop.png',fullPage:true});await page.setViewportSize({width:390,height:844});await page.screenshot({path:'test-results/home-mobile.png',fullPage:true});
});
