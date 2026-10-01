import { chromium } from '@playwright/test';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  await page.goto(pathToFileURL(resolve(process.argv[2])).href);
  await page.evaluate(() => document.fonts.ready);
  const rows = await page.locator('tbody tr').count();
  if (rows !== 181) throw new Error(`Expected 181 source records; got ${rows}`);
  await page.pdf({
    path: resolve(process.env.SAMAJ_PRIVATE_DIR || '../samaj-website-private', 'member-directory.pdf'),
    format: 'A4', landscape: true, printBackground: true,
    preferCSSPageSize: true, displayHeaderFooter: true,
    headerTemplate: '<span></span>',
    footerTemplate: '<div style="width:100%;text-align:center;font-size:8px;color:#777">Dehgam Shahar Sanatan Samaj · Member directory · <span class="pageNumber"></span> / <span class="totalPages"></span></div>',
  });
  console.log(`PDF created: ${rows} records, all 8 source columns.`);
} finally { await browser.close(); }
