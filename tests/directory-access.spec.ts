import {test,expect} from '@playwright/test';
test('public directory opens and downloads without authentication',async({page})=>{
 const apiCalls:string[]=[];page.on('request',r=>{if(r.url().includes('/api/'))apiCalls.push(r.url())});
 await page.goto('/#/member-list');
 await page.getByRole('button',{name:'English',exact:true}).click();
 await expect(page.getByRole('heading',{name:'Member directory',exact:true})).toBeVisible();
 await expect(page.locator('input[type="password"]')).toHaveCount(0);
 const link=page.getByRole('link',{name:'View',exact:true});
 const response=await page.request.get(await link.evaluate((a:HTMLAnchorElement)=>a.href));
 expect(response.ok()).toBeTruthy();expect(response.headers()['content-type']).toContain('application/pdf');
 expect((await response.body()).subarray(0,5).toString()).toBe('%PDF-');
 await page.reload();await expect(page.locator('h1')).toBeVisible();expect(apiCalls).toEqual([]);
});
