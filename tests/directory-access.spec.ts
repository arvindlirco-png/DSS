import {test,expect} from '@playwright/test';
test('directory loads registered summaries and links to registration without exposing PDF',async({page})=>{
 await page.goto('/#/member-list');await page.getByRole('button',{name:'English',exact:true}).click();
 await expect(page.getByRole('heading',{name:'Member directory',exact:true})).toBeVisible();
 await expect(page.getByRole('link',{name:'Register your family',exact:true})).toBeVisible();
 await expect(page.getByRole('status')).toContainText('families');
 await expect(page.locator('a[href$=".pdf"]')).toHaveCount(0);
 const response=await page.request.get('/documents/member-directory.pdf');expect(response.headers()['content-type']||'').not.toContain('application/pdf');
});