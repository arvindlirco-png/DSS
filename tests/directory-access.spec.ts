import {test,expect} from '@playwright/test';
test('member directory shows coming soon without PDF access',async({page})=>{
 const apiCalls:string[]=[];page.on('request',r=>{if(r.url().includes('/api/'))apiCalls.push(r.url())});
 await page.goto('/#/member-list');
 await page.getByRole('button',{name:'English',exact:true}).click();
 await expect(page.getByRole('heading',{name:'Member directory',exact:true})).toBeVisible();
 await expect(page.locator('input[type="password"]')).toHaveCount(0);
 await expect(page.getByRole('heading',{name:'Coming soon',exact:true})).toBeVisible();
 await expect(page.locator('a[href$=".pdf"]')).toHaveCount(0);
 const response=await page.request.get('/documents/member-directory.pdf');
 expect(response.headers()['content-type']||'').not.toContain('application/pdf');
 await page.reload();await expect(page.locator('h1')).toBeVisible();expect(apiCalls).toEqual([]);
});
