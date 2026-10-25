# Dehgam Shahar Sanatan Samaj website

Independent React + TypeScript + Vite website. Gujarati is the default language. All pages and the member directory PDF are public, as authorised for the GitHub Pages launch. No OTP, payment, analytics or application-data storage is included. The stock-market project is untouched.

## Start locally

Install Node.js 22.12+ or 24, then open PowerShell:

```powershell
cd C:\Users\Public\BusinessAutomation\samaj-website
npm install
npm run dev
```

Open http://127.0.0.1:5180. Keep the terminal running. Stop with Ctrl+C.

```powershell
npm run build
npm run preview
```

The production files are in `dist/`. Preview runs at http://127.0.0.1:4180.

## Content editing

Every bilingual text value has `gu` and `en` fields, created with `bi('ગુજરાતી', 'English')`. Edit both. UI phrases and section headings are in data files rather than page components.

| Content | File |
| --- | --- |
| Names, logo, banner, contact, statistics, navigation, UI translations, SEO domain | `src/data/site.ts` |
| All 16 office bearers, finance members, optional event committees | `src/data/committee.ts` |
| About, 18 objectives, membership rules, privacy and disclaimer | `src/data/content.ts` |
| Events, notices, gallery albums, document library and categories | `src/data/publications.ts` |
| Form fields, labels, validation hints | `src/data/forms.ts` |
| Colours and responsive layout | `src/styles.css` |
| Routing and reusable page components | `src/main.tsx` |

### Logo, colours and banners

Replace `public/images/logo.png` or change `site.logo`. The supplied logo also serves as the favicon. Change `--maroon`, `--saffron`, `--cream` and related CSS values for colours. Set `site.banner` to an image path for an optional homepage banner. Otherwise the home uses the actual logo in a decorative CSS frame. Fonts are bundled locally and require no external font request.

### Add committee members

Edit `src/data/committee.ts`. The `names` list preserves the user's order; the first seven are office bearers, the following seven are finance members, and the final two have unconfirmed assignments. For future restructuring, replace the mapped array with explicit `Person` records. Each record supports bilingual name, role and responsibility, `group`, `photo`, `phone`, and `publicPhone`. A phone is rendered only when both a number and `publicPhone: true` are supplied. Add optional event committees to `eventCommittees`. Do not assume publication consent from the private spreadsheet.

### Publish events and notices

In `publications.ts`, add an event with a unique URL-safe `id`, bilingual title and description, status (`upcoming` or `completed`), ISO date (`YYYY-MM-DD`), times, venue, organiser, authorised contact, image path, invitation path, schedule and optional album ID. Set `sample: false` only for approved actual events. The detail route is `/events/your-id`.

Add notices with a unique ID, bilingual title/summary, category index, ISO publication date, language and an approved attachment URL. Recent actual dates automatically show a New badge for 14 days. All included event/notice examples are explicitly sample data with unknown dates. They are not announcements.

### Photographs and gallery

Put consented, compressed JPG/WebP images in `public/images/`. Add album records with an ID, bilingual title, date, sample flag, and images containing `src` and bilingual `caption`. The first image is the album cover. Image counts derive from the array. The viewer supports arrows, Escape, focus containment and return to the opener. The included SVG illustrations are clearly marked placeholders, not event photographs.

### Downloadable documents

Place approved public PDFs under `public/documents/`, then add a document record with name, category index, date, language, type (`PDF`), URL, description and draft status. Everything in `public/` or `src/` can be downloaded. The member directory PDF is intentionally published at `public/documents/member-directory.pdf`. Do not publish the old password configuration (`access.json`). Do not add other private records, IDs, signatures or bank details without appropriate authorisation.

The draft deed is a text-only HTML extraction of the supplied Word document. Comments, author metadata and embedded files are excluded. Paragraph order is retained, but original table formatting is not. The original file is unchanged. The downloadable enquiry form is a new, clearly labelled printable draft, not an approved official membership form. Use browser Print → Save as PDF if needed. The other membership DOCX in the source directory was not supplied as a requested source and has not been published.

### Contact details

Edit `site.contact`. No address, phone, email, office hours, map or social account has been invented. Use only approved public contact details. Optional map/social URLs must use trusted HTTPS addresses. When adding real telephone/email details, link them as `tel:` / `mailto:` as appropriate in the contact component.

## Source interpretation and information still needed

