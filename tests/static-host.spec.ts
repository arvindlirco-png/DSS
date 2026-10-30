import {test,expect} from '@playwright/test';
test('GitHub Pages explains that online saving is unavailable before entry',async({page,baseURL})=>{
 const apiRequests:string[]=[];
 await page.route('https://arvindlirco-png.github.io/**',async route=>{
  const path=new URL(route.request().url()).pathname.replace(/^\/DSS\//,'/');
  if(path.includes('/api/'))apiRequests.push(path);
  const response=await page.request.get(baseURL+path);
  await route.fulfill({response});
 });
 await page.goto('https://arvindlirco-png.github.io/DSS/#/family-registration');
 await page.getByRole('button',{name:'English',exact:true}).click();
 await expect(page.getByRole('status')).toContainText('Online registration is not open yet');
 await expect(page.getByRole('button',{name:'Save family registration',exact:true})).toBeDisabled();
 await expect(page.locator('#head-select option')).toHaveCount(226);
 await page.goto('https://arvindlirco-png.github.io/DSS/#/member-list');
 await page.getByRole('button',{name:'English',exact:true}).click();
 await expect(page.locator('main')).toContainText('Online registration is not open yet');
 expect(apiRequests).toEqual([]);
});
