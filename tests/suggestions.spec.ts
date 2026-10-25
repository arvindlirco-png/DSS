import {test,expect} from '@playwright/test';
test('suggestions validates event ideas and switches to general feedback',async({page})=>{
 await page.goto('/#/suggestions');
 await page.getByRole('button',{name:'English',exact:true}).click();
 await expect(page.getByRole('heading',{name:'Suggestions',exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Check details'}).click();
 await expect(page.getByRole('status')).toHaveCount(0);
 await page.locator('[name=name]').fill('Test Member');
 await page.locator('[name=eventType]').selectOption('education');
 await page.locator('[name=title]').fill('Career guidance workshop');
 await page.locator('[name=details]').fill('Invite community members to share career advice with students.');
 await page.getByRole('button',{name:'Check details'}).click();
 await expect(page.getByRole('status')).toHaveCount(0);
 await expect(page.getByRole('button',{name:'Send',exact:true})).toBeEnabled();
 await page.locator('[name=category]').selectOption('general');
 await expect(page.locator('[name=eventType]')).toHaveCount(0);
 await expect(page.getByRole('status')).toHaveCount(0);
 expect(await page.evaluate(()=>localStorage.length)).toBe(0);
});