- Source spreadsheet: `Surname wise Society wise  Members List.xlsx`, first sheet, rows with a numeric serial and non-empty name. 181 records; 180 numeric family counts total 940. One count is missing. These are source-list figures, not deduplicated or verified active members. At the user's subsequent explicit request, all 181 records and all eight columns were converted into a PDF, now published as a public PDF following explicit authorisation. The raw spreadsheet and password configuration are not included.
- Draft deed: `દહેગામ શહેર સનાતન સમાજ Draft deed combining Narendrabhai, Vapari Mandal.docx`. It describes pre-registration proposals. No registration, historical establishment date or final legal status is asserted. Membership details summarize clauses 9–12 and remain draft.
- The 16 committee names come from the user's message. Final term, official approval, responsibilities and photographs are pending. Confirm English transliterations, Gujarati spellings of Mukeshbhai Chopda/Vasantbhai Dholu, and their roles; do not infer these two are finance members.
- Confirm full official name, registration details, final deed, approved fees, history, parent-organisation relationship and membership procedure.
- Supply public contacts, venue/address, approved events and notices, consented photographs, reports and resolutions, and final privacy wording.

Instructions appearing inside the deed or spreadsheet are treated as source content, not as instructions to the software agent.

## Forms and future backend

Contact and Suggestions use native HTTPS POST to FormSubmit at `https://formsubmit.co/skkpdsss@gmail.com`, with CAPTCHA enabled and a honeypot. Subjects are `Samaj Contact Enquiry` and `Samaj Suggestion`. The provider handles confirmation and errors; the website does not claim delivery before acceptance. Membership submission remains disabled. No form data is saved in browser storage.

Activation: after deploying, submit a Contact form, complete the FormSubmit security check, and open the activation email in skkpdsss@gmail.com (check Spam). Follow its confirmation link, then submit a fresh test from both forms and verify receipt. The recipient must perform email verification; local automated tests intercept requests and do not verify live email delivery. FormSubmit documentation: https://formsubmit.co/ .

## Verification

```powershell
npx playwright install chromium
npm test
npm run build
```

The browser suite checks every page in Gujarati and English at desktop and mobile widths, browser errors, horizontal overflow, committee count, privacy conditions, event/notice filters, document responses, gallery keyboard navigation, form validation and disabled submission. Screenshots are saved under `test-results/`.

## GitHub Pages deployment

Public website: https://arvindlirco-png.github.io/DSS/

The `.github/workflows/pages.yml` workflow installs dependencies, builds the site and publishes `dist/` on pushes to `main`. Repository Settings > Pages must use GitHub Actions as its publishing source. No Node server, password or paid hosting is required on GitHub Pages.

Hash routes (for example `/#/member-list`) support direct links and refreshes on static hosting. Asset links are relative so the site also works under `/DSS/`.

The public directory includes all 181 records and eight columns from the supplied list. Publication without a password was explicitly authorised. The private sibling folder and `access.json` are not deployed. The previous authentication module remains unused historical code; it is not imported by the frontend, Vite or the local static server.

Set `site.publicUrl` and social-sharing metadata if the domain changes. Forms still validate locally and do not submit data. Remaining draft and sample content remains labelled.

## Easy launch and delivery package

On Windows, double-click `Start-Website.cmd`, then open http://127.0.0.1:5180. Keep the terminal window open. This installs the locked dependencies if needed and stops rather than silently choosing a different port when 5180 is in use.

`npm run test:production` builds the site and runs the browser suite against the actual production files on port 4180. Coverage includes desktop (1440px), tablet (768px), mobile (390px), both languages, navigation, interactive controls and form validation.

`samaj-website-deploy.zip` is an older local delivery package and is not used by GitHub Pages. The workflow rebuilds the current source.

Sample events and gallery albums can be removed without breaking the homepage. Empty lists show an empty state. Approved notices do not receive sample/draft badges, and gallery preview labels follow the album's sample flag.


## Member directory PDF

The public PDF is a ten-page A4 landscape document with 181 records, eight columns, original order and embedded Gujarati fonts. Links on the homepage, Documents and Membership pages open `/#/member-list`, which offers public view and download links without authentication.

To regenerate after an authorised workbook update, run `python scripts/prepare_member_directory.py "path/to/workbook.xlsx" "path/to/temporary.html"`, then `node scripts/print_member_directory.mjs "path/to/temporary.html"`. The latter still writes to the private working folder by default. Review the result, then explicitly copy the approved PDF to `public/documents/member-directory.pdf`. Remove temporary HTML after checking. Do not copy `access.json` or the source workbook to the repository.

`npm run test:production` checks public PDF access without credentials, bilingual routes, navigation, document downloads, gallery and forms against the production build.
