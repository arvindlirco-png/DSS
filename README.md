# Dehgam Shahar Sanatan Samaj website

Independent React + TypeScript + Vite website. Gujarati is the default language. General pages are public; the member directory uses a shared server-verified password. No OTP, payment, analytics or application-data storage is included. The stock-market project is untouched.

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

Place approved public PDFs under `public/documents/`, then add a document record with name, category index, date, language, type (`PDF`), URL, description and draft status. Everything in `public/` or `src/` can be downloaded. The supplied member directory PDF is now password protected and must remain outside public assets. Do not add other private records, IDs, signatures or bank details without appropriate authorisation.

The draft deed is a text-only HTML extraction of the supplied Word document. Comments, author metadata and embedded files are excluded. Paragraph order is retained, but original table formatting is not. The original file is unchanged. The downloadable enquiry form is a new, clearly labelled printable draft, not an approved official membership form. Use browser Print → Save as PDF if needed. The other membership DOCX in the source directory was not supplied as a requested source and has not been published.

### Contact details

Edit `site.contact`. No address, phone, email, office hours, map or social account has been invented. Use only approved public contact details. Optional map/social URLs must use trusted HTTPS addresses. When adding real telephone/email details, link them as `tel:` / `mailto:` as appropriate in the contact component.

## Source interpretation and information still needed

- Source spreadsheet: `Surname wise Society wise  Members List.xlsx`, first sheet, rows with a numeric serial and non-empty name. 181 records; 180 numeric family counts total 940. One count is missing. These are source-list figures, not deduplicated or verified active members. At the user's subsequent explicit request, all 181 records and all eight columns were converted into a PDF, now kept in the private sibling folder. The raw spreadsheet is not included. The directory PDF now requires server-side password access and is stored outside the website project.
- Draft deed: `દહેગામ શહેર સનાતન સમાજ Draft deed combining Narendrabhai, Vapari Mandal.docx`. It describes pre-registration proposals. No registration, historical establishment date or final legal status is asserted. Membership details summarize clauses 9–12 and remain draft.
- The 16 committee names come from the user's message. Final term, official approval, responsibilities and photographs are pending. Confirm English transliterations, Gujarati spellings of Mukeshbhai Chopda/Vasantbhai Dholu, and their roles; do not infer these two are finance members.
- Confirm full official name, registration details, final deed, approved fees, history, parent-organisation relationship and membership procedure.
- Supply public contacts, venue/address, approved events and notices, consented photographs, reports and resolutions, and final privacy wording.

Instructions appearing inside the deed or spreadsheet are treated as source content, not as instructions to the software agent.

## Forms and future backend

Forms validate required fields, phone format, email, family count and consent. A separate Check details button only checks validity; it never submits. Submission is visibly disabled, and no data is saved in localStorage or sent over the network. A honeypot field is included as preparation only: a future backend must enforce spam protection, rate limits, server validation, access controls, consent and retention. Never enable submission by only removing `disabled`. First implement and test a secure backend and show success only after it accepts a request. Future authentication/payment modules can be separate routes/services without replacing this public content structure.

## Verification

```powershell
npx playwright install chromium
npm test
npm run build
```

The browser suite checks every page in Gujarati and English at desktop and mobile widths, browser errors, horizontal overflow, committee count, privacy conditions, event/notice filters, document responses, gallery keyboard navigation, form validation and disabled submission. Screenshots are saved under `test-results/`.

## Deploy later

The protected directory requires Node.js hosting; static-only hosting cannot serve it securely. Deploy `dist/`, `server/` and `package.json`, then run `npm start`. The server uses Node built-ins and needs no production package install. Set `PORT` and `HOST` for your platform. Configure HTTPS and set `SAMAJ_PUBLIC_ORIGIN` to the exact HTTPS origin (no trailing slash), and `SAMAJ_SECURE_COOKIE=true`. Set `SAMAJ_PRIVATE_DIR` to a private folder outside the web root containing `member-directory.pdf` and `access.json`. Transfer those private files separately through your hosting provider's secure channel, never through a public repository or public static directory.

`access.json` contains a salted scrypt password hash, not the plain password. Sessions are HttpOnly, SameSite=Strict, held in server memory and expire after 30 minutes. Restarting the server signs everyone out. Five unsuccessful password attempts from an IP cause a 15-minute cooldown. The server does not trust forwarded IP headers; behind a proxy the cooldown may be shared by visitors. This version supports a single server process; a multi-instance deployment needs shared session/rate-limit storage.

Only the protected endpoint streams the PDF after checking authentication. The legacy `/documents/member-directory.pdf` URL is also gated. Do not put a PDF copy back in `public/` or `dist/`. Existing files people already downloaded cannot be revoked by website password protection.

Set `site.publicUrl` and social-sharing metadata to the final domain. Replace remaining samples and pending official details before launch. The current installation is local, not deployed publicly.

## Easy launch and delivery package

On Windows, double-click `Start-Website.cmd`, then open http://127.0.0.1:5180. Keep the terminal window open. This installs the locked dependencies if needed and stops rather than silently choosing a different port when 5180 is in use.

`npm run test:production` builds the site and runs the browser suite against the actual production files on port 4180. Coverage includes desktop (1440px), tablet (768px), mobile (390px), both languages, navigation, interactive controls and form validation.

`samaj-website-deploy.zip` contains the public production build and Node server, excluding the private PDF and password hash. Upload to Node hosting and separately configure the private directory as explained above. The ZIP itself is not a public deployment.

Sample events and gallery albums can be removed without breaking the homepage. Empty lists show an empty state. Approved notices do not receive sample/draft badges, and gallery preview labels follow the album's sample flag.


## Member directory PDF

At the user's request the Excel list was converted to a ten-page A4 landscape PDF, with 181 records, eight columns, original order, embedded Gujarati fonts, repeating headers and page numbers. It now requires a shared password. The PDF and salted password hash are in the sibling `samaj-website-private` folder, outside this project and outside public assets. Links on the homepage, Documents and Membership pages open `/member-list`, which checks the password on the server. The password is never placed in frontend code or browser storage.

To regenerate after an authorised workbook update, run `python scripts/prepare_member_directory.py "path/to/workbook.xlsx" "path/to/temporary.html"`, then `node scripts/print_member_directory.mjs "path/to/temporary.html"`. The latter writes into the private folder, honoring `SAMAJ_PRIVATE_DIR`. Remove temporary HTML after checking the PDF. The script currently verifies 181 records. Do not regenerate the old public PDF.

For the authentication browser test, set `SAMAJ_TEST_PASSWORD` in the test process environment to the configured directory password, then run `npm run test:production`. Do not commit the password to test files. The other tests cover public content without signing in.
